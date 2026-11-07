# CART: Cart (example)

> [!info] Screen at a glance
> - **Screen ID:** `CART`, the same ID as its screen card, its Figma Section and its file name.
> - **Screen card:** the coffee example in [[Baseline/InformationArchSpec]]: goal "Review the order and pay", main action Checkout, content items + total + pickup time.
> - **Figma:** Section CART on the Screens page · Prototype *(an example: your specs link to your own file)*
> - **Flow:** step 4 of the happy path HOME → MENU → DRINK → CART. Comes from DRINK · goes to CHECKOUT

## 1. Overview

The last check before paying. People arrive from a drink they just added, scan what they ordered, confirm the pickup time and pay. They are often in a hurry, standing in a queue.

## 2. Layout

Mobile frame, 390 × 844. Top bar with back and title; a scrolling item list; a footer pinned to the bottom with pickup time, total and the Checkout button.

> [!tip] Why
> The total stays pinned because people check it before every change (house rule: "Total price is always visible in the cart").

## 3. Design tokens

| Token | Value | Used for |
| --- | --- | --- |
| `color/action/primary` | #047857 | Checkout button, "Browse the menu" link |
| `color/text/primary` | #1C1917 | Item names, total |
| `color/text/secondary` | #78716C | Item options, empty-state hint |
| `color/feedback/danger` | #DC2626 | Payment error banner |
| `space/4` | 16 | Screen padding, list rows |
| `heading/h1` | Inter 24 Bold | "Your order" |

## 4. Components

| Component | Variant | Content | Notes |
| --- | --- | --- | --- |
| Item row | default | Name, options, price | Options on a second line, `color/text/secondary` |
| Button | type=primary | "Checkout" / "Try again" | Full width, pill shape |
| Alert | type=error | Error message | Above the list |
| Skeleton | block | n/a | Pulses while loading |

## 5. States & interactions

### States

| State | Figma frame | What the user sees |
| --- | --- | --- |
| default | CART/default | Items, pickup time, total, Checkout |
| empty | CART/empty | Friendly message and a link back to the menu |
| loading | CART/loading | Grey pulsing blocks where the items and button will be |
| error | CART/error | Red banner above the same items, the button says "Try again" |

### Sample data

**default** and **error**

| Item | Options | Price |
| --- | --- | --- |
| Oat Flat White | Large · Extra shot | €4.20 |
| Almond Croissant | Warmed | €3.10 |

Pickup: Today, 08:45 · Total: €7.30

**empty**: 0 items, no total, no pickup time.
**error**: "Payment declined. Your card wasn't charged. Try another card." The card was refused at checkout; the cart keeps its items.

### Interactions and navigation

| Element | Trigger | What happens | Goes to |
| --- | --- | --- | --- |
| Checkout | Tap | Button shows a spinner until payment answers | CHECKOUT |
| Try again (error) | Tap | Same as Checkout, same items | CHECKOUT |
| Back arrow | Tap | Returns without losing the cart | DRINK |
| Browse the menu (empty) | Tap | Opens the menu | MENU |

> [!tip] Why
> The error keeps the items on screen, so a declined card never feels like a lost order.

## 6. Edge cases

- **Very long item name**: wraps to 2 lines, then "…"; the price never wraps.
- **Lots of items**: 30 items scroll; the footer with total and Checkout stays pinned.
- **Slow connection**: the loading state shows for up to 10 s, then the error banner "We couldn't load your cart. Pull to retry."
- **Item no longer available**: the row shows "Sold out" in `color/text/secondary` and is left out of the total.

## 7. Animation & motion

| What moves | Trigger | Animation | Duration / easing |
| --- | --- | --- | --- |
| Screen | Arrives from DRINK | Slides in from the right (Figma prototype: *Push*) | 300 ms ease-out |
| Skeleton blocks | Loading state | Pulse | 1.5 s loop |
| Error banner | Payment declined | Slides down from the top bar | 200 ms ease-out |

With *reduce motion* on: no slides, the screen and banner simply appear; the skeleton stays still.

## 8. Accessibility

- **Focus order**: back → items → total → Checkout.
- **Labels**: the back arrow is "Back to drink details".
- **Announcements**: the payment error is read out as soon as it appears; the loading area is marked busy.
- **Contrast and touch targets**: Checkout is 48 px high; muted options text passes 4.5:1 on white.

## Open questions

> [!question] Still undecided
> None for this example.
