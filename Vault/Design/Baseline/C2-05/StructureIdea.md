# [Project Name] - Exercise 1: System Mechanics Spec (`StructureIdea.md`)

## 1. Problem Statement

-- **User Friction:** Owners of lost pets have no fast, reliable way to see where their pet might be, and people who find a stray don't know how to report it or reach the owner. The information is scattered across separate channels.
- **Target Outcome:** Reunite lost pets with their owners quickly and safely, by letting owners track their pet and letting finders report and share sightings.

## 2. Low-Fidelity Interaction Breadboard

![[Attach photo of hand sketch here]]

- **Step 1 (Map):**
    - User sees a map with pins, each one representing a pet profile. A vertical bar sits beside the map with the Filters control, a Notifs icon and a Profile icon.
    - User can select a pin, which opens that pet's profile (Step 4).
    - User can open Filters (Step 2), open Notifs (Step 3) or open Profile (Step 4).
- **Step 2 (Filters):**
    - User sees the filter options:
        - Pet shops
        - Vets
        - NGOs
        - Animals
        - Pet types
    - User can select or deselect options, and the map updates accordingly.
    - User can close Filters to go back to the Map (Step 1).
- **Step 3 (Notifications):**
    - User sees a list of alerts:
        - New close match
        - New person shared link
        - Pet found close to you
    - User can select a notification, which opens the related pet's profile (Step 4).
    - User can go back to the Map (Step 1).
- **Step 4 (Profile):**
    - User sees the pet's information, in this order:
        - Updates on pet
        - Predicted location
        - Timeline
    - User can go back to the Map (Step 1).

## 3. Non-Negotiable System Mechanics

- Filters must update the map without the user leaving the map view.
- Every pin on the map must lead to a pet profile.
- Notifications must take the user straight to the relevant pet profile.
- Profile information must always follow the same order: updates, predicted location, timeline.
