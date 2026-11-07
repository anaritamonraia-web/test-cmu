# [ID]: [Screen name]

> [!info] Screen at a glance
> - **Screen ID:** `[ID]`, the same ID as its screen card, its Figma Section and its file name.
> - **Screen card:** [[Baseline/InformationArchSpec]] §2, "Screen: [Screen name] ([ID])". Goal, main action and content live there; this spec doesn't repeat them.
> - **Figma:** [Section [ID] on the Screens page](paste-link) · [Prototype](paste-link)
> - **Flow:** [[Handoff/handoff-glossary]] → step [n] of the happy path. Comes from [[Handoff/[ID]]] · goes to [[Handoff/[ID]]]

## 1. Overview

[What this screen is for and the moment the user is in, in 2–3 sentences. Who arrives here, from where, and what they want to get done.]

## 2. Layout

[The areas from top to bottom, from [[Baseline/InformationArchSpec]] §3. Frame size, what scrolls and what stays pinned, what changes on a bigger screen.]

> [!tip] Why
> [The layout decision a builder must not undo, and why.]

## 3. Design tokens

Only the tokens this screen uses. Names come from [[Baseline/DesignSystemTokens]]; the value is there so nobody has to look it up.

| Token | Value | Used for |
| --- | --- | --- |
| `[color/action/primary]` | [#2563EB] | [Main button] |
| `[space/4]` | [16] | [Screen padding] |
| `[heading/h1]` | [Inter 24 Bold] | [Screen title] |

## 4. Components

| Component | Variant | Content | Notes |
| --- | --- | --- | --- |
| [Button] | [type=primary] | ["Checkout"] | [Full width, pinned to the bottom] |

## 5. States & interactions

### States

One row per state frame in Figma (`[ID]/<state>`).

| State | Figma frame | What the user sees |
| --- | --- | --- |
| default | [[ID]/default](paste-link) | [Description] |
| empty | [[ID]/empty](paste-link) | [Description] |
| loading | [[ID]/loading](paste-link) | [Description] |
| error | [[ID]/error](paste-link) | [Description] |
| [AI state, e.g. fallback] | [[ID]/fallback](paste-link) | [Description] |

### Sample data

The exact data each state shows. Build with this data, never with lorem ipsum.

**default**

| [Field] | [Field] | [Field] |
| --- | --- | --- |
| [Value] | [Value] | [Value] |

**empty**: [What is zero or missing]
**error**: [The exact error message and what caused it]

### Interactions and navigation

| Element | Trigger | What happens | Goes to |
| --- | --- | --- | --- |
| [Main action] | Tap | [Behaviour, including loading feedback] | [[Handoff/[ID]]] |
| [Back] | Tap | [Behaviour] | [[Handoff/[ID]]] |

## 6. Edge cases

- **Very long content**: [e.g. a 60-character name: wraps to 2 lines, then "…"]
- **Lots of items**: [e.g. 30 items: the list scrolls, the total stays visible]
- **Slow connection**: [What the user sees after 3 seconds, and after 10]
- **Missing data**: [e.g. no image: show the placeholder]
- **[Screen-specific case]**: [What happens]

## 7. Animation & motion

| What moves | Trigger | Animation | Duration / easing |
| --- | --- | --- | --- |
| [Screen] | [Arrives from [ID]] | [Slide in from right, as in the Figma prototype] | [300 ms ease-out] |
| [Loading blocks] | [Loading state] | [Pulse] | [1.5 s loop] |

[If the user has *reduce motion* on: what happens instead.]

## 8. Accessibility

- **Focus order**: [First → last]
- **Labels**: [Controls that need a spoken label, e.g. icon buttons]
- **Announcements**: [What a screen reader says when the state changes]
- **Contrast and touch targets**: [Anything that needs checking, e.g. muted text on the card colour]

## Open questions

> [!question] Still undecided
> Anything the group couldn't answer while being grilled. A builder reads these as "ask before guessing".
> - [Question]: [who decides, by when]
