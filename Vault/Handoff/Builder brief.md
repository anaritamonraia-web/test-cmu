# Builder brief (E2 red team)

You are the developers now. Another group handed you their happy path: their vault and a view link to their Figma file. Build it from their handoff, and write down every time the handoff wasn't enough.

**Rotation:** group A builds B's flow, B builds C's, C builds A's.

## Setup (5 min)

1. Unzip the other group's vault into a **new folder**, not inside your own vault, and open your AI tool in that folder.
2. Turn the **Figma MCP off** for this session (in Claude Code: `/mcp`, select *figma*, *Disable*). You may look at their Figma file yourselves; your AI may not read it. The test is whether the **handoff** is enough.
3. Create `Build/Log.md` in that folder.

## Build (40 min)

Paste this into your AI tool:

```
Build the happy path described in Handoff/handoff-glossary.md as a clickable prototype.

Read handoff-glossary first, then each spec in Handoff/ in flow order.
Use only the handoff specs and the notes they link to. Do not read Figma.

Output: one HTML + Tailwind file per screen in Build/, named <ID>.html, with every
state the spec lists and links between screens as the spec's "Goes to" column says.
Use the spec's sample data, tokens and components exactly.

Whenever the handoff doesn't tell you something and you have to decide, stop and tell
me what was missing, then add a row to Build/Log.md before you go on.
```

Build in flow order, at least 2 screens linked to each other.

## The log

Every time you had to look outside the handoff, guess, or ask the authors, add a row. This log is what you present in E3.

| Screen | What was missing or unclear | Where we found it (or what we guessed) |
| --- | --- | --- |
| CART | Error message text | Guessed "Something went wrong" |
| MENU | Not built | Ran out of time |

## Presenting (E3, 10 min per group)

1. **Click through your prototype** in the browser, from the first screen (4 min).
2. **Your log**: the 3 gaps that cost you the most (3 min).
3. **The authors' feedback**, with their Figma prototype open next to yours (3 min).
