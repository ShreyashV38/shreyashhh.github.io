/**
 * Node.js production entry point.
 *
 * Imports the shared Hono app from boot.ts, adds Node-specific static file
 * serving, and starts the HTTP server via @hono/node-server.
 *
 * Run with: NODE_ENV=production node dist/node.js
 */
import app from "./boot";
import { serve } from "@hono/node-server";
import { serveStaticFiles } from "./lib/vite";

serveStaticFiles(app);

const port = parseInt(process.env.PORT || "3000");
serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
