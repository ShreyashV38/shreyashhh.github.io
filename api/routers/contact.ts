import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "@db/schema";
import nodemailer from "nodemailer";

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
      const db = getDb();
      await db.insert(contacts).values({
        name: input.name,
        email: input.email,
        message: input.message,
      });

      try {
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT === "465",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"${input.name}" <${process.env.SMTP_USER}>`,
            replyTo: input.email,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            subject: `New Portfolio Message from ${input.name}`,
            text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
            html: `<p><strong>Name:</strong> ${input.name}</p>
                   <p><strong>Email:</strong> ${input.email}</p>
                   <p><strong>Message:</strong><br/>${input.message.replace(/\n/g, '<br/>')}</p>`,
          });
          console.log("Email notification sent successfully");
        } else {
          console.log("SMTP credentials not provided. Skipping email notification.");
        }
      } catch (error) {
        console.error("Error sending email notification:", error);
      }

      return { success: true };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }),
});
