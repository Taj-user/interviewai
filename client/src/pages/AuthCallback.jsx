import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const stored = localStorage.getItem("onboarding_answers")
        if (stored) {
          const { data: existing } = await supabase
            .from("onboarding_answers")
            .select("id")
            .eq("user_id", session.user.id)
            .single()

          if (!existing) {
            const answers = JSON.parse(stored)
            await supabase.from("onboarding_answers").insert({
              user_id: session.user.id,
              ...answers,
            })
          }
          localStorage.removeItem("onboarding_answers")
        }
        navigate("/dashboard")
      } else {
        navigate("/")
      }
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <p>Signing you in...</p>
    </div>
  )
}