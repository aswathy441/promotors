
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ViewServicePage() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadService() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/admin/services/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load service");
        }

        const serviceData = data.service || data.data || data;

        if (!serviceData || !serviceData.id) {
          throw new Error("Service not found");
        }

        setService(serviceData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>Loading service details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Unable to load service</h2>
          <p style={{ color: "#dc2626" }}>{error}</p>
          <Link href="/admin/services" style={styles.backButton}>
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div style={styles.container}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <Link href="/admin/dashboard" style={styles.breadcrumbLink}>
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/admin/services" style={styles.breadcrumbLink}>
          Services
        </Link>
        <span>/</span>
        <span>Service Details</span>
      </div>

      {/* Page Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Service Details</h1>
          <p style={styles.subtitle}>
            View complete information about this service.
          </p>
        </div>

        <div style={styles.headerActions}>
          <Link href="/admin/services" style={styles.backButton}>
            ← Back
          </Link>

          <Link
            href={`/admin/services/${id}/edit`}
            style={styles.editButton}
          >
            Edit Service
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.grid}>
        {/* Left Column */}
        <div style={styles.mainColumn}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Service Information</h2>

              <span
                style={{
                  ...styles.status,
                  background:
                    service.status === "active" ? "#dcfce7" : "#fee2e2",
                  color:
                    service.status === "active" ? "#166534" : "#991b1b",
                }}
              >
                {service.status || "Unknown"}
              </span>
            </div>

            {service.image && (
              <div style={styles.imageWrapper}>
                <img
                  src={service.image}
                  alt={service.title || "Service"}
                  style={styles.image}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            <h2 style={styles.serviceTitle}>{service.title}</h2>

            <p style={styles.description}>
              {service.short_description || "No short description available."}
            </p>

            <div style={styles.divider} />

            <h3 style={styles.sectionTitle}>Full Description</h3>

            <p style={styles.fullDescription}>
              {service.full_description || "No full description available."}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.sideColumn}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>General Information</h2>

            <Info label="Service ID" value={service.id} />
            <Info label="Service Title" value={service.title} />
            <Info label="Slug" value={service.slug} />
            <Info label="Icon" value={service.icon} />
            <Info label="Image Path" value={service.image} />
            <Info label="Display Order" value={service.sort_order} />
            <Info label="Status" value={service.status} />
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Quick Actions</h2>

            <Link
              href={`/admin/services/${id}/edit`}
              style={styles.actionLink}
            >
              Edit This Service →
            </Link>

            <Link
              href="/admin/services/create"
              style={styles.actionLink}
            >
              Add New Service →
            </Link>

            <Link
              href="/admin/services"
              style={styles.actionLink}
            >
              View All Services →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.infoLabel}>{label}</span>
      <span style={styles.infoValue}>
        {value !== null && value !== undefined && value !== ""
          ? String(value)
          : "-"}
      </span>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6fa",
    padding: "35px",
    fontFamily: "Arial, sans-serif",
    color: "#182230",
  },

  breadcrumb: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    fontSize: 14,
    color: "#718096",
    marginBottom: 25,
  },

  breadcrumbLink: {
    color: "#1769e8",
    textDecoration: "none",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 30,
  },

  heading: {
    fontSize: 30,
    margin: 0,
    color: "#172033",
  },

  subtitle: {
    color: "#718096",
    marginTop: 8,
  },

  headerActions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },

  backButton: {
    display: "inline-block",
    background: "#ffffff",
    color: "#334155",
    padding: "12px 18px",
    borderRadius: 7,
    textDecoration: "none",
    border: "1px solid #dce2eb",
  },

  editButton: {
    display: "inline-block",
    background: "#1769e8",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: 7,
    textDecoration: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
    gap: 25,
    alignItems: "start",
  },

  mainColumn: {
    minWidth: 0,
  },

  sideColumn: {
    minWidth: 0,
    display: "grid",
    gap: 25,
  },

  card: {
    background: "#ffffff",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    marginBottom: 25,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 19,
    color: "#172033",
    margin: 0,
  },

  status: {
    padding: "7px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    textTransform: "capitalize",
  },

  imageWrapper: {
    width: "100%",
    marginBottom: 22,
    borderRadius: 9,
    overflow: "hidden",
    background: "#f1f5f9",
  },

  image: {
    width: "100%",
    maxHeight: 350,
    objectFit: "cover",
    display: "block",
  },

  serviceTitle: {
    fontSize: 25,
    color: "#172033",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 1.8,
    color: "#64748b",
  },

  divider: {
    borderTop: "1px solid #e5e7eb",
    margin: "25px 0",
  },

  sectionTitle: {
    fontSize: 18,
    color: "#172033",
  },

  fullDescription: {
    fontSize: 15,
    lineHeight: 1.9,
    color: "#475569",
    whiteSpace: "pre-wrap",
  },

  infoRow: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: "15px 0",
    borderBottom: "1px solid #edf0f5",
  },

  infoLabel: {
    fontSize: 13,
    color: "#718096",
  },

  infoValue: {
    fontSize: 15,
    color: "#172033",
    fontWeight: 500,
    overflowWrap: "anywhere",
  },

  actionLink: {
    display: "block",
    color: "#1769e8",
    textDecoration: "none",
    padding: "14px 0",
    borderBottom: "1px solid #edf0f5",
    fontSize: 14,
    fontWeight: 600,
  },
};
