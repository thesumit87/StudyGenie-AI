import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log(
  "API KEY LOADED:",
  GEMINI_API_KEY ? "YES" : "NO"
);

if (!GEMINI_API_KEY) {
  console.log("ERROR: GEMINI_API_KEY is missing");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
  httpOptions: {
    timeout: 10000,
    retryOptions: {
      attempts: 1,
    },
  },
});

const systemInstruction = `
You are StudyGenie AI, a student learning assistant.

Give clear and natural answers.

Use:
- Clear headings when needed
- Bold important terms
- Bullet points for lists
- Numbered points for steps
- Short paragraphs
- Simple explanations

Do not show markdown symbols like ### or **.
Do not repeat the question.
Do not give unnecessarily long answers.
Give examples when useful.
`;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudyGenie AI Backend is running",
  });
});

app.get("/api/test", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "Say hello in one short sentence.",
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: "low",
        },
        maxOutputTokens: 500,
      },
    });

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("TEST ERROR:", error);

    res.status(503).json({
      success: false,
      error:
        "Gemini is temporarily unavailable. Please try again.",
    });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    console.log("Question:", message);

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message.trim(),
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: "low",
        },
        maxOutputTokens: 1000,
      },
    });

    const reply = response.text;

    console.log("AI response received");

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(503).json({
      success: false,
      error:
        "Gemini is temporarily unavailable. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `StudyGenie AI Backend running on port ${PORT}`
  );
});