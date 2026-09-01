# Cloudflare Pages 部署说明

## 项目配置

- Pages 项目：mirror-test
- 构建输出：dist/
- 生产分支：main
- 生产域名：test.turingmirror.com

## 构建与测试

在仓库根目录执行：

~~~bash
npm install
npm run build
npm run test:band-ti
~~~

顶层构建会依次完成以下工作：

1. 复制 Mirror-Test 首页。
2. 打包动漫测试和 GalGame 测试。
3. 调用 Band-TI workspace 构建，并把其客户端输出复制到 /band-ti/。
4. 生成 tests-manifest.json 和 build-meta.json。
5. 检查 HTML 中不存在空的 src 属性。

## Wrangler 命令

~~~bash
npm run cf:login
npm run cf:project:create
npm run deploy:pages
~~~

cf:project:create 只需要首次创建 Pages 项目时执行。部署脚本使用 Wrangler 直接上传 dist/，不会删除旧 Pages 项目。

## 路由

- /：Mirror-Test 首页。
- /anime-summer-2026/：2026 夏季番测试。
- /galgame-test/：GalGame 测试。
- /band-ti/：Band-TI 少女乐队角色测试。
- /tests/anime-summer-2026/、/tests/galgame-test/、/tests/band-ti/ 和 /tests/galgame-match/：以 301 兼容旧地址并跳转到相应根路径。

## 自定义域名与 DNS

第一次部署后，在 Cloudflare 控制台中打开：

Workers & Pages → mirror-test → Custom domains → Set up a domain

添加：

test.turingmirror.com

若需要手动配置 DNS，在 turingmirror.com 区域添加：

- 类型：CNAME
- 名称：test
- 目标：mirror-test.pages.dev

先添加 Pages Custom domain，再确认 DNS。只添加 CNAME 而未完成 Pages 绑定时，Cloudflare 可能返回 522。

## 回滚

Cloudflare Pages 会保留历史部署。出现问题时，可在 Pages 项目的 Deployments 页面选择上一版部署进行回滚。不要删除旧的 Pages 项目，等 test.turingmirror.com 验证完成后再由项目所有者手动处理。