"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Toast from "@/components/ui/Toast";

interface UserWithSubscription {
  subscriptionStatus?: string;
  subscriptionEnd?: string;
}

export default function BillingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const user = session?.user as UserWithSubscription | undefined;
  const hasActiveSubscription = user?.subscriptionStatus === "active";

  const statusMap: Record<
    string,
    { label: string; classes: string }
  > = {
    active: {
      label: "Active",
      classes:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    canceled: {
      label: "Canceled",
      classes: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
    past_due: {
      label: "Past Due",
      classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
  };

  const badge = statusMap[user?.subscriptionStatus || ""] || {
    label: "Inactive",
    classes: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setToast({
          message: "Failed to create checkout session",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setToast({
          message: "Failed to access billing portal",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 py-4">
      <h2 className="font-display text-2xl font-bold text-white">Billing</h2>
      <p className="text-sm text-slate-400">
        Manage your subscription and payment details.
      </p>

      {/* Plan card */}
      <div className="bg-[#0F0F1A] border border-violet-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(124,58,237,0.15)] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                Current plan
              </p>
              <h3 className="font-display text-2xl font-bold text-white">
                Shortcake Pro
              </h3>
            </div>
            <span
              className={`border text-xs font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide ${badge.classes}`}
            >
              {badge.label}
            </span>
          </div>

          <div className="flex items-end gap-1 mb-6">
            <span className="font-display text-4xl font-bold text-white">
              $9
            </span>
            <span className="text-slate-400 mb-1">/month</span>
          </div>

          {user?.subscriptionStatus === "canceled" && user?.subscriptionEnd && (
            <p className="text-sm text-amber-400 mb-4">
              Access until{" "}
              {new Date(user.subscriptionEnd).toLocaleDateString()}
            </p>
          )}

          <div className="h-px bg-[#1E1E3A] mb-6" />

          <ul className="space-y-2 mb-8">
            {[
              "Unlimited short links",
              "Click analytics",
              "Custom slugs",
              "Dashboard access",
            ].map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <span className="text-violet-400">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            {hasActiveSubscription ? (
              <>
                <button
                  onClick={handleManageBilling}
                  disabled={loading}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-lg text-center transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Manage subscription"}
                </button>
                <button
                  onClick={handleManageBilling}
                  disabled={loading}
                  className="border border-[#2D2D5A] hover:border-rose-500/50 bg-transparent text-slate-400 hover:text-rose-400 font-medium px-4 py-2.5 rounded-lg transition-all duration-200 text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={
                  user?.subscriptionStatus === "canceled"
                    ? handleManageBilling
                    : handleCheckout
                }
                disabled={loading}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-lg text-center transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] disabled:opacity-50"
              >
                {loading
                  ? "Loading..."
                  : user?.subscriptionStatus === "canceled"
                    ? "Reactivate subscription"
                    : "Start subscription"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
