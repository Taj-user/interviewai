import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function InterviewRoom()
{
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [muted, setMuted] = useState(false)
    const [showEndConfirm, setShowEndConfirm] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [messages, setMessages] = useState([{
            role: "ai",
            content: "Hello! Welcome to your interview. Let's start with an easy one - can you tell me a little about yourself and your background",
        },
    ])
    const [isListening, setIsListening] = useState(false)
    const [showTypeInput, setShowTypeInput] = useState(false)
    const [typedMessage, setTypedMessage] = useState("")
    const bottomRef = useRef(null)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const interval = setInterval(() => setSeconds((s) => s + 1), 1000)
        return () => clearInterval(interval)
    }, [paused])

    const formatTime = (s) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${m}:${sec.toString().padStart(2, "0")}`
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleEndSession = () => {
        setMenuOpen(false)
        setShowEndConfirm(true)
    }

    const handleBreak = () => {
        setMenuOpen(false)
        setPaused(true)
    }

    const confirmEndSession = () => {
        navigate("/dashboard")
    }

    const handleSendTyped = () => {
        if(!typedMessage.trim()) return
        setMessages((prev) => [...prev, { role: "user", content: typedMessage }])
        setTypedMessage("")
        setShowTypeInput(false)
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            {/* Nav */}
            <nav className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-800 relative">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-400 hover:text-white text-xl transition"
                >
                    ☰
                </button>
                <h1 className="text-lg font-bold text-blue-400">InterviewGPT</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMuted(!muted)}
                        className="text-gray-400 hover:text-white transition text-lg"
                    >
                        {muted ? "🔇" : "🔊"}
                    </button>
                    <span className="text-gray-400 text-sm font-mono">{formatTime(seconds)}</span>
                </div>

                {/* Sandwhich Menu */}
                {menuOpen && (
                    <div className="absolute top-14 left-4 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
                        <button
                            onClick={handleEndSession}
                            className="px-4 py-3 text-left text-sm text-red-400 hover:bg-gray-800 transition"
                        >
                            End Session
                        </button>
                        <button
                            onClick={handleBreak}
                            className="px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800 transition"
                        >
                            Take a Break
                        </button>
                    </div>
                )}
            </nav>

            {/* Chat History */}
            <main className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-1 max-w-xs ${
                            msg.role === "ai" ? "self-start" : "self-end items-end"
                        }`}
                    >
                        <span className="text-xs text-gray-500">
                            {msg.role === "ai" ? "🤖 Interviewer" : "👤 You"}
                        </span>
                        <div
                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                msg.role === "ai"
                                ? "bg-gray-800 text-white rounded-tl-none"
                                : "bg-blue-600 text-white rounded-tr-none"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </main>

            {/* Voice Input */}
            <div className="w-full px-4 py-6 flex flex-col items-center gap-4 border-t border-gray-800 bg-gray-950">
                {/* Waveform */}
                <div className="flex items-end gap-1 h-8">
                    {[3, 6, 9, 12, 9, 6, 3, 6, 9, 12, 9, 6, 3].map((h, i) => (
                        <div
                            key = {i}
                            style = {{ height: isListening ? `${h * 2}px` : "4px" }}
                            className="w-1 bg-blue-400 rounded-full transition-all duration-300"
                        />
                    ))}
                </div>

                {/* Mic Button */}
                <button
                    onClick={() => setIsListening(!isListening)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition ${
                        isListening
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    🎤
                </button>

                {/* Type Instead */}
                {!showTypeInput ? (
                    <button
                        onClick={() => setShowTypeInput(true)}
                        className="text-gray-500 hover:text-gray-300 text-sm transition"
                    >
                        Type instead
                    </button>
                ) : (
                    <div className="w-full flex gap-2">
                        <input
                            type="text"
                            value={typedMessage}
                            onChange={(e) => setTypedMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendTyped()}
                            placeholder="Type your answer..."
                            className="flex-1 py-2 px-4 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                        />
                        <button
                            onClick={handleSendTyped}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-semibold transition"
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>

            {/* End Session Confirmation */}
            {showEndConfirm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 px-6">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 flex flex-col gap-4 w-full max-w-sm">
                        <h3 className="text-lg font-bold">End Session?</h3>
                        <p className="text-gray-400 text-sm">
                            {seconds < 120
                                ? "You haven't reached 2 minutes yet. Leaving now won't count toward your progress."
                                : "Are you sure you want to end this session?"}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowEndConfirm(false)}
                                className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition text-sm font-semibold"
                            >
                                Keep Going
                            </button>
                            <button
                                onClick={confirmEndSession}
                                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition text-sm font-semibold"
                            >
                                End Session
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Paused Screen */}
            {paused && (
                <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 px-6 gap-6">
                    <h2 className="text-2xl font-bold">Session Paused</h2>
                    <p className="text-gray-400 text-sm text-center">Your session is saved in memory. Resume when you're ready.</p>
                    <button
                        onClick={() => setPaused(false)}
                        className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition"
                    >
                        Resume Session
                    </button>
                    <button
                        onClick={handleEndSession}
                        className="text-red-400 hover:text-red-300 text-sm transition"
                    >
                        End Session Instead
                    </button>
                </div>
            )}
        </div>
    )
}