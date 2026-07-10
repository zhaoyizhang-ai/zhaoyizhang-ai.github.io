---
permalink: /service/
title: "Service"
title_zh: "服务"
description: "Community and professional service."
---

{% assign items = site.data.cv.service %}
{% if items.size > 0 %}
  {% for item in items %}
    <article class="cv-item">
      <div><h2>{{ item.role | escape }}</h2><p>{{ item.organization | escape }}</p></div>
      <span class="cv-item__date">{{ item.period | escape }}</span>
    </article>
  {% endfor %}
{% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
