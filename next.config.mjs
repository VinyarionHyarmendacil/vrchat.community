import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
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

	],

};

export default withMDX(config);
