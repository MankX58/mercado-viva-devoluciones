import { and, desc, eq } from "drizzle-orm";
import { db } from "./client";
import { refunds } from "./schema";

export async function listRefunds() {
  return db.select().from(refunds).orderBy(desc(refunds.createdAt));
}

export async function getActiveRefundForOrder(orderId) {
  const rows = await db
    .select()
    .from(refunds)
    .where(and(eq(refunds.orderId, orderId), eq(refunds.status, "completed")))
    .orderBy(desc(refunds.createdAt))
    .limit(1);

  return rows[0] ?? null;
}

export async function createRefund({ orderId, product, amount, reason, refundMethod }) {
  const [created] = await db
    .insert(refunds)
    .values({ orderId, product, amount, reason, refundMethod })
    .returning();

  return created;
}

export async function revertRefund(id) {
  const [updated] = await db
    .update(refunds)
    .set({ status: "reverted", revertedAt: new Date() })
    .where(eq(refunds.id, id))
    .returning();

  return updated;
}
