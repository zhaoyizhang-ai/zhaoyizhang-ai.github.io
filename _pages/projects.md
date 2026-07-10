---
permalink: /projects/
title: "Projects"
description: "Selected projects, experiments, and ongoing work."
---

<p class="example-notice"><strong>Example content — replace or delete before publishing.</strong> The entries below demonstrate every supported project field and are not claims of real work.</p>

<div class="filter-bar" aria-label="Project filters">
  <div class="filter-field">
    <label for="project-status">Status</label>
    <select id="project-status">
      <option value="all">All statuses</option>
      <option value="Planned">Planned</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Archived">Archived</option>
    </select>
  </div>
  <p class="filter-results" data-filter-results aria-live="polite"></p>
</div>

<div id="project-list" class="project-list">
  {% for project in site.data.projects %}{% include project-card.html project=project %}{% endfor %}
</div>

{% if site.data.projects.size == 0 %}<p class="empty-state">Content will be added later.</p>{% endif %}
