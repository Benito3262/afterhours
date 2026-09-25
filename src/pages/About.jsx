export default function About() {
  return (
    <section className="page">
      <h1>About</h1>
      <p>AFTER HOURS uses CoinMarketCap RWA data. It is a different product from WRAPPER.</p>
      <p className="muted">Endpoints: assets/list, quotes/latest, issuers/list, OHLCV historical, quotes historical.</p>
      <p className="muted">CMC does not sell stock. When we know a Solana mint (AAPLx, NVDAx, TSLAx, SPCXx), Buy opens Jupiter. Session open/close is computed for NYSE hours.</p>
    </section>
  );
}

      <h2>What we cannot embed</h2>
      <p className="muted">Robinhood, cash brokerages, and most bank apps do not give a public buy widget. CMC lists on-chain issuers (Paxos, Tether Gold, Backed, xStocks). Those appear under Issuers when the API returns them.</p>
