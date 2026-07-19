function getEnv(name: string): string {
  return typeof process !== "undefined" ? (process.env[name] ?? "") : "";
}

export const env = {
  get appId() {
    return getEnv("APP_ID");
  },
  get appSecret() {
    return getEnv("APP_SECRET");
  },
  get isProduction() {
    return getEnv("NODE_ENV") === "production";
  },
  get databaseUrl() {
    return getEnv("DATABASE_URL");
  },
};
