import type { AttackerMemoryEntry } from "@/types";

export const formatAttackerMemory = (
  entries: AttackerMemoryEntry[],
): string => {
  if (entries.length === 0) {
    return "No previous attack memory.";
  }

  return entries
    .map(
      (entry, index) =>
        `Attempt ${index + 1}:
Tactic: ${entry.tactic}
Bypassed firewall: ${entry.bypassed_firewall}
Secret leaked: ${entry.secret_leaked}
Score: ${entry.score}
Payload: ${entry.document}`,
    )
    .join("\n\n");
};
