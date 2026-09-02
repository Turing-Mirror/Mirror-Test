# Band-TI 整合说明

Band-TI 作为 Mirror-Test 的独立 workspace 保存在 band-ti/，主页入口和部署产物统一由根目录构建脚本管理。

## 发布路径

- 源码：band-ti/src/
- 本地角色图片：band-ti/public/assets/characters/
- 独立构建输出：band-ti/dist/client/
- Mirror-Test 发布路径：dist/band-ti/
- 浏览器资源基路径：/band-ti/

Vite 在生产构建时使用 /band-ti/ 作为 base，角色数据使用 Vite 的 BASE_URL 生成图片地址。因此部署到统一站点后，图片不会错误地请求根路径 /assets/。旧 /tests/band-ti/ 地址由根站 301 跳转兼容。

## 验证

~~~bash
npm run build:band-ti
npm run test:band-ti
~~~

Band-TI 原有的 worker/index.js、scripts/prepare-sites-build.mjs、tests/sites-worker.test.mjs 和 .openai/hosting.json 均保留。根目录 npm workspace 提供统一依赖锁定和构建入口。
## 当前内容

Band-TI 维护 150 道题、10 个题目类别；每轮 20 题会从每个类别均衡抽取 2 题，并固定本局题序与选项序。题库覆盖排练、舞台、旧团承诺、身份公开、线上舆情、关系修复等少女乐队场景。首页轮换覆盖全部 72 名角色，其中包含梦限大 MewType 的 5 名角色；角色卡和结果页均链接至提供的萌娘百科页面。首页、答题页与结果页均提供哔哩哔哩、抖音和小红书的图灵镜账号跳转。结果分享图同时带有测试二维码与图灵镜 QQ 群（1077458748）二维码。
