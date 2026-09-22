"use client";

import { useCallback, useState } from "react";

type ToastKind = "success" | "error" | "info";

interface ToastState {
  message: string;
  kind: ToastKind;
  visible: boolean;
}

export function useToast() {
  const [state, setState] = useState<ToastState>({
    message: "",
    kind: "info",
    visible: false,
  });

  const toast = useCallback((message: string, kind: ToastKind = "info") => {
    setState({ message, kind, visible: true });
    window.setTimeout(() => setState((s) => ({ ...s, visible: false })), 3500);
  }, []);

  const ToastHost = useCallback(
    () => (
      <div
        className={[
          "fixed bottom-5 right-5 z-[9999] max-w-[290px] rounded-[10px] px-4 py-3 text-[0.84rem] font-medium text-white shadow-[0_6px_24px_rgba(0,0,0,0.2)] transition-all duration-300",
          state.visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0",
          state.kind === "success" ? "bg-green" : state.kind === "error" ? "bg-[#c0392b]" : "bg-dark",
        ].join(" ")}
        role="status"
      >
        {state.message}
      </div>
    ),
    [state]
  );

  return { toast, ToastHost };
}
