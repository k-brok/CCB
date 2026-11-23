import {
  char,
  datetime,
  mysqlTable,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

import { users } from "./users";

export const accountSessions = mysqlTable(
  "account_sessions",
  {
    id: char("id", { length: 36 }).primaryKey(),

    userId: char("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    tokenHash: char("token_hash", { length: 64 }).notNull(),

    expiresAt: datetime("expires_at").notNull(),

    createdAt: datetime("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),

    lastUsedAt: datetime("last_used_at"),
  },
  (table) => [
    uniqueIndex("account_sessions_token_hash_unique").on(
      table.tokenHash,
    ),
  ],
);