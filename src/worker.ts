import { openapi } from "./lib/openapi";
import { env } from "cloudflare:workers";

export const handlers = openapi.createProxy({
  allowedOrigins: ["https://api.vrchat.cloud"],
});

export default {
  async fetch(request): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api-proxy")
      return handlers[request.method as keyof typeof handlers](request);

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
