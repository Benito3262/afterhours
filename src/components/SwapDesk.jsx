import { useEffect, useState } from "react";
import { USDC } from "../lib/mints";

export default function SwapDesk({ solMint, evmAddr }) {
  const [tab, setTab] = useState(solMint ? "sol" : evmAddr ? "evm" : "sol");

  useEffect(() => {
    if (tab !== "sol" || !solMint) return;
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
  }, [tab, solMint]);

  if (!solMint && !evmAddr) {
    return <p className="muted">No Solana or Ethereum contract on this asset yet.</p>;
  }

  const jumper = evmAddr
    ? `https://jumper.exchange/?fromChain=1&toChain=1&toToken=${evmAddr}`
    : "";

  return (
    <div className="desk">
      <div className="tabs">
        {solMint && <button className={tab === "sol" ? "on" : ""} onClick={() => setTab("sol")}>Solana</button>}
        {evmAddr && <button className={tab === "evm" ? "on" : ""} onClick={() => setTab("evm")}>Ethereum</button>}
      </div>
      {tab === "sol" && solMint && <div id="ah-jup" className="jup" />}
      {tab === "evm" && evmAddr && (
        <iframe className="jup" title="evm-swap" src={jumper} allow="clipboard-write; clipboard-read" />
      )}
    </div>
  );
}
