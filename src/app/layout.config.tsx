import { SiDiscord, SiTypescript } from "@icons-pack/react-simple-icons";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { sdks } from "@/sdks";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		title: (
			<div className="flex flex-col">
				<h1>VRChat.community</h1>
				<span className="font-normal text-xs line-clamp-1">API documentation, SDKs, and more</span>
			</div>
		),
	},
	githubUrl: "https://github.com/vrchatapi",
	links: [
    {
      text: "Metrics",
			url: "https://metrics.vrchat.community",
    },
		{
			text: "SDKs",
			type: "menu",
			items: sdks.map(({ name, documentation, icon }) => ({
				text: name,
				url: documentation,
				icon,
			}))
		},
		{
			text: "API Reference",
			url: "/reference/get-current-user"
		},
		{
			icon: <SiDiscord />,
			text: "Discord",
			url: "/discord",
			type: "icon"
		}
	],
};
