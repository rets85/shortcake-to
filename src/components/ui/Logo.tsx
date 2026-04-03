import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
      <span>🍓</span>
      <span>
        <span className="text-violet-400">shortcake</span>
        <span className="text-slate-500">.to</span>
      </span>
    </Link>
  );
}
