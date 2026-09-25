import { LiFiWidget } from "@lifi/widget";

export default function EvmSwap({ evmAddr }) {
  const toToken = evmAddr
    ? { chainId: 1, address: evmAddr }
    : undefined;
  return (
    <LiFiWidget
      integrator="AfterHours"
      config={{
        appearance: "light",
        theme: { container: { borderRadius: "16px", border: "1px solid #d5e2f2" } },
        toChain: 1,
        toToken: evmAddr,
        tokens: toToken ? { toToken } : undefined,
      }}
    />
  );
}
