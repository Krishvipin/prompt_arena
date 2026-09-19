import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import type { LLMProvider } from "./provider";

const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

const model = gemini("gemini-3.5-flash-lite");

export const geminiProvider: LLMProvider = {
  async generate(prompt: string): Promise<string> {
    const result = await generateText({
      model,
      prompt,
    });

    return result?.text;
  },
};
