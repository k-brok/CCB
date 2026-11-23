
import { env } from "@/lib/env";
import { sendMail } from "./mailer";

interface VerificationEmailInput {
  email: string;
  token: string;
}

export async function sendVerificationEmail(
  input: VerificationEmailInput,
): Promise<void> {
  const verificationUrl = new URL(
    "/api/auth/verify-email",
    env.app.url,
  );

  verificationUrl.searchParams.set("token", input.token);

  const url = verificationUrl.toString();

  await sendMail({
    to: input.email,
    subject: "Verifieer je e-mailadres - Chunkk City Builder",

    text: `
Welkom bij Chunkk City Builder!

Om je account te activeren, klik op onderstaande link:

${url}

Deze link is 24 uur geldig.

Heb je dit account niet aangemaakt? Dan kun je deze e-mail negeren.
`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h1>Welkom bij Chunkk City Builder!</h1>

        <p>Bedankt voor je registratie.</p>

        <p>
          Om je account te activeren, klik op onderstaande knop:
        </p>

        <p>
          <a
            href="${url}"
            style="display: inline-block; padding: 12px 24px; background: #222; color: #fff; text-decoration: none; border-radius: 6px;"
          >
            E-mailadres verifiëren
          </a>
        </p>

        <p>Deze link is 24 uur geldig.</p>

        <p>
          Heb je dit account niet aangemaakt?
          Dan kun je deze e-mail negeren.
        </p>
      </div>
    `,
  });
}
