# AI for Design Vault: C2:05, C2:06 and C3:01

This vault is your group's workspace for C2:05, C2:06 and C3:01. You install it at the start of C2:05 and keep working in it until your handoff in C3:01. Everything in it is a markdown note: you read and edit it in **Obsidian**, and **Claude Code** (opened in this same folder) reads the same notes and runs them. Nothing important lives in a chat history.

**Claude is your Orchestrator.** The `ui-orchestrator` skill is its job description: the graph steps, how to analyse the auditors' reports, how to fix and how to assemble the flow. **You** decide what gets fixed and when a screen is approved.

## How the vault is organized

| Folder | What's in it | Who fills it |
| --- | --- | --- |
| `Baseline/` | The source of truth: your 3 specs (`DesignSystemTokens`, which documents your Figma variables and components, `InformationArchSpec`, `ProductRequirementsSpec`, ready to fill), `C2-05/` (your C2:05 work, filled in that class from the templates already there) | You (C2:05, then C2:06 E1–E2) |
| `Skills/` | `ia-structure` draws the **wireframe** in Figma (sections, content, navigation), `ui-design` styles it with your Figma variables and components and adds every state, `ui-orchestrator` runs the graph. | `ia-structure`: you, by hand (E3). `ui-design`: ready to use, it reads your Baseline. `ui-orchestrator`: ready to use, you only set your Figma link (C2:05 E0) and happy path (C2:06 E4) |
| `Subagents/` | The 3 read-only auditors, already in shape (they read your Figma file and change nothing): `ds-linter` (design system respected?), `ia-auditor` (IA respected?), `uxai-auditor` (heuristics respected?) | `SETUP.md` fills their rule checks from your Baseline (E4) |
| `Notes/` | What the work produces in the vault: `Reports/` (the 3 audit reports and the Orchestrator's summary per screen) and `Flow summary.md`. The screens themselves live in your Figma file | The graph, and you |
| `Handoff/` | Your handoff for developers, future design work and AI: `handoff-glossary` (the way in: flow map and shared terms), one spec per screen, the spec template, the handoff prompt, the builder brief and a finished example (`Example/CART`) | You (C3:01), with `grill-me` and `design-handoff` |

At the root:

- `CLAUDE.md`: what Claude reads first in this vault: where everything is and the leading words every note shares.
- `SETUP.md`: checks your Figma connection, fills the auditors' checks from your Baseline and installs the graph into Claude Code. Run it in C2:06 E4, after you've written `ia-structure`, and again after any change.
- `README.md`: this note.

Open Obsidian's **graph view**: the links between these notes draw the UI generation graph.

## C2:05

- **E0 Install**: install Obsidian and Claude Code, open this folder as a vault, open a terminal in it and run `claude`. Then connect the **Figma MCP server** (skip if you already have it): in a terminal run `claude mcp add --transport http figma https://mcp.figma.com/mcp`, start `claude`, type `/mcp` and log in to Figma. Paste your group's Figma file link into `Skills/ui-orchestrator.md` → Settings.
- **E1–E4**: fill the templates in `Baseline/C2-05/` (`StructureIdea`, `CompetitiveAnalysis`, `BehaviourSpectrum`, `AestheticsEmotionalSpec`) and save your sketch photos there too. In `CompetitiveAnalysis`, AI audits the 4 competitors you pick, and you write a SWOT for each one.
- **E5 Proof of concept**: run the prompt in `Baseline/C2-05/POC prompt.md`. Your POCs land in `Baseline/C2-05/POC/`. Last, ask AI to rebuild `POC-final.html` as-is on the `Reference` page of your Figma file (prompt in the same note).

## C2:06

- **E1 Documentation**: fill the 3 specs in `Baseline/`. For `DesignSystemTokens`, paste your token document; it must match the variables and components in your Figma file.
- **E2 Reference screen**: with your AI, bring your design system into the flow you rebuilt on the `Reference` page in C2:05: bind your variables and swap in your components until it is DS-compliant, and rename each screen frame to its screen ID from `InformationArchSpec`.
- **E3 Write `ia-structure`**: fill `Skills/ia-structure.md` by hand, following the guide inside it. Wireframe only: greyscale, default state, no styling.
- **E4 Setup and first run**: set your happy path in `Skills/ui-orchestrator.md` → Settings, *"Follow SETUP.md"*, restart Claude Code, and read `Skills/ui-design.md` and one auditor against the 4 pillars. Then *"Run the graph for HOME"*, look at the `Wireframes` and `Screens` pages in Figma and read the reports in `Notes/Reports/`.
- **E5 Happy path**: *"Run the graph"*, read each summary and ask for the fixes you want. When you're happy, *"Assemble the flow"*: your clickable prototype ends up on the `Prototype` page in Figma.

To start a screen over, delete its Section `<ID>` on the `Wireframes` and `Screens` pages in Figma, and its notes in `Notes/Reports/`.

## C3:01: Handoff

Your handoff is one spec per screen of your happy path (`Handoff/<ID>.md`, from `Handoff/_Spec template.md`) plus `Handoff/handoff-glossary.md`, which lists the flow in order and links every spec to its Figma frame. Open `Handoff/Example/CART.md` to see a finished spec.

- **Setup**: install `grill-me` (`claude plugin install mattpocock-skills@claude-plugins-official`) and Anthropic's `design` plugin (`claude plugin marketplace add anthropics/knowledge-work-plugins`, then `claude plugin install design@knowledge-work-plugins`), restart your AI tool and check the Figma MCP still answers.
- **E1 Document your happy path**: in plan mode, paste the prompt in `Handoff/Handoff prompt.md`. `grill-me` interviews you until every section can be filled, then `design-handoff` writes each spec and the glossary.
- **E2 Red team**: zip this vault and share it, with a view link to your Figma file, with the group that builds your flow (A→B→C→A). Then build the next group's flow following `Handoff/Builder brief.md`.
- **E3 Present**: click through the prototype you built, show your log, and hear the authors' feedback.
- **After class**: fix the gaps the builders found in your specs.
