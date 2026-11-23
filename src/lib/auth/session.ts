
import { and, eq, gt } from "drizzle-orm";

import { db } from "@/db";
import {
  users,
  accountSessions,
  playerProfiles,
} from "@/db/schema";

import { hashToken } from "@/lib/security/tokens";

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
}

export async function getAuthenticatedUser(
  sessionToken: string | undefined,
): Promise<AuthenticatedUser | null> {
  if (!sessionToken || !/^[a-f0-9]{64}$/i.test(sessionToken)) {
    return null;
  }

  const tokenHash = hashToken(sessionToken);
  const now = new Date();

  const [result] = await db
    .select({
      userId: users.id,
      email: users.email,
      displayName: playerProfiles.displayName,
      sessionId: accountSessions.id,
    })
    .from(accountSessions)
    .innerJoin(users, eq(accountSessions.userId, users.id))
    .innerJoin(playerProfiles, eq(playerProfiles.userId, users.id))
    .where(
      and(
        eq(accountSessions.tokenHash, tokenHash),
        gt(accountSessions.expiresAt, now),
        eq(users.status, "active"),
      ),
    )
    .limit(1);

  if (!result) {
    return null;
  }

  await db
    .update(accountSessions)
    .set({
      lastUsedAt: now,
    })
    .where(eq(accountSessions.id, result.sessionId));

  return {
    id: result.userId,
    email: result.email,
    displayName: result.displayName,
  };
}
