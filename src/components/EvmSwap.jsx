export default function EvmSwap({ evmAddr }) {
  const src = evmAddr
    ? `https://widget.li.fi/?toChain=1&toToken=${encodeURIComponent(evmAddr)}`
    : "https://widget.li.fi";
  return (
    <iframe
      className="jup"
      title="lifi"
      src={src}
      allow="clipboard-write; publickey-credentials-get; clipboard-read"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
