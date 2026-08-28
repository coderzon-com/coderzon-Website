/** @type {import('next').NextConfig} */
const nextConfig = {
  // Defaults to .next. Override it (NEXT_DIST_DIR=.next-verify next build) to
  // run a production build without disturbing a dev server using .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  async redirects() {
    return [
      // The products section moved from /product-platforms to /platforms.
      // Keep the old URLs working so existing links and search results survive.
      {
        source: "/product-platforms",
        destination: "/platforms",
        permanent: true,
      },
      {
        source: "/product-platforms/:slug",
        destination: "/platforms/:slug",
        permanent: true,
      },
      // Case studies were briefly published under /work before the two
      // collections were separated. Named individually rather than as a
      // wildcard, because /work/:slug is still live for delivered projects.
      {
        source: "/work/pharmaceutical-data-platform",
        destination: "/case-studies/pharmaceutical-data-platform",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
