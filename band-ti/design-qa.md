# Design QA

Date: 2026-09-01

## Scope

- 48-question categorized bank with a balanced, deterministic 20-question session per run.
- Expanded result dossier: calculated resonance index, primary and secondary traits, four close matches, and two contrast voices.
- Locally generated QR code, result-poster preview, and PNG download using existing local official character art.

## Comparison target

- Product reference: the existing result, QR, preview, and download flows in `tests-src/anime-summer-2026/` and `tests-src/galgame-test/`.
- Band-TI visual language: warm off-white paper, black typography, and restrained cherry-red accent as recorded in `band-ti/AGENTS.md`.
- Intended implementation viewport: desktop, 1920 by 1080 CSS pixels at device scale factor 1; mobile, 390 by 844 CSS pixels at device scale factor 1.
- State: completed quiz result with generated QR code, poster preview open, and mobile result layout.

## Rendered implementation evidence

- Local preview was started at `http://127.0.0.1:5173/` and returned HTTP 200.
- The updated application and question modules returned HTTP 200 from the local preview.
- QR generator smoke test produced a PNG data URL for the public test path.
- Implementation screenshots: unavailable. The in-app browser control process exited unexpectedly before it could open the local preview or capture a screenshot.
- Full-view and focused region comparisons were therefore not made. No code-only inspection was treated as visual QA.

## Implemented interaction checks

- Root production build passed with QR and poster libraries split into on-demand chunks.
- Automated tests passed: 6 of 6, including question-bank breadth, deterministic balanced sessions, and static-site worker behavior.
- The question bank contains 48 unique questions across six categories. Each session contains 20 unique questions and at least three questions from each category.
- The QR generator is local and creates a PNG data URL without an external CDN.
- The poster path uses only the result data, QR image, and existing same-origin local character art. It does not upload answers or replace official art with generated imagery.

## Findings

- [P1] Browser-rendered comparison remains unavailable.
  - Location: desktop and mobile result visual QA, QR rendering, poster preview, and downloaded poster composition.
  - Evidence: browser control exited unexpectedly before local page capture on the current task and the preceding visual task.
  - Impact: card crop, spacing, responsive layout, QR placement, preview overlay, and final canvas composition cannot be visually certified.
  - Fix: restore local browser control, complete a 20-question session, capture the stated desktop and mobile states, open a poster preview, download a poster, and compare those captures against the existing test references.

## Required fidelity surfaces

- Fonts and typography: blocked pending rendered capture.
- Spacing and layout rhythm: blocked pending rendered capture.
- Colors and visual tokens: blocked pending rendered capture.
- Image quality and asset fidelity: local official character assets are retained; final crop and exported-poster quality are blocked pending rendered capture.
- Copy and content: result copy, score labels, QR explanation, and poster labels are implemented; final hierarchy review is blocked pending rendered capture.

## Comparison history

1. Initial hero animation QA: local preview started, but no screenshot could be captured because browser control exited unexpectedly.
2. Expanded-result QA: local preview and module smoke checks passed, but browser control exited unexpectedly again before visual capture.

final result: blocked
