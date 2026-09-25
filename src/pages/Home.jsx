import { Link } from "react-router-dom";
import { sessionStatus } from "../lib/session";

export default function Home() {
  const s = sessionStatus();
  return (
    <section className="hero">
      <div className="clock" style={{ marginBottom: 16 }}>
        <i className={`dot ${s.open ? "on" : ""}`} />
        {s.label} · {s.clock}
      </div>
      <h1>The cash market is closed. The token is still trading.</h1>
      <p>
        AFTER HOURS is a CoinMarketCap RWA desk. See the official tokenized mark,
        whether New York is open, a price chart, and — when the mint lives on
        Solana — a Jupiter buy of that exact token.
      </p>
      <div className="pills">
        <Link className="pill" to="/markets">Open the market list</Link>
        <Link className="pill ghost" to="/clock">Session clock</Link>
        <Link className="pill ghost" to="/about">What CMC provides</Link>
      </div>
    </section>
  );
}
