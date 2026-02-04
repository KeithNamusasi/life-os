import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Sidebar from "@/components/Sidebar";

const budgets = [
  { id: "1", category: "Food", spent: "KES 3,200", limit: "KES 5,000", progress: 64 },
  { id: "2", category: "Transport", spent: "KES 1,100", limit: "KES 2,500", progress: 44 },
  { id: "3", category: "Utilities", spent: "KES 900", limit: "KES 2,000", progress: 45 },
];

export default function BudgetsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[240px_1fr] lg:px-12">
        <Sidebar />
        <main className="space-y-8">
          <PageHeader
            eyebrow="Budgets"
            title="Protect your monthly limits"
            description="Track categories and get WhatsApp alerts before overspending."
            action={
              <button className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5">
                New budget
              </button>
            }
          />

          <section className="grid gap-4 md:grid-cols-2">
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="rounded-3xl border border-[color:var(--line)] bg-white/80 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--ink-soft)]">
                      {budget.category}
                    </p>
                    <p className="mt-2 text-xl font-semibold">{budget.spent}</p>
                  </div>
                  <span className="rounded-full bg-[color:var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                    {budget.limit}
                  </span>
                </div>
                <div className="mt-5 h-2 rounded-full bg-[color:var(--card)]">
                  <div
                    className="h-2 rounded-full bg-[color:var(--accent)]"
                    style={{ width: `${budget.progress}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-[color:var(--ink-soft)]">
                  {budget.progress}% used · 12 days remaining
                </p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--ink)] p-6 text-[color:var(--base)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--base)]/60">
              Alerts
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              WhatsApp nudges keep you in range
            </h3>
            <p className="mt-3 text-sm text-[color:var(--base)]/70">
              We will ping you when spending crosses 80% of any budget.
            </p>
            <button className="mt-6 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[color:var(--base)] transition hover:bg-white/10">
              Enable alerts
            </button>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
