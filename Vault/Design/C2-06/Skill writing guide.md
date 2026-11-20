# Skill writing guide (for the AI)

Read this file before writing or editing a skill. A skill is one markdown file that teaches you to do one job the same way every time. Write it with the **4 pillars** below (based on Matt Pocock's *writing-for-agents*).

## Pillar 1: Triggers

The frontmatter `description` is the only part of the skill an AI sees until the skill is needed, so it decides whether the skill gets used.

- Say **what the skill produces** and **when to use it**, in one or two sentences.
- Name the input it expects (e.g. "for one Figma frame").
- Use the words a person would type when they want this job done.

```yaml
---
name: kebab-case-name
description: <What it produces>. Use when <situation>, for <input>.
---
```

## Pillar 2: Structure

The body is a short intro, then **References**, **Input**, numbered **Steps** and **Output**.

- One action per step, in the order you'd do it.
- Every step ends with a `Done when:` line: an observable check that the step is finished.
- Read each reference file **at the step that uses it**, not all up front: point to the section (`§3`) rather than copying its content into the skill.
- **Output** says exactly what exists when the skill is finished: where, named how, and what stays unchanged.

```markdown
# Title

One or two sentences: the job and the standard it's held to.

**References:** [[File]] §N · ...

## Input
## Steps
1. **Verb phrase.** What to do.
   Done when: observable check.
## Output
```

## Pillar 3: Steering

- **Leading words.** Pick one term for each key idea (e.g. **token binding**, **anchor screen**) and use exactly that term everywhere. Put it in bold the first time and define it once.
- **Rules as targets.** Write what the result looks like, never what to avoid: "every fill is bound to a variable", not "don't use hex colours". A negated instruction can pull the model towards the very thing it forbids.
- **Show, don't describe.** When a correct example exists (a frame, a file), point to it and tell the AI to match it. One example teaches more than a paragraph of description.

## Pillar 4: Pruning

- Read every sentence and ask: if I delete it, does the result change? If not, delete it.
- Leave out what the AI already does well without being told (being careful, being thorough, general design advice).
- Keep the skill short enough to read in a minute. Long reference material lives in its own file and the skill points to it.

## Final check

Before you hand the skill over, confirm:

- [ ] The description says what it produces and when to use it.
- [ ] Every step has a `Done when:` check.
- [ ] Every rule is phrased as a target.
- [ ] Leading words are used the same way everywhere.
- [ ] No sentence can be deleted without changing the result.
