import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { histQuotes, ohlcv, rwaQuote } from "../lib/cmc";
import { jupBuy, mintFor } from "../lib/mints";
import { mark, pickAsset, tokenCmcId } from "../lib/parse";
import { sessionStatus } from "../lib/session";

function seriesFromOhlcv(j, cid) {
  const raw = j.data;
  const q = raw?.quotes || raw?.[cid]?.quotes || [];
  return q.map((c) => ({ t: String(c.time_close || c.time_open || "").slice(0, 10), c: c.quote?.USD?.close })).filter((p) => p.c);
}
function seriesFromHist(j, cid) {
  const raw = j.data;
  const q = raw?.quotes || raw?.[cid]?.quotes || [];
  return q.map((c) => ({ t: String(c.timestamp || "").slice(0, 10), c: c.quote?.USD?.price })).filter((p) => p.c);
}

export default function Asset() {
  const { id } = useParams();
  const s = sessionStatus();
  const [asset, setAsset] = useState(null);
  const [chart, setChart] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    rwaQuote(id).then((j) => setAsset(pickAsset(j, id))).catch((e) => setErr(e.message));
  }, [id]);

  useEffect(() => {
    const cid = tokenCmcId(asset || {});
    if (!cid) return;
    ohlcv(cid, 30)
      .then((j) => {
        const s1 = seriesFromOhlcv(j, cid);
        if (s1.length) { setChart(s1); return; }
        throw new Error("empty ohlcv");
      })
      .catch(() =>
        histQuotes(cid, 30)
          .then((j) => setChart(seriesFromHist(j, cid)))
          .catch(() => {}),
      );
  }, [asset]);

  const px = mark(asset || {});
  const tokens = asset?.tokens || [];
  const buy = mintFor(asset || {});

  return (
    <section className="page">
      <h1>{asset?.name || `RWA ${id}`}</h1>
      <p className="muted">{s.label}</p>
      {err && <p className="warn">{err}</p>}
      <dl className="kv">
        <div><dt>CMC mark</dt><dd>{px ? `$${Number(px).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"}</dd></div>
        <div><dt>US cash session</dt><dd>{s.open ? "Open" : "Closed"}</dd></div>
      </dl>
      {tokens.length > 0 && (
        <p className="muted">On-chain tokens: {tokens.map((t) => `${t.symbol} $${Number(t.price || 0).toFixed(2)}`).join(" · ")}</p>
      )}
      {buy ? (
        <a className="buy" href={jupBuy(buy.mint)} target="_blank" rel="noreferrer">Buy {buy.symbol} on Jupiter</a>
      ) : (
        <p className="muted">CMC does not execute trades. No Solana mint is mapped for this name yet, so there is no on-site swap.</p>
      )}
      <div className="chart-box">
        {chart.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart}>
              <XAxis dataKey="t" hide />
              <YAxis domain={["auto", "auto"]} hide />
              <Tooltip />
              <Line type="monotone" dataKey="c" stroke="#c4922a" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="muted">Waiting on CMC history for the linked token id.</p>
        )}
      </div>
    </section>
  );
}
