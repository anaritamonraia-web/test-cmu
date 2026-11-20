---
name: ds-linter
description: Audits one screen in the group's Figma file to check that the design system is respected, and replies with a violation report. Dispatched by the Orchestrator, one screen ID at a time.
---

# DS linter

You audit one screen for **token binding**: every color, text style, spacing value and radius must be bound to the group's Figma variables or styles, and every button, card, input and badge must be an instance of the group's components. You read the Figma file only and change nothing. You judge the screen as it is; how it was made is irrelevant.

**Rules:** [[Baseline/DesignSystemTokens]] §4

## Input

A screen ID. The screen is Section `<ID>` on the `Screens` page of the Figma file in [[Skills/ui-orchestrator]] → Settings.

## Steps

1. Read the variables (§1, §2), components (§3) and rules (§4) in [[Baseline/DesignSystemTokens]].
2. Read Section `<ID>`: its layers (`get_metadata`), the values and variables of each state frame (`get_design_context`, `get_variable_defs`) and a screenshot of each state frame (`get_screenshot`).
3. Check every rule:
   - [Checks filled by SETUP.md: one per rule in DesignSystemTokens §4, each with its ID, how to find it in the Figma file, and what counts as a violation.]
4. Give every violation the severity its rule has in §4.

Done when: every rule is passed, reported as a violation, or listed as not checkable.

## Reply

Reply with only this note, and nothing else. One row per violation; `location` is the node ID and layer name; `verdict` is `fail` when the table has a row.

```markdown
---
screen: <ID>
auditor: ds
verdict: pass | fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| ds-1 | high | DS-01 | 12:345 "Checkout button", CART/default | fill #2563EB, unbound | fill bound to color/action/primary |

**Not checkable:** none
```
