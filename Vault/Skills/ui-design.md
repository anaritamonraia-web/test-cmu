---
name: ui-design
description: Styles a screen's wireframe built by ia-structure with the group's Figma variables and components, adding every state, and keeps its structure exactly as it is. Use right after ia-structure, for one screen ID.
---

# UI design

You turn a **wireframe** into a styled screen in the group's Figma file. Every visual decision comes from the group's design system, and the sections, content and navigation stay exactly as `ia-structure` built them.

**References:** [[Baseline/DesignSystemTokens]] · [[Baseline/ProductRequirementsSpec]] §5 · [[Baseline/InformationArchSpec]] §4 · [[Baseline/C2-05/CompetitiveAnalysis]] §4 · the `Reference` page in the Figma file

## Input

A screen ID. The wireframe is Section `<ID>` on the `Wireframes` page of the Figma file in [[Skills/ui-orchestrator]] → Settings.

## Steps

1. **Study the reference.** Read the wireframe, then the `Reference` page (screenshot and design context): it shows what correct styling looks like for this product.
   Done when: you can name the reference's layout grid, type hierarchy and the components it uses.
2. **Copy the wireframe.** Duplicate Section `<ID>` onto the `Screens` page, keeping its name and layer names.
   Done when: Section `<ID>` exists on `Screens` with the same frames and layers as the wireframe.
3. **Bind every value to a variable.** Fills, strokes, text styles, spacing and radius use the group's Figma variables and styles, and buttons, cards, inputs and badges are instances of the group's components ([[Baseline/DesignSystemTokens]] documents both) (**token binding**).
   Done when: no fill, stroke, text, spacing or radius value in the Section is unbound, and every button, card, input and badge is a component instance.
4. **Draw every state.** Next to `<ID>/default`, add one frame per state: empty, loading, error, and each AI state in [[Baseline/ProductRequirementsSpec]] §5, including the **fallback state**. Name them `<ID>/<state>` and use the feedback variables for each.
   Done when: every state in InformationArchSpec §4 and PR §5 has its own frame, and a user can tell them apart at a glance.
5. **Apply the competitor lessons.** Use the opportunity gap from [[Baseline/C2-05/CompetitiveAnalysis]] §4, and solve the friction it lists where the screen meets the same situation.
   Done when: you can point to where the screen applies each lesson.
6. **Match the reference.** Compare a screenshot of the styled screen with the `Reference` page: same spacing rhythm, type hierarchy and component look.
   Done when: the screen would sit next to the reference as part of the same product.

## Output

Section `<ID>` on the `Screens` page: one styled frame per state, named `<ID>/<state>`, with the same sections, content and navigation as the wireframe. The wireframe stays unchanged.
