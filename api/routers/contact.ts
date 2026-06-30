import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "@db/schema";
import nodemailer from "nodemailer";

// Create a reusable transporter (singleton)
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("[MAIL] SMTP_USER or SMTP_PASS not set — email disabled.");
    return null;
  }

  // Use Gmail service shorthand for reliable config
  const isGmail =
    process.env.SMTP_HOST === "smtp.gmail.com" || user.endsWith("@gmail.com");

  if (isGmail) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465",
      auth: { user, pass },
    });
  }

  // Verify connection on first creation
  transporter.verify().then(() => {
    console.log("[MAIL] ✓ SMTP connection verified — ready to send.");
  }).catch((err) => {
    console.error("[MAIL] ✗ SMTP verification FAILED:", err.message);
    transporter = null; // Reset so it retries next time
  });

  return transporter;
}

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

      let emailSent = false;
      let emailError: string | null = null;

      try {
        const mailer = getTransporter();
        if (mailer) {
          const toAddress = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
          console.log(`[MAIL] Sending to ${toAddress} from ${process.env.SMTP_USER}...`);

          await mailer.sendMail({
            from: `"${input.name}" <${process.env.SMTP_USER}>`,
            replyTo: input.email,
            to: toAddress,
            subject: `New Portfolio Message from ${input.name}`,
            text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
            html: `<p><strong>Name:</strong> ${input.name}</p>
                   <p><strong>Email:</strong> ${input.email}</p>
                   <p><strong>Message:</strong><br/>${input.message.replace(/\n/g, '<br/>')}</p>`,
          });
          emailSent = true;
          console.log("[MAIL] ✓ Email sent successfully.");
        }
      } catch (error: any) {
        emailError = error.message || "Unknown error";
        console.error("[MAIL] ✗ Failed to send email:", emailError);
        console.error("[MAIL] Full error:", error);
      }

      return { success: true, emailSent, emailError };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }),
});
