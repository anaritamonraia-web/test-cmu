import json
import os
import urllib.request
import urllib.error
from database import (
    get_persona, get_product, get_product_docs, get_research_entries,
    save_persona, add_suggestion, get_suggestions, update_suggestion_status, get_setting
)

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

def get_api_key():
    return os.environ.get("GEMINI_API_KEY") or get_setting("GEMINI_API_KEY")

def call_gemini(prompt_text):
    api_key = get_api_key()
    if not api_key:
        return None

    url = f"{GEMINI_API_URL}?key={api_key}"
    payload = {
        "contents": [{
            "parts": [{"text": prompt_text}]
        }],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=12) as response:
            result = json.loads(response.read().decode("utf-8"))
            candidates = result.get("candidates", [])
            if candidates:
                raw_json = candidates[0]["content"]["parts"][0]["text"]
                return json.loads(raw_json)
    except Exception as e:
        print(f"Gemini API request failed or timed out: {e}")
        return None

def propose_personas_from_product(product_id=None):
    product = get_product(product_id)
    if not product:
        product = {
            "name": "SaaS Platform",
            "tagline": "Next-gen workflow automation",
            "description": "Collaborative project and research platform for modern cross-functional teams.",
            "target_market": "Product Managers, UX Researchers, and Tech Leads",
            "value_proposition": "Turn scattered customer research into actionable product decisions.",
            "key_features": ["Real-time collaborative workspace", "Automated insight extraction", "Persona confidence scoring", "Evidence audit trails"]
        }
    
    docs = get_product_docs(product.get("id"))
    doc_summaries = "\n".join([f"- {d.get('title')}: {d.get('content')[:200]}" for d in docs])

    # Try Gemini if API key available
    api_key = get_api_key()
    if api_key:
        prompt = f"""
You are an expert UX researcher and product strategist. Propose 2 distinct, highly realistic user personas for the following product following the "Universe User Personas" design framework.

PRODUCT DETAILS:
Name: {product.get('name')}
Tagline: {product.get('tagline')}
Description: {product.get('description')}
Target Market: {product.get('target_market')}
Value Proposition: {product.get('value_proposition')}
Key Features: {', '.join(product.get('key_features', []))}
Additional Docs:
{doc_summaries}

Return a valid JSON array of 2 persona objects with this exact structure:
[
  {{
    "name": "Firstname Lastname",
    "archetype": "Name the Role (e.g. Kayla the Planner)",
    "quote": "A memorable first-person quote about their work philosophy",
    "theme_color": "amber" or "indigo" or "teal" or "rose" or "emerald" or "violet",
    "age": 29,
    "occupation": "Job Title",
    "location": "City, Country",
    "education": "Degree",
    "family_status": "Single / Married with 2 kids / etc.",
    "tech_savviness": 4,
    "bio": "A 2-3 sentence narrative biography summarizing their role and daily focus.",
    "day_in_life": "A 2-3 sentence description of their typical workflow and where software friction happens.",
    "goals": ["Goal 1", "Goal 2", "Goal 3"],
    "frustrations": ["Pain point 1", "Pain point 2", "Pain point 3"],
    "motivations": {{"growth": 85, "efficiency": 90, "social": 55, "autonomy": 80}},
    "personality_traits": {{"introvert_extrovert": 40, "analytical_creative": 80, "spontaneous_structured": 90, "cautious_innovator": 60}},
    "preferred_tools": ["Tool1", "Tool2", "Tool3", "Tool4"],
    "preferred_brands": ["Brand1", "Brand2", "Brand3"]
  }}
]
"""
        gemini_result = call_gemini(prompt)
        if gemini_result and isinstance(gemini_result, list) and len(gemini_result) > 0:
            for p in gemini_result:
                p["product_id"] = product.get("id", 1)
                p["is_ai_generated"] = 1
            return gemini_result

    # Fallback to intelligent contextual heuristic generation
    p_name = product.get("name", "Product")
    features = product.get("key_features", ["Workflow automation", "Team collaboration", "Analytics"])
    feat1 = features[0] if len(features) > 0 else "efficiency"
    feat2 = features[1] if len(features) > 1 else "collaboration"

    proposals = [
        {
            "product_id": product.get("id", 1),
            "name": "Kayla the Planner",
            "archetype": "Kayla the Planner",
            "quote": f"If our roadmap isn't anchored in real user signals, we are just guessing with {p_name}.",
            "theme_color": "amber",
            "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            "age": 31,
            "occupation": "Senior Product Operations Manager",
            "location": "Austin, TX",
            "education": "B.S. in Information Systems",
            "family_status": "Partnered, 1 Dog",
            "tech_savviness": 4,
            "bio": f"Kayla coordinates cross-functional release cycles. She depends heavily on {feat1} to ensure the entire team stays aligned on sprint priorities.",
            "day_in_life": f"Spends mornings prioritizing backlog items and synthesizing customer feedback. Her afternoon is spent in sprint syncs where she needs instant access to verified user research.",
            "goals": [
                f"Streamline team workflow using {feat1}",
                "Ensure every feature ticket has backing user research before dev handoff",
                "Reduce context switching across disparate communication channels"
            ],
            "frustrations": [
                "Scattered research notes in Google Docs that developers never read",
                "Unvalidated assumptions leading to reworked sprints",
                "Lack of a single source of truth for target user profiles"
            ],
            "motivations": {"growth": 85, "efficiency": 95, "social": 50, "autonomy": 80},
            "personality_traits": {
                "introvert_extrovert": 42,
                "analytical_creative": 85,
                "spontaneous_structured": 92,
                "cautious_innovator": 48
            },
            "preferred_tools": ["Notion", "Linear", "Figma", "Slack"],
            "preferred_brands": ["Apple", "Arc", "Patagonia", "Aesop"],
            "is_ai_generated": 1
        },
        {
            "product_id": product.get("id", 1),
            "name": "Drew the Strategist",
            "archetype": "Drew the Strategist",
            "quote": "Speed without empirical confidence is just accelerating in the wrong direction.",
            "theme_color": "indigo",
            "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            "age": 38,
            "occupation": "Head of Product & Growth",
            "location": "San Francisco, CA",
            "education": "M.B.A., Haas School of Business",
            "family_status": "Married, 2 Kids",
            "tech_savviness": 5,
            "bio": f"Drew oversees product portfolio investments and requires high-confidence data to defend roadmap bets to executives. He leverages {feat2} to foster shared user empathy.",
            "day_in_life": "Starts the day reviewing key customer metrics and adoption funnels. Meets with design and research leads to evaluate user persona validation before signing off on quarterly initiatives.",
            "goals": [
                f"Demonstrate quantifiable ROI through {feat2}",
                "Connect user persona evolution directly to product retention metrics",
                "Foster a culture of continuous discovery across engineering and design"
            ],
            "frustrations": [
                "Static persona PDFs created two years ago that nobody references",
                "Difficulty proving to stakeholders why certain user requests take priority",
                "Slow qualitative synthesis turnaround times"
            ],
            "motivations": {"growth": 95, "efficiency": 85, "social": 70, "autonomy": 90},
            "personality_traits": {
                "introvert_extrovert": 68,
                "analytical_creative": 75,
                "spontaneous_structured": 80,
                "cautious_innovator": 72
            },
            "preferred_tools": ["Miro", "Mixpanel", "Dovetail", "Loom"],
            "preferred_brands": ["Apple", "Tesla", "Allbirds", "Sonos"],
            "is_ai_generated": 1
        }
    ]
    return proposals

def analyze_and_suggest_changes(persona_id):
    """
    Examines persona against current product knowledge base and research logs
    to suggest improvements, flag gaps, and propose evolutions.
    """
    persona = get_persona(persona_id)
    if not persona:
        return []

    product = get_product(persona.get("product_id"))
    research = get_research_entries(product_id=persona.get("product_id"), persona_id=persona_id)
    
    existing_suggestions = get_suggestions(persona_id)
    existing_titles = [s.get("title") for s in existing_suggestions]

    generated = []

    # 1. Product Feature Alignment check
    if product:
        for feature in product.get("key_features", []):
            feature_words = [w.lower() for w in feature.split() if len(w) > 3]
            goals_text = " ".join(persona.get("goals", [])).lower()
            if not any(w in goals_text for w in feature_words):
                title = f"Align with Product Feature: {feature[:30]}"
                if title not in existing_titles:
                    s_id = add_suggestion(
                        persona_id=persona_id,
                        title=title,
                        reason=f"The product highlights '{feature}' as a key capability, but {persona.get('name')} does not yet have a goal reflecting this workflow.",
                        category="product_alignment",
                        suggested_action="add_goal",
                        payload={"type": "add_goal", "text": f"Leverage {feature} to accelerate team workflows"}
                    )
                    generated.append(s_id)

    # 2. Research Grounding check
    if len(research) > 0:
        # Check if research brought new pain points not yet in persona
        research_pain_points = []
        for r in research:
            research_pain_points.extend(r.get("validated_pain_points", []))
        
        current_frustrations = " ".join(persona.get("frustrations", [])).lower()
        for pp in research_pain_points:
            if pp.lower() not in current_frustrations:
                title = f"Incorporate Research Pain Point: {pp[:35]}"
                if title not in existing_titles:
                    s_id = add_suggestion(
                        persona_id=persona_id,
                        title=title,
                        reason=f"Recent user research participant flagged: '{pp}'. Incorporating this will increase confidence and keep the persona true to live research.",
                        category="research_insight",
                        suggested_action="add_frustration",
                        payload={"type": "add_frustration", "text": pp}
                    )
                    generated.append(s_id)
    else:
        title = "Missing Empirical Research Grounding"
        if title not in existing_titles:
            s_id = add_suggestion(
                persona_id=persona_id,
                title=title,
                reason=f"{persona.get('name')} currently relies on hypothetical assumptions. Log at least 1 user interview session to corroborate goals and boost confidence.",
                category="unverified_gap",
                suggested_action="log_research",
                payload={"type": "log_research", "recommended_action": "Conduct 30-min discovery interview"}
            )
            generated.append(s_id)

    # 3. Check for Universe style trait balance
    traits = persona.get("personality_traits", {})
    if traits.get("analytical_creative", 50) > 70 and "Figma" not in persona.get("preferred_tools", []):
        title = "Add Design Collaboration Tool"
        if title not in existing_titles:
            s_id = add_suggestion(
                persona_id=persona_id,
                title=title,
                reason=f"{persona.get('name')} has high creative traits, but creative tools are not listed in their tech stack.",
                category="profile_enhancement",
                suggested_action="add_tool",
                payload={"type": "add_tool", "text": "Figma"}
            )
            generated.append(s_id)

    return get_suggestions(persona_id)

def apply_suggestion_to_persona(suggestion_id):
    """
    Applies the proposed modification to the persona and marks suggestion as accepted.
    """
    conn = get_suggestions(1) # just to check
    # Fetch suggestion details
    from database import get_connection
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM persona_suggestions WHERE id = ?", (suggestion_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return False

    suggestion = dict(row)
    persona = get_persona(suggestion["persona_id"])
    if not persona:
        return False

    payload = json.loads(suggestion.get("payload", "{}")) if isinstance(suggestion.get("payload"), str) else suggestion.get("payload", {})
    action = payload.get("type") or suggestion.get("suggested_action")

    if action == "add_goal":
        new_goal = payload.get("text")
        if new_goal and new_goal not in persona["goals"]:
            persona["goals"].append(new_goal)
            save_persona(persona)
    elif action == "add_frustration":
        new_frus = payload.get("text")
        if new_frus and new_frus not in persona["frustrations"]:
            persona["frustrations"].append(new_frus)
            save_persona(persona)
    elif action == "add_tool":
        new_tool = payload.get("text")
        if new_tool and new_tool not in persona["preferred_tools"]:
            persona["preferred_tools"].append(new_tool)
            save_persona(persona)

    update_suggestion_status(suggestion_id, "accepted")
    return True
