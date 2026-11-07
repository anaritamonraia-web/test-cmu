from database import (
    init_db, save_product, add_product_doc, save_persona,
    save_research_entry, get_personas, get_product
)
from ai_engine import analyze_and_suggest_changes

def seed():
    init_db()

    # Check if already seeded
    existing_product = get_product()
    if existing_product:
        print("Database already contains data, skipping seed.")
        return

    print("Seeding initial product context...")
    product = save_product({
        "name": "NovaFlow",
        "tagline": "Continuous Product Discovery & Persona Intelligence",
        "description": "NovaFlow bridges the gap between customer discovery interviews, product roadmaps, and agile delivery by maintaining live, grounded user personas.",
        "target_market": "Cross-functional Product teams (PMs, UX Designers, User Researchers, Engineering Leads)",
        "value_proposition": "Transform qualitative user research into living, high-confidence persona profiles that prevent wasted engineering sprints.",
        "key_features": [
            "Living Persona Canvas with Universe Visual Design",
            "Continuous Research Grounding & Quote Linker",
            "Multi-Factor Confidence Scoring Algorithm",
            "AI-Assisted Gap Analysis & Feature Alignment Engine",
            "Bi-directional Sprint Integration & Export"
        ],
        "business_goals": [
            "Increase qualitative research utilization by 3x across sprint planning",
            "Eliminate outdated static PDF personas across product orgs",
            "Shorten discovery-to-specification handoff cycle by 40%"
        ]
    })

    # Add product PRD document
    add_product_doc(
        product_id=product["id"],
        title="Q4 Product Discovery Strategy & Research Framework",
        doc_type="PRD",
        content="""# PRD: Living Persona Intelligence
### Problem Statement
Product managers and designers spend dozens of hours conducting user interviews, but the synthesized insights are archived in Google Docs or Miro boards. Engineers continue building against hypothetical user personas that haven't been updated in over a year.

### Objectives
1. Provide a central repository where customer quotes and usability test notes directly update persona attributes.
2. Give executive teams an empirical confidence indicator (0-100%) showing whether a feature request is backed by real user signals or speculation.
3. Support visual Universe-style persona cards that teams can print, share, and review during sprint retrospectives.
"""
    )

    print("Seeding Universe User Personas (Kayla, Drew, Rony)...")

    # Persona 1: Kayla the Planner (Flagship Amber theme - directly inspired by Arthur Chayka's Kayla)
    kayla = save_persona({
        "product_id": product["id"],
        "name": "Kayla the Planner",
        "archetype": "Kayla the Planner",
        "quote": "If our sprint backlog isn't anchored in verified customer evidence, we're just building technical debt in advance.",
        "theme_color": "amber",
        "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        "age": 32,
        "occupation": "Senior Product Operations Manager",
        "location": "Austin, Texas",
        "education": "B.S. in Management Information Systems",
        "family_status": "Partnered, 1 Golden Retriever",
        "tech_savviness": 4,
        "bio": "Kayla orchestrates planning rituals across 4 cross-functional squad teams. She bridges the gap between UX research discoveries and Jira backlog prioritization, championing empirical validation before engineering kickoff.",
        "day_in_life": "Starts her day at 8:30 AM reviewing feedback tickets and unblocking sprint dependencies. Spends midday facilitating quarterly planning sessions and aligning PMs on customer pain points. Concludes her afternoon verifying that acceptance criteria reflect genuine user interview quotes.",
        "goals": [
            "Maintain an up-to-date single source of truth for user personas across all squads",
            "Empower product designers to cite direct customer quotes in design reviews",
            "Accelerate cross-functional consensus during sprint planning rituals"
        ],
        "frustrations": [
            "Static persona PDFs created two years ago that nobody remembers to update",
            "Developers debating user preferences based on personal opinion rather than data",
            "Disjointed research repositories scattered across Notion, Drive, and Slack"
        ],
        "motivations": {
            "growth": 88,
            "efficiency": 96,
            "social": 62,
            "autonomy": 82
        },
        "personality_traits": {
            "introvert_extrovert": 38,
            "analytical_creative": 82,
            "spontaneous_structured": 94,
            "cautious_innovator": 55
        },
        "preferred_tools": ["Notion", "Linear", "Figma", "Slack", "Miro"],
        "preferred_brands": ["Apple", "Arc Browser", "Patagonia", "Aer", "Aesop"],
        "is_ai_generated": 0
    })

    # Persona 2: Drew the Strategist (Indigo theme)
    drew = save_persona({
        "product_id": product["id"],
        "name": "Drew the Strategist",
        "archetype": "Drew the Strategist",
        "quote": "Speed without empirical customer confidence is just accelerating into a wall.",
        "theme_color": "indigo",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "age": 41,
        "occupation": "VP of Product Strategy",
        "location": "San Francisco, California",
        "education": "M.B.A., Stanford Graduate School of Business",
        "family_status": "Married, 2 Children",
        "tech_savviness": 5,
        "bio": "Drew oversees the multi-year product roadmap and reports quarterly progress to board members. He relies on high-confidence persona data to justify roadmap bets and allocate millions in engineering budget.",
        "day_in_life": "Spends early mornings reviewing quarterly cohort retention metrics and competitive intelligence. Joins executive briefings at 11 AM to present user discovery findings. Afternoons are dedicated to 1-on-1s with product directors to review user persona grounding.",
        "goals": [
            "Link executive roadmap initiatives directly to high-confidence user personas",
            "Reduce wasted engineering investment on unvalidated speculative features",
            "Present clean, visually compelling persona posters in board presentations"
        ],
        "frustrations": [
            "Lack of objective confidence metrics when PMs present new feature requests",
            "Inability to trace a feature back to actual user interview transcripts",
            "Long delays between discovery research and actionable roadmap adjustments"
        ],
        "motivations": {
            "growth": 95,
            "efficiency": 84,
            "social": 72,
            "autonomy": 90
        },
        "personality_traits": {
            "introvert_extrovert": 70,
            "analytical_creative": 78,
            "spontaneous_structured": 78,
            "cautious_innovator": 76
        },
        "preferred_tools": ["Dovetail", "Mixpanel", "Keynote", "Slack", "Zoom"],
        "preferred_brands": ["Apple", "Tesla", "Allbirds", "Sonos", "Rimowa"],
        "is_ai_generated": 0
    })

    # Persona 3: Rony the Builder (Teal theme)
    rony = save_persona({
        "product_id": product["id"],
        "name": "Rony the Builder",
        "archetype": "Rony the Builder",
        "quote": "Give me the real customer problem and the evidence behind it, and I'll architect the cleanest solution.",
        "theme_color": "teal",
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "age": 28,
        "occupation": "Lead Full-Stack Engineer",
        "location": "Toronto, Canada",
        "education": "B.S. in Computer Science, University of Waterloo",
        "family_status": "Single",
        "tech_savviness": 5,
        "bio": "Rony leads the core engineering squad. He cares deeply about developer velocity, system maintainability, and building features that users actually love rather than building bloatware.",
        "day_in_life": "Codes high-priority features during morning focus hours with noise-canceling headphones. Participates in afternoon grooming sessions where he actively checks whether tickets have user context before estimating story points.",
        "goals": [
            "Understand the human context behind ticket specifications before writing code",
            "Avoid building complex UI widgets that users abandon within two weeks",
            "Participate actively in user testing sessions to observe real friction firsthand"
        ],
        "frustrations": [
            "Specifications that state 'user wants X' with zero explanation of why",
            "Last-minute scope changes driven by executive whims rather than user data",
            "Poorly designed mockups that don't account for edge case workflows"
        ],
        "motivations": {
            "growth": 92,
            "efficiency": 90,
            "social": 45,
            "autonomy": 88
        },
        "personality_traits": {
            "introvert_extrovert": 30,
            "analytical_creative": 88,
            "spontaneous_structured": 85,
            "cautious_innovator": 82
        },
        "preferred_tools": ["VS Code", "GitHub", "Linear", "Raycast", "Docker"],
        "preferred_brands": ["Framework", "Sony", "Mechanical Keyboards", "Arc"],
        "is_ai_generated": 0
    })

    print("Seeding empirical user research entries...")

    # Research Entry 1 (Linked to Kayla)
    save_research_entry({
        "product_id": product["id"],
        "persona_id": kayla["id"],
        "participant_name": "Sarah Chen",
        "participant_role": "Director of Product Operations at FinTech Co",
        "session_date": "2026-09-18",
        "session_type": "1-on-1 Interview",
        "quotes": [
            "Our designers keep referencing a PDF persona deck from 2024 that is completely disconnected from our new enterprise customers.",
            "I spend at least 4 hours every sprint just convincing engineers that our users actually struggle with this specific step.",
            "If I had a confidence meter backed by real quotes, I could stop the endless subjective debates."
        ],
        "observed_behaviors": [
            "Maintains a private spreadsheet mapping Jira tickets to customer support quotes.",
            "Takes screenshots of customer emails to paste into ticket descriptions as evidence."
        ],
        "validated_pain_points": [
            "Disjointed research repositories scattered across Notion, Drive, and Slack",
            "Developers debating user preferences based on personal opinion rather than data"
        ],
        "validation_status": "confirmed",
        "notes": "Strong validation for Kayla persona. Participant strongly resonated with the need for a live confidence score."
    })

    # Research Entry 2 (Linked to Kayla)
    save_research_entry({
        "product_id": product["id"],
        "persona_id": kayla["id"],
        "participant_name": "Marcus Vance",
        "participant_role": "Lead Agile Coach & Product Ops",
        "session_date": "2026-09-29",
        "session_type": "Usability Test",
        "quotes": [
            "When sprint planning starts, nobody wants to read 30 pages of research. They need a 1-page visual poster with the key sliders and verified quotes."
        ],
        "observed_behaviors": [
            "Printed out persona posters and hung them on physical sprint room walls.",
            "Highlighted verified vs assumed statements in yellow marker during retro."
        ],
        "validated_pain_points": [
            "Static persona PDFs created two years ago that nobody remembers to update"
        ],
        "validation_status": "confirmed",
        "notes": "Confirms value of Arthur Chayka style poster cards for team empathy."
    })

    # Research Entry 3 (Linked to Drew)
    save_research_entry({
        "product_id": product["id"],
        "persona_id": drew["id"],
        "participant_name": "Elena Rostova",
        "participant_role": "VP of Digital Products at ScaleUp",
        "session_date": "2026-10-04",
        "session_type": "1-on-1 Interview",
        "quotes": [
            "Every quarter I have to justify our $2M budget allocation. If I can't prove our personas are backed by real research, the CFO cuts our exploratory projects."
        ],
        "observed_behaviors": [
            "Uses executive summary slides with key confidence percentages."
        ],
        "validated_pain_points": [
            "Lack of objective confidence metrics when PMs present new feature requests"
        ],
        "validation_status": "confirmed",
        "notes": "Validates Drew's pain point regarding executive defense of roadmap priorities."
    })

    print("Generating AI suggestions...")
    analyze_and_suggest_changes(kayla["id"])
    analyze_and_suggest_changes(drew["id"])
    analyze_and_suggest_changes(rony["id"])

    print("Seed complete!")

if __name__ == "__main__":
    seed()
