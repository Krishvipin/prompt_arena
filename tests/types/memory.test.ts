import { describe, it } from "node:test";
import assert from "node:assert";
import {
  AttackerMemoryEntrySchema,
  DefenderMemoryEntrySchema,
} from "@/types";

describe("Memory Domain Contracts", () => {
  it("validates a valid AttackerMemoryEntry", () => {
    const validEntry = {
      document: "Round 1: Attempted direct override on system prompt.",
      tactic: "direct_override",
      bypassed_firewall: false,
      secret_leaked: false,
      score: 3.5,
    };

    const parsed = AttackerMemoryEntrySchema.parse(validEntry);
    assert.deepStrictEqual(parsed, validEntry);
  });

  it("fails when AttackerMemoryEntry has an invalid tactic", () => {
    assert.throws(() =>
      AttackerMemoryEntrySchema.parse({
        document: "Round 1: Invalid tactic attack.",
        tactic: "sql_injection",
        bypassed_firewall: true,
        secret_leaked: false,
        score: 4.0,
      })
    );
  });

  it("fails when required fields in AttackerMemoryEntry are omitted", () => {
    assert.throws(() =>
      AttackerMemoryEntrySchema.parse({
        document: "Missing score and tactic",
        bypassed_firewall: true,
        secret_leaked: false,
      })
    );
  });

  it("validates a valid DefenderMemoryEntry with patched_by_rule_id", () => {
    const validEntry = {
      document: "Observed base64 encoded injection in query payload.",
      vulnerability_class: "encoding_obfuscation",
      patched_by_rule_id: "rule_02_base64",
    };

    const parsed = DefenderMemoryEntrySchema.parse(validEntry);
    assert.deepStrictEqual(parsed, validEntry);
  });

  it("validates a valid DefenderMemoryEntry with null or omitted patched_by_rule_id", () => {
    const nullEntry = {
      document: "Observed novel zero-day linguistic anomaly.",
      vulnerability_class: "linguistic_inversion",
      patched_by_rule_id: null,
    };
    assert.deepStrictEqual(DefenderMemoryEntrySchema.parse(nullEntry), nullEntry);

    const omittedEntry = {
      document: "Observed subtle roleplay attempt.",
      vulnerability_class: "roleplay_bypass",
    };
    const parsedOmitted = DefenderMemoryEntrySchema.parse(omittedEntry);
    assert.strictEqual(parsedOmitted.document, omittedEntry.document);
    assert.strictEqual(parsedOmitted.vulnerability_class, omittedEntry.vulnerability_class);
  });

  it("fails when DefenderMemoryEntry is missing required document or vulnerability_class", () => {
    assert.throws(() =>
      DefenderMemoryEntrySchema.parse({
        vulnerability_class: "prompt_leakage",
      })
    );

    assert.throws(() =>
      DefenderMemoryEntrySchema.parse({
        document: "Missing vulnerability class",
      })
    );
  });
});
