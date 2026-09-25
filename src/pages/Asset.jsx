import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cryptoInfo, histQuotes, ohlcv, rwaQuote } from "../lib/cmc";
import { jupBuy, mintFor } from "../lib/mints";
import { venuesFromInfo } from "../lib/venues";
import { mark, pickAsset, tokenCmcId } from "../lib/parse";
import { sessionStatus } from "../lib/session";
import SwapDesk from "../components/SwapDesk";

function packOhlcv(j, cid) {
  const raw = j.data;
  const q = raw?.quotes || raw?.[cid]?.quotes || [];
  return q.map((c) => ({
    t: String(c.time_close || c.time_open || "").slice(5, 16).replace("T", " "),
    c: c.quote?.USD?.close,
  })).filter((p) => p.c);
}
function packHist(j, cid) {
  const raw = j.data;
  const q = raw?.quotes || raw?.[cid]?.quotes || [];
  return q.map((c) => ({
    t: String(c.timestamp || "").slice(5, 16).replace("T", " "),
    c: c.quote?.USD?.price,
  })).filter((p) => p.c);
}

export default function Asset() {
  const { id } = useParams();
  const s = sessionStatus();
  const [asset, setAsset] = useState(null);
  const [chart, setChart] = useState([]);
  const [range, setRange] = useState("7D");
  const [err, setErr] = useState("");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    rwaQuote(id).then((j) => setAsset(pickAsset(j, id))).catch((e) => setErr(e.message));
  }, [id]);

  useEffect(() => {
    const cid = tokenCmcId(asset || {});
    if (!cid) return;
    const hourly = range === "24H";
    const count = range === "24H" ? 24 : range === "7D" ? 7 : 30;
    const load = hourly
      ? ohlcv(cid, 24).then((j) => packOhlcv(j, cid))
      : ohlcv(cid, count).then((j) => {
          const s1 = packOhlcv(j, cid);
          if (s1.length) return s1;
          throw new Error("empty");
        }).catch(() => histQuotes(cid, count).then((j) => packHist(j, cid)));
    load.then(setChart).catch(() => setChart([]));
  }, [asset, range]);
  useEffect(() => {
    const ids = (asset?.tokens || []).map((x) => x.crypto_id || x.id).filter(Boolean);
    const first = tokenCmcId(asset || {});
    const all = [...new Set([first, ...ids].filter(Boolean))];
    if (!all.length) return;
    Promise.all(all.map((cid) => cryptoInfo(cid).then((j) => venuesFromInfo(j, cid)).catch(() => [])))
      .then((lists) => {
        const flat = lists.flat();
        const seen = new Set();
        setVenues(flat.filter((v) => (seen.has(v.addr) ? false : seen.add(v.addr))));
      });
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
        <p className="muted">Tokens: {tokens.map((t) => `${t.symbol} $${Number(t.price || 0).toFixed(2)}`).join(" · ")}</p>
      )}
      <div className="tabs">
        {["24H", "7D", "30D"].map((r) => (
          <button key={r} className={range === r ? "on" : ""} onClick={() => setRange(r)}>{r}</button>
        ))}
      </div>
      <div className="chart-box">
        {chart.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart} margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
              <CartesianGrid stroke="#d5e2f2" strokeDasharray="3 3" />
              <XAxis dataKey="t" tick={{ fontSize: 11 }} minTickGap={24} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} width={64} tickFormatter={(v) => `$${Number(v).toFixed(0)}`} />
              <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)}`, "Price"]} />
              <Line type="monotone" dataKey="c" stroke="#2f6fed" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="muted">No history for this range yet.</p>
        )}
      </div>
      <h2>Buy on this page</h2>
      <SwapDesk
        solMint={buy?.mint || venues.find((v) => v.chain === "Solana")?.addr}
        evmAddr={venues.find((v) => v.chain === "Ethereum")?.addr}
      />
    </section>
  );
}
