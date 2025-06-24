import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import type { RemarkInstallOptions } from "fumadocs-docgen";
import { remarkInstall } from "fumadocs-docgen";
import type { TypeScriptToJavaScriptOptions } from "fumadocs-docgen/remark-ts2js";
import { remarkTypeScriptToJavaScript } from "fumadocs-docgen/remark-ts2js";
import {
	defineConfig,

	defineDocs,
	frontmatterSchema,
	metaSchema,
} from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";
import z from "zod";

// eslint-disable-next-line unicorn/prevent-abbreviations
export const docs = defineDocs({
	docs: {
		schema: frontmatterSchema.and(z.object({
			fullTitle: z.string().optional(),
		})),
	},
	meta: {
		schema: metaSchema,
	},
});

export default defineConfig({
	mdxOptions: {
		remarkPlugins: [
			[remarkInstall, { persist: { id: "remark-install" } } satisfies RemarkInstallOptions],
			[remarkTypeScriptToJavaScript, { persist: { id: "ts2js" } } satisfies TypeScriptToJavaScriptOptions],
		],
		rehypeCodeOptions: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			transformers: [
				...(rehypeCodeDefaultOptions.transformers ?? []),
				transformerTwoslash({
					typesCache: createFileSystemTypesCache(),
				}),
			],
		},
	},
});
