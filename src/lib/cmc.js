export async function cmc(path, params = {}) {
  const q = new URLSearchParams({ path, ...params });
  const res = await fetch(`/api/cmc?${q}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || json.status?.error_message || `CMC ${res.status}`);
  return json;
}
export const listRwa = () => cmc("/v5/real-world-assets/assets/list", { limit: "50" });
export const rwaQuote = (ids) => cmc("/v5/real-world-assets/quotes/latest", { rwa_id: String(ids) });
export const ohlcv = (id, count = 30) =>
  cmc("/v2/cryptocurrency/ohlcv/historical", { id: String(id), time_period: "daily", count: String(count), convert: "USD" });
export const histQuotes = (id, count = 30) =>
  cmc("/v3/cryptocurrency/quotes/historical", { id: String(id), interval: "daily", count: String(count), convert: "USD" });

export const cryptoInfo = (id) => cmc("/v2/cryptocurrency/info", { id: String(id) });
