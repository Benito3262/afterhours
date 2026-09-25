const BASE = "https://pro-api.coinmarketcap.com";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const key = process.env.CMC_API_KEY;
  if (!key) {
    res.status(501).json({ error: "CMC_API_KEY not set on the server" });
    return;
  }
  const url = new URL(req.url, "http://x");
  const path = url.searchParams.get("path") || "/v5/real-world-assets/assets/list";
  const allowed = [
    "/v5/real-world-assets/assets/list",
    "/v5/real-world-assets/map",
    "/v5/real-world-assets/info",
    "/v5/real-world-assets/quotes/latest",
    "/v5/real-world-assets/issuers/list",
    "/v2/cryptocurrency/ohlcv/historical",
    "/v2/cryptocurrency/quotes/latest",
    "/v3/cryptocurrency/quotes/historical",
  ];
  if (!allowed.includes(path)) {
    res.status(400).json({ error: "Endpoint not allowed" });
    return;
  }
  const dest = new URL(path, BASE);
  url.searchParams.forEach((v, k) => {
    if (k !== "path") dest.searchParams.set(k, v);
  });
  const r = await fetch(dest, { headers: { "X-CMC_PRO_API_KEY": key, Accept: "application/json" } });
  const body = await r.text();
  res.status(r.status).setHeader("Content-Type", "application/json").send(body);
}
