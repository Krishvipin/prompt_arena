import { z } from "zod";

export const DefenderFirewallRuleSchema = z.object({
  pattern: z.string(),
  flags: z.string(),
  description: z.string(),
});

export type DefenderFirewallRule = z.infer<typeof DefenderFirewallRuleSchema>;

export const DefenderOutputSchema = z.object({
  threat_assessment: z.string(),
  sanitized_response: z.string(),
  synthesized_firewall_rule: DefenderFirewallRuleSchema.optional(),
});

export type DefenderOutput = z.infer<typeof DefenderOutputSchema>;
