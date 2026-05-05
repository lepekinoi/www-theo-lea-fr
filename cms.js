/* ============================================================
   Théo & Léa — Module CMS Directus
   Charge le contenu dynamiquement depuis https://cms.theo-lea.fr
   ============================================================ */

const CMS_URL = 'https://cms.theo-lea.fr';

async function fetchCMS(path) {
  try {
    const res = await fetch(`${CMS_URL}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data ?? null;
  } catch (e) {
    console.warn('[CMS] Erreur de chargement :', path, e.message);
    return null;
  }
}

function assetUrl(fileId) {
  return fileId ? `${CMS_URL}/assets/${fileId}` : null;
}

/* ── Pages (contenus éditables par slug) ─────────────────── */
async function loadPages() {
  const pages = await fetchCMS('/items/pages?fields=slug,titre,contenu,image_hero');
  if (!pages) return;
  const bySlug = Object.fromEntries(pages.map(p => [p.slug, p]));

  // Mise à jour de la section "creche"
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
        // Contenu rich text de confiance depuis le CMS interne
        if (el) el.innerHTML = creche.contenu;
      }
    }
  }

  // Mise à jour du hero
  const hero = bySlug['accueil'];
  if (hero) {
    if (hero.contenu) {
      // Contenu rich text de confiance depuis le CMS interne
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
  const rawArticles = await fetchCMS(
    '/items/articles?sort=-date_publication&fields=id,titre,contenu,image,date_publication,slug&limit=20'
  );
  const section = document.getElementById('actualites');
  if (!section) return;

  // Ne pas afficher les articles dont la date de publication est dans le futur
  const now = new Date();
  const articles = rawArticles
    ? rawArticles.filter(a => !a.date_publication || new Date(a.date_publication) <= now)
    : null;

  if (!articles || articles.length === 0) {
    section.style.display = 'none';
    return;
  }

  const grid = section.querySelector('.articles-grid');
  const btnPrev = section.querySelector('.articles-nav--prev');
  const btnNext = section.querySelector('.articles-nav--next');
  if (!grid) return;

  const ARTICLES_PER_PAGE = 3;
  let offset = 0;

  function articleCardHtml(article, idx) {
    const date = article.date_publication
      ? new Date(article.date_publication).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';
    const imgHtml = article.image
      ? `<img src="${assetUrl(article.image)}?width=480&quality=75" alt="${escapeHtml(article.titre)}" class="article-img" loading="lazy" />`
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

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      offset -= ARTICLES_PER_PAGE;
      render();
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      offset += ARTICLES_PER_PAGE;
      render();
    });
  }

  // ── Modal plein contenu ────────────────────────────────────
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
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
      });
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
    // Contenu rich text de confiance depuis le CMS interne
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

/* ── Galeries ────────────────────────────────────────────── */
async function loadGaleries() {
  const galeries = await fetchCMS('/items/galeries?fields=id,titre,description,photos.*');
  const section = document.getElementById('espace');
  if (!section || !galeries || galeries.length === 0) return;

  const container = section.querySelector('.galeries-list');
  if (!container) return;

  container.innerHTML = '';

  galeries.forEach(galerie => {
    const photos = galerie.photos ?? [];

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
    const slidesHtml = photos.map((p, i) => {
      const fileId = p.directus_files_id ?? p;
      return `<div class="galerie-slide">
        <img src="${assetUrl(fileId)}?width=900&quality=80" alt="${escapeHtml(galerie.titre)} — photo ${i + 1}" loading="lazy" />
      </div>`;
    }).join('');

    const hasMany = photos.length > 1;
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
  });
}

/* ── Équipe ──────────────────────────────────────────────── */
async function loadEquipe() {
  const membres = await fetchCMS('/items/equipe?fields=id,nom,role,photo,bio');
  const section = document.getElementById('equipe');
  if (!section) return;

  if (!membres || membres.length === 0) {
    section.style.display = 'none';
    return;
  }

  const grid = section.querySelector('.equipe-grid');
  if (!grid) return;
  grid.innerHTML = '';

  membres.forEach(m => {
    const imgHtml = m.photo
      ? `<img src="${assetUrl(m.photo)}?width=200&height=200&fit=cover&quality=80" alt="${escapeHtml(m.nom)}" class="equipe-photo" />`
      : `<div class="equipe-photo equipe-photo--placeholder" role="img" aria-label="Photo de profil non disponible pour ${escapeHtml(m.nom)}">👤</div>`;
    grid.insertAdjacentHTML(
      'beforeend',
      `<div class="equipe-card">
        ${imgHtml}
        <h3 class="equipe-nom">${escapeHtml(m.nom)}</h3>
        ${m.role ? `<p class="equipe-role">${escapeHtml(m.role)}</p>` : ''}
        ${m.bio ? `<div class="equipe-bio">${m.bio}</div>` : ''}
      </div>`
      // Note : m.bio est un champ rich text de confiance depuis le CMS interne (innerHTML intentionnel)
    );
  });
}

/* ── Documents ───────────────────────────────────────────── */
async function loadDocuments() {
  const docs = await fetchCMS('/items/documents?fields=id,titre,categorie,fichier.*&sort=categorie,titre');
  const section = document.getElementById('documents');
  if (!section) return;

  if (!docs || docs.length === 0) {
    section.style.display = 'none';
    return;
  }

  const list = section.querySelector('.documents-list');
  if (!list) return;
  list.innerHTML = '';

  // Regroupement par catégorie
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

/* ── Helpers ─────────────────────────────────────────────── */
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

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadPages();
  loadArticles();
  loadGaleries();
  loadEquipe();
  loadDocuments();
});
