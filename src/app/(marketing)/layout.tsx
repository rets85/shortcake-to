import MarketingNav from "@/components/layout/MarketingNav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#08080F]">
      <nav className="border-b border-[#1E1E3A] bg-[#08080F]/80 backdrop-blur-md h-14 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <MarketingNav />
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#1E1E3A] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <p className="text-sm text-slate-600">
            © 2026{" "}
            <span className="text-slate-500">shortcake.to</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <a
              href="/pricing"
              className="hover:text-slate-400 transition-colors"
            >
              Pricing
            </a>
            <a
              href="/privacy"
              className="hover:text-slate-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="hover:text-slate-400 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
