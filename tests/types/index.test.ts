import { describe, it } from "node:test";
import assert from "node:assert";
import * as Types from "@/types";

describe("Types Barrel Exports", () => {
  it("exports all schemas and helpers from @/types", () => {
    // Attacker
    assert.ok(Types.ATTACKER_TACTICS);
    assert.ok(Types.AttackerTacticSchema);
    assert.ok(Types.TARGET_SURFACES);
    assert.ok(Types.TargetSurfaceSchema);
    assert.ok(Types.AttackerOutputSchema);

    // Defender
    assert.ok(Types.DefenderFirewallRuleSchema);
    assert.ok(Types.DefenderOutputSchema);

    // Referee
    assert.ok(Types.REFEREE_WINNERS);
    assert.ok(Types.RefereeWinnerSchema);
    assert.ok(Types.RefereeOutputSchema);
    assert.strictEqual(typeof Types.calculateCompositeScore, "function");

    // Firewall
    assert.ok(Types.FirewallRuleSchema);
    assert.ok(Types.FirewallEvaluationSchema);

    // Memory
    assert.ok(Types.AttackerMemoryEntrySchema);
    assert.ok(Types.DefenderMemoryEntrySchema);

    // RAG
    assert.ok(Types.RAG_CHUNK_STATUSES);
    assert.ok(Types.RagChunkStatusSchema);
    assert.ok(Types.RagChunkSchema);

    // Arena
    assert.ok(Types.ArenaMatchSchema);
    assert.ok(Types.ArenaRoundSchema);
  });
});
