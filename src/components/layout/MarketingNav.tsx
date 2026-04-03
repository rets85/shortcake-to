import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function MarketingNav() {
  return (
    <>
      <Logo />
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Start for $9/month
        </Link>
      </div>
    </>
  );
}
