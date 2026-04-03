import Link from "next/link";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const FEATURES = [
  {
    icon: "⚡",
    title: "Edge-fast redirects",
    description: (
      <>
        <span className="text-violet-400 font-mono">&lt;50ms</span> redirects
        via edge middleware. Your links never keep visitors waiting.
      </>
    ),
  },
  {
    icon: "🔗",
    title: "Unlimited links",
    description:
      "Create as many short links as you need. No caps, no upgrades, no surprises.",
  },
  {
    icon: "📊",
    title: "Click tracking",
    description:
      "Know exactly how many times each link was clicked and when.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Paste your long URL",
    description: "Drop in any link, no matter how long.",
  },
  {
    step: "02",
    title: "Get a short link instantly",
    description: "We generate shortcake.to/abc123 in milliseconds.",
  },
  {
    step: "03",
    title: "Track every click",
    description: "See real-time click counts in your dashboard.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Finally a link shortener that doesn't feel like it's from 2012.",
    name: "Alex M.",
    role: "Growth Marketer",
  },
  {
    quote:
      "Simple, fast, and the dashboard is actually pleasant to use.",
    name: "Sarah K.",
    role: "Content Creator",
  },
  {
    quote: "Set it up in 2 minutes. My team loves it.",
    name: "David R.",
    role: "Startup Founder",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-grid min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 relative">
        {/* Radial glow behind headline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent text-glow">
            Short links.
            <br />
            No noise.
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mt-4">
            Clean, trackable short links. No tiers. No limits. Just fast.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
              href="/signup"
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] active:scale-[0.98]"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Sign in →
            </Link>
          </div>

          {/* Demo widget */}
          <div className="mt-12 w-full max-w-lg mx-auto space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue="https://my-very-long-website.com/articles/how-to-do-things"
                className="bg-[#0F0F1A] border border-[#1E1E3A] focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full"
                readOnly
              />
              <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] shrink-0">
                →
              </button>
            </div>
            <div className="font-mono text-cyan-400 text-sm bg-[#08080F] border border-[#1E1E3A] rounded-lg px-4 py-2.5 flex items-center gap-2">
              <span>shortcake.to/abc123</span>
              <button
                className="ml-auto text-slate-500 hover:text-cyan-400 transition-colors"
                aria-label="Copy"
              >
                <ClipboardDocumentIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#0F0F1A] border border-[#1E1E3A] border-t-2 border-t-violet-500/50 rounded-2xl p-6 hover:border-[#2D2D5A] transition-colors duration-200"
            >
              <div className="text-2xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            How it works
          </h2>
          <p className="text-slate-400 mt-3 max-w-md mx-auto">
            Three steps. That&apos;s it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative text-center">
              {/* Step number */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-600/10 border border-violet-500/30 mb-4">
                <span className="font-mono text-sm font-bold text-violet-400">
                  {s.step}
                </span>
              </div>
              {/* Connector line (hidden on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
              )}
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Built for speed ── */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Your links, faster than fast
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Shortcake runs on edge middleware — your visitors never wait. Links
            redirect in under 50ms, anywhere in the world.
          </p>

          {/* Big stat */}
          <div className="inline-block">
            <div className="font-display text-7xl sm:text-8xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent text-glow leading-none">
              &lt;&nbsp;50ms
            </div>
            <p className="text-sm text-slate-500 mt-3 uppercase tracking-widest">
              average redirect time
            </p>
          </div>
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Loved by makers
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Join hundreds of creators, marketers, and developers who use
            Shortcake to make their links work harder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-[#0F0F1A] border border-[#1E1E3A] rounded-2xl p-6 hover:border-[#2D2D5A] transition-colors duration-200"
            >
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-6 py-24 text-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to shorten?
          </h2>
          <p className="text-slate-400 mb-8">
            Create your first short link in seconds.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] active:scale-[0.98]"
            >
              Start free
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              View pricing →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
