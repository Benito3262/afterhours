import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listRwa } from "../lib/cmc";
import { mark, unwrap } from "../lib/parse";

export default function Markets() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    listRwa().then((j) => setRows(unwrap(j))).catch((e) => setErr(e.message));
  }, []);
  return (
    <section className="page">
      <h1>Markets</h1>
      <p className="muted">CMC /v5/real-world-assets/assets/list. Tap a name for quote, chart, and buy.</p>
      {err && <p className="warn">{err}</p>}
      <div className="grid">
        {rows.map((a) => {
          const id = a.rwa_id || a.id;
          const px = mark(a);
          return (
            <Link className="card" key={id} to={`/asset/${id}`}>
              <h3>{a.name || a.symbol || `Asset ${id}`}</h3>
              <p>
                {a.symbol || a.asset_type || "RWA"}
                {px ? ` · $${Number(px).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
