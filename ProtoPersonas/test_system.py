import json
from database import (
    init_db, get_product, save_product, get_product_docs, add_product_doc,
    get_personas, get_persona, save_persona, delete_persona,
    get_research_entries, save_research_entry, get_suggestions
)
from confidence import calculate_confidence
from ai_engine import propose_personas_from_product, analyze_and_suggest_changes, apply_suggestion_to_persona

def run_tests():
    print("--- 1. Testing Product Context & Docs ---")
    product = get_product()
    assert product is not None, "Product should exist"
    print(f"Product: {product['name']} - {product['tagline']}")
    docs = get_product_docs(product["id"])
    print(f"Product Docs count: {len(docs)}")
    assert len(docs) >= 1, "Should have at least 1 doc"

    print("\n--- 2. Testing Personas & Universe Structure ---")
    personas = get_personas()
    assert len(personas) >= 3, "Should have at least 3 personas (Kayla, Drew, Rony)"
    print(f"Found {len(personas)} personas:")
    for p in personas:
        print(f"  • {p['name']} ({p['archetype']}) - Theme: {p['theme_color']}")
        assert "introvert_extrovert" in p["personality_traits"]
        assert len(p["goals"]) >= 2
        assert len(p["frustrations"]) >= 2

    print("\n--- 3. Testing Confidence Scoring Engine ---")
    kayla_id = personas[0]["id"]
    conf = calculate_confidence(kayla_id)
    assert conf is not None
    print(f"Kayla Total Confidence: {conf['total_score']}% ({conf['tier']})")
    print(f"  Research Score: {conf['breakdown']['research']['score']} / {conf['breakdown']['research']['max']}")
    print(f"  Product Alignment: {conf['breakdown']['product_alignment']['score']} / {conf['breakdown']['product_alignment']['max']}")
    print(f"  Completeness: {conf['breakdown']['completeness']['score']} / {conf['breakdown']['completeness']['max']}")
    print(f"  Recommendations count: {len(conf['recommendations'])}")

    print("\n--- 4. Testing AI Persona Proposer from Product ---")
    proposals = propose_personas_from_product(product["id"])
    assert len(proposals) >= 2, "AI proposer should return at least 2 candidate profiles"
    print(f"Proposed: {proposals[0]['name']} ({proposals[0]['archetype']})")
    print(f"Proposed Quote: \"{proposals[0]['quote']}\"")

    print("\n--- 5. Testing AI Inconsistency Suggestions & Auto-Apply ---")
    suggs = analyze_and_suggest_changes(kayla_id)
    print(f"Pending Suggestions for Kayla: {len(suggs)}")
    if suggs:
        s = suggs[0]
        print(f"  Suggestion: {s['title']} -> {s['reason']}")
        ok = apply_suggestion_to_persona(s["id"])
        print(f"  Applied suggestion successfully: {ok}")
        # Verify persona was updated
        updated_kayla = get_persona(kayla_id)
        print(f"  Kayla updated goals/frustrations count: {len(updated_kayla['goals'])} goals, {len(updated_kayla['frustrations'])} frustrations")

    print("\n--- 6. Testing Adding User Research Entry & Live Confidence Evolution ---")
    initial_score = calculate_confidence(kayla_id)["total_score"]
    new_research = save_research_entry({
        "product_id": product["id"],
        "persona_id": kayla_id,
        "participant_name": "Jordan Lee",
        "participant_role": "Director of Product Management",
        "session_date": "2026-10-10",
        "session_type": "1-on-1 Interview",
        "quotes": [
            "We lose weeks of dev time every quarter when mockups are built on hypothetical user personas.",
            "I need our junior PMs to link every user story back to real interview evidence."
        ],
        "observed_behaviors": ["Audited Jira backlog for customer quote references."],
        "validated_pain_points": ["Unvalidated assumptions leading to reworked sprints"],
        "validation_status": "confirmed",
        "notes": "Added during automated validation test"
    })
    new_conf = calculate_confidence(kayla_id)
    print(f"Confidence Before: {initial_score}% -> After New Research: {new_conf['total_score']}%")
    print(f"Quotes count now: {new_conf['breakdown']['research']['quotes_count']}")
    assert new_conf["breakdown"]["research"]["quotes_count"] > conf["breakdown"]["research"]["quotes_count"], "Research quotes should increase"

    print("\n============================================================")
    print(" ALL SYSTEM TESTS PASSED SUCCESSFULLY! ")
    print("============================================================")

if __name__ == "__main__":
    run_tests()
