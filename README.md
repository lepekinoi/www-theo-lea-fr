# 🌿 Théo & Léa — www.theo-lea.fr

Site officiel de la micro-crèche **Théo & Léa**, à Notre-Dame-des-Landes (44130).  
Ouverture prévue en **janvier 2027**.

> **Version actuelle : v2 statique** — après abandon du CMS Directus, retour à une architecture HTML + CSS pure, zéro dépendance.

---

## ✨ Présentation

Un site web chaleureux, ancré dans l'univers du bois et de la nature, dédié à la micro-crèche Théo & Léa.  
Page vitrine entièrement statique — aucune dépendance, aucun serveur, aucun CMS.

### 📍 Informations de contact

| | |
|---|---|
| **Adresse** | 16 impasse de la pie bavarde, 44130 Notre-Dame-des-Landes |
| **Téléphone** | [06 30 69 32 43](tel:+33630693243) |
| **E-mail** | [contact@theo-lea.fr](mailto:contact@theo-lea.fr) |
| **Facebook** | [Théo & Léa Micro-crèche](https://www.facebook.com/profile.php?id=61588872606051) |
| **Instagram** | [@microcreche.theoetlea.nddl](https://www.instagram.com/microcreche.theoetlea.nddl/) |
| **Pré-inscription** | [via Meeko](https://theo-lea.meeko.site/iframe/registration/one) |

---

## 🎨 Identité visuelle

| Rôle | Couleur | Code hex | Aperçu |
|------|---------|----------|---------|
| Bleu foncé (titres, nav, CTA) | Bleu canard profond | `#2C5F7A` | 🔵 |
| Bleu moyen (liens, accents) | Bleu azur | `#4A8FA8` | 🔷 |
| Bleu clair (fonds, halos) | Ciel pâle | `#A8CBDA` | 🩵 |
| Sable foncé (icônes bois) | Bois chaud | `#8B6B45` | 🟤 |
| Sable moyen (bordures, tags) | Sable doré | `#C4986A` | 🟫 |
| Sable clair (fonds cartes) | Lin | `#E8D5B7` | 🟨 |
| Fond principal | Ivoire naturel | `#F7F0E6` | 🤍 |

**Typographies :**
- **Playfair Display** — titres, ambiance serif chaleureuse
- **Lato** — corps de texte, lisibilité optimale

**Ambiance :** tons naturels bois & ciel, pissenlits décoratifs SVG, dégradés doux, émojis nature.

---

## 📁 Structure du projet

```
www-theo-lea-fr/
├── index.html      ← Page unique (HTML5 sémantique, tout-en-un) — 670 lignes
├── styles.css      ← Feuille de style (variables CSS, responsive) — 897 lignes
├── assets/         ← Images statiques (logo, illustration enfants)
│   ├── logo.png              ← Logo Théo & Léa
│   ├── enfants.png           ← Illustration placeholder
│   └── Thumbs.db             ← Cache Windows
├── README.md       ← Ce fichier
└── ROADMAP.md      ← Feuille de route du projet
```

> **Aucun JavaScript externe, aucun build, aucun CMS.**
> Le seul script présent met à jour l'année du copyright en bas de page.

### 📊 Statistiques techniques

| Métrique | Valeur |
|----------|--------|
| Lignes HTML | 670 |
| Lignes CSS | 897 |
| Sections principales | 8 |
| Images assets | 2 (+ logo Meeko externe) |
| Dépendances externes | 0 (sauf Google Fonts) |
| Taille totale | ~150 KB |

---

## 📄 Sections de la page

| Section | ID | Description |
|---------|----|-------------|
| Navigation | `nav` | Sticky, liens internes |
| Hero | `#home` | Logo, pissenlits SVG animés, CTA, badge ouverture |
| La crèche | `#creche` | Présentation du lieu (12 enfants, de 10 semaines à 3 ans) |
| Nos engagements | `#engagements` | 6 cartes : nature, bienveillance, rythme, alimentation, créativité, sécurité |
| Notre projet | `#projet` | Timeline en 5 étapes, de 2016–2019 à l'ouverture en janvier 2027 |
| Notre futur espace | `#espace` | Galerie placeholder des 6 espaces (photos à venir) |
| Nos valeurs | `#valeurs` | 4 piliers : nature, bienveillance, lien avec les familles, engagement |
| Pré-inscription | `#inscription` | Lien Meeko |
| Contact & Footer | `#contact` | Coordonnées, réseaux sociaux, carte OpenStreetMap |

---

## 🎯 Architecture CSS

### Variables CSS centralisées

Le design utilise des variables CSS personnalisées définies dans `:root` pour une maintenance simplifiée :

```css
:root {
  /* Palette de bleus */
  --bleu-fonce: #2C5F7A;
  --bleu-moyen: #4A8FA8;
  --bleu-clair: #A8CBDA;

  /* Palette sable/bois/pissenlit */
  --orange: #D4883A;
  --sable-moyen: #C4986A;
  --sable-clair: #E8D5B7;

  /* Fonds */
  --ivoire: #F7F0E6;
  --sable: #EDE4D4;
}
```

### Points de rupture responsive

| Breakpoint | Taille | Usage |
|------------|--------|-------|
| Mobile | < 768px | Navigation masquée, cartes empilées |
| Tablette | 768px - 1024px | Layout intermédiaire |
| Desktop | > 1024px | Navigation complète, grilles multi-colonnes |

### Éléments SVG décoratifs

- **Pissenlits** : 3 variations avec graines envolées
- **Coloration** : via `currentColor` et CSS `color: var(--orange)`
- **Positionnement** : `position: absolute` dans le hero
- **Animations** : opacité et transformations CSS

---

## 🚀 Démarrage rapide

Aucune dépendance, aucun build nécessaire :

```bash
# Option 1 — Ouvrir directement dans le navigateur
open index.html

# Option 2 — Serveur local Python
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000

# Option 3 — Serveur local Node.js (si npx disponible)
npx serve .

# Option 4 — Serveur local PHP
php -S localhost:8000
```

---

## 🌐 Déploiement & Hébergement

Le site étant entièrement statique, il peut être hébergé sur n'importe quelle plateforme supportant les fichiers HTML/CSS.

### Options d'hébergement recommandées

| Plateforme | Avantages | HTTPS | Gratuit |
|------------|-----------|-------|---------|
| **Netlify** | Déploiement automatique via Git, CDN global | ✅ | ✅ |
| **Vercel** | Performances excellentes, domaine personnalisé | ✅ | ✅ |
| **GitHub Pages** | Intégration GitHub native, simple | ✅ | ✅ |
| **Cloudflare Pages** | CDN ultrarapide, analytics intégré | ✅ | ✅ |
| **OVH (perso)** | Hébergement français, support local | ✅ | 💰 |

### Déploiement automatique (exemple Netlify)

1. Connecter le dépôt GitHub à Netlify
2. Configuration de build : **aucune** (site statique)
3. Répertoire de publication : `/` (racine)
4. Déploiement automatique à chaque push sur `main`

---

## 🛠️ Workflow de développement

### Modification du contenu

1. Éditer `index.html` pour les textes et la structure
2. Éditer `styles.css` pour les styles et couleurs
3. Tester localement avec un serveur HTTP
4. Commit et push vers GitHub

### Ajout d'images

1. Placer les images dans `/assets/`
2. Optimiser les images (compression, redimensionnement)
3. Référencer dans `index.html` : `<img src="assets/nom-image.jpg" alt="...">`

### Modification des couleurs

Toutes les couleurs sont centralisées dans `styles.css` via des variables CSS :

```css
:root {
  --bleu-fonce: #2C5F7A;  /* Modifier ici pour changer partout */
}
```

---

## ♿ Accessibilité

- HTML5 sémantique (`<nav>`, `<header>`, `<section>`, `<article>`, `<footer>`)
- Attributs `aria-label` et `aria-hidden` sur les éléments décoratifs
- Contrastes conformes WCAG AA
- Navigation au clavier (focus visible, `tabindex` sur les items de galerie)

---

## 📐 Compatibilité

| Navigateur | Support |
|------------|---------|
| Chrome / Edge ≥ 90 | ✅ |
| Firefox ≥ 88 | ✅ |
| Safari ≥ 14 | ✅ |
| Mobile (iOS / Android) | ✅ responsive |

---

## 📈 Performance & Optimisation

### État actuel

| Métrique | Valeur |
|----------|--------|
| Temps de chargement | < 1 seconde |
| Taille HTML | ~50 KB |
| Taille CSS | ~24 KB |
| Images | ~80 KB (non optimisées) |
| **Total** | **~150 KB** |

### Optimisations prévues (Phase 4)

- [ ] Conversion images en WebP
- [ ] Attribut `loading="lazy"` sur images
- [ ] `srcset` responsive pour images
- [ ] Minification HTML/CSS en production
- [ ] Score Lighthouse ≥ 90/100

---

## 🔍 SEO & Métadonnées

### Actuellement implémenté

- ✅ Balise `<title>` descriptive
- ✅ Meta description
- ✅ Viewport responsive
- ✅ Structure HTML5 sémantique
- ✅ Liens internes avec ancres

### À ajouter (Phase 1 & 4)

- [ ] Open Graph (Facebook, Twitter)
- [ ] Favicon personnalisé
- [ ] Schema.org `LocalBusiness` / `ChildCare`
- [ ] Sitemap.xml
- [ ] Google My Business

---

## 📜 Licence

© Théo & Léa — Tous droits réservés. Contenu personnel, non réutilisable sans autorisation.

---

*Dernière mise à jour : 17 mai 2026*
