---
permalink: /education/
title: "Education"
title_zh: "教育"
description: "Education and training."
---

{% assign items = site.data.cv.education %}
{% if items.size > 0 %}
  {% for item in items %}
    <article class="cv-item">
      <div><h2>{{ item.institution | escape }}</h2><p>{{ item.degree | escape }}{% if item.field %}, {{ item.field | escape }}{% endif %}</p></div>
      <span class="cv-item__date">{{ item.start | escape }} – {{ item.end | escape }}</span>
      {% if item.details.size > 0 %}<ul class="cv-item__details">{% for detail in item.details %}<li>{{ detail | escape }}</li>{% endfor %}</ul>{% endif %}
    </article>
  {% endfor %}
{% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
