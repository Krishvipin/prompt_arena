import { RefereeOutputSchema } from "@/types";
import type { LLMProvider } from "@/lib/llm/provider";
import type { RefereeInput, RefereeResult } from "./types";
import { buildRefereePrompt } from "./prompt";

export const runReferee = async (
  provider: LLMProvider,
  input: RefereeInput,
): Promise<RefereeResult> => {
  const prompt = buildRefereePrompt({
    ...input,
  });

  const response = await provider.generate(prompt);
  const parsed = JSON.parse(response);

  return RefereeOutputSchema.parse(parsed);
};
