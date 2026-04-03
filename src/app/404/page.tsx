import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#08080F] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🍓</div>
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          404
        </h1>
        <p className="text-lg text-slate-400 mb-6">
          This link doesn&apos;t exist or has been disabled.
        </p>
        <Link
          href="/"
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
