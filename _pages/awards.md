---
permalink: /awards/
title: "Awards"
description: "Awards and recognition."
---

{% assign items = site.data.cv.awards %}
{% if items.size > 0 %}
  {% for item in items %}
    <article class="cv-item">
      <div><h2>{{ item.title | escape }}</h2><p>{{ item.issuer | escape }}</p></div>
      <span class="cv-item__date">{{ item.year | escape }}</span>
      {% if item.description %}<p class="cv-item__details">{{ item.description | escape }}</p>{% endif %}
    </article>
  {% endfor %}
{% else %}<p class="empty-state">Content will be added later.</p>{% endif %}
