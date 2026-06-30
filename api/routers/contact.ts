import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "@db/schema";
import nodemailer from "nodemailer";

console.log("[MAIL] Module loaded. SMTP_USER:", process.env.SMTP_USER ? "SET" : "EMPTY");
console.log("[MAIL] Module loaded. SMTP_PASS:", process.env.SMTP_PASS ? "SET" : "EMPTY");
console.log("[MAIL] Module loaded. SMTP_HOST:", process.env.SMTP_HOST || "EMPTY");

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

      // ── Email notification ──
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const contactEmail = process.env.CONTACT_EMAIL || smtpUser;

      console.log("[MAIL] Checking creds — USER:", smtpUser ? smtpUser : "MISSING", "PASS:", smtpPass ? "***SET***" : "MISSING");

      if (!smtpUser || !smtpPass) {
        console.log("[MAIL] Skipping email — credentials missing.");
        return { success: true, emailSent: false, emailError: "SMTP credentials not configured" };
      }

      try {
        console.log("[MAIL] Creating Gmail transporter...");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        console.log("[MAIL] Verifying connection...");
        await transporter.verify();
        console.log("[MAIL] Connection verified OK.");

        console.log("[MAIL] Sending email to:", contactEmail);
        const info = await transporter.sendMail({
          from: `"${input.name}" <${smtpUser}>`,
          replyTo: input.email,
          to: contactEmail,
          subject: `New Portfolio Message from ${input.name}`,
          text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
          html: `<p><strong>Name:</strong> ${input.name}</p>
                 <p><strong>Email:</strong> ${input.email}</p>
                 <p><strong>Message:</strong><br/>${input.message.replace(/\n/g, "<br/>")}</p>`,
        });

        console.log("[MAIL] Email sent! MessageId:", info.messageId);
        return { success: true, emailSent: true, emailError: null };
      } catch (error: any) {
        console.error("[MAIL] FAILED:", error.message);
        console.error("[MAIL] Code:", error.code);
        console.error("[MAIL] Full:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        return { success: true, emailSent: false, emailError: error.message };
      }
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }),
});
