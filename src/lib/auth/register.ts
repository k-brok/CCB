
import { db } from "@/db";
import {
  users,
  playerProfiles,
  emailVerificationTokens,
} from "@/db/schema";

import { hashPassword } from "@/lib/security/password";
import { generateToken, hashToken } from "@/lib/security/tokens";
import { generateUUID } from "@/lib/security/uuid";

import { sendVerificationEmail } from "@/lib/mail/verification-email";

interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
}

interface RegisterResult {
  userId: string;
}

export async function registerUser(
  input: RegisterInput,
): Promise<RegisterResult> {
  const email = input.email.trim().toLowerCase();
  const displayName = input.displayName.trim();

  if (!email || !email.includes("@")) {
    throw new Error("Ongeldig e-mailadres.");
  }

  if (input.password.length < 12) {
    throw new Error("Het wachtwoord moet minimaal 12 tekens bevatten.");
  }

  if (!displayName || displayName.length > 50) {
    throw new Error("De spelersnaam moet tussen 1 en 50 tekens bevatten.");
  }

  const passwordHash = await hashPassword(input.password);

  const userId = generateUUID();
  const profileId = generateUUID();
  const verificationId = generateUUID();

  const verificationToken = generateToken();
  const verificationTokenHash = hashToken(verificationToken);

  await db.transaction(async (tx) => {
    const existingUser = await tx.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      throw new Error("Dit e-mailadres is al geregistreerd.");
    }

    await tx.insert(users).values({
      id: userId,
      email,
      passwordHash,
      status: "pending",
    });

    await tx.insert(playerProfiles).values({
      id: profileId,
      userId,
      displayName,
    });

    await tx.insert(emailVerificationTokens).values({
      id: verificationId,
      userId,
      tokenHash: verificationTokenHash,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  });

  await sendVerificationEmail({
    email,
    token: verificationToken,
  });

  return {
    userId,
  };
}
