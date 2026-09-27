import { Link } from 'react-router-dom'

const requestOptions = ['Executive access', 'Client workspace', 'Partner workspace', 'Enterprise onboarding']

export default function RequestAccessPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_25%),linear-gradient(180deg,_#f9f5f1_0%,_#f3eee7_100%)] px-4 py-12 text-[#1d2430]">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-[#dfeaf8] bg-white/90 p-6 shadow-[0_30px_80px_rgba(17,24,39,0.08)] backdrop-blur-md sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#2563eb]">Access request</p>
            <h1 className="mt-3 text-3xl font-bold text-[#111827]">Request onboarding</h1>
          </div>
          <Link to="/login" className="rounded-xl border border-[#dfeaf8] bg-[#f8fbff] px-3 py-2 text-sm text-[#1d2430] hover:border-[#2563eb]">
            Back to login
          </Link>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-[#4b5563]">Full name</label>
            <input className="w-full rounded-2xl border border-[#dfeaf8] bg-[#f8fbff] px-4 py-3 text-[#1d2430] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]" placeholder="Your full name" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#4b5563]">Work email</label>
            <input type="email" className="w-full rounded-2xl border border-[#dfeaf8] bg-[#f8fbff] px-4 py-3 text-[#1d2430] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]" placeholder="name@company.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#4b5563]">Company</label>
            <input className="w-full rounded-2xl border border-[#dfeaf8] bg-[#f8fbff] px-4 py-3 text-[#1d2430] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]" placeholder="Company name" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#4b5563]">Access type</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {requestOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="rounded-2xl border border-[#dfeaf8] bg-[#f8fbff] px-3 py-3 text-left text-sm font-medium text-[#1d2430] hover:border-[#2563eb]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#4b5563]">Business need</label>
            <textarea rows={5} className="w-full rounded-2xl border border-[#dfeaf8] bg-[#f8fbff] px-4 py-3 text-[#1d2430] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]" placeholder="Tell us what you want to analyze or improve." />
          </div>

          <button type="submit" className="w-full rounded-2xl border border-[#2563eb] bg-gradient-to-r from-[#2563eb] to-[#4f46e5] px-4 py-3.5 font-medium text-white shadow-[0_14px_28px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5">
            Submit access request
          </button>
        </form>
      </div>
    </div>
  )
}
