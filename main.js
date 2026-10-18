import { animeList } from './animeData.js';
import { createPlayer } from './player.js';

const app = document.getElementById('app');
const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const code = (e) => `S${String(e.season).padStart(2, '0')}E${String(e.episode).padStart(2, '0')}`;
const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='640' height='360' fill='#121821'/><text x='320' y='190' fill='#667' font-size='28' text-anchor='middle' font-family='sans-serif'>No thumbnail</text></svg>");
const img = (src, alt, cls = '') => `<img class="${cls}" src="${esc(src || FALLBACK)}" alt="${esc(alt)}" loading="lazy">`;

let player = null, playerRoot = null, current = { seriesId: null, season: null };

window.addEventListener('hashchange', route);
document.addEventListener('error', (e) => { if (e.target.tagName === 'IMG' && e.target.src !== FALLBACK) e.target.src = FALLBACK; }, true);
route();

function route() {
  const m = location.hash.match(/^#\/watch\/([^/]+)\/([^/]+)$/);
  if (m) return renderWatch(decodeURIComponent(m[1]), decodeURIComponent(m[2]));
  renderHome();
}

function header(inner) {
  return `<header class="topbar">${inner}</header>`;
}

function renderHome() {
  player = null; current = { seriesId: null, season: null };
  document.title = 'AnimePlayer';
  app.innerHTML = header(`<span class="brand">Anime<b>Player</b></span>`) + `
    <main class="wrap"><h2 class="h-serif">Library</h2><div class="grid">
    ${animeList.map((a) => {
      const first = a.seasons.flatMap((s) => s.episodes)[0];
      const href = first ? `#/watch/${encodeURIComponent(a.id)}/${encodeURIComponent(first.id)}` : '#/';
      return `<a class="card" href="${href}">${img(a.poster, a.title)}<div><h3>${esc(a.title)}</h3><p>${esc(a.genres.join(' · '))}</p></div></a>`;
    }).join('')}</div></main>`;
}

function notFound(msg) {
  player = null; current = { seriesId: null, season: null };
  app.innerHTML = header(`<a class="back" href="#/" aria-label="Home">&#8592;</a><span class="crumb">Not found</span>`) +
    `<main class="wrap"><h2 class="h-serif">Not found</h2><p class="muted">${esc(msg)}</p><p><a class="btn" href="#/">Back to library</a></p></main>`;
}

function renderWatch(seriesId, epId) {
  const anime = animeList.find((a) => a.id === seriesId);
  if (!anime) return notFound(`No series with id "${seriesId}".`);
  const flat = anime.seasons.flatMap((s) => s.episodes);
  const i = flat.findIndex((e) => e.id === epId);
  if (i < 0) return notFound(`No episode with id "${epId}" in ${anime.title}.`);
  const ep = flat[i];
  const url = (e) => `#/watch/${encodeURIComponent(anime.id)}/${encodeURIComponent(e.id)}`;
  const go = (e) => { if (e) location.hash = url(e); };
  const title = `${code(ep)}: ${ep.title}`;
  document.title = `${title} – ${anime.title}`;

  // Build the page shell only when the series changes; otherwise keep the <video> alive.
  if (current.seriesId !== anime.id || !player) {
    app.innerHTML = `<div id="top"></div>
      <div class="player-wrap"><div id="player"></div></div>
      <main class="wrap" id="below"></main>`;
    playerRoot = document.getElementById('player');
    player = createPlayer(playerRoot, { onPrev: () => go(flat[flat.indexOf(currentEp()) - 1]), onNext: () => go(flat[flat.indexOf(currentEp()) + 1]) });
    current = { seriesId: anime.id, season: ep.season };
  }
  const currentEp = () => flat.find((e) => e.id === document.body.dataset.ep);
  document.body.dataset.ep = ep.id;
  if (current.season !== ep.season && !document.body.dataset.pick) current.season = ep.season;
  const picked = !!document.body.dataset.pick;
  delete document.body.dataset.pick;

  document.getElementById('top').innerHTML = header(
    `<a class="back" href="#/" aria-label="Back to library">&#8592;</a>
     <span class="crumb"><b>${esc(anime.title)}</b> <i>·</i> ${code(ep)} <i>·</i> ${i + 1} of ${flat.length}</span>`);

  if (!picked) player.load(ep, { crumb: `${anime.title} / ${code(ep)}`, label: title, hasPrev: i > 0, hasNext: i < flat.length - 1 });

  const season = anime.seasons.find((s) => s.number === current.season) || anime.seasons[0];
  document.getElementById('below').innerHTML = `
    <section class="info">
      ${img(anime.poster, anime.title + ' poster', 'poster')}
      <div>
        <h1 class="h-serif">${esc(title)}</h1>
        <p class="accent">${code(ep)} · ${esc(anime.title)}</p>
        <p class="tags">${anime.genres.map((g) => `<span>${esc(g)}</span>`).join('')}${anime.status ? `<span class="status">${esc(anime.status)}</span>` : ''}</p>
        <p class="desc">${esc(ep.description)}</p>
        <p class="desc muted">${esc(anime.description)}</p>
      </div>
    </section>
    <div class="actions">
      <a class="btn ${i === 0 ? 'off' : ''}" ${i > 0 ? `href="${url(flat[i - 1])}"` : 'aria-disabled="true"'}>&#9198; Previous</a>
      <a class="btn primary ${i === flat.length - 1 ? 'off' : ''}" ${i < flat.length - 1 ? `href="${url(flat[i + 1])}"` : 'aria-disabled="true"'}>Next episode &#9197;</a>
    </div>
    <h2 class="h-serif">Seasons</h2>
    <div class="seasons" role="tablist">${anime.seasons.map((s) => `<button role="tab" data-season="${s.number}" class="${s.number === season.number ? 'on' : ''}" aria-selected="${s.number === season.number}">${esc(s.title || 'Season ' + s.number)}</button>`).join('')}</div>
    <h2 class="h-serif">${esc(season.title || 'Season ' + season.number)}</h2>
    <div class="eps">${season.episodes.length ? season.episodes.map((e) => `
      <a class="ep ${e.id === ep.id ? 'now' : ''}" href="${url(e)}" ${e.id === ep.id ? 'aria-current="true"' : ''}>
        <div class="thumb">${img(e.thumbnail, e.title)}<span class="pbtn">&#9654;</span></div>
        <div class="meta"><span class="accent">${code(e)}</span><strong>${esc(e.title)}</strong>
        ${e.altVideoUrl || e.driveUrl ? '' : '<em class="muted">No video yet</em>'}</div>
      </a>`).join('') : '<p class="muted">No episodes in this season yet.</p>'}</div>`;

  document.querySelectorAll('[data-season]').forEach((b) => b.addEventListener('click', () => {
    current.season = +b.dataset.season;
    document.body.dataset.pick = '1';
    renderWatch(seriesId, epId);
  }));
}
