import { Routes, Route } from "react-router-dom"
import Welcome from "./pages/onboarding/Welcome"
import FieldOfStudy from "./pages/onboarding/FieldOfStudy"
import ExperienceLevel from "./pages/onboarding/ExperienceLevel"
import TargetCompany from "./pages/onboarding/TargetCompany"
import FocusArea from "./pages/onboarding/FocusArea"
import PracticeDuration from "./pages/onboarding/PracticeDuration"
import Signup from "./pages/onboarding/Signup"
import AuthCallback from "./pages/AuthCallback"
import Dashboard from "./pages/Dashboard"
import CheckEmail from "./pages/CheckEmail"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import InterviewSetup from "./pages/InterviewSetup"
import InterviewRoom from "./pages/InterviewRoom"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/onboarding/field" element={<FieldOfStudy />} />
      <Route path="/onboarding/experience" element={<ExperienceLevel />} />
      <Route path="/onboarding/company" element={<TargetCompany />} />
      <Route path="/onboarding/focus" element={<FocusArea />} />
      <Route path="/onboarding/duration" element={<PracticeDuration />} />
      <Route path="/onboarding/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/interview" element={<ProtectedRoute><InterviewSetup /></ProtectedRoute>} />
      <Route path="/interview/session" element={<ProtectedRoute><InterviewRoom /></ProtectedRoute>} />
    </Routes>
  )
}