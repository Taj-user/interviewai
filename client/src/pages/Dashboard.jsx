import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Dashboard() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single()
          .then(({ data }) => setProfile(data))
      }
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Nav Bar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">InterviewGPT</h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm"
          >
            {profile?.full_name?.charAt(0).toUpperCase() || "?"}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-xl shadow-lg flex flex-col overflow-hidden">
              <button className="px-4 py-3 text-left text-sm hover:bg-gray-800 transition">
                Profile
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-3 text-left text-sm text-red-400 hover:bg-gray-800 transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
        {/* Welcome */}
        <div>
          <h2 className="text-3xl font-bold">
            Welcome back, {profile?.full_name?.split(" ")[0] || ""} 👋
          </h2>
          <p className="text-gray-400 mt-1">Ready to practice today?</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Sessions Completed", value: "0" },
            { label: "Current Streak", value: "0 days" },
            { label: "Resumes Uploaded", value: "0" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-2"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/interview")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition"
          >
            Start New Interview
          </button>
          <button
            onClick={() => navigate("/resume")}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 rounded-2xl transition border border-gray-700"
          >
            Resume Builder
          </button>
        </div>

        {/* Recent Sessions */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Recent Sessions</h3>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center text-gray-500">
            No sessions yet. Start your first interview to see your history here.
          </div>
        </div>
      </main>
    </div>
  )
}