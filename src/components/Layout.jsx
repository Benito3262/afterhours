import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { sessionStatus } from "../lib/session";
import WalletBar from "./WalletBar";

export default function Layout() {
  const [s, setS] = useState(() => sessionStatus());
  useEffect(() => {
    const t = setInterval(() => setS(sessionStatus()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="shell">
      <header className="nav">
        <NavLink className="brand" to="/">
          <img src="/logo.png" alt="" className="logo" />
          AFTER<span>HOURS</span>
        </NavLink>
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
              <WalletBar />
      </header>
      <Outlet />
      <footer>
        CoinMarketCap data. Swaps stay on this page via Jupiter (Solana) and Jumper (Ethereum). Not investment advice.
      </footer>
    </div>
  );
}
