import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.12),_transparent_25%),linear-gradient(180deg,_#f9f5f1_0%,_#f3eee7_100%)] px-4 py-12 text-[#1d2430]">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-[#efe3d9] bg-white p-6 shadow-[0_30px_80px_rgba(17,24,39,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ea580c]">Reset sent</p>
                <h2 className="mt-2 text-2xl font-bold text-[#111827]">Check your email</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="rounded-full border border-[#e7dfd7] bg-[#fffaf5] px-2 py-1 text-lg leading-none text-[#4b5563]"
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#4b5563]">
              We’ve sent a password recovery link to your work email. Please check your inbox and follow the instructions to recreate your password securely.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-4 py-2.5 text-sm font-medium text-[#1d2430]"
              >
                Close
              </button>
              <Link
                to="/login"
                className="rounded-xl border border-[#ea580c] bg-[#ea580c] px-4 py-2.5 text-sm font-medium text-white shadow-[0_14px_28px_rgba(234,88,12,0.2)]"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-xl rounded-[28px] border border-[#efe3d9] bg-white/90 p-6 shadow-[0_30px_80px_rgba(17,24,39,0.08)] backdrop-blur-md sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#ea580c]">Account recovery</p>
            <h1 className="mt-3 text-3xl font-bold text-[#111827]">Forgot your password?</h1>
          </div>
          <Link to="/login" className="rounded-xl border border-[#e7dfd7] bg-[#fffaf5] px-3 py-2 text-sm text-[#1d2430] hover:border-[#ea580c]">
            Back to login
          </Link>
        </div>

        <p className="mb-6 text-sm leading-7 text-[#4b5563]">
          Enter the email address associated with your consulting workspace and we’ll send a secure reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-[#4b5563]">Work email</label>
            <input
              type="email"
              defaultValue="admin@consulting.studio"
              className="w-full rounded-2xl border border-[#e7dfd7] bg-[#fffaf5] px-4 py-3 text-[#1d2430] outline-none transition focus:border-[#ea580c] focus:ring-2 focus:ring-[#f7d0b8]"
            />
          </div>

          <button type="submit" className="w-full rounded-2xl border border-[#ea580c] bg-gradient-to-r from-[#ea580c] to-[#fb923c] px-4 py-3.5 font-medium text-white shadow-[0_14px_28px_rgba(234,88,12,0.22)] transition hover:-translate-y-0.5">
            Send reset link
          </button>
        </form>

        <div className="mt-6 border-t border-[#efe3d9] pt-5 text-sm text-[#4b5563]">
          Need a new account?{' '}
          <Link to="/request-access" className="font-medium text-[#ea580c]">
            Request access
          </Link>
        </div>
      </div>
    </div>
  )
}
