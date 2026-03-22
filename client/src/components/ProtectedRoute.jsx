import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function ProtectedRoute({ children })
{
    const navigate = useNavigate()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if(!session) navigate("/login")
            else setChecking(false)
        })
    }, [])

    if(checking)
    {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
                <p>Loading...</p>
            </div>
        )
    }
    return children
}