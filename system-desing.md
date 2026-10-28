# The Capibara Web — Design System

Visual reference for AI agents and designers producing content (Remotion videos, social posts, thumbnails) that must match the website. Source of truth: [tailwind.config.ts](tailwind.config.ts), [assets/css/main.css](assets/css/main.css), and the Vue components in `components/`.

> **Rule of thumb:** monochrome neutrals dominate. Color (teal, plum, crimson, mint) appears only as gradients, glows and accents. Never flat saturated backgrounds.

---

## 1. Brand Personality

- Premium, technical, calm. "Software engineering & AI factory".
- Glassmorphism + soft glows + subtle noise. Light and dark themes.
- Serif display headings (Cinzel) paired with a clean sans body (Open Sans).

---

## 2. Color Tokens

### 2.1 Neutral scale `capibara`

| Token | Hex | Typical use |
|---|---|---|
| `capibara-950` | `#010101` | Dark mode page background, hero dark |
| `capibara-900` | `#0a0a0a` | Light mode primary text |
| `capibara-800` | `#151515` | Dark inputs/surfaces, icon chips |
| `capibara-700` | `#222222` | Dark borders, scrollbar |
| `capibara-600` | `#333333` | Light subtitle text |
| `capibara-500` | `#555555` | Muted text, icons |
| `capibara-400` | `#888888` | Dark mode subtitle, placeholders |
| `capibara-300` | `#cecece` | Light borders, dark mode soft text |
| `capibara-200` | `#e0e0e0` | Dark mode body text |
| `capibara-100` | `#f0f0f0` | Dark mode headings, light surfaces |
| `capibara-50` | `#f8f8f8` | Lightest surface |

Page background: **white** (light) / **`#010101`** (dark).

### 2.2 Accent palette

| Name | Default | Light | Dark | Role |
|---|---|---|---|---|
| **Teal** | `#0B6A69` (text AA) | `#17BEBB` | `#0a5f5e` | Primary accent |
| **Brand teal (gradients/borders)** | `#0E7C7B` | `#17BEBB` | — | Gradients, glows, badges (light mode) |
| **Mint** | `#D4F4DD` | — | `#a8ddb5` | Soft highlight, dark gradients |
| **Crimson** | `#D62246` | `#e84a6a` | `#b01a38` | CTA gradient end, warm glow |
| **Plum** | `#4B1D3F` | `#6b2d5a` | `#35152d` | Mid-gradient, depth |

Use `#0E7C7B` for gradients and glows in light mode and `#17BEBB` in dark mode. `#0B6A69` is the accessible text teal in the Tailwind config.

### 2.3 Brand gradients

| Name | CSS | Used for |
|---|---|---|
| **Primary (CTA / gradient text)** | `linear-gradient(135deg, #0E7C7B 0%, #4B1D3F 60%, #D62246 100%)` | Primary button, hero accent text, light mode |
| **Section title (light)** | `linear-gradient(135deg, #0E7C7B 0%, #010101 40%, #4B1D3F 100%)` | Section titles |
| **Section title (dark)** | `linear-gradient(135deg, #17BEBB 0%, #e0e0e0 40%, #D4F4DD 100%)` | Section titles dark |
| **Gradient text (dark)** | `linear-gradient(135deg, #17BEBB 0%, #D4F4DD 50%, #17BEBB 100%)` | Accent text dark |
| **Rainbow border (services)** | `linear-gradient(135deg, #0E7C7B, #17BEBB, #D4F4DD, #D62246, #4B1D3F)` | Service card borders |

Gradients are always **135°** (top-left to bottom-right), except hero light beams (180°, vertical).

---

## 3. Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Headings (h1–h6) | **Cinzel** (serif) | 400, 700 | Titles are bold (700) |
| Body / UI | **Open Sans** | 400, 700 (semibold used for labels/buttons) | Google Fonts, `display: swap` |
| Mono accents | system monospace (`font-mono`) | — | Tiny tags, counters |

### Scale used on the site

| Element | Size | Style |
|---|---|---|
| Hero h1 | 36px → 72px (`text-4xl` → `xl:text-7xl`) | Cinzel 700, `leading-tight` |
| Section title | 30px → 48px (`text-3xl` → `lg:text-5xl`) | Cinzel 700, gradient clip |
| Section subtitle | 18–20px (`text-lg md:text-xl`) | Open Sans, max-width ~48rem, centered |
| Card title | 20px (`text-xl`) | Cinzel 700 |
| Body | 16px | Open Sans 400 |
| Small / meta | 14px (`text-sm`) | Open Sans |
| Badge / label | 12px, **uppercase**, `tracking-[0.2em]`, semibold | Open Sans |
| Micro tag | 10px, mono, uppercase, `tracking-widest` | — |

Text colors: light mode `#0a0a0a` / `#333333` / `#555555`; dark mode `#f0f0f0` / `#e0e0e0` / `#888888`.

---

## 4. Radius, Borders, Spacing

### Border radius

| Token | Value | Use |
|---|---|---|
| `rounded-full` | 9999px | Buttons, badges, pills, icon circles |
| `rounded-4xl` | **32px (2rem)** | Glass cards (default) |
| `rounded-3xl` | 24px | Service cards |
| `rounded-2xl` | 16px | Small cards, tech tiles, client cards |
| `rounded-xl` | 12px | Inputs, icon chips |

### Borders

- Default surface border: `1px` solid; light `#e0e0e0` (`capibara-200`), dark `#222222` (`capibara-700`).
- **Glass card gradient border** (1px, masked): light `rgba(14,124,123,0.2) → rgba(75,29,63,0.15) → rgba(214,34,70,0.1)` at 135°, opacity 0.6 (1.0 on hover). Dark: `rgba(23,190,187,0.25) → rgba(75,29,63,0.2) → rgba(212,244,221,0.1)`, opacity 0.5.
- Secondary button: `2px` solid, `#0E7C7B` (light) / `#17BEBB` (dark).
- Badge: `1px`, `rgba(14,124,123,0.3)` light / `rgba(23,190,187,0.3)` dark.
- Overlay chips on images: `1px solid rgba(255,255,255,0.10)`.

### Spacing rhythm

- Sections: `96px` vertical (`py-24`), `128px` from `sm` up (`py-32`).
- Container: `max-w-7xl` (1280px), horizontal padding 16px → 24px.
- Card padding: 32px (`p-8`), 40px on larger (`p-10`).
- Grid gaps: 24–32px.

---

## 5. Transparency & Glass

### Glass card (the signature element)

| Property | Light | Dark |
|---|---|---|
| Fill | `white @ 30%` (`bg-white/30`) | `white @ 4%` (`rgba(255,255,255,0.04)`) |
| Blur | `backdrop-filter: blur(40px)` (`backdrop-blur-2xl`) | same |
| Radius | 32px | 32px |
| Border | gradient 1px (see above) | gradient 1px |

### Other opacity values

| Use | Value |
|---|---|
| Icon chip background | `capibara-900 @ 5%` light, `capibara-100 @ 10%` dark |
| Pills on dark images | `white @ 15%` + `blur(4px)`, text `white @ 90%` |
| Category chip on image | `capibara-900 @ 40%` + `blur(12px)` + 1px `white @ 10%` |
| Image overlay (services) | `black @ 90% → 55% → 35%` bottom-to-top |
| Image overlay (news) | `capibara-950 @ 80% → transparent`, 60% opacity |
| Hero scrim (dark) | `#010101 @ 50% → transparent → #010101 @ 60%` vertical |
| Hero scrim (light) | `white @ 40% → transparent → white @ 50%` vertical |
| Text selection | `capibara-900 @ 20%` light, `capibara-300 @ 20%` dark |

### Noise overlay

Fullscreen `/noise.svg`, tiled `200×200px`, **opacity 0.03**, `mix-blend-mode: overlay`. Adds film grain; keep it subtle.

### Mesh aura background

Three soft radial ellipses (corners and bottom center), `transparent` at 50%:
- Light: teal `rgba(14,124,123,0.06)` top-left, plum `rgba(75,29,63,0.04)` top-right, mint `rgba(212,244,221,0.08)` bottom.
- Dark: teal `0.06`, plum `0.05`, bright teal `rgba(23,190,187,0.03)`.

---

### Liquid Glass (target style for cards in new content)

> **Status:** this is the **intended** card style for Remotion and any new content. The live website still uses the plain `.glass-card` above (translucent fill + blur + gradient border). Liquid Glass is **not yet implemented in the site code**. When producing content, use Liquid Glass for every card. When an agent edits the website, do not assume it exists.

Liquid Glass builds on the glass card and adds the optical behaviour of real glass: a lit edge, thickness, and a background that looks bent and vivid behind the surface.

**Ingredients (all required for the look)**

| Layer | Spec |
|---|---|
| Fill | Light: `rgba(255,255,255,0.25)`, dark: `rgba(255,255,255,0.06)` |
| Backdrop filter | `blur(24px) saturate(180%) brightness(1.08)` (dark: `brightness(1.15)`) |
| Refraction (optional, video/Chromium) | SVG `feTurbulence` + `feDisplacementMap`, `scale` 20–40, applied through `backdrop-filter: url(#liquid)` |
| Specular edge | 1px inner highlight on the top/left edge: `inset 1px 1px 0 rgba(255,255,255,0.55)` (dark: `0.25`) |
| Opposite edge | `inset -1px -1px 0 rgba(255,255,255,0.12)` |
| Thickness / inner glow | `inset 0 0 24px rgba(255,255,255,0.10)` |
| Gradient border | Keep the brand 1px gradient border (teal → plum → crimson) at opacity `0.6` |
| Outer shadow | `0 8px 32px rgba(1,1,1,0.12)` (dark: `rgba(0,0,0,0.45)`) plus the brand colored hover glow |
| Sheen | Diagonal highlight: `linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%)` overlaid at `opacity 0.5` |
| Radius | `32px` (same as `rounded-4xl`) |

**CSS reference**

```css
.liquid-glass {
  position: relative;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(24px) saturate(180%) brightness(1.08);
  -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.08);
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.55),
    inset -1px -1px 0 rgba(255, 255, 255, 0.12),
    inset 0 0 24px rgba(255, 255, 255, 0.10),
    0 8px 32px rgba(1, 1, 1, 0.12);
  overflow: hidden;
}

/* Diagonal sheen */
.liquid-glass::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%);
  opacity: 0.5;
  pointer-events: none;
}

.dark .liquid-glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(180%) brightness(1.15);
  -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.15);
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.25),
    inset -1px -1px 0 rgba(255, 255, 255, 0.06),
    inset 0 0 24px rgba(255, 255, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.45);
}
```

**Optional refraction filter (SVG)**

```html
<svg width="0" height="0" aria-hidden="true">
  <filter id="liquid" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="3" result="noise" />
    <feGaussianBlur in="noise" stdDeviation="2" result="map" />
    <feDisplacementMap in="SourceGraphic" in2="map" scale="30" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>
```

Apply it with `backdrop-filter: url(#liquid) blur(12px) saturate(180%)`. This only works in Chromium-based renderers, which includes Remotion. It does not work in Safari or Firefox, so keep the plain blur/saturate version as the website fallback.

**Behavior and motion**

- Hover: lift `translateY(-4px)`, raise the sheen opacity `0.5 → 0.8`, move the sheen angle slowly (`120deg → 135deg`, `400ms`, ease-out).
- In video, animate the sheen sliding across the card (`background-position` or a moving gradient) over `2–4s`, `sine.inOut`, so the glass appears to catch light.
- Cards must sit over a **colorful, moving background** (mesh aura, teal/plum/crimson/mint glows, or imagery). Over a flat white or black background the effect disappears.

**Rules**

- Use Liquid Glass for **cards, panels, nav bars and pills**. Do not use it for full-page backgrounds or body text blocks.
- Never stack more than two glass layers. Nested glass loses clarity.
- Text on glass: keep contrast AA. In light mode use `capibara-900`, in dark mode `capibara-100`.
- Keep the brand palette: only teal, plum, crimson and mint tint the glass, never flat saturated fills.
- Always keep the 32px radius and the 1px gradient border so it still reads as The Capibara Web.

---

## 6. Shadows & Glows

Resting state: soft or none. On hover, cards emit a **multi-layer colored glow** (teal → bright teal → plum → crimson → mint, getting larger and fainter):

**Light hover**
```
0 2px 10px  rgba(14,124,123,0.25),
0 6px 20px  rgba(23,190,187,0.18),
0 10px 35px rgba(75,29,63,0.14),
0 16px 50px rgba(214,34,70,0.10),
0 20px 60px rgba(212,244,221,0.08)
```

**Dark hover**
```
0 2px 10px  rgba(23,190,187,0.20),
0 6px 20px  rgba(14,124,123,0.15),
0 10px 35px rgba(212,244,221,0.08),
0 16px 50px rgba(75,29,63,0.10),
0 20px 60px rgba(214,34,70,0.06)
```

Primary button glow: rest `0 4px 20px rgba(14,124,123,0.3)` (dark: `rgba(23,190,187,0.25)`), hover `0 8px 30px rgba(214,34,70,0.35)`.

---

## 7. Components

### Primary button
- Pill (`rounded-full`), padding `32px × 16px`, Open Sans semibold, **white text**.
- Background: Primary gradient (teal → plum → crimson, 135°).
- Hover: scale `1.05` + crimson glow. Active: scale `0.98`. Duration `300ms`.
- Icon (lucide, 18px) before label, gap 8px.

### Secondary button
- Pill, transparent, `2px` teal border and teal text.
- Hover: teal fill at 6% (light) / 8% (dark) and soft teal shadow, scale `1.05`.

### Section badge
- Pill, `px 20px / py 6px`, 12px uppercase, tracking `0.2em`, semibold, 1px teal border at 30%, teal text.
- Sits above every section title.

### Section header pattern
`badge` → `title` (gradient text, Cinzel bold) → `subtitle` (muted, centered). Centered, 16px (title) and 16px (subtitle) top margins, 64px below the header.

### Glass card
See section 5. Hover: border opacity 0.6 → 1, colored glow, optional `translateY(-4px)`.

### Icon chip
44×44px, `rounded-xl` (12px), faint neutral fill (5% / 10%), 20px lucide icon in `capibara-600` / `capibara-300`.

### Social / circular icon button
40–44px circle, fill `capibara-100` (dark `capibara-800`), 18px icon, hover one step darker.

### Service card
- `rounded-3xl` with a **2px rainbow gradient border**, image background with black gradient overlay, white text, glass pills and icon box on top.

### Navbar
Fixed top, floating glass bar, logo height 32–40px, theme toggle and language switcher (ES/EN) as pill/circle controls.

### Icons
**lucide** line icons, 18–20px (up to 24px), 2px stroke, colored `capibara-500/600` (light) or `capibara-300/400` (dark). Brand colors only for WhatsApp (`#25D366`).

---

## 8. Motion

Library: **GSAP** (+ ScrollTrigger).

| Pattern | Values |
|---|---|
| Reveal on scroll | from `opacity 0, y 40px` → `1, 0`; duration `0.8s`; stagger `0.1s`; default ease; triggers at `top 85%` |
| Hero intro timeline | ease `power3.out`; items fade up `y` with `0.8–1.2s` durations, staggered |
| Hero beams / floating shapes | `sine.inOut`, yoyo, long loops `7–15s` (slow, ambient) |
| Service cards | `power3.out`, `1s` |
| Footer mascot | float `y: -8px`, `rotate 1.5°`, `3s`, `sine.inOut`, infinite yoyo |
| Hover transitions | `300ms` (buttons, small cards), `400–500ms` (glass cards, tiles) |
| Hover scale | `1.05` (buttons, cards), `0.98` on press |
| Hover lift | `translateY(-4px)` on glass cards |

**Feel:** smooth, slow, ambient. No bounces or abrupt cuts. Prefer `power3.out` for entrances and `sine.inOut` for loops.

---

## 9. Themes

| | Light | Dark |
|---|---|---|
| Background | `#ffffff` | `#010101` |
| Headings | gradient `#0E7C7B → #010101 → #4B1D3F` | gradient `#17BEBB → #e0e0e0 → #D4F4DD` |
| Body text | `#0a0a0a` / `#333` | `#e0e0e0` / `#888` |
| Accent teal | `#0E7C7B` | `#17BEBB` |
| Glass fill | white 30% | white 4% |

The site defaults to **light** and toggles via a `dark` class. Remotion content should offer both variants, with **dark** being best for video.

---

## 10. Brand Assets (in `public/`)

| File | Description |
|---|---|
| `logo.webp` / `logo-dark.webp` | Logo for light / dark backgrounds (use the matching one) |
| `favicon.png` | Square mark |
| `hero-light.webp` / `hero-dark.webp` | Hero art |
| `footer-walking.webp` / `footer-walking-dark.webp` | Capibara mascot walking |
| `contact.webp` / `contact-dark.webp` | Capibara loader / contact art |
| `social-share-cover.jpg` | Open Graph cover |
| `services/*.webp` | Service card art: AI automation, SaaS, SEO, tech AI, web design |
| `noise.svg` | Grain texture |

Mascot: a **capibara** (capybara). Always use the light/dark variant that fits the background.

---

## 11. Remotion Quick Reference

```ts
export const capibara = {
  neutral: {
    950: '#010101', 900: '#0a0a0a', 800: '#151515', 700: '#222222',
    600: '#333333', 500: '#555555', 400: '#888888', 300: '#cecece',
    200: '#e0e0e0', 100: '#f0f0f0', 50: '#f8f8f8',
  },
  teal: { base: '#0E7C7B', text: '#0B6A69', light: '#17BEBB', dark: '#0a5f5e' },
  mint: '#D4F4DD',
  crimson: '#D62246',
  plum: '#4B1D3F',
  gradients: {
    primary: 'linear-gradient(135deg, #0E7C7B 0%, #4B1D3F 60%, #D62246 100%)',
    titleDark: 'linear-gradient(135deg, #17BEBB 0%, #e0e0e0 40%, #D4F4DD 100%)',
    accentDark: 'linear-gradient(135deg, #17BEBB 0%, #D4F4DD 50%, #17BEBB 100%)',
    border: 'linear-gradient(135deg, #0E7C7B, #17BEBB, #D4F4DD, #D62246, #4B1D3F)',
  },
  fonts: { heading: 'Cinzel, serif', body: '"Open Sans", sans-serif' },
  radius: { card: 32, service: 24, tile: 16, input: 12, pill: 9999 },
  glass: {
    light: { background: 'rgba(255,255,255,0.30)', backdropFilter: 'blur(40px)' },
    dark: { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(40px)' },
  },
  noise: { opacity: 0.03, size: 200, blend: 'overlay' },
}
```

### Do
- Use dark background `#010101` with teal/mint glows and gradient text.
- Cinzel for titles, Open Sans for everything else.
- Liquid Glass cards (see section 5) with 32px radius and gradient 1px borders, over a colorful moving background.
- Slow, smooth motion (`power3.out`, `sine.inOut`), 0.8s reveals with 0.1s stagger.
- Add the grain overlay at 3% opacity.

### Don't
- Don't use flat pure red/blue/green fills. Crimson is only a gradient end or glow.
- Don't use sharp corners or hard drop shadows.
- Don't mix fonts, and don't set Cinzel in long paragraphs.
- Don't use a light logo on a light background (or the reverse).
- Don't use fast, bouncy or cut-style transitions.
