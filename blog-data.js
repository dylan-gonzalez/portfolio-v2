/**
 * Blog Configuration & Fallback Seed Data
 * Live posts are fetched dynamically from AWS DynamoDB via BLOG_API_URL.
 */

window.BLOG_API_URL = 'https://xa3wooivteufje5moplcqcygxm0zwsef.lambda-url.ap-southeast-2.on.aws';

let BLOG_DATA = [
  {
    id: 'hello-world',
    title: 'Hello World',
    date: '17 Nov 2026',
    readTime: '2 min read',
    category: 'General',
    coverImage: '',
    excerpt: 'Welcome to my personal corner of the internet - a space for notes on robotics, embedded systems, industrial automation, and software engineering.',
    tags: ['Engineering', 'Robotics', 'Notes'],
    content: "G'day and welcome to my blog. I built this space to share technical write-ups, architecture notes, and lessons learned from building across physical and digital systems.\n\n## Why Write?\n\nMost of my work sits at the intersection of real-time safety-critical automotive engineering, autonomous robotics, industrial automation, and full-stack software. Whether it's debugging CAN bus timing on a vehicle ECU, tuning a ROS 2 navigation stack, or deploying cloud infrastructure on AWS, there's always an interesting problem worth documenting.\n\n> Clear engineering notes help turn hard-won debugging sessions into reusable knowledge.\n\nMore posts coming soon - stay tuned!"
  }
];
