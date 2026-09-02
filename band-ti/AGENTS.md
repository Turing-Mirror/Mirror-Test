# Band-TI 子项目说明

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same Band-TI workspace can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project decisions

- The selected visual direction is the first concept: a desktop editorial layout with warm off-white paper, black typography, and a restrained cherry-red accent.
- The primary flow is a 20-question personality quiz that returns one character from the local 67-character girl-band-anime catalog.
- Use the downloaded local official character art from `public/assets/characters/`; do not replace it with generated art.
- Maintain a 100-question, 10-category bank and draw exactly two questions from each category for every 20-question session. Keep the full 67-character roster rotating on the home page, link each character to its supplied Moegirl Wiki entry, and show the Turing Mirror QQ group (1077458748) plus its QR code in result sharing.
- The result flow includes expanded matching context, a QR code back to the test, and a locally generated share poster using the existing official character art. Do not use AI-generated replacement artwork.
- 2026-09-02：首页以用户提供的舞台式示意图为准。左侧为大标题与两项同级主操作；右侧必须使用三至四张重叠的本地角色图形成舞台，而不是密集网格。更多测试必须在首屏、结果页与页尾作为明确的大入口，直达测试镜首页；不能只放在顶部导航或小型返回链接中。