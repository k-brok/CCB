import {
  char,
  datetime,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable(
  "users",
  {
    id: char("id", { length: 36 }).primaryKey(),

    email: varchar("email", { length: 255 }).notNull(),

    passwordHash: varchar("password_hash", { length: 255 }).notNull(),

    status: mysqlEnum("status", [
      "pending",
      "active",
      "disabled",
    ])
      .notNull()
      .default("pending"),

    emailVerifiedAt: datetime("email_verified_at"),

    lastLoginAt: datetime("last_login_at"),

    createdAt: datetime("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),

    updatedAt: datetime("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
  ],
);