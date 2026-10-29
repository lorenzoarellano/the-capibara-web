# The Capibara Web — Design System (Dark Theme Only)

Visual reference for AI agents and designers producing content (Remotion videos, social posts, thumbnails) that must match the website. **This document covers the dark theme only.** Do not produce light-theme variants.

Source of truth: [tailwind.config.ts](tailwind.config.ts), [assets/css/main.css](assets/css/main.css), and the Vue components in `components/`.

> **Rule of thumb:** near-black neutrals dominate. Color (teal, mint, plum, crimson) appears only as gradients, glows and accents. Never flat saturated backgrounds.

---

## 1. Brand Personality

- Premium, technical, calm. "Software engineering & AI factory".
- Dark canvas, glass surfaces, soft colored glows, subtle film grain.
- Serif display headings (Cinzel) paired with a clean sans body (Open Sans).

---

## 2. Color Tokens

### 2.1 Neutrals (dark theme)

| Role | Hex | Token |
|---|---|---|
| Page background | `#010101` | `capibara-950` |
| Deep surface | `#0a0a0a` | `capibara-900` |
| Surface / inputs / icon circles | `#151515` | `capibara-800` |
| Borders / scrollbar | `#222222` | `capibara-700` |
| Strong border / hover | `#333333` | `capibara-600` |
| Muted icons | `#555555` | `capibara-500` |
| Secondary text / placeholders | `#888888` | `capibara-400` |
| Soft text | `#cecece` | `capibara-300` |
| Body text | `#e0e0e0` | `capibara-200` |
| Headings / strong text | `#f0f0f0` | `capibara-100` |
| Pure white (on gradients/images) | `#ffffff` | — |

### 2.2 Brand accents

| Name | Main (dark theme) | Variants | Role |
|---|---|---|---|
| **Teal** | `#17BEBB` | `#0E7C7B` (gradient start), `#0a5f5e` (deep) | Primary accent: badges, borders, glows, focus rings |
| **Mint** | `#D4F4DD` | `#a8ddb5` | Soft highlight, gradient ends, text accents |
| **Plum** | `#4B1D3F` | `#6b2d5a`, `#35152d` | Gradient middle, depth |
| **Crimson** | `#D62246` | `#e84a6a`, `#b01a38` | Gradient end, warm glow |

Excluded from the brand palette: WhatsApp green `#25D366` (used only on the WhatsApp button).

### 2.3 Brand gradients (all 135° unless noted)

| Name | CSS | Used for |
|---|---|---|
| **Primary (CTA)** | `linear-gradient(135deg, #0E7C7B 0%, #4B1D3F 60%, #D62246 100%)` | Primary button |
| **Section title** | `linear-gradient(135deg, #17BEBB 0%, #e0e0e0 40%, #D4F4DD 100%)` | Headings, clipped to text |
| **Accent text** | `linear-gradient(135deg, #17BEBB 0%, #D4F4DD 50%, #17BEBB 100%)` | Highlighted words |
| **Rainbow border** | `linear-gradient(135deg, #0E7C7B, #17BEBB, #D4F4DD, #D62246, #4B1D3F)` | Service card borders |

---

## 3. Typography

| Role | Font | Weights |
|---|---|---|
| Headings (h1–h6) | **Cinzel** (serif) | 400, 700 (titles use 700) |
| Body / UI | **Open Sans** | 400, 700 (semibold for labels and buttons) |
| Micro accents | system monospace | tags and counters |

### Scale

| Element | Size | Style |
|---|---|---|
| Hero h1 | 36px → 72px | Cinzel 700, `leading-tight`, color `#f0f0f0` |
| Hero accent line | same as h1 | Cinzel 700, accent-text gradient |
| Section title | 30px → 48px | Cinzel 700, section-title gradient |
| Section subtitle | 18–20px | Open Sans, color `#888888`, centered, max ~48rem |
| Card title | 20px | Cinzel 700, `#f0f0f0` |
| Body | 16px | Open Sans 400, `#e0e0e0` |
| Small / meta | 14px | Open Sans, `#888888` |
| Badge / label | 12px, uppercase, tracking `0.2em`, semibold | Open Sans, `#17BEBB` |
| Micro tag | 10px, mono, uppercase, tracking-widest | white |

---

## 4. Radius, Borders, Spacing

### Radius

| Value | Use |
|---|---|
| `9999px` (full) | Buttons, badges, pills, icon circles |
| `32px` | Glass cards (default) |
| `24px` | Service cards |
| `16px` | Small cards, tech tiles, client cards |
| `12px` | Inputs, icon chips |

### Borders

- Default surface border: `1px solid #222222`.
- **Glass card gradient border** (1px, masked): `linear-gradient(135deg, rgba(23,190,187,0.25), rgba(75,29,63,0.2), rgba(212,244,221,0.1))`, opacity `0.5` (→ `1` on hover).
- Secondary button: `2px solid #17BEBB`, text `#17BEBB`.
- Badge: `1px solid rgba(23,190,187,0.3)`.
- Chips over images: `1px solid rgba(255,255,255,0.10)`.

### Spacing rhythm

- Sections: `96px` vertical, `128px` on larger screens.
- Container: max `1280px`, horizontal padding `16px` → `24px`.
- Card padding: `32px`, `40px` on larger screens.
- Grid gaps: `24–32px`.

---

## 5. Transparency & Glass

### Glass card (current website style)

| Property | Value |
|---|---|
| Fill | `rgba(255,255,255,0.04)` |
| Blur | `backdrop-filter: blur(40px)` |
| Radius | `32px` |
| Border | gradient 1px (see section 4) |

### Other opacity values

| Use | Value |
|---|---|
| Icon chip background | `rgba(240,240,240,0.10)` |
| Pills on dark images | `white @ 15%` + `blur(4px)`, text `white @ 90%` |
| Category chip on image | `rgba(10,10,10,0.40)` + `blur(12px)` + `1px solid rgba(255,255,255,0.10)` |
| Image overlay (services) | `black @ 90% → 55% → 35%`, bottom to top |
| Image overlay (news) | `rgba(1,1,1,0.80) → transparent`, at 60% opacity |
| Hero scrim | `rgba(1,1,1,0.50) → transparent → rgba(1,1,1,0.60)`, top to bottom |
| Text selection | `rgba(206,206,206,0.20)` |

### Noise overlay

Fullscreen `/noise.svg`, tiled `200×200px`, **opacity 0.03**, `mix-blend-mode: overlay`. Film grain; keep it subtle.

### Mesh aura background

Three soft radial ellipses over `#010101`, each fading to `transparent` at 50%:
- Top-left: teal `rgba(14,124,123,0.06)`.
- Top-right: plum `rgba(75,29,63,0.05)`.
- Bottom center: bright teal `rgba(23,190,187,0.03)`.

### Hero beams

Vertical (180°) soft beams, e.g. `linear-gradient(180deg, transparent 0%, rgba(23,190,187,0.3) 30%, rgba(23,190,187,0.15) 60%, transparent 100%)`. Other beams use mint `rgba(212,244,221,0.2)` and teal at `0.12–0.18`. Always fade to transparent at both ends and drift slowly.

---

### Liquid Glass (target style for cards in new content)

> **Status:** this is the **intended** card style for Remotion and any new content. The live website still uses the plain glass card above. Liquid Glass is **not yet implemented in the site code**. When producing content, use Liquid Glass for every card. When an agent edits the website, do not assume it exists.

Liquid Glass builds on the glass card and adds the optical behaviour of real glass: a lit edge, thickness, and a background that looks bent and vivid behind the surface.

**Ingredients (all required for the look)**

| Layer | Spec |
|---|---|
| Fill | `rgba(255,255,255,0.06)` |
| Backdrop filter | `blur(24px) saturate(180%) brightness(1.15)` |
| Refraction (optional, Chromium/Remotion) | SVG `feTurbulence` + `feDisplacementMap`, `scale` 20–40, via `backdrop-filter: url(#liquid)` |
| Specular edge (top/left) | `inset 1px 1px 0 rgba(255,255,255,0.25)` |
| Opposite edge | `inset -1px -1px 0 rgba(255,255,255,0.06)` |
| Thickness / inner glow | `inset 0 0 24px rgba(255,255,255,0.05)` |
| Gradient border | brand 1px gradient (teal → plum → mint) at opacity `0.5` |
| Outer shadow | `0 8px 32px rgba(0,0,0,0.45)` plus the brand colored hover glow |
| Sheen | `linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%)` at `opacity 0.5` |
| Radius | `32px` |

**CSS reference**

```css
.liquid-glass {
  position: relative;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(180%) brightness(1.15);
  -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.15);
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.25),
    inset -1px -1px 0 rgba(255, 255, 255, 0.06),
    inset 0 0 24px rgba(255, 255, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.45);
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

Apply with `backdrop-filter: url(#liquid) blur(12px) saturate(180%)`. Works only in Chromium-based renderers (includes Remotion). Safari and Firefox need the plain blur/saturate version.

**Behavior and motion**

- Hover: lift `translateY(-4px)`, raise sheen opacity `0.5 → 0.8`, rotate the sheen angle `120deg → 135deg` over `400ms`, ease-out.
- In video, slide the sheen across the card over `2–4s` with `sine.inOut`, so the glass catches light.
- Cards must sit over a **colorful, moving background** (mesh aura, teal/plum/crimson/mint glows, imagery). On flat black the effect disappears.

**Rules**

- Use for **cards, panels, nav bars and pills**. Not for full-page backgrounds or long text blocks.
- Never stack more than two glass layers.
- Text on glass: `#f0f0f0` for titles, `#e0e0e0` for body (keep contrast AA).
- Only teal, plum, crimson and mint tint the glass. No flat saturated fills.
- Keep the `32px` radius and the 1px gradient border.

---

## 6. Shadows & Glows

Resting state: soft or none. On hover, cards emit a **multi-layer colored glow** (bright teal → teal → mint → plum → crimson, larger and fainter each step):

```
0 2px 10px  rgba(23,190,187,0.20),
0 6px 20px  rgba(14,124,123,0.15),
0 10px 35px rgba(212,244,221,0.08),
0 16px 50px rgba(75,29,63,0.10),
0 20px 60px rgba(214,34,70,0.06)
```

Primary button glow: rest `0 4px 20px rgba(23,190,187,0.25)`, hover `0 8px 30px rgba(214,34,70,0.35)`.

---

## 7. Components

### Primary button
- Pill, padding `32px × 16px`, Open Sans semibold, **white text**.
- Background: Primary gradient (teal → plum → crimson, 135°).
- Hover: scale `1.05` + crimson glow. Active: scale `0.98`. Duration `300ms`.
- Optional lucide icon (18px) before the label, gap `8px`.

### Secondary button
- Pill, transparent, `2px solid #17BEBB`, text `#17BEBB`.
- Hover: fill `rgba(23,190,187,0.08)`, shadow `0 4px 16px rgba(23,190,187,0.12)`, scale `1.05`.

### Section badge
- Pill, `20px × 6px` padding, 12px uppercase, tracking `0.2em`, semibold.
- `1px solid rgba(23,190,187,0.3)`, text `#17BEBB`.
- Sits above every section title.

### Section header pattern
`badge` → `title` (gradient, Cinzel bold) → `subtitle` (`#888888`, centered). Margins: `24px` above the title, `16px` above the subtitle, `64px` below the header.

### Glass card
See section 5. Hover: border opacity `0.5 → 1`, colored glow, optional `translateY(-4px)`.

### Icon chip
`44×44px`, radius `12px`, fill `rgba(240,240,240,0.10)`, 20px lucide icon in `#cecece`.

### Social / circular icon button
`40–44px` circle, fill `#151515`, 18px icon in `#888888`, hover fill `#222222`.

### Service card
`24px` radius with a **2px rainbow gradient border**, image background with black gradient overlay, white text, glass pills and icon box on top.

### Navbar
Fixed top, floating glass capsule (max `1152px` wide), logo height `32–40px`, theme toggle, language switcher and primary button.

### Icons
**lucide** line icons, 18–20px (up to 24px), 2px stroke, color `#cecece` or `#888888`. Only WhatsApp uses its brand green.

---

## 8. Motion

Library: **GSAP** (+ ScrollTrigger).

| Pattern | Values |
|---|---|
| Reveal on scroll | `opacity 0, y 40px` → `1, 0`; `0.8s`; stagger `0.1s`; trigger at `top 85%` |
| Hero intro timeline | ease `power3.out`; items fade up with `0.8–1.2s` durations, staggered |
| Hero beams / floating shapes | `sine.inOut`, yoyo, long loops `7–15s` (slow, ambient) |
| Service cards | `power3.out`, `1s` |
| Footer mascot | float `y: -8px`, `rotate 1.5°`, `3s`, `sine.inOut`, infinite yoyo |
| Hover transitions | `300ms` (buttons, small cards), `400–500ms` (glass cards, tiles) |
| Hover scale | `1.05`; `0.98` on press |
| Hover lift | `translateY(-4px)` on cards |

**Feel:** smooth, slow, ambient. No bounces or abrupt cuts. `power3.out` for entrances, `sine.inOut` for loops.

---

## 9. Brand Assets (in `public/`, dark variants only)

| File | Description |
|---|---|
| `logo-dark.webp` | Logo for dark backgrounds |
| `favicon.png` | Square mark |
| `hero-dark.webp` | Hero art |
| `footer-walking-dark.webp` | Capibara mascot walking |
| `contact-dark.webp` | Capibara loader / contact art |
| `social-share-cover.jpg` | Open Graph cover |
| `services/*.webp` | Service card art: AI automation, SaaS, SEO, tech AI, web design |
| `noise.svg` | Grain texture |

Mascot: a **capibara** (capybara). Always use the `-dark` variant of every asset. Never use the light logo (`logo.webp`, `hero-light.webp`, etc.).

---

## 10. Remotion Quick Reference

```ts
export const capibaraDark = {
  background: '#010101',
  neutral: {
    900: '#0a0a0a', 800: '#151515', 700: '#222222', 600: '#333333',
    500: '#555555', 400: '#888888', 300: '#cecece', 200: '#e0e0e0', 100: '#f0f0f0',
  },
  text: { heading: '#f0f0f0', body: '#e0e0e0', muted: '#888888' },
  teal: { bright: '#17BEBB', base: '#0E7C7B', deep: '#0a5f5e' },
  mint: '#D4F4DD',
  crimson: '#D62246',
  plum: '#4B1D3F',
  gradients: {
    primary: 'linear-gradient(135deg, #0E7C7B 0%, #4B1D3F 60%, #D62246 100%)',
    title: 'linear-gradient(135deg, #17BEBB 0%, #e0e0e0 40%, #D4F4DD 100%)',
    accent: 'linear-gradient(135deg, #17BEBB 0%, #D4F4DD 50%, #17BEBB 100%)',
    border: 'linear-gradient(135deg, #0E7C7B, #17BEBB, #D4F4DD, #D62246, #4B1D3F)',
  },
  fonts: { heading: 'Cinzel, serif', body: '"Open Sans", sans-serif' },
  radius: { card: 32, service: 24, tile: 16, input: 12, pill: 9999 },
  glass: { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(40px)' },
  liquidGlass: {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px) saturate(180%) brightness(1.15)',
    boxShadow:
      'inset 1px 1px 0 rgba(255,255,255,0.25), inset -1px -1px 0 rgba(255,255,255,0.06), inset 0 0 24px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.45)',
  },
  noise: { opacity: 0.03, size: 200, blend: 'overlay' },
}
```

### Do
- Background `#010101` with teal/mint glows and gradient text.
- Cinzel for titles, Open Sans for everything else.
- Liquid Glass cards (section 5) with `32px` radius and gradient 1px borders, over a colorful moving background.
- Slow, smooth motion (`power3.out`, `sine.inOut`), `0.8s` reveals with `0.1s` stagger.
- Grain overlay at 3% opacity.
- Dark asset variants only.

### Don't
- Don't use light backgrounds, light logos or light-theme colors.
- Don't use flat pure red, blue or green fills. Crimson is only a gradient end or glow.
- Don't use sharp corners or hard drop shadows.
- Don't mix fonts, and don't set Cinzel in long paragraphs.
- Don't use fast, bouncy or cut-style transitions.
