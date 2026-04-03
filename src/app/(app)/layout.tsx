import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppSidebar from "@/components/layout/AppSidebar";
import AppTopBar from "@/components/layout/AppTopBar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="hidden md:flex w-56 shrink-0 bg-white border-r border-slate-100 h-screen sticky top-0 flex-col">
        <AppSidebar userEmail={session.user.email} />
      </aside>

      <div className="flex flex-1 flex-col min-h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
