import { describe, it } from "node:test";
import assert from "node:assert";
import {
  FirewallEvaluationSchema,
  FirewallRuleSchema,
} from "@/types";

describe("Firewall Domain Contracts", () => {
  it("validates a complete FirewallRule", () => {
    const validRule = {
      id: "rule_01_override",
      pattern: "(?:ignore|disregard)\\s+(?:previous|all)\\s+instructions",
      flags: "i",
      description: "Detects direct instruction override attempts",
      createdAtRound: 1,
    };

    const parsed = FirewallRuleSchema.parse(validRule);
    assert.deepStrictEqual(parsed, validRule);
  });

  it("fails when required fields in FirewallRule are omitted", () => {
    assert.throws(() =>
      FirewallRuleSchema.parse({
        id: "rule_01",
        pattern: "test",
        flags: "i",
        // description missing
        createdAtRound: 1,
      })
    );

    assert.throws(() =>
      FirewallRuleSchema.parse({
        id: "rule_01",
        pattern: "test",
        flags: "i",
        description: "desc",
        // createdAtRound missing
      })
    );
  });

  it("validates FirewallEvaluation when unblocked with null rule details", () => {
    const unblockedEval = {
      blocked: false,
      triggeredRuleId: null,
      ruleDescription: null,
    };

    const parsed = FirewallEvaluationSchema.parse(unblockedEval);
    assert.deepStrictEqual(parsed, unblockedEval);
  });

  it("validates FirewallEvaluation when blocked with rule details", () => {
    const blockedEval = {
      blocked: true,
      triggeredRuleId: "rule_01_override",
      ruleDescription: "Detects direct instruction override attempts",
    };

    const parsed = FirewallEvaluationSchema.parse(blockedEval);
    assert.deepStrictEqual(parsed, blockedEval);
  });

  it("fails when FirewallEvaluation has invalid field types", () => {
    assert.throws(() =>
      FirewallEvaluationSchema.parse({
        blocked: "true", // string instead of boolean
        triggeredRuleId: null,
        ruleDescription: null,
      })
    );

    assert.throws(() =>
      FirewallEvaluationSchema.parse({
        blocked: true,
        triggeredRuleId: 123, // number instead of string/null
        ruleDescription: null,
      })
    );
  });
});
