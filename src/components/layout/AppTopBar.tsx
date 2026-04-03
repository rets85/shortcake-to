"use client";

interface AppTopBarProps {
  title: string;
  action?: React.ReactNode;
}

export default function AppTopBar({ title, action }: AppTopBarProps) {
  return (
    <div className="h-14 shrink-0 bg-white border-b border-slate-100 px-6 flex items-center justify-between">
      <h1 className="text-base font-semibold text-slate-900">{title}</h1>
      {action && <div>{action}</div>}
    </div>
  );
}
