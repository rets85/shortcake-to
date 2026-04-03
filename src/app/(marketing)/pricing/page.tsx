import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
};

const PLAN_FEATURES = [
  "Unlimited short links",
  "Click analytics",
  "Custom slugs",
  "Dashboard access",
  "Cancel anytime",
];

export default function PricingPage() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent text-glow">
          Simple pricing
        </h1>
        <p className="text-lg text-slate-400 mt-4 max-w-xl mx-auto">
          One plan. Everything included. No tiers, no upsells, no surprises.
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <div className="bg-[#0F0F1A] border border-violet-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(124,58,237,0.15)] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs rounded-full px-3 py-1 uppercase tracking-widest font-medium">
                Shortcake Pro
              </span>
            </div>

            <div className="text-center">
              <div className="flex items-end justify-center gap-1">
                <span className="font-display text-6xl font-bold text-white leading-none">
                  $9
                </span>
                <span className="text-slate-400 text-lg mb-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3">
              {PLAN_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <span className="text-violet-400 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="block w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-3 rounded-lg text-center transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] active:scale-[0.98]"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 mt-8 max-w-md mx-auto">
        No credit card required to sign up. Start free, subscribe when you&apos;re ready.
      </p>
    </section>
  );
}
