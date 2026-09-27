import { Link } from 'react-router-dom'

export default function NeedAccountPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.10),_transparent_25%),linear-gradient(180deg,_#f9f5f1_0%,_#f3eee7_100%)] px-4 py-12 text-[#1d2430]">
      <div className="mx-auto max-w-xl rounded-[28px] border border-[#efe3d9] bg-white/90 p-6 shadow-[0_30px_80px_rgba(17,24,39,0.08)] backdrop-blur-md sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Need an account?</p>
        <h1 className="mt-3 text-3xl font-bold text-[#111827]">Create your access request</h1>
        <p className="mt-4 text-sm leading-7 text-[#4b5563]">
          Our onboarding team reviews new requests within one business day. Choose the right access path and we’ll get your team started.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">Recommended</p>
            <p className="mt-2 text-lg font-semibold text-[#111827]">Executive / admin workspace</p>
          </div>
          <div className="rounded-2xl border border-[#efe3d9] bg-[#fffaf5] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">For teams</p>
            <p className="mt-2 text-lg font-semibold text-[#111827]">Client and partner access</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/request-access" className="flex-1 rounded-2xl border border-[#ea580c] bg-[#ea580c] px-4 py-3 text-center font-medium text-white shadow-[0_14px_28px_rgba(234,88,12,0.22)] transition hover:-translate-y-0.5">
            Request access
          </Link>
          <Link to="/login" className="flex-1 rounded-2xl border border-[#e7dfd7] bg-[#fffaf5] px-4 py-3 text-center font-medium text-[#1d2430] hover:border-[#ea580c]">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
