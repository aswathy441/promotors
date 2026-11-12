
"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setActiveSlide((current) => (current + 1) % 3);
  }, 4000);

  return () => clearInterval(interval);
}, []);
  const slides = [
    {
      kicker: "PROFESSIONAL CAR CARE",
      title: "EXPERT CAR",
      subtitle: "SERVICE & REPAIR",
      description: "Reliable maintenance for every journey.",
      button: "GET SERVICE",
      link: "#appointment",
      image: "/assets/images/engine-cutaway.jpg",
      alt: "Detailed view of a car engine and chassis",
    },
    {
      kicker: "MAINTENANCE & REPAIRS",
      title: "KEEP YOUR CAR",
      subtitle: "RUNNING STRONG",
      description:
        "Quality workmanship from experienced technicians.",
      button: "OUR SERVICES",
      link: "#services",
      image: "/assets/images/maintenance-workshop.jpg",
      alt: "Professional car maintenance workshop",
    },
    {
      kicker: "DETAILING & CARE",
      title: "CARE THAT",
      subtitle: "SHINES THROUGH",
      description:
        "Give your vehicle the attention it deserves.",
      button: "EXPLORE DETAILING",
      link: "#detailing",
      image: "/assets/images/car-polishing.jpg",
      alt: "Professional car polishing and detailing",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const currentSlide = slides[activeSlide];

  return (
    <section className="hero hero-slider" aria-label="Featured car services">

      <div className="hero-slide active">
        <div className="container hero-inner">

          <div className="hero-copy">
            <span className="hero-kicker">
              {currentSlide.kicker}
            </span>

            <h1>
              {currentSlide.title}
              <br />
              <em>{currentSlide.subtitle}</em>
            </h1>

            <p>{currentSlide.description}</p>

            <a className="angle-btn" href={currentSlide.link}>
              {currentSlide.button}
            </a>
          </div>

          <img
            className="hero-engine"
            src={currentSlide.image}
            alt={currentSlide.alt}
          />

        </div>
      </div>

  

    </section>
  );
}
