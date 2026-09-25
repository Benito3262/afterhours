import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { sessionStatus } from "../lib/session";

export default function Layout() {
  const [s, setS] = useState(() => sessionStatus());
  useEffect(() => {
    const t = setInterval(() => setS(sessionStatus()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="shell">
      <header className="nav">
        <NavLink className="brand" to="/">AFTER<span>HOURS</span></NavLink>
        <nav className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/markets">Markets</NavLink>
          <NavLink to="/clock">Session</NavLink>
          <NavLink to="/issuers">Issuers</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="clock">
          <i className={`dot ${s.open ? "on" : ""}`} />
          {s.open ? "OPEN" : "CLOSED"} · {s.clock}
        </div>
      </header>
      <Outlet />
      <footer>
        CoinMarketCap data. Session clock is 09:30–16:00 America/New_York. Buys route to Jupiter when a Solana mint is known. Not investment advice.
      </footer>
    </div>
  );
}
