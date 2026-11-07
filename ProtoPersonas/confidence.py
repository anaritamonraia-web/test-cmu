import json
from database import get_persona, get_research_entries, get_product, get_product_docs

def calculate_confidence(persona_id):
    """
    Calculates a multi-factor confidence score (0-100) for a given persona:
    1. Research Grounding (40%): Real user research volume, quotes, and confirmed observations.
    2. Product Data Alignment (30%): Alignment between persona goals/needs and actual product specs.
    3. Profile Completeness (30%): Depth of demographic, psychographic, and narrative profile.
    """
    persona = get_persona(persona_id)
    if not persona:
        return None

    product = get_product(persona.get("product_id"))
    product_docs = get_product_docs(persona.get("product_id")) if product else []
    research_entries = get_research_entries(product_id=persona.get("product_id"), persona_id=persona_id)

    # 1. Research Grounding (Max 40 points)
    # ---------------------------------------------
    sessions_count = len(research_entries)
    all_quotes = []
    all_behaviors = []
    all_pain_points = []
    confirmed_count = 0
    refuted_count = 0

    for entry in research_entries:
        all_quotes.extend(entry.get("quotes", []))
        all_behaviors.extend(entry.get("observed_behaviors", []))
        all_pain_points.extend(entry.get("validated_pain_points", []))
        if entry.get("validation_status") == "confirmed":
            confirmed_count += 1
        elif entry.get("validation_status") == "refuted":
            refuted_count += 1

    # Base research scoring:
    # - Up to 15 pts for sessions (3 pts per session, max 15)
    # - Up to 15 pts for quotes (1.5 pts per quote, max 15)
    # - Up to 10 pts for validated pain points / behaviors (1 pt each, max 10)
    session_pts = min(15.0, sessions_count * 3.0)
    quotes_pts = min(15.0, len(all_quotes) * 1.5)
    evidence_pts = min(10.0, (len(all_behaviors) + len(all_pain_points)) * 1.0)
    raw_research = session_pts + quotes_pts + evidence_pts

    # Refutations or lack of validation dampen score slightly
    if sessions_count > 0 and refuted_count > confirmed_count:
        raw_research = max(5.0, raw_research * 0.7)

    research_score = round(min(40.0, raw_research), 1)

    # 2. Product Alignment (Max 30 points)
    # ---------------------------------------------
    # Check alignment between persona goals/frustrations and product features
    product_features = product.get("key_features", []) if product else []
    product_desc = ((product.get("description", "") + " " + product.get("value_proposition", "")).lower()) if product else ""
    
    # Also collect document text
    doc_text = " ".join([d.get("content", "").lower() for d in product_docs])
    full_product_corpus = product_desc + " " + doc_text

    goals = persona.get("goals", [])
    frustrations = persona.get("frustrations", [])
    
    matched_goals = 0
    for goal in goals:
        words = [w for w in goal.lower().split() if len(w) > 3]
        if any(w in full_product_corpus for w in words):
            matched_goals += 1

    matched_frustrations = 0
    for frus in frustrations:
        words = [w for w in frus.lower().split() if len(w) > 3]
        if any(w in full_product_corpus for w in words):
            matched_frustrations += 1

    # Scoring:
    # - Product base exists: 8 pts
    # - Matched goals: up to 12 pts (3 pts per matched goal, max 12)
    # - Matched frustrations/problems: up to 10 pts (2.5 pts per matched frustration, max 10)
    product_base_pts = 8.0 if product and len(product_features) > 0 else 2.0
    goal_pts = min(12.0, matched_goals * 3.0)
    frus_pts = min(10.0, matched_frustrations * 2.5)
    product_score = round(min(30.0, product_base_pts + goal_pts + frus_pts), 1)

    # 3. Profile Completeness (Max 30 points)
    # ---------------------------------------------
    checks = [
        bool(persona.get("quote")),
        bool(persona.get("occupation")),
        bool(persona.get("location")),
        bool(persona.get("education")),
        bool(persona.get("bio") and len(persona.get("bio", "")) > 40),
        bool(persona.get("day_in_life") and len(persona.get("day_in_life", "")) > 40),
        len(goals) >= 3,
        len(frustrations) >= 3,
        bool(persona.get("preferred_tools") and len(persona.get("preferred_tools", [])) >= 2),
        bool(persona.get("preferred_brands") and len(persona.get("preferred_brands", [])) >= 2),
        bool(persona.get("personality_traits")),
        bool(persona.get("motivations"))
    ]
    completed_checks = sum(1 for c in checks if c)
    completeness_score = round((completed_checks / len(checks)) * 30.0, 1)

    # Total Score
    total_score = round(research_score + product_score + completeness_score)
    total_score = max(0, min(100, total_score))

    if total_score >= 75:
        tier = "High Confidence"
        tier_color = "emerald"
    elif total_score >= 50:
        tier = "Moderate Confidence"
        tier_color = "amber"
    else:
        tier = "Low Confidence (Early Hypothesis)"
        tier_color = "rose"

    # Actionable Recommendations to improve confidence
    recommendations = []
    if sessions_count < 2:
        recommendations.append("Log at least 2 user research interview sessions with users matching this persona (+10 pts).")
    if len(all_quotes) < 4:
        recommendations.append("Record verbatim user quotes in the research log to ground goals and frustrations (+6 pts).")
    if not persona.get("day_in_life") or len(persona.get("day_in_life", "")) < 40:
        recommendations.append("Add a detailed 'Day in the Life' story to ground daily workflows (+3 pts).")
    if len(goals) < 3 or len(frustrations) < 3:
        recommendations.append("Define at least 3 distinct goals and 3 pain points for a comprehensive profile (+4 pts).")
    if matched_goals < 2:
        recommendations.append("Corroborate persona goals with key features in the Product Knowledge Base (+5 pts).")
    if not recommendations:
        recommendations.append("Persona is exceptionally well-grounded! Continue validating edge cases during user usability tests.")

    return {
        "persona_id": persona_id,
        "persona_name": persona.get("name"),
        "total_score": total_score,
        "tier": tier,
        "tier_color": tier_color,
        "breakdown": {
            "research": {
                "score": research_score,
                "max": 40,
                "sessions_count": sessions_count,
                "quotes_count": len(all_quotes),
                "validated_evidence_count": len(all_behaviors) + len(all_pain_points),
                "weight": "40%"
            },
            "product_alignment": {
                "score": product_score,
                "max": 30,
                "matched_goals": matched_goals,
                "matched_frustrations": matched_frustrations,
                "product_features_count": len(product_features),
                "weight": "30%"
            },
            "completeness": {
                "score": completeness_score,
                "max": 30,
                "completed_items": completed_checks,
                "total_items": len(checks),
                "weight": "30%"
            }
        },
        "evidence_summary": {
            "sample_quotes": all_quotes[:4],
            "confirmed_pain_points": all_pain_points[:4],
            "assumptions_remaining": max(0, 4 - len(all_quotes))
        },
        "recommendations": recommendations
    }
