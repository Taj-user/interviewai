import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import { useOnboarding } from "../../context/OnboardingContext"
import OnboardingLayout from "../../components/OnboardingLayout"

export default function Signup() {
  const navigate = useNavigate()
  const { answers } = useOnboarding()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailSignup = async () => {
    setError("")
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/auth/callback",
        data: {
          full_name: fullName,
        },
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    localStorage.setItem("onboarding_answers", JSON.stringify(answers))
    setLoading(false)
    navigate("/check-email")
  }

  const handleGoogleSignup = async () => {
    localStorage.setItem("onboarding_answers", JSON.stringify(answers))
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    })
    if (error) setError(error.message)
  }

  return (
    <OnboardingLayout step={6} totalSteps={6}>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Create your account</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleEmailSignup}
          disabled={!email || !password || !fullName || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>
        <button
          onClick={handleGoogleSignup}
          className="w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-900 text-white hover:border-gray-500 transition font-semibold"
        >
          Continue with Google
        </button>
      </div>
    </OnboardingLayout>
  )
}