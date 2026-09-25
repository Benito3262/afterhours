import { Link } from "react-router-dom";
import { sessionStatus } from "../lib/session";

export default function Home() {
  const s = sessionStatus();
  return (
    <section className="hero">
      <div className="clock" style={{ marginBottom: 18 }}>
        <i className={`dot ${s.open ? "on" : ""}`} />
        {s.label} · {s.clock}
      </div>
      <h1>The cash market sleeps. Tokenized stocks do not.</h1>
      <p>
        CoinMarketCap prints the official mark. On-chain tokens keep trading.
        AFTER HOURS shows both, and tells you whether that move happened while
        New York was closed.
      </p>
      <div className="pills">
        <Link className="pill" to="/markets">Browse tokenized assets</Link>
        <Link className="pill" to="/clock">US session clock</Link>
        <Link className="pill" to="/about">How the data works</Link>
      </div>
    </section>
  );
}
