import { useNavigate } from "react-router-dom"
import { useOnboarding } from "../../context/OnboardingContext"
import OnboardingLayout from "../../components/OnboardingLayout"

export default function PracticeDuration() {
  const navigate = useNavigate()
  const { answers, updateAnswer } = useOnboarding()

  const options = ["2 - 5 mins", "5 - 15 mins", "15 - 30 mins", "30+ mins"]

  return (
    <OnboardingLayout step={5} totalSteps={6}>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">How long do you plan to practice per session?</h2>
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => updateAnswer("practice_duration", option)}
              style={
                answers.practice_duration === option
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
          onClick={() => navigate("/onboarding/signup")}
          disabled={!answers.practice_duration}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
        >
          Next
        </button>
      </div>
    </OnboardingLayout>
  )
}