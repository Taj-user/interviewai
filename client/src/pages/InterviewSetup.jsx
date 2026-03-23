import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MODES = [
  {
    label: "Beginner",
    locked: false,
    description: "Friendly tone, no timer, and coaching-style feedback. Perfect for getting comfortable with interviews.",
  },
  {
    label: "Hard",
    locked: false,
    description: "Professional and strict tone with a timer. Closer to a real interview experience.",
  },
  {
    label: "Expert",
    locked: true,
    description: "Voice only — no displayed text, no timer leniency, brutally honest feedback. Unlock by completing 15 sessions including at least 1 Hard session.",
  },
]

const TYPES = [
  {
    label: "Behavioral",
    locked: false,
    description: "Questions about your past experiences, teamwork, and soft skills. Great for all levels.",
  },
  {
    label: "DSA",
    locked: true,
    description: "Data structures and algorithms coding questions. Available on the paid plan.",
  },
  {
    label: "System Design",
    locked: true,
    description: "Architecture and design questions for large scale systems. Available on the paid plan.",
  },
]

export default function InterviewSetup() {
  const navigate = useNavigate()
  const [selectedMode, setSelectedMode] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const handleModeSelect = (mode) => {
    setSelectedMode(mode.label === selectedMode?.label ? null : mode)
  }

  const handleTypeSelect = (type) => {
    setSelectedType(type.label === selectedType?.label ? null : type)
  }

  const canStart = selectedMode && selectedType && !selectedMode.locked && !selectedType.locked

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col pb-28">
      {/* Nav */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">InterviewGPT</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-400 hover:text-white text-sm transition"
        >
          ← Back
        </button>
      </nav>

      {/* Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-10">
        <h2 className="text-3xl font-bold">Set Up Your Interview</h2>

        {/* Difficulty */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-400 font-medium">Difficulty</p>
          <div className="flex rounded-2xl border border-gray-700 overflow-hidden">
            {MODES.map((mode, index) => (
              <button
                key={mode.label}
                onClick={() => handleModeSelect(mode)}
                style={
                  selectedMode?.label === mode.label
                    ? { backgroundColor: "#172554", borderColor: "#3b82f6", color: "white" }
                    : {}
                }
                className={`flex-1 py-3 text-sm font-semibold text-gray-300 bg-gray-900 hover:bg-gray-800 transition flex items-center justify-center gap-1
                  ${index !== 0 ? "border-l border-gray-700" : ""}`}
              >
                {mode.locked && <span>🔒</span>}
                {mode.label}
              </button>
            ))}
          </div>
          {selectedMode && (
            <p className="text-sm text-gray-400 px-1">{selectedMode.description}</p>
          )}
        </div>

        {/* Interview Type */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-400 font-medium">Interview Type</p>
          <div className="flex rounded-2xl border border-gray-700 overflow-hidden">
            {TYPES.map((type, index) => (
              <button
                key={type.label}
                onClick={() => handleTypeSelect(type)}
                style={
                  selectedType?.label === type.label
                    ? { backgroundColor: "#172554", borderColor: "#3b82f6", color: "white" }
                    : {}
                }
                className={`flex-1 py-3 text-sm font-semibold text-gray-300 bg-gray-900 hover:bg-gray-800 transition flex items-center justify-center gap-1
                  ${index !== 0 ? "border-l border-gray-700" : ""}`}
              >
                {type.locked && <span>🔒</span>}
                {type.label}
              </button>
            ))}
          </div>
          {selectedType && (
            <p className="text-sm text-gray-400 px-1">{selectedType.description}</p>
          )}
        </div>
      </main>

      {/* Fixed Start Button */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/interview/session")}
            disabled={!canStart}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition"
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  )
}