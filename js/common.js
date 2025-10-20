// common.js
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.bottom-nav a');
  // Helper to extract last path segment from a URL string
  const lastSegment = (url) => {
    try {
      // Use URL when possible to resolve relative paths against current location
      const resolved = new URL(url, location.href);
      const pathname = resolved.pathname.replace(/\/+$/, ''); // trim trailing slash
      const parts = pathname.split('/');
      return parts.pop() || 'index.html';
    } catch (e) {
      // Fallback: simple split
      const parts = url.split('/').filter(Boolean);
      return parts.pop() || 'index.html';
    }
  };

  const current = (() => {
    const path = location.pathname.replace(/\/+$/, '');
    const parts = path.split('/');
    const seg = parts.pop();
    return seg === '' || seg === undefined ? 'index.html' : seg;
  })();

  links.forEach(a => {
    const href = a.getAttribute('href');
    const linkSeg = lastSegment(href);
    if (linkSeg === current) a.classList.add('active');
  });
});
