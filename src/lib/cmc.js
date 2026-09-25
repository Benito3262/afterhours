export async function cmc(path, params = {}) {
  const q = new URLSearchParams({ path, ...params });
  const res = await fetch(`/api/cmc?${q}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || json.status?.error_message || `CMC ${res.status}`);
  return json;
}

export async function listRwa() {
  return cmc("/v5/real-world-assets/assets/list", { limit: "50" });
}

export async function rwaQuote(ids) {
  return cmc("/v5/real-world-assets/quotes/latest", { rwa_id: String(ids) });
}

export async function ohlcv(id, count = 30) {
  return cmc("/v2/cryptocurrency/ohlcv/historical", {
    id: String(id),
    time_period: "daily",
    count: String(count),
    convert: "USD",
  });
}
