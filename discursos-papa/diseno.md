---
name: Crónica & Edición Solemne
colors:
  surface: '#fff8f3'
  surface-dim: '#dfd9d4'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f2ed'
  surface-container: '#f3ede7'
  surface-container-high: '#ede7e2'
  surface-container-highest: '#e7e1dc'
  on-surface: '#1d1b18'
  on-surface-variant: '#4e453a'
  inverse-surface: '#32302d'
  inverse-on-surface: '#f6f0ea'
  outline: '#807568'
  outline-variant: '#d2c4b5'
  surface-tint: '#795824'
  primary: '#775622'
  on-primary: '#ffffff'
  primary-container: '#926e38'
  on-primary-container: '#fffbff'
  inverse-primary: '#ebbf81'
  secondary: '#28628f'
  on-secondary: '#ffffff'
  secondary-container: '#97ccfe'
  on-secondary-container: '#175683'
  tertiary: '#006b33'
  on-tertiary: '#ffffff'
  tertiary-container: '#008742'
  on-tertiary-container: '#f6fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb0'
  primary-fixed-dim: '#ebbf81'
  on-primary-fixed: '#291800'
  on-primary-fixed-variant: '#5f410e'
  secondary-fixed: '#cee5ff'
  secondary-fixed-dim: '#97ccfe'
  on-secondary-fixed: '#001d32'
  on-secondary-fixed-variant: '#004a75'
  tertiary-fixed: '#75fd9d'
  tertiary-fixed-dim: '#56e083'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#005226'
  background: '#fff8f3'
  on-background: '#1d1b18'
  surface-variant: '#e7e1dc'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: '800'
    lineHeight: 14px
    letterSpacing: 0.12em
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative, solemn, and high-prestige editorial presence tailored for broadsheet journalism, investigative reporting, and special historical coverage. Inspired by traditional newspaper craftsmanship and commemorative press, it blends the intellectual weight of classical typography with the crisp precision of contemporary digital publishing.

The target audience encompasses discerning readers, cultural observers, and subscribers seeking dependable journalistic rigor. The interface evokes solemnity, intellectual gravity, and cultural prestige without feeling antiquated. It embraces an editorial minimalist movement defined by strict orthogonal structure, disciplined hairline dividers, expansive typographic hierarchy, warm ochre and gold parchment undertones, and intentional moments of modern contrast (such as vibrant mint accents for high-priority calls to action and delicate celesta blue tints).

## Colors

The color palette reflects the tactile richness of fine newsprint, warm ochre liturgical tones, and institutional authority:

- **Primary (`#96723B`):** Warm ochre gold embodying institutional memory, prestige, masthead branding, section accents, and prominent journalistic banners.
- **Secondary (`#75AADB`):** Soft celesta blue drawn from national heraldry, deployed selectively as subtle structural borders, thematic tags, and diplomatic or historic metadata highlights.
- **Tertiary (`#5AE386`):** Luminous mint green reserved strictly for conversion vectors, primary subscription prompts, and breaking live-coverage indicators. Its high-vibrancy contrast draws immediate eye focus against muted paper backgrounds.
- **Neutral Dark (`#1F1D1A`):** Deep carbon black with faint warm brown undertones, ensuring high legibility for sustained long-form reading without the harsh fatigue of pure `#000000`.
- **Canvas & Surface Tones:** Grounded in pure crisp white (`#FFFFFF`) for article reading surfaces, overlaid on a warm eggshell foundation (`#FAF7F2`) and aged newsprint tint (`#F1EBE1`) for framing modules, sidebars, and pull-quote containers.

## Typography

Typography functions as the primary architectural element of the system:

- **Headlines (`Libre Caslon Text`):** Evokes centuries of print authority. Used for mastheads, article titles, section headings, and pull quotes. Italics should be used for literary accents, commemorative subheadings, and journalistic attribution.
- **Body & Interface (`Manrope`):** Delivers geometric clarity and neutral balance. Optimized for rapid digital reading, dense multi-column news grids, data tables, and interface controls.
- **Editorial Micro-copy:** Section tags, timestamps, and bylines utilize `Manrope` in uppercase with expanded letter-spacing (`0.08em` to `0.12em`) to mirror traditional column headers.

## Layout & Spacing

The layout is anchored in an authoritative 12-column editorial grid on desktop and tablet, collapsing to a disciplined 4-column layout on mobile devices:

- **Desktop (1200px+):** 12 columns with `1.5rem` gutters and generous `3rem` margins to create broadsheet balance. Asymmetric column spans (e.g., 8-column lead article alongside 4-column chronological digest) evoke print news anatomy.
- **Tablet (768px - 1199px):** 8 columns with `1rem` gutters and `2rem` outer margins.
- **Mobile (< 768px):** 4 columns with `0.75rem` gutters and `1rem` safe margins.

Spacing follows strict multiples of `0.25rem` (4px rhythm). Component spacing relies on precise internal margins, and vertical separation between editorial articles is strictly dictated by standard layout dividers or generous white space intervals (`space-lg` to `space-xl`).

## Elevation & Depth

This design system repudiates heavy digital drop shadows, skeuomorphic bevels, and artificial floating cards. Depth is communicated strictly through planar surface tiers and structural hairline borders:

1. **Surface Hierarchy:** The base page sits on warm alabaster (`#FAF7F2`). Article bodies rise to pure white (`#FFFFFF`), while editorial side panels and hero banners sink into saturated ochre tones (`#96723B`) or muted paper cream (`#F1EBE1`).
2. **Hairline Rules:** Structural separation relies on `1px` solid dividers (`#E4DCD0` or `#96723B` at 20% opacity). Multi-column articles use vertical rule lines mirroring printed newspapers.
3. **Modal & Floating Elements:** In instances where modals or sticky subscription bars must elevate above the plane, use an ultra-subtle, deep ambient shadow: `box-shadow: 0 8px 24px -4px rgba(31, 29, 26, 0.08)`.

## Shapes

The design system enforces a strict zero-radius (`roundedness: 0`) aesthetic across all components. Every button, input field, card container, media wrapper, badge, and dropdown maintains sharp, unyielding 90-degree right angles. 

This architectural rigidity honors the physical cuts of broadsheet printing plates and linotype grids, setting an unmistakably serious, dignified, and editorial tone distinct from rounded, casual consumer applications.

## Components

- **Buttons:**
  - *Subscription / Conversion Action:* Background in vibrant mint (`#5AE386`) with `#1F1D1A` bold text, sharp 0px corners, and `0.75rem 1.5rem` padding. On hover, subtle background shift to `#4CD476`.
  - *Primary Editorial Action:* Solid ochre background (`#96723B`) with white text and clean rectangular edges.
  - *Secondary / Ghost Button:* Transparent background with a `1px` solid `#96723B` border, uppercase `Manrope` lettering, and `0.08em` tracking.
- **Cards & Story Containers:**
  - Zero border-radius. Framed either by a `1px` neutral hairline (`#E4DCD0`) or by raw negative space separated by vertical/horizontal print rules. Image elements inside cards never feature rounded corners.
- **Badges & Category Chips:**
  - Strict rectangles with uppercase labels (`label-sm`). Thematic and commemorative categories use light celesta borders (`#75AADB`) with soft blue-tinted fills (`rgba(117, 170, 219, 0.1)`). Breaking news badges employ a solid ochre or mint accent.
- **Form Inputs:**
  - Single-line border inputs with a `1px` bottom rule or full hairline perimeter in `#D6CCBF`. Focus state transitions to a crisp `1px` solid `#96723B` without glowing blur rings.
- **Selection Controls (Checkboxes & Radios):**
  - Crisp square geometry. Radio buttons use concentric squares instead of circles. Selected states are filled with `#96723B`.
- **Editorial Masthead & Section Headers:**
  - Center-aligned or left-anchored serif titles topped and flanked by horizontal double-rules (`1px` hairline over `3px` solid stroke).
- **Audio & Media Player Banners:**
  - Full-width rectilinear banners with warm ochre backgrounds (`#96723B`), white text, and clean geometric control icons.
