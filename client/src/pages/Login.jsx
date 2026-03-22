import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Login()
{
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleEmailLogin = async() => {
        setError("")
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if(error)
        {
            setError(error.message)
            setLoading(false)
            return
        }
        setLoading(false)
        navigate("/dashboard")
    }

    const handleGoogleLogin = async() => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + "/auth/callback",
            },
        })
        if(error) setError(error.message)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
            <div className="w-full max-w-md flex flex-col gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-gray-400">Log in to continue your interview prep</p>
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <div className="flex flex-col gap-3">
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
                    onClick={handleEmailLogin}
                    disabled={!email || !password || loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-700" />
                    <span className="text-gray-500 text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-700" />
                </div>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-900 text-white hover:border-gray-500 transition font-semibold"
                >
                    Continue with Google
                </button>
                <p className="text-center text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/")}
                        className="text-blue-400 hover:text-blue-300 transition"
                    >
                        Get started
                    </button>
                </p>
            </div>
        </div>
    )
}