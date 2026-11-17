import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "ap-southeast-2" }));
const s3 = new S3Client({ region: "ap-southeast-2" });

const TABLE_NAME = process.env.TABLE_NAME || "dylangonzalez-blog-posts";
const BUCKET_NAME = process.env.BUCKET_NAME || "dylangonzalez-dev-website-bucket";
const SITE_URL = process.env.SITE_URL || "https://dylangonzalez.dev";
const ADMIN_KEY = process.env.ADMIN_KEY || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-key",
  "Content-Type": "application/json",
};

const response = (statusCode, body) => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";
  const path = event.rawPath || event.path || "/";

  if (method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  const headers = event.headers || {};
  const providedKey = headers["x-admin-key"] || headers["X-Admin-Key"] || "";
  const isAdmin = Boolean(ADMIN_KEY && providedKey === ADMIN_KEY);

  try {
    // 1. Verify Admin Key
    if (path.endsWith("/auth") && method === "POST") {
      if (!isAdmin) return response(401, { error: "Invalid admin key" });
      return response(200, { ok: true });
    }

    // 2. GET /posts
    if (method === "GET") {
      const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
      let items = result.Items || [];
      if (!isAdmin) {
        items = items.filter((item) => item.published !== false);
      }
      items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      return response(200, { posts: items });
    }

    // All mutating routes below require Admin authentication
    if (!isAdmin) {
      return response(401, { error: "Unauthorized: valid x-admin-key required" });
    }

    const body = event.body ? JSON.parse(event.body) : {};

    // 3. POST /upload — Upload image to S3 blog-images/
    if (path.endsWith("/upload") && method === "POST") {
      const { filename, contentType, dataBase64 } = body;
      if (!filename || !dataBase64) {
        return response(400, { error: "filename and dataBase64 are required" });
      }
      const safeName = filename
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, "-")
        .replace(/-+/g, "-");
      const key = `blog-images/${Date.now()}-${safeName}`;
      const buffer = Buffer.from(dataBase64, "base64");

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: contentType || "image/jpeg",
          CacheControl: "public, max-age=31536000, immutable",
        })
      );

      return response(200, {
        ok: true,
        key,
        url: `${SITE_URL}/${key}`,
      });
    }

    // 4. POST /posts — Create or update a blog post in DynamoDB
    if (method === "POST") {
      const {
        id,
        title,
        excerpt,
        category,
        date,
        createdAt,
        readTime,
        coverImage,
        tags,
        content,
        published,
      } = body;

      if (!id || !title) {
        return response(400, { error: "id (slug) and title are required" });
      }

      const wordCount = (content || "").trim().split(/\s+/).filter(Boolean).length;
      const computedReadTime =
        readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

      const now = new Date();
      const defaultDate = now.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const item = {
        id: String(id)
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9-]/g, "-")
          .replace(/-+/g, "-"),
        title: String(title).trim(),
        excerpt: String(excerpt || "").trim(),
        category: String(category || "General").trim(),
        date: String(date || defaultDate).trim(),
        createdAt: String(createdAt || now.toISOString()),
        readTime: computedReadTime,
        coverImage: String(coverImage || "").trim(),
        tags: Array.isArray(tags)
          ? tags.map((t) => String(t).trim()).filter(Boolean)
          : [],
        content: String(content || ""),
        published: published !== false,
      };

      await ddb.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: item,
        })
      );

      return response(200, { ok: true, post: item });
    }

    // 5. DELETE /posts — Delete a blog post by id
    if (method === "DELETE") {
      const id = event.queryStringParameters?.id || body.id;
      if (!id) return response(400, { error: "id is required" });

      await ddb.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { id },
        })
      );

      return response(200, { ok: true, deletedId: id });
    }

    return response(404, { error: "Not found" });
  } catch (err) {
    console.error("Blog API error:", err);
    return response(500, { error: err.message || "Internal server error" });
  }
};
