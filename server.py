import http.server
import json
import os
import urllib.parse
from datetime import datetime

from database import (
    init_db, get_product, save_product, get_product_docs, add_product_doc, delete_product_doc,
    get_personas, get_persona, save_persona, delete_persona,
    get_research_entries, save_research_entry, delete_research_entry,
    get_suggestions, update_suggestion_status, get_setting, set_setting
)
from confidence import calculate_confidence
from ai_engine import propose_personas_from_product, analyze_and_suggest_changes, apply_suggestion_to_persona

PORT = int(os.environ.get("PORT", 8080))
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")

class PersonaRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def end_headers(self):
        # Add CORS and no-cache headers for easy dev experience
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            return {}
        body = self.rfile.read(content_length).decode("utf-8")
        try:
            return json.loads(body)
        except Exception:
            return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # API Routes
        if path == "/api/product":
            prod = get_product()
            if prod:
                docs = get_product_docs(prod["id"])
                prod["docs"] = docs
            self.send_json(prod or {})
            return

        if path == "/api/personas":
            personas = get_personas()
            # Enrich each with its confidence score
            for p in personas:
                conf = calculate_confidence(p["id"])
                p["confidence_score"] = conf["total_score"] if conf else 0
                p["confidence_tier"] = conf["tier"] if conf else "Low"
                p["confidence_color"] = conf["tier_color"] if conf else "rose"
            self.send_json(personas)
            return

        if path.startswith("/api/personas/") and not path.endswith("/confidence") and not path.endswith("/suggestions"):
            try:
                persona_id = int(path.split("/")[3])
                p = get_persona(persona_id)
                if not p:
                    self.send_json({"error": "Persona not found"}, 404)
                    return
                conf = calculate_confidence(persona_id)
                p["confidence"] = conf
                p["suggestions"] = get_suggestions(persona_id)
                self.send_json(p)
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path.startswith("/api/personas/") and path.endswith("/confidence"):
            try:
                persona_id = int(path.split("/")[3])
                conf = calculate_confidence(persona_id)
                self.send_json(conf or {})
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path.startswith("/api/personas/") and path.endswith("/suggestions"):
            try:
                persona_id = int(path.split("/")[3])
                suggs = get_suggestions(persona_id)
                self.send_json(suggs)
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path == "/api/research":
            product_id = int(query.get("product_id", [1])[0]) if "product_id" in query else None
            persona_id = int(query.get("persona_id")[0]) if "persona_id" in query else None
            entries = get_research_entries(product_id=product_id, persona_id=persona_id)
            self.send_json(entries)
            return

        if path == "/api/settings":
            self.send_json({
                "has_gemini_key": bool(get_setting("GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY"))
            })
            return

        # Fallback to static files
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self.read_json_body()

        if path == "/api/product":
            updated = save_product(body)
            self.send_json(updated)
            return

        if path == "/api/product/docs":
            product_id = body.get("product_id", 1)
            title = body.get("title", "Untitled Spec")
            doc_type = body.get("doc_type", "PRD")
            content = body.get("content", "")
            doc = add_product_doc(product_id, title, doc_type, content)
            self.send_json(doc)
            return

        if path == "/api/personas":
            saved = save_persona(body)
            # Run initial suggestions analysis
            analyze_and_suggest_changes(saved["id"])
            self.send_json(saved)
            return

        if path == "/api/ai/propose":
            product_id = body.get("product_id", 1)
            proposals = propose_personas_from_product(product_id)
            self.send_json(proposals)
            return

        if path.startswith("/api/ai/analyze/"):
            try:
                persona_id = int(path.split("/")[4])
                suggs = analyze_and_suggest_changes(persona_id)
                self.send_json(suggs)
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path.startswith("/api/suggestions/") and path.endswith("/apply"):
            try:
                suggestion_id = int(path.split("/")[3])
                ok = apply_suggestion_to_persona(suggestion_id)
                self.send_json({"success": ok})
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path.startswith("/api/suggestions/") and path.endswith("/dismiss"):
            try:
                suggestion_id = int(path.split("/")[3])
                ok = update_suggestion_status(suggestion_id, "dismissed")
                self.send_json({"success": ok})
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path == "/api/research":
            saved = save_research_entry(body)
            # When research is added or linked, re-evaluate suggestions for linked persona
            if saved.get("persona_id"):
                analyze_and_suggest_changes(saved["persona_id"])
            self.send_json(saved)
            return

        if path == "/api/settings":
            if "gemini_api_key" in body:
                set_setting("GEMINI_API_KEY", body["gemini_api_key"].strip())
            self.send_json({"success": True})
            return

        self.send_json({"error": "Endpoint not found"}, 404)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/personas/"):
            try:
                persona_id = int(path.split("/")[3])
                ok = delete_persona(persona_id)
                self.send_json({"success": ok})
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path.startswith("/api/research/"):
            try:
                entry_id = int(path.split("/")[3])
                ok = delete_research_entry(entry_id)
                self.send_json({"success": ok})
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        if path.startswith("/api/product/docs/"):
            try:
                doc_id = int(path.split("/")[4])
                ok = delete_product_doc(doc_id)
                self.send_json({"success": ok})
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
                return

        self.send_json({"error": "Endpoint not found"}, 404)

def run():
    init_db()
    # Check if empty, seed if needed
    if not get_product():
        import seed_data
        seed_data.seed()

    server = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), PersonaRequestHandler)
    print(f"============================================================")
    print(f" Universe User Persona System is LIVE on http://localhost:{PORT}")
    print(f"============================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__ == "__main__":
    run()
