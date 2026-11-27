"""Lost & Found Pets · does a found pet match a lost report?

When someone finds a pet, this rule decides what the owner of a lost pet sees:
"match" (go and look now), "maybe" (worth a look) or "no".
A wrong "match" gives false hope; a missed match keeps a pet from home.

Press ▶ Run in the Terminal tab to see six real reports.
Then ask the AI agent to change a knob or try a new idea, and run it again.
"""

# ── Knobs: the numbers that shape this rule. Ask the AI agent to change them ──
COLOUR_POINTS = 2        # same colour
LOOKALIKE_POINTS = 1     # colours that look alike in photos
LOOKALIKE = [{"white", "cream"}, {"black", "dark grey"}, {"brown", "ginger"}]
NEAR_KM = 2.0            # found within this distance of where it was lost
CAT_NEAR_KM = 6.0        # cats wander further, so "nearby" reaches further for them
NEAR_POINTS = 2
SIZE_POINTS = 1          # same size (small, medium, large)
MATCH_AT = 4             # this many points or more: "match"
MAYBE_AT = 2             # this many points or more: "maybe"
MAX_DAYS_APART = 14      # found later than this: too late to suggest


# ── The rule ───────────────────────────────────────────────────────────────
def clues(lost, found):
    """The points each clue gives, as (clue, points)."""
    points = []
    if lost["colour"] == found["colour"]:
        points.append(("same colour", COLOUR_POINTS))
    elif {lost["colour"], found["colour"]} in LOOKALIKE:
        points.append(("look-alike colour", LOOKALIKE_POINTS))
    near_km = CAT_NEAR_KM if lost["species"] == "cat" else NEAR_KM
    if abs(lost["km"] - found["km"]) <= near_km:
        points.append(("nearby", NEAR_POINTS))
    if lost["size"] == found["size"]:
        points.append(("same size", SIZE_POINTS))
    return points


def match(lost, found):
    """'match', 'maybe' or 'no'."""
    if lost["species"] != found["species"]:
        return "no"
    if found["day"] < lost["day"] or found["day"] - lost["day"] > MAX_DAYS_APART:
        return "no"
    score = sum(points for _, points in clues(lost, found))
    if score >= MATCH_AT:
        return "match"
    if score >= MAYBE_AT:
        return "maybe"
    return "no"


def why(lost, found):
    """The one sentence the owner sees."""
    if lost["species"] != found["species"]:
        return f"A {found['species']} was found, but you lost a {lost['species']}."
    if found["day"] < lost["day"]:
        return "It was found before yours went missing."
    if found["day"] - lost["day"] > MAX_DAYS_APART:
        return f"Found {found['day'] - lost['day']} days later, more than {MAX_DAYS_APART} days apart."
    points = clues(lost, found)
    score = sum(p for _, p in points)
    parts = " + ".join(f"{name} {p}" for name, p in points) or "no clues"
    return f"{parts} = {score} points (match from {MATCH_AT}, maybe from {MAYBE_AT})."


def pet(species, colour, size, km, day):
    return {"species": species, "colour": colour, "size": size, "km": km, "day": day}


# ── Six real reports, and what the team expects ────────────────────────────
#   (km = distance from Lisbon centre, day = day number)
SCENARIOS = [
    (pet("dog", "black", "medium", 2.0, 1), pet("dog", "black", "medium", 2.4, 2), "match", "Same dog, nearby, the next day"),
    (pet("dog", "black", "medium", 2.0, 1), pet("cat", "black", "small", 2.1, 1), "no", "A different animal"),
    (pet("cat", "grey", "small", 3.0, 1), pet("cat", "grey", "small", 9.0, 2), "maybe", "Cats wander, so don't rule it out"),
    (pet("dog", "white", "medium", 4.0, 3), pet("dog", "cream", "small", 4.3, 3), "maybe", "Looks alike in a photo, worth a look"),
    (pet("dog", "brown", "large", 1.0, 1), pet("dog", "brown", "large", 1.2, 40), "no", "Found weeks later: too late"),
    (pet("cat", "black", "small", 2.0, 5), pet("cat", "black", "small", 2.2, 3), "no", "Found before it was lost"),
]


def show():
    print("Lost & Found Pets · six reports\n")
    holding = 0
    for lost, found, expected, label in SCENARIOS:
        answer = match(lost, found)
        ok = answer == expected
        holding += ok
        print(f"{'✓' if ok else '✗'}  {answer:<6} {label}  (expected {expected})")
        print(f"          {why(lost, found)}")
    print(f"\n{holding}/{len(SCENARIOS)} expectations hold.", end=" ")
    if holding == len(SCENARIOS):
        print("Ask the AI agent to change a knob or try an idea, then press ▶ Run again.")
    else:
        print("Is the rule wrong, or the expectation?")


if __name__ == "__main__":
    show()
