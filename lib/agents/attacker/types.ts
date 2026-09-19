import type { AttackerOutput, AttackerMemoryEntry } from "@/types";

/**
 * This defines what the attacker needs before it can generate an attack:
 * - benignTask → what the protected system is supposed to do
 * - roundNumber → which self-play round we're in
 * - previousAttempts → what attacks have already been tried
 */
export interface AttackerInput {
  benignTask: string;
  roundNumber: number;
  previousAttempts: AttackerMemoryEntry[];
}

export type AttackerResult = AttackerOutput;
