export function GET() {
  return new Response(
    `User-agent: *
Disallow: /studio/
Disallow: /product&platforms$
Sitemap: https://coderzon-website-2463.vercel.app/sitemap.xml
`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
