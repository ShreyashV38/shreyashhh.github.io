import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { portfolioLikes } from "@db/schema";
import { eq } from "drizzle-orm";

export const portfolioLikeRouter = createRouter({
  // Toggle like on the portfolio
  toggle: publicQuery
    .input(z.object({ sessionToken: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if already liked
      const existing = await db
        .select()
        .from(portfolioLikes)
        .where(eq(portfolioLikes.sessionToken, input.sessionToken))
        .limit(1);

      if (existing.length > 0) {
        // Unlike
        await db
          .delete(portfolioLikes)
          .where(eq(portfolioLikes.sessionToken, input.sessionToken));
        const count = await db.select().from(portfolioLikes);
        return { liked: false, totalLikes: count.length };
      }

      // Like
      await db.insert(portfolioLikes).values({
        sessionToken: input.sessionToken,
      });
      const count = await db.select().from(portfolioLikes);
      return { liked: true, totalLikes: count.length };
    }),

  // Get total likes and check if user liked
  status: publicQuery
    .input(z.object({ sessionToken: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(portfolioLikes)
        .where(eq(portfolioLikes.sessionToken, input.sessionToken))
        .limit(1);
      const allLikes = await db.select().from(portfolioLikes);
      return {
        liked: existing.length > 0,
        totalLikes: allLikes.length,
      };
    }),
});
