export const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const SOLANA_MINTS = {
  AAPLx: "XsbEhLAtcf6HdfpFZ5xEMdqW8nfAvcsP5bdudRLJzJp",
  NVDAx: "Xsc9qvGR1efVDFGLrVsmkzv3qi45LTBjeUKSPmx9qEh",
  TSLAx: "XsDoVfqeBukxuZHWhdvWHBhgEHjGNst4MLodqsJHzoB",
  METAx: "Xsa62P5mvPszXL1krVUnU5ar38bBSVcWAB6fmPCo5Zu",
  SPCXx: "Xs3oZwbHvqis4NYcf4YKWmEia2eC84wSiVrcYcTqpH8",
};
export function mintFor(asset) {
  const syms = [asset?.symbol, ...(asset?.tokens || []).map((t) => t.symbol)].filter(Boolean);
  for (const s of syms) {
    if (SOLANA_MINTS[s]) return { symbol: s, mint: SOLANA_MINTS[s] };
  }
  const name = String(asset?.name || "").toLowerCase();
  if (name.includes("apple")) return { symbol: "AAPLx", mint: SOLANA_MINTS.AAPLx };
  if (name.includes("nvidia")) return { symbol: "NVDAx", mint: SOLANA_MINTS.NVDAx };
  if (name.includes("tesla")) return { symbol: "TSLAx", mint: SOLANA_MINTS.TSLAx };
  if (name.includes("spacex") || name.includes("space x")) return { symbol: "SPCXx", mint: SOLANA_MINTS.SPCXx };
  return null;
}
export function jupBuy(mint) {
  return `https://jup.ag/swap?sell=${USDC}&buy=${mint}`;
}
