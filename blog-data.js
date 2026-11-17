/**
 * Blog Posts Data
 * Single source of truth for both index.html (shows latest 2) and blog.html (shows all + full reader view).
 * Adding a new post here automatically updates the Home page preview, "See X more" count, and Blog page.
 */

const BLOG_DATA = [
  {
    id: 'hello-world',
    title: 'Hello World',
    date: 'November 2026',
    readTime: '2 min read',
    category: 'General',
    excerpt: 'Welcome to my personal corner of the internet — a space for notes on robotics, embedded systems, industrial automation, and software engineering.',
    tags: ['Engineering', 'Robotics', 'Notes'],
    content: [
      "G'day and welcome to my blog. I built this space to share technical write-ups, architecture notes, and lessons learned from building across physical and digital systems.",
      "Most of my work sits at the intersection of real-time safety-critical automotive engineering, autonomous robotics, industrial automation, and full-stack software. Whether it's debugging CAN bus timing on a vehicle ECU, tuning a ROS 2 navigation stack, or deploying cloud infrastructure on AWS, there's always an interesting problem worth documenting.",
      "More posts coming soon — stay tuned!"
    ]
  }
];
