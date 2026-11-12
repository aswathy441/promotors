
"use client";

import { useState } from "react";

export default function Appointment() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("Thank you! Your appointment request has been received.");
    event.target.reset();
  };

  return (
    <section className="appointment section-pad" id="appointment">
      <div className="narrow-container">

        <span className="ghost">CONTACT US</span>

        <h2>REQUEST AN APPOINTMENT ONLINE</h2>

        <p>
          After you submit the form, a representative will call you back
          with the information
          <br className="desktop-only" /> you'll need to make an appointment.
        </p>

        <form id="appointment-form" onSubmit={handleSubmit}>

          <label>
            YOUR NAME
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
            />
          </label>

          <label>
            YOUR EMAIL
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
            />
          </label>

          <label>
            SELECT DATE
            <input type="date" name="date" required />
          </label>

          <label>
            SELECT TIME
            <input type="time" name="time" required />
          </label>

          <label className="wide">
            YOUR MESSAGE
            <textarea
              name="message"
              placeholder="Describe Your Problem"
              rows="2"
            />
          </label>

          <button className="angle-btn submit-btn" type="submit">
            SEND MESSAGE
          </button>

          <p className="form-note" role="status">
            {message}
          </p>

        </form>
      </div>
    </section>
  );
}
