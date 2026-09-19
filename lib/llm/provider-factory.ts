import type { LLMProvider } from "./provider";
import { groqProvider } from "./groq";
import { geminiProvider } from "./gemini";
import { ollamaProvider } from "./ollama";

export type LLMProviderName = "groq" | "gemini" | "ollama";

export const getLLMProvider = (provider: LLMProviderName): LLMProvider => {
  switch (provider) {
    case "groq":
      return groqProvider;

    case "gemini":
      return geminiProvider;

    case "ollama":
      return ollamaProvider;

    default:
      throw new Error(`Unsupported LLM provider: ${provider}`);
  }
};
