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
  const articles = await fetchCMS(
    '/items/articles?sort=-date_publication&fields=id,titre,contenu,image,date_publication,slug&limit=10'
  );
  const section = document.getElementById('actualites');
  if (!section) return;

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

  function articleCardHtml(article) {
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
    return `<article class="article-card">
        ${imgHtml}
        <div class="article-body">
          ${date ? `<p class="article-date">${date}</p>` : ''}
          <h3 class="article-titre">${escapeHtml(article.titre)}</h3>
          <p class="article-extrait">${truncateHtml(article.contenu ?? '', 180)}</p>
        </div>
      </article>`;
  }

  const hasMultiplePages = articles.length > ARTICLES_PER_PAGE;
  if (btnPrev) btnPrev.style.display = hasMultiplePages ? '' : 'none';
  if (btnNext) btnNext.style.display = hasMultiplePages ? '' : 'none';

  function render() {
    const visible = articles.slice(offset, offset + ARTICLES_PER_PAGE);
    grid.style.gridTemplateColumns = `repeat(${Math.min(visible.length, ARTICLES_PER_PAGE)}, minmax(0, 380px))`;
    grid.innerHTML = visible.map(articleCardHtml).join('');
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

  render();
}

/* ── Galeries ────────────────────────────────────────────── */
async function loadGaleries() {
  const galeries = await fetchCMS('/items/galeries?fields=id,titre,description,photos.*&limit=3');
  const section = document.getElementById('espace');
  if (!section || !galeries || galeries.length === 0) return;

  const grid = section.querySelector('.gallery-grid');
  if (!grid) return;

  grid.innerHTML = '';

  galeries.forEach(galerie => {
    const photos = (galerie.photos ?? []).slice(0, 6);
    if (photos.length === 0) {
      grid.insertAdjacentHTML(
        'beforeend',
        `<div class="gallery-item gallery-item--vide" tabindex="0" aria-label="${escapeHtml(galerie.titre)}">
          <span aria-hidden="true">🖼️</span>
          <span>${escapeHtml(galerie.titre)}</span>
          ${galerie.description ? `<p class="gallery-desc">${escapeHtml(galerie.description)}</p>` : ''}
        </div>`
      );
    } else {
      photos.forEach(p => {
        const fileId = p.directus_files_id ?? p;
        grid.insertAdjacentHTML(
          'beforeend',
          `<div class="gallery-item gallery-item--photo" tabindex="0">
            <img src="${assetUrl(fileId)}?width=400&quality=75" alt="${escapeHtml(galerie.titre)}" loading="lazy" />
            <span class="gallery-caption">${escapeHtml(galerie.titre)}</span>
          </div>`
        );
      });
    }
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
