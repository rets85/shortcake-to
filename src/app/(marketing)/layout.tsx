import MarketingNav from "@/components/layout/MarketingNav";
import Logo from "@/components/ui/Logo";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <header className="h-14 border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <MarketingNav />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-100 bg-white py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="/privacy" className="hover:text-slate-700 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-slate-700 transition-colors">
              Terms
            </a>
            <span>© 2026 shortcake.to</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
