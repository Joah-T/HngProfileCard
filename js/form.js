// form.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameEl = form.querySelector('[data-testid="test-contact-name"]');
  const emailEl = form.querySelector('[data-testid="test-contact-email"]');
  const subjectEl = form.querySelector('[data-testid="test-contact-subject"]');
  const messageEl = form.querySelector('[data-testid="test-contact-message"]');

  const err = {
    name: document.getElementById('err-name'),
    email: document.getElementById('err-email'),
    subject: document.getElementById('err-subject'),
    message: document.getElementById('err-message')
  };

  function showError(elNode, msg) { if (elNode) elNode.textContent = msg; }
  function clearErrors(){ Object.values(err).forEach(e => e && (e.textContent='')); }

  function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener('submit', (e)=> {
    e.preventDefault();
    clearErrors();
    let valid = true;
    if (!nameEl.value.trim()){ showError(err.name,'Full name is required'); valid = false; }
    if (!emailEl.value.trim()){ showError(err.email,'Email is required'); valid = false; }
    else if (!isValidEmail(emailEl.value.trim())){ showError(err.email,'Enter a valid email (name@example.com)'); valid = false; }
    if (!subjectEl.value.trim()){ showError(err.subject,'Subject is required'); valid = false; }
    if (!messageEl.value.trim() || messageEl.value.trim().length < 10){ showError(err.message,'Message must be at least 10 characters'); valid = false; }

    if (!valid) {
      const firstErr = Object.values(err).find(x => x && x.textContent);
      if (firstErr) {
        // find input associated and focus
        const inputMap = { 'err-name':'name', 'err-email':'email','err-subject':'subject','err-message':'message' };
        for (const id in inputMap) {
          if (firstErr.id === id) {
            const el = form.querySelector('#'+inputMap[id]);
            if (el) el.focus();
            break;
          }
        }
      }
      return;
    }

    // success
    form.reset();
    const success = document.querySelector('[data-testid="test-contact-success"]');
    if (success) { success.hidden = false; success.focus(); success.scrollIntoView({behavior:'smooth', block:'center'}); }
  });
});
