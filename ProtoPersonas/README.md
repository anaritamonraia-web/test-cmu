# Universe User Persona Intelligence System

A full-stack product persona creation, management, and continuous evolution platform inspired directly by **Arthur Chayka's Universe User Personas** (Dribbble shot [3338369](https://dribbble.com/shots/3338369-Universe-User-Personas)).

---

## Key Features

1. **Universe User Persona Poster Design**:
   - Visual aesthetic modeled after Arthur Chayka's work (featuring characters like **Kayla the Planner**, **Drew the Strategist**, and **Rony the Builder**).
   - Card poster layout with distinct persona accent color themes (Amber, Indigo, Teal, Rose, Emerald, Violet).
   - High-impact quote banner, structured demographic badge pills, and digital literacy meters.
   - Interactive bipolar trait sliders (*Introvert ⟷ Extrovert*, *Analytical ⟷ Creative*, *Spontaneous ⟷ Structured*, *Cautious ⟷ Early Adopter*).
   - Motivation bar charts (Growth, Efficiency, Social Recognition, Autonomy).
   - Goals & Needs vs. Frustrations & Pain Points matrices.
   - Preferred apps & brand identity grid.
   - 1-Click Print & PDF Poster export.

2. **Persona Creation Wizard**:
   - **AI-Assisted Proposal**: Proposes complete candidate personas grounded directly in your product's value proposition, features, and PRD specifications.
   - **Custom Manual Builder**: Comprehensive form to construct or customize every Universe field.

3. **Product Knowledge Base**:
   - Structured product profile (name, value proposition, target customer segment, key features).
   - Product specification / PRD document attachments (Markdown or plain text).

4. **Continuous User Research Grounding**:
   - Log participant interviews, usability tests, survey feedback, and support tickets.
   - Record verbatim participant quotes, observed behaviors, and validated pain points.
   - Link research directly to personas to continuously ground assumptions in empirical truth.

5. **Multi-Factor Confidence Scoring Algorithm**:
   - Transparent 0–100 score dynamically calculated:
     - **Empirical Research Grounding (40%)**: Research session count, verbatim quote volume, confirmed findings vs. assumptions.
     - **Product Feature Fit (30%)**: Alignment between persona goals and active product capabilities.
     - **Profile Completeness (30%)**: Thoroughness of demographics, psychographics, and narrative workflow.
   - Interactive audit popover displaying mathematical breakdown, evidence trail, and actionable tips to boost confidence.

6. **AI Gap Analysis & Persona Evolution Engine**:
   - Scans product features and research logs to flag inconsistencies, missing pain points, or ungrounded assumptions.
   - One-click "Apply to Persona" merges suggested evolutions directly into the living profile.

---

## Quick Start

### 1. Launch the Application
No external package installation or build step required. The application runs natively with Python 3:

```bash
./run.sh
# or
python3 server.py
```

### 2. Open in Browser
Open **http://localhost:8080** in your web browser.

---

## Architecture & Technology Stack

- **Backend**: Python 3 standard library (`http.server.ThreadingHTTPServer`, `sqlite3`, `json`, `urllib`) for zero-dependency execution.
- **Database**: SQLite database stored in `data/personas.db`.
- **Frontend**: Modern SPA with Tailwind CSS, Lucide icons, and custom Universe CSS design system.
- **AI Intelligence**: Dual-mode engine supporting Google Gemini API via `urllib.request` (optional `GEMINI_API_KEY`) and intelligent heuristic synthesis.
