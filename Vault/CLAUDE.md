# AI for Design vault

This vault is a group's workspace for generating UI. Every part of the system is a markdown note: `[[Folder/Name]]` means the file `Folder/Name.md` in this vault. The screens themselves are drawn in the group's Figma file.

## When to read what

- **"Run the graph" / "Build screen HOME" / "Fix …" / "Assemble the flow"**: use the `ui-orchestrator` skill ([[Skills/ui-orchestrator]]).
- **"Follow SETUP.md"**: follow [[SETUP]].
- **Handoff (C3:01)**: follow [[Handoff/Handoff prompt]]: `/grill-me` to gather what's missing, then `/design-handoff` (Anthropic's `design` plugin) to write `Handoff/<ID>.md` from [[Handoff/_Spec template]]. [[Handoff/handoff-glossary]] is the way in: the flow map and shared terms. [[Handoff/Example/CART]] is a finished spec.
- **Building another group's flow (C3:01 E2)**: follow [[Handoff/Builder brief]].

## Figma

- **The file** is the link in [[Skills/ui-orchestrator]] → Settings. Start every Figma task with `create_session` on that file.
- **Before any `use_figma` call**, load the `figma-use` skill.
- **Pages**: `Reference` (the C2:05 final POC, rebuilt as-is in C2:05 E5 and made DS-compliant in C2:06 E2; from then on it is the visual ground truth: compare new screens against it and leave it unchanged), `Wireframes` (one Section per screen, by `ia-structure`), `Screens` (one Section per screen, one frame per state, by `ui-design`), `Prototype` (the assembled happy path). Create a page the first time it's needed.
- **Names**: a screen is Section `<ID>`; its state frames are `<ID>/<state>` (e.g. `CART/empty`).
- **The group's variables, styles and components** are the only styling vocabulary. [[Baseline/DesignSystemTokens]] documents them.

## Baseline

- [[Baseline/DesignSystemTokens]]: read when styling a screen or auditing its styling.
- [[Baseline/InformationArchSpec]]: read when deciding a screen's structure, content, navigation or states.
- [[Baseline/ProductRequirementsSpec]]: read for flows, AI behaviour, and the rules library (§7).
- `Baseline/C2-05/`: the group's C2:05 work: mechanics (`StructureIdea`), competitive analysis (`CompetitiveAnalysis`), behaviour spectrums (`BehaviourSpectrum`), feelings (`AestheticsEmotionalSpec`) and POCs (`POC/`, HTML).

## Leading words

Use these terms the same way in every note:

- **screen card**: a screen's entry in [[Baseline/InformationArchSpec]] §2.
- **wireframe**: a screen's structure only (sections, content, navigation) in greyscale, with no design system styling: Section `<ID>` on the `Wireframes` page.
- **token binding**: every fill, stroke, text style, spacing value and radius is bound to one of the group's Figma variables or styles, and every button, card, input and badge is an instance of one of the group's components.
- **fallback state**: what the user sees when the AI has low confidence or fails (PR rule H-04).
- **violation**: one failed rule, written as a table row: `id | severity | rule | location | found | expected`, where `location` is a node ID and layer name.
