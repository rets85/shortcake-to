import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="font-bold text-lg tracking-tight text-slate-900">
      🍓 <span className="text-rose-500">shortcake</span>
      <span className="text-slate-400">.to</span>
    </Link>
  );
}
