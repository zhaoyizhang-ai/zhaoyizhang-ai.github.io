---
permalink: /teaching/
title: "Teaching"
title_zh: "教学"
description: "Teaching and mentoring activities."
---

{% assign items = site.data.cv.teaching %}
{% if items.size > 0 %}
  {% for item in items %}
    <article class="cv-item">
      <h2>{{ item.course | escape }}</h2><span class="cv-item__date">{{ item.term | escape }}</span>
      <p class="cv-item__details">{{ item.role | escape }}{% if item.institution %} · {{ item.institution | escape }}{% endif %}</p>
    </article>
  {% endfor %}
{% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
