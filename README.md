# 🌿 Théo & Léa — www.theo-lea.fr

Site officiel de la micro-crèche **Théo & Léa**, à Notre-Dame-des-Landes (44130). Ouverture prévue en janvier 2027.

---

## ✨ Présentation

Un espace web chaleureux, ancré dans l'univers du bois et de la nature, dédié à la micro-crèche Théo & Léa. Le site est entièrement piloté par un CMS **Directus** hébergé sur [cms.theo-lea.fr](https://cms.theo-lea.fr/admin/) : les textes, images, actualités, galeries, horaires, équipe et documents sont modifiables sans toucher au code.

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

| Rôle | Couleur | Code hex |
|------|---------|----------|
| Bleu foncé (titres, nav, CTA) | `#2C5F7A` |
| Bleu moyen (liens, accents) | `#4A8FA8` |
| Bleu clair (fonds, halos) | `#A8CBDA` |
| Ambre / pissenlit (logo, tags) | `#D4883A` |
| Crème sable (fonds cartes) | `#F7F0E6` |
| Fond principal | `#EDE4D4` |

**Typographies :**
- **Playfair Display** — titres, ambiance serif chaleureuse
- **Lato** — corps de texte, lisibilité optimale

**Matières & ambiance :** pissenlits SVG animés, dégradés naturels, tons terre et teal doux.

---

## 📁 Structure du projet

```
www-theo-lea-fr/
├── index.html      ← Page principale (HTML5 sémantique, hooks data-cms-*)
├── styles.css      ← Feuille de style (variables CSS, responsive, skeletons, lightbox)
├── cms.js          ← Module CMS Directus (fetch, cache, skeletons, erreurs)
├── assets/         ← Logo, images statiques
├── .htaccess       ← Redirections Apache
├── README.md       ← Ce fichier
└── ROADMAP.md      ← Feuille de route du projet
```

---

## 🔌 Architecture CMS Directus

Le contenu dynamique est chargé via l'API REST de [cms.theo-lea.fr](https://cms.theo-lea.fr/admin/).

### Collections Directus

| Collection | Champs principaux | Section HTML | Statut |
|------------|-------------------|--------------|--------|
| `pages` | `slug`, `titre`, `contenu`, `image_hero` | `#home` (hero), `#creche` | ✅ Intégré |
| `articles` | `titre`, `contenu`, `image`, `date_publication`, `slug` | `#actualites` | ✅ Intégré |
| `galeries` | `titre`, `description`, `photos.directus_files_id` | `#espace` | ✅ Intégré |
| `equipe` | `nom`, `role`, `photo`, `bio` | `#equipe` | ✅ Intégré |
| `documents` | `titre`, `categorie`, `fichier` | `#documents` | ✅ Intégré |
| `horaires` | `jour`, `heure_ouverture`, `heure_fermeture`, `ouvert`, `note`, `sort` | `#horaires` | ✅ Intégré |
| `temoignages` | `auteur`, `message`, `note` | `#temoignages` | 🔜 Phase 3 |

### Fonctionnement de `cms.js`

```
DOMContentLoaded
  ├── loadPages()       → Injecte hero desc + section crèche (data-cms-page)
  ├── loadArticles()    → Grille paginée 3/page + modal plein contenu
  ├── loadGaleries()    → Carousel par galerie + lightbox navigation clavier
  ├── loadEquipe()      → Grille membres avec photo/rôle/bio
  ├── loadDocuments()   → Liste groupée par catégorie avec liens téléchargement
  └── loadHoraires()    → Liste avec highlight du jour en cours
```

**Cache :** réponses mémorisées 5 min en mémoire (`_cache` objet).  
**Erreurs :** état d'erreur visuel (`.cms-error`) si le CMS est inaccessible.  
**Skeletons :** placeholders animés shimmer pendant chaque chargement.

### Schéma Directus — collection `horaires`

```
horaires
├── id          (integer, auto)
├── sort        (integer) ← pour trier lundi→vendredi
├── jour        (string)  ← ex: "lundi", "mardi"…
├── heure_ouverture  (time)    ← format HH:MM:SS
├── heure_fermeture  (time)    ← format HH:MM:SS
├── ouvert      (boolean) ← false = affiché "Fermé"
└── note        (string, nullable) ← ex: "Fermeture exceptionnelle"
```

---

## 📄 Sections de la page

| Section | ID HTML | Contenu | Source |
|---------|---------|---------|--------|
| Navigation | `nav` | Liens de section, sticky | Statique |
| Hero | `#home` | Accroche, pissenlit animés, CTA | `pages` slug `accueil` |
| La crèche | `#creche` | Présentation de la micro-crèche | `pages` slug `creche` |
| Nos engagements | `#engagements` | Valeurs éducatives | Statique |
| Notre espace | `#espace` | Galeries photos avec carousel + lightbox | `galeries` |
| L'équipe | `#equipe` | Photos, rôles, biographies | `equipe` |
| Actualités | `#actualites` | Articles paginés (3/page) + modal | `articles` |
| Horaires | `#horaires` | Horaires semaine avec highlight jour | `horaires` |
| Le projet | `#projet` | Timeline du projet | Statique |
| Nos valeurs | `#valeurs` | Piliers de la micro-crèche | Statique |
| Documents | `#documents` | Fichiers téléchargeables par catégorie | `documents` |
| Pré-inscription | `#inscription` | Lien Meeko | Statique |
| Contact / Footer | — | Coordonnées, réseaux sociaux, carte | Statique |

---

## 🚀 Démarrage rapide

Aucune dépendance, aucun build nécessaire. Serveur local recommandé pour les appels API :

```bash
# Serveur local avec Python (recommandé — évite les problèmes CORS)
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000

# Ou directement (sans fetch CMS)
open index.html
```

Le CMS est accessible à : **https://cms.theo-lea.fr/admin/**

---

## 🎨 Fonctionnalités UI notables

- **Pissenlits SVG animés** — 10 pissenlits en bas du hero, balancement doux (5 animations distinctes)
- **Skeletons shimmer** — placeholders animés sur articles, équipe, galeries, horaires
- **Lightbox galerie** — navigation clavier (←/→/Esc), compteur, fermeture au clic backdrop
- **Modal articles** — contenu HTML complet, navigation clavier, fermeture Escape
- **Horaires intelligents** — jour en cours mis en surbrillance automatiquement
- **Cache CMS 5 min** — évite les re-fetch inutiles à chaque scroll/navigation

---

## ♿ Accessibilité

- HTML5 sémantique (`<nav>`, `<header>`, `<section>`, `<article>`, `<footer>`)
- Attributs `aria-label`, `aria-modal`, `aria-hidden` sur tous les éléments appropriés
- Contrastes conformes WCAG AA
- Navigation clavier complète (modals, lightbox, carousel)
- `prefers-reduced-motion` respecté (skeletons statiques si activé)
- Touch targets ≥ 44px sur mobile

---

## 📐 Compatibilité navigateurs

| Navigateur | Support |
|------------|---------|
| Chrome / Edge ≥ 90 | ✅ |
| Firefox ≥ 88 | ✅ |
| Safari ≥ 14 | ✅ |
| Mobile (iOS / Android) | ✅ responsive |

---

## 🗺️ Roadmap

Voir [ROADMAP.md](./ROADMAP.md) pour le détail complet.

**Phases :**
- ✅ **Phase 1** — Site statique + intégration Directus (pages, articles, galeries, équipe, documents, horaires)
- 🔄 **Phase 2** — Burger menu mobile, Open Graph dynamique, section espace complète
- 🔜 **Phase 3** — Témoignages familles, formulaire de contact, optimisations SEO

---

## 📜 Licence

© Théo & Léa — Tous droits réservés. Contenu personnel, non réutilisable sans autorisation.
