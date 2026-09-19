import { AttackerOutputSchema } from "@/types";
import type { LLMProvider } from "@/lib/llm/provider";
import type { AttackerInput, AttackerResult } from "./types";
import { buildAttackerPrompt } from "./prompt";

export const runAttacker = async (
  provider: LLMProvider,
  input: AttackerInput,
): Promise<AttackerResult> => {
  const prompt = buildAttackerPrompt({
    ...input,
  });

  const response = await provider.generate(prompt);
  const parsed = JSON.parse(response);

  return AttackerOutputSchema.parse(parsed);
};
