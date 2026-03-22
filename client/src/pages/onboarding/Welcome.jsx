import { useNavigate } from "react-router-dom";

export default function Welcome()
{
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
            <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">
                <h1 className="text-4xl font-bold">InterviewGPT</h1>
                <p className="text-gray-400 text-lg">
                    Practice real interview questions, get AI feedback, and land your dream tech job.
                </p>
                <button
                    onClick={() => navigate("/onboarding/field")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    Get Started
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="text-gray-500 hover:text-gray-300 text-sm transition"
                >
                    &gt; Skip to Login
                </button>
            </div>
        </div>
    )
}