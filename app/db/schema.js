import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const refunds = pgTable("refunds", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull(),
  product: text("product").notNull(),
  amount: text("amount").notNull(),
  reason: text("reason"),
  refundMethod: text("refund_method").notNull(),
  // "completed" | "reverted"
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  revertedAt: timestamp("reverted_at"),
});
