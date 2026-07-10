---
permalink: /about/
title: "About"
title_zh: "关于"
description: "Background, interests, and current focus."
---

{% assign profile = site.profile %}

<span data-lang-content="en">{{ profile.long_bio | escape }}</span>
<span data-lang-content="zh">{{ profile.long_bio_zh | default: profile.long_bio | escape }}</span>

<h2 data-i18n="current_status">Current status</h2>

<span data-lang-content="en">{{ profile.current_status | escape }}</span>
<span data-lang-content="zh">{{ profile.current_status_zh | default: profile.current_status | escape }}</span>

{% if profile.location and profile.location != "" %}

<h2 data-i18n="location">Location</h2>

{{ profile.location | escape }}
{% endif %}

<div class="example-notice">
  <span data-lang-content="en">TODO: Replace the placeholder text above with accurate information. Do not publish private details you do not want indexed.</span>
  <span data-lang-content="zh">TODO：请将以上占位内容替换为准确信息，不要发布不希望被搜索引擎收录的隐私信息。</span>
</div>
