# [Project Name] - Exercise [N]: Information Architecture Spec (`InformationArchSpec.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file documents the **structure of a digital product**: which screens exist, how they connect, what each one is for, how key screens are laid out and what the user sees in each state.

**How an LLM should use this file**

1. Treat the sitemap in section 1 as the complete list of screens: every screen and every navigation target you design is one listed there.
2. Use the screen cards in section 2 for each screen's goal, main action, content and navigation.
3. Use the layout tables in section 3 and the states in section 4 to design the detail of key screens.
4. The **Rules** in section 5 override any other interpretation of this file.

*(Keep answers brief. Replace every `[ ... ]`. Delete anything that doesn't apply.)*

---

## 1. Sitemap

- **Version**: [Version]
- **Owner**: [Owner]
- **Last updated**: [Date]
- **Entry Point (where a new user lands first)**: [Screen ID]

List every screen. Indent a screen under the one it opens from. Give each a short CAPS ID. Mark popups and overlays with `(popup)`.

````markdown
[ID] - [Screen name]
  [ID] - [Screen name]
    [ID] - [Screen name]
    [ID] - [Screen name] (popup)
````

---

## 2. Screens

*(Copy this card for each screen.)*

### Screen: [Screen name] ([ID])

- **User's Goal**: [What the user wants to achieve on this screen]
- **Main Action (one button)**: [The single primary action]
- **Secondary Actions**: [Other available actions]
- **Must-Have Content**: [Content 1], [Content 2], [Content 3]
- **Comes From**: [Screen ID]
- **Goes Next To**: [Screen ID] (via [action or control])
- **Back Goes To**: [Screen ID]
- **Risky Actions Needing Confirmation**: [Action, or "None"]

---

## 3. Layout of Key Screens

*(Copy this block for each screen where layout matters.)*

### Layout: [Screen name] ([ID])

| Area | Position | Size | Contents |
| --- | --- | --- | --- |
| Top bar | Top | Full width | [Contents] |
| Main area | [Position] | [ % ] | [Contents] |
| Side panel | [Position] | [ % ] | [Contents] |
| Bottom bar | Bottom | Full width | [Contents] |

- **Behavior on Mobile**: [How the layout adapts]
- **Main Action Visible Without Scrolling**: [Yes / No]

---

## 4. States

*(For each key screen, describe what the user sees.)*

| State | What the User Sees |
| --- | --- |
| Normal | [Description] |
| Empty / First use | [Description] |
| Loading | [Description] |
| Error | [Description] |

---

## 5. Non-Negotiable Rules

Things that must stay true in any design of this product.

- [Rule 1: e.g., Total price is always visible in the cart]
- [Rule 2]
- [Rule 3]

---

## 6. Open Questions

- [Question 1]
- [Question 2]

---

## 7. Checklist

- [ ] Every screen in the sitemap has a card
- [ ] Every screen has one main action
- [ ] Every screen has a back target
- [ ] The entry point is named
- [ ] Key screens have all four states

---

## Example (Coffee Ordering App)

````markdown
HOME - Home
  MENU - Menu
    DRINK - Drink details
      CART - Cart
        CHECKOUT - Checkout
        PROMO - Promo code (popup)
````

### Screen: Cart (CART)

- **User's Goal**: Review the order and pay
- **Main Action (one button)**: Checkout
- **Must-Have Content**: Items, total price, pickup time
- **Comes From**: DRINK
- **Goes Next To**: CHECKOUT (via Checkout button)
- **Back Goes To**: DRINK

**Rule**: Total price is always visible in the cart.
