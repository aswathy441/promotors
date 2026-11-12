
export default function Articles() {
  return (
    <section className="articles section-pad" id="articles">
      <div className="narrow-container">

        <h2 className="line-title">POPULAR ARTICLES</h2>

        <article className="featured-article">
          <img
            src="/assets/images/article-engine.jpg"
            alt="Engine components"
          />

          <div>
            <span>REPAIR</span>
            <h3>
              SIGNS YOUR CAR BATTERY HAS
              <br />
              TO BE REPLACED
            </h3>
          </div>
        </article>

        <div className="article-grid">

          <article>
            <img
              src="/assets/images/article-wheel-alignment.jpg"
              alt="Wheel alignment"
            />
            <span>SPORT CARS</span>
            <h3>WHEEL ALIGNMENT VS. FRONT END ALIGNMENT</h3>
            <small>Jan, 09 2023　•　No Comments</small>
            <a href="#appointment">› READ MORE</a>
          </article>

          <article>
            <img
              src="/assets/images/article-transmission.jpg"
              alt="Car transmission"
            />
            <span>TECHNOLOGY</span>
            <h3>HOW TO CHECK TRANSMISSION FLUID FAST</h3>
            <small>Jan, 09 2023　•　No Comments</small>
            <a href="#appointment">› READ MORE</a>
          </article>

          <article>
            <img
              src="/assets/images/article-engine-bay.jpg"
              alt="Car engine bay"
            />
            <span>TUNING</span>
            <h3>HOW TO MAKE THE ENGINE WORK EFFICIENTLY</h3>
            <small>Jan, 09 2023　•　No Comments</small>
            <a href="#appointment">› READ MORE</a>
          </article>

        </div>
      </div>
    </section>
  );
}
