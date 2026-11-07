---
name: setup
description: Checks the Figma connection, fills the 3 auditors' rule checks from the Baseline and installs the graph into Claude Code. Run when the Baseline and ia-structure are done (C2:06 E4), and again after any change to the Baseline or the skills.
---

# Setup

Turns the group's work into a running graph. The notes in `Baseline/`, `Skills/` and `Subagents/` are the source of truth: edit them in Obsidian, never the installed copies, and re-run this after every change.

## Steps

1. **Check the inputs.** The Figma MCP server answers `whoami`, the Figma file in [[Skills/ui-orchestrator]] → Settings is a link (not a `[placeholder]`) that opens with `create_session` and has a `Reference` page with the reference flow, the 3 specs in `Baseline/` have no `[placeholder]` brackets left, [[Skills/ia-structure]] has a filled `description` and no placeholders or `<!-- -->` comments, and the happy path in [[Skills/ui-orchestrator]] → Settings lists screens that have a **screen card**.
   Done when: every input passes. If any fails, list what's missing and stop here.

2. **Fill the auditors' checks.** Each note in `Subagents/` already has its shape; only the line `[Checks filled by SETUP.md: …]` under step 3 is left. Replace it with one bullet per rule that line names, taken from the Baseline: `**<rule ID>, <rule name>**: <how to find it in the Figma file>. <what counts as a violation>.` Leave the rest of each note unchanged.
   - [[Subagents/ds-linter]]: every rule in [[Baseline/DesignSystemTokens]] §4.
   - [[Subagents/ia-auditor]]: H-06, H-07, H-08 from [[Baseline/ProductRequirementsSpec]], then every rule in [[Baseline/InformationArchSpec]] §5.
   - [[Subagents/uxai-auditor]]: [[Baseline/ProductRequirementsSpec]] N-01 to N-10, plus the AI rules if §2 says the product has AI.
   Done when: no `[Checks filled by SETUP.md` line is left, and every rule from each source has a bullet.

3. **Install** for every AI tool the group might use:
   - Each `Skills/<name>.md` → both `.claude/skills/<name>/SKILL.md` (Claude Code) and `.agents/skills/<name>/SKILL.md` (Codex, Antigravity, Gemini CLI and other tools that read the Agent Skills standard): [[Skills/ia-structure]], [[Skills/ui-design]] and [[Skills/ui-orchestrator]].
   - Each `Subagents/<name>.md` → `.claude/agents/<name>.md`, with this line added to its frontmatter so it can read the vault and the Figma file but never change either: `tools: Read, Grep, Glob, mcp__figma__create_session, mcp__figma__get_metadata, mcp__figma__get_design_context, mcp__figma__get_variable_defs, mcp__figma__get_screenshot`.
   - In every installed copy, turn `[[Folder/Name]]` links into plain paths (`Folder/Name.md`).
   Done when: every skill exists in both skill folders, and 3 agent files exist, each limited to the read-only tools above.

4. **Report** a table to the group: each skill and subagent, where it was installed, and how many rule checks each auditor has. Remind them to restart their AI tool so the new skills and subagents load.
   Done when: the group has seen the table and the restart reminder.
