import {
  char,
  datetime,
  mysqlEnum,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

import { users } from "./users";

export const playerProfiles = mysqlTable("player_profiles", {
  id: char("id", { length: 36 }).primaryKey(),

  userId: char("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  displayName: varchar("display_name", { length: 50 }).notNull(),

  avatar: varchar("avatar", { length: 500 }),

  preferredLanguage: varchar("preferred_language", { length: 10 })
    .notNull()
    .default("nl"),

  preferredTheme: mysqlEnum("preferred_theme", [
    "light",
    "dark",
    "system",
  ])
    .notNull()
    .default("system"),

  createdAt: datetime("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdateFn(() => new Date()),
});