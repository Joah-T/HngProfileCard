function startLiveTime() {
  const timeEl = document.querySelector('[data-testid="test-user-time"]');
  if (!timeEl) return;

  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    // Format: HH:MM:SS,mmm
    timeEl.textContent = `${hours}:${minutes}:${seconds},${milliseconds}`;
  }

  // Update every 100ms (smooth & efficient)
  updateTime();
  setInterval(updateTime, 100);
}

// Initialize when DOM loads
// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  startLiveTime();
  // start the stylized clock if the function is available
  if (typeof startStylizedClock === 'function') startStylizedClock();
});

/* Stylized clock with scramble animation (keeps same semantics as provided) */
function startStylizedClock() {
  const el = document.querySelector('[data-testid="test-user-time"]');
  if (!el) return;

  let lastH = null;
  let lastM = null;
  let scrambleTimer = null;

  const pad2 = v => String(v).padStart(2, '0');
  const pad3 = v => String(v).padStart(3, '0');
  const randDigit19 = () => String(Math.floor(Math.random() * 9) + 1);

  function formatTime(date) {
    const hh = pad2(date.getHours());
    const mm = pad2(date.getMinutes());
    const ss = pad2(date.getSeconds());
    const ms = pad3(date.getMilliseconds());
    return `${hh}:${mm}:${ss},${ms}`;
  }

  function scrambledSample(date, mode = 'minute') {
    // mode: 'minute' -> scramble minutes only, keep hour
    // mode: 'hour' -> scramble both hour and minute
    const ss = pad2(date.getSeconds());
    const ms = pad3(date.getMilliseconds());
    if (mode === 'hour') {
      const fakeH = randDigit19() + randDigit19();
      const fakeM = randDigit19() + randDigit19();
      return `${fakeH}:${fakeM}:${ss},${ms}`;
    }
    // minute-only scramble: keep real hour, scramble minute with two digits
    const realH = pad2(date.getHours());
    const fakeM = randDigit19() + randDigit19();
    return `${realH}:${fakeM}:${ss},${ms}`;
  }

  function runScramble(finalStr, duration = 1000, stepMs = 140, mode = 'minute') {
    if (scrambleTimer) clearInterval(scrambleTimer);
    el.classList.add('scramble');
    const startTime = performance.now();
    scrambleTimer = setInterval(() => {
      const now = performance.now();
      const elapsed = now - startTime;
      if (elapsed >= duration) {
        clearInterval(scrambleTimer);
        scrambleTimer = null;
        el.textContent = finalStr;
        setTimeout(() => el.classList.remove('scramble'), 100);
        return;
      }
      el.textContent = scrambledSample(new Date(), mode);
    }, stepMs);
  }

  function tick() {
    const now = new Date();
    const hh = pad2(now.getHours());
    const mm = pad2(now.getMinutes());
    const formatted = formatTime(now);

    if (hh !== lastH) {
      // hour changed: scramble both hour and minute
      lastH = hh; lastM = mm;
      runScramble(formatted, 1000, 140, 'hour');
    } else if (mm !== lastM) {
      // minute changed: scramble minute only
      lastM = mm;
      runScramble(formatted, 1000, 140, 'minute');
    } else {
      if (!scrambleTimer) el.textContent = formatted;
    }
  }

  tick();
  const intervalId = setInterval(tick, 100);
  return () => clearInterval(intervalId);
}
