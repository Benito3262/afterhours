import { useEffect, useState } from "react";
import { cmc } from "../lib/cmc";

export default function Issuers() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    cmc("/v5/real-world-assets/issuers/list")
      .then((j) => setRows(j.data?.issuers || j.data || []))
      .catch((e) => setErr(e.message));
  }, []);
  return (
    <section className="page">
      <h1>Issuers</h1>
      <p className="muted">CMC <code>/v5/real-world-assets/issuers/list</code> — Backed, Paxos, Backpack and others CMC tracks.</p>
      {err && <p className="warn">{err}</p>}
      <div className="grid">
        {rows.map((i) => (
          <article className="card" key={i.id || i.issuer_id || i.name}>
            <h3>{i.name || "Issuer"}</h3>
            <p>{i.token_count != null ? `${i.token_count} tokens` : i.slug || ""}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
