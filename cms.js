/* ============================================================
   Théo & Léa — Module CMS Directus
   Charge le contenu dynamiquement depuis https://cms.theo-lea.fr
   ============================================================ */

const CMS_URL = 'https://cms.theo-lea.fr';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const _cache = {};

async function fetchCMS(path) {
  const now = Date.now();
  if (_cache[path] && now - _cache[path].ts < CACHE_TTL) {
    return _cache[path].data;
  }
  try {
    const res = await fetch(`${CMS_URL}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data ?? null;
    _cache[path] = { ts: now, data };
    return data;
  } catch (e) {
    console.warn('[CMS] Erreur de chargement :', path, e.message);
    return null;
  }
}

function assetUrl(fileId) {
  return fileId ? `${CMS_URL}/assets/${fileId}` : null;
}

/* ── Skeleton helpers ─────────────────────────────────────────── */
function skeletonCards(n, cls = 'skeleton-card') {
  return Array.from({ length: n }, () =>
    `<div class="${cls}" aria-hidden="true">
      <div class="skel skel-img"></div>
      <div class="skel skel-line skel-line--lg"></div>
      <div class="skel skel-line"></div>
      <div class="skel skel-line skel-line--sm"></div>
    </div>`
  ).join('');
}

function errorState(message = 'Contenu temporairement indisponible.') {
  return `<div class="cms-error" role="alert">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <p>${escapeHtml(message)}</p>
  </div>`;
}

/* ── Pages (contenus éditables par slug) ────────────────────── */
async function loadPages() {
  const pages = await fetchCMS('/items/pages?fields=slug,titre,contenu,image_hero');
  if (!pages) return;
  const bySlug = Object.fromEntries(pages.map(p => [p.slug, p]));

  const creche = bySlug['creche'];
  if (creche) {
    const sec = document.querySelector('[data-cms-page="creche"]');
    if (sec) {
      if (creche.titre) {
        const el = sec.querySelector('[data-cms-titre]');
        if (el) el.textContent = creche.titre;
      }
      if (creche.contenu) {
        const el = sec.querySelector('[data-cms-contenu]');
        if (el) el.innerHTML = creche.contenu;
      }
    }
  }

  const hero = bySlug['accueil'];
  if (hero) {
    if (hero.contenu) {
      const desc = document.querySelector('.hero-desc');
      if (desc) desc.innerHTML = hero.contenu;
    }
    if (hero.image_hero) {
      const img = document.querySelector('.hero-enfants-img');
      if (img) {
        img.src = assetUrl(hero.image_hero);
        img.removeAttribute('aria-hidden');
        img.alt = 'Illustration de la micro-crèche';
      }
    }
  }
}

/* ── Articles (actualités) ───────────────────────────────── */
async function loadArticles() {
  const section = document.getElementById('actualites');
  if (!section) return;

  const grid = section.querySelector('.articles-grid');
  if (!grid) return;

  // Skeleton pendant le chargement
  grid.innerHTML = skeletonCards(3, 'article-card article-card--skeleton');

  const rawArticles = await fetchCMS(
    '/items/articles?sort=-date_publication&fields=id,titre,contenu,image,date_publication,slug&limit=20'
  );

  const now = new Date();
  const articles = rawArticles
    ? rawArticles.filter(a => !a.date_publication || new Date(a.date_publication) <= now)
    : null;

  if (!articles || articles.length === 0) {
    grid.innerHTML = errorState(
      rawArticles === null
        ? 'Les actualités sont temporairement indisponibles.'
        : 'Aucune actualité publiée pour le moment.'
    );
    const btnPrev = section.querySelector('.articles-nav--prev');
    const btnNext = section.querySelector('.articles-nav--next');
    if (btnPrev) btnPrev.style.display = 'none';
    if (btnNext) btnNext.style.display = 'none';
    return;
  }

  const btnPrev = section.querySelector('.articles-nav--prev');
  const btnNext = section.querySelector('.articles-nav--next');

  const ARTICLES_PER_PAGE = 3;
  let offset = 0;

  function articleCardHtml(article, idx) {
    const date = article.date_publication
      ? new Date(article.date_publication).toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : '';
    const imgHtml = article.image
      ? `<img src="${assetUrl(article.image)}?width=480&quality=75" alt="${escapeHtml(article.titre)}" class="article-img" loading="lazy" width="480" height="280" />`
      : `<div class="article-img-placeholder" aria-hidden="true">📰</div>`;
    return `<article class="article-card" data-article-idx="${idx}" tabindex="0">
        ${imgHtml}
        <div class="article-body">
          ${date ? `<p class="article-date">${date}</p>` : ''}
          <h3 class="article-titre">${escapeHtml(article.titre)}</h3>
          <p class="article-extrait">${truncateHtml(article.contenu ?? '', 180)}</p>
          <span class="article-lire-suite" aria-hidden="true">Lire la suite →</span>
        </div>
      </article>`;
  }

  const hasMultiplePages = articles.length > ARTICLES_PER_PAGE;
  if (btnPrev) btnPrev.style.display = hasMultiplePages ? '' : 'none';
  if (btnNext) btnNext.style.display = hasMultiplePages ? '' : 'none';

  function render() {
    const visible = articles.slice(offset, offset + ARTICLES_PER_PAGE);
    grid.style.gridTemplateColumns = `repeat(${visible.length}, minmax(0, 380px))`;
    grid.innerHTML = visible.map((a, i) => articleCardHtml(a, offset + i)).join('');
    if (btnPrev) btnPrev.disabled = offset === 0;
    if (btnNext) btnNext.disabled = offset + ARTICLES_PER_PAGE >= articles.length;
  }

  if (btnPrev) btnPrev.addEventListener('click', () => { offset -= ARTICLES_PER_PAGE; render(); });
  if (btnNext) btnNext.addEventListener('click', () => { offset += ARTICLES_PER_PAGE; render(); });

  // ── Modal plein contenu ──────────────────────────────────────────
  let modal = null;

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function openModal(article) {
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'article-modal';
      modal.hidden = true;
      modal.innerHTML = `
        <div class="article-modal-backdrop"></div>
        <div class="article-modal-box" role="dialog" aria-modal="true" aria-labelledby="article-modal-titre">
          <button class="article-modal-close" aria-label="Fermer l'article">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div class="article-modal-img-wrap"></div>
          <div class="article-modal-body">
            <p class="article-date article-modal-date"></p>
            <h2 class="article-modal-titre" id="article-modal-titre"></h2>
            <div class="article-modal-contenu"></div>
          </div>
        </div>`;
      modal.querySelector('.article-modal-backdrop').addEventListener('click', closeModal);
      modal.querySelector('.article-modal-close').addEventListener('click', closeModal);
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
      document.body.appendChild(modal);
    }

    const dateStr = article.date_publication
      ? new Date(article.date_publication).toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : '';
    const imgWrap = modal.querySelector('.article-modal-img-wrap');
    imgWrap.innerHTML = article.image
      ? `<img src="${assetUrl(article.image)}?width=680&quality=80" alt="${escapeHtml(article.titre)}" class="article-modal-img" />`
      : '';
    modal.querySelector('.article-modal-date').textContent = dateStr;
    modal.querySelector('.article-modal-titre').textContent = article.titre ?? '';
    modal.querySelector('.article-modal-contenu').innerHTML = article.contenu ?? '';

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.article-modal-close').focus();
  }

  grid.addEventListener('click', e => {
    const card = e.target.closest('.article-card');
    if (!card) return;
    const idx = parseInt(card.dataset.articleIdx, 10);
    if (!isNaN(idx) && articles[idx]) openModal(articles[idx]);
  });

  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.article-card');
    if (!card) return;
    e.preventDefault();
    const idx = parseInt(card.dataset.articleIdx, 10);
    if (!isNaN(idx) && articles[idx]) openModal(articles[idx]);
  });

  render();
}

/* ── Galeries ────────────────────────────────────────────────── */
async function loadGaleries() {
  const section = document.getElementById('espace');
  if (!section) return;

  const container = section.querySelector('.galeries-list');
  if (!container) return;

  // Skeleton pendant le chargement
  container.innerHTML = `<div class="galerie-bloc galerie-bloc--skeleton" aria-hidden="true">
    <div class="skel skel-line skel-line--lg" style="width:200px;margin-bottom:1rem"></div>
    <div class="skel skel-galerie"></div>
  </div>`;

  // Normalise le schéma M2M : accepte images.directus_files_id OU photos.directus_files_id OU tableau plat
  const galeries = await fetchCMS(
    '/items/galeries?fields=id,titre,description,photos.directus_files_id,images.directus_files_id'
  );

  if (!galeries || galeries.length === 0) {
    container.innerHTML = errorState(
      galeries === null
        ? 'La galerie est temporairement indisponible.'
        : 'Aucune galerie disponible pour le moment.'
    );
    return;
  }

  container.innerHTML = '';

  // ── Lightbox ──────────────────────────────────────────────────
  let lightbox = null;
  let lbPhotos = [];
  let lbIdx = 0;

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function openLightbox(photos, startIdx) {
    lbPhotos = photos;
    lbIdx = startIdx;

    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.hidden = true;
      lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <button class="lightbox-close" aria-label="Fermer la lightbox">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <button class="lightbox-nav lightbox-prev" aria-label="Photo précédente">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="lightbox-img-wrap" role="dialog" aria-modal="true" aria-label="Galerie photo agrandie">
          <img class="lightbox-img" src="" alt="" />
          <p class="lightbox-counter"></p>
        </div>
        <button class="lightbox-nav lightbox-next" aria-label="Photo suivante">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>`;
      lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
      lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      lightbox.querySelector('.lightbox-prev').addEventListener('click', () => lbGo(lbIdx - 1));
      lightbox.querySelector('.lightbox-next').addEventListener('click', () => lbGo(lbIdx + 1));
      document.addEventListener('keydown', e => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft')  lbGo(lbIdx - 1);
        if (e.key === 'ArrowRight') lbGo(lbIdx + 1);
      });
      document.body.appendChild(lightbox);
    }

    lbGo(lbIdx);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
  }

  function lbGo(n) {
    lbIdx = Math.max(0, Math.min(n, lbPhotos.length - 1));
    const fileId = lbPhotos[lbIdx];
    const img = lightbox.querySelector('.lightbox-img');
    img.src = `${assetUrl(fileId)}?width=1200&quality=85`;
    img.alt = `Photo ${lbIdx + 1} sur ${lbPhotos.length}`;
    lightbox.querySelector('.lightbox-counter').textContent = `${lbIdx + 1} / ${lbPhotos.length}`;
    lightbox.querySelector('.lightbox-prev').disabled = lbIdx === 0;
    lightbox.querySelector('.lightbox-next').disabled = lbIdx === lbPhotos.length - 1;
  }

  /* Normalise les photos d'une galerie quel que soit le schéma M2M :
     - galerie.photos  = [{ directus_files_id: "uuid" }]
     - galerie.images  = [{ directus_files_id: "uuid" }]  (nom alternatif)
     - ou tableau de strings directement */
  function extractPhotoIds(galerie) {
    const raw = galerie.photos ?? galerie.images ?? [];
    return raw
      .map(p => {
        if (!p) return null;
        if (typeof p === 'string') return p;
        if (typeof p === 'object') return p.directus_files_id ?? p.id ?? null;
        return null;
      })
      .filter(Boolean);
  }

  // ── Rendu galeries ────────────────────────────────────────────
  galeries.forEach(galerie => {
    const photos = extractPhotoIds(galerie);

    if (photos.length === 0) {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="galerie-bloc">
          <h3 class="galerie-titre">${escapeHtml(galerie.titre)}</h3>
          ${galerie.description ? `<div class="galerie-desc-bloc">${galerie.description}</div>` : ''}
          <div class="gallery-item gallery-item--vide" tabindex="0" aria-label="${escapeHtml(galerie.titre)}">
            <span aria-hidden="true">🖼️</span>
            <span>Photos à venir</span>
          </div>
        </div>`
      );
      return;
    }

    const blocId = `galerie-${galerie.id}`;
    const hasMany = photos.length > 1;

    const slidesHtml = photos.map((fileId, i) =>
      `<div class="galerie-slide">
        <img
          src="${assetUrl(fileId)}?width=900&quality=80"
          alt="${escapeHtml(galerie.titre)} — photo ${i + 1}"
          loading="lazy"
          width="900"
          height="600"
          class="galerie-slide-img"
          data-lightbox-idx="${i}"
          tabindex="0"
          role="button"
          aria-label="Agrandir photo ${i + 1}"
          style="cursor:zoom-in"
        />
      </div>`
    ).join('');

    const dotsHtml = hasMany
      ? `<div class="galerie-dots" role="tablist" aria-label="Navigation photos">
          ${photos.map((_, i) =>
            `<button class="galerie-dot${i === 0 ? ' galerie-dot--active' : ''}" role="tab" aria-selected="${i === 0}" aria-label="Photo ${i + 1}" data-idx="${i}"></button>`
          ).join('')}
        </div>`
      : '';

    const prevBtn = hasMany
      ? `<button class="galerie-nav galerie-nav--prev" aria-label="Photo précédente" disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>` : '';
    const nextBtn = hasMany
      ? `<button class="galerie-nav galerie-nav--next" aria-label="Photo suivante">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>` : '';

    container.insertAdjacentHTML(
      'beforeend',
      `<div class="galerie-bloc" id="${blocId}">
        <h3 class="galerie-titre">${escapeHtml(galerie.titre)}</h3>
        ${galerie.description ? `<div class="galerie-desc-bloc">${galerie.description}</div>` : ''}
        <div class="galerie-carousel">
          ${prevBtn}
          <div class="galerie-track-wrapper">
            <div class="galerie-track">${slidesHtml}</div>
          </div>
          ${nextBtn}
        </div>
        ${dotsHtml}
      </div>`
    );

    const bloc = container.querySelector(`#${blocId}`);
    const track = bloc.querySelector('.galerie-track');
    const dots = [...bloc.querySelectorAll('.galerie-dot')];
    const btnPrev = bloc.querySelector('.galerie-nav--prev');
    const btnNext = bloc.querySelector('.galerie-nav--next');
    let idx = 0;

    function goTo(n) {
      idx = Math.max(0, Math.min(n, photos.length - 1));
      track.style.transform = `translateX(-${idx * 100}%)`;
      if (btnPrev) btnPrev.disabled = idx === 0;
      if (btnNext) btnNext.disabled = idx === photos.length - 1;
      dots.forEach((d, i) => {
        d.classList.toggle('galerie-dot--active', i === idx);
        d.setAttribute('aria-selected', String(i === idx));
      });
    }

    if (btnPrev) btnPrev.addEventListener('click', () => goTo(idx - 1));
    if (btnNext) btnNext.addEventListener('click', () => goTo(idx + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));

    // Lightbox au clic/Enter sur une image
    bloc.addEventListener('click', e => {
      const img = e.target.closest('.galerie-slide-img');
      if (!img) return;
      const i = parseInt(img.dataset.lightboxIdx, 10);
      if (!isNaN(i)) openLightbox(photos, i);
    });
    bloc.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const img = e.target.closest('.galerie-slide-img');
      if (!img) return;
      e.preventDefault();
      const i = parseInt(img.dataset.lightboxIdx, 10);
      if (!isNaN(i)) openLightbox(photos, i);
    });
  });
}

/* ── Horaires ───────────────────────────────────────────────────
   Pré-requis Directus : collection `horaires` avec les champs :
     - id, jour (string), heure_ouverture (time), heure_fermeture (time),
       ouvert (boolean), note (string, optionnel)
   Référence HTML : <section id="horaires"> ... <ul class="horaires-list"> ... </ul> </section>
   ─────────────────────────────────────────────────── */
async function loadHoraires() {
  const section = document.getElementById('horaires');
  if (!section) return;

  const list = section.querySelector('.horaires-list');
  if (!list) return;

  // Skeleton : 5 lignes pendant le chargement
  list.innerHTML = Array.from({ length: 5 }, () =>
    `<li class="horaire-item" aria-hidden="true">
      <div class="skel skel-line" style="width:110px"></div>
      <div class="skel skel-line skel-line--sm"></div>
    </li>`
  ).join('');

  const horaires = await fetchCMS('/items/horaires?sort=sort,id&fields=jour,heure_ouverture,heure_fermeture,ouvert,note');

  if (!horaires || horaires.length === 0) {
    list.innerHTML = errorState(
      horaires === null
        ? 'Les horaires sont temporairement indisponibles.'
        : 'Aucun horaire configuré pour le moment.'
    );
    return;
  }

  // Jour actuel pour mise en surbrillance
  const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const todayName = JOURS[new Date().getDay()];

  list.innerHTML = '';

  horaires.forEach(h => {
    const isToday = h.jour?.toLowerCase() === todayName;
    const isFerme = !h.ouvert;

    let horairesText;
    if (isFerme) {
      horairesText = `<span class="horaire-ferme">Fermé</span>`;
    } else if (h.heure_ouverture && h.heure_fermeture) {
      // Formate HH:MM depuis HH:MM:SS
      const fmt = t => String(t ?? '').slice(0, 5);
      horairesText = `<span class="horaire-heures">${fmt(h.heure_ouverture)} – ${fmt(h.heure_fermeture)}</span>`;
    } else {
      horairesText = `<span class="horaire-heures">Voir avec la crèche</span>`;
    }

    list.insertAdjacentHTML(
      'beforeend',
      `<li class="horaire-item${isToday ? ' horaire-item--today' : ''}${isFerme ? ' horaire-item--ferme' : ''}">
        <span class="horaire-jour">${escapeHtml(capitalize(h.jour ?? ''))}</span>
        <span class="horaire-valeur">
          ${horairesText}
          ${h.note ? `<em class="horaire-note">${escapeHtml(h.note)}</em>` : ''}
        </span>
      </li>`
    );
  });
}

/* ── Équipe ──────────────────────────────────────────────────── */
async function loadEquipe() {
  const section = document.getElementById('equipe');
  if (!section) return;

  const grid = section.querySelector('.equipe-grid');
  if (!grid) return;

  grid.innerHTML = skeletonCards(3, 'equipe-card equipe-card--skeleton');

  const membres = await fetchCMS('/items/equipe?fields=id,nom,role,photo,bio');

  if (!membres || membres.length === 0) {
    grid.innerHTML = errorState(
      membres === null
        ? "L'équipe est temporairement indisponible."
        : 'Aucun membre à afficher pour le moment.'
    );
    return;
  }

  grid.innerHTML = '';
  membres.forEach(m => {
    const imgHtml = m.photo
      ? `<img src="${assetUrl(m.photo)}?width=200&height=200&fit=cover&quality=80" alt="${escapeHtml(m.nom)}" class="equipe-photo" width="200" height="200" loading="lazy" />`
      : `<div class="equipe-photo equipe-photo--placeholder" role="img" aria-label="Photo de profil non disponible pour ${escapeHtml(m.nom)}">👤</div>`;
    grid.insertAdjacentHTML(
      'beforeend',
      `<div class="equipe-card">
        ${imgHtml}
        <h3 class="equipe-nom">${escapeHtml(m.nom)}</h3>
        ${m.role ? `<p class="equipe-role">${escapeHtml(m.role)}</p>` : ''}
        ${m.bio ? `<div class="equipe-bio">${m.bio}</div>` : ''}
      </div>`
    );
  });
}

/* ── Documents ─────────────────────────────────────────────── */
async function loadDocuments() {
  const section = document.getElementById('documents');
  if (!section) return;

  const list = section.querySelector('.documents-list');
  if (!list) return;

  const docs = await fetchCMS('/items/documents?fields=id,titre,categorie,fichier.*&sort=categorie,titre');

  if (!docs || docs.length === 0) {
    list.innerHTML = errorState(
      docs === null
        ? 'Les documents sont temporairement indisponibles.'
        : 'Aucun document disponible pour le moment.'
    );
    return;
  }

  list.innerHTML = '';
  const byCategorie = {};
  docs.forEach(d => {
    const cat = d.categorie ?? 'autres';
    (byCategorie[cat] = byCategorie[cat] ?? []).push(d);
  });

  Object.entries(byCategorie).forEach(([cat, items]) => {
    list.insertAdjacentHTML('beforeend', `<h3 class="documents-cat">${escapeHtml(capitalize(cat))}</h3>`);
    items.forEach(d => {
      const fileId = d.fichier?.id ?? d.fichier;
      const href = fileId ? assetUrl(fileId) : '#';
      const ext = d.fichier?.filename_download?.split('.').pop()?.toUpperCase() ?? '';
      list.insertAdjacentHTML(
        'beforeend',
        `<a class="document-item" href="${href}" target="_blank" rel="noopener noreferrer">
          <svg class="doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span class="doc-titre">${escapeHtml(d.titre)}</span>
          ${ext ? `<span class="doc-ext">${ext}</span>` : ''}
        </a>`
      );
    });
  });
}

/* ── Helpers ─────────────────────────────────────────────────────── */
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncateHtml(html, maxLen) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLen) return escapeHtml(text);
  return escapeHtml(text.slice(0, maxLen)) + '…';
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ── Init ──────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadPages();
  loadArticles();
  loadGaleries();
  loadEquipe();
  loadDocuments();
  loadHoraires();
});
