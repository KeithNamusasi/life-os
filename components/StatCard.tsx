type StatCardProps = {
  label: string;
  value: string;
  change?: string;
};

export default function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-[color:var(--line)] bg-white/80 p-5 shadow-[0_16px_50px_-45px_rgba(0,0,0,0.7)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      {change ? (
        <p className="mt-2 text-xs text-[color:var(--accent)]">{change}</p>
      ) : null}
    </div>
  );
}
