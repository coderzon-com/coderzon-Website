/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Blog images served from Sanity's CDN.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

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
    ];
  },
};

module.exports = nextConfig;
