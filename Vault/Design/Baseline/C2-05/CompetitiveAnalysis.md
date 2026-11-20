> [!info] Who fills what
> - **The group**: §1 Project Context, §2 Competitors, every **SWOT** in §3 and §4 Key Lessons.
> - **AI**: only the three bullets of each competitor in §3 (interaction loop, UI patterns, friction). Leave every SWOT block empty: the group fills it.

## 1. Project Context

- **Market / Area**: Lost-pet search and nearby animal-support services.
- **Target Users**: Pet owners, finders and nearby helpers.
- **Target Platform**: Mobile interface; native versus web remains undecided.
- **Summary**: A map connecting pet reports, pet profiles, updates, notifications and nearby services.

---

## 2. Competitors (4)

### Direct Competitors

1. **[Petco Love Lost]**: [ Geographic search for lost and found pets, with filters and map/list views. ]
2. **[Lost Pet Radar]**: [ A beta service connecting map sightings, owner notices and local alerts. ]

### Indirect / Analogous Solutions

3. **[Waze]**: [ Geographic place search and community-created report]
4. **[Too Good To Go]**: [ Local offers discovered through map/list browsing and preference controls ]

---

## 3. Deep-Dive Audit

### Competitor 1: Petco Love Lost

- **Primary Interaction Loop**: The user chooses lost or found, uploads a pet photo and sets a location → the tool matches the photo against nearby reports → the user browses matches on the map or list → opens a pet profile → contacts the poster. If nothing matches, the user returns later and searches again.
- **Key UI Patterns & Mechanics**: Short report form (photo, species, location, date); photo matching; search radius with filters (species, lost/found, date); map/list toggle; pins that open profile cards; saved searches with alerts.
- **Friction & Cognitive Load Points**: Map and list are separate views, so the user loses where a pet is while reading its details. In dense areas pins pile into an unreadable cluster. A pin is a single point, not the pet's path or how recent the sighting is. Strong and weak photo matches look the same. Searching is mostly something the owner repeats by hand.

#### SWOT

> Draft by AI for the group to review and edit.

- **Strengths**: Free and backed by a large, well-known brand, so many reports are in one place. Photo matching reduces manual scanning. Map/list views and filters (species, lost/found, radius, date) make searching nearby simple.
- **Weaknesses**: Map and details are separate views. Pins are isolated points with no sense of path or recency. Match confidence isn't clear. The owner has to keep searching by hand, and nearby helpers have no light way to contribute.
- **Opportunities**: Linking sightings into a timeline or path. Showing match confidence openly. Proactive alerts when a new match or sighting appears. Connecting to nearby services (vets, shelters).
- **Threats**: Users may stay with an established, free platform. Local social groups (neighbourhood Facebook groups, Nextdoor) already act as the default channel. Photo-matching can produce false matches that erode trust.

### Competitor 2: Lost Pet Radar

- **Primary Interaction Loop**: The owner posts a notice (photo, description, last-seen place) → people nearby log sightings on the map → local alerts reach users within range → the owner checks the map for new sightings and follows them up.
- **Key UI Patterns & Mechanics**: One shared map mixing owner notices and community sightings; quick "I saw this pet" report; distance-based alerts; a radius showing the alert area.
- **Friction & Cognitive Load Points**: Sightings are unchecked, so the owner can't separate a real lead from a false one. Sightings aren't linked into a timeline or path; the owner has to work out the route alone. Too many alerts lead users to ignore them. As a beta, coverage may be thin, and an empty map tells the user nothing.

#### SWOT

> Draft by AI for the group to review and edit.

- **Strengths**: Built around community sightings and local alerts, which is close to how pets are actually found. A shared map connects owners and finders directly.
- **Weaknesses**: In beta with likely thin coverage, so the map can look empty. Sightings are unverified. Sightings aren't linked into a route. Alert volume can cause fatigue.
- **Opportunities**: Verification (helpers confirm or dismiss sightings). Ranking leads by freshness and reliability. Tuning alerts so only relevant ones reach each user.
- **Threats**: Without enough users, the network effect never starts. Spam or false sightings can damage trust quickly. Larger players could copy the sighting features.

### Competitor 3: Waze

- **Primary Interaction Loop**: The user opens the live map and drives → taps one button to report a hazard, police or traffic → other drivers are asked "Still there?" to confirm or clear it → the map updates for everyone and reports expire.
- **Key UI Patterns & Mechanics**: Full-screen map with a floating report button; a few large report categories; community confirmation that keeps reports fresh; reports that expire; status and points for contributors.
- **Friction & Cognitive Load Points**: Many icons and popups compete for attention. Reports pile up and clutter the map. Reporting has to be fast, so details are thin. Chasing points can encourage low-value reports.

#### SWOT

> Draft by AI for the group to review and edit.

- **Strengths**: A full-screen live map that's easy to read. One-tap reporting with few categories. Community confirmation ("Still there?") keeps reports fresh, and reports expire. Contributor status motivates participation.
- **Weaknesses**: The map gets crowded with icons and popups. Reports are thin because they must be quick. Gamification can reward volume over quality.
- **Opportunities**: Borrow one-tap sighting reports, confirm/clear prompts for nearby helpers, and automatic expiry so old sightings fade from the pet's path.
- **Threats**: Copying its density without its restraint could overload our map. Points-style motivation may feel wrong in an emotional, urgent context like a lost pet.

### Competitor 4: Too Good To Go

- **Primary Interaction Loop**: The user sets location and radius → browses nearby offers on the map or list → filters by type and pickup time → saves favourites → reserves and pays → picks up within a set time window. Notifications bring them back when favourites have new offers.
- **Key UI Patterns & Mechanics**: Map/list tabs; a bottom sheet rising from map pins; distance and time on each card; preference filters; favourites with alerts; availability that runs out (time window, limited stock).
- **Friction & Cognitive Load Points**: An offer can be gone by the time the user arrives, so what they saw was out of date. On the map, each pin must be opened to get any detail. Filters are hidden one level down. Urgency depends on notifications that are easy to miss.

#### SWOT

> Draft by AI for the group to review and edit.

- **Strengths**: Map and list browsing with a bottom sheet over pins keeps location visible. Distance and time sit on each card. Favourites and alerts bring users back. A clear time window creates urgency.
- **Weaknesses**: What the user sees can be out of date by the time they act. Pins must each be opened to get detail. Filters are hidden. Urgency relies on easy-to-miss notifications.
- **Opportunities**: Use the bottom-sheet-over-map pattern for pet profiles. Show "time since" on every card. Let helpers follow an area or a pet the way users follow favourites.
- **Threats**: Its browsing pattern is built for calm shopping, not distress; copied directly, it could feel casual for a missing pet. Users trained by such apps may expect data that's always current.

---

## 4. Key Lessons & Behavioral Directives for Our Design

Use the audit and the 4 SWOTs.

> Draft by AI for the group to review and edit. This section belongs to the group.

1. **Friction to Avoid**: The map and the details live in separate views. Petco Love Lost and Too Good To Go both make the user leave the map, or open pin after pin, to learn anything. We prohibit that: tapping a pin opens a bottom sheet over the map, so the pet's location stays visible while its details are read.
2. **Opportunity Gap**: Competitors show a missing pet as scattered, unranked points. Owners think of it as a trail: where the pet was last seen, where it was spotted since, and how long ago. We will join a pet's sightings into one timed path on the map, with older points faded, so the likely area to search is visible at a glance.
3. **Behavioral Rule**: Every sighting and every AI match on the map shows how fresh and how trustworthy it is (time since the sighting, and confirmed versus unconfirmed or the match confidence). Unconfirmed or low-confidence items never look the same as confirmed ones. When confidence is low, the screen shows the fallback state (H-04) instead of a confident answer. Like Waze's "Still there?", nearby helpers can confirm or dismiss a sighting, and stale sightings fade out of the path.
