import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "personas.db")

def get_connection():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        tagline TEXT,
        description TEXT,
        target_market TEXT,
        value_proposition TEXT,
        key_features TEXT, -- JSON array
        business_goals TEXT, -- JSON array
        created_at TEXT,
        updated_at TEXT
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS product_docs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        doc_type TEXT DEFAULT 'PRD',
        content TEXT NOT NULL,
        created_at TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS personas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        archetype TEXT NOT NULL,
        quote TEXT,
        avatar_url TEXT,
        theme_color TEXT DEFAULT 'amber',
        age INTEGER,
        occupation TEXT,
        location TEXT,
        education TEXT,
        family_status TEXT,
        tech_savviness INTEGER DEFAULT 3,
        bio TEXT,
        day_in_life TEXT,
        goals TEXT, -- JSON array
        frustrations TEXT, -- JSON array
        motivations TEXT, -- JSON object: {"growth": 80, "efficiency": 90, ...}
        personality_traits TEXT, -- JSON object: {"introvert_extrovert": 40, ...}
        preferred_tools TEXT, -- JSON array
        preferred_brands TEXT, -- JSON array
        is_ai_generated INTEGER DEFAULT 0,
        created_at TEXT,
        updated_at TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS research_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        persona_id INTEGER,
        participant_name TEXT NOT NULL,
        participant_role TEXT,
        session_date TEXT,
        session_type TEXT DEFAULT 'Interview',
        quotes TEXT, -- JSON array
        observed_behaviors TEXT, -- JSON array
        validated_pain_points TEXT, -- JSON array
        validation_status TEXT DEFAULT 'confirmed',
        notes TEXT,
        created_at TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE SET NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS persona_suggestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        persona_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        reason TEXT NOT NULL,
        category TEXT DEFAULT 'product_alignment',
        suggested_action TEXT,
        payload TEXT, -- JSON
        status TEXT DEFAULT 'pending',
        created_at TEXT,
        FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS app_settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );
    """)

    conn.commit()
    conn.close()

# Product Operations
def get_product(product_id=None):
    conn = get_connection()
    cursor = conn.cursor()
    if product_id:
        cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
        row = cursor.fetchone()
    else:
        cursor.execute("SELECT * FROM products ORDER BY id ASC LIMIT 1")
        row = cursor.fetchone()
    conn.close()
    if row:
        return dict_from_product_row(row)
    return None

def save_product(data):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    product_id = data.get("id")

    features_json = json.dumps(data.get("key_features", []))
    goals_json = json.dumps(data.get("business_goals", []))

    if product_id:
        cursor.execute("""
        UPDATE products SET
            name = ?, tagline = ?, description = ?, target_market = ?,
            value_proposition = ?, key_features = ?, business_goals = ?, updated_at = ?
        WHERE id = ?
        """, (
            data.get("name", "My Product"),
            data.get("tagline", ""),
            data.get("description", ""),
            data.get("target_market", ""),
            data.get("value_proposition", ""),
            features_json,
            goals_json,
            now,
            product_id
        ))
    else:
        cursor.execute("""
        INSERT INTO products (name, tagline, description, target_market, value_proposition, key_features, business_goals, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("name", "My Product"),
            data.get("tagline", ""),
            data.get("description", ""),
            data.get("target_market", ""),
            data.get("value_proposition", ""),
            features_json,
            goals_json,
            now,
            now
        ))
        product_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return get_product(product_id)

def get_product_docs(product_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM product_docs WHERE product_id = ? ORDER BY id DESC", (product_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def add_product_doc(product_id, title, doc_type, content):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    cursor.execute("""
    INSERT INTO product_docs (product_id, title, doc_type, content, created_at)
    VALUES (?, ?, ?, ?, ?)
    """, (product_id, title, doc_type, content, now))
    doc_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"id": doc_id, "product_id": product_id, "title": title, "doc_type": doc_type, "content": content, "created_at": now}

def delete_product_doc(doc_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM product_docs WHERE id = ?", (doc_id,))
    conn.commit()
    conn.close()
    return True

# Persona Operations
def get_personas(product_id=None):
    conn = get_connection()
    cursor = conn.cursor()
    if product_id:
        cursor.execute("SELECT * FROM personas WHERE product_id = ? ORDER BY id ASC", (product_id,))
    else:
        cursor.execute("SELECT * FROM personas ORDER BY id ASC")
    rows = cursor.fetchall()
    conn.close()
    return [dict_from_persona_row(r) for r in rows]

def get_persona(persona_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM personas WHERE id = ?", (persona_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict_from_persona_row(row)
    return None

def save_persona(data):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    persona_id = data.get("id")

    goals_json = json.dumps(data.get("goals", []))
    frustrations_json = json.dumps(data.get("frustrations", []))
    motivations_json = json.dumps(data.get("motivations", {
        "growth": 70, "efficiency": 80, "social": 50, "autonomy": 65
    }))
    traits_json = json.dumps(data.get("personality_traits", {
        "introvert_extrovert": 50,
        "analytical_creative": 50,
        "spontaneous_structured": 50,
        "cautious_innovator": 50
    }))
    tools_json = json.dumps(data.get("preferred_tools", []))
    brands_json = json.dumps(data.get("preferred_brands", []))

    if persona_id:
        cursor.execute("""
        UPDATE personas SET
            name = ?, archetype = ?, quote = ?, avatar_url = ?, theme_color = ?,
            age = ?, occupation = ?, location = ?, education = ?, family_status = ?,
            tech_savviness = ?, bio = ?, day_in_life = ?, goals = ?, frustrations = ?,
            motivations = ?, personality_traits = ?, preferred_tools = ?, preferred_brands = ?,
            updated_at = ?
        WHERE id = ?
        """, (
            data.get("name", "New Persona"),
            data.get("archetype", "Archetype"),
            data.get("quote", ""),
            data.get("avatar_url", ""),
            data.get("theme_color", "amber"),
            data.get("age", 30),
            data.get("occupation", ""),
            data.get("location", ""),
            data.get("education", ""),
            data.get("family_status", ""),
            data.get("tech_savviness", 3),
            data.get("bio", ""),
            data.get("day_in_life", ""),
            goals_json,
            frustrations_json,
            motivations_json,
            traits_json,
            tools_json,
            brands_json,
            now,
            persona_id
        ))
    else:
        cursor.execute("""
        INSERT INTO personas (
            product_id, name, archetype, quote, avatar_url, theme_color,
            age, occupation, location, education, family_status, tech_savviness,
            bio, day_in_life, goals, frustrations, motivations, personality_traits,
            preferred_tools, preferred_brands, is_ai_generated, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("product_id", 1),
            data.get("name", "New Persona"),
            data.get("archetype", "Archetype"),
            data.get("quote", ""),
            data.get("avatar_url", ""),
            data.get("theme_color", "amber"),
            data.get("age", 30),
            data.get("occupation", ""),
            data.get("location", ""),
            data.get("education", ""),
            data.get("family_status", ""),
            data.get("tech_savviness", 3),
            data.get("bio", ""),
            data.get("day_in_life", ""),
            goals_json,
            frustrations_json,
            motivations_json,
            traits_json,
            tools_json,
            brands_json,
            1 if data.get("is_ai_generated") else 0,
            now,
            now
        ))
        persona_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return get_persona(persona_id)

def delete_persona(persona_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM personas WHERE id = ?", (persona_id,))
    cursor.execute("DELETE FROM persona_suggestions WHERE persona_id = ?", (persona_id,))
    conn.commit()
    conn.close()
    return True

# Research Operations
def get_research_entries(product_id=None, persona_id=None):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM research_entries WHERE 1=1"
    params = []
    if product_id:
        query += " AND product_id = ?"
        params.append(product_id)
    if persona_id:
        query += " AND persona_id = ?"
        params.append(persona_id)
    query += " ORDER BY id DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return [dict_from_research_row(r) for r in rows]

def save_research_entry(data):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    entry_id = data.get("id")

    quotes_json = json.dumps(data.get("quotes", []))
    behaviors_json = json.dumps(data.get("observed_behaviors", []))
    pain_points_json = json.dumps(data.get("validated_pain_points", []))

    if entry_id:
        cursor.execute("""
        UPDATE research_entries SET
            persona_id = ?, participant_name = ?, participant_role = ?,
            session_date = ?, session_type = ?, quotes = ?, observed_behaviors = ?,
            validated_pain_points = ?, validation_status = ?, notes = ?
        WHERE id = ?
        """, (
            data.get("persona_id"),
            data.get("participant_name", "Anonymous"),
            data.get("participant_role", ""),
            data.get("session_date", now[:10]),
            data.get("session_type", "Interview"),
            quotes_json,
            behaviors_json,
            pain_points_json,
            data.get("validation_status", "confirmed"),
            data.get("notes", ""),
            entry_id
        ))
    else:
        cursor.execute("""
        INSERT INTO research_entries (
            product_id, persona_id, participant_name, participant_role,
            session_date, session_type, quotes, observed_behaviors,
            validated_pain_points, validation_status, notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("product_id", 1),
            data.get("persona_id"),
            data.get("participant_name", "Anonymous"),
            data.get("participant_role", ""),
            data.get("session_date", now[:10]),
            data.get("session_type", "Interview"),
            quotes_json,
            behaviors_json,
            pain_points_json,
            data.get("validation_status", "confirmed"),
            data.get("notes", ""),
            now
        ))
        entry_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return get_research_entry(entry_id)

def get_research_entry(entry_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM research_entries WHERE id = ?", (entry_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict_from_research_row(row)
    return None

def delete_research_entry(entry_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM research_entries WHERE id = ?", (entry_id,))
    conn.commit()
    conn.close()
    return True

# Suggestion Operations
def get_suggestions(persona_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM persona_suggestions WHERE persona_id = ? AND status = 'pending' ORDER BY id DESC", (persona_id,))
    rows = cursor.fetchall()
    conn.close()
    results = []
    for r in rows:
        d = dict(r)
        if d.get("payload"):
            try:
                d["payload"] = json.loads(d["payload"])
            except Exception:
                pass
        results.append(d)
    return results

def add_suggestion(persona_id, title, reason, category, suggested_action, payload):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    payload_json = json.dumps(payload) if isinstance(payload, (dict, list)) else str(payload)
    cursor.execute("""
    INSERT INTO persona_suggestions (persona_id, title, reason, category, suggested_action, payload, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
    """, (persona_id, title, reason, category, suggested_action, payload_json, now))
    s_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return s_id

def update_suggestion_status(suggestion_id, status):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE persona_suggestions SET status = ? WHERE id = ?", (status, suggestion_id))
    conn.commit()
    conn.close()
    return True

# App Settings
def get_setting(key, default=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM app_settings WHERE key = ?", (key,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return row["value"]
    return default

def set_setting(key, value):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)", (key, str(value)))
    conn.commit()
    conn.close()
    return value

# Helpers to parse JSON fields
def dict_from_product_row(row):
    d = dict(row)
    for field in ["key_features", "business_goals"]:
        if d.get(field):
            try:
                d[field] = json.loads(d[field])
            except Exception:
                d[field] = []
        else:
            d[field] = []
    return d

def dict_from_persona_row(row):
    d = dict(row)
    for list_field in ["goals", "frustrations", "preferred_tools", "preferred_brands"]:
        if d.get(list_field):
            try:
                d[list_field] = json.loads(d[list_field])
            except Exception:
                d[list_field] = []
        else:
            d[list_field] = []
    
    for obj_field in ["motivations", "personality_traits"]:
        if d.get(obj_field):
            try:
                d[obj_field] = json.loads(d[obj_field])
            except Exception:
                d[obj_field] = {}
        else:
            d[obj_field] = {}
    return d

def dict_from_research_row(row):
    d = dict(row)
    for list_field in ["quotes", "observed_behaviors", "validated_pain_points"]:
        if d.get(list_field):
            try:
                d[list_field] = json.loads(d[list_field])
            except Exception:
                d[list_field] = []
        else:
            d[list_field] = []
    return d
