export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-[color:var(--ink)]">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,#2f7f7b55,transparent_70%)] blur-2xl animate-[glow_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-10 top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,#e86d4f55,transparent_70%)] blur-2xl animate-[glow_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#1b1b1b22,transparent_70%)] blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-10 lg:px-12">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--card)] text-lg font-semibold">
              lo
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[color:var(--accent)]">
                life_OS
              </p>
              <p className="text-xs text-[color:var(--ink-soft)]">
                personal operating system
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button className="rounded-full border border-[color:var(--line)] px-4 py-2 text-[color:var(--ink-soft)] transition hover:border-[color:var(--accent)]">
              Roadmap
            </button>
            <a
              href="/login"
              className="rounded-full bg-[color:var(--ink)] px-5 py-2 text-[color:var(--base)] transition hover:-translate-y-0.5"
            >
              Start session
            </a>
          </div>
        </nav>

        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
              focus map
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
              momentum board
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Build your day like a system, not a scramble.
            </h1>
            <p className="max-w-xl text-lg text-[color:var(--ink-soft)]">
              life_OS turns goals into an elegant rhythm of focus blocks,
              recovery moments, and quiet wins. Design a week that protects your
              energy and still moves the needle.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/dashboard"
                className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Launch life_OS
              </a>
              <a
                href="/login"
                className="rounded-full border border-[color:var(--ink)] px-6 py-3 text-sm font-semibold transition hover:bg-[color:var(--ink)] hover:text-[color:var(--base)]"
              >
                Watch flow preview
              </a>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em] text-[color:var(--ink-soft)]">
              <span>clarity</span>
              <span>steadiness</span>
              <span>care</span>
            </div>
          </div>

          <div className="relative rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] p-8 shadow-[0_20px_80px_-60px_rgba(0,0,0,0.7)]">
            <div className="absolute -top-6 right-8 rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-xs uppercase tracking-[0.3em]">
              today
            </div>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
                    Focus Blocks
                  </p>
                  <p className="text-2xl font-semibold">Deep Work</p>
                </div>
                <span className="rounded-full bg-[color:var(--accent)]/15 px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                  02:30 hrs
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "Design life space",
                  "Prototype habit loop",
                  "Review energy log",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                  >
                    <span>{item}</span>
                    <span className="rounded-full border border-[color:var(--line)] px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
                      queued
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-dashed border-[color:var(--line)] p-4 text-sm text-[color:var(--ink-soft)]">
                Recovery ritual at 4:00 PM. Slow tea + 15 min walk.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Signal Stack",
              body: "Bring tasks, calendar, and mood logs into one layered stack so nothing drops.",
            },
            {
              title: "Momentum Loops",
              body: "Micro-progress pulses keep you moving without burning out the system.",
            },
            {
              title: "Care Protocols",
              body: "Treat recovery like a first-class workflow, not a reward you hope to earn.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-[color:var(--line)] bg-white/70 p-6 shadow-[0_16px_50px_-45px_rgba(0,0,0,0.7)]"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[color:var(--ink-soft)]">
                {card.body}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--ink)] p-8 text-[color:var(--base)]">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--base)]/60">
              Flow Map
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              A week that feels like a soundtrack.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[color:var(--base)]/70">
              life_OS blends focus sprints, creative drift, and quiet care so
              every day has its own pulse. Drag to remix, lock what works.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              {[
                "Prime: 08:00-10:30",
                "Create: 11:00-13:30",
                "Restore: 15:00-16:00",
                "Connect: 17:00-18:30",
              ].map((slot) => (
                <div
                  key={slot}
                  className="flex items-center justify-between rounded-2xl border border-white/20 px-4 py-3"
                >
                  <span>{slot}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
                    locked
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-[color:var(--line)] bg-white/80 p-8">
            <div className="absolute -top-10 right-10 h-20 w-20 rounded-3xl border border-[color:var(--line)] bg-[color:var(--accent-2)]/20 backdrop-blur-sm animate-[float_6s_ease-in-out_infinite]" />
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--ink-soft)]">
              Command Center
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Your day, visualized at a glance.
            </h2>
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--card)] p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Energy Meter</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
                    78%
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <div className="h-2 w-[78%] rounded-full bg-[color:var(--accent)]" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Focus", value: "4 blocks" },
                  { label: "Care", value: "2 rituals" },
                  { label: "Sleep", value: "7.4 hrs" },
                  { label: "Wins", value: "3 shipped" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-5"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] px-8 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--accent)]">
            Ready to ship your rhythm?
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            life_OS is the gentle system that keeps your future self proud.
          </h2>
          <p className="mt-4 text-sm text-[color:var(--ink-soft)]">
            Build a daily operating system that honors ambition and breath.
            Start with one week, keep it for a lifetime.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/dashboard"
              className="rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-[color:var(--base)] transition hover:-translate-y-0.5"
            >
              Start building
            </a>
            <a
              href="/login"
              className="rounded-full border border-[color:var(--ink)] px-6 py-3 text-sm font-semibold transition hover:bg-[color:var(--ink)] hover:text-[color:var(--base)]"
            >
              Talk to co-pilot
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
