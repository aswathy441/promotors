
"use client";

import { useState } from "react";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <>

      {/* SIDE TOOLBAR */}

      <aside className="side-toolbar" aria-label="Quick links">

        <a className="side-tool" href="#pricing" title="Shop and pricing">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="19" cy="20" r="1.5" />
            <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 1.9-1.4L22 8H5" />
          </svg>
        </a>

        <a className="side-tool" href="#services" title="Our services">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3.5h14v17H5z" />
            <path d="M8 3.5v17M5 17.5h14" />
          </svg>
        </a>

        <a className="side-tool" href="tel:+391234567789" title="Call customer support">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
            <rect x="3" y="12" width="4" height="7" rx="1.5" />
            <rect x="17" y="12" width="4" height="7" rx="1.5" />
            <path d="M17 19c-.5 1.5-2 2-4 2h-2" />
          </svg>
        </a>

        <button
          className="side-tool side-tool-menu"
          type="button"
          aria-label="Open quick navigation"
          aria-expanded={quickOpen}
          title="Quick navigation"
          onClick={() => setQuickOpen(!quickOpen)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.5" y="3.5" width="6" height="6" />
            <rect x="14.5" y="3.5" width="6" height="6" />
            <rect x="3.5" y="14.5" width="6" height="6" />
            <rect x="14.5" y="14.5" width="6" height="6" />
          </svg>
        </button>

        <nav className={`side-quick-links ${quickOpen ? "open" : ""}`}>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#appointment">Appointment</a>
        </nav>

      </aside>

      {/* MAIN HEADER */}

      <header className="site-header">

        <div className="container header-inner">

          <a className="brand" href="#home" aria-label="ProMotors home">
            <span className="brand-mark">✥</span>
            <span>PRO<span>MOTORS</span></span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>

            <div className="nav-item">
              <a href="#home">HOME <b>+</b></a>
            </div>

            <div className="nav-item has-dropdown">
              <a href="#about">PAGES <b>+</b></a>
              <div className="dropdown">
                <a href="#about">About Us</a>
                <a href="#process">How It Works</a>
                <a href="#appointment">Appointment</a>
              </div>
            </div>

            <div className="nav-item has-dropdown">
              <a href="#services">SERVICES <b>+</b></a>
              <div className="dropdown">
                <a href="#services">Brake Repair</a>
                <a href="#services">Engine Repair</a>
                <a href="#services">Tire Repair</a>
                <a href="#detailing">Car Detailing</a>
              </div>
            </div>

            <div className="nav-item has-dropdown">
              <a href="#pricing">SHOP <b>+</b></a>
              <div className="dropdown">
                <a href="#pricing">Service Plans</a>
                <a href="#appointment">Book a Service</a>
              </div>
            </div>

            <div className="nav-item">
              <a href="#articles">BLOG <b>+</b></a>
            </div>

          </nav>

          <a className="phone" href="tel:+391234567789">
            +39 123 45 67 789
          </a>

        </div>

      </header>

    </>
  );
}
