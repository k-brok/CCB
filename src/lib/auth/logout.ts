
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { accountSessions } from "@/db/schema";

import { hashToken } from "@/lib/security/tokens";

export async function logoutUser(
  sessionToken: string | undefined,
): Promise<void> {
  if (!sessionToken || !/^[a-f0-9]{64}$/i.test(sessionToken)) {
    return;
  }

  const tokenHash = hashToken(sessionToken);

  await db
    .delete(accountSessions)
    .where(eq(accountSessions.tokenHash, tokenHash));
}
