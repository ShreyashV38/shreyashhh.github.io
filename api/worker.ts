/**
 * Cloudflare Workers entry point.
 *
 * This is a thin wrapper that re-exports the Hono app as the default export
 * for the Workers runtime.  It intentionally does NOT import the Node-only
 * server code (vite.ts / @hono/node-server) so the bundle stays
 * Workers-compatible.
 */
export { default } from "./boot";
