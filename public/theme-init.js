(function () {
  try {
    const stored = localStorage.getItem('theme');
    const theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    document.documentElement.dataset.theme = theme;

    const font = localStorage.getItem('fontFamily');
    if (font) document.documentElement.dataset.font = font;
    const size = localStorage.getItem('fontSize');
    if (size) document.documentElement.dataset.fontSize = size;
    const spacing = localStorage.getItem('lineSpacing');
    if (spacing) document.documentElement.dataset.lineSpacing = spacing;
  } catch {
    /* localStorage unavailable (e.g. private mode) — CSS defaults apply */
  }
})();
