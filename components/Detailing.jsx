
export default function Detailing() {
  return (
    <section className="detailing" id="detailing">

      <div className="detail-row">
        <img
          src="/assets/images/wheel-detailing.jpg"
          alt="Technician cleaning a car wheel"
        />

        <div className="detail-copy">
          <span className="ghost">SERVICES</span>

          <h2>CAR EXTERIOR CLEANING: BASIC DETAILING</h2>

          <ul className="feature-list">
            <li>SAME DAY SERVICE</li>
            <li>ONLINE APPOINTMENT</li>
            <li>CONVENIENT LOCATION</li>
            <li>COMPLIMENTARY SHUTTLE</li>
          </ul>

          <a className="angle-btn small" href="#appointment">
            GET SERVICE
          </a>
        </div>
      </div>

      <div className="detail-row reverse">
        <div className="detail-copy">
          <span className="ghost">SERVICE</span>

          <h2>RUBBING, WAXING, AND POLISHING</h2>

          <p>
            Our technicians have undergone the most extensive and stringent
            car detail training program. And the only car that matters is
            yours because we will detail it to your complete satisfaction.
          </p>

          <a className="angle-btn small" href="#appointment">
            GET SERVICE
          </a>
        </div>

        <img
          src="/assets/images/car-polishing.jpg"
          alt="Car polishing and waxing"
        />
      </div>

    </section>
  );
}
