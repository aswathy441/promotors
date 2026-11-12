
export default function Pricing() {
  return (
    <section className="pricing section-pad" id="pricing">
      <div className="narrow-container pricing-grid">

        <div className="pricing-intro">
          <h2>AFFORDABLE<br />PRICING PLANS</h2>

          <p>
            We provide the best car service, recommend the best products
            through an independent review process.
          </p>

          <ul>
            <li>SAME DAY SERVICE</li>
            <li>CONVENIENT LOCATION</li>
            <li>ONLINE APPOINTMENT</li>
          </ul>
        </div>

        <article className="price-card">
          <small>PERSONAL</small>
          <strong>$ 49.99</strong>
          <span>per month</span>
          <hr />

          <ul>
            <li>Scheduled servicing <b>✓</b></li>
            <li>Component wear reminders <b>✓</b></li>
            <li>Introduce new revenue streams <b>✓</b></li>
            <li className="muted">All routine maintenance <b>✓</b></li>
            <li className="muted">24/7 customer service <b>✓</b></li>
          </ul>

          <a className="angle-btn full" href="#appointment">
            GET STARTED
          </a>
        </article>

        <article className="price-card">
          <small>PROFESSIONAL</small>
          <strong>$ 99.99</strong>
          <span>per month</span>
          <hr />

          <ul>
            <li>Scheduled servicing <b>✓</b></li>
            <li>Component wear reminders <b>✓</b></li>
            <li>Introduce new revenue streams <b>✓</b></li>
            <li>All routine maintenance <b>✓</b></li>
            <li>24/7 customer service <b>✓</b></li>
          </ul>

          <a className="angle-btn full" href="#appointment">
            GET STARTED
          </a>
        </article>

      </div>
    </section>
  );
}
