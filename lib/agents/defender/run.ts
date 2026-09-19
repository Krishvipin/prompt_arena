import { DefenderOutputSchema } from "@/types";
import type { LLMProvider } from "@/lib/llm/provider";
import type { DefenderInput, DefenderResult } from "./types";
import { buildDefenderPrompt } from "./prompt";

export const runDefender = async (
  provider: LLMProvider,
  input: DefenderInput,
): Promise<DefenderResult> => {
  const prompt = buildDefenderPrompt({
    ...input,
  });

  const response = await provider.generate(prompt);
  const parsed = JSON.parse(response);

  return DefenderOutputSchema.parse(parsed);
};
