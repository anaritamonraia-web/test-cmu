# POC prompt (E5)

Copy everything in the box below into your AI tool, opened in this vault's folder. Fill the 4 notes first: the prompt reads them.

```
Read these 4 files in Baseline/C2-05/:
- StructureIdea.md: the problem and the breadboard (what the system does)
- BehaviourSpectrum.md: how the product behaves (the 6 spectrum scores and rules)
- CompetitiveAnalysis.md: the competitors, the UI patterns users in this market already know, the friction to avoid and the gaps to use
- AestheticsEmotionalSpec.md: how users must feel, and must not feel

Then create 3 proof-of-concept one-pagers for the screen or flow described in StructureIdea.md.

Each POC:
- is one HTML file with inline CSS, saved as Baseline/C2-05/POC/POC-A.html, POC-B.html and POC-C.html;
- follows the breadboard, the behaviour scores and the feelings in these files;
- keeps the visuals simple (greys and one accent colour), so we judge structure and behaviour, not style.

Make the 3 POCs truly different from each other: each takes a different interaction approach to the same problem.

When you finish, show a table comparing the 3: the interaction approach, how it follows the behaviour spectrum, which feelings it supports, and its biggest risk.
```

After the 3 POCs: open them in your browser, discuss with the AI what to keep and adapt from each, and ask it for the final one as `Baseline/C2-05/POC/POC-final.html`.

## Last step: into Figma

When `POC-final.html` is done, paste this:

```
Rebuild Baseline/C2-05/POC/POC-final.html as-is in our Figma file, on [Add figma link here].
One frame per screen, named with the screen's plain name (e.g. "Cart").
Keep it exactly as the HTML: don't restyle it or add a design system.
```

Check that every screen of the flow made it into Figma. Your design system goes in during C2:06.
