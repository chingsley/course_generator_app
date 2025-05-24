import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY });

export const generateTopicsAIModel = (content: string) => ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: content,
  config: {
    maxOutputTokens: 500,
    temperature: 1,
    responseMimeType: "application/json"
  },
});

// console.log(response.text);