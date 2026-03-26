import express from "express"
import OpenAI from "openai"
import dotenv from "dotenv"

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Generate AI response to user's answer
router.post("/chat", async (req, res) => {
    const { messages, mode, interviewType } = req.body

    const systemPrompt = `You are an AI technical interviewer conducting a ${interviewType} interview.
    Your tone should be ${mode === "beginner" ? "friendly, encouraging and coaching" : mode === "hard" ? "professional and strict" : "cold and brutally honest"}.
    Ask one question at a time. After the user answers, give brief feedback then ask the next question.
    Focus on ${interviewType === "behavioral" ? "past experiences, teamwork, and soft skills" : interviewType === "dsa" ? "data structures, algorithms, and coding problems" : "system architecture and large scale design"}.
    Keep your responses concise and realistic to a real interview setting.`

    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            message: [
                { role: "system", content: systemPrompt },
                ...messages,
            ],
    })
    res.json({ message: completion.choices[0].message.content })
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ error: "Failed to generate response"})
    }
})

// Generate TTS audio from text
router.post("/speak", async (req, res) => {
    const { text } = req.body

    try
    {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "onyx",
            input: text,
        })
        const buffer = Buffer.from(await mp3.arrayBuffer())
        res.set("Content-Type", "audio/mpeg")
        res.send(buffer)
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ error: "Failed to generate speech" })
    }
})

// Transcribe user voice to text
router.post("/transcribe", async (req, res) => {
    const { audio } = req.body

    try
    {
        const transcription = await openai.audio.transcriptions.create({
            model: "whisper-1",
            file: audio,
        })
        res.json({ text: transcription.text })
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ error: "Failed to transcribe audio "})
    }
})

export default router