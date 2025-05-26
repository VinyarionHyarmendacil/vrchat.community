import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			new URL("https://i.imgur.com/*")
		]
	},
	rewrites: async () => [
		{
			source: "/:path*",
			destination: "/docs/:path*",
		},
	],
	redirects: async () => [
		{
			source: "/",
			destination: "/guides/getting-started",
			permanent: false
		}
	],
};

export default withMDX(config);
