"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/config/wagmi";
import { WalletModal } from "./WalletModal";

type WalletUI = { open: () => void; close: () => void; isOpen: boolean };

const WalletUIContext = createContext<WalletUI | null>(null);

export function useWalletModal() {
  const ctx = useContext(WalletUIContext);
  if (!ctx)
    throw new Error("useWalletModal must be used within <WalletProvider>");
  return ctx;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletUIContext.Provider value={{ open, close, isOpen }}>
          {children}
          <WalletModal isOpen={isOpen} onClose={close} />
        </WalletUIContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
