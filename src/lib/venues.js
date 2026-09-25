import { USDC } from "./mints";

export function venuesFromInfo(info, id) {
  const row = info?.data?.[id] || info?.data?.[String(id)] || {};
  const list = row.contract_address || [];
  const out = [];
  for (const c of list) {
    const addr = c.contract_address || c.address;
    const platform = (c.platform?.name || c.platform?.coin?.name || "").toLowerCase();
    if (!addr) continue;
    if (platform.includes("solana")) {
      out.push({
        chain: "Solana",
        addr,
        href: `https://jup.ag/swap?sell=${USDC}&buy=${addr}`,
        embed: `https://jup.ag/swap/USDC-${addr}`,
      });
    } else if (platform.includes("ethereum")) {
      out.push({
        chain: "Ethereum",
        addr,
        href: `https://app.uniswap.org/swap?outputCurrency=${addr}&chain=mainnet`,
        embed: `https://app.uniswap.org/swap?outputCurrency=${addr}&chain=mainnet`,
      });
    } else if (platform.includes("bnb") || platform.includes("bsc")) {
      out.push({
        chain: "BNB",
        addr,
        href: `https://pancakeswap.finance/swap?outputCurrency=${addr}`,
        embed: null,
      });
    }
  }
  return out;
}
