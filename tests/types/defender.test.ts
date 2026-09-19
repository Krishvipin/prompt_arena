import { describe, it } from "node:test";
import assert from "node:assert";
import {
  DefenderFirewallRuleSchema,
  DefenderOutputSchema,
} from "@/types";

describe("Defender Domain Contracts", () => {
  it("validates a defender output without synthesized firewall rule", () => {
    const validOutput = {
      threat_assessment: "Prompt injection attempt detected using base64 payload.",
      sanitized_response: "I cannot assist with decoding suspicious administrative commands.",
    };

    const parsed = DefenderOutputSchema.parse(validOutput);
    assert.deepStrictEqual(parsed, validOutput);
    assert.strictEqual(parsed.synthesized_firewall_rule, undefined);
  });

  it("validates a defender output with a valid synthesized firewall rule", () => {
    const validOutput = {
      threat_assessment: "Attempted override of system boundary.",
      sanitized_response: "Standard operational query fulfilled.",
      synthesized_firewall_rule: {
        pattern: "ignore previous instructions",
        flags: "i",
        description: "Blocks direct override keywords",
      },
    };

    const parsed = DefenderOutputSchema.parse(validOutput);
    assert.deepStrictEqual(parsed, validOutput);
    assert.ok(parsed.synthesized_firewall_rule);
    assert.strictEqual(parsed.synthesized_firewall_rule.pattern, "ignore previous instructions");
    assert.strictEqual(parsed.synthesized_firewall_rule.flags, "i");
    assert.strictEqual(parsed.synthesized_firewall_rule.description, "Blocks direct override keywords");
  });

  it("validates DefenderFirewallRuleSchema standalone", () => {
    const validRule = {
      pattern: "base64",
      flags: "g",
      description: "Detects base64 patterns",
    };

    assert.deepStrictEqual(DefenderFirewallRuleSchema.parse(validRule), validRule);
  });

  it("fails when firewall rule shape is invalid", () => {
    // Missing description
    assert.throws(() =>
      DefenderOutputSchema.parse({
        threat_assessment: "Threat",
        sanitized_response: "Response",
        synthesized_firewall_rule: {
          pattern: "test",
          flags: "i",
        },
      })
    );

    // Non-string flags
    assert.throws(() =>
      DefenderOutputSchema.parse({
        threat_assessment: "Threat",
        sanitized_response: "Response",
        synthesized_firewall_rule: {
          pattern: "test",
          flags: 123,
          description: "desc",
        },
      })
    );
  });

  it("fails when required defender fields are omitted", () => {
    assert.throws(() =>
      DefenderOutputSchema.parse({
        sanitized_response: "Response only",
      })
    );

    assert.throws(() =>
      DefenderOutputSchema.parse({
        threat_assessment: "Assessment only",
      })
    );
  });
});
