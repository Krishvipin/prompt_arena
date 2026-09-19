import { createGroq } from "@ai-sdk/groq";
import type { LLMProvider } from "./provider";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});

const model = groq("llama-3.3-70b-versatile");

export const groqProvider: LLMProvider = {
  async generate(prompt: string): Promise<string> {
    const { generateText } = await import("ai");

    const result = await generateText({
      model,
      prompt,
    });

    return result?.text;
  },
};
