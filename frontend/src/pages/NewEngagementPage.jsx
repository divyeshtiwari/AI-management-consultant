import { Link, useNavigate } from 'react-router-dom'

const defaultBrief = {
  company_name: 'Northstar Labs',
  industry: 'Enterprise SaaS',
  market: 'North America',
  business_context:
    'We are expanding from a functional product into a vertical operating model and need sharper commercial focus across acquisition, retention, and margin protection.',
  objective:
    'Identify the fastest revenue path, prioritize the highest-value initiatives, and create an executive plan for the next 90 days.',
  constraints: [
    'Keep acquisition spend efficient',
    'Protect operating margin',
    'Maintain product quality and customer retention',
  ],
}

export default function NewEngagementPage({ user, onLogout }) {
  const isAdmin = user?.role === 'admin'
  const navigate = useNavigate()

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-[radial-gradient(circle_at_top_left,_rgba(234,88,12,0.16),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.14),_transparent_22%),linear-gradient(180deg,_#f7f4ef_0%,_#f3eee8_100%)] text-[#1d2430]' : 'bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.10),_transparent_22%),linear-gradient(180deg,_#f4f8ff_0%,_#edf5ff_100%)] text-[#1d2430]'}`}>
      <header className={`border-b backdrop-blur-sm ${isAdmin ? 'border-[#e7dfd7] bg-[#f7f4ef]/90' : 'border-[#dfeaf8] bg-[#f8fbff]/90'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold shadow-sm ${isAdmin ? 'border-[#ea580c] bg-[#fff7f0] text-[#ea580c]' : 'border-[#2563eb] bg-[#edf6ff] text-[#2563eb]'}`}>
              {isAdmin ? 'A' : 'U'}
            </Link>
            <div>
              <div className={`text-xs uppercase tracking-[0.25em] ${isAdmin ? 'text-[#ea580c]' : 'text-[#2563eb]'}`}>{isAdmin ? 'Admin' : 'User'}</div>
              <div className="text-sm font-medium text-[#1d2430]">Management Studio</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[#4b5563] md:flex">
            <Link to="/" className="transition hover:text-[#ea580c]">Home</Link>
            <Link to="/engagement/new" className="transition hover:text-[#ea580c]">Engagement</Link>
            <Link to="/pipeline" className="transition hover:text-[#ea580c]">Pipeline</Link>
            <Link to="/dossier" className="transition hover:text-[#ea580c]">Dossier</Link>
            <Link to="/archive" className="transition hover:text-[#ea580c]">Archive</Link>
            <Link to="/settings" className="transition hover:text-[#ea580c]">Settings</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className={`rounded-xl border bg-white px-3 py-2 text-xs text-[#4b5563] shadow-sm ${isAdmin ? 'border-[#efe3d9]' : 'border-[#dfeaf8]'}`}>
              {user?.email}
            </div>
            <button
              type="button"
              onClick={onLogout}
              className={`rounded-xl border bg-white px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#1d2430] transition ${isAdmin ? 'border-[#e7dfd7] hover:border-[#ea580c]' : 'border-[#dfeaf8] hover:border-[#2563eb]'}`}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`w-fit rounded-xl border px-4 py-2 text-sm font-medium ${isAdmin ? 'border-[#ea580c] bg-[#fff7f0] text-[#ea580c]' : 'border-[#2563eb] bg-[#edf6ff] text-[#2563eb]'}`}
            >
              Back
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">New engagement</p>
              <h1 className="mt-2 text-3xl font-bold text-[#111827]">Client brief intake</h1>
            </div>
          </div>
          <Link to="/pipeline" className={`rounded-xl border px-4 py-2 text-sm font-medium ${isAdmin ? 'border-[#ea580c] bg-[#fff7f0] text-[#ea580c]' : 'border-[#2563eb] bg-[#edf6ff] text-[#2563eb]'}`}>
            Continue to pipeline
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-[#475569]">Company</label>
                <input defaultValue={defaultBrief.company_name} className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2.5 text-[#1d2430] outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#475569]">Industry</label>
                <input defaultValue={defaultBrief.industry} className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2.5 text-[#1d2430] outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#475569]">Market</label>
                <input defaultValue={defaultBrief.market} className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2.5 text-[#1d2430] outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#475569]">Business context</label>
                <textarea rows={5} defaultValue={defaultBrief.business_context} className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2.5 text-[#1d2430] outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#475569]">Objective</label>
                <textarea rows={4} defaultValue={defaultBrief.objective} className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2.5 text-[#1d2430] outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#475569]">Constraints</label>
                <textarea rows={4} defaultValue={defaultBrief.constraints.join('\n')} className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2.5 text-[#1d2430] outline-none focus:border-[#ea580c]" />
              </div>
              <button type="button" className="w-full rounded-xl bg-[#ea580c] px-4 py-3 font-medium text-white shadow-[0_10px_25px_rgba(234,88,12,0.2)] hover:opacity-95">
                Launch strategic analysis
              </button>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[#ea580c]">Engagement snapshot</p>
              <div className="mt-5 space-y-4">
                {[
                  ['Priority', 'Growth and expansion'],
                  ['Decision window', '90 days'],
                  ['Delivery model', 'Executive advisory'],
                  ['Stakeholders', 'CEO, CFO, Sales, Ops'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#f3e8df] bg-[#fffaf5] p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">{label}</p>
                    <p className="mt-2 text-sm font-medium text-[#111827]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[#ea580c]">Recommended next steps</p>
              <ul className="mt-5 space-y-3 text-sm text-[#475569]">
                <li className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3">Validate market definition and buyer personas.</li>
                <li className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3">Benchmark competitor pricing and positioning.</li>
                <li className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3">Prioritize a narrow set of high-margin opportunities.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
