import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React `<ViewTransition>` (used for subtle crossfades on navigation) is gated
  // behind this flag in Next.js 16. Harmless for a single-route site, future-proof
  // once the MiniApp routes land.
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
