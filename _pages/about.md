---
permalink: /about/
title: "About"
description: "Background, interests, and current focus."
---

{% assign profile = site.profile %}

{{ profile.long_bio | escape }}

## Current status

{{ profile.current_status | escape }}

{% if profile.location and profile.location != "" %}

## Location

{{ profile.location | escape }}
{% endif %}

> TODO: Replace the placeholder text above with accurate information. Do not publish private details you do not want indexed.
