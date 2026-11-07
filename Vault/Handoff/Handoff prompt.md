# Handoff prompt (E1)

Two skills, used together: **grill-me** (Matt Pocock) makes sure every piece of information is there, and **design-handoff** (Anthropic, `design` plugin) writes it into the template. Open your AI tool in this vault, switch it to **plan mode**, and paste the box below. Change the happy path to yours.

```
Use /grill-me to interview us about our happy path: [HOME, MENU, DRINK, CART].

Goal: a handoff spec per screen, Handoff/<ID>.md, that follows Handoff/_Spec template.md
(see Handoff/Example/CART.md for a finished one). Someone who has only these files,
the vault and a view of our Figma file must be able to build the screens without guessing.

Read first: Baseline/InformationArchSpec.md (screen cards, layout, states),
Baseline/DesignSystemTokens.md, Baseline/ProductRequirementsSpec.md §5,
and our Figma file (link in Skills/ui-orchestrator.md → Settings):
the Screens page (one Section per screen, one frame per state) and the Prototype page.

1. Grill us once for the whole flow, one question at a time: first what every screen
   shares (tokens, components, motion, accessibility, product terms), then each screen
   in flow order, template section by template section. Ask only what the vault and
   Figma don't already answer.
2. When every section of the template can be filled, show us the plan and wait.
3. Then use /design-handoff to write one Handoff/<ID>.md per screen from the template,
   our answers and the Figma file. Link every state to its Figma frame.
4. Fill Handoff/handoff-glossary.md: the flow map in order, with each spec and Figma
   link, and the terms the specs share.

Anything we couldn't answer goes into that spec's Open questions, never into the spec
as a guess.
```

> [!tip] Before you start
> - Installed? *grill-me*: `claude plugin install mattpocock-skills@claude-plugins-official`. *design-handoff*: `claude plugin marketplace add anthropics/knowledge-work-plugins`, then `claude plugin install design@knowledge-work-plugins`. Restart your AI tool after installing.
> - Plan mode in Claude Code: press `Shift+Tab` until it says *plan mode*.
