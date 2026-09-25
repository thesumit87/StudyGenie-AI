import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    timeout: 30000,
    retryOptions: {
      attempts: 2,
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

const models = [
  "gemini-3.8-flash",
  "gemini-3.5-flash-lite",
];

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function isTemporaryError(error) {
  const message = JSON.stringify(error).toLowerCase();

  return (
    message.includes("503") ||
    message.includes("unavailable") ||
    message.includes("high demand") ||
    message.includes("429") ||
    message.includes("too many requests") ||
    message.includes("408") ||
    message.includes("timeout") ||
    message.includes("internal")
  );
}

async function generateAIResponse(contents, maxOutputTokens = 1000) {
  let lastError;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(
          `Trying model: ${model} | Attempt: ${attempt}`
        );

        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            thinkingConfig: {
              thinkingLevel: "low",
            },
            maxOutputTokens,
          },
        });

        console.log(`AI response received from ${model}`);

        return response;
      } catch (error) {
        lastError = error;

        console.error(
          `ERROR with ${model}, attempt ${attempt}:`,
          error?.message || error
        );

        if (!isTemporaryError(error)) {
          break;
        }

        if (attempt < 2) {
          await wait(1500 * attempt);
        }
      }
    }

    console.log(`Trying fallback model after ${model}`);
  }

  throw lastError;
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudyGenie AI Backend is running",
  });
});

app.get("/api/test", async (req, res) => {
  try {
    const response = await generateAIResponse(
      "Say hello in one short sentence.",
      500
    );

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("TEST ERROR:", error);

    res.status(503).json({
      success: false,
      error:
        "AI service is temporarily unavailable. Please try again.",
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

    const response = await generateAIResponse(
      message.trim(),
      1000
    );

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(503).json({
      success: false,
      error:
        "AI service is temporarily unavailable. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `StudyGenie AI Backend running on port ${PORT}`
  );
});
