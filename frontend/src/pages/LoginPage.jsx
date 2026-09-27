import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const accountCatalog = [
  {
    email: 'admin@consulting.studio',
    password: 'Admin123',
    role: 'admin',
    label: 'System Administrator & Managing Partner',
    access: 'Tier-0 full system governance',
    mission: 'Exercise unrestricted supervisory control over the platform, configure foundation model versions, audit token margins, and manage privileges across all roles.',
  },
  {
    email: 'operations@consulting.studio',
    password: 'Ops123',
    role: 'ops',
    label: 'Operations Engineer',
    access: 'Tier-2 infrastructure & workflow orchestration',
    mission: 'Maintain pipeline uptime, trace agent failures, and preserve database state without exposing client financial PII.',
  },
  {
    email: 'support@consulting.studio',
    password: 'Support123',
    role: 'support',
    label: 'Tier-1 Customer Support Specialist',
    access: 'Tier-1 client experience & ticket remediation',
    mission: 'Assist clients with run inquiries, resend boardroom reports, and guide intake without exposing internal prompt logic or backend tools.',
  },
  {
    email: 'client@consulting.studio',
    password: 'Client123',
    role: 'client',
    label: 'Client user',
    access: 'Client workspace and operational updates',
  },
]

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@consulting.studio')
  const [password, setPassword] = useState('Admin123')
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const account = accountCatalog.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase() &&
        candidate.password === password,
    )

    if (!account) {
      setLoginError('Invalid email or password. Use one of the approved platform accounts.')
      return
    }

    setLoginError('')
    onLogin({ email: account.email, role: account.role, label: account.label })
    navigate('/dashboard')
  }

  const handleQuickAccess = (role) => {
    const match = accountCatalog.find((account) => account.role === role)
    if (!match) return
    setEmail(match.email)
    setPassword(match.password)
    setLoginError('')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.16),_transparent_30%),linear-gradient(180deg,_#f9f5f1_0%,_#f3eee7_100%)] px-4 py-12 text-[#1d2430]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#f9d7c7]/80 blur-3xl" />
        <div className="absolute bottom-8 right-0 h-96 w-96 rounded-full bg-[#fed7aa]/70 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-[#f4d3bb]/80" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-[#efe3d9] bg-white/80 shadow-[0_30px_80px_rgba(17,24,39,0.08)] backdrop-blur-md lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden border-r border-[#efe3d9] bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.16),_transparent_28%),linear-gradient(135deg,_#1f2937_0%,_#111827_100%)] p-8 text-white lg:flex lg:items-center lg:justify-center">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-12 top-12 h-44 w-44 rounded-full border border-[#f3d0b3]" />
            <div className="absolute bottom-10 left-10 h-60 w-60 rounded-full border border-[#f3d0b3]" />
            <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-[#f9d7c7]/80" />
          </div>

          <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center text-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute -left-8 top-2 h-12 w-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
                <img src="/logo.svg" alt="Neuraedge logo" className="h-full w-full object-contain p-2" />
              </div>
              <div className="absolute -right-8 bottom-2 h-12 w-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
                <img src="/logo.svg" alt="Neuraedge logo" className="h-full w-full object-contain p-2" />
              </div>
              <div className="flex h-28 w-28 items-center justify-center rounded-[28px] border border-[#f7d8bc] bg-white/10 shadow-[0_18px_40px_rgba(14,165,233,0.14)] backdrop-blur-sm">
                <img
                  src="/logo.svg"
                  alt="Neuraedge logo"
                  className="h-16 w-16 animate-pulse object-contain drop-shadow-[0_12px_24px_rgba(14,165,233,0.18)]"
                />
              </div>
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.32em] text-[#f5c4a3]">Strategy. Systems. Momentum.</p>
            <h3 className="mt-3 max-w-sm text-2xl font-semibold leading-tight text-white">
              Turn decisions into disciplined execution.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#e5e7eb]">
              Neuraedge brings consulting intelligence, operational visibility, and client-ready insight into one aligned workspace.
            </p>

            <div className="mt-6 grid w-full gap-3 text-left">
              {[
                '“Every decision becomes more confident when the operating model is visible.”',
                '“Client clarity and team execution finally move in the same direction.”',
                '“The right data gives leadership the confidence to act faster.”',
              ].map((quote, index) => (
                <div key={quote} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs italic text-[#f5f5f5] backdrop-blur-sm">
                  <span className="mr-2 text-[#f5c4a3]">0{index + 1}</span>
                  {quote}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3 lg:hidden">
              <img src="/logo.svg" alt="Neuraedge logo" className="h-12 w-12 object-contain" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-[#ea580c]">Login</div>
                <div className="text-sm font-medium text-[#1d2430]">Neuraedge</div>
              </div>
            </div>
            <Link to="/" className="text-sm font-medium text-[#ea580c]">Back home</Link>
          </div>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Sign in</p>
            <h2 className="mt-3 text-3xl font-bold text-[#111827] sm:text-4xl">Welcome back</h2>
            <p className="mt-3 text-sm text-[#4b5563]">
              Use your approved workspace email and password to access the platform.
            </p>
            <blockquote className="mt-4 rounded-2xl border border-[#f6d7c1] bg-[#fffaf5] p-3 text-sm italic leading-6 text-[#4b5563]">
              “The strongest business systems are built to turn insight into action without slowing the team down.”
            </blockquote>
          </div>

          <div className="mb-6 grid gap-2 sm:grid-cols-3">
            {accountCatalog.map((account) => (
              <button
                key={account.role}
                type="button"
                onClick={() => handleQuickAccess(account.role)}
                className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] px-3 py-2 text-left transition hover:border-[#ea580c] hover:bg-[#fff7f0]"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#ea580c]">{account.role === 'admin' ? 'Admin' : account.role === 'ops' ? 'Ops' : account.role === 'support' ? 'Support' : 'Client'}</div>
                <div className="mt-1 text-sm font-medium text-[#111827]">{account.label}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-[#4b5563]">Email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-[#e7dfd7] bg-[#fffaf5] px-4 py-3 text-[#1d2430] outline-none transition focus:border-[#ea580c] focus:ring-2 focus:ring-[#f7d0b8]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4b5563]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-[#e7dfd7] bg-[#fffaf5] px-4 py-3 text-[#1d2430] outline-none transition focus:border-[#ea580c] focus:ring-2 focus:ring-[#f7d0b8]"
              />
            </div>

            {loginError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {loginError}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 text-sm text-[#4b5563]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-[#ea580c]" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="font-medium text-[#ea580c]">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl border border-[#ea580c] bg-gradient-to-r from-[#ea580c] to-[#fb923c] px-4 py-3.5 font-medium text-white shadow-[0_14px_28px_rgba(234,88,12,0.22)] transition hover:-translate-y-0.5"
            >
              Access platform
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-4 text-sm text-[#4b5563]">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#ea580c]">Role access</p>
            <ul className="space-y-2">
              {accountCatalog.map((account) => (
                <li key={account.email} className="rounded-xl bg-white px-3 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-[#111827]">{account.label}</div>
                    <span className="rounded-full border border-[#f3d9c2] bg-[#fff7f0] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[#9a4d18]">
                      {account.role}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-[#6b7280]">{account.email}</div>
                  <div className="mt-1 text-xs text-[#6b7280]">Password: {account.password}</div>
                  <div className="mt-2 text-xs leading-5 text-[#4b5563]">{account.access}</div>
                  {account.mission && (
                    <div className="mt-2 text-[11px] leading-5 text-[#4b5563]">Mission: {account.mission}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-[#efe3d9] pt-5 text-sm text-[#4b5563]">
            <div className="flex items-center justify-between">
              <span>Need an account?</span>
              <Link to="/request-access" className="font-medium text-[#ea580c]">Request access</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
