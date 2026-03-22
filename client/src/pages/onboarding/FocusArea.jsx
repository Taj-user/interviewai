import { useNavigate } from "react-router-dom"
import { useOnboarding } from "../../context/OnboardingContext"
import OnboardingLayout from "../../components/OnboardingLayout"

export default function FocusArea() {
  const navigate = useNavigate()
  const { answers, updateAnswer } = useOnboarding()

  const options = ["DSA / Coding", "System Design", "Behavioral", "Mix of All"]

  return (
    <OnboardingLayout step={4} totalSteps={6}>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">What do you want to focus on?</h2>
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => updateAnswer("focus_area", option)}
              style={
                answers.focus_area === option
                  ? { borderColor: "#3b82f6", backgroundColor: "#1e3a5f", color: "white" }
                  : {}
              }
              className="w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500 text-left transition"
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/onboarding/duration")}
          disabled={!answers.focus_area}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
        >
          Next
        </button>
      </div>
    </OnboardingLayout>
  )
}