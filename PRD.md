# 🌿 LEOSTARS — Hackathon PRD (24-Hour Sprint)
**India's First Plantation Truth Engine** | SDG 15 — Life on Land | v1.0 · Feb 2026

> *"Leostars doesn't verify plantations. It names the ones that lied — permanently, publicly, and without asking permission."*

---

## TL;DR

Leostars cross-checks plantation claims against satellite NDVI data, flags fraudulent sites as **Ghost Plantations**, and publishes results publicly — with no institution able to edit or suppress them.

| Field | Value |
|---|---|
| **Type** | Web + Mobile Responsive |
| **Build Window** | 24-Hour Sprint |
| **Stack** | React · Leaflet.js · Firebase · sites.json |
| **SDG** | 15 — Life on Land |

---

## Problem in 3 Lines

- India reports billions of trees planted yearly. **60–80% are dead within 6 months.** The number never changes.
- NASA/ESA/ISRO satellite vegetation data is freely available at 10m resolution. Nobody uses it to call out false reports.
- No platform currently takes a filed plantation claim → runs a satellite check → publishes the discrepancy with the institution's name. **Leostars does.**

---

## Hour-by-Hour Build Plan

| Hours | Task | Owner | Output |
|---|---|---|---|
| 0–1 | Repo setup, Firebase init, `sites.json` pre-load (10 sites) | Dev | Working data layer |
| 1–3 | Ghost Map — Leaflet.js, colour markers, marker tap → Site Report | Dev | Screen 1 live |
| 3–5 | Site Truth Report — NDVI display, before/after images, eco score | Dev | Screen 2 live |
| 5–6.5 | Register Plantation form — GPS capture, photo upload, Firestore save | Dev | Screen 3 live |
| 6.5–7.5 | Institution Leaderboard — table, truth%, colour rows | Dev | Screen 4 live |
| 7.5–9 | Whistle-blower Trigger — pin-drop map, photo upload, feed | Dev | Screen 5 live |
| 9–10.5 | Mobile responsive polish — all 5 screens, one-hand usable | Dev | Mobile pass |
| 10.5–11.5 | Offline fallback — ensure `sites.json` loads if Firebase fails | Dev | Demo-safe |
| 11.5–13 | Pre-download satellite images for 3 demo sites | Research | Before/after visuals ready |
| 13–15 | NDVI source citations for all 10 demo sites (NASA Worldview) | Research | Judge-proof numbers |
| 15–17 | QA — all 5 screens on mobile, test live registration flow | Both | Bug list |
| 17–20 | Bug fixes + edge cases | Dev | Stable build |
| 20–22 | Record backup demo video | Both | Stage safety net |
| 22–24 | Pitch deck, rehearsal, submit | Both | Final submission |

---

## MVP Feature Set (5 Screens)

### Priority Matrix

| Feature | Priority | Est. Time |
|---|---|---|
| Ghost Map — India view with verdict markers | **MUST HAVE** | 2 hrs |
| Site Truth Report — NDVI evidence display | **MUST HAVE** | 2 hrs |
| Register Plantation — GPS + photo + form | **MUST HAVE** | 1.5 hrs |
| Institution Leaderboard — claimed vs verified | **MUST HAVE** | 1 hr |
| Whistle-blower Trigger — pin drop + photo | **MUST HAVE** | 1 hr |
| Mobile responsive polish | **MUST HAVE** | 1.5 hrs |
| District Transparency Score | SHOULD HAVE | Post-MVP |
| Live NASA/ESA API integration | SHOULD HAVE | Post-MVP |
| Shareable public report URL | SHOULD HAVE | Post-MVP |
| WhatsApp share | COULD HAVE | Post-MVP |

---

## Screen Specs

### Screen 1 — Ghost Map `/`

```
┌──────────────────────────────────────────┐
│  🌿 LEOSTARS        ⚠️ 858 Ghost Sites   │
├──────────────────────────────────────────┤
│         [ INDIA MAP — LEAFLET.JS ]       │
│   🔴 Ghost  🟢 Verified  🟡 Monitoring  │
│                                     [+]  │
├──────────────────────────────────────────┤
│  🗺️ Map   📊 Leaderboard   🚨 Report    │
└──────────────────────────────────────────┘
```

**Acceptance Criteria:**
- Loads centred on India (lat 20.5, lng 78.9, zoom 5) within **2 seconds**
- 🔴 Red: NDVI delta < 0.05 after 30 days
- 🟢 Green: NDVI delta ≥ 0.15 after 30 days
- 🟡 Yellow: registered < 30 days ago
- Tap marker → `/site/:id`
- Tap `+` → `/register`

---

### Screen 2 — Site Truth Report `/site/:id`

```
┌──────────────────────────────────────────┐
│  ← Back                                  │
│  SRMIST Chennai · Tamil Nadu             │
│  ┌──────────────────────────────────┐    │
│  │  ⚠️  GHOST PLANTATION            │    │
│  └──────────────────────────────────┘    │
│   CLAIMED: 500     SATELLITE: ~40 (8%)   │
│  [Before: Feb 25]    [After: May 25]     │
│   NDVI 0.12  →  0.13  Δ +0.01 ▼         │
│   Eco-Health:  ████░░░░░░  4/100         │
│   Carbon Actual: 2.1 kg/yr               │
│   Carbon Claimed: 847 kg/yr              │
│   Registered: 18 Feb 2025 · Day 90       │
│         [ 🔗 Share This Report ]         │
└──────────────────────────────────────────┘
```

**Key fields:** institution name · verdict badge · claimed vs satellite count · before/after images with dates · NDVI before/after/delta · Eco-Health Score / 100 · carbon actual vs claimed · share button

---

### Screen 3 — Register Plantation `/register`

**Fields:** Institution Name* · GPS (auto-capture, fallback manual)* · Saplings Claimed* · Species (Neem / Peepal / Mango / Bamboo / Eucalyptus / Other) · Photo*

**On Submit:** Save to Firestore → yellow marker on map → confirmation with Site ID + "Satellite monitoring begins. Result published in 30 days."

---

### Screen 4 — Institution Leaderboard `/leaderboard`

**Columns:** Institution · Claimed · Verified · Truth% · Badge

**Rules:** Sort ascending by Truth% (worst first) · Row red < 40% · yellow 40–70% · green > 70% · Stat card: *"₹2,400 Crore in unverifiable plantation spending this year"* · Minimum 8 pre-loaded institutions

---

### Screen 5 — Whistle-blower Trigger `/report`

**Flow:** Tap map → drop pin → optional photo + text → submit → *"Satellite check within 24 hours. Result published publicly regardless of outcome."*

**Feed below form:** last 5 whistle-blower results (location · date · verdict)

---

## Core Logic

### Ghost Classification
```
NDVI delta = ndviAfter − ndviBefore

delta < 0.05 after 30 days  →  GHOST  🔴
delta ≥ 0.15 after 30 days  →  VERIFIED  🟢
days since registration < 30  →  MONITORING  🟡
```

### Eco-Health Score & Carbon
```
ecoHealthScore = clamp((ndviDelta / 0.40) × 100, 0, 100)
carbonActual  (kg/yr) = verifiedTreeCount × 21.77
carbonClaimed (kg/yr) = claimedTreeCount  × 21.77
```

### GPS Capture
```javascript
navigator.geolocation.getCurrentPosition(pos => {
  if (pos.coords.accuracy < 50) useCoords(pos);
  else fallbackToManualInput();
});
```

### Immutability Rule
Once a verdict is written to Firestore, `locked: true` is set on the record. No client UI exposes edit/delete on locked verdict fields. Publication is automatic.

---

## Data Layer

| Layer | Tool | Notes |
|---|---|---|
| Primary DB | Firebase Firestore | Sites, whistle-blower nominations |
| Photo storage | Firebase Storage | jpg/png only, max 5MB |
| Demo fallback | `sites.json` (local) | 10 pre-loaded sites with real NDVI values |
| Satellite images | Pre-downloaded PNG | NASA Worldview — 3 sites min |

**Demo Safety:** All 10 demo sites load from `sites.json` if Firestore is unavailable. Never demo without this fallback active.

---

## Non-Functional Requirements

| Requirement | Target |
|---|---|
| Ghost Map load time | < 2 seconds on 4G |
| Site Truth Report load | < 1.5 seconds |
| Minimum device | Android Chrome, 2GB RAM |
| One-hand usability | All flows on 5-inch screen |
| Max taps to key result | 3 taps |
| Photo upload validation | jpg/png, max 5MB |
| Contrast ratio | ≥ 4.5:1 all body text |
| Min font size | 14px |
| Marker accessibility | Text label on tap, not colour-only |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Geolocation blocked on demo device | Medium | High | 10 pre-loaded sites with hardcoded coords |
| Firebase quota hit during demo | Low | High | `sites.json` fallback always active |
| Satellite images missing | Medium | High | Pre-download before hackathon starts |
| NDVI numbers questioned by judges | Low | High | NASA Worldview source citations prepared |
| Judges unfamiliar with NDVI | Medium | Medium | Plain-language note on every NDVI display |
| Live form fails on stage | Medium | Medium | Pre-registered yellow site as backup |

---

## Demo Day Checklist

**Before going on stage:**
- [ ] `sites.json` loaded with ≥ 10 sites (≥ 5 red, ≥ 3 green)
- [ ] Ghost Map loads in < 2 seconds (test on mobile hotspot)
- [ ] Before/after satellite images load for 3 sites
- [ ] Leaderboard shows ≥ 8 institutions
- [ ] Live registration creates yellow marker successfully
- [ ] Whistle-blower form submits and shows in feed
- [ ] All 5 screens scroll without horizontal overflow on mobile
- [ ] Backup demo video recorded and accessible offline

---

## What's Out of Scope

Live NASA/ESA API calls · push notifications · user authentication · blockchain record locking · government DB integration · carbon credit marketplace · ML species ID from photos · regional language UI

---

## Post-Hackathon Roadmap (3 Months)

| Metric | Target |
|---|---|
| Plantation events registered | 500+ across 3 states |
| Ghost plantation reports published | 50+ with institution names |
| Districts with Transparency Score | 10+ |
| Media pickups of a ghost report | 1+ |
| Institutional corrections/retractions | 1+ |

---

## NDVI Quick Reference

| NDVI | Meaning |
|---|---|
| 0.00–0.10 | Bare soil / no vegetation |
| 0.10–0.20 | Dying or very sparse vegetation |
| 0.20–0.40 | Stressed / grassland |
| 0.40–0.60 | Moderate healthy vegetation |
| 0.60–0.80 | Dense healthy vegetation |
| 0.80–1.00 | Very dense tropical forest |

**For judges:** *"The satellite pipeline runs nightly via NASA MODIS API in production. For this demo, NDVI values were pre-computed from historical archives on NASA Worldview. Every number on screen is real NASA-derived data. The automation of this pipeline is what we built."*

---

*Leostars PRD v1.0 · 24-Hour Hackathon · SDG 15 · February 2026*