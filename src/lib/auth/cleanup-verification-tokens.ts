
import { and, isNotNull, lt, or } from "drizzle-orm";

import { db } from "@/db";
import { emailVerificationTokens } from "@/db/schema";

export async function cleanupVerificationTokens(): Promise<number> {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const result = await db
    .delete(emailVerificationTokens)
    .where(
      or(
        and(
          isNotNull(emailVerificationTokens.usedAt),
          lt(emailVerificationTokens.usedAt, cutoff),
        ),
        lt(emailVerificationTokens.expiresAt, cutoff),
      ),
    );

  return result[0].affectedRows ?? 0;
}
