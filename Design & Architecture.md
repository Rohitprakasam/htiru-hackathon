# 🎨 LEOSTARS — Design & Architecture (24-Hour Sprint)
**India's First Plantation Truth Engine** | SDG 15 | v1.0 · Feb 2026

> *"The visual tone should make users feel they are accessing information that powerful institutions would prefer stayed hidden."*

---

## Design Laws (Read These First)

**Law 1 — Data is the hero.** Numbers are large. Verdicts are impossible to miss. No decoration competes with a data point.

**Law 2 — The verdict is a stamp, not a suggestion.** GHOST PLANTATION = all caps + monospace + colored background. A judge looking for 3 seconds must see it instantly.

**Law 3 — Trust is earned by showing sources.** Every NDVI number is labeled satellite-derived. Every image carries a date. This is evidence, not an estimate.

| Don't | Do |
|---|---|
| Soft greens, leaf illustrations | Deep forest green, stark white, hard red |
| "Together we can make a difference" | "GHOST PLANTATION — 492 trees missing" |
| Motivational progress bars | Confrontational verdict stamps |
| Gamified badges | Public institutional shame leaderboard |

---

## Color System

```javascript
// tailwind.config.js
colors: {
  brand:     { dark: '#1B5E20', DEFAULT: '#2E7D32', light: '#E8F5E9', mid: '#81C784' },
  ghost:     { DEFAULT: '#B71C1C', light: '#FFEBEE' },
  monitor:   { DEFAULT: '#E65100', light: '#FFF3E0' },
  satellite: { DEFAULT: '#0D47A1', light: '#E3F2FD' },
  // Body: #212121  Meta: #616161  Border: #E0E0E0  Surface: #F5F5F5
}
```

**Verdict → Color mapping:**

| Verdict | Background | Text |
|---|---|---|
| GHOST PLANTATION | `#B71C1C` | `#FFFFFF` |
| VERIFIED GREEN | `#1B5E20` | `#FFFFFF` |
| UNDER MONITORING | `#E65100` | `#FFFFFF` |

**Eco-Health Score → Color:**

| Score | Color |
|---|---|
| 0–20 | `#B71C1C` (Ghost territory) |
| 21–40 | `#E65100` (High risk) |
| 41–60 | `#F57F17` (Moderate) |
| 61–80 | `#2E7D32` (Healthy) |
| 81–100 | `#1B5E20` (Excellent) |

---

## Typography

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Element | Font | Size | Notes |
|---|---|---|---|
| Hero Numbers | Inter Bold | 64px | "858 Ghost Sites" — confrontational |
| Page Heading | Inter SemiBold | 24px | `#212121` only, never colored |
| Section Label | Inter SemiBold | 11px | UPPERCASE + letter-spacing 2px |
| Body Text | Inter Regular | 14px | `#212121`, line-height 1.6 |
| NDVI / Coords | JetBrains Mono | 16px | `#0D47A1` (satellite blue) |
| Verdict Badge | JetBrains Mono | 12px | UPPERCASE + letter-spacing 1px |
| Button Text | Inter SemiBold | 14px | White on dark bg |

**Rule:** Inter for all UI. JetBrains Mono for all data (NDVI values, coordinates, site IDs, verdict badges).

---

## Component Library

### `VerdictBadge.jsx`
```jsx
const STYLES = {
  GHOST:      { bg: 'bg-ghost',     icon: '⚠️', label: 'GHOST PLANTATION' },
  VERIFIED:   { bg: 'bg-brand-dark',icon: '✅', label: 'VERIFIED GREEN' },
  MONITORING: { bg: 'bg-monitor',   icon: '🔍', label: 'UNDER MONITORING' },
}

export default function VerdictBadge({ verdict, size = 'md' }) {
  const s = STYLES[verdict]
  return (
    <span className={`${s.bg} text-white font-mono font-medium tracking-wider uppercase rounded
      ${size === 'lg' ? 'text-sm px-4 py-2' : 'text-xs px-3 py-1'}`}>
      {s.icon} {s.label}
    </span>
  )
}
```

### `EcoScoreBar.jsx`
```jsx
const color = (s) => s<=20?'#B71C1C':s<=40?'#E65100':s<=60?'#F57F17':s<=80?'#2E7D32':'#1B5E20'

export default function EcoScoreBar({ score }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Eco-Health Score</span>
        <span className="text-lg font-bold font-mono" style={{ color: color(score) }}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-3">
        <div className="h-3 rounded transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color(score) }} />
      </div>
    </div>
  )
}
```

### `NdviCompare.jsx`
```jsx
export default function NdviCompare({ before, after }) {
  const delta = (after - before).toFixed(2)
  const isGhost = Math.abs(delta) < 0.05
  return (
    <div className="flex items-center gap-4 bg-satellite-light rounded-lg p-4">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">NDVI Before</p>
        <p className="text-3xl font-mono font-bold text-satellite">{before.toFixed(2)}</p>
      </div>
      <div className="text-center px-2">
        <p className={`text-2xl font-bold ${isGhost ? 'text-ghost' : 'text-brand'}`}>
          {delta > 0 ? '↑' : '↓'} {Math.abs(delta)}
        </p>
        {isGhost && <p className="text-xs text-ghost font-mono">No change</p>}
      </div>
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">NDVI After</p>
        <p className="text-3xl font-mono font-bold text-satellite">{after.toFixed(2)}</p>
      </div>
    </div>
  )
}
```
```
┌──────────────────────────────────────┐
│  NDVI Before    ↑ 0.01    NDVI After │
│     0.12      No change     0.13     │
│            ← ghost red →             │
└──────────────────────────────────────┘
```

### `StatCard.jsx`
```jsx
const COLOR = { dark:'text-gray-900', ghost:'text-ghost', green:'text-brand-dark',
                monitor:'text-monitor', blue:'text-satellite' }

export default function StatCard({ label, value, unit, color='dark', size='md' }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className={`font-bold font-mono ${COLOR[color]} ${size==='lg'?'text-5xl':'text-3xl'}`}>{value}</p>
      {unit && <p className="text-xs text-gray-400 mt-1 font-mono">{unit}</p>}
    </div>
  )
}
```

### `SatelliteImagePair.jsx`
```jsx
export default function SatelliteImagePair({ beforeSrc, afterSrc, beforeDate, afterDate }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[{ src: beforeSrc, date: beforeDate, dot: 'bg-ghost', label: 'BEFORE' },
        { src: afterSrc,  date: afterDate,  dot: 'bg-brand', label: 'AFTER'  }]
        .map(({ src, date, dot, label }) => (
          <div key={label}>
            <div className="bg-gray-900 rounded overflow-hidden aspect-square">
              <img src={src} alt={label} className="w-full h-full object-cover" />
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${dot} inline-block`} />
              <span className="text-xs font-mono text-gray-500">{label}  {date}</span>
            </div>
          </div>
        ))}
    </div>
  )
}
```

### `BottomNav.jsx`
```jsx
import { useNavigate, useLocation } from 'react-router-dom'

const ITEMS = [
  { icon: '🗺️', label: 'Map',         path: '/' },
  { icon: '📊', label: 'Leaderboard', path: '/leaderboard' },
  { icon: '🚨', label: 'Report',      path: '/report' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-[1000] h-16">
      {ITEMS.map(item => (
        <button key={item.path} onClick={() => navigate(item.path)}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-xs font-medium
            ${pathname === item.path ? 'text-brand-dark border-t-2 border-brand-dark' : 'text-gray-400'}`}>
          <span className="text-lg">{item.icon}</span>{item.label}
        </button>
      ))}
    </nav>
  )
}
```

---

## Screen Wireframes

### Screen 1 — Ghost Map `/`
```
┌─────────────────────────────────────────────┐
│  🌿 LEOSTARS                                │  56px header
├─────────────────────────────────────────────┤
│  ┌───────────────────────────┐              │
│  │ ⚠️ 858 Ghost Plantations  │  z-1000       │  stat card over map
│  └───────────────────────────┘              │
│                                             │
│          [ INDIA MAP — LEAFLET ]            │  full height
│   🔴        🔴     🟡                       │
│       🟢           🔴    🟢                 │
│                                   [ + ]     │  FAB register
│                                             │
├─────────────────────────────────────────────┤
│  🗺️ Map  │  📊 Leaderboard  │  🚨 Report   │  64px bottom nav
└─────────────────────────────────────────────┘
```

### Screen 2 — Site Truth Report `/site/:id`
```
┌─────────────────────────────────────────────┐
│  ← Back                                     │
│  SRMIST Chennai  •  Tamil Nadu              │
│  Registered: 18 Feb 2025  •  Day 90         │
│  ┌─────────────────────────────────────┐    │
│  │  ⚠️  GHOST PLANTATION               │    │  verdict stamp
│  └─────────────────────────────────────┘    │
│  ┌──────────────┬────────────────────┐      │
│  │  CLAIMED     │  SATELLITE SAYS    │      │
│  │  500 trees   │  ~40 alive  (8%)   │      │
│  └──────────────┴────────────────────┘      │
│  [ Before: Feb 25 ]    [ After: May 25 ]    │  image pair
│  NDVI 0.12  ↑ 0.01  0.13  — No change      │  ndvi compare
│  Eco-Health: ████░░░░░░  4/100              │  score bar
│  Carbon Actual: 2.1 kg/yr                   │
│  Carbon Claimed: 847 kg/yr                  │
│         [ 🔗 Share This Report ]            │
└─────────────────────────────────────────────┘
```

### Screen 3 — Register Plantation `/register`
```
┌─────────────────────────────────────────────┐
│  ← Back      Register a Plantation          │
│  Institution Name *  [________________]      │
│  GPS *  [ 📍 Capture My Location ]          │
│          ✓ Lat: 12.8231  Lng: 80.0442 ±8m   │
│  Saplings Claimed *  [________________]      │
│  Species  [ Neem ▼ ]                        │
│  Photo *  [ 📷 Take Photo / 📁 Upload ]     │
│  ┌─────────────────────────────────────┐    │
│  │      SUBMIT — START MONITORING      │    │
│  └─────────────────────────────────────┘    │
│  Result published publicly in 30 days       │
└─────────────────────────────────────────────┘
```

### Screen 4 — Leaderboard `/leaderboard`
```
┌─────────────────────────────────────────────┐
│  📊 PLANTATION TRUTH BOARD                  │
│  ┌─────────────────────────────────────┐    │
│  │  ⚠️ ₹2,400 Crore unverifiable spend │    │  shocking stat
│  └─────────────────────────────────────┘    │
│  Institution    Claimed   Real   Truth%     │
│  🔴 SRMIST         500     40      8%       │  red < 40%
│  🔴 Delhi U.      1200     89      7%       │
│  🟡 Anna Uni.      450    201     45%       │  yellow 40–70%
│  🟢 IIT Bombay     200    178     89%       │  green > 70%
└─────────────────────────────────────────────┘
```

### Screen 5 — Whistle-blower `/report`
```
┌─────────────────────────────────────────────┐
│  🚨 REPORT A GHOST SITE                     │
│  Tap the map to pin a suspected location    │
│         [ FULL INDIA MAP ]                  │
│              📍 21.14°N 79.08°E             │
│  [ 📷 Upload ground photo (optional) ]      │
│  Description (optional)  [______________]   │
│  [ SUBMIT FOR SATELLITE CHECK ]             │
│  Result published publicly in 24 hours      │
├─────────────────────────────────────────────┤
│  RECENT REPORTS                             │
│  Nagpur, MH — ⚠️ GHOST CONFIRMED  3 days   │
│  Mysore, KA  — ✅ VERIFIED GREEN   1 week  │
└─────────────────────────────────────────────┘
```

---

## Responsive Design Rules

```jsx
// Map: full height minus header + nav
<div className="h-[calc(100vh-120px)] w-full" />

// Two-column on tablet
<div className="grid grid-cols-1 md:grid-cols-2 gap-4" />

// Centered form on desktop
<div className="w-full max-w-md mx-auto px-4" />

// Stat card grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-3" />
```

**Mobile rules (primary target):**
- Single column everywhere, 16px horizontal padding
- Bottom nav: fixed, 64px
- All tap targets: min 44×44px
- Min font size: 14px
- No horizontal scroll on any screen

**md+ (768px):** Site Truth Report becomes 2-column (images left, data right). Form max-width 480px centered.

**lg+ (1024px):** Ghost Map gets left site-list sidebar; map takes 70% width. Bottom nav becomes left sidebar.

---

## Architecture

### System Overview
```
CLIENT (React + Vite)
  │
  ├── Leaflet → OpenStreetMap tiles (free, no key)
  ├── Recharts → NDVI charts
  ├── sites.json → demo data (instant, offline-safe)
  │
  ├── Firebase Firestore → live site registrations
  ├── Firebase Storage → photo uploads
  │
  └── Gemini API → eco interpretation text (optional)

SATELLITE DATA (pre-fetched, not live)
  └── NASA Worldview screenshots → /public/images/
      NDVI values → sites.json
```

### Screen → Component Map
```
GhostMap          → StatCard + MapContainer + CircleMarker×N + BottomNav
SiteTruthReport   → VerdictBadge + StatCard×4 + SatelliteImagePair +
                    NdviCompare + EcoScoreBar + NdviChart + ShareButton
RegisterSite      → GPSCapture + PhotoUpload + SpeciesSelect + ConfirmationScreen
Leaderboard       → ShockingStatBanner + InstitutionTable + BottomNav
WhistleBlower     → MapContainer(pin) + PhotoUpload + NominationsFeed + BottomNav
```

### Custom Hooks
```javascript
// hooks/useSites.js — swap setTimeout for Firestore in production
export const useSites = () => {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => { setSites(demoSites); setLoading(false) }, 300)
  }, [])
  return { sites, loading }
}

// hooks/useSite.js
export const useSite = () => {
  const { id } = useParams()
  return { site: demoSites.find(s => s.siteId === id) }
}

// hooks/useInstitutions.js — aggregates sites into ranked institution list
export const useInstitutions = () => {
  const institutions = demoSites
    .reduce((acc, site) => {
      const found = acc.find(i => i.name === site.institution)
      if (found) { found.claimed += site.claimedCount; found.verified += site.estimatedAlive||0 }
      else acc.push({ name: site.institution, state: site.state,
                      claimed: site.claimedCount, verified: site.estimatedAlive||0 })
      return acc
    }, [])
    .map(i => ({ ...i,
      truthPercent: Math.round((i.verified / i.claimed) * 100),
      status: i.verified/i.claimed > 0.7 ? 'VERIFIED_GREEN'
            : i.verified/i.claimed > 0.4 ? 'UNDER_REVIEW' : 'GHOST_RISK'
    }))
    .sort((a,b) => a.truthPercent - b.truthPercent)  // worst first
  return { institutions }
}
```

### State Per Screen (No Redux Needed)
```javascript
// RegisterSite.jsx
const [institution, setInstitution] = useState('')
const [location, setLocation]       = useState(null)   // { lat, lng }
const [count, setCount]             = useState('')
const [species, setSpecies]         = useState('Neem')
const [photo, setPhoto]             = useState(null)
const [loading, setLoading]         = useState(false)
const [submitted, setSubmitted]     = useState(false)
const [siteId, setSiteId]           = useState(null)
const [error, setError]             = useState(null)

// WhistleBlower.jsx
const [pinLocation, setPinLocation] = useState(null)
const [photo, setPhoto]             = useState(null)
const [description, setDescription] = useState('')
const [submitted, setSubmitted]     = useState(false)
```

### Write Flow — Register Plantation
```
Form submit → validate
  → FAIL: show inline errors
  → PASS: uploadPhoto() → Firebase Storage (returns URL)
        → addDoc(sites, { ...form, verdict:'MONITORING', locked:false })
        → navigate to confirmation ("Site LS-047. Monitoring begins.")
        → new yellow marker on Ghost Map
```

### Firestore Security Rules (Post-Hackathon)
```javascript
match /sites/{siteId} {
  allow read:   if true;
  allow create: if request.resource.data.verdict == 'MONITORING'
                && request.resource.data.locked == false;
  allow update: if !request.resource.data.diff(resource.data)
                   .affectedKeys().hasAny(['verdict','locked','ndviBefore','ndviAfter','ecoScore']);
  allow delete: if false;
}
match /whistleblower/{id} {
  allow read, create: if true;
  allow update, delete: if false;
}
```

### Post-Hackathon NDVI Pipeline
```
Plantation registered → Firestore onCreate trigger
  → Cloud Function: scheduleNDVICheck(siteId, lat, lng)
  → 30 days → Cloud Scheduler fires
  → NASA MODIS API call → compute delta, verdict, ecoScore
  → Firestore update: { ndviAfter, verdict, ecoScore, locked: true }
  → Map: MONITORING → GHOST / VERIFIED
  → [If GHOST] public report auto-generated
```

---

## Quick Design Reference Card

```
BRAND COLOR    #1B5E20   → brand name, verified badges
GHOST COLOR    #B71C1C   → ghost markers, fraud indicators
FONT UI        Inter     → all interface text
FONT DATA      JetBrains Mono → NDVI values, coords, site IDs, badges
VERDICT        UPPERCASE + mono + colored bg = official stamp feel
HERO NUMBERS   64px bold Inter = confrontational, impossible to miss
NO gradients   flat color only
NO shadows     borders only
NO illustrations  data replaces decoration
MAP FIRST      Ghost Map is the product — everything else supports it
```

---

*Leostars Design & Architecture v1.0 · 24-Hour Sprint · SDG 15 · February 2026*