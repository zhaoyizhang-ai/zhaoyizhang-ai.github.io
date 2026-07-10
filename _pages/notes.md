---
permalink: /notes/
title: "Notes"
title_zh: "笔记"
description: "Short learning notes kept separate from the main blog."
---

<p><span data-lang-content="en">Short-form notes, references, and learning fragments live here. Formal articles belong in the <a href="{{ '/blog/' | relative_url }}">Blog</a>.</span><span data-lang-content="zh">这里收录简短的学习笔记、参考资料与知识片段；正式文章放在<a href="{{ '/blog/' | relative_url }}">博客</a>中。</span></p>

{% assign sorted_notes = site.notes | sort: "date" | reverse %}
{% if sorted_notes.size > 0 %}
  <div class="project-list">
    {% for note in sorted_notes %}{% include note-card.html note=note %}{% endfor %}
  </div>
{% else %}
  <p class="empty-state" data-i18n="content_later">Content will be added later.</p>
{% endif %}
