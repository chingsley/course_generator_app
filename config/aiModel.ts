import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY });

export const generateAIContent = (content: string) => ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: content,
  config: {
    maxOutputTokens: 1000,
    temperature: 1,
    responseMimeType: "application/json"
  },
});
