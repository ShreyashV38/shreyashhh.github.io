import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "@db/schema";
import { Resend } from "resend";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(255),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      console.log("[CONTACT] Received submission from:", input.name, input.email);

      const db = getDb();
      await db.insert(contacts).values({
        name: input.name,
        email: input.email,
        message: input.message,
      });
      console.log("[CONTACT] Saved to database.");

      // ── Email notification via Resend ──
      // Read env vars at request time (not module load time) so Cloudflare
      // Worker bindings that are bridged to process.env in boot.ts are available.
      const resendApiKey = process.env.RESEND_API_KEY;
      const contactEmail = process.env.CONTACT_EMAIL || "shreyashvaigankar125@gmail.com";
      console.log("[MAIL] RESEND_API_KEY:", resendApiKey ? "SET" : "EMPTY");

      if (!resendApiKey) {
        console.log("[MAIL] Skipping email — RESEND_API_KEY not configured.");
        return { success: true, emailSent: false, emailError: "Resend API key not configured" };
      }

      try {
        const resend = new Resend(resendApiKey);

        console.log("[MAIL] Sending email via Resend to:", contactEmail);
        const { data, error } = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [contactEmail],
          replyTo: input.email,
          subject: `New Portfolio Message from ${input.name}`,
          html: `<p><strong>Name:</strong> ${input.name}</p>
                 <p><strong>Email:</strong> ${input.email}</p>
                 <p><strong>Message:</strong><br/>${input.message.replace(/\n/g, "<br/>")}</p>`,
        });

        if (error) {
          console.error("[MAIL] Resend error:", error.message);
          return { success: true, emailSent: false, emailError: error.message };
        }

        console.log("[MAIL] Email sent! ID:", data?.id);
        return { success: true, emailSent: true, emailError: null };
      } catch (error: any) {
        console.error("[MAIL] FAILED:", error.message);
        return { success: true, emailSent: false, emailError: error.message };
      }
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }),
});

