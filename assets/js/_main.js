/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

/*jslint es6 */
'use strict';

// Constants for CDNs
const PLOTLY_URL = "https://cdn.jsdelivr.net/npm/plotly.js@3.6.0/dist/plotly.min.js";
const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeOrder = ['system', 'light', 'dark'];

// Determine the computed theme, which can be "dark" or "light".
function determineComputedTheme() {
  const setting = themeOrder.includes(localStorage.getItem('theme')) ? localStorage.getItem('theme') : 'system';
  return setting === 'system' ? (colorSchemeQuery.matches ? 'dark' : 'light') : setting;
}

// Set the theme on page load or when explicitly called
function setTheme(setting) {
  const selected = themeOrder.includes(setting) ? setting :
    (themeOrder.includes(localStorage.getItem('theme')) ? localStorage.getItem('theme') : 'system');
  const resolved = selected === 'system' ? (colorSchemeQuery.matches ? 'dark' : 'light') : selected;
  const isChinese = document.documentElement.dataset.language === 'zh';
  const labels = isChinese
    ? { system: '跟随系统主题', light: '浅色主题', dark: '深色主题' }
    : { system: 'System theme', light: 'Light theme', dark: 'Dark theme' };
  const ariaLabels = isChinese
    ? { system: '当前跟随系统主题，点击切换主题。', light: '当前为浅色主题，点击切换主题。', dark: '当前为深色主题，点击切换主题。' }
    : { system: 'Theme: system. Activate to switch theme.', light: 'Theme: light. Activate to switch theme.', dark: 'Theme: dark. Activate to switch theme.' };
  const icons = { system: 'fa-circle-half-stroke', light: 'fa-sun', dark: 'fa-moon' };

  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themeSetting = selected;
  $('#theme-icon').removeClass('fa-circle-half-stroke fa-sun fa-moon').addClass(icons[selected]);
  $('#theme-label').text(labels[selected]);
  $('.theme-toggle')
    .attr('title', labels[selected])
    .attr('aria-label', ariaLabels[selected]);
}

document.addEventListener('site:languagechange', function () { setTheme(); });

// Cycle through system, light, and dark.
function toggleTheme() {
  const current = themeOrder.includes(localStorage.getItem('theme')) ? localStorage.getItem('theme') : 'system';
  const next = themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length];
  localStorage.setItem('theme', next);
  setTheme(next);
  redrawPlotly();
}

// Defer the loading of Mermaid to only if there is a field on the page to be rendered
let mermaidElements = document.querySelectorAll("pre>code.language-mermaid");
if (mermaidElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Append the Mermaid module to the DOM
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.textContent = `
      import mermaid from '${MERMAID_URL}';
      mermaid.initialize({startOnLoad:true, theme:'default'});
      await mermaid.run({querySelector:'code.language-mermaid'});
    `;
    document.body.appendChild(moduleScript);
  });
}

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is
// actually present on the page.
//
// NOTE that plotlyDarkLayout and plotlyLightLayout will be exposed in the minimized file
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Return if not ready
    if (document.readyState !== "complete") {
      return;
    }

    // Prepare to load Plotly from the CDN
    const script = document.createElement('script');
    script.src = PLOTLY_URL;
    script.async = true;

    // Once loaded, update the page elements to work with it
    script.onload = function() {
      plotlyElements.forEach(function(elem) {
        // Parse the Plotly JSON data and hide it
        let jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }

    // Add the script to the document
    document.head.appendChild(script);
  });
}

function redrawPlotly() {
  plotlyElements.forEach(function(elem) {
    // Parse the Plotly JSON data
    let jsonData = JSON.parse(elem.textContent);

    // Get the Plotly node
    let chartElement = $(elem).parent().next().get(0);

    // Set the theme for the plot and render it
    const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
    if (jsonData.layout) {
      jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
    } else {
      jsonData.layout = { template: theme };
    }
    Plotly.react(chartElement, jsonData.data, jsonData.layout);
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  colorSchemeQuery.addEventListener('change', function () {
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'system') {
      setTheme('system');
      redrawPlotly();
    }
  });

  // Enable the theme toggle
  $('#theme-toggle button').on('click', toggleTheme);

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
    const expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', String(!expanded));
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

});
