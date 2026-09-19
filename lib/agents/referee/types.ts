import type { ArenaRound } from "@/types";

export interface RefereeInput {
  benignTask: string;
  secretToken: string;
  round: ArenaRound;
}

export type RefereeResult = ArenaRound["refereeOutput"];
