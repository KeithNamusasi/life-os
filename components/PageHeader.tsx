import type React from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-[color:var(--line)] bg-white/80 p-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--ink-soft)]">
          {eyebrow}
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-[color:var(--ink-soft)]">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
