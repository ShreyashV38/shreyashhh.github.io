import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;
let pool: mysql.Pool;
let lastUrl: string;

export function getDb() {
  const currentUrl = env.databaseUrl;
  
  if (!currentUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  // Reinitialize if the connection string changed (Hyperdrive rotates it)
  if (!instance || lastUrl !== currentUrl) {
    if (pool) {
      pool.end().catch(console.error);
    }
    
    lastUrl = currentUrl;
    pool = mysql.createPool({
      uri: currentUrl,
      // Required to enable mysql2 compatibility for Workers
      disableEval: true,
    });
    
    instance = drizzle(pool, {
      schema: fullSchema,
      mode: "default",
    });
  }
  
  return instance;
}
