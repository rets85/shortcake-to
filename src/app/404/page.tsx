import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🍓</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <p className="text-lg text-slate-500 mb-6">
          This link doesn&apos;t exist or has been disabled.
        </p>
        <Link
          href="/"
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
