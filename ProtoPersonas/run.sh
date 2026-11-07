#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "============================================================"
echo " Starting Universe User Persona Intelligence System..."
echo "============================================================"

# Seed data if database does not exist
python3 -c "
import database, seed_data
database.init_db()
if not database.get_product():
    seed_data.seed()
"

echo "Launching web server on http://localhost:8080 ..."
python3 server.py
