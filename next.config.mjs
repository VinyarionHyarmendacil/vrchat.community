import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: ['typescript', 'twoslash', "@takumi-rs/image-response"],
  output: "export",
  reactStrictMode: true,
  experimental: {
    cpus: 2,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
};

export default withMDX(config);
