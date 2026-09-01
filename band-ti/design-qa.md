# Design QA

Date: 2026-08-31

## Scope

- Desktop editorial homepage based on the selected first visual direction.
- Mobile homepage and quiz layout.
- 20-question selection flow, result screen, retry action, and character-library filter.
- Local 67-character official-art asset set.

## Evidence

- Desktop homepage was visually inspected in the local browser.
- Desktop quiz and result views were visually inspected after completing all 20 questions.
- Mobile homepage and first question were inspected at 390 by 844 pixels.
- The filter was tested with Roselia and returned five character cards.
- The result retry control returned the test to question one.
- Browser console check returned no warnings or errors.
- Production build and Sites worker tests both passed.

## Findings and fixes

1. The desktop headline initially created an orphaned final character because its central line wrapped.
   - Fix: split the heading into intentional lines and preserved the central line as a single phrase.

2. The same non-wrapping headline overflowed at a phone width.
   - Fix: introduced a mobile-specific display size that fits the full phrase without clipping.

3. The local runtime should not depend on remote image delivery.
   - Fix: all displayed artwork uses local files from public/assets/characters. External official URLs are limited to the optional result-page source link.

4. The gallery can contain 67 images.
   - Fix: non-hero gallery images use native lazy loading, while the hero loads only three local images.

## Final checks

- No custom SVG or CSS illustration substitutes are used.
- No generated image is used in the website.
- No remote artwork is hotlinked by rendered image elements.
- No user input is stored or sent to a server.
- Keyboard-focus styling, semantic buttons, labels, and image alt text are present.

final result: passed
