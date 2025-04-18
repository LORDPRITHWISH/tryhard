import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);
