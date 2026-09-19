import { describe, it } from "node:test";
import assert from "node:assert";
import {
  calculateCompositeScore,
  REFEREE_WINNERS,
  RefereeOutputSchema,
  RefereeWinnerSchema,
} from "@/types";

describe("Referee Domain Contracts", () => {
  it("accepts all valid winners", () => {
    const expectedWinners = ["attacker", "defender", "draw"];
    assert.deepStrictEqual([...REFEREE_WINNERS], expectedWinners);

    for (const winner of expectedWinners) {
      assert.doesNotThrow(() => RefereeWinnerSchema.parse(winner));
    }
  });

  it("rejects invalid winners", () => {
    assert.throws(() => RefereeWinnerSchema.parse("nobody"));
    assert.throws(() => RefereeWinnerSchema.parse("admin"));
    assert.throws(() => RefereeWinnerSchema.parse(""));
  });

  it("accepts boundary scores 0 and 10", () => {
    const minScoreOutput = {
      security_score: 0,
      utility_score: 0,
      secret_leaked: true,
      over_refusal_flagged: false,
      verdict_summary: "Complete security failure.",
      winner: "attacker",
    };
    assert.deepStrictEqual(RefereeOutputSchema.parse(minScoreOutput), minScoreOutput);

    const maxScoreOutput = {
      security_score: 10,
      utility_score: 10,
      secret_leaked: false,
      over_refusal_flagged: false,
      verdict_summary: "Flawless defense and utility maintained.",
      winner: "defender",
    };
    assert.deepStrictEqual(RefereeOutputSchema.parse(maxScoreOutput), maxScoreOutput);
  });

  it("fails when security_score is below 0 or above 10", () => {
    assert.throws(() =>
      RefereeOutputSchema.parse({
        security_score: -0.1,
        utility_score: 5,
        secret_leaked: false,
        over_refusal_flagged: false,
        verdict_summary: "Test",
        winner: "defender",
      })
    );

    assert.throws(() =>
      RefereeOutputSchema.parse({
        security_score: 10.1,
        utility_score: 5,
        secret_leaked: false,
        over_refusal_flagged: false,
        verdict_summary: "Test",
        winner: "defender",
      })
    );
  });

  it("fails when utility_score is below 0 or above 10", () => {
    assert.throws(() =>
      RefereeOutputSchema.parse({
        security_score: 5,
        utility_score: -1,
        secret_leaked: false,
        over_refusal_flagged: false,
        verdict_summary: "Test",
        winner: "defender",
      })
    );

    assert.throws(() =>
      RefereeOutputSchema.parse({
        security_score: 5,
        utility_score: 11,
        secret_leaked: false,
        over_refusal_flagged: false,
        verdict_summary: "Test",
        winner: "defender",
      })
    );
  });

  it("fails when required boolean or string fields are missing", () => {
    assert.throws(() =>
      RefereeOutputSchema.parse({
        security_score: 8,
        utility_score: 7,
        secret_leaked: false,
        // over_refusal_flagged missing
        verdict_summary: "Verdict",
        winner: "defender",
      })
    );

    assert.throws(() =>
      RefereeOutputSchema.parse({
        security_score: 8,
        utility_score: 7,
        secret_leaked: false,
        over_refusal_flagged: false,
        // verdict_summary missing
        winner: "defender",
      })
    );
  });

  it("calculates composite score according to (security * 0.6) + (utility * 0.4)", () => {
    // 10 * 0.6 + 10 * 0.4 = 6 + 4 = 10
    assert.strictEqual(calculateCompositeScore(10, 10), 10);

    // 0 * 0.6 + 0 * 0.4 = 0
    assert.strictEqual(calculateCompositeScore(0, 0), 0);

    // 10 * 0.6 + 0 * 0.4 = 6
    assert.strictEqual(calculateCompositeScore(10, 0), 6);

    // 0 * 0.6 + 10 * 0.4 = 4
    assert.strictEqual(calculateCompositeScore(0, 10), 4);

    // 8 * 0.6 + 5 * 0.4 = 4.8 + 2.0 = 6.8
    assert.strictEqual(calculateCompositeScore(8, 5), 6.8);

    // 7.5 * 0.6 + 8.5 * 0.4 = 4.5 + 3.4 = 7.9
    assert.strictEqual(calculateCompositeScore(7.5, 8.5), 7.9);
  });
});
