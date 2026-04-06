import { createOpenAPI } from "fumadocs-openapi/server";
import { env } from "node:process";

const specificationUrl = env.SPECIFICATION_URL || "https://vrchat.community/openapi.json";

export const openapi = createOpenAPI({
  input: [specificationUrl],
  proxyUrl: "/api-proxy",
});
