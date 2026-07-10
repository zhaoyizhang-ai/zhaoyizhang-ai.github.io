(function () {
  'use strict';

  var translations = {};

  function readTranslations() {
    var source = document.getElementById('site-translations');
    if (!source) return;
    try {
      translations = JSON.parse(source.textContent);
    } catch (error) {
      translations = {};
    }
  }

  function currentLanguage() {
    return document.documentElement.dataset.language === 'zh' ? 'zh' : 'en';
  }

  function translate(key) {
    var language = currentLanguage();
    return translations[language] && translations[language][key]
      ? translations[language][key]
      : key;
  }

  function applyLanguage(language, remember) {
    var next = language === 'zh' ? 'zh' : 'en';
    document.documentElement.dataset.language = next;
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      var value = translate(element.dataset.i18n);
      if (value !== element.dataset.i18n) element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (element) {
      var value = translate(element.dataset.i18nAriaLabel);
      if (value !== element.dataset.i18nAriaLabel) element.setAttribute('aria-label', value);
    });

    var toggle = document.querySelector('[data-language-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-label', translate('language_switch'));
      toggle.title = translate('language_switch');
      var shortLabel = toggle.querySelector('[data-language-short]');
      if (shortLabel) shortLabel.textContent = translate('language_short');
    }

    if (remember) localStorage.setItem('site-language', next);
    document.documentElement.classList.add('language-changing');
    window.setTimeout(function () {
      document.documentElement.classList.remove('language-changing');
    }, 260);
    document.dispatchEvent(new CustomEvent('site:languagechange', { detail: { language: next } }));
  }

  function configureLanguage() {
    var toggle = document.querySelector('[data-language-toggle]');
    applyLanguage(currentLanguage(), false);
    if (toggle) {
      toggle.addEventListener('click', function () {
        applyLanguage(currentLanguage() === 'zh' ? 'en' : 'zh', true);
      });
    }

    window.addEventListener('languagechange', function () {
      if (localStorage.getItem('site-language')) return;
      var browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
      applyLanguage(/^zh(?:-|$)/i.test(browserLanguage) ? 'zh' : 'en', false);
    });
  }

  function activateReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    document.documentElement.classList.add('reveal-enabled');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px', threshold: 0.08 });

    items.forEach(function (item) { observer.observe(item); });
  }

  function configureFilters(containerSelector, cardSelector, mappings) {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var cards = Array.prototype.slice.call(container.querySelectorAll(cardSelector));
    var controls = mappings.map(function (mapping) {
      return {
        element: document.querySelector(mapping.control),
        attribute: mapping.attribute
      };
    }).filter(function (item) { return item.element; });

    function applyFilters() {
      var visible = 0;
      cards.forEach(function (card) {
        var matches = controls.every(function (control) {
          return control.element.value === 'all' || card.dataset[control.attribute] === control.element.value;
        });
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      var result = document.querySelector('[data-filter-results]');
      if (result) result.textContent = visible + ' ' + translate(visible === 1 ? 'item_one' : 'item_many');
    }

    controls.forEach(function (control) {
      control.element.addEventListener('change', applyFilters);
    });
    document.addEventListener('site:languagechange', applyFilters);
    applyFilters();
  }

  function configureBibtexCopy() {
    document.querySelectorAll('[data-copy-bibtex]').forEach(function (button) {
      button.addEventListener('click', function () {
        var target = document.getElementById(button.getAttribute('data-copy-bibtex'));
        if (!target) return;
        var text = target.textContent;

        function showResult(label) {
          var original = button.textContent;
          button.textContent = label;
          window.setTimeout(function () { button.textContent = original; }, 1600);
        }

        function fallbackCopy() {
          var textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.setAttribute('readonly', '');
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          var copied = document.execCommand('copy');
          textarea.remove();
          showResult(copied ? translate('copied') : translate('select_manually'));
        }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () {
            showResult(translate('copied'));
          }).catch(fallbackCopy);
        } else {
          fallbackCopy();
        }
      });
    });
  }

  function configureTableOfContents() {
    var container = document.querySelector('#post-toc');
    if (!container) return;

    function activeHeadingText(heading) {
      var localized = heading.querySelector('[data-lang-content="' + currentLanguage() + '"]');
      return localized ? localized.textContent : heading.textContent;
    }

    function build() {
      container.innerHTML = '';
      var headings = Array.prototype.slice.call(document.querySelectorAll('.page__content h2[id], .page__content h3[id]'));
      if (!headings.length) {
        container.parentElement.hidden = true;
        return;
      }
      container.parentElement.hidden = false;

      var list = document.createElement('ul');
      list.className = 'post-toc__list';
      headings.forEach(function (heading) {
        var item = document.createElement('li');
        if (heading.tagName === 'H3') item.className = 'post-toc__subitem';
        var link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = activeHeadingText(heading);
        item.appendChild(link);
        list.appendChild(item);
      });
      container.appendChild(list);
    }

    build();
    document.addEventListener('site:languagechange', build);
  }

  function configureReadingProgress() {
    var bar = document.querySelector('.reading-progress span');
    if (!bar) return;
    var queued = false;
    function update() {
      var maximum = document.documentElement.scrollHeight - window.innerHeight;
      var progress = maximum > 0 ? Math.min(1, window.scrollY / maximum) : 0;
      bar.style.transform = 'scaleX(' + progress + ')';
      queued = false;
    }
    window.addEventListener('scroll', function () {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function configureMotionDetails() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('motion-ready');

    var hero = document.querySelector('.home-hero');
    if (hero && window.matchMedia('(pointer: fine)').matches) {
      hero.addEventListener('pointermove', function (event) {
        var bounds = hero.getBoundingClientRect();
        hero.style.setProperty('--pointer-x', ((event.clientX - bounds.left) / bounds.width * 100).toFixed(1) + '%');
        hero.style.setProperty('--pointer-y', ((event.clientY - bounds.top) / bounds.height * 100).toFixed(1) + '%');
      });
    }

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.project-card, .publication-card, .post-card, .note-card').forEach(function (card) {
      card.classList.add('tilt-card');
      card.addEventListener('pointermove', function (event) {
        var bounds = card.getBoundingClientRect();
        var x = (event.clientX - bounds.left) / bounds.width - 0.5;
        var y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty('--tilt-x', (-y * 2.2).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', (x * 2.2).toFixed(2) + 'deg');
        card.style.setProperty('--glow-x', ((x + 0.5) * 100).toFixed(1) + '%');
        card.style.setProperty('--glow-y', ((y + 0.5) * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', function () {
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    readTranslations();
    configureLanguage();
    activateReveal();
    configureFilters('#publication-list', '.publication-card', [
      { control: '#publication-year', attribute: 'year' },
      { control: '#publication-type', attribute: 'type' }
    ]);
    configureFilters('#project-list', '.project-card', [
      { control: '#project-status', attribute: 'status' }
    ]);
    configureBibtexCopy();
    configureTableOfContents();
    configureReadingProgress();
    configureMotionDetails();
  });
}());
