---
name: Editorial Infographics System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#414752'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#727784'
  outline-variant: '#c1c6d4'
  surface-tint: '#005eb5'
  primary: '#004d97'
  on-primary: '#ffffff'
  primary-container: '#0265c2'
  on-primary-container: '#d9e5ff'
  inverse-primary: '#a8c8ff'
  secondary: '#b6191a'
  on-secondary: '#ffffff'
  secondary-container: '#d9352f'
  on-secondary-container: '#fffbff'
  tertiary: '#005851'
  on-tertiary: '#ffffff'
  tertiary-container: '#04726a'
  on-tertiary-container: '#9df3e9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a8c8ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468a'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000b'
  tertiary-fixed: '#9cf2e8'
  tertiary-fixed-dim: '#80d5cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#00504a'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-xl:
    fontFamily: Work Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Work Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
  headline-md:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  metric-display:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
  metric-display-mobile:
    fontFamily: Work Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 30px
  body-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: Public Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
  timestamp-italic:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system translates the visual language of high-impact journalistic data graphics into a rigorous, embed-ready digital framework. Rooted in the regional journalistic legacy of daily newsprint, the system bridges authoritative print heritage with hyper-legible interactive widgets.

### Aesthetic Character
- **Editorial Precision:** Pure white surfaces, sharp micro-rules, and authoritative typography create a high-credibility environment optimized for fast data ingestion.
- **Graphic Directness:** Information hierarchy relies on bold numeric display counters, clear categorical color coding, and unambiguous spatial layouts.
- **Journalistic Neutrality with Brand Accent:** Neutral slates anchor general reporting, while the signature cobalt blue (`#0265c2`) acts as an immediate masthead signal and primary interactive focal point.

## Colors

The color palette is built for clarity in analytical charts, parliamentary hemicycles, maps, and comparative election bars.

### Palette Architecture
- **Primary (`#0265c2`):** Masthead blue, primary button fill, interactive segment toggle state, and democratic/majority party metric designation.
- **Secondary (`#b91c1c`):** Deep editorial vermilion. Used for legislative opposition, alerts, critical variance metrics, and high-urgency callouts.
- **Tertiary (`#0f766e`):** Muted teal for independent coalitions, secondary data dimensions, and environmental or civic status markers.
- **Neutral Core (`#111827`):** Primary ink color for chart headlines, metric figures, and labels. Secondary text falls back to `#4b5563` and muted captions to `#6b7280`.
- **Surfaces & Cards (`#ffffff`, `#f8fafc`, `#f1f5f9`):** Pure white `#ffffff` grounds the active canvas. Card containers and unselected segment pills use `#f8fafc` with subtle hairline boundaries (`#e2e8f0`).

## Typography

The typographic hierarchy distinguishes narrative reporting from numerical data visualization.

### Font Pairing Strategy
- **Display & Section Headers (`Work Sans`):** A robust humanist grotesque providing strong horizontal grounding for titles, seat counts, and primary percentage callouts.
- **Editorial Body & Labels (`Public Sans`):** An institutional, highly legible grotesque suited for small annotations, data tables, axis labels, and metadata disclaimers.
- **Editorial Sub-branding:** Masthead and publication signature assets feature traditional high-contrast serif treatment to maintain print journalism credibility, while all interactive UI retains clean sans-serif legibility.
- **Numerical Treatment:** Metric counters (`metric-display`) prioritize tabular alignment and tight vertical clearance to integrate alongside comparative bars and donut charts.

## Layout & Spacing

Layouts are designed for both standard desktop article templates and constrained webview iframes on mobile devices.

### Grid & Density Rules
- **Container Structure:** Standard infographic widgets use a max-width container of `680px` for article column embeds, stretching to `100%` on mobile screens with `1rem` edge margins.
- **Vertical Rhythm:** Content modules (segmented control row, title stack, metric summaries, chart canvas, and footer credits) are separated by hairline rules and consistent `1.5rem` (`space-lg`) blocks.
- **Data Sub-grouping:** Metrics and supporting descriptive text maintain tight `0.25rem` (`space-xs`) relationships, keeping numbers and their context visually bound.

## Elevation & Depth

This design system avoids heavy shadows, skewing toward a crisp, flat editorial register with functional borders.

### Elevation Principles
- **Flat Ground Plane:** Base background is `#ffffff`. Nested panels and metric wells sit on `#f8fafc` without drop shadows.
- **Structural Separators:** Depth is created through horizontal hairline dividers (`1px solid #e2e8f0` or `#e5e7eb`).
- **Segmented Control Elevation:** The active segment state in a tab switcher uses a subtle micro-shadow (`0 1px 2px rgba(17, 24, 39, 0.08)`) over a `#ffffff` background to lift it cleanly from the `#f1f5f9` pill tray.
- **Interactive Tooltips:** Floating popovers for chart points use a crisp border (`1px solid #cbd5e1`) and a tight shadow (`0 4px 6px -1px rgba(0, 0, 0, 0.1)`).

## Shapes

The design system employs a `Soft` roundedness profile (`0.25rem` standard radius), maintaining an architectural and editorial print feel.

### Geometric Rules
- **Containers & Panels:** Infographic containers, data cards, and input fields utilize `0.25rem` (`rounded`) corners.
- **Buttons & Chips:** Segmented filters and regional badges scale between `0.25rem` (`rounded`) and full pills (`rounded-full`) depending on context: segmented controls retain soft square edges (`0.25rem`), while regional pill badges take full curvature (`9999px`).
- **Chart Data Elements:** Donut segments, bar ends, and hemicycle dots remain geometrically pure without artificial edge rounding to preserve spatial data accuracy.

## Components

### Segmented Controls (View Toggles)
- Encased in a soft gray tray (`#f1f5f9`) with `0.25rem` radius and `4px` internal padding.
- Inactive segments: transparent background, `#64748b` text, `font-weight: 500`.
- Active segment: `#ffffff` surface, `#0f172a` text, subtle boundary, and `font-weight: 600`.

### Region & City Badges
- Pill badges for geographic tags (e.g., `BUENOS AIRES`, `CÓRDOBA`, `LUJÁN`).
- Styling: `0.125rem` border, all-caps `label-caps` font, padding `2px 8px`.
- Default: `#f1f5f9` fill, `#334155` text. Active or filtered: `#eff6ff` fill, `#0265c2` border and text.

### Timeline Dots & Connector Lines
- Used for election milestones and chronological reporting.
- Vertical or horizontal lines render at `2px solid #e2e8f0`.
- Nodes are `10px` circles with `2px` white border and `#0265c2` (active) or `#cbd5e1` (pending) fills.

### Metric Callout Bars & Blocks
- Paired comparison values (e.g., majority vs. minority coalition).
- Top numeric readout in `metric-display` with party color designation.
- Underpinned by split proportional horizontal bars with `2px` white separator gap.

### Input Fields & Search
- Low-profile inputs with `1px solid #d1d5db`, `#ffffff` background, `0.25rem` radius, and `Public Sans` body text. Focused state receives `#0265c2` hairline outline.

### Infographic Footer & Masthead
- Footer baseline contains two elements: italic timestamp (`timestamp-italic`) on the left, and high-contrast editorial branding accent on the right.