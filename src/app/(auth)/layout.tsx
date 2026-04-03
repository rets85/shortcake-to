export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#08080F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold">
            <span>🍓</span>
            <span>
              <span className="text-violet-400">shortcake</span>
              <span className="text-slate-500">.to</span>
            </span>
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
