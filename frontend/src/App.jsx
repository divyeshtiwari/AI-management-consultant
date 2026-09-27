import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import B2BPage from './pages/B2BPage'
import PricingPage from './pages/PricingPage'
import DashboardPage from './pages/DashboardPage'
import NewEngagementPage from './pages/NewEngagementPage'
import ExecutionPipelinePage from './pages/ExecutionPipelinePage'
import ReportDossierPage from './pages/ReportDossierPage'
import ReportsArchivePage from './pages/ReportsArchivePage'
import SettingsPage from './pages/SettingsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import RequestAccessPage from './pages/RequestAccessPage'
import NeedAccountPage from './pages/NeedAccountPage'

const ACCESS_MATRIX = {
  admin: ['admin'],
  ops: ['admin', 'ops'],
  support: ['admin', 'ops', 'support'],
  client: ['client'],
}

function ProtectedRoute({ user, allowedRoles, children }) {
  const hasAccess = !!user && (!allowedRoles || allowedRoles.includes(user.role))
  if (!user) return <Navigate to="/login" replace />
  if (!hasAccess) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={(profile) => setUser(profile)} />} />
        <Route path="/b2b" element={<B2BPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/request-access" element={<RequestAccessPage />} />
        <Route path="/need-account" element={<NeedAccountPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} allowedRoles={['admin', 'ops', 'support', 'client']}>
              <DashboardPage user={user} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engagement/new"
          element={
            <ProtectedRoute user={user} allowedRoles={ACCESS_MATRIX.ops}>
              <NewEngagementPage user={user} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pipeline"
          element={
            <ProtectedRoute user={user} allowedRoles={ACCESS_MATRIX.ops}>
              <ExecutionPipelinePage user={user} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dossier"
          element={
            <ProtectedRoute user={user} allowedRoles={ACCESS_MATRIX.ops}>
              <ReportDossierPage user={user} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <ProtectedRoute user={user} allowedRoles={ACCESS_MATRIX.ops}>
              <ReportsArchivePage user={user} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user} allowedRoles={ACCESS_MATRIX.ops}>
              <SettingsPage user={user} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
