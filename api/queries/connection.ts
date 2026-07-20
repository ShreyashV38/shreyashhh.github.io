import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;
let lastUrl: string;

export function getDb() {
  const currentUrl = env.databaseUrl;
  // Reinitialize if the connection string changed (Hyperdrive rotates it)
  if (!instance || lastUrl !== currentUrl) {
    lastUrl = currentUrl;
    instance = drizzle(currentUrl, {
      schema: fullSchema,
    });
  }
  return instance;
}
