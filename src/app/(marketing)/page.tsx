import Link from "next/link";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const FEATURES = [
  {
    icon: "🔗",
    title: "Unlimited links",
    description: "Create as many links as you need. No caps, no tiers.",
  },
  {
    icon: "📊",
    title: "Click analytics",
    description: "See how many times each link was clicked.",
  },
  {
    icon: "⚡",
    title: "Lightning fast",
    description: "Redirects in <50ms via edge middleware.",
  },
];

const PLAN_FEATURES = [
  "Unlimited links",
  "Click tracking",
  "Custom slugs",
  "Dashboard access",
  "Cancel anytime",
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          Short links. Less friction.
          <br />
          More clicks.
        </h1>
        <p className="text-xl text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
          Shortcake gives you clean, trackable short links for $9/month. No
          limits. No tiers.
        </p>

        {/* CTA group */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/signup"
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Start for $9/month
          </Link>
          <Link
            href="/login"
            className="text-rose-500 hover:text-rose-600 font-medium text-sm underline-offset-2 hover:underline transition-colors"
          >
            Sign in →
          </Link>
        </div>

        {/* Mini Demo */}
        <div className="mt-14 max-w-lg mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl shadow-md p-5">
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue="https://my-very-long-website.com/articles/how-to-do-things"
                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 w-full focus:outline-none focus:ring-2 focus:ring-rose-400"
                readOnly
              />
              <button className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors hover:scale-[1.01]">
                Shorten it
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between bg-rose-50 border border-rose-100 rounded-lg px-3 py-2.5">
              <span className="text-sm font-semibold text-rose-600">
                shortcake.to/abc123
              </span>
              <button className="text-slate-400 hover:text-rose-500 transition-colors ml-3">
                <ClipboardDocumentIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12">
          Everything you need, nothing you don&apos;t
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
          Simple pricing. No surprises.
        </h2>
        <p className="text-slate-500 mb-12">
          One plan. Everything included.
        </p>

        <div className="max-w-sm mx-auto bg-white border-2 border-rose-200 rounded-xl shadow-md p-8">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2">
            Shortcake Pro
          </p>
          <div className="flex items-end justify-center gap-1 mb-6">
            <span className="text-5xl font-bold text-slate-900">$9</span>
            <span className="text-slate-500 mb-1.5">/month</span>
          </div>
          <ul className="space-y-3 text-left mb-8">
            {PLAN_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <span className="text-emerald-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="block w-full text-center bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>
      </section>
    </>
  );
}
