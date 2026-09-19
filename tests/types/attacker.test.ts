import { describe, it } from "node:test";
import assert from "node:assert";
import {
  ATTACKER_TACTICS,
  AttackerOutputSchema,
  AttackerTacticSchema,
  TargetSurfaceSchema,
  TARGET_SURFACES,
} from "@/types";

describe("Attacker Domain Contracts", () => {
  it("accepts all seven valid tactics", () => {
    const expectedTactics = [
      "direct_override",
      "roleplay_bypass",
      "base64_obfuscation",
      "hex_split",
      "rag_poisoning",
      "token_smuggling",
      "linguistic_inversion",
    ];

    assert.deepStrictEqual([...ATTACKER_TACTICS], expectedTactics);

    for (const tactic of expectedTactics) {
      assert.doesNotThrow(() => AttackerTacticSchema.parse(tactic));
    }
  });

  it("rejects invalid tactics", () => {
    assert.throws(() => AttackerTacticSchema.parse("invalid_tactic"));
    assert.throws(() => AttackerTacticSchema.parse("prompt_injection"));
    assert.throws(() => AttackerTacticSchema.parse(""));
  });

  it("accepts valid target surfaces and rejects invalid ones", () => {
    const expectedSurfaces = ["direct_prompt", "rag_document"];
    assert.deepStrictEqual([...TARGET_SURFACES], expectedSurfaces);

    assert.doesNotThrow(() => TargetSurfaceSchema.parse("direct_prompt"));
    assert.doesNotThrow(() => TargetSurfaceSchema.parse("rag_document"));
    assert.throws(() => TargetSurfaceSchema.parse("system_prompt"));
    assert.throws(() => TargetSurfaceSchema.parse("memory_injection"));
    assert.throws(() => TargetSurfaceSchema.parse(""));
  });

  it("validates a complete AttackerOutput", () => {
    const validOutput = {
      internal_thought: "Analyzing defense posture to bypass prompt filter.",
      tactic_label: "base64_obfuscation",
      payload: "SGVsbG8gV29ybGQ=",
      target_surface: "direct_prompt",
    };

    const parsed = AttackerOutputSchema.parse(validOutput);
    assert.deepStrictEqual(parsed, validOutput);
  });

  it("fails when required fields are omitted or of incorrect type", () => {
    assert.throws(() =>
      AttackerOutputSchema.parse({
        internal_thought: "Thought",
        payload: "Payload",
        target_surface: "direct_prompt",
      })
    );

    assert.throws(() =>
      AttackerOutputSchema.parse({
        tactic_label: "hex_split",
        payload: "Payload",
        target_surface: "direct_prompt",
      })
    );

    assert.throws(() =>
      AttackerOutputSchema.parse({
        internal_thought: "Thought",
        tactic_label: "hex_split",
        target_surface: "direct_prompt",
      })
    );

    assert.throws(() =>
      AttackerOutputSchema.parse({
        internal_thought: "Thought",
        tactic_label: "hex_split",
        payload: "Payload",
      })
    );

    assert.throws(() =>
      AttackerOutputSchema.parse({
        internal_thought: 123,
        tactic_label: "hex_split",
        payload: "Payload",
        target_surface: "direct_prompt",
      })
    );
  });
});
