import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Sidebar from "@/components/Sidebar";

const transactions = [
  { id: "1", type: "Expense", category: "Food", amount: "KES 500", source: "WhatsApp" },
  { id: "2", type: "Income", category: "Sales", amount: "KES 2,000", source: "Web" },
  { id: "3", type: "Expense", category: "Transport", amount: "KES 220", source: "WhatsApp" },
];

export default function TransactionsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[240px_1fr] lg:px-12">
        <Sidebar />
        <main className="space-y-8">
          <PageHeader
            eyebrow="Transactions"
            title="Capture every cash move"
            description="Log income or expenses manually or from WhatsApp."
            action={
              <button className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5">
                Add transaction
              </button>
            }
          />

          <section className="rounded-3xl border border-[color:var(--line)] bg-white/80 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--ink-soft)]">
              Quick add
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <input
                className="h-12 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)]"
                placeholder="Amount"
              />
              <input
                className="h-12 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)]"
                placeholder="Category"
              />
              <select className="h-12 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)]">
                <option>Expense</option>
                <option>Income</option>
              </select>
              <button className="h-12 rounded-full bg-[color:var(--ink)] px-4 text-xs uppercase tracking-[0.25em] text-[color:var(--base)] transition hover:-translate-y-0.5">
                Save
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-[color:var(--line)] bg-white/80 p-6">
            <div className="grid gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--ink-soft)] sm:grid-cols-4">
              <span>Type</span>
              <span>Category</span>
              <span>Amount</span>
              <span>Source</span>
            </div>
            <div className="mt-4 space-y-3">
              {transactions.map((row) => (
                <div
                  key={row.id}
                  className="grid items-center gap-3 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm sm:grid-cols-4"
                >
                  <span className="font-semibold">{row.type}</span>
                  <span>{row.category}</span>
                  <span>{row.amount}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
                    {row.source}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
