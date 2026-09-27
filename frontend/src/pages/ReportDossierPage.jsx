import { Link, useNavigate } from 'react-router-dom'

const dossier = {
  company: 'Northstar Labs',
  summary:
    'Northstar is positioned for expansion into a new high-potential segment. Priority actions focus on refining value proposition, tightening acquisition efficiency, and improving retention across core accounts.',
  recommendations: [
    'Shift a portion of spend toward high-intent segments with strong margin potential.',
    'Revise pricing architecture around value-based packaging and upsell triggers.',
    'Introduce a quarterly governance rhythm across sales, product, and finance.',
  ],
  metrics: [
    ['Revenue potential', '+18.4%'],
    ['Margin improvement', '+6.2 pts'],
    ['Target pipeline', '32 strategic accounts'],
    ['Adoption readiness', 'Strong'],
  ],
}

export default function ReportDossierPage({ user, onLogout }) {
  const isAdmin = user?.role === 'admin'
  const navigate = useNavigate()

  const handleExportPdf = () => {
    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'management-dossier.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
              <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Report dossier</p>
              <h1 className="mt-2 text-3xl font-bold text-[#111827]">Executive summary</h1>
            </div>
          </div>
          <button
            type="button"
            onClick={handleExportPdf}
            className={`rounded-xl border px-4 py-2 text-sm font-medium ${isAdmin ? 'border-[#ea580c] bg-[#fff7f0] text-[#ea580c]' : 'border-[#2563eb] bg-[#edf6ff] text-[#2563eb]'}`}
          >
            Export PDF
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b7280]">Client</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#111827]">{dossier.company}</h2>
              </div>
              <span className="rounded-full border border-[#f5c4a3] bg-[#fff7f0] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#9a4d18]">Board ready</span>
            </div>

            <div className="rounded-2xl border border-[#efe3d9] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,247,240,0.9))] p-5">
              <p className="text-sm leading-7 text-[#4b5563]">{dossier.summary}</p>
            </div>

            <div className="mt-6">
              <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#ea580c]">Key recommendations</p>
              <ul className="space-y-3">
                {dossier.recommendations.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-4 text-sm text-[#4b5563]">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ea580c] text-[10px] font-bold text-white">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[#ea580c]">Impact metrics</p>
              <div className="mt-5 space-y-4">
                {dossier.metrics.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#f3e8df] bg-[#fffaf5] p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">{label}</p>
                    <p className="mt-2 text-sm font-medium text-[#111827]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[#ea580c]">Decision checkpoint</p>
              <p className="mt-4 text-sm leading-7 text-[#4b5563]">The strategic case supports a controlled expansion with a measured investment in product-market fit and commercial precision. Leadership should approve prioritized initiatives in the next review cycle.</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
