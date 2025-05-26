import { loader } from "fumadocs-core/source";
import { attachFile } from "fumadocs-openapi/server";
import { icons as lucideIcons } from "lucide-react";
import * as simpleIcons from "@icons-pack/react-simple-icons";
import * as icons from "./icons"
import { createElement } from "react";

import { docs } from "@/.source";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
	baseUrl: "/",
	source: docs.toFumadocsSource(),
	icon(icon) {
		if (!icon) return;
		if (icon in lucideIcons) return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
		if (icon in simpleIcons) return createElement(simpleIcons[icon as keyof typeof simpleIcons], { color: "default" });
		if (icon in icons) return createElement(icons[icon as keyof typeof icons]);

		throw new Error(`Icon "${icon}" not found.`);
	},
	pageTree: {
		attachFile,
	},
});
