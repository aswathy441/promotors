
"use client";

import { useState } from "react";

export default function Footer() {
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
    setMessage("Thank you for subscribing!");
    event.target.reset();
  };

  return (
    <footer className="site-footer">

      <div className="narrow-container footer-grid">

        {/* Footer About */}
        <div className="footer-about">
          <a className="brand" href="#home">
            <span className="brand-mark">✥</span>
            <span>
              PRO<span>MOTORS</span>
            </span>
          </a>

          <p>
            Every service is rigorously screened and constantly rated
            to ensure you get the best quality.
          </p>

          <small>Support center 24/7</small>
          <strong>+1 123 456-7890</strong>
        </div>

        {/* About Us */}
        <div>
          <h3>ABOUT US</h3>
          <a href="#about">ABOUT US</a>
          <a href="#about">OUR TEAM</a>
          <a href="#services">OUR WORKS</a>
          <a href="#articles">FAQ</a>
        </div>

        {/* Popular Services */}
        <div>
          <h3>POPULAR SERVICES</h3>
          <a href="#services">TIRE REPAIR</a>
          <a href="#services">BRAKE REPAIR</a>
          <a href="#services">ENGINE REPAIR</a>
          <a href="#services">STEERING REPAIR</a>
        </div>

        {/* More Services */}
        <div className="footer-services">
          <h3>&nbsp;</h3>
          <a href="#services">COOLING SYSTEM</a>
          <a href="#services">WHEEL ALIGNMENT</a>
          <a href="#services">BATTERY STARTING</a>
          <a href="#services">SUSPENSION REPAIR</a>
        </div>

        {/* Subscribe */}
        <div className="subscribe">
          <h3>SUBSCRIBE</h3>

          <form id="subscribe-form" onSubmit={handleSubscribe}>
            <label>
              YOUR EMAIL
              <input
                type="email"
                placeholder="Enter Your Email Address"
                required
              />
            </label>

            <button className="angle-btn small" type="submit">
              SUBSCRIBE
            </button>

            <p role="status">{message}</p>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="copyright">
        <span>BravisThemes</span> © ProMotors Theme. All rights reserved
        Copyrights 2024
      </div>

    </footer>
  );
}
