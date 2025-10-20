// theme.js
(function() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const KEY = 'hng_theme';

  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }

  // init
  const saved = localStorage.getItem(KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(KEY, next);
      // optional: change toggle icon
      toggle.textContent = next === 'dark' ? '🌙' : '🌓';
    });
    // set initial label
    toggle.textContent = root.getAttribute('data-theme') === 'dark' ? '🌙' : '🌓';
  }
})();
