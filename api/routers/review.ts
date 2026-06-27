import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { reviews, reviewLikes } from "@db/schema";
import { eq, and, sql } from "drizzle-orm";

export const reviewRouter = createRouter({
  // Create a new review
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        role: z.string().max(255).optional(),
        comment: z.string().min(1),
        rating: z.number().min(1).max(5),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(reviews).values({
        name: input.name,
        role: input.role || null,
        comment: input.comment,
        rating: input.rating,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  // List all reviews
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(reviews).orderBy(reviews.createdAt);
  }),

  // Get review stats (count + average rating)
  stats: publicQuery.query(async () => {
    const db = getDb();
    const result = await db
      .select({
        count: sql<number>`COUNT(*)`,
        avgRating: sql<number>`COALESCE(AVG(rating), 0)`,
      })
      .from(reviews);
    return {
      totalReviews: Number(result[0].count),
      averageRating: Number(Number(result[0].avgRating).toFixed(1)),
    };
  }),

  // Like a review
  like: publicQuery
    .input(
      z.object({
        reviewId: z.number(),
        sessionToken: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      
      // Check if already liked
      const existing = await db
        .select()
        .from(reviewLikes)
        .where(
          and(
            eq(reviewLikes.reviewId, input.reviewId),
            eq(reviewLikes.sessionToken, input.sessionToken)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        // Unlike: remove the like record and decrement
        await db
          .delete(reviewLikes)
          .where(
            and(
              eq(reviewLikes.reviewId, input.reviewId),
              eq(reviewLikes.sessionToken, input.sessionToken)
            )
          );
        await db
          .update(reviews)
          .set({ likes: sql`likes - 1` })
          .where(eq(reviews.id, input.reviewId));
        return { liked: false };
      }

      // Like: add record and increment
      await db.insert(reviewLikes).values({
        reviewId: input.reviewId,
        sessionToken: input.sessionToken,
      });
      await db
        .update(reviews)
        .set({ likes: sql`likes + 1` })
        .where(eq(reviews.id, input.reviewId));
      return { liked: true };
    }),

  // Check if user liked a review
  checkLike: publicQuery
    .input(
      z.object({
        reviewId: z.number(),
        sessionToken: z.string(),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(reviewLikes)
        .where(
          and(
            eq(reviewLikes.reviewId, input.reviewId),
            eq(reviewLikes.sessionToken, input.sessionToken)
          )
        )
        .limit(1);
      return { liked: existing.length > 0 };
    }),
});
