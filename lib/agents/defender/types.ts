import type { DefenderMemoryEntry, DefenderOutput } from "@/types";

/**
 * This defines what the defender needs before it can respond to an attack:
 * - benignTask → what the protected system is supposed to do
 * - secret → information the defender must protect
 * - attackPayload → the attack currently being evaluated
 * - roundNumber → which self-play round we're in
 * - previousAttempts → defensive memory from earlier rounds
 */
export interface DefenderInput {
  benignTask: string;
  secret: string;
  attackPayload: string;
  roundNumber: number;
  previousAttempts: DefenderMemoryEntry[];
}

export type DefenderResult = DefenderOutput;
