import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ohlcv, rwaQuote } from "../lib/cmc";
import { sessionStatus } from "../lib/session";

export default function Asset() {
  const { id } = useParams();
  const s = sessionStatus();
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    rwaQuote(id)
      .then(setQuote)
      .catch((e) => setErr(e.message));
  }, [id]);

  useEffect(() => {
    const tokenId = quote?.data?.[id]?.tokens?.[0]?.id || quote?.data?.[id]?.cmc_id;
    if (!tokenId) return;
    ohlcv(tokenId, 30)
      .then((j) => {
        const q = j.data?.quotes || [];
        setChart(
          q.map((c) => ({
            t: (c.time_close || c.time_open || "").slice(0, 10),
            c: c.quote?.USD?.close,
          })),
        );
      })
      .catch(() => {});
  }, [id, quote]);

  const block = quote?.data?.[id] || quote?.data || {};
  const px = block.quote?.USD?.price || block.price;

  return (
    <section className="page">
      <h1>{block.name || `RWA ${id}`}</h1>
      <p className="muted">{s.label}. CMC quote is the tape. The chart is daily OHLCV of a linked token when CMC returns a crypto id.</p>
      {err && <p className="warn">{err}</p>}
      <dl className="kv">
        <div>
          <dt>CMC mark</dt>
          <dd>{px ? `$${Number(px).toLocaleString()}` : "—"}</dd>
        </div>
        <div>
          <dt>US cash session</dt>
          <dd>{s.open ? "Open" : "Closed"}</dd>
        </div>
      </dl>
      <div className="chart-box">
        {chart.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart}>
              <XAxis dataKey="t" hide />
              <YAxis domain={["auto", "auto"]} hide />
              <Tooltip />
              <Line type="monotone" dataKey="c" stroke="#6aa6ff" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="muted">Chart appears when the API key is set and CMC returns OHLCV for a linked token. RWA endpoints have no history of their own.</p>
        )}
      </div>
    </section>
  );
}
