import { z } from "zod";

export const ATTACKER_TACTICS = [
  "direct_override",
  "roleplay_bypass",
  "base64_obfuscation",
  "hex_split",
  "rag_poisoning",
  "token_smuggling",
  "linguistic_inversion",
] as const;

export const AttackerTacticSchema = z.enum(ATTACKER_TACTICS);
export type AttackerTactic = z.infer<typeof AttackerTacticSchema>;

export const TARGET_SURFACES = [
  "direct_prompt",
  "rag_document",
] as const;

export const TargetSurfaceSchema = z.enum(TARGET_SURFACES);
export type TargetSurface = z.infer<typeof TargetSurfaceSchema>;

export const AttackerOutputSchema = z.object({
  internal_thought: z.string(),
  tactic_label: AttackerTacticSchema,
  payload: z.string(),
  target_surface: TargetSurfaceSchema,
});

export type AttackerOutput = z.infer<typeof AttackerOutputSchema>;
