
import { and, eq, gt, isNull } from "drizzle-orm";

import { db } from "@/db";
import {
  users,
  emailVerificationTokens,
} from "@/db/schema";

import { hashToken } from "@/lib/security/tokens";

export async function verifyEmail(token: string): Promise<void> {
  if (!token || token.length !== 64 || !/^[a-f0-9]{64}$/i.test(token)) {
    throw new Error("Ongeldige verificatielink.");
  }

  const tokenHash = hashToken(token);
  const now = new Date();

  await db.transaction(async (tx) => {
    const [verification] = await tx
      .select({
        id: emailVerificationTokens.id,
        userId: emailVerificationTokens.userId,
      })
      .from(emailVerificationTokens)
      .where(
        and(
          eq(emailVerificationTokens.tokenHash, tokenHash),
          isNull(emailVerificationTokens.usedAt),
          gt(emailVerificationTokens.expiresAt, now),
        ),
      )
      .limit(1)
      .for("update");

    if (!verification) {
      throw new Error("De verificatielink is ongeldig of verlopen.");
    }

    const [user] = await tx
      .select({ id: users.id })
      .from(users)
      .where(
        and(
          eq(users.id, verification.userId),
          eq(users.status, "pending"),
        ),
      )
      .limit(1)
      .for("update");

    if (!user) {
      throw new Error("Dit account kan niet worden geactiveerd.");
    }

    await tx
      .update(users)
      .set({
        status: "active",
        emailVerifiedAt: now,
      })
      .where(eq(users.id, user.id));

    await tx
      .update(emailVerificationTokens)
      .set({
        usedAt: now,
      })
      .where(eq(emailVerificationTokens.id, verification.id));
  });
}
