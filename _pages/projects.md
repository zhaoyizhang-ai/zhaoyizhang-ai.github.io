---
permalink: /projects/
title: "Projects"
title_zh: "项目"
description: "Selected projects, experiments, and ongoing work."
---

<p class="example-notice"><strong data-i18n="example_warning">Example content — replace or delete before publishing.</strong> <span data-i18n="example_notice_projects">The entries below demonstrate every supported project field and are not claims of real work.</span></p>

<div class="filter-bar" aria-label="Project filters">
  <div class="filter-field">
    <label for="project-status" data-i18n="status">Status</label>
    <select id="project-status">
      <option value="all" data-i18n="all_statuses">All statuses</option>
      <option value="Planned" data-i18n="planned">Planned</option>
      <option value="In Progress" data-i18n="in_progress">In Progress</option>
      <option value="Completed" data-i18n="completed">Completed</option>
      <option value="Archived" data-i18n="archived">Archived</option>
    </select>
  </div>
  <p class="filter-results" data-filter-results aria-live="polite"></p>
</div>

<div id="project-list" class="project-list">
  {% for project in site.data.projects %}{% include project-card.html project=project %}{% endfor %}
</div>

{% if site.data.projects.size == 0 %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
