"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

export type TxStatus = "idle" | "wallet" | "confirming" | "success" | "error";

/**
 * Small transaction lifecycle wrapper: write → wallet prompt → confirmation →
 * receipt. Exposes a single status string the UI can render directly.
 */
export function useTx() {
  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  let status: TxStatus = "idle";
  if (isPending) status = "wallet";
  else if (hash && receipt.isLoading) status = "confirming";
  else if (hash && receipt.isSuccess) status = "success";
  if (writeError || receipt.error) status = "error";

  const error = writeError ?? receipt.error ?? null;
  // Wallet rejections and node errors get noisy — keep the first line only.
  const errorMessage = error ? error.message.split("\n")[0] : null;

  return { writeContract, hash, status, errorMessage, reset };
}

export function txLabel(status: TxStatus, idle: string): string {
  switch (status) {
    case "wallet":
      return "Confirm in wallet…";
    case "confirming":
      return "Confirming…";
    default:
      return idle;
  }
}
