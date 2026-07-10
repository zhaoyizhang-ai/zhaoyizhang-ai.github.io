---
permalink: /contact/
title: "Contact"
title_zh: "联系"
description: "Contact and profile links."
---

{% assign profile = site.profile %}
{% if profile.email and profile.email != "" %}
Email: <a href="mailto:{{ profile.email }}">{{ profile.email | escape }}</a>
{% else %}
<p class="empty-state" data-i18n="contact_later">Contact details will be added later.</p>
{% endif %}

<div class="link-row">
  {% if profile.social.github_url and profile.social.github_url != "" %}<a class="button-secondary" href="{{ profile.social.github_url }}">GitHub</a>{% endif %}
  {% if profile.social.linkedin_url and profile.social.linkedin_url != "" %}<a class="button-secondary" href="{{ profile.social.linkedin_url }}">LinkedIn</a>{% endif %}
  {% if profile.social.google_scholar_url and profile.social.google_scholar_url != "" %}<a class="button-secondary" href="{{ profile.social.google_scholar_url }}">Google Scholar</a>{% endif %}
  {% if profile.social.orcid and profile.social.orcid != "" %}<a class="button-secondary" href="{{ profile.social.orcid }}">ORCID</a>{% endif %}
  {% if profile.social.x_url and profile.social.x_url != "" %}<a class="button-secondary" href="{{ profile.social.x_url }}">X / Twitter</a>{% endif %}
</div>
