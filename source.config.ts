import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import z from "zod";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { transformerTwoslash } from "fumadocs-twoslash";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      preferred_title: z.string().optional(),
      short_description: z.string().max(160).optional(),
      github: z.string().optional(),
      links: z
        .array(
          z.object({
            icon: z.string().optional(),
            label: z.string().optional(),
            href: z.url(),
          }),
        )
        .optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    rehypeCodeOptions: {
      lazy: false,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerTwoslash()],
      langs: ["js", "jsx", "ts", "tsx", "json", "csharp", "bash"],
    },
  },
});
