# Design QA

Date: 2026-09-01

## Scope

- Desktop hero refresh for the girl-band character quiz.
- Four rotating three-character sets, staggered card entry, and restrained artwork motion.
- Manual next-set and pause controls, plus `prefers-reduced-motion` support.

## Comparison target

- Source visual truth: `C:\Users\Ka251\AppData\Local\Temp\codex-clipboard-675f556a-5c46-46e8-821b-98c4924e6d2a.png`.
- Source dimensions: 1489 by 1057 pixels.
- Intended implementation viewport: desktop, 1920 by 1080 CSS pixels at device scale factor 1.
- State: hero default state and one automatic character-set transition.

## Rendered implementation evidence

- Local preview was started at `http://127.0.0.1:5173/`.
- Implementation screenshot: unavailable. The in-app browser control process exited unexpectedly on two connection attempts before it could open the preview or capture a screenshot.
- Because a browser-rendered capture is unavailable, a full-view comparison and focused hero-region comparison could not be made. No separate image views were treated as a visual comparison.

## Implemented interaction checks

- Production build passed.
- Static-site worker tests passed: 4 of 4.
- The hero source now advances through four deterministic groups of three local character assets every 5.2 seconds.
- Each incoming card remounts with a staggered entrance animation. The character image has a restrained motion loop.
- The visible controls allow the visitor to advance immediately or pause and resume automatic rotation.
- `prefers-reduced-motion: reduce` disables automatic rotation and CSS movement while retaining manual group changes.

## Findings

- [P1] Browser-rendered visual comparison is unavailable.
  - Location: desktop hero visual QA.
  - Evidence: the local implementation could not be captured; the in-app browser control process exited before opening the local preview.
  - Impact: typography, crop, spacing, colors, image framing, control positioning, and animation timing cannot be verified against the supplied visual target.
  - Fix: restore the local browser connection, capture the hero at the stated viewport, then compare that capture with the source image and iterate on any P0–P2 differences.

## Required fidelity surfaces

- Fonts and typography: blocked pending rendered capture.
- Spacing and layout rhythm: blocked pending rendered capture.
- Colors and visual tokens: blocked pending rendered capture.
- Image quality and asset fidelity: local character assets are retained; final crop and sharpness review is blocked pending rendered capture.
- Copy and content: character names, labels, controls, and stage counter are implemented; final visual hierarchy review is blocked pending rendered capture.

## Comparison history

1. Initial attempt: local preview started successfully, but no implementation screenshot could be captured because browser control exited unexpectedly.
2. Retry: browser control exited unexpectedly again before diagnostic documentation or page capture could be read.

final result: blocked
