import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "ap-southeast-2" }));
const s3 = new S3Client({ region: "ap-southeast-2" });
const ses = new SESClient({ region: "ap-southeast-2" });
const cognito = new CognitoIdentityProviderClient({ region: "ap-southeast-2" });

const TABLE_NAME = process.env.TABLE_NAME || "dylangonzalez-blog-posts";
const BUCKET_NAME = process.env.BUCKET_NAME || "dylangonzalez-dev-website-bucket";
const SITE_URL = process.env.SITE_URL || "https://dylangonzalez.dev";
const CONTACT_FROM = process.env.CONTACT_FROM || "Dylan Gonzalez Portfolio <contact@dylangonzalez.dev>";
const CONTACT_TO = process.env.CONTACT_TO || "dylcg10@gmail.com";
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID || "1duv7v0fbb7epof1jkrh37qg4c";
const ADMIN_KEY = process.env.ADMIN_KEY || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key",
  "Content-Type": "application/json",
};

const response = (statusCode, body) => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(body),
});

const verifyAdmin = async (headers) => {
  const authHeader = headers["authorization"] || headers["Authorization"] || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : headers["x-admin-key"] || headers["X-Admin-Key"] || "";

  if (!token) return null;

  // Fallback legacy key check if configured
  if (ADMIN_KEY && token === ADMIN_KEY) {
    return { email: CONTACT_TO };
  }

  try {
    const userRes = await cognito.send(new GetUserCommand({ AccessToken: token }));
    const emailAttr = (userRes.UserAttributes || []).find((a) => a.Name === "email");
    return {
      username: userRes.Username,
      email: emailAttr ? emailAttr.Value : userRes.Username,
    };
  } catch {
    return null;
  }
};

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";
  const path = event.rawPath || event.path || "/";

  if (method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  const headers = event.headers || {};

  try {
    // 0. Public Contact Form Endpoint — POST /contact
    if (path.endsWith("/contact") && method === "POST") {
      const body = event.body ? JSON.parse(event.body) : {};
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim();
      const subject = String(body.subject || "Portfolio Inquiry").trim();
      const message = String(body.message || "").trim();

      if (!name || !email || !message) {
        return response(400, { error: "Name, email, and message are required." });
      }

      const buildEmailParams = (sourceAddress) => ({
        Source: sourceAddress,
        Destination: {
          ToAddresses: [CONTACT_TO],
        },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: `[dylangonzalez.dev] ${subject} — from ${name}`,
            Charset: "UTF-8",
          },
          Body: {
            Text: {
              Data: `New message from dylangonzalez.dev contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n`,
              Charset: "UTF-8",
            },
          },
        },
      });

      try {
        await ses.send(new SendEmailCommand(buildEmailParams(CONTACT_FROM)));
      } catch {
        await ses.send(new SendEmailCommand(buildEmailParams(CONTACT_TO)));
      }

      return response(200, { ok: true });
    }

    // 1. Cognito Login Endpoint — POST /login
    if (path.endsWith("/login") && method === "POST") {
      const body = event.body ? JSON.parse(event.body) : {};
      const email = String(body.email || "").trim();
      const password = String(body.password || "");

      if (!email || !password) {
        return response(400, { error: "Email and password are required." });
      }

      try {
        const authRes = await cognito.send(
          new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: COGNITO_CLIENT_ID,
            AuthParameters: {
              USERNAME: email,
              PASSWORD: password,
            },
          })
        );

        const result = authRes.AuthenticationResult;
        if (!result || !result.AccessToken) {
          return response(401, { error: "Authentication challenge required." });
        }

        return response(200, {
          ok: true,
          accessToken: result.AccessToken,
          idToken: result.IdToken,
          email,
        });
      } catch (err) {
        return response(401, { error: "Invalid email or password." });
      }
    }

    // Check Admin authentication (Cognito AccessToken)
    const adminUser = await verifyAdmin(headers);
    const isAdmin = Boolean(adminUser);

    // 2. Verify Session Token — POST /auth
    if (path.endsWith("/auth") && method === "POST") {
      if (!isAdmin) return response(401, { error: "Invalid or expired session" });
      return response(200, { ok: true, user: adminUser });
    }

    // 3. GET /posts
    if (method === "GET") {
      const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
      let items = result.Items || [];
      if (!isAdmin) {
        items = items.filter((item) => item.published !== false);
      }
      items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      return response(200, { posts: items });
    }

    // All mutating routes below require Cognito Admin authentication
    if (!isAdmin) {
      return response(401, { error: "Unauthorized: valid Cognito login required" });
    }

    const body = event.body ? JSON.parse(event.body) : {};

    // 4. POST /upload — Upload image to S3 blog-images/
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

    // 5. POST /posts — Create or update a blog post in DynamoDB
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

    // 6. DELETE /posts — Delete a blog post by id
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
