---
name: Chronicle System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#414752'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#717783'
  outline-variant: '#c1c7d4'
  surface-tint: '#005fae'
  primary: '#0059a4'
  on-primary: '#ffffff'
  primary-container: '#0072ce'
  on-primary-container: '#f4f6ff'
  inverse-primary: '#a5c8ff'
  secondary: '#b6171e'
  on-secondary: '#ffffff'
  secondary-container: '#da3433'
  on-secondary-container: '#fffbff'
  tertiary: '#59595a'
  on-tertiary: '#ffffff'
  tertiary-container: '#727172'
  on-tertiary-container: '#faf6f7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a5c8ff'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#004785'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#930010'
  tertiary-fixed: '#e5e2e3'
  tertiary-fixed-dim: '#c8c6c7'
  on-tertiary-fixed: '#1b1b1c'
  on-tertiary-fixed-variant: '#474647'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
spacing:
  margin-edge: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  container-max: 1280px
---

## Brand & Style

This design system is built upon a journalistic foundation of authority, clarity, and precision. It draws inspiration from heritage newsroom aesthetics, prioritizing information density and legibility over decorative flourishes. The personality is intellectual and reliable, designed to present complex data and narrative content with institutional credibility.

The visual style leans heavily into **Minimalism** with a **Corporate / Modern** structure. It utilizes a strict white-space economy, high-contrast typography, and thin architectural lines to separate concerns. By removing unnecessary ornamentation, the system ensures that the user’s focus remains entirely on the data and the reporting.

## Colors

The color palette is anchored in a high-contrast "Ink on Paper" philosophy. The default mode is strictly **light**, utilizing a pure white background to maximize readability.

*   **Primary Blue:** Extracted from the heritage masthead, this color is used for branding, primary navigation indicators, and key interactive elements.
*   **Secondary Red:** A classic editorial red used for alerts, live status indicators, and specific category highlighting to draw immediate attention.
*   **Tertiary/Neutral Scale:** A rigorous range of greys. Deep charcoals are reserved for long-form body text to reduce eye strain, while lighter greys define the architectural grid through borders and dividers.
*   **Data Visualization:** For charts and graphs, the palette expands into desaturated tints of the primary blue and secondary red to maintain a unified aesthetic.

## Typography

The typographic system uses a "Dual-Tone" strategy to distinguish between narrative content and functional UI.

1.  **Editorial Serif:** **Source Serif 4** is used for all headings and editorial titles. It provides a sense of history and trustworthiness. For large display sizes, a tighter letter-spacing is applied to mimic traditional broadsheet layouts.
2.  **Functional Sans-Serif:** **Inter** handles all body text, UI labels, and data points. Its neutral, systematic nature ensures clarity in high-density tables and information-heavy dashboards.

**Hierarchy Rules:**
- Titles should never use the secondary red unless they represent a "Breaking News" or "Critical Alert" status.
- UI labels and navigation items use uppercase with slight tracking (letter-spacing) to create a clear visual distinction from body copy.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to ensure the editorial integrity of the content remains consistent across wide screens. 

*   **Grid System:** A 12-column grid with 16px gutters.
*   **Sectioning:** Thin horizontal rules (1px) are the primary method of separating content blocks. Avoid using background color shifts to define sections.
*   **Data Density:** For data visualization components, spacing is reduced to 8px (stack-sm) to allow for more comparative information within a single viewport.
*   **Mobile Adaptation:** On mobile devices, margins shrink to 16px, and the 12-column grid collapses into a single-column stack. Headlines scale down significantly (refer to `headline-lg-mobile`) to maintain a clear visual start to articles without excessive scrolling.

## Elevation & Depth

This design system avoids the use of shadows to maintain its minimalist, "flat" journalistic aesthetic. Depth is communicated through **Low-contrast outlines** and **Tonal layering**.

*   **Surfaces:** All primary content sits on a pure white (#FFFFFF) base. 
*   **Dividers:** Use 1px solid borders in light grey (#E0E0E0) to create structure.
*   **Hover States:** Interactive elements are indicated by a subtle shift to a very light grey (#F5F5F5) background or by changing the text color to the primary blue. 
*   **Overlays:** Modals and menus should use a crisp 1px border with a high-blur backdrop filter rather than heavy drop shadows to suggest a "layered paper" effect.

## Shapes

The shape language is strictly **Sharp (0)**. 

To reinforce the professional and structured nature of a news organization, all UI elements—including buttons, input fields, and image containers—feature 90-degree corners. This creates a rigorous, grid-aligned look that feels intentional and architectural. The only exception is the use of circular icons (such as currency symbols or avatars) to provide a soft counterpoint to the otherwise rectangular interface.

## Components

### Buttons
Buttons are strictly rectangular. The primary action button uses the Primary Blue background with white text. Ghost buttons (transparent background with a 1px border) are preferred for secondary actions to maintain a lightweight UI.

### Data Chips & Tags
Used for categories or stock tickers. These feature a light grey background with small, bold uppercase text. When representing financial data, the secondary red is used for negative trends and the primary blue (or a dedicated green) for positive trends.

### Input Fields
Inputs are defined by a bottom-border only or a very light 1px perimeter stroke. Focus states are indicated by the Primary Blue color appearing on the bottom border.

### Lists & Tables
The core of the system. Tables use minimal padding and no vertical borders—only horizontal dividers to guide the eye. Row headers use the bold weight of the functional sans-serif font.

### Cards
Cards do not use shadows. They are defined by 1px borders. In an editorial context, cards for articles prioritize the Serif headline, followed by a small category label in the secondary red.