import { useNavigate } from "react-router-dom"

export default function OnboardingLayout({ children, step, totalSteps }) {
  const navigate = useNavigate()
  const progress = (step / totalSteps) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-500 text-sm">Step {step} of {totalSteps}</p>
        <div className="flex-1">{children}</div>
        {step > 1 && (
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-300 text-sm transition"
          >
            &larr; Back
          </button>
        )}
        <button
          onClick={() => navigate("/login")}
          className="text-gray-500 hover:text-gray-300 text-sm transition self-center"
        >
          &gt; Skip to Login
        </button>
      </div>
    </div>
  )
}