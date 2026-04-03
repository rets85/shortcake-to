"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onDismiss: () => void;
}

export default function Toast({ message, type = "success", onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 200);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 min-w-[260px]">
        <span className={type === "success" ? "text-emerald-500" : "text-red-500"}>
          {type === "success" ? "✓" : "✕"}
        </span>
        <p className="text-sm font-medium text-slate-900">{message}</p>
      </div>
    </div>
  );
}
