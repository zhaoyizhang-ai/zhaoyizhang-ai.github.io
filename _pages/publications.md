---
permalink: /publications/
title: "Publications"
title_zh: "出版物"
description: "Publications and related resources."
---

<p class="example-notice"><strong data-i18n="example_warning">Example content — replace or delete before publishing.</strong> <span data-i18n="example_notice_publications">The demonstration entry below is explicitly fictional and only documents the publication schema.</span></p>

{% assign publication_years = site.data.publications | map: "year" | uniq | sort | reverse %}
{% assign publication_types = site.data.publications | map: "type" | uniq | sort %}

<div class="filter-bar" aria-label="Publication filters">
  <div class="filter-field">
    <label for="publication-year" data-i18n="year">Year</label>
    <select id="publication-year">
      <option value="all" data-i18n="all_years">All years</option>
      {% for year in publication_years %}<option value="{{ year }}">{{ year }}</option>{% endfor %}
    </select>
  </div>
  <div class="filter-field">
    <label for="publication-type" data-i18n="type">Type</label>
    <select id="publication-type">
      <option value="all" data-i18n="all_types">All types</option>
      {% for type in publication_types %}<option value="{{ type | escape }}">{{ type | escape }}</option>{% endfor %}
    </select>
  </div>
  <p class="filter-results" data-filter-results aria-live="polite"></p>
</div>

<div id="publication-list" class="publication-list">
  {% for publication in site.data.publications %}{% include publication-card.html publication=publication %}{% endfor %}
</div>

{% if site.data.publications.size == 0 %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
