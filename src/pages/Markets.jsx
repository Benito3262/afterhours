import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listRwa } from "../lib/cmc";

export default function Markets() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    listRwa()
      .then((j) => {
        const list = j.data?.rwa_assets || j.data || [];
        setRows(Array.isArray(list) ? list : []);
      })
      .catch((e) => setErr(e.message));
  }, []);
  return (
    <section className="page">
      <h1>Markets</h1>
      <p className="muted">
        Live list from CMC <code>/v5/real-world-assets/assets/list</code>. Tap a
        name for the quote and chart.
      </p>
      {err && (
        <p className="warn">
          {err}. Add CMC_API_KEY on Vercel to load the live list. Until then the
          pages still work — the clock does not need CMC.
        </p>
      )}
      <div className="grid">
        {rows.map((a) => {
          const id = a.rwa_id || a.id;
          const name = a.name || a.symbol || `Asset ${id}`;
          return (
            <Link className="card" key={id} to={`/asset/${id}`}>
              <h3>{name}</h3>
              <p>{a.symbol || a.asset_type || "RWA"} · id {id}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
