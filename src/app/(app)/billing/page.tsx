"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Toast from "@/components/ui/Toast";

export default function BillingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const user = session?.user as any;
  const hasActiveSubscription = user?.subscriptionStatus === "active";

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
    <>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Billing</h1>
      <p className="text-sm text-slate-500 mb-6">
        Manage your subscription and payment details.
      </p>

      {/* Current Plan Card */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Shortcake Pro
              </h2>
              {hasActiveSubscription && (
                <span className="bg-emerald-50 text-emerald-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
              {user?.subscriptionStatus === "canceled" && (
                <span className="bg-amber-50 text-amber-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  Cancels {user?.subscriptionEnd && new Date(user.subscriptionEnd).toLocaleDateString()}
                </span>
              )}
              {!hasActiveSubscription && user?.subscriptionStatus !== "canceled" && (
                <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2 py-0.5 rounded-full">
                  Inactive
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              $9<span className="text-base font-normal text-slate-500">/month</span>
            </p>
          </div>
          <span className="text-4xl">🍓</span>
        </div>

        <hr className="border-slate-100 my-4" />

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-slate-500">
              {hasActiveSubscription ? "Next billing date" : "Plan"}
            </p>
            <p className="font-medium text-slate-900 mt-0.5">
              {hasActiveSubscription && user?.subscriptionEnd
                ? new Date(user.subscriptionEnd).toLocaleDateString()
                : "No active subscription"}
            </p>
          </div>
          {hasActiveSubscription && (
            <button
              onClick={handleManageBilling}
              disabled={loading}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              {loading ? "Loading..." : "Manage billing"}
            </button>
          )}
          {!hasActiveSubscription && (
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              {loading ? "Loading..." : "Start subscription"}
            </button>
          )}
        </div>
      </div>

      {/* Cancel/Reactivate */}
      <div className="text-center">
        {hasActiveSubscription && (
          <button
            onClick={handleManageBilling}
            className="text-sm text-slate-400 hover:text-red-500 transition-colors underline-offset-2 hover:underline"
          >
            Cancel subscription
          </button>
        )}
        {user?.subscriptionStatus === "canceled" && (
          <button
            onClick={handleManageBilling}
            className="text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors"
          >
            Reactivate subscription
          </button>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
