import { useState } from "react";

function short(a) {
  return a ? `${a.slice(0, 4)}…${a.slice(-4)}` : "";
}

export default function WalletBar() {
  const [sol, setSol] = useState("");
  const [evm, setEvm] = useState("");
  const [err, setErr] = useState("");

  async function connectSol() {
    setErr("");
    const p = window.solana || window.phantom?.solana;
    if (!p) { setErr("Install Phantom or Solflare"); return; }
    const r = await p.connect();
    setSol(r.publicKey?.toString?.() || p.publicKey?.toString?.() || "");
  }
  function disconnectSol() {
    try { window.solana?.disconnect?.(); } catch {}
    setSol("");
  }
  async function connectEvm() {
    setErr("");
    const eth = window.ethereum;
    if (!eth) { setErr("Install MetaMask"); return; }
    const acc = await eth.request({ method: "eth_requestAccounts" });
    setEvm(acc[0] || "");
  }
  function disconnectEvm() { setEvm(""); }

  return (
    <div className="wallets">
      {sol ? (
        <button type="button" onClick={disconnectSol}>Solana {short(sol)} · Disconnect</button>
      ) : (
        <button type="button" onClick={connectSol}>Connect Solana</button>
      )}
      {evm ? (
        <button type="button" onClick={disconnectEvm}>ETH {short(evm)} · Disconnect</button>
      ) : (
        <button type="button" onClick={connectEvm}>Connect Ethereum</button>
      )}
      {err && <span className="warn">{err}</span>}
    </div>
  );
}
