
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [services] = await pool.query(
      `SELECT id, title, slug, short_description, icon, image
       FROM services
       WHERE status = 'active'
       ORDER BY sort_order ASC, id DESC`
    );

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Public services API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
