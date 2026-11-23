
import nodemailer from "nodemailer";
import { env } from "@/lib/env";

const transporter = nodemailer.createTransport({
  host: env.mail.host,
  port: env.mail.port,
  secure: env.mail.secure,
  auth: {
    user: env.mail.user,
    pass: env.mail.password,
  },
});

interface SendMailInput {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendMail(input: SendMailInput): Promise<void> {
  await transporter.sendMail({
    from: env.mail.from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });
}

export async function verifyMailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch {
    return false;
  }
}
