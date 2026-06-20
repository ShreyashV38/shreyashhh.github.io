import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

// Contact messages table
export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Reviews table - other devs can leave reviews and ratings
export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  comment: text("comment").notNull(),
  rating: int("rating").notNull(), // 1-5
  likes: int("likes").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Likes table - track who liked what (by session/token)
export const reviewLikes = mysqlTable("review_likes", {
  id: serial("id").primaryKey(),
  reviewId: int("review_id").notNull(),
  sessionToken: varchar("session_token", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Portfolio likes - total likes on the portfolio itself
export const portfolioLikes = mysqlTable("portfolio_likes", {
  id: serial("id").primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
