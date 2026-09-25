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
      <h1>See the mark. See the clock. Trade the token.</h1>
      <p>
        Tokenized gold and stocks trade while New York is closed. AFTER HOURS
        shows the CoinMarketCap RWA mark, session state, a real chart, and a
        Jupiter buy when the mint is on Solana.
      </p>
      <div className="pills">
        <Link className="pill" to="/markets">Browse RWAs</Link>
        <Link className="pill ghost" to="/clock">Session</Link>
      </div>
    </section>
  );
}
