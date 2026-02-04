export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-xs text-[color:var(--ink-soft)] sm:flex-row sm:items-center lg:px-12">
        <p className="uppercase tracking-[0.25em]">life_OS v0.1</p>
        <div className="flex items-center gap-4">
          <span>Security: RLS enabled</span>
          <span>Region: africa-south</span>
        </div>
      </div>
    </footer>
  );
}
