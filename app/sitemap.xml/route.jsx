
import { createClient } from 'next-sanity';
import servicesData from '@/components/data/services-data';
import data from '@/components/data/product_platform-data';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

const baseUrl = 'https://www.coderzon.com';

const staticPages = [
  'about',
  'contact',
  'request-quote',
  'faq',
  'services',
  'blog',
];

export async function GET() {
  const blogs = await client.fetch(`
    *[_type == 'blogs'] | order(_createdAt desc) {
      "slug": slug.current
    }
  `);

  const urls = [
    ...staticPages.map((page) => `${baseUrl}/${page}`),
    ...servicesData.map(({ id }) => `${baseUrl}/services/${id}`),
    ...data.map(({ id }) => `${baseUrl}/product-platforms/${id}`),
    ...blogs.map(({ slug }) => `${baseUrl}/blog/${slug}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url}</loc>
</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
