import { z } from "zod";
import { AttackerOutputSchema } from "./attacker";
import { DefenderOutputSchema } from "./defender";
import { RefereeOutputSchema } from "./referee";
import { FirewallEvaluationSchema } from "./firewall";

export const ArenaMatchSchema = z.object({
  matchId: z.string(),
  maxRounds: z.number().int().positive(),
  secretToken: z.string(),
  benignTask: z.string(),
});

export type ArenaMatch = z.infer<typeof ArenaMatchSchema>;

export const ArenaRoundSchema = z.object({
  roundNumber: z.number().int().nonnegative(),
  attackerOutput: AttackerOutputSchema.optional(),
  firewallEvaluation: FirewallEvaluationSchema.optional(),
  defenderOutput: DefenderOutputSchema.optional(),
  refereeOutput: RefereeOutputSchema.optional(),
});

export type ArenaRound = z.infer<typeof ArenaRoundSchema>;
