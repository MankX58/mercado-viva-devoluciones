import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/app/lib/db";
import { refunds } from "@/app/lib/schema";

// Evita que Next.js cachee este route handler (GET) y sirva datos viejos.
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    const conditions = [];
    if (orderId) conditions.push(eq(refunds.orderId, orderId));
    if (status) conditions.push(eq(refunds.status, status));

    const baseQuery = db.select().from(refunds);

    const allRefunds = conditions.length
      ? await baseQuery.where(and(...conditions)).orderBy(desc(refunds.createdAt))
      : await baseQuery.orderBy(desc(refunds.createdAt));

    return NextResponse.json(allRefunds);
  } catch (error) {
    console.error("Error al listar reembolsos:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar los reembolsos" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, product, amount, reason, refundMethod } = body;

    if (!orderId || !product || !amount || !refundMethod) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (orderId, product, amount, refundMethod)" },
        { status: 400 },
      );
    }

    const [created] = await db
      .insert(refunds)
      .values({ orderId, product, amount, reason, refundMethod })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error al registrar reembolso:", error);
    return NextResponse.json(
      { error: "No se pudo registrar el reembolso" },
      { status: 500 },
    );
  }
}
