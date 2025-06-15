import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
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
