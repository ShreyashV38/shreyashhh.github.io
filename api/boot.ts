import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { logger } from "hono/logger";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";

type Env = {
  Bindings: {
    ASSETS?: { fetch: (req: Request | URL | string) => Promise<Response> };
    APP_ID?: string;
    APP_SECRET?: string;
    DATABASE_URL?: string;
  };
};

const app = new Hono<Env>();

app.use(logger());
app.onError((err, c) => {
  console.error("Server Error:", err);
  return c.json({ error: err.message || "Internal Server Error" }, 500);
});

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

// Cloudflare Workers: serve static assets + SPA fallback
app.get("*", async (c, next) => {
  const assets = c.env?.ASSETS;
  if (!assets) return next();

  // Try serving the exact static file
  const response = await assets.fetch(c.req.raw);
  if (response.ok) return response;

  // SPA fallback: serve index.html for client-side routes
  return assets.fetch(new Request(new URL("/index.html", c.req.url)));
});

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
