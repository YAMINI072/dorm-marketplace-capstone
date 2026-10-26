# Dorm Marketplace — Design Direction

## Three initial approaches

### Theme Name: Campus Field Notes
Very Brief Intro: A tactile, editorial marketplace inspired by bulletin boards, library checkout cards, and dorm-room artifacts. It should feel warm, local, and trustworthy rather than like a generic classifieds site.
Probability: 0.07

### Theme Name: Midnight Noticeboard
Very Brief Intro: A dark, high-contrast campus utility with fluorescent wayfinding accents and dense operational status cues. It emphasizes urgency and real-time availability.
Probability: 0.04

### Theme Name: Freshman Commons
Very Brief Intro: An airy, optimistic interface using sunlit neutrals, friendly illustration, and soft campus colors. It makes listing and claiming feel approachable for first-time users.
Probability: 0.08

## Chosen approach: Campus Field Notes

### Design Movement
Contemporary editorial design with references to risograph print, library ephemera, and analog campus noticeboards.

### Core Principles
1. **Local before global:** Every screen should reinforce the campus-only, in-person nature of the marketplace.
2. **Evidence over decoration:** Status, expiry, location, and seller controls must be immediately legible.
3. **Tactile restraint:** Use paper-like surfaces, ink-like borders, and small registration details without turning the UI into a novelty prop.
4. **Operational warmth:** Safety and edge-case handling should feel calm and human, not punitive.

### Color Philosophy
A warm parchment base creates the feeling of a shared campus noticeboard. Ink navy supplies authority and readability, while a single marigold-orange accent marks actions and temporal urgency. Moss green is reserved for available/confirmed states, and brick red for seller overrides or expired claims. The palette is intentionally low-saturation so the product feels lived-in rather than overly polished or corporate.

### Layout Paradigm
Use a magazine-like split composition: a narrow persistent rail for product identity and operating rules, paired with a flexible content canvas for the marketplace. Listings should use an editorial two-column rhythm that can collapse into a stacked mobile feed. Avoid default centered hero layouts; let the rail and content edge create visual tension.

### Signature Elements
- A vertical “campus edition” rail with a stamped mark and short operating principles.
- Small monospaced metadata lines for dorm, timing, and claim state.
- Offset card edges and subtle paper grain suggesting pinned notices without reducing accessibility.

### Interaction Philosophy
Actions should explain consequences before they commit. Claiming an item shows the short hold window and pickup expectation; seller overrides ask for explicit confirmation; expired claims return inventory visibly. Toasts and banners should report state changes in plain language rather than generic success messages.

### Animation
Use short 160–220ms ease-out transitions for buttons, tabs, and status changes. Cards enter with a slight upward translate and opacity fade, staggered by 40ms. Claim and expiry state changes should use a brief border-color and background transition, never bouncing or scaling the content. Respect `prefers-reduced-motion` by removing nonessential movement.

### Typography System
Use **DM Serif Display** for major editorial headings and **IBM Plex Sans** for interface copy. Use **IBM Plex Mono** for prices, dorm labels, status metadata, and timers. Headings are compact and high-contrast; body copy stays at a comfortable 15–16px with 1.55 line height. Avoid all-caps for long phrases; use tracked uppercase only for tiny labels.

### Brand Essence
A campus-only exchange for students who want useful things to move quickly and safely between dorms. Personality: **resourceful, neighborly, grounded**.

### Brand Voice
Headlines are direct and slightly editorial. CTAs are specific about the next action. Microcopy names the rule or consequence instead of hiding it behind vague reassurance.

Example lines:
- “Good stuff, still on campus.”
- “Hold it for 10 minutes — confirm pickup before the timer runs out.”

### Wordmark & Logo
A compact symbol combining a dorm-room key tag with a folded paper notice: an angular “D” shape enclosing a small offset dot. The mark should work in one color at favicon size and in marigold ink on the application rail; the wordmark is set separately in DM Serif Display rather than baked into the mark.

### Signature Brand Color
**Noticeboard Marigold — #E6A83A.** It is warm enough to feel communal and bright enough to signal action without the visual aggression of pure yellow.

## Implementation reminders

- `client/src/App.tsx`: Preserve the editorial rail and route all interactions through one accessible home experience.
- `client/src/pages/Home.tsx`: Keep listing, claim, expiry, and seller override flows visible in the same operational canvas.
- `client/src/index.css`: Define the parchment/ink/marigold/moss system, typography imports, paper texture, responsive layout, and reduced-motion rules.
- `PRD.md`: Mirror the product’s intentional simplicity and document the three edge-case rules as acceptance-testable behavior.
