export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--line)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--card)] text-lg font-semibold">
            lo
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[color:var(--accent)]">
              life_OS
            </p>
            <p className="text-xs text-[color:var(--ink-soft)]">
              finance module
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-[color:var(--ink-soft)] md:flex">
          <a className="transition hover:text-[color:var(--ink)]" href="/dashboard">
            Dashboard
          </a>
          <a
            className="transition hover:text-[color:var(--ink)]"
            href="/transactions"
          >
            Transactions
          </a>
          <a className="transition hover:text-[color:var(--ink)]" href="/budgets">
            Budgets
          </a>
          <a
            className="transition hover:text-[color:var(--ink)]"
            href="/businesses"
          >
            Businesses
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-[color:var(--line)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[color:var(--ink-soft)] transition hover:border-[color:var(--accent)] sm:inline-flex">
            Sync
          </button>
          <button className="rounded-full bg-[color:var(--ink)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[color:var(--base)] transition hover:-translate-y-0.5">
            New Entry
          </button>
        </div>
      </div>
    </header>
  );
}
