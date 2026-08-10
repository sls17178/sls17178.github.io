(function () {
  var root = document.documentElement;
  var THEME_KEY = 'apple-fpna-dashboard-theme';
  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {}

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function updateToggleLabel() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = currentTheme() === 'dark' ? 'Light mode' : 'Dark mode';
  }
  document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      document.querySelectorAll('iframe').forEach(function (f) {
        try { f.contentDocument.documentElement.setAttribute('data-theme', next); } catch (e) {}
      });
      updateToggleLabel();
    });
    updateToggleLabel();
  });
})();
