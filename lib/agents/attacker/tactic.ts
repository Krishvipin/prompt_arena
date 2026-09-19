import type { AttackerTactic } from "@/types";

export const selectTactic = (
  previousTactics: AttackerTactic[],
): AttackerTactic => {
  const tactics: AttackerTactic[] = [
    "direct_override",
    "roleplay_bypass",
    "base64_obfuscation",
    "hex_split",
    "rag_poisoning",
    "token_smuggling",
    "linguistic_inversion",
  ];
  const unused = tactics.filter((tactic) => !previousTactics.includes(tactic));

  const candidates = unused.length > 0 ? unused : tactics;

  return candidates[Math.floor(Math.random() * candidates.length)];
};
