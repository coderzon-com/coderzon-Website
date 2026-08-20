import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Defaults to .next. Override it (NEXT_DIST_DIR=.next-verify next build) to
  // run a production build without disturbing a dev server using .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
