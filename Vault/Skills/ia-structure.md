---
name: ia-structure
# 1. TRIGGERS: what the skill does and when to use it. The Orchestrator points here with this same sentence.
description: [What it does]. Use when [when the Orchestrator needs it].
---

<!--
E3: write this skill by hand. Delete every comment when you're done.
It draws the WIREFRAME of one screen in your Figma file: sections, content and navigation, in greyscale. No styling and no extra states: that is ui-design's job.
How to draw in Figma is already handled (CLAUDE.md loads the figma-use skill). Your skill only says WHAT the screen's structure is.
Look at "A skill, pillar by pillar" in the slides for the shape.

2. STRUCTURE: an input, then ordered steps. End every step on "Done when: ..." (a check AI can verify).
   Point to sections of the IA spec with [[links]] instead of pasting their content.
3. STEERING: use the leading words from CLAUDE.md (screen card, wireframe...).
   Write rules as targets ("every area in the layout table exists"), never as bans.
4. PRUNING: for each sentence, ask "if I delete it, does the output change?" If not, delete it.

MUST-HAVES: tick every one before you test the skill.
[ ] 1. Clear trigger: the description says it draws the wireframe of one screen, used when the Orchestrator builds a screen.
[ ] 2. Screen ID in: the input is one screen ID. Everything else is read from the Baseline.
[ ] 3. Screen card: content, main action, Comes From and Back Goes To come from InformationArchSpec §2.
[ ] 4. Layout areas: every area of the screen's layout from InformationArchSpec §3, in order.
[ ] 5. Default state only: one frame named <ID>/default, with the content the screen card lists. ui-design adds the other states.
[ ] 6. Real navigation: the back control and main action are named layers that say which screen they go to, as the screen card says (e.g. "Back → DRINK").
[ ] 7. Done when: every step ends on a check AI can verify.
[ ] 8. One output: only Section <ID> on the Wireframes page of the Figma file: greyscale, auto-layout frames, no design system components or variables.
-->

# IA structure

**References:** [[Baseline/InformationArchSpec]] · [[Baseline/ProductRequirementsSpec]]

## Input

[What the skill receives, and where it comes from]

## Steps

1. [Step]
   Done when: [check]
2. [Step]
   Done when: [check]
3. [Step]
   Done when: [check]

## Output

[Exactly which file is written, and nothing else]
