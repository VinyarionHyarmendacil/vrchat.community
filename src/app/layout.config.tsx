import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		title: "VRChat API Documentation"
	},
	githubUrl: "https://github.com/vrchatapi",
	links: [
		{
			text: "SDKs",
			type: "menu",
			items: [
				{
					text: "Unity SDK",
					url: "/docs/sdk/unity",
				}
			]
		},
		{
			text: "API Reference",
			url: "/openapi"
		}
	],
};