import { sessionStatus } from "../lib/session";

export default function Clock() {
  const s = sessionStatus();
  return (
    <section className="page">
      <h1>US cash session</h1>
      <p className="muted">
        CoinMarketCap does not ship an “NYSE is open” endpoint. This page uses
        America/New_York, 09:30–16:00, weekdays, plus the 2026 US market holiday
        list.
      </p>
      <dl className="kv">
        <div>
          <dt>Now in New York</dt>
          <dd>{s.clock}</dd>
        </div>
        <div>
          <dt>State</dt>
          <dd>{s.open ? "Open" : "Closed"}</dd>
        </div>
      </dl>
      <p>{s.label}</p>
      <p className="muted">
        After the close, any move you see on a tokenized stock is overnight DEX
        trading against the last CMC / cash print.
      </p>
    </section>
  );
}
