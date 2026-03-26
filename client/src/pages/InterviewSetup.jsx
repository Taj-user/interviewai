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
            {MODES.map((mode, index) => {
              const isSelected = selectedMode?.label === mode.label
              const isLocked = mode.locked
              return (
                <button
                  key={mode.label}
                  onClick={() => handleModeSelect(mode)}
                  disabled={isLocked}
                  className={
                    `flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition relative overflow-hidden
                    ${isLocked
                      ? "cursor-not-allowed opacity-80 border-yellow-400"
                      : isSelected
                      ? "border-blue-500 text-white"
                      : "text-gray-300 bg-gray-900 hover:bg-gray-800"}
                    ${index !== 0 ? "border-l border-gray-700" : ""}`
                  }
                  style={
                    isLocked
                      ? { color: "black" }
                      : isSelected
                      ? {
                          backgroundColor: "#172554",
                          borderColor: "#3b82f6",
                          color: "white",
                        }
                      : {}
                  }
                >
                  {/* Animated gold+white wave for locked */}
                  {isLocked && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none rounded-none"
                      style={{
                        zIndex: 0,
                        background:
                          'linear-gradient(105deg, #fff7e1 0%, #fffde6 12%, #F6E27A 25%, #F8EBC6 53%, #fff 74%, #FFD700 100%)',
                        animation: "goldWaveSeamless 3s linear infinite",
                        backgroundSize: "300% 300%",
                        opacity: 0.97,
                      }}
                    />
                  )}
                  {/* Animate border / background for 'active' or selected */}
                  {isSelected && !isLocked && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none rounded-none"
                      style={{
                        zIndex: 0,
                        background:
                          'linear-gradient(100deg, #29376c 0%, #3b82f6 60%, #172554 100%)',
                        opacity: 0.25,
                        animation: "blueWaveSeamless 1.8s cubic-bezier(.4,0,.6,1) infinite",
                        backgroundSize: "200% 200%",
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {isLocked ? (
                      <>
                        <span className="font-semibold">Expert</span>
                      </>
                    ) : (
                      mode.label
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          {selectedMode && (
            <p className="text-sm text-gray-400 px-1">{selectedMode.description}</p>
          )}
        </div>
        {/* Animations */}
        <style>
          {`
            /* Seamless left-to-right gold wave animation */
            @keyframes goldWaveSeamless {
              0% {
                background-position: 0% 50%;
              }
              100% {
                background-position: 100% 50%;
              }
            }
            /* Seamless left-to-right blue wave animation for selected */
            @keyframes blueWaveSeamless {
              0% {
                background-position: 0% 50%;
              }
              100% {
                background-position: 100% 50%;
              }
            }
          `}
        </style>

        {/* Interview Type */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-400 font-medium">Interview Type</p>
          <div className="flex rounded-2xl border border-gray-700 overflow-hidden">
            {TYPES.map((type, index) => {
              const isSelected = selectedType?.label === type.label;
              const isLocked = type.locked;
              return (
                <button
                  key={type.label}
                  onClick={() => handleTypeSelect(type)}
                  disabled={isLocked}
                  className={
                    `flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition relative overflow-hidden
                    ${isLocked
                      ? "cursor-not-allowed opacity-80 border-yellow-400"
                      : isSelected
                      ? "border-blue-500 text-white"
                      : "text-gray-300 bg-gray-900 hover:bg-gray-800"}
                    ${index !== 0 ? "border-l border-gray-700" : ""}`
                  }
                  style={
                    isLocked
                      ? { color: "black" }
                      : isSelected
                      ? {
                          backgroundColor: "#172554",
                          borderColor: "#3b82f6",
                          color: "white",
                        }
                      : {}
                  }
                >
                  {/* Animated gold+white wave for locked (same as Difficulty) */}
                  {isLocked && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none rounded-none"
                      style={{
                        zIndex: 0,
                        background:
                          'linear-gradient(105deg, #fff7e1 0%, #fffde6 12%, #F6E27A 25%, #F8EBC6 53%, #fff 74%, #FFD700 100%)',
                        animation: "goldWaveSeamless 3s linear infinite",
                        backgroundSize: "300% 300%",
                        opacity: 0.97,
                      }}
                    />
                  )}
                  {/* Animate border / background for selected (same as Difficulty) */}
                  {isSelected && !isLocked && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none rounded-none"
                      style={{
                        zIndex: 0,
                        background:
                          'linear-gradient(100deg, #29376c 0%, #3b82f6 60%, #172554 100%)',
                        opacity: 0.25,
                        animation: "blueWaveSeamless 1.8s cubic-bezier(.4,0,.6,1) infinite",
                        backgroundSize: "200% 200%",
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {type.label}
                  </span>
                </button>
              )
            })}
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