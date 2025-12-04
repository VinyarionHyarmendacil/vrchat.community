import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const redirects = {
	"/docs/api": "/reference",
	"/docs/:path*": "/",

	"/openapi/:operation": "/reference/:operation",
	"/openapi/:operation/:path*": "/reference/:operation#:path*",

	"/contributing/openapi": "/contributing",
	"/reference": "/reference/get-current-user",

	"/tutorials/getting-started": "/getting-started",
	"/tutorials/instances": "/instances",
	"/tutorials/tags": "/tags",
	"/tutorials/contribute-api": "/contributing",
	"/tutorials/contribute-website": "/contributing",
	"/tutorials/websocket": "/websocket",
	"/tutorials/:path*": "/",

	"/csharp": "/dotnet",
	"/typescript": "/javascript",
	"/sdk/:path*": "/:path*",

	"/specification/openapi.:format": "/openapi.:format",
	"/openapi.:format": "https://github.com/vrchatapi/specification/releases/latest/download/openapi.:format",

	// "/": "/getting-started",
	"/getting-started": "/",

	"/discord": "https://discord.gg/qjZE9C9fkB",
};

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	serverExternalPackages: [
		"typescript",
		"twoslash",
		"oxc-transform"
	],
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
	redirects: async () => Object
		.entries(redirects)
		.map(([source, destination]) => ({
			source,
			destination,
			permanent: false,
		})),
};

export default withMDX(config);
