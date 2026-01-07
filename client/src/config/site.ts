/**
 * Site configuration
 */

export const siteConfig = {
  name: 'CyberCafe',
  description: 'A modern Next.js application with professional structure',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
} as const;

