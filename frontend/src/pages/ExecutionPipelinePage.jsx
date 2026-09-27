import { Link, useNavigate } from 'react-router-dom'

const stages = [
  { name: 'Business Analyst', status: 'Completed', detail: 'Opportunity map and operating assumptions validated.' },
  { name: 'Market Research', status: 'Completed', detail: 'Segment demand, buyer trends, and adoption drivers reviewed.' },
  { name: 'Benchmarking', status: 'In progress', detail: 'Competitor patterns and commercial benchmarks being compared.' },
  { name: 'Financial Analysis', status: 'Queued', detail: 'Margin model and scenario economics pending finalization.' },
  { name: 'Strategy Advisor', status: 'Queued', detail: 'Strategy pathways will be prioritized after analysis is closed.' },
  { name: 'Report Writer', status: 'Queued', detail: 'Board-ready brief generation is scheduled at the end.' },
]

export default function ExecutionPipelinePage({ user, onLogout }) {
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

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
              <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Execution pipeline</p>
              <h1 className="mt-2 text-3xl font-bold text-[#111827]">Specialist workflow</h1>
            </div>
          </div>
          <button className={`rounded-xl border px-4 py-2 text-sm font-medium ${isAdmin ? 'border-[#ea580c] bg-[#fff7f0] text-[#ea580c]' : 'border-[#2563eb] bg-[#edf6ff] text-[#2563eb]'}`}>
            Trigger next phase
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
            <div className="space-y-4">
              {stages.map((stage, index) => (
                <div key={stage.name} className="rounded-2xl border border-[#efe3d9] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,247,240,0.9))] p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${stage.status === 'Completed' ? 'bg-[#ea580c] text-white' : stage.status === 'In progress' ? 'bg-[#f3d3bb] text-[#9a4d18]' : 'bg-[#e5e7eb] text-[#475569]'}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{stage.name}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#6b7280]">{stage.status}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${stage.status === 'Completed' ? 'bg-[#fff1e8] text-[#9a4d18]' : stage.status === 'In progress' ? 'bg-[#fff7f0] text-[#ea580c]' : 'bg-[#f3f4f6] text-[#6b7280]'}`}>
                      {stage.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#4b5563]">{stage.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[#ea580c]">Delivery status</p>
              <div className="mt-5 space-y-4">
                {[
                  ['Progress', '63%'],
                  ['Dependencies', '4 active'],
                  ['Decision rate', 'High'],
                  ['Client updates', '2 pending'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#f3e8df] bg-[#fffaf5] p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">{label}</p>
                    <p className="mt-2 text-sm font-medium text-[#111827]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[#ea580c]">Priority alerts</p>
              <ul className="mt-5 space-y-3 text-sm text-[#475569]">
                <li className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3">Pricing threshold review is required before final strategy.</li>
                <li className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3">Sales and product alignment is behind schedule.</li>
                <li className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3">Board update packet is ready for approval.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
