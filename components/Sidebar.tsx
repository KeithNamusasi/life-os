const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transactions", href: "/transactions" },
  { label: "Budgets", href: "/budgets" },
  { label: "Businesses", href: "/businesses" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-full flex-col gap-6 rounded-3xl border border-[color:var(--line)] bg-white/80 p-6 text-sm lg:flex">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--ink-soft)]">
          Workflows
        </p>
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-transparent px-4 py-3 transition hover:border-[color:var(--accent)] hover:bg-[color:var(--card)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="space-y-3 rounded-2xl border border-dashed border-[color:var(--line)] p-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--ink-soft)]">
          WhatsApp
        </p>
        <p className="text-sm text-[color:var(--ink-soft)]">
          Send: <span className="font-semibold">spent 500 food</span>
        </p>
        <button className="rounded-full border border-[color:var(--line)] px-3 py-2 text-xs uppercase tracking-[0.25em] text-[color:var(--ink-soft)] transition hover:border-[color:var(--accent)]">
          Connect
        </button>
      </div>
      <div className="space-y-3 rounded-2xl bg-[color:var(--ink)] p-4 text-[color:var(--base)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--base)]/60">
          Status
        </p>
        <p className="text-lg font-semibold">All systems steady</p>
        <p className="text-xs text-[color:var(--base)]/70">
          3 budgets running, 12 days left this cycle.
        </p>
      </div>
    </aside>
  );
}
