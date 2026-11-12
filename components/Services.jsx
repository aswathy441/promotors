
"use client";

import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();

        if (response.ok) {
          setServices(data.services || []);
        } else {
          console.error("Failed to load services:", data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <section className="services section-pad" id="services">
      <div className="container">
        <div className="section-heading">
          <h2>OUR SERVICES</h2>
          <a className="angle-btn small" href="#appointment">
            ALL SERVICES
          </a>
        </div>

        {loading ? (
          <p>Loading services...</p>
        ) : (
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="service-icon">
                  {service.icon?.startsWith("fa") ? (
                    <i className={service.icon}></i>
                  ) : (
                    service.icon
                  )}
                </div>

                <h3>{service.title}</h3>

                <p>{service.short_description}</p>

                <a className="detail-link" href="#appointment">
                  <i>›</i> DETAILS SERVICE
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
