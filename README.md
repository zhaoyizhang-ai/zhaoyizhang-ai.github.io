# Personal Website and Blog

这是 `zhaoyizhang-ai.github.io` 的源码仓库。网站基于 [Academic Pages](https://github.com/academicpages/academicpages.github.io)（基线提交 `482bc2b`）与 Jekyll，面向长期维护：个人资料集中配置，CV、项目和出版物使用结构化 YAML，Blog 与 Notes 使用 Markdown。

正式地址：<https://zhaoyizhang-ai.github.io>

> 当前姓名、简介、头像、经历等未知信息均为 `TODO` 或占位符。开始填写前先阅读 [CUSTOMIZE_ME.md](CUSTOMIZE_ME.md)。

## 模板与许可证

- 上游模板：Academic Pages，默认分支 `master`。
- Academic Pages 基于 Minimal Mistakes；原始版权声明保留在 [LICENSE](LICENSE) 中。
- 本仓库继续使用 MIT License。请勿删除许可证中的原始版权声明。
- `upstream` Git remote 保留为 `https://github.com/academicpages/academicpages.github.io.git`，便于以后选择性同步安全修复。

## 主要目录

```text
.
├── _config.yml                 # 唯一的常用个人资料和可选集成配置
├── _data/
│   ├── navigation.yml          # 所有导航项的 true/false 开关
│   ├── cv.yml                  # 网页版 CV 数据
│   ├── projects.yml            # 项目数据
│   └── publications.yml        # 出版物数据与 BibTeX
├── _pages/                     # 全部固定页面
├── _posts/                     # 正式 Blog 文章
├── _drafts/                    # 不参与生产构建的 Blog 草稿
├── _notes/                     # 短笔记，与 Blog 分开
├── _layouts/ 和 _includes/     # 页面结构与复用组件
├── assets/
│   ├── css/ 和 js/             # 样式、主题、筛选与轻量动画
│   └── images/                 # 头像、图标、项目、博客、出版物与站点图片
├── files/
│   ├── cv.pdf                  # 下载版 CV
│   ├── publications/           # 出版物 PDF
│   └── downloads/              # 其他小型下载文件
├── scripts/                    # YAML、内容与构建结果检查
└── .github/workflows/pages.yml # 检查、构建和 GitHub Pages 部署
```

## 本地运行

推荐 Ruby `3.3.4` 和 Node.js `22–25`。首次运行：

```bash
bundle config set --local path vendor/bundle
bundle install
npm ci
npm run build:js
bundle exec jekyll serve --livereload
```

访问 <http://127.0.0.1:4000>。若要预览 `_drafts/`：

```bash
bundle exec jekyll serve --drafts --unpublished
```

生产构建与本地检查：

```bash
npm run lint:md
bundle exec ruby scripts/validate_content.rb
JEKYLL_ENV=production bundle exec jekyll build --trace
bundle exec ruby scripts/verify_build.rb _site
bundle exec htmlproofer ./_site --disable-external
```

## 修改个人信息

只编辑 `_config.yml` 顶部的 `profile` 区块。姓名、显示名称、邮箱、城市、简介、头像、当前状态和社交链接均在此处维护；下方的 Jekyll 兼容字段通过 YAML anchors 自动复用，不需要重复修改。

空的 Email、LinkedIn、Google Scholar、ORCID 和 X/Twitter 字段不会生成图标或空链接。

## 替换头像

1. 把图片放到 `assets/images/profile/`，推荐正方形 JPG、PNG 或 WebP，并压缩到合理大小。
2. 在 `_config.yml` 设置：

   ```yaml
   profile_photo: "/assets/images/profile/photo.jpg"
   ```

3. 页面会使用 `Portrait of <DISPLAY_NAME>` 作为替代文本；如需更精确描述，可修改相关 include。

未配置时显示中性 `PHOTO` 占位块，不会沿用模板作者头像。

## 发布 Blog

复制 `_posts/` 中任一示例，文件名使用 `YYYY-MM-DD-slug.md`。常用 front matter：

```yaml
---
title: "Post title"
date: 2026-07-10 09:00:00 +0800
description: "SEO description"
excerpt: "List summary"
tags: [tag-one, tag-two]
categories: [Category]
header:
  image: "/assets/images/blog/cover.png" # 可选
toc: true
math: false
published: true
---
```

- 代码块使用 fenced Markdown 并标明语言。
- 数学文章设置 `math: true`。
- 图片必须填写有意义的 alt 文本。
- 草稿优先放 `_drafts/`；也可同时设置 `published: false`。仅写自定义 `draft: true` 不会阻止 Jekyll 发布。
- 文章页已有目录、上一篇/下一篇、代码高亮、表格、脚注、引用块、SEO 与可选 Giscus。
- 归档、标签、分类和 RSS 会自动更新。

## 发布 Notes

在 `_notes/` 新建 Markdown 文件。推荐字段：

```yaml
---
title: "Note title"
date: 2026-07-10 09:00:00 +0800
summary: "Short summary"
tags: [topic]
---
```

Notes 位于 `/notes/`，不会混入 Blog 日期归档；RSS 默认只包含 Blog。

## 添加项目

编辑 `_data/projects.yml`，复制一条 Example Project 并替换字段：

- `name`、`short_description`、`description`
- `status`：只能是 `Planned`、`In Progress`、`Completed`、`Archived`
- `start_date`、`end_date`
- `tech_stack`、`tags`
- `github_url`、`demo_url`、`docs_url`（为空时隐藏）
- `image` 与 `image_alt`
- `related_posts`：每项使用 `title` 和 `url`
- `featured: true`：显示在首页
- 删除 `example: true`：表示它已经是真实内容

项目图片放到 `assets/images/projects/`。

## 添加出版物

编辑 `_data/publications.yml`。结构支持标题、作者顺序、年份、venue、摘要、DOI、arXiv、PDF、代码、项目页、Citation、BibTeX、封面、类型、年份筛选与精选标记。

- 作者顺序就是 `authors` 数组顺序。
- 要加粗自己的姓名，为该作者设置 `self: true`。
- `doi` 可填 DOI 本身或完整 URL；`arxiv` 可填编号或完整 URL。
- `pdf_url` 可指向 `files/publications/` 下的 PDF。
- `code_url` 和 `project_url` 填完整 HTTPS URL。
- `selected: true` 会进入精选集合；首页会排除所有 `example: true` 条目，只有真实精选出版物才显示。
- BibTeX 写在 `bibtex: |` 多行字段中，页面提供展开和复制按钮。

删除全部出版物示例：清空 `_data/publications.yml` 中的示例列表，保留文件注释即可。页面会显示 `Content will be added later.`。

## 更新网页版 CV

编辑 `_data/cv.yml`。预设模块包括 Summary、Education、Experience、Projects、Publications、Skills、Awards、Certifications、Teaching、Talks、Service 和 Languages。空数组不会产生虚假条目，只显示统一空状态。

Experience、Education、Awards、Teaching、Talks 与 Service 独立页面复用同一份 CV 数据，无需重复填写。

## 替换 CV PDF

用真实 PDF 直接覆盖 `files/cv.pdf`，文件名和路径保持不变即可。网页按钮、侧栏和首页会自动指向新文件。当前文件是明确标记的有效占位 PDF，不会冒充真实 CV。

网页 CV 与 PDF 分开维护是刻意选择：流程简单、稳定，不需要 GitHub Pages 不支持的生成插件。

## 启用隐藏页面与修改导航栏

只编辑 `_data/navigation.yml`。将某项：

```yaml
enabled: false
```

改为未加引号的 YAML 布尔值：

```yaml
enabled: true
```

即可显示。不要写成字符串 `"false"`，Liquid 会把非空字符串当作真值。排序和标题也在同一文件修改。隐藏只影响导航，不会删除页面。

默认显示 Home、About、CV、Publications、Projects、Blog；Notes、Talks、Teaching、Experience、Education、Awards、Service、Contact 默认隐藏。

## 启用 Giscus 评论

1. 为仓库开启 Discussions，并在 [giscus.app](https://giscus.app) 生成配置。
2. 在 `_config.yml` 的 `features.giscus` 填写 `repo`、`repo_id`、`category`、`category_id`。
3. 最后把 `enabled` 改为 `true`。

字段不完整时脚本不会加载。不要虚构或复制其他仓库的 ID。

## 配置 Analytics

Google Analytics 4：填写 `features.google_analytics.measurement_id`，再设置 `enabled: true`。

Plausible：填写 `features.plausible.domain`，确认 `script_url`，再设置 `enabled: true`。

两者默认关闭，不包含统计 ID，也不包含密钥。启用前请评估隐私和 Cookie 告知义务。

## 绑定自定义域名

默认不提交 `CNAME`。需要时：

1. 在 `_config.yml` 更新 `url`，并填写 `features.custom_domain.domain`、设置 `enabled: true`。
2. 在仓库根目录新增 `CNAME`，内容只有域名。
3. 按 [GitHub Pages 自定义域名文档](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) 配置 DNS。
4. 在 Settings → Pages 验证域名并启用 Enforce HTTPS。

## 部署

推送到默认分支 `main` 后，`.github/workflows/pages.yml` 会依次执行内容检查、Markdown 检查、生产构建、内部链接/HTML 检查、RSS/Sitemap/404 检查，再上传并部署 Pages artifact。Pull Request 只构建检查，不部署。

仓库设置中 Pages 的 Source 必须选择 **GitHub Actions**。构建错误会显示在 Actions 对应的具名步骤中。

## 排查 GitHub Actions 构建失败

1. 打开仓库 Actions → `Build, validate, and deploy GitHub Pages`。
2. 查看首个失败步骤，不要只看最后的 deploy。
3. `Validate YAML and content schema` 失败：检查 YAML 缩进、布尔值和必填字段。
4. `Lint Markdown` 失败：本地运行 `npm run lint:md`。
5. `Build Jekyll site` 失败：本地运行带 `--trace` 的生产构建。
6. `Check generated HTML and links` 失败：检查报告里的源页面和目标路径。
7. deploy 失败但 build 成功：确认 Settings → Pages 使用 GitHub Actions，workflow 拥有 `pages: write` 和 `id-token: write`。

依赖由 `Gemfile.lock` 与 `package-lock.json` 固定。升级依赖后应重新执行全部检查再提交。

## 同步上游模板更新

本仓库用 `origin` 指向个人仓库，用 `upstream` 指向 Academic Pages：

```bash
git remote -v
git fetch upstream
git log --oneline main..upstream/master
```

定制程度较高后，优先在临时分支中 cherry-pick 明确的安全修复或 bug fix：

```bash
git switch -c maintenance/academic-pages-update
git cherry-pick <UPSTREAM_COMMIT>
```

如果决定合并整批更新，先建分支并准备处理 `_config.yml`、navigation、masthead、author profile 和样式冲突。不要向 `upstream` 推送。

## 删除全部示例内容

发布前删除：

- `_posts/2026-01-01-example-welcome.md`
- `_posts/2026-01-02-example-code.md`
- `_posts/2026-01-03-example-math.md`
- `_notes/example-note.md`
- `_data/projects.yml` 中两条 `example: true` 项目
- `_data/publications.yml` 中 `example: true` 出版物
- `assets/images/blog/example-cover.png`

然后搜索残留：

```bash
rg -n "Example content|example: true|Replace or Delete|replace or delete" \
  _posts _notes _data assets README.md CUSTOMIZE_ME.md
```

README 和 CUSTOMIZE_ME 中的说明文字可以保留；面向访客的内容目录不应再有结果。

## 大文件与资源管理

GitHub Pages 和普通 Git 仓库不适合大量数据集、模型权重、训练检查点、视频或超大 PDF。请使用合适的对象存储、发布平台或 Git LFS（先确认 Pages 行为和额度），在网站中只放压缩图片、小型文档和必要下载。

不要提交 API key、私钥、访问令牌、`.env`、本地缓存、`_site/`、`vendor/bundle/` 或 `node_modules/`。

## 发布前检查清单

- [ ] 完成 `CUSTOMIZE_ME.md` 的“发布前必须修改”。
- [ ] 姓名、简介、状态、邮箱和链接准确，无隐私泄露。
- [ ] 替换头像、favicon、分享预览图和 `files/cv.pdf`。
- [ ] 删除全部 Example 内容和无用占位符。
- [ ] 所有图片都有准确 alt 文本。
- [ ] 空社交字段保持空字符串，不放占位 URL。
- [ ] 本地构建、YAML、Markdown、HTML、链接检查全部通过。
- [ ] 在手机宽度和桌面宽度检查导航、正文、表格和代码块。
- [ ] 检查 system、light、dark 三种主题及键盘焦点。
- [ ] 检查 `/404.html`、`/feed.xml`、`/sitemap.xml`、`/robots.txt`。
- [ ] Actions 成功，正式 URL 使用 HTTPS，根路径资源无 404。
