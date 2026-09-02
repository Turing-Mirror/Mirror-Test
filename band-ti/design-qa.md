# Design QA

Date: 2026-09-02

## Scope

- Target surface: Band-TI desktop home page at /band-ti/.
- Source visual truth: user-provided editorial reference C:\Users\Ka251\AppData\Local\Temp\codex-clipboard-675f556a-5c46-46e8-821b-98c4924e6d2a.png.
- Regression evidence: user-provided current-state screenshots C:\Users\Ka251\AppData\Local\Temp\codex-clipboard-616bee0d-0bcc-4e3e-b658-b028c092e7a4.png and C:\Users\Ka251\AppData\Local\Temp\codex-clipboard-8a9bee35-cdb3-4881-a4b3-5b4c47fbb7c8.png.
- Intended changes: left-side editorial copy with two equal primary actions, a layered 3-to-4 character stage instead of a dense grid, and visible More Tests actions on the home page, result page, and footer.
- Character coverage: 67 local characters are shuffled into 17 groups of at most four for each complete rotation. The next full rotation reshuffles the roster.

## Implemented changes

- Replaced the fixed eight-card roster grid with a layered character stage. Portrait source art uses contain fitting; landscape source art uses cover fitting after its natural dimensions load, preventing the large blank vertical cards visible in the regression screenshot.
- Reduced the rotation group size to four characters and added previous/next controls, pause/resume, automatic rotation, and reduced-motion handling. The roster is shuffled when the page opens and again after each complete rotation; redundant 17-group number controls are removed.
- Added a large More Tests action beside Start Quiz, a dedicated discovery section linking to the two other live tests and the Mirror-Test directory, a full-width result CTA, and a prominent footer CTA.
- Added localized copy for Simplified Chinese, Traditional Chinese, English, and Japanese. The existing derived locales inherit the new copy.
- Added automated coverage to ensure every one of the 67 characters appears exactly once across the rotation groups and that the home/result/footer More Tests surfaces remain present.

## Automated evidence

- npm run test: passed 8 of 8 tests.
- npm run build: passed for Band-TI and produced dist/client, dist/server/index.js, and dist/.openai/hosting.json.
- npm run test:sites: passed 4 of 4 checks.
- Root Mirror-Test build: passed and copied Band-TI into the /band-ti/ deployment route.

## Rendered implementation evidence

- Local implementation URL: http://localhost:5173/.
- Intended desktop viewport: 1920 by 1080 CSS pixels, matching the supplied regression screenshot.
- Implementation screenshot: unavailable.
- Browser-rendered capture was blocked before navigation because the available browser-control runtime exited unexpectedly on two fresh connection attempts.
- No code-only review is counted as visual comparison. The source and implementation were therefore not put into a side-by-side image comparison.

## Required fidelity surfaces

- Fonts and typography: pending browser-rendered capture.
- Spacing and layout rhythm: pending browser-rendered capture.
- Colors and visual tokens: warm off-white, black, and restrained cherry-red were preserved in code; visual confirmation is pending.
- Image quality and asset fidelity: existing local official character art is retained; orientation-specific fit logic was added, but crop quality requires browser-rendered capture.
- Copy and content: primary More Tests copy and the two linked tests are present in all supported primary locales; visual hierarchy is pending capture.

## Findings

- [P1] Visual comparison is blocked.
  - Location: desktop home page and the final three-character rotation state.
  - Evidence: no browser-rendered implementation screenshot could be captured after the browser-control runtime reset twice.
  - Impact: the final layered composition, crop behavior, and CTA prominence cannot be certified visually from this environment.
  - Fix: restore browser capture, load /band-ti/ at 1920 by 1080, capture the initial and final rotation groups, compare them against the supplied reference, and resolve any remaining P1 or P2 differences.

## Comparison history

1. User-provided regression screenshot showed an eight-card grid and blank vertical cards for landscape Morfonica art. The implementation changed to a layered stage with dimension-aware image fitting and compact groups.
2. Browser capture attempt after the rebuild was blocked before a screenshot was produced. No visual pass was claimed.

final result: blocked
