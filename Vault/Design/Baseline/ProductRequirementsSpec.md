# [Project Name] - Exercise [N]: Product Requirements Spec (`ProductRequirementsSpec.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file documents **what the product must do and the rules it must follow**. Sections 1 to 6 are filled in per product. Section 7 is a **fixed rules library** used to audit the product, and must not be edited per product.

**How an LLM should use this file**

1. Treat sections 1 to 4 as the source of truth for the product's problem, scope, data and flows.
2. Flows and screens are referenced by ID. Screen IDs must match the sitemap in the linked Information Architecture file.
3. Skip section 5 and every rule tagged `ai` in section 7 if section 2 says the product has no AI features.
4. When auditing, use section 7 and follow the reporting format in section 8.

*(Replace every `[ ... ]`. Delete anything that doesn't apply. File encoding: UTF-8. Use plain ASCII characters where possible.)*

- **Version**: [Version]
- **Owner**: [Owner]
- **Last updated**: [Date]
- **Linked IA Sitemap**: [File name of the Information Architecture spec]

---

## 1. Problem and Goal

- **Product Name**: [Product name]
- **Problem (the friction users have today)**: [Describe the specific obstacle or frustration]
- **Goal (what the user wants to achieve, and how the product helps)**: [Describe the target outcome]
- **Target Users (role, expertise level, how much data they handle)**: [Describe the users]
- **Success Looks Like (measurable)**: [Measurable outcome]

---

## 2. Scope

- **In Scope**: [Item 1], [Item 2], [Item 3]
- **Out of Scope**: [Item 1], [Item 2]
- **Platforms**: [Web desktop / Web mobile / iOS / Android (delete those not needed)]
- **Accessibility Target**: [e.g., WCAG 2.2 AA]
- **Does This Product Include AI Features?**: [Yes / No]
  - If No, skip section 5 and ignore rules tagged `ai` in section 7.

---

## 3. Key Data

List the main things users see or manage.

| Object | What It Is | Key Fields Users See | Who Can Change It |
| --- | --- | --- | --- |
| [Object] | [Description] | [Fields] | [Role] |

---

## 4. Flows

*(Copy this block once per flow. Give each flow an ID: F1, F2, ... Describe only what the user sees and does. Leave out backend steps.)*

### Flow [F#]: [Flow name]

- **Starts When**: [Trigger]
- **Starts on Screen (ID)**: [Screen ID]
- **User Does**: [Inputs, choices, button presses]
- **Steps (user-visible)**:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- **Success Result the User Sees**: [Result] (screen ID: [Screen ID])
- **Can the User Undo or Cancel?**: [Answer]
- **High-Risk Step Needing Confirmation?**: [Step, or "None"]
- **What If It Fails?**: [What the user sees and how they recover]
- **What If There Is No Data Yet?**: [What the user sees]

---

## 5. AI Behavior (Only if Section 2 Says Yes)

Describe each state for this product. The required states are defined once in section 7 (H-01 to H-04).

| State | What the User Sees in This Product |
| --- | --- |
| Idle | [Description] |
| Thinking | [Description] |
| Streaming | [Description] |
| Fallback / Low confidence / Offline | [Description] |

- **What the AI Can Do on Its Own**: [Actions]
- **What the AI Only Suggests (user must confirm)**: [Actions]
- **What the AI Must Never Do**: [Actions]
- **How Confidence Is Shown**: [Description]
- **How the User Turns AI Help Off or Dismisses It**: [Description]

---

## 6. Open Questions

- [Question 1]
- [Question 2]

---

## 7. Rules Library (Fixed)

Each rule has an ID, a yes/no check, a severity (`high`, `medium`, `low`) and a tag.

- Tag `all` = applies to every screen. Tag `ai` = applies only to screens with AI features.
- Source: **N** = Nielsen's 10 usability heuristics, **G** = Amershi et al. 2019 guidelines for human-AI interaction, **H** = house rule (not from a paper).

### 7.1 Usability (Nielsen)

| ID | Rule | Check | Severity | Tag |
| --- | --- | --- | --- | --- |
| N-01 | Visibility of system status | Does the screen show feedback for loading, progress and state changes? | high | all |
| N-02 | Match with the real world | Are labels in user language, with no internal or database terms? | medium | all |
| N-03 | User control and freedom | Can the user cancel, undo or exit every unwanted state in one step? | high | all |
| N-04 | Consistency and standards | Are the same words and controls used for the same things across screens? | medium | all |
| N-05 | Error prevention | Are destructive actions confirmed, and invalid inputs blocked or flagged early? | high | all |
| N-06 | Recognition over recall | Is needed information visible, so users don't have to remember it? | medium | all |
| N-07 | Flexibility and efficiency | Are there shortcuts or defaults for frequent tasks? | low | all |
| N-08 | Aesthetic and minimal design | Is every element on the screen needed for the screen's goal? | medium | all |
| N-09 | Help users recover from errors | Do error messages say what happened and how to fix it, in plain words? | high | all |
| N-10 | Help and documentation | Is help available in context where users may get stuck? | low | all |

### 7.2 Human-AI Interaction (Amershi)

| ID | Rule | Check | Severity | Tag |
| --- | --- | --- | --- | --- |
| G-01 | Make clear what the system can do | Does the UI state what the AI can and cannot do? | high | ai |
| G-02 | Make clear how well it can do it | Is confidence or reliability shown for AI outputs? | high | ai |
| G-03 | Time services based on context | Does AI help appear only when relevant? | medium | ai |
| G-04 | Show contextually relevant information | Is the AI output tied to the user's current task? | medium | ai |
| G-05 | Match relevant social norms | Is the AI's tone and wording appropriate for the audience? | low | ai |
| G-06 | Mitigate social biases | Are AI outputs free of stereotyped assumptions? | medium | ai |
| G-07 | Support efficient invocation | Can the user call the AI when they want it? | medium | ai |
| G-08 | Support efficient dismissal | Can the user dismiss or ignore AI suggestions in one step? | high | ai |
| G-09 | Support efficient correction | Can the user edit or fix AI output easily? | high | ai |
| G-10 | Scope services when in doubt | When unsure, does the AI ask, offer options or step back? | high | ai |
| G-11 | Make clear why the system did what it did | Can the user see a reason for each AI output or action? | medium | ai |
| G-12 | Remember recent interactions | Does the AI use recent context where it helps the user? | low | ai |
| G-13 | Learn from user behavior | If the AI personalizes, is it clear what it learned? | low | ai |
| G-14 | Update and adapt cautiously | Do AI behavior changes avoid surprising the user? | medium | ai |
| G-15 | Encourage granular feedback | Can the user give feedback on individual AI outputs? | low | ai |
| G-16 | Convey consequences of user actions | Does the UI say how an action will change AI behavior? | low | ai |
| G-17 | Provide global controls | Can the user set how much the AI monitors or acts? | medium | ai |
| G-18 | Notify users about changes | Is the user told when AI capabilities change? | low | ai |

### 7.3 House Rules

| ID | Rule | Check | Severity | Tag |
| --- | --- | --- | --- | --- |
| H-01 | AI idle state | Does the AI show a quiet ready state with its scope, without cluttering the screen? | medium | ai |
| H-02 | AI thinking state | Is there visible feedback while the AI works (badge, skeleton, progress text)? | high | ai |
| H-03 | AI streaming state | Does output appear progressively, and can the user stop it? | medium | ai |
| H-04 | AI fallback state | On low confidence or connection loss, does a banner appear with a manual option and a way back? | high | ai |
| H-05 | No automated high-risk actions | Do deletion, revocation, payments and similar actions always need explicit human confirmation? | high | all |
| H-06 | Primary action visible | Is the screen's single main action visible without scrolling on load? | high | all |
| H-07 | All four states defined | Does every key screen define normal, empty, loading and error states? | high | all |
| H-08 | Navigation matches the sitemap | Do back targets, breadcrumbs and transitions match the IA sitemap? | high | all |

---

## 8. Using This File in an Audit

- Report each failure as a **violation** with these fields: `id` (unique per report), `severity` (from the rule), `rule` (rule ID), `location` (screen ID + element), `found` (what was seen), `expected` (what the rule requires).
- `high` violations come first in the Orchestrator's summary, then `medium`, then `low`; the group decides what to fix.
- Skip rules tagged `ai` if section 2 says the product has no AI features.
- If a rule can't be checked from the available information, report it as "not checkable", not "pass".
