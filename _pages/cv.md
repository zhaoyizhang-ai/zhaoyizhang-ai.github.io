---
permalink: /cv/
title: "CV"
title_zh: "简历"
description: "Web CV and downloadable PDF."
---

{% assign cv = site.data.cv %}

<div class="cv-actions link-row">
  <a class="button-primary" href="{{ site.profile.cv_pdf | relative_url }}" data-i18n="download_cv">Download CV</a>
  <button class="button-secondary" type="button" onclick="window.print()" data-i18n="print_page">Print this page</button>
</div>

<section class="cv-section" aria-labelledby="cv-summary">
  <h2 id="cv-summary" data-i18n="summary">Summary</h2>
  <p><span data-lang-content="en">{{ cv.summary | escape }}</span><span data-lang-content="zh">{{ cv.summary_zh | default: cv.summary | escape }}</span></p>
</section>

<section class="cv-section" aria-labelledby="cv-education">
  <h2 id="cv-education" data-i18n="education">Education</h2>
  {% if cv.education.size > 0 %}
    {% for item in cv.education %}
      <article class="cv-item">
        <div><h3>{{ item.institution | escape }}</h3><p>{{ item.degree | escape }}{% if item.field %}, {{ item.field | escape }}{% endif %}</p></div>
        <span class="cv-item__date">{{ item.start | escape }} – {{ item.end | escape }}</span>
        {% if item.details.size > 0 %}<ul class="cv-item__details">{% for detail in item.details %}<li>{{ detail | escape }}</li>{% endfor %}</ul>{% endif %}
      </article>
    {% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-experience">
  <h2 id="cv-experience" data-i18n="experience">Experience</h2>
  {% if cv.experience.size > 0 %}
    {% for item in cv.experience %}
      <article class="cv-item">
        <div><h3>{{ item.role | escape }}</h3><p>{{ item.organization | escape }}{% if item.location %} · {{ item.location | escape }}{% endif %}</p></div>
        <span class="cv-item__date">{{ item.start | escape }} – {{ item.end | escape }}</span>
        {% if item.details.size > 0 %}<ul class="cv-item__details">{% for detail in item.details %}<li>{{ detail | escape }}</li>{% endfor %}</ul>{% endif %}
      </article>
    {% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-projects">
  <h2 id="cv-projects" data-i18n="projects">Projects</h2>
  {% if cv.projects.size > 0 %}
    {% for item in cv.projects %}
      <article class="cv-item">
        <div><h3>{% if item.url and item.url != "" %}<a href="{{ item.url }}">{{ item.name | escape }}</a>{% else %}{{ item.name | escape }}{% endif %}</h3><p>{{ item.role | escape }}</p></div>
        <span class="cv-item__date">{{ item.period | escape }}</span>
        {% if item.details.size > 0 %}<ul class="cv-item__details">{% for detail in item.details %}<li>{{ detail | escape }}</li>{% endfor %}</ul>{% endif %}
      </article>
    {% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-publications">
  <h2 id="cv-publications" data-i18n="publications">Publications</h2>
  {% if cv.publications.size > 0 %}
    {% for item in cv.publications %}
      <article class="cv-item">
        <div><h3>{% if item.url and item.url != "" %}<a href="{{ item.url }}">{{ item.title | escape }}</a>{% else %}{{ item.title | escape }}{% endif %}</h3><p>{{ item.authors | escape }} · {{ item.venue | escape }}</p></div>
        <span class="cv-item__date">{{ item.year | escape }}</span>
      </article>
    {% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-skills">
  <h2 id="cv-skills" data-i18n="skills">Skills</h2>
  {% if cv.skills.size > 0 %}
    <dl>{% for group in cv.skills %}<dt>{{ group.category | escape }}</dt><dd>{{ group.items | join: ", " | escape }}</dd>{% endfor %}</dl>
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-awards">
  <h2 id="cv-awards" data-i18n="awards">Awards</h2>
  {% if cv.awards.size > 0 %}
    {% for item in cv.awards %}<article class="cv-item"><div><h3>{{ item.title | escape }}</h3><p>{{ item.issuer | escape }}{% if item.description %} · {{ item.description | escape }}{% endif %}</p></div><span class="cv-item__date">{{ item.year | escape }}</span></article>{% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-certifications">
  <h2 id="cv-certifications" data-i18n="certifications">Certifications</h2>
  {% if cv.certifications.size > 0 %}
    {% for item in cv.certifications %}<article class="cv-item"><div><h3>{% if item.credential_url and item.credential_url != "" %}<a href="{{ item.credential_url }}">{{ item.name | escape }}</a>{% else %}{{ item.name | escape }}{% endif %}</h3><p>{{ item.issuer | escape }}</p></div><span class="cv-item__date">{{ item.year | escape }}</span></article>{% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-teaching">
  <h2 id="cv-teaching" data-i18n="teaching">Teaching</h2>
  {% if cv.teaching.size > 0 %}
    {% for item in cv.teaching %}<article class="cv-item"><div><h3>{{ item.course | escape }}</h3><p>{{ item.role | escape }} · {{ item.institution | escape }}</p></div><span class="cv-item__date">{{ item.term | escape }}</span></article>{% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-talks">
  <h2 id="cv-talks" data-i18n="talks">Talks</h2>
  {% if cv.talks.size > 0 %}
    {% for item in cv.talks %}<article class="cv-item"><div><h3>{% if item.url and item.url != "" %}<a href="{{ item.url }}">{{ item.title | escape }}</a>{% else %}{{ item.title | escape }}{% endif %}</h3><p>{{ item.event | escape }}</p></div><span class="cv-item__date">{{ item.date | escape }}</span></article>{% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-service">
  <h2 id="cv-service" data-i18n="service">Service</h2>
  {% if cv.service.size > 0 %}
    {% for item in cv.service %}<article class="cv-item"><div><h3>{{ item.role | escape }}</h3><p>{{ item.organization | escape }}</p></div><span class="cv-item__date">{{ item.period | escape }}</span></article>{% endfor %}
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>

<section class="cv-section" aria-labelledby="cv-languages">
  <h2 id="cv-languages" data-i18n="languages">Languages</h2>
  {% if cv.languages.size > 0 %}
    <dl>{% for item in cv.languages %}<dt>{{ item.language | escape }}</dt><dd>{{ item.proficiency | escape }}</dd>{% endfor %}</dl>
  {% else %}<p class="empty-state" data-i18n="content_later">Content will be added later.</p>{% endif %}
</section>
