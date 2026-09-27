import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    price: '$299',
    description: 'For lean teams building strategic clarity.',
    features: ['5 strategy projects', 'AI workflow access', 'PDF report exports', 'Team dashboard'],
    accent: false,
  },
  {
    name: 'Growth',
    price: '$799',
    description: 'For scaling companies with recurring review cycles.',
    features: ['Unlimited projects', 'B2B workspace', 'Advanced benchmarking', 'Priority support'],
    accent: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For multi-team operating models and executive governance.',
    features: ['Custom integrations', 'Board reporting', 'Security controls', 'Dedicated onboarding'],
    accent: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1d2430]">
      <header className="sticky top-0 z-20 border-b border-[#e7dfd7] bg-[#f7f4ef]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Neuraedge logo" className="h-10 w-10 rounded-xl object-cover shadow-sm" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[#ea580c]">Advisory</div>
              <div className="text-sm font-semibold text-[#1d2430]">Neuraedge</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[#4b5563] md:flex">
            <Link to="/" className="transition hover:text-[#ea580c]">Home</Link>
            <Link to="/b2b" className="transition hover:text-[#ea580c]">B2B</Link>
            <Link to="/pricing" className="transition hover:text-[#ea580c]">Pricing</Link>
            <Link to="/dashboard" className="transition hover:text-[#ea580c]">Dashboard</Link>
          </nav>

          <Link
            to="/login"
            className="rounded-xl border border-[#ea580c] bg-[#ea580c] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_25px_rgba(234,88,12,0.22)] transition hover:opacity-95"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Pricing</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">Flexible plans for strategic growth.</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 shadow-[0_16px_38px_rgba(17,24,39,0.05)] transition duration-300 ${
                plan.accent
                  ? 'border-[#ea580c] bg-white shadow-[0_18px_40px_rgba(234,88,12,0.12)]'
                  : 'border-[#efe3d9] bg-white'
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#111827]">{plan.name}</h2>
                {plan.accent && (
                  <span className="rounded-full border border-[#f5c4a3] bg-[#fff7f0] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#9a4d18]">
                    Popular
                  </span>
                )}
              </div>

              <div className="mb-5 flex items-end gap-2">
                <span className="text-4xl font-bold text-[#111827]">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="pb-2 text-sm text-[#6b7280]">/ month</span>}
              </div>

              <p className="mb-6 text-sm leading-7 text-[#4b5563]">{plan.description}</p>

              <ul className="space-y-3 pb-6 text-sm text-[#334155]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#ea580c] bg-[#fff1e8] text-[10px] text-[#ea580c]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className={`block w-full rounded-xl border px-4 py-3 text-center text-sm font-medium transition ${
                  plan.accent
                    ? 'border-[#ea580c] bg-[#ea580c] text-white hover:opacity-95'
                    : 'border-[#e7dfd7] bg-[#fffaf5] text-[#1d2430] hover:border-[#ea580c]'
                }`}
              >
                Choose plan
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
