---
permalink: /blog/
title: "Blog"
title_zh: "博客"
description: "Long-form writing, updates, and technical articles."
---

<nav class="link-row" aria-label="Blog sections">
  {% for link in site.data.navigation.blog_secondary %}<a class="button-secondary" href="{{ link.url | relative_url }}"><span data-lang-content="en">{{ link.title | escape }}</span><span data-lang-content="zh">{{ link.title_zh | default: link.title | escape }}</span></a>{% endfor %}
</nav>

<p class="example-notice"><strong data-i18n="example_warning">Example content — replace or delete before publishing.</strong> <span data-i18n="example_notice_blog">Starter posts are deliberately labeled and may be removed together.</span></p>

{% if site.posts.size > 0 %}
  <div class="post-list">
    {% for post in site.posts %}{% include post-card.html post=post %}{% endfor %}
  </div>
{% else %}
  <p class="empty-state" data-i18n="content_later">Content will be added later.</p>
{% endif %}
