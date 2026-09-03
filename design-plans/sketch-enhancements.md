# Sketch Enhancement Plan

## Design language
- Audited surface: Landing Page (`index.html`, `style.css`)
- Design sources: `/sketch` skill guidelines
- Documented decisions: Hand-drawn sketch interface, soft teal brand accents, hand-written display headings, rounded pill controls, dashed card outlines, chunky offset pencil-drawn shadows. WCAG 2.2 AA.
- Governing owners and consumers: typeui.sh
- Explicit exceptions: None documented

## Findings
| # | Problem | Evidence | Proposed change | Scope | Confidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Incorrect Typography & Aesthetic | Current fonts are 'Playfair Display' and 'Montserrat', lacking the hand-drawn sketch feel. | Migrate fonts to 'Delicious Handrawn' for headings and 'JetBrains Mono' for monospace accents. Apply dashed borders and chunky offset shadows to cards. | `style.css`, `index.html` | High |
| 2 | Mismatched Brand Colors | Current palette uses Warm Beige and Chocolate Brown. | Migrate to Sketch palette: primary `#1DAD97` (soft teal), secondary `#F4EDE0`, text `#111827`. | `style.css` | High |
| 3 | Controls Lack Sketch Character | Buttons currently have rigid, flat borders. | Update `.btn` to rounded pill controls (`border-radius: 999px`) with dashed borders and chunky offset pencil-drawn shadows. | `style.css` | High |

## Improve first
The highest-leverage finding is to update the Typography, Aesthetic, and Colors simultaneously, as they form the foundational baseline of the Sketch design system. Applying the 'Delicious Handrawn' font along with the soft teal accents and chunky offset shadows will immediately transform the luxury page into the requested friendly, hand-drawn sketch interface.
