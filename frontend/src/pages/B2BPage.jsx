import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Partner intelligence',
    text: 'Track strategic accounts, partner potential, and commercial opportunities in one operating view.',
  },
  {
    title: 'Revenue planning',
    text: 'Model expansion scenarios, forecast pipeline health, and prioritize initiatives with clear business impact.',
  },
  {
    title: 'Operational governance',
    text: 'Align budgeting, milestones, and engagement outcomes across business units and leadership teams.',
  },
  {
    title: 'AI reporting layer',
    text: 'Generate board-ready updates with outcome tracking, benchmark narratives, and action plans for stakeholders.',
  },
]

const integrations = ['CRM sync', 'Slack updates', 'Finance exports', 'Executive dashboards', 'Deal review workflows', 'Compliance controls']

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1d2430]">
      <header className="sticky top-0 z-20 border-b border-[#e7dfd7] bg-[#f7f4ef]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Neuraedge logo" className="h-10 w-10 rounded-xl object-cover shadow-sm" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#ea580c]">B2B</div>
              <div className="text-sm font-medium text-[#1d2430]">Neuraedge</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[#4b5563] md:flex">
            <Link to="/" className="transition hover:text-[#ea580c]">Home</Link>
            <Link to="/b2b" className="transition hover:text-[#ea580c]">Features</Link>
            <Link to="/pricing" className="transition hover:text-[#ea580c]">Pricing</Link>
            <Link to="/dashboard" className="transition hover:text-[#ea580c]">Dashboard</Link>
          </nav>

          <Link
            to="/login"
            className="rounded-xl border border-[#ea580c] bg-[#ea580c] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_25px_rgba(234,88,12,0.2)] transition hover:opacity-95"
          >
            Sales access
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animated-panel">
            <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Business-to-business</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
              Strategic operating systems for growth teams.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#4b5563]">
              Built for consultancies, venture-backed teams, and enterprise departments that need structured intelligence, commercial clarity, and fast cross-functional execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="rounded-xl border border-[#ea580c] bg-[#ea580c] px-5 py-3 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:opacity-95"
              >
                Open client workspace
              </Link>
              <Link
                to="/"
                className="rounded-xl border border-[#e7dfd7] bg-white px-5 py-3 text-sm font-medium text-[#1d2430] shadow-sm transition hover:border-[#ea580c]"
              >
                View overview
              </Link>
            </div>
          </div>

          <div className="float-card rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_22px_54px_rgba(17,24,39,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.22em] text-[#ea580c]">Enterprise score</span>
              <span className="rounded-full border border-[#f5c4a3] bg-[#fff7f0] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#9a4d18]">
                ROI positive
              </span>
            </div>

            <div className="space-y-4">
              {[
                ['Market readiness', '84%'],
                ['Cross-team alignment', '91%'],
                ['Commercial conversion', '76%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#f3e8df] bg-[#fffaf5] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4b5563]">{label}</span>
                    <span className="text-lg font-semibold text-[#111827]">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#ea580c]">Platform capabilities</p>
            <h2 className="mt-3 text-3xl font-bold text-[#111827]">Designed for executive and commercial teams</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="float-card rounded-2xl border border-[#efe3d9] bg-white p-6 shadow-[0_10px_26px_rgba(17,24,39,0.04)]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#fed7aa] bg-[#fff7f0] text-[#ea580c]">✦</div>
                <h3 className="text-xl font-semibold text-[#111827]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4b5563]">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_12px_28px_rgba(17,24,39,0.04)]">
          <div className="mb-5 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#ea580c]">Connected stack</p>
            <h3 className="mt-3 text-2xl font-bold text-[#111827]">Built to plug into modern business systems</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((item) => (
              <span key={item} className="rounded-full border border-[#efe3d9] bg-[#fffaf5] px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#4b5563]">
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
