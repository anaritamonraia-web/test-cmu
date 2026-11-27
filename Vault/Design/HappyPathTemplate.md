# Happy path: [Flow name]

Figma handoff page: https://www.figma.com/design/0gB0Yp1N8C2HQyP6BYy326/CMU-Pets?node-id=433-97

## Context

buddy helps an owner report a missing pet, review possible matches and contact a finder. The main documented example is the guest flow for Luna; member reporting and a sighting of Max are separate examples shown on the same Figma page.

## Flows

| Step | Screen                       | What the user does                              | Goes to |
| ---- | ---------------------------- | ----------------------------------------------- | ------- |
| 1    | Home                         | Select “Lost & Found” (“Report or find”)        | 2       |
| 2    | Lost & Found                 | Select “I lost my pet”                          | 3       |
| 3    | Report submitted · searching | See submission confirmation and search progress | End     |

## Data overview

- *Owner input:* photo, animal type, pet name, distinguishing features, last-seen location and time, microchip/collar details and optional phone/email. Animal, name and when are marked required on the guest form; full validation rules are not specified.
- *AI assistance:* the UI offers photo recognition and voice/text entry to help fill the form. Proposed details must be reviewed. The location-clarification screen explicitly says that “The train station” is not yet confirmed and offers a point or approximate area.
- *Member data:* the UI says the pet’s name, photo, chip and home area come from a saved profile. Max’s member example also shows saved special features and contact. Home area is labelled private.
- *Search results:* Luna’s submitted-report example says 18 found-pet reports were compared in Lisbon. The possible-match example shows one result, 88% confidence, appearance/location/time reasons and an unverified chip/collar detail. These are example values, not specified matching thresholds or a live-data contract.
- *Maps and nearby care:* screens show report locations, sightings, search areas, distances and vet details. Maps carry OpenStreetMap attribution. Data providers, APIs, routing services and search-area calculations are not specified.
- *Privacy:* the form states photo, description and area are public; contact stays private until the user chooses to share it. The match screen says confirmation opens a private chat while phone numbers and addresses remain hidden.
- *Missing or slow data:* search progress and no-match states are shown. API names, response schemas, timeout behavior, retries, storage and notification delivery are not specified.

## Edge cases and acceptance criteria

- A guest can report without creating an account. Phone/email is optional; the UI says owners without contact can still check maps and reports themselves.
- Show the initial and populated report states, with the displayed required markers and editable details. Do not silently treat AI suggestions as confirmed facts.
- For an ambiguous last-seen location, show clarification options. The displayed state has no selection and says to select a place or mark the map before continuing; an approximate area is allowed. “Not sure” is visible, but its result is unspecified.
- After submission, show the report summary and search-progress state. A no-match outcome must remain distinct from a possible-match outcome; the displayed match is a possibility for the owner to review.
- The match screen offers both “Yes, it’s Luna” and “No, not my pet”. The destination after rejection is not shown.
- Confirming the Luna match leads conceptually to the shown found/reunion-guidance state. Display its private-chat action, public-meeting/vet advice, proof-of-ownership advice and location timeline. Do not claim a physical reunion has happened.
- Keep the member Max example separate from the guest Luna example. Signed-in screens omit “Create account”; sign-in is simulated in this prototype.
- A sighting is not a recovered pet: the Max sighting screen says nobody took him in. Its next state shows where to search and nearby vets, rather than marking him found.
- The no-match screen offers sharing and printing; the displayed poster prompt asks for the owner’s name and phone. Do not extend that requirement to report submission.
- Error states for uploads, voice recognition, location permissions, search/network failures and expired sessions are not shown. No behavior is prescribed for them here.

## Open questions

- Confirm the intended screen transitions, especially the populated form → optional contact prompt → location clarification → submission sequence. The clarification example displays “0 of 9 details confirmed” despite the prior populated form; should existing details carry over?
- Which fields are mandatory for submission beyond the visible required markers? Can users proceed without a photo or confirmed location, and what does “Not sure” do?
- What happens after rejecting a match, and how does the private chat open for a guest without contact details or an account?
- How do member screens 13 and 12b connect, and what submitted-report/search state follows Max’s report?
- How are later matches and sightings delivered? What happens when contact is skipped, and how does an owner return to their report?
- Which APIs supply reports, profiles, matching results, maps and nearby vets? Specify matching logic, refresh timing and loading/error recovery before implementation.
- What are the destinations and behavior of Share post, Print poster, Add contact, Edit my report, Directions, Message them, Call and I’m going there?
- How is a report corrected, closed or reopened after confirmation? The design marks Luna found but does not show these lifecycle controls.
