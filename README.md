# Mirror-Test

Mirror-Test 是面向 test.turingmirror.com 的静态互动测试总仓。仓库保留原有的动漫与 GalGame 测试，并将 Band-TI 作为首发的新测试入口统一发布。

## 当前内容

- /tests/anime-summer-2026/：2026 夏季番性格测试。
- /tests/galgame-test/：GalGame 命定路线测试。
- /tests/band-ti/：Band-TI 少女乐队角色测试，20 道题、67 名角色、8 部作品、14 组乐队或音乐组合。
- /tests/galgame-match/：旧 GalGame 地址的兼容跳转。

主页只展示以上三个正式入口。测试结果仅供娱乐，不代表真实人格判断。

## 目录

- src/：Mirror-Test 首页源码。
- tests-src/：动漫与 GalGame 测试源码。
- band-ti/：Band-TI 的 Vite/React 子项目，保留其本地资源、构建脚本和 Sites 兼容文件。
- scripts/build.mjs：生成统一的 Cloudflare Pages 静态输出。
- docs/：部署、来源和整合说明。
- wrangler.jsonc：Cloudflare Pages 项目配置。

## 本地开发

环境要求：Node.js 20 或更高版本。

~~~bash
npm install
npm run build
npm run test:band-ti
npm run dev
~~~

构建输出位于 dist/。Band-TI 的构建结果会复制到 dist/tests/band-ti/，图片基路径会自动使用 /tests/band-ti/。

## GitHub

正式仓库：

https://github.com/Turing-Mirror/Mirror-Test

## Cloudflare Pages

Pages 项目名为 mirror-test。首次使用时：

~~~bash
npm run cf:login
npm run cf:project:create
npm run deploy:pages
~~~

部署命令使用 Wrangler 直接上传 dist/，生产分支为 main。现有旧项目不会被本仓库命令删除。

## 自定义域名

部署完成后，需要在 Cloudflare 控制台的 Workers & Pages → mirror-test → Custom domains 中添加：

test.turingmirror.com

如果控制台要求单独配置 DNS，请在 turingmirror.com 区域添加：

- 类型：CNAME
- 名称：test
- 目标：mirror-test.pages.dev

必须先在 Pages 项目中添加 Custom domain，再确认 DNS。不要只手动添加 CNAME，否则可能出现 522。

## 版权与开源说明

本仓库没有声明统一的顶层开源许可证。第三方依赖按各自许可证提供。Band-TI 使用的角色图片来自各作品官方页面，角色、作品名称和图片权利归对应权利方所有；来源链接保存在 band-ti/src/data/characters.js。

如需对本仓库源代码授予明确许可证，请另行添加经确认的 LICENSE 文件，不应从原项目自动推断。

## 相关文档

- [Cloudflare Pages 部署说明](docs/deployment.md)
- [Band-TI 整合说明](docs/band-ti-integration.md)
- [动漫测试来源记录](docs/result.md)