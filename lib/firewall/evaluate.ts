import type { FirewallRule, FirewallEvaluation } from "@/types";

export const evaluateFirewall = (
  payload: string,
  rule: FirewallRule,
): boolean => {
  try {
    const regex = new RegExp(rule.pattern, rule.flags);
    return regex.test(payload);
  } catch (error) {
    console.error("Invalid firewall regex:", error);
    return false;
  }
};

export const evaluateFirewallRules = (
  payload: string,
  rules: FirewallRule[],
): FirewallEvaluation => {
  for (const rule of rules) {
    if (evaluateFirewall(payload, rule)) {
      return {
        blocked: true,
        triggeredRuleId: rule.id,
        ruleDescription: rule.description,
      };
    }
  }
  return {
    blocked: false,
    triggeredRuleId: null,
    ruleDescription: null,
  };
};

export const validateFirewallRule = (rule: FirewallRule): boolean => {
  try {
    new RegExp(rule.pattern, rule.flags);
    return true;
  } catch {
    return false;
  }
};
