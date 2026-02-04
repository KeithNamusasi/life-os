import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Sidebar from "@/components/Sidebar";

const businesses = [
  { id: "1", name: "Studio Umoja", status: "Active", revenue: "KES 45k" },
  { id: "2", name: "Transit Hub", status: "Paused", revenue: "KES 12k" },
  { id: "3", name: "Green Market", status: "Active", revenue: "KES 28k" },
];

export default function BusinessesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[240px_1fr] lg:px-12">
        <Sidebar />
        <main className="space-y-8">
          <PageHeader
            eyebrow="Businesses"
            title="Track multiple income streams"
            description="Add businesses to separate cashflows and reports."
            action={
              <button className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5">
                Add business
              </button>
            }
          />

          <section className="grid gap-4 md:grid-cols-2">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="rounded-3xl border border-[color:var(--line)] bg-white/80 p-6"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--ink-soft)]">
                  {business.status}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{business.name}</h3>
                <p className="mt-3 text-sm text-[color:var(--ink-soft)]">
                  Weekly revenue
                </p>
                <p className="mt-1 text-lg font-semibold">{business.revenue}</p>
                <button className="mt-6 rounded-full border border-[color:var(--line)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[color:var(--ink-soft)] transition hover:border-[color:var(--accent)]">
                  View reports
                </button>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--ink-soft)]">
              Coming next
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Team access controls</h3>
            <p className="mt-3 text-sm text-[color:var(--ink-soft)]">
              Invite staff with roles, apply RLS policies per business, and export reports.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
