import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function MarketingNav() {
  return (
    <>
      <Logo />
      <div className="flex items-center gap-4">
        <Link
          href="/pricing"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="/login"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
        >
          Get started
        </Link>
      </div>
    </>
  );
}
