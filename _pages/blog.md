---
permalink: /blog/
title: "Blog"
description: "Long-form writing, updates, and technical articles."
---

<nav class="link-row" aria-label="Blog sections">
  {% for link in site.data.navigation.blog_secondary %}<a class="button-secondary" href="{{ link.url | relative_url }}">{{ link.title | escape }}</a>{% endfor %}
</nav>

<p class="example-notice"><strong>Example content — replace or delete before publishing.</strong> Starter posts are deliberately labeled and may be removed together.</p>

{% if site.posts.size > 0 %}
  <div class="post-list">
    {% for post in site.posts %}{% include post-card.html post=post %}{% endfor %}
  </div>
{% else %}
  <p class="empty-state">Content will be added later.</p>
{% endif %}
