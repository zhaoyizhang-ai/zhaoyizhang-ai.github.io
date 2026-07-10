---
permalink: /notes/
title: "Notes"
description: "Short learning notes kept separate from the main blog."
---

<p>Short-form notes, references, and learning fragments live here. Formal articles belong in the <a href="{{ '/blog/' | relative_url }}">Blog</a>.</p>

{% assign sorted_notes = site.notes | sort: "date" | reverse %}
{% if sorted_notes.size > 0 %}
  <div class="project-list">
    {% for note in sorted_notes %}{% include note-card.html note=note %}{% endfor %}
  </div>
{% else %}
  <p class="empty-state">Content will be added later.</p>
{% endif %}
