# [Project Name] - C2:06: Design Reference (`DesignReference.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file records the **design decisions** the group took from its style proposal: which colors, typography and patterns the product uses, where each one goes, and why. The Figma file is the source of truth for values; this file explains the decisions behind them.

**How an LLM should use this file**

1. The decisions in §1 Colors, §2 Typography and §3 Patterns are the **only allowed styling vocabulary**.
2. The **anchor screen** linked in §0 is the worked example of these decisions applied: when this file and the anchor disagree, follow the anchor.
3. Every decision has a **Where** (when to use it) and a **Why** (the reason behind it). When a new screen meets a situation no decision covers, choose the option that best serves the Why column, and flag it.
4. The checks in §4 are how a finished screen is judged.

> [!info] Who fills what
> 1. **Group:** fill §0 by hand (links to your style proposal and your anchor screen).
> 2. **AI:** ask your AI to analyse the style proposal and the anchor screen in §0 (`get_design_context`, `get_variable_defs`, `get_screenshot`) and draft §1–3: every color, text style and recurring pattern it finds, with where it's used. The rows below are examples: replace them.
> 3. **Group:** go through every row together and decide: keep it, change it or remove it. Then write the **Why** column yourselves, using your feelings from [[Baseline/C2-05/AestheticsEmotionalSpec]]: the AI can read what's there, only you know why you chose it.

---

## 0. Source

| What | Figma link | Notes |
| --- | --- | --- |
| **Style proposal** (your design system / visual direction) | [CMU-Pets](https://www.figma.com/design/0gB0Yp1N8C2HQyP6BYy326/CMU-Pets?node-id=208-969) | Node 208-969 in the CMU-Pets file |
| **Anchor screen** (reworked by hand in E1) | [Add figma link here] | Frame name on the `Anchor` page |
| **As-is screens** (C2:05 POC-final) | [Add figma link here] | `Reference` page |

---

## 1. Colors

| Role | Figma Variable | Value | Where | Why |
| --- | --- | --- | --- | --- |
| **Background** | `color/bg/surface` | `#FFFFFF` | Every screen background | Calm, uncluttered: lets content lead |
| **Surface** | `color/bg/card` | `#F8FAFC` | Cards, sheets, panels | Groups related content without borders |
| **Primary action** | `color/action/primary` | `#2563EB` | The one main action per screen | Users always know the next step |
| **AI accent** | `color/feedback/ai` | `#06B6D4` | Anything the AI writes or suggests | AI output is always recognisable as AI |
| **Error** | `color/feedback/danger` | `#DC2626` | Errors and destructive actions only | Red keeps its meaning: never decorative |
| **Text primary** | `color/text/primary` | `#0F172A` | Titles, body text | Contrast and readability |
| **Text secondary** | `color/text/secondary` | `#64748B` | Meta info, hints | Supports without competing |

**Color decisions** (one sentence each):
- e.g. *One accent color per screen: the primary action.*
- e.g. *No gradients: the product should feel trustworthy, not playful.*

---

## 2. Typography

| Style | Figma Text Style | Font / Size / Weight | Where | Why |
| --- | --- | --- | --- | --- |
| **Title** | `heading/h1` | Inter / 24 / Bold | One per screen, top | Users know where they are at a glance |
| **Section** | `heading/h2` | Inter / 18 / Semi Bold | Section headers | Scannable structure |
| **Body** | `body/default` | Inter / 14 / Regular | All running text | Readable at length |
| **Caption** | `body/caption` | Inter / 12 / Medium | Labels, badges, meta info | Secondary info stays secondary |

**Typography decisions** (one sentence each):
- e.g. *One typeface for the whole product; hierarchy comes from size and weight.*
- e.g. *Sentence case everywhere, including buttons.*

---

## 3. Patterns

How colors, typography and components combine on a screen, read from the style proposal and the anchor. One row per pattern; add as many as you find.

| Pattern | How it's built | Where | Why |
| --- | --- | --- | --- |
| **Screen frame** | Vertical auto-layout, 24 padding, background color | Every screen | Same rhythm on every screen |
| **Header** | Title + caption subtitle in text secondary, 8 gap | Top of every screen | Orientation first |
| **Item list** | `Card` instances stacked, 16 gap | Any list of 2+ items | Each item reads as one unit |
| **Primary action** | One `Button type=primary`, full width, bottom | The main next step | One clear way forward |
| **AI output** | AI accent + `Badge type=ai-thinking` while generating | Anything the AI writes | Users can tell AI from their own content |

---

## 4. Checks

Each check is a yes/no question to ask of a finished screen.

| ID | Check | Severity |
| --- | --- | --- |
| DR-01 | Is every color one of the §1 roles, bound to its Figma variable and used where §1 says? | high |
| DR-02 | Does every text layer use a §2 text style, used where §2 says? | medium |
| DR-03 | Does the screen use the §3 patterns for its layout, hierarchy and actions? | medium |
| DR-04 | Could the screen sit next to the anchor screen as part of the same product? | medium |
