import { z } from "zod";

export const FirewallRuleSchema = z.object({
  id: z.string(),
  pattern: z.string(),
  flags: z.string(),
  description: z.string(),
  createdAtRound: z.number(),
});

export type FirewallRule = z.infer<typeof FirewallRuleSchema>;

export const FirewallEvaluationSchema = z.object({
  blocked: z.boolean(),
  triggeredRuleId: z.string().nullable(),
  ruleDescription: z.string().nullable(),
});

export type FirewallEvaluation = z.infer<typeof FirewallEvaluationSchema>;
