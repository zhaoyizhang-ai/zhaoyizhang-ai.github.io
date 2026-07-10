---
title: "Example Article — Code Highlighting"
title_zh: "示例文章——代码高亮"
date: 2026-01-02 09:00:00 +0800
description: "A code-focused example article."
excerpt: "Example content — replace or delete before publishing. This post demonstrates fenced code blocks and inline code."
excerpt_zh: "示例内容——发布前请替换或删除。本文展示围栏代码块与行内代码。"
tags: [example, code]
categories: [Technical]
example: true
draft: false
published: true
sitemap: false
robots: "noindex,nofollow"
toc: true
---

> **Example content — replace or delete before publishing.** The snippet below is instructional sample code, not a project claim.

## Python example

Fenced blocks use Rouge syntax highlighting. Set the language immediately after the opening fence.

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class Post:
    title: str
    is_draft: bool = True


def publishable(post: Post) -> bool:
    """Return True only when a post is ready for the public site."""
    return bool(post.title.strip()) and not post.is_draft
```

Inline code such as `bundle exec jekyll serve` is supported as well.

## Draft workflow

Place unfinished posts in `_drafts/` or set `published: false`. The custom `draft` field is useful for humans, but Jekyll only honors `published: false` and the `_drafts` directory.
