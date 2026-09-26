import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /fix was removed (it described outbound drafting Bonggy doesn't do).
      // `permanent: true` issues a 308.
      { source: "/fix", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
