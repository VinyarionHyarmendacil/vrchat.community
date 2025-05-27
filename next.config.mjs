import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const redirects = {
	"/docs/api": "/openapi",
	"/docs/:path*": "/",

	"/tutorials/getting-started": "/getting-started",
	"/tutorials/instances": "/instances",
	"/tutorials/tags": "/tags",
	"/tutorials/contribute-api": "/contributing/openapi",
	"/tutorials/contribute-website": "/contributing",
	"/tutorials/websocket": "/websocket",
	"/tutorials/:path*": "/",

	"/typescript": "/javascript",
	"/sdk/:path*": "/:path*",

	"/specification/openapi.yaml": "/openapi.yaml",

	"/": "/getting-started",
	"/discord": "https://discord.gg/qjZE9C9fkB",
};

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
			source: "/openapi.yaml",
			destination: "https://raw.githubusercontent.com/vrchatapi/specification/refs/heads/gh-pages/openapi.yaml",
		},
		{
			source: "/:path*",
			destination: "/docs/:path*",
		},
	],
	redirects: async () => Object
		.entries(redirects)
		.map(([source, destination]) => ({
			source,
			destination,
			permanent: false,
		})),
};

export default withMDX(config);
