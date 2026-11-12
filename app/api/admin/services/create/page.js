
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateServicePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    short_description: "",
    full_description: "",
    icon: "",
    image: "",
    status: "active",
    sort_order: 0,
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "title" && {
        slug: value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      }),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save service");
      }

      setMessage("Service created successfully!");

      setTimeout(() => {
        router.push("/admin/services");
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #dce1e8",
    borderRadius: "7px",
    marginTop: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fa",
        padding: "35px",
        fontFamily: "Arial, sans-serif",
        color: "#182230",
      }}
    >
      <Link
        href="/admin/services"
        style={{
          color: "#1769e8",
          textDecoration: "none",
          fontSize: "13px",
        }}
      >
        ← Back to Services
      </Link>

      <h1 style={{ marginBottom: "8px" }}>Add New Service</h1>

      <p style={{ color: "#8792a3", marginBottom: "25px" }}>
        Enter the details of your automotive service.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "850px",
          border: "1px solid #e9edf3",
        }}
      >
        <label style={labelStyle}>
          Service Name *
          <input
            style={inputStyle}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Brake Repair"
            required
          />
        </label>

        <label style={labelStyle}>
          URL Slug *
          <input
            style={inputStyle}
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
          />
        </label>

        <label style={labelStyle}>
          Short Description
          <textarea
            style={inputStyle}
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter a short description"
          />
        </label>

        <label style={labelStyle}>
          Full Description
          <textarea
            style={inputStyle}
            name="full_description"
            value={form.full_description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter the full service description"
          />
        </label>

        <label style={labelStyle}>
          Icon
          <input
            style={inputStyle}
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="Example: fa-solid fa-car"
          />
        </label>

        <label style={labelStyle}>
          Image Path
          <input
            style={inputStyle}
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/assets/images/brake-repair.jpg"
          />
        </label>

        <label style={labelStyle}>
          Display Order
          <input
            style={inputStyle}
            type="number"
            name="sort_order"
            value={form.sort_order}
            onChange={handleChange}
          />
        </label>

        <label style={labelStyle}>
          Status
          <select
            style={inputStyle}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        {message && (
          <p
            style={{
              color: message.includes("successfully") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#1769e8",
            color: "white",
            border: "none",
            padding: "13px 24px",
            borderRadius: "7px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {saving ? "Saving..." : "Save Service"}
        </button>

        <Link
          href="/admin/services"
          style={{
            marginLeft: "15px",
            color: "#687386",
            textDecoration: "none",
            fontSize: "13px",
          }}
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}
