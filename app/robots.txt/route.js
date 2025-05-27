export function GET() {
  return new Response(
    `User-agent: *
Disallow: /studio/
Disallow: /product-platforms$
Sitemap:  https://www.coderzon.com/sitemap.xml
`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
