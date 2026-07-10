---
permalink: /experience/
title: "Experience"
description: "Professional and organizational experience."
---

{% assign items = site.data.cv.experience %}
{% if items.size > 0 %}
  {% for item in items %}
    <article class="cv-item">
      <div><h2>{{ item.role | escape }}</h2><p>{{ item.organization | escape }}{% if item.location %} · {{ item.location | escape }}{% endif %}</p></div>
      <span class="cv-item__date">{{ item.start | escape }} – {{ item.end | escape }}</span>
      {% if item.details.size > 0 %}<ul class="cv-item__details">{% for detail in item.details %}<li>{{ detail | escape }}</li>{% endfor %}</ul>{% endif %}
    </article>
  {% endfor %}
{% else %}<p class="empty-state">Content will be added later.</p>{% endif %}
