import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const emptyForm = {
  company_name: 'Northstar Labs',
  industry: 'Enterprise SaaS',
  market: 'North America',
  business_context:
    'We are a growing software company selling operations automation to mid-market firms. We want to expand into a new vertical and improve product-market fit while protecting margin efficiency.',
  objective:
    'Identify strategic opportunities, prioritize actions, and generate a management-ready report with clear recommendations and measurable next steps.',
  constraints: [
    'Increase revenue without major restructuring',
    'Keep acquisition costs under control',
    'Preserve customer retention and team focus',
  ],
}

const agentSteps = [
  'Business Analyst',
  'Market Research',
  'Benchmarking',
  'Financial Analysis',
  'Strategy Advisor',
  'Report Writer',
]

export default function DashboardPage({ user, onLogout }) {
  const isOps = user?.role === 'ops'
  const isSupport = user?.role === 'support'
  const isAdmin = user?.role === 'admin'
  const isClient = user?.role === 'client'
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState([])
  const [report, setReport] = useState(null)
  const [error, setError] = useState('')
  const [selectedAgent, setSelectedAgent] = useState('Business Analyst')
  const [agentInsights, setAgentInsights] = useState({})
  const [summarySent, setSummarySent] = useState(false)
  const [resourceForm, setResourceForm] = useState({
    inventory: '1420 units',
    staffing: '18 active specialists',
    utilization: '78%',
    capex: '$240,000',
    notes: 'Inventory is healthy, but warehouse space is tight during peak demand.'
  })
  const navigate = useNavigate()

  const progressSummary = useMemo(() => {
    if (!progress.length) return 'Ready to start'
    const complete = progress.filter((item) => item.status === 'completed').length
    return `${complete}/${progress.length} steps complete`
  }, [progress])

  const progressPercent = useMemo(() => {
    if (!progress.length) return 0
    const complete = progress.filter((item) => item.status === 'completed').length
    return Math.round((complete / progress.length) * 100)
  }, [progress])

  const snapshotCards = useMemo(() => {
    if (user?.role === 'ops') {
      return [
        { label: 'Pipeline uptime', value: '99.4%' },
        { label: 'Latency', value: '1.8s avg' },
        { label: 'Retry queue', value: '3 stuck jobs' },
      ]
    }

    if (user?.role === 'support') {
      return [
        { label: 'Open tickets', value: '18' },
        { label: 'Resolved today', value: '12' },
        { label: 'Billing mask', value: '•••• 4821' },
      ]
    }

    if (isAdmin) {
      return [
        { label: 'Market', value: form.market || 'N/A' },
        { label: 'Industry', value: form.industry || 'N/A' },
        { label: 'Objective', value: form.objective.slice(0, 42) + '…' },
      ]
    }

    return [
      { label: 'Inventory', value: resourceForm.inventory },
      { label: 'Utilization', value: resourceForm.utilization },
      { label: 'Capex', value: resourceForm.capex },
    ]
  }, [form, isAdmin, resourceForm, user?.role])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleResourceChange = (field, value) => {
    setResourceForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setProgress([])
    setError('')
    setReport(null)
    setAgentInsights({})
    setSelectedAgent('Business Analyst')

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          constraints: form.constraints,
        }),
      })

      if (!response.ok) {
        throw new Error('Unable to start the analysis.')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let reportId = null

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const chunks = buffer.split('\n\n')
        buffer = chunks.pop() || ''

        for (const chunk of chunks) {
          const trimmed = chunk.trim()
          if (!trimmed.startsWith('data:')) continue

          const raw = trimmed.slice(5).trim()
          if (!raw) continue

          try {
            const evt = JSON.parse(raw)
            if (evt.event === 'done') {
              reportId = evt.report_id
              continue
            }
            if (evt.event === 'error') {
              throw new Error(evt.message || 'Analysis failed')
            }
            if (evt.agent) {
              setProgress((prev) => {
                const next = [...prev]
                const idx = next.findIndex((item) => item.agent === evt.agent)
                const nextItem = { agent: evt.agent, status: evt.status || 'completed' }
                if (idx >= 0) next[idx] = nextItem
                else next.push(nextItem)
                return next
              })

              if (evt.output_preview) {
                setAgentInsights((prev) => ({
                  ...prev,
                  [evt.agent]: evt.output_preview,
                }))
              }
            }
          } catch (jsonError) {
            console.error(jsonError)
          }
        }
      }

      if (reportId) {
        const reportRes = await fetch(`http://localhost:8000/api/report/${reportId}`)
        if (reportRes.ok) {
          const data = await reportRes.json()
          const agentFields = {
            'Business Analyst': 'executive_summary',
            'Market Research': 'market_overview',
            'Benchmarking': 'benchmarking',
            'Financial Analysis': 'financial_analysis',
            'Strategy Advisor': 'strategy',
            'Report Writer': 'recommendations',
          }

          const mappedInsights = {}
          Object.entries(agentFields).forEach(([agent, key]) => {
            const value = data[key] || data.report_data?.[key]
            if (value) mappedInsights[agent] = value
          })

          setAgentInsights((prev) => ({ ...prev, ...mappedInsights }))
          setReport(data)
        }
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const downloadPdf = async () => {
    if (!report || !report.id) return
    const pdfUrl = `http://localhost:8000/api/report/${report.id}/pdf`
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'management-consulting-report.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const sendAutomatedSummary = () => {
    if (!report || !report.id) {
      setError('Generate a strategic report before sending the automated summary.')
      return
    }

    setSummarySent(true)
    downloadPdf()
  }

  const reportSections = report
    ? [
        {
          title: 'Executive Summary',
          body: report.executive_summary || report.summary || 'No executive summary available.',
        },
        {
          title: 'Market Overview',
          body: report.market_overview || 'No market overview available.',
        },
        {
          title: 'Benchmarking',
          body: report.benchmarking || 'No benchmarking summary available.',
        },
        {
          title: 'Financial Analysis',
          body: report.financial_analysis || 'No financial analysis available.',
        },
        {
          title: 'Strategy',
          body: report.strategy || 'No strategy available.',
        },
        {
          title: 'Recommendations',
          body: report.recommendations || 'No recommendations available.',
        },
      ]
    : []

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-[radial-gradient(circle_at_top_left,_rgba(234,88,12,0.16),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.14),_transparent_22%),linear-gradient(180deg,_#f7f4ef_0%,_#f3eee8_100%)] text-[#1d2430]' : 'bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.10),_transparent_22%),linear-gradient(180deg,_#f4f8ff_0%,_#edf5ff_100%)] text-[#1d2430]'}`}>
      <header className={`border-b backdrop-blur-sm ${isAdmin ? 'border-[#e7dfd7] bg-[#f7f4ef]/90' : 'border-[#dfeaf8] bg-[#f8fbff]/90'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold shadow-sm ${isAdmin ? 'border-[#ea580c] bg-[#fff7f0] text-[#ea580c]' : isOps ? 'border-[#f59e0b] bg-[#fffaf0] text-[#b45309]' : isSupport ? 'border-[#10b981] bg-[#ecfdf5] text-[#047857]' : 'border-[#2563eb] bg-[#edf6ff] text-[#2563eb]'}`}>
              {isAdmin ? 'A' : isOps ? 'O' : isSupport ? 'S' : 'U'}
            </div>
            <div>
              <div className={`text-xs uppercase tracking-[0.25em] ${isAdmin ? 'text-[#ea580c]' : isOps ? 'text-[#b45309]' : isSupport ? 'text-[#047857]' : 'text-[#2563eb]'}`}>
                {user?.role === 'ops' ? 'Operations Engineer' : user?.role === 'support' ? 'Support Specialist' : isAdmin ? 'Admin' : 'User'}
              </div>
              <div className="text-sm font-medium text-[#1d2430]">Management Studio</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[#4b5563] md:flex">
            <Link to="/" className="transition hover:text-[#ea580c]">Home</Link>
            {isAdmin ? (
              <>
                <Link to="/engagement/new" className="transition hover:text-[#ea580c]">Engagement</Link>
                <Link to="/pipeline" className="transition hover:text-[#ea580c]">Pipeline</Link>
                <Link to="/dossier" className="transition hover:text-[#ea580c]">Dossier</Link>
                <Link to="/archive" className="transition hover:text-[#ea580c]">Archive</Link>
                <Link to="/settings" className="transition hover:text-[#ea580c]">Settings</Link>
              </>
            ) : isSupport ? (
              <>
                <Link to="/dashboard" className="transition hover:text-[#047857]">Client directory</Link>
                <Link to="/dashboard" className="transition hover:text-[#047857]">Run status</Link>
                <Link to="/dashboard" className="transition hover:text-[#047857]">Reports</Link>
                <Link to="/dashboard" className="transition hover:text-[#047857]">Reset links</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="transition hover:text-[#2563eb]">Operations</Link>
                <Link to="/settings" className="transition hover:text-[#2563eb]">Client updates</Link>
              </>
            )}
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`w-fit rounded-xl border px-4 py-2 text-sm font-medium ${isAdmin ? 'border-[#ea580c] bg-[#fff7f0] text-[#ea580c]' : isOps ? 'border-[#f59e0b] bg-[#fffaf0] text-[#b45309]' : isSupport ? 'border-[#10b981] bg-[#ecfdf5] text-[#047857]' : 'border-[#2563eb] bg-[#edf6ff] text-[#2563eb]'}`}
            >
              Back
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Workspace</p>
              <h1 className="mt-2 text-3xl font-bold text-[#111827]">
                {user?.role === 'ops' ? 'Operations Engineer overview' : user?.role === 'support' ? 'Support portal overview' : isAdmin ? 'Admin overview' : 'User workspace'}
              </h1>
            </div>
          </div>
        </div>

        {user?.role === 'support' && (
          <div className="mb-8 rounded-3xl border border-[#d7f5e7] bg-[#f1fff7] p-5 shadow-[0_18px_40px_rgba(17,24,39,0.04)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#047857]">Tier-1 Customer Support</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Client lookup', value: 'Email / company / engagement ID' },
                { label: 'Run status', value: 'Queued · Analyzing · Complete · Failed' },
                { label: 'Resend dossier', value: 'Verified client contact email only' },
                { label: 'Payment mask', value: '•••• 4821' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#d7f5e7] bg-white p-3 text-sm text-[#4b5563]">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">{item.label}</div>
                  <div className="mt-2 font-medium text-[#111827]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {user?.role === 'ops' && (
          <div className="mb-8 rounded-3xl border border-[#efe3d9] bg-white p-5 shadow-[0_18px_40px_rgba(17,24,39,0.06)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#ea580c]">Incident ticket protocol</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {[
                'Severity',
                'Root Cause',
                'Agent Step',
                'Session ID',
                'Remediation',
              ].map((label) => (
                <div key={label} className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3 text-sm text-[#4b5563]">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">{label}</div>
                  <div className="mt-2 font-medium text-[#111827]">
                    {label === 'Severity' ? 'P1 / P2 / P3' : label === 'Root Cause' ? 'Trace failure origin' : label === 'Agent Step' ? '1-6 pipeline stage' : label === 'Session ID' ? 'session_bounded' : 'Retry / reset / isolate'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {snapshotCards.map((card) => (
            <div key={card.label} className={`rounded-2xl border p-4 shadow-[0_12px_28px_rgba(17,24,39,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(17,24,39,0.08)] ${isAdmin ? 'border-[#efe3d9] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,247,240,0.9))]' : 'border-[#dfeaf8] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(239,246,255,0.9))]'}`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">{card.label}</p>
              <p className="mt-3 text-sm font-medium text-[#111827]">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-5">
          {(isAdmin
            ? [
                ['Engagement', '/engagement/new'],
                ['Pipeline', '/pipeline'],
                ['Dossier', '/dossier'],
                ['Archive', '/archive'],
                ['Settings', '/settings'],
              ]
            : isSupport
              ? [
                  ['Client directory', '/dashboard'],
                  ['Run status', '/dashboard'],
                  ['Resend dossier', '/dashboard'],
                  ['Account checks', '/dashboard'],
                  ['Support notes', '/dashboard'],
                ]
              : [
                  ['Operations', '/dashboard'],
                  ['Updates', '/settings'],
                  ['Inventory', '/dashboard'],
                  ['Status', '/dashboard'],
                  ['Profile', '/dashboard'],
                ]
          ).map(([label, path]) => (
            <Link
              key={label}
              to={path}
              className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${isAdmin ? 'border-[#efe3d9] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,247,240,0.9))] text-[#111827] hover:border-[#ea580c] hover:text-[#ea580c]' : 'border-[#dfeaf8] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(239,246,255,0.9))] text-[#111827] hover:border-[#2563eb] hover:text-[#2563eb]'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {user?.role === 'support' ? (
          <div className="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
            <section className="rounded-3xl border border-[#d7f5e7] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#111827]">Client support desk</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-[#047857]">Tier-1</span>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Client email', value: 'founder@northstarlabs.com' },
                  { label: 'Company', value: 'Northstar Labs' },
                  { label: 'Engagement ID', value: 'ENG-2048' },
                  { label: 'Run status', value: 'Complete' },
                  { label: 'Subscription', value: 'Growth Tier' },
                  { label: 'Mask payment', value: '•••• 4821' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#d7f5e7] bg-[#f1fff7] p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">{item.label}</div>
                    <div className="mt-2 text-lg font-semibold text-[#111827]">{item.value}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#d7f5e7] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-[#111827]">Support check-in</h2>
                <div className="text-sm text-[#047857]">Empathetic routing</div>
              </div>

              <div className="space-y-4">
                {[
                  'Client reports are ready and can be resent to the verified contact email.',
                  'Stalled runs can be explained as requiring more qualitative context without exposing internal prompts.',
                  'Replacement diagnostic credits can be issued when the engine fails and there is a verified run issue.',
                  'Only masked payment values are exposed; full financial data remains protected.',
                ].map((note) => (
                  <div key={note} className="rounded-2xl border border-[#d7f5e7] bg-[#f1fff7] p-4 text-sm leading-7 text-[#4b5563]">
                    {note}
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : isAdmin ? (
          <div className="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
            <section className="animated-panel rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#111827]">Client brief</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-[#ea580c]">Live</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Company</label>
                  <input
                    value={form.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                    className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#ea580c]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Industry</label>
                  <input
                    value={form.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#ea580c]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Market</label>
                  <input
                    value={form.market}
                    onChange={(e) => handleChange('market', e.target.value)}
                    className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#ea580c]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Business context</label>
                  <textarea
                    rows={5}
                    value={form.business_context}
                    onChange={(e) => handleChange('business_context', e.target.value)}
                    className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#ea580c]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Objective</label>
                  <textarea
                    rows={4}
                    value={form.objective}
                    onChange={(e) => handleChange('objective', e.target.value)}
                    className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#ea580c]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Constraints</label>
                  <textarea
                    rows={3}
                    value={form.constraints.join('\n')}
                    onChange={(e) =>
                      handleChange(
                        'constraints',
                        e.target.value
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean),
                      )
                    }
                    className="w-full rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#ea580c]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#ea580c] px-4 py-3 font-medium text-white shadow-[0_10px_25px_rgba(234,88,12,0.2)] transition hover:translate-y-[-1px] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Analyzing...' : 'Generate strategic report'}
                </button>
              </form>
            </section>

            <section className="rounded-3xl border border-[#efe3d9] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-[#111827]">Advisory workflow</h2>
                <div className="text-sm text-[#4b5563]">{progressSummary}</div>
              </div>

              <div className="mb-6 rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-3">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#6b7280]">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f1e3d8]">
                  <div
                    className="h-full rounded-full bg-[#ea580c] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-[#4b5563]">
                {['Market sizing', 'Peer benchmarking', 'Revenue modeling', 'Strategy design', 'Board-ready reports'].map((feature) => (
                  <span key={feature} className="rounded-full border border-[#f5c4a3] bg-[#fff7f0] px-2.5 py-1">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                {agentSteps.map((step) => {
                  const item = progress.find((entry) => entry.agent === step)
                  const status = item?.status || 'pending'
                  const complete = status === 'completed'
                  const selected = selectedAgent === step

                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setSelectedAgent(step)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${
                        selected
                          ? 'border-[#ea580c] bg-[#fff7f0] shadow-[0_0_0_1px_rgba(234,88,12,0.1)]'
                          : complete
                            ? 'border-[#f5c4a3] bg-[#fffaf5]'
                            : 'border-[#efe3d9] bg-[#fffaf5] hover:border-[#ea580c]'
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                          complete
                            ? 'border-[#ea580c] bg-[#ea580c] text-white'
                            : selected
                              ? 'border-[#ea580c] bg-[#fff1e8] text-[#ea580c]'
                              : 'border-[#e7dfd7] bg-white text-[#4b5563]'
                        }`}
                      >
                        {complete ? '✓' : '•'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#111827]">{step}</div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">
                          {status === 'completed'
                            ? 'completed'
                            : status === 'pending'
                              ? 'waiting'
                              : 'in progress'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#ea580c]">Selected module</p>
                <h3 className="mt-2 text-xl font-semibold text-[#111827]">{selectedAgent}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#4b5563]">
                  {agentInsights[selectedAgent] ||
                    'Click any specialist module to review its generated analysis. Run the strategic report to populate the detailed output for each stage.'}
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {report && (
                <div className="mt-8 rounded-3xl border border-[#efe3d9] bg-[#fffaf5] p-5 shadow-[0_12px_28px_rgba(17,24,39,0.04)]">
                  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#ea580c]">Report ready</p>
                      <h3 className="mt-2 text-2xl font-semibold text-[#111827]">{form.company_name}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={sendAutomatedSummary}
                        className="rounded-xl border border-[#ea580c] bg-[#ea580c] px-3 py-2 text-sm font-medium text-white shadow-[0_10px_20px_rgba(234,88,12,0.18)] transition hover:translate-y-[-1px]"
                      >
                        Agentic summary send
                      </button>
                      <button
                        onClick={downloadPdf}
                        className="rounded-xl border border-[#ea580c] bg-[#fff7f0] px-3 py-2 text-sm font-medium text-[#ea580c] transition hover:bg-[#ea580c] hover:text-white"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>

                  {summarySent && (
                    <div className="mb-4 rounded-xl border border-[#f5c4a3] bg-[#fff7f0] px-3 py-2 text-sm text-[#9a4d18]">
                      Automated summary PDF has been prepared and sent for review.
                    </div>
                  )}

                  <div className="space-y-6">
                    {reportSections.map((section) => (
                      <section key={section.title} className="rounded-2xl border border-[#efe3d9] bg-white p-4">
                        <h4 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#ea580c]">
                          {section.title}
                        </h4>
                        <p className="whitespace-pre-line text-sm leading-7 text-[#4b5563]">
                          {section.body}
                        </p>
                      </section>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
            <section className="rounded-3xl border border-[#dfeaf8] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#111827]">Client operational update</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-[#2563eb]">Restricted</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Inventory</label>
                  <input
                    value={resourceForm.inventory}
                    onChange={(e) => handleResourceChange('inventory', e.target.value)}
                    className="w-full rounded-xl border border-[#dfeaf8] bg-[#f8fbff] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Staffing</label>
                  <input
                    value={resourceForm.staffing}
                    onChange={(e) => handleResourceChange('staffing', e.target.value)}
                    className="w-full rounded-xl border border-[#dfeaf8] bg-[#f8fbff] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Utilization</label>
                  <input
                    value={resourceForm.utilization}
                    onChange={(e) => handleResourceChange('utilization', e.target.value)}
                    className="w-full rounded-xl border border-[#dfeaf8] bg-[#f8fbff] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Capex</label>
                  <input
                    value={resourceForm.capex}
                    onChange={(e) => handleResourceChange('capex', e.target.value)}
                    className="w-full rounded-xl border border-[#dfeaf8] bg-[#f8fbff] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-[#4b5563]">Operational notes</label>
                  <textarea
                    rows={5}
                    value={resourceForm.notes}
                    onChange={(e) => handleResourceChange('notes', e.target.value)}
                    className="w-full rounded-xl border border-[#dfeaf8] bg-[#f8fbff] px-3 py-2 text-[#1d2430] outline-none transition focus:border-[#2563eb]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setError('Client updates saved to the local workspace successfully.')}
                  className="w-full rounded-xl bg-[#2563eb] px-4 py-3 font-medium text-white shadow-[0_10px_25px_rgba(37,99,235,0.20)] transition hover:translate-y-[-1px]"
                >
                  Save resource update
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-[#dfeaf8] bg-white p-6 shadow-[0_20px_46px_rgba(17,24,39,0.06)]">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-[#111827]">Client status</h2>
                <div className="text-sm text-[#4b5563]">Operational sync</div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Inventory', value: resourceForm.inventory },
                  { label: 'Staffing', value: resourceForm.staffing },
                  { label: 'Utilization', value: resourceForm.utilization },
                  { label: 'Capex', value: resourceForm.capex },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#dfeaf8] bg-[#f8fbff] p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">{item.label}</div>
                    <div className="mt-2 text-lg font-semibold text-[#111827]">{item.value}</div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
