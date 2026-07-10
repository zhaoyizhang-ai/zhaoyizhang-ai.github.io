(function () {
  'use strict';

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
      if (result) result.textContent = visible + (visible === 1 ? ' item' : ' items');
    }

    controls.forEach(function (control) {
      control.element.addEventListener('change', applyFilters);
    });
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
          showResult(copied ? 'Copied' : 'Select text manually');
        }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () {
            showResult('Copied');
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

    var headings = Array.prototype.slice.call(document.querySelectorAll('.page__content h2[id], .page__content h3[id]'));
    if (!headings.length) {
      container.parentElement.hidden = true;
      return;
    }

    var list = document.createElement('ul');
    list.className = 'post-toc__list';
    headings.forEach(function (heading) {
      var item = document.createElement('li');
      if (heading.tagName === 'H3') item.className = 'post-toc__subitem';
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      item.appendChild(link);
      list.appendChild(item);
    });
    container.appendChild(list);
  }

  document.addEventListener('DOMContentLoaded', function () {
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
  });
}());
