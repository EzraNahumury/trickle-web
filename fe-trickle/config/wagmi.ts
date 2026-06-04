import { createConfig, http, injected } from "wagmi";
import { celo, celoSepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

/**
 * wagmi config for Trickle.
 *
 * Wallet discovery is automatic: `multiInjectedProviderDiscovery` (on by
 * default) surfaces every EIP-6963 wallet the user has installed — MetaMask,
 * Talisman, Rabby, MiniPay, … — with no hardcoded list. We add a generic
 * `injected` fallback (for single-provider webviews like MiniPay that don't
 * announce via EIP-6963), Coinbase Wallet, and WalletConnect (only when a
 * project id is provided). The modal renders whatever ends up in
 * `useConnect().connectors`.
 *
 * Chains come straight from the README's deployments: Celo Mainnet (42220) and
 * Celo Sepolia (11142220).
 */
const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [celo, celoSepolia],
  connectors: [
    injected({ shimDisconnect: true }),
    coinbaseWallet({ appName: "Trickle", preference: "all" }),
    ...(wcProjectId
      ? [walletConnect({ projectId: wcProjectId, showQrModal: true })]
      : []),
  ],
  transports: {
    [celo.id]: http(),
    [celoSepolia.id]: http(),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
