---
permalink: /talks/
title: "Talks"
description: "Talks, presentations, and invited sessions."
---

{% assign items = site.data.cv.talks %}
{% if items.size > 0 %}
  {% for item in items %}
    <article class="cv-item">
      <h2>{{ item.title | escape }}</h2><span class="cv-item__date">{{ item.date | escape }}</span>
      <p class="cv-item__details">{{ item.event | escape }}{% if item.url and item.url != "" %} · <a href="{{ item.url }}">Details</a>{% endif %}</p>
    </article>
  {% endfor %}
{% else %}<p class="empty-state">Content will be added later.</p>{% endif %}
