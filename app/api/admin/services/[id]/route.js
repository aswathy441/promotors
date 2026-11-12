
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import pool from "@/lib/db";

async function isAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token || !process.env.ADMIN_SESSION_SECRET) return false;

    const secret = new TextEncoder().encode(
      process.env.ADMIN_SESSION_SECRET
    );

    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// GET: Fetch one service
export async function GET(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const [rows] = await pool.execute(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service: rows[0],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch service" },
      { status: 500 }
    );
  }
}

// UPDATE SERVICE
export async function PUT(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
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
        { message: "Title and slug are required" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `UPDATE services SET
        title = ?,
        slug = ?,
        short_description = ?,
        full_description = ?,
        icon = ?,
        image = ?,
        status = ?,
        sort_order = ?
       WHERE id = ?`,
      [
        title.trim(),
        slug.trim(),
        short_description || "",
        full_description || "",
        icon || null,
        image || null,
        status === "inactive" ? "inactive" : "active",
        Number(sort_order) || 0,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to update service" },
      { status: error.code === "ER_DUP_ENTRY" ? 409 : 500 }
    );
  }
}

// DELETE SERVICE
export async function DELETE(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const [result] = await pool.execute(
      "DELETE FROM services WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete service" },
      { status: 500 }
    );
  }
}
