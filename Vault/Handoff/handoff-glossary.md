# Handoff glossary

> [!info] Start here
> This note is the way into the handoff. It lists the happy path in order, links every screen to its spec and its Figma frame, and defines the words the specs share. A builder (a person or an AI) reads this first, then each spec in flow order.

## Flow map

- **Figma file:** [paste link]
- **Prototype:** [paste the link to the Prototype page, starting at the first screen]

| Step | Screen | Spec | Figma | Comes from | Goes to |
| --- | --- | --- | --- | --- | --- |
| 1 | [Screen name] (`[ID]`) | [[Handoff/[ID]]] | [Section [ID]](paste-link) | [start] | [[Handoff/[ID]]] |
| 2 | [Screen name] (`[ID]`) | [[Handoff/[ID]]] | [Section [ID]](paste-link) | [[Handoff/[ID]]] | [[Handoff/[ID]]] |

## Terms

Every spec uses these words the same way.

- **Screen ID**: the short name in capitals (e.g. `CART`). One ID names the screen card in [[Baseline/InformationArchSpec]] §2, the Figma Section, the state frames (`CART/empty`) and the spec file (`Handoff/CART.md`).
- **States**: `default`, `empty`, `loading`, `error`[, plus the AI states from [[Baseline/ProductRequirementsSpec]] §5, e.g. `fallback`]. Each is its own Figma frame.
- **Tokens**: the names in [[Baseline/DesignSystemTokens]] (e.g. `color/action/primary`). Specs name the token, then its value.
- **Components**: [the group's component names and what each is, e.g. **Button** (type=primary / secondary / danger): every tappable action].
- **[Product term]**: [words from your product that a builder could read two ways, e.g. "pickup time": the time the order is ready, not when it was placed].
