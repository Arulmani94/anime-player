import { resolveSources, describeError } from './videoSource.js';

const fmt = (s) => {
  if (!isFinite(s)) return '0:00';
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
};

export function createPlayer(root, { onPrev, onNext }) {
  root.className = 'player';
  root.tabIndex = 0;
  root.innerHTML = `
    <video playsinline preload="metadata"></video>
    <div class="pl-top"><span class="pl-crumb"></span><span class="pl-title"></span></div>
    <button class="pl-big" aria-label="Play">&#9654;</button>
    <div class="pl-spin" hidden></div>
    <div class="pl-msg" hidden></div>
    <div class="pl-bar">
      <input class="pl-seek" type="range" min="0" max="1000" value="0" aria-label="Seek">
      <div class="pl-row">
        <button data-a="play" aria-label="Play/Pause">&#9654;</button>
        <button data-a="back" aria-label="Back 10 seconds">&minus;10</button>
        <button data-a="fwd" aria-label="Forward 10 seconds">+10</button>
        <button data-a="prev" aria-label="Previous episode">&#9198;</button>
        <button data-a="next" aria-label="Next episode">&#9197;</button>
        <span class="pl-time">0:00 / 0:00</span>
        <span class="pl-gap"></span>
        <button data-a="mute" aria-label="Mute">Vol</button>
        <input class="pl-vol" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">
        <select class="pl-speed" aria-label="Playback speed">
          <option value="0.5">0.5x</option><option value="0.75">0.75x</option>
          <option value="1" selected>1x</option><option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option><option value="2">2x</option>
        </select>
        <button data-a="pip" aria-label="Picture in picture">PiP</button>
        <button data-a="fs" aria-label="Fullscreen">&#x26F6;</button>
      </div>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const v = $('video'), seek = $('.pl-seek'), big = $('.pl-big'), spin = $('.pl-spin'),
        msg = $('.pl-msg'), time = $('.pl-time'), vol = $('.pl-vol'), speed = $('.pl-speed'),
        playBtn = $('[data-a=play]');
  let sources = [], idx = 0, idleTimer = null, seeking = false;

  const showMsg = (html) => { msg.innerHTML = html; msg.hidden = false; spin.hidden = true; big.hidden = true; root.classList.add('has-msg'); };
  const clearMsg = () => { msg.hidden = true; root.classList.remove('has-msg'); };
  const setPlayIcon = () => { const p = v.paused; playBtn.innerHTML = p ? '&#9654;' : '&#10074;&#10074;'; big.innerHTML = '&#9654;'; big.hidden = !p || root.classList.contains('has-msg'); };
  const escapeHtml = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function toggle() { if (v.paused) v.play().catch(() => {}); else v.pause(); }
  function skip(d) { if (isFinite(v.duration)) v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + d)); }
  function fullscreen() {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (root.requestFullscreen) root.requestFullscreen().catch(() => {});
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iOS Safari
  }
  async function pip() {
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await v.requestPictureInPicture();
    } catch (e) { /* not available */ }
  }
  if (!document.pictureInPictureEnabled) $('[data-a=pip]').hidden = true;

  const actions = { play: toggle, back: () => skip(-10), fwd: () => skip(10), prev: () => onPrev(), next: () => onNext(),
    mute: () => { v.muted = !v.muted; }, fs: fullscreen, pip };
  root.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); actions[b.dataset.a](); }));
  big.addEventListener('click', toggle);
  v.addEventListener('click', toggle);
  v.addEventListener('dblclick', fullscreen);

  seek.addEventListener('input', () => { seeking = true; if (isFinite(v.duration)) { v.currentTime = (seek.value / 1000) * v.duration; } });
  seek.addEventListener('change', () => { seeking = false; });
  vol.addEventListener('input', () => { v.volume = +vol.value; v.muted = v.volume === 0; });
  speed.addEventListener('change', () => { v.playbackRate = +speed.value; });

  v.addEventListener('play', setPlayIcon);
  v.addEventListener('pause', () => { setPlayIcon(); root.classList.remove('idle'); });
  v.addEventListener('timeupdate', () => {
    time.textContent = `${fmt(v.currentTime)} / ${fmt(v.duration)}`;
    if (!seeking && isFinite(v.duration) && v.duration > 0) seek.value = (v.currentTime / v.duration) * 1000;
    seek.style.setProperty('--p', (seek.value / 10) + '%');
  });
  v.addEventListener('loadedmetadata', () => { time.textContent = `${fmt(0)} / ${fmt(v.duration)}`; spin.hidden = true; });
  v.addEventListener('waiting', () => { spin.hidden = false; });
  v.addEventListener('canplay', () => { spin.hidden = true; });
  v.addEventListener('playing', () => { spin.hidden = true; clearMsg(); setPlayIcon(); });
  v.addEventListener('volumechange', () => { $('[data-a=mute]').textContent = v.muted || v.volume === 0 ? 'Muted' : 'Vol'; });
  v.addEventListener('ended', () => { setPlayIcon(); });
  v.addEventListener('error', () => {
    const src = sources[idx];
    if (idx + 1 < sources.length) { idx++; setSource(); return; }   // try next source
    let html = `<strong>Can't play this episode</strong><p>${escapeHtml(describeError(src, v.error))}</p>`;
    if (src && src.openUrl) html += `<a href="${escapeHtml(src.openUrl)}" target="_blank" rel="noopener">Open the file in Google Drive's own player</a>`;
    showMsg(html);
  });

  // auto-hide controls while playing
  const wake = () => { root.classList.remove('idle'); clearTimeout(idleTimer); idleTimer = setTimeout(() => { if (!v.paused) root.classList.add('idle'); }, 3000); };
  ['mousemove', 'touchstart', 'keydown'].forEach((e) => root.addEventListener(e, wake, { passive: true }));

  root.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT'].includes(e.target.tagName) && e.key !== 'f') return;
    const k = e.key.toLowerCase();
    if (k === ' ' || k === 'k') { e.preventDefault(); toggle(); }
    else if (k === 'arrowleft') skip(-10);
    else if (k === 'arrowright') skip(10);
    else if (k === 'f') fullscreen();
    else if (k === 'm') v.muted = !v.muted;
  });

  function setSource() {
    clearMsg();
    const s = sources[idx];
    spin.hidden = false;
    v.src = s.url;
    v.load();
  }

  return {
    load(ep, { crumb, label, hasPrev, hasNext }) {
      v.pause(); v.removeAttribute('src');
      v.querySelectorAll('track').forEach((t) => t.remove());
      seek.value = 0; seek.style.setProperty('--p', '0%'); time.textContent = '0:00 / 0:00';
      $('.pl-crumb').textContent = crumb; $('.pl-title').textContent = label;
      $('[data-a=prev]').disabled = !hasPrev; $('[data-a=next]').disabled = !hasNext;
      v.poster = ep.thumbnail || '';
      v.playbackRate = +speed.value;
      clearMsg(); setPlayIcon();
      sources = resolveSources(ep); idx = 0;
      if (!sources.length) {
        showMsg(`<strong>No video configured</strong><p>This episode has no video source yet. Add a link in <code>animeData.js</code> (field <code>altVideoUrl</code> or <code>driveUrl</code>).</p>`);
        return;
      }
      if (sources[0].kind === 'invalid') { showMsg(`<strong>Invalid link</strong><p>${escapeHtml(describeError(sources[0]))}</p>`); return; }
      if (ep.subtitleUrl) {
        const t = document.createElement('track');
        t.kind = 'subtitles'; t.label = 'Subtitles'; t.srclang = 'en'; t.src = ep.subtitleUrl; t.default = true;
        v.appendChild(t);
      }
      setSource();
    }
  };
}
