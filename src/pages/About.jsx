export default function About() {
  return (
    <section className="page">
      <h1>About</h1>
      <p>
        AFTER HOURS is a CoinMarketCap API app for the Build with CMC hackathon
        (RWA track). It is not WRAPPER. WRAPPER compares mints. This product
        compares clocks.
      </p>
      <h2>Endpoints we call</h2>
      <ul className="muted">
        <li>/v5/real-world-assets/assets/list</li>
        <li>/v5/real-world-assets/quotes/latest</li>
        <li>/v5/real-world-assets/issuers/list</li>
        <li>/v2/cryptocurrency/ohlcv/historical — charts when a linked CMC crypto id exists</li>
      </ul>
      <h2>What CMC will not do</h2>
      <p className="muted">
        No RWA historical series. No official “market open” flag. Market pairs
        on RWA need a Growth plan, so we do not pretend we have every venue.
      </p>
    </section>
  );
}
