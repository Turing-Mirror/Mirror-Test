# Band-TI 整合说明

Band-TI 作为 Mirror-Test 的独立 workspace 保存在 band-ti/，主页入口和部署产物统一由根目录构建脚本管理。

## 发布路径

- 源码：band-ti/src/
- 本地角色图片：band-ti/public/assets/characters/
- 独立构建输出：band-ti/dist/client/
- Mirror-Test 发布路径：dist/tests/band-ti/
- 浏览器资源基路径：/tests/band-ti/

Vite 在生产构建时使用 /tests/band-ti/ 作为 base，角色数据使用 Vite 的 BASE_URL 生成图片地址。因此部署到统一站点后，图片不会错误地请求根路径 /assets/。

## 验证

~~~bash
npm run build:band-ti
npm run test:band-ti
~~~

Band-TI 原有的 worker/index.js、scripts/prepare-sites-build.mjs、tests/sites-worker.test.mjs 和 .openai/hosting.json 均保留。根目录 npm workspace 提供统一依赖锁定和构建入口。