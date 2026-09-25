export function unwrap(json) {
  const d = json?.data;
  if (!d) return [];
  if (Array.isArray(d)) return d;
  if (Array.isArray(d.rwa_assets)) return d.rwa_assets;
  if (Array.isArray(d.assets)) return d.assets;
  if (typeof d === "object") return Object.values(d);
  return [];
}
export function pickAsset(json, id) {
  const rows = unwrap(json);
  return rows.find((a) => String(a.rwa_id || a.id) === String(id)) || rows[0] || {};
}
export function mark(a) {
  return a.average_tokenized_price || a.quote?.USD?.price || a.price || a.tokens?.[0]?.price;
}
export function tokenCmcId(a) {
  return a.tokens?.[0]?.crypto_id || a.tokens?.[0]?.id || a.cmc_id;
}
