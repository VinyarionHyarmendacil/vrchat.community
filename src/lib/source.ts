import { docs } from "collections/server";
import { type InferPageType, loader, multiple } from "fumadocs-core/source";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
import { openapi } from "./openapi";
import { icons as lucideIcons } from "lucide-react";
import * as simpleIcons from "@icons-pack/react-simple-icons";
import { createElement } from "react";
import * as icons from "./icons";
import invariant from "tiny-invariant";
import { getContributors, githubOrganization, githubRepository } from "@/github";

function kebabCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function icon(icon?: string) {
  if (!icon) return;

  if (icon in lucideIcons) return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
  if (icon in simpleIcons)
    return createElement(simpleIcons[icon as keyof typeof simpleIcons], { color: "default" });
  if (icon in icons) return createElement(icons[icon as keyof typeof icons]);

  throw new Error(`Icon "${icon}" not found.`);
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
    openapi: await openapiSource(openapi, {
      baseDir: "reference",
      per: "operation",
      name: (output, document) => {
        invariant(output.type === "operation");

        const operation = document.paths?.[output.item.path]?.[output.item.method];
        invariant(operation && operation.operationId);

        return `(${operation.tags?.[0] || "miscellaneous"})/${kebabCase(operation.operationId)}`;
      },
    }),
  }),
  {
    baseUrl: "/",
    icon,
    plugins: [openapiPlugin()],
  },
);

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.webp"];

  return {
    segments,
    url: `/${page.slugs.join("/")}.webp`,
  };
}

export function getPageSource(page: InferPageType<typeof source>) {
  return `content/docs/${page.path}`;
}

export function getPageContributors(page: InferPageType<typeof source>) {
  if (page.data.type !== "docs") return [];

  const [contentGithubOrganization, contentGithubRepository] = page.data.github?.split("/") || [];

  const repositories = [
    {
      owner: githubOrganization,
      repository: githubRepository,
      pathname: page.path === "index.mdx" ? undefined : getPageSource(page),
    },
    contentGithubOrganization &&
      contentGithubRepository && {
        owner: contentGithubOrganization,
        repository: contentGithubRepository,
      },
  ].filter(Boolean);

  return getContributors({ repositories });
}

export async function getLLMText(page: InferPageType<typeof source>) {
  if (page.data.type === "openapi") {
    // e.g. return the stringified OpenAPI schema
    return JSON.stringify(page.data.getSchema().bundled, null, 2);
  }

  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
}

