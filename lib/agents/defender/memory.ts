import type { DefenderMemoryEntry } from "@/types";

export const formatDefenderMemory = (
  entries: DefenderMemoryEntry[],
): string => {
  if (entries.length === 0) {
    return "No previous defense memory.";
  }

  return entries
    .map(
      (entry, index) =>
        `Defense ${index + 1}:
Vulnerability class: ${entry.vulnerability_class}
Patched by rule ID: ${entry.patched_by_rule_id ?? "None"}
Document: ${entry.document}`,
    )
    .join("\n\n");
};
