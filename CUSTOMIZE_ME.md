# CUSTOMIZE ME

第一次发布前按顺序完成本清单。常用个人资料只在 `_config.yml` 顶部的 `profile` 区块修改。

## 1. 发布前必须修改

- `<NAME>`：正式姓名；位置 `_config.yml → profile.name`。
- `<DISPLAY_NAME>`：网站标题和页面显示名称；位置 `_config.yml → profile.display_name`。
- `<SHORT_BIO>`：一句话简介；替换 `_config.yml → profile.short_bio` 的 TODO。
- `<LONG_BIO>`：较完整个人简介；位置 `_config.yml → profile.long_bio`。
- 当前身份或状态：替换 `_config.yml → profile.current_status`。
- 同时填写 `short_bio_zh`、`long_bio_zh` 和 `current_status_zh`；系统语言为中文时会自动使用这些字段。
- `<PROFILE_PHOTO>`：把真实头像放入 `assets/images/profile/`，设置 `profile.profile_photo`；也可以暂时保留明显的 PHOTO 占位块。
- CV：用真实文件覆盖 `files/cv.pdf`，并填写 `_data/cv.yml`。
- 删除或替换所有带 `Example content — replace or delete before publishing.`、`example: true`、`Replace or Delete` 的访客内容。
- 检查仓库、站点与 canonical URL。目前 `<GITHUB_USERNAME>` 已从已登录账号解析为 `zhaoyizhang-ai`；若迁移账号，需要同时修改 `_config.yml` 的 `profile.github_username`、`profile.social.github_url`、`url`、`repository` 和 Git remote。
- 替换 `assets/images/site/og-placeholder.png` 和 `assets/images/icons/` 内的占位图标。
- 完整执行 README 的发布前检查清单。

## 2. 建议修改

- `<EMAIL>`：设置 `_config.yml → profile.email`；留空时不显示。
- `<LOCATION>`：设置 `_config.yml → profile.location`；可只写城市，也可留空。
- 将真实项目写入 `_data/projects.yml`，并删除两条 Example Project。
- 将真实出版物写入 `_data/publications.yml`；没有真实出版物时可清空列表。
- 替换示例 Blog 与 Note，或全部删除后从空站开始。
- 根据内容调整 `_data/navigation.yml` 的顺序、标题和 `enabled`。
- 检查各页面的 `description` 是否准确。
- 优化图片体积，并为每张内容图片填写准确 alt 文本。

## 3. 可选设置

- `<LINKEDIN_URL>`：`profile.social.linkedin_url`。
- `<GOOGLE_SCHOLAR_URL>`：`profile.social.google_scholar_url`。
- `<ORCID>`：`profile.social.orcid`，填写完整 `https://orcid.org/...` URL。
- `<X_URL>`：`profile.social.x_url`。
- Google Analytics：`features.google_analytics`，默认关闭。
- Plausible Analytics：`features.plausible`，默认关闭。
- Giscus：`features.giscus`，默认关闭。
- Google Search Console：`features.google_search_console`，默认关闭。
- 自定义域名：`features.custom_domain`，默认关闭且仓库没有 `CNAME`。

空社交字段必须保持 `""`，不要放 `https://example.com`、`TODO` URL 或其他人的账号。

## 4. 以后需要时再填写

- Notes、Talks、Teaching、Experience、Education、Awards、Service、Contact 页面已经存在。
- 需要公开某页面时，在 `_data/navigation.yml` 将对应 `enabled: false` 改为 `enabled: true`。
- Talks、Teaching、Experience、Education、Awards、Service 复用 `_data/cv.yml`。
- 增加出版物 PDF 时放入 `files/publications/`；项目、博客、出版物图片分别放入对应资源目录。
- 需要同步 Academic Pages 时，按 README 的 upstream 流程在独立分支中选择性更新。

## 占位符总表

| 占位符 | 主要配置位置 | 空值行为 |
| --- | --- | --- |
| `<NAME>` | `_config.yml → profile.name` | 必须替换 |
| `<DISPLAY_NAME>` | `_config.yml → profile.display_name` | 必须替换 |
| `<GITHUB_USERNAME>` | 已配置为 `zhaoyizhang-ai` | 迁移账号时修改 |
| `<EMAIL>` | `_config.yml → profile.email` | 留空则隐藏 |
| `<LOCATION>` | `_config.yml → profile.location` | 留空则隐藏 |
| `<SHORT_BIO>` | `_config.yml → profile.short_bio` | 当前显示 TODO |
| `<LONG_BIO>` | `_config.yml → profile.long_bio` | 当前显示 TODO |
| `<PROFILE_PHOTO>` | `_config.yml → profile.profile_photo` | 显示 PHOTO 占位块 |
| `<LINKEDIN_URL>` | `_config.yml → profile.social.linkedin_url` | 留空则隐藏 |
| `<GOOGLE_SCHOLAR_URL>` | `_config.yml → profile.social.google_scholar_url` | 留空则隐藏 |
| `<ORCID>` | `_config.yml → profile.social.orcid` | 留空则隐藏 |
| `<X_URL>` | `_config.yml → profile.social.x_url` | 留空则隐藏 |
