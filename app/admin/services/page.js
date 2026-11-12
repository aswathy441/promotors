
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadServices() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/admin/services");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load services");
      }

      setServices(
        Array.isArray(data)
          ? data
          : data.services || data.data || []
      );
    } catch (error) {
      setMessage(error.message || "Unable to load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function deleteService(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete service");
      }

      setServices((previous) =>
        previous.filter((service) => service.id !== id)
      );

      setMessage("Service deleted successfully!");
    } catch (error) {
      setMessage(error.message || "Unable to delete service");
    }
  }

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
      <Link href="/admin/dashboard" style={{ color: "#1769e8" }}>
        ← Dashboard
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          margin: "25px 0",
        }}
      >
        <div>
          <h1>Services Management</h1>
          <p>Manage your automotive services.</p>
        </div>

        <Link
          href="/admin/services/create"
          style={{
            background: "#1769e8",
            color: "white",
            padding: "13px 20px",
            borderRadius: "7px",
            textDecoration: "none",
          }}
        >
          + Add New Service
        </Link>
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          overflowX: "auto",
        }}
      >
        <h3>All Services ({services.length})</h3>

        {message && <p>{message}</p>}

        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services found. Add your first service.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "750px",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ background: "#f4f6fa" }}>
                <th style={{ padding: "15px" }}>ID</th>
                <th style={{ padding: "15px" }}>Service</th>
                <th style={{ padding: "15px" }}>Slug</th>
                <th style={{ padding: "15px" }}>Status</th>
                <th style={{ padding: "15px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td style={{ padding: "15px" }}>{service.id}</td>
                  <td style={{ padding: "15px" }}>{service.title}</td>
                  <td style={{ padding: "15px" }}>{service.slug}</td>
                  <td style={{ padding: "15px" }}>
                    {service.status}
                  </td>

                  <td style={{ padding: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      {/* View Button */}
                      <Link
                        href={`/admin/services/${service.id}`}
                        style={{
                          color: "#1769e8",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </Link>

                      {/* Edit Button */}
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        style={{
                          color: "#15803d",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Edit
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteService(service.id)}
                        style={{
                          background: "#fff0f0",
                          color: "#dc3545",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
