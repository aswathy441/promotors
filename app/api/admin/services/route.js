
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import pool from "@/lib/db";

export const runtime = "nodejs";

async function isAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token || !process.env.ADMIN_SESSION_SECRET) {
      return false;
    }

    const secret = new TextEncoder().encode(
      process.env.ADMIN_SESSION_SECRET
    );

    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// GET: View all services
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const [services] = await pool.query(
      "SELECT * FROM services ORDER BY sort_order ASC, id DESC"
    );

    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Fetch services error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch services" },
      { status: 500 }
    );
  }
}

// POST: Add a new service
export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const {
      title,
      slug,
      short_description,
      full_description,
      icon,
      image,
      status,
      sort_order,
    } = body;

    if (!title?.trim() || !slug?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and slug are required",
        },
        { status: 400 }
      );
    }

    // Generate the next ID because TiDB table has no AUTO_INCREMENT
    const [[nextIdRow]] = await pool.query(
      "SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM services"
    );

    const [result] = await pool.execute(
      `INSERT INTO services
      (id, title, slug, short_description, full_description,
       icon, image, status, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nextIdRow.nextId,
        title.trim(),
        slug.trim(),
        short_description || "",
        full_description || "",
        icon || "",
        image || "",
        status === "inactive" ? "inactive" : "active",
        Number.isInteger(Number(sort_order))
          ? Number(sort_order)
          : 0,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        id: result.insertId || nextIdRow.nextId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create service error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        {
          success: false,
          message: "This slug or ID already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create service",
      },
      { status: 500 }
    );
  }
}
