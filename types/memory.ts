import { z } from "zod";
import { AttackerTacticSchema } from "./attacker";

export const AttackerMemoryEntrySchema = z.object({
  document: z.string(),
  tactic: AttackerTacticSchema,
  bypassed_firewall: z.boolean(),
  secret_leaked: z.boolean(),
  score: z.number(),
});

export type AttackerMemoryEntry = z.infer<typeof AttackerMemoryEntrySchema>;

export const DefenderMemoryEntrySchema = z.object({
  document: z.string(),
  vulnerability_class: z.string(),
  patched_by_rule_id: z.string().nullable().optional(),
});

export type DefenderMemoryEntry = z.infer<typeof DefenderMemoryEntrySchema>;
