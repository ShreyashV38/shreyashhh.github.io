import { createRouter, publicQuery } from "./middleware";
import { contactRouter } from "./routers/contact";
import { reviewRouter } from "./routers/review";
import { portfolioLikeRouter } from "./routers/portfolioLike";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  contact: contactRouter,
  review: reviewRouter,
  portfolioLike: portfolioLikeRouter,
});

export type AppRouter = typeof appRouter;
