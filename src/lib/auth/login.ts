
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users, accountSessions } from "@/db/schema";

import { verifyPassword } from "@/lib/security/password";
import { generateToken, hashToken } from "@/lib/security/tokens";
import { generateUUID } from "@/lib/security/uuid";

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResult {
  userId: string;
  sessionToken: string;
  expiresAt: Date;
}

const SESSION_DURATION_DAYS = 30;

export async function loginUser(
  input: LoginInput,
): Promise<LoginResult> {
  const email = input.email.trim().toLowerCase();

  if (!email || !input.password) {
    throw new Error("E-mailadres of wachtwoord is onjuist.");
  }

  const [user] = await db
    .select({
      id: users.id,
      passwordHash: users.passwordHash,
      status: users.status,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user || user.status !== "active") {
    throw new Error("E-mailadres of wachtwoord is onjuist.");
  }

  const passwordIsValid = await verifyPassword(
    input.password,
    user.passwordHash,
  );

  if (!passwordIsValid) {
    throw new Error("E-mailadres of wachtwoord is onjuist.");
  }

  const sessionToken = generateToken();
  const tokenHash = hashToken(sessionToken);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000,
  );

  await db.insert(accountSessions).values({
    id: generateUUID(),
    userId: user.id,
    tokenHash,
    expiresAt,
    lastUsedAt: new Date(),
  });

  return {
    userId: user.id,
    sessionToken,
    expiresAt,
  };
}
