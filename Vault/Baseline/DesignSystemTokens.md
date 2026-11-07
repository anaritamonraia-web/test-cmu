# [Project Name] - Exercise [N]: Design System Tokens Spec (`DesignSystemTokens.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file documents the **Figma variables, styles and components** of the product's design system: colors, typography, spacing and ready-made components. The Figma file is the source of truth; this file explains what each variable and component is for. It is enforced strictly.

**How an LLM should use this file**

1. Treat the variables in sections 1 and 2 and the components in section 3 as the **only allowed styling vocabulary**.
2. The `ui-design` skill styles screens by binding these variables and using these components; the `ds-linter` subagent checks every screen against them.
3. **Token binding**: every fill, stroke, text style, spacing value and radius in a screen is bound to a variable or style in sections 1 and 2, and every button, card, input and badge is an instance of a section 3 component.
4. The guardrails in section 4 override any other interpretation of this file.

*(If your group already has a token document, paste it here and keep sections 1–4. Otherwise ask your AI to read your Figma file's variables (`get_variable_defs`) and fill the tables, then add the "Usage" column yourselves. The rows below are examples.)*

---

## 1. Color Variables

| Token Name | Figma Variable | Value (Light / Dark) | Usage / Boundary |
| --- | --- | --- | --- |
| **Surface Background** | `color/bg/surface` | `#FFFFFF` / `#0F172A` | Main application background |
| **Card / Container BG** | `color/bg/card` | `#F8FAFC` / `#1E293B` | Cards, modals, side panels |
| **Border Subtle** | `color/border/subtle` | `#E2E8F0` / `#334155` | Card borders, dividers |
| **Primary Action** | `color/action/primary` | `#2563EB` | Main CTA buttons, active tab indicators |
| **Secondary Action** | `color/action/secondary` | `#E2E8F0` / `#334155` | Secondary buttons, filter pills |
| **Success** | `color/feedback/success` | `#10B981` | Confirmed, verified state |
| **Warning / AI Thinking** | `color/feedback/warning` | `#F59E0B` | AI reasoning, pending confirmation |
| **Danger / Error** | `color/feedback/danger` | `#DC2626` | Destructive actions, error alerts |
| **AI Accent** | `color/feedback/ai` | `#06B6D4` | AI suggestions, streaming output |
| **Text Primary** | `color/text/primary` | `#0F172A` / `#F1F5F9` | Headings, primary labels |
| **Text Secondary** | `color/text/secondary` | `#64748B` / `#94A3B8` | Subtitles, meta info |

---

## 2. Typography & Spacing

### 2.1 Text Styles

| Style | Figma Text Style | Font / Size / Weight | Usage |
| --- | --- | --- | --- |
| **H1** | `heading/h1` | Inter / 24 / Bold | Screen titles |
| **H2** | `heading/h2` | Inter / 18 / Semi Bold | Section titles |
| **Body** | `body/default` | Inter / 14 / Regular | Body text |
| **Caption** | `body/caption` | Inter / 12 / Medium | Labels, badges, meta info |

### 2.2 Spacing & Radius Variables

| Token Name | Figma Variable | Value | Usage |
| --- | --- | --- | --- |
| **Screen Padding** | `space/6` | 24 | Main screen padding |
| **Card Padding / Gap** | `space/4` | 16 | Card padding, gaps between items |
| **Tight Gap** | `space/2` | 8 | Inside buttons, badges |
| **Component Radius** | `radius/md` | 8 | Buttons, cards, inputs |
| **Badge Radius** | `radius/full` | 999 | Badges, pills |

---

## 3. Components

| Component | Variants | Usage |
| --- | --- | --- |
| **`Button`** | `type=primary / secondary / danger`, `state=default / hover / disabled` | Every tappable action |
| **`Card`** | `type=default / selected` | Items, containers |
| **`Input`** | `state=default / focus / error` | Every text field |
| **`Badge`** | `type=success / ai-thinking / error` | Status indicators |

---

## 4. Design System Guardrails (Linter Rules)

Each rule is phrased as the target, with a yes/no check the `ds-linter` can run on the Figma file. Severity uses the same scale as the Product Requirements rules library (`high`, `medium`, `low`).

| ID | Rule | Check | Severity |
| --- | --- | --- | --- |
| DS-01 | Colors are variables | Is every fill and stroke bound to a section 1 variable? Fails on any unbound color. | high |
| DS-02 | Text uses text styles | Does every text layer use a section 2.1 text style? Fails on local font settings. | medium |
| DS-03 | Spacing is on-scale | Is every auto-layout padding, gap and corner radius bound to a section 2.2 variable? Fails on unbound numbers. | medium |
| DS-04 | Components are instances | Is every button, card, input and badge an instance of a section 3 component? Fails on detached or hand-drawn copies. | medium |
