import { lazy, Suspense, useEffect } from "react";
import { USDC } from "../lib/mints";

const EvmSwap = lazy(() => import("./EvmSwap"));

export default function SwapDesk({ solMint, evmAddr }) {
  useEffect(() => {
    if (!solMint) return;
    const start = () => {
      if (!window.Jupiter?.init) return false;
      window.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "ah-jup",
        defaultInputMint: USDC,
        defaultOutputMint: solMint,
      });
      return true;
    };
    if (start()) return;
    const t = setInterval(() => { if (start()) clearInterval(t); }, 400);
    return () => clearInterval(t);
  }, [solMint]);

  if (!solMint && !evmAddr) {
    return <p className="muted">No Solana or Ethereum contract on this asset yet.</p>;
  }

  return (
    <div className="desk">
      {solMint && (
        <>
          <h3>Solana</h3>
          <div id="ah-jup" className="jup" />
        </>
      )}
      {evmAddr && (
        <>
          <h3>Ethereum</h3>
          <p className="muted">LI.FI widget on this page. Connect in the widget. Signs in MetaMask.</p>
          <Suspense fallback={<p className="muted">Loading EVM desk…</p>}>
            <EvmSwap evmAddr={evmAddr} />
          </Suspense>
        </>
      )}
    </div>
  );
}
