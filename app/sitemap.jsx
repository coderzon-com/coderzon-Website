import { createClient } from 'next-sanity';
import servicesData from '../components/data/services-data'
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

const staticPages=[
    'about',
    'contact',
    'request-quote',
    'faq',
    'services',
    'blog',
]

export default async function sitemap() {

  const blogs = await client.fetch(`
    *[_type == 'blogs'] | order(_createdAt desc) {
      "slug": slug.current
    }
  `);

  const baseUrl = 'https://coderzon-website-2463.vercel.app';

  const blogEntries = blogs.map(({ slug }) => ({
    url: `${baseUrl}/blog/${slug}`,
  }));
 const services=servicesData.map(({id})=>({
    url:`${baseUrl}/services/${id}`
  }))
 const static_pages=staticPages.map((page)=>({
     url:`${baseUrl}/${page}`
 })) 
  return [
    ...blogEntries,
    ...services,
    ...static_pages
  ];
}
