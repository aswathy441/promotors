
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditServicePage() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load existing service details
  useEffect(() => {
    if (!id) return;

    async function loadService() {
      try {
        const response = await fetch(`/api/admin/services/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load service");
        }

        const service = data.service || data.data || data;

        if (!service.title) {
          throw new Error("Service details were not found.");
        }

        setForm({
          title: service.title || "",
          slug: service.slug || "",
          short_description: service.short_description || "",
          full_description: service.full_description || "",
          icon: service.icon || "",
          image: service.image || "",
          status: service.status || "active",
          sort_order: service.sort_order ?? 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [id]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Update service
  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          sort_order: Number(form.sort_order),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update service");
      }

      alert("Service updated successfully!");

      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div style={{ padding: 30 }}>Loading service...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fa",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          background: "#ffffff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ marginBottom: 25, color: "#172033" }}>
          Edit Service
        </h1>

        {error && (
          <p style={{ color: "red", marginBottom: 20 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label>Service Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Icon</label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Image Path</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="/assets/images/brake-repair.jpg"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Display Order</label>
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Short Description</label>
            <textarea
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              rows={3}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Full Description</label>
            <textarea
              name="full_description"
              value={form.full_description}
              onChange={handleChange}
              rows={6}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 25 }}>
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button type="submit" disabled={saving} style={saveButton}>
            {saving ? "Updating..." : "Update Service"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            style={cancelButton}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #d5dbe5",
  borderRadius: "6px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const saveButton = {
  background: "#1769e8",
  color: "#ffffff",
  padding: "13px 25px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "12px",
};

const cancelButton = {
  background: "#e8edf5",
  color: "#172033",
  padding: "13px 25px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
