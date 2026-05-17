# 🗺️ ROADMAP — www.theo-lea.fr

Feuille de route du site officiel de la micro-crèche **Théo & Léa** à Notre-Dame-des-Landes.  
Le site est une **page vitrine statique v2** (HTML + CSS, zéro dépendance) — après abandon de l'architecture Directus/CMS. Les priorités sont organisées par phases.

---

## ✅ Phase 0 — Fondations (terminé)

- [x] Structure HTML5 sémantique
- [x] Design CSS complet (palette bleu & sable/pissenlit)
- [x] Navigation sticky responsive
- [x] Hero avec pissenlits SVG décoratifs animés
- [x] Section La crèche — présentation du lieu et du projet
- [x] Section Nos engagements — 6 cartes thématiques
- [x] Section Le projet — timeline 2016–2019 → janvier 2027
- [x] Section Notre futur espace — galerie placeholder (6 espaces)
- [x] Section Nos valeurs — 4 piliers pédagogiques
- [x] Section Pré-inscription — intégration lien Meeko
- [x] Footer Contact — coordonnées, réseaux sociaux
- [x] Plan d'accès OpenStreetMap intégré
- [x] Liens Facebook & Instagram
- [x] Copyright dynamique (année via JS)
- [x] README & ROADMAP
- [x] Abandon CMS Directus → retour architecture statique pure

---

## 🔄 Phase 1 — Contenu réel (en cours)

> Objectif : remplacer les placeholders et affiner les textes existants

### 📝 Révision éditoriale

- [x] **Révision des textes** — Ajustements et reformulations légères sur l'ensemble des sections
  - Section "La crèche" : cohérence et ton validés
  - Section "Nos engagements" : uniformiser les longueurs des 6 cartes
  - Section "Le projet" : timeline 2016-2019 → janvier 2027 validée
  - Section "Nos valeurs" : descriptions des 4 piliers affinées

### 📸 Contenu visuel

- [ ] **Photos réelles du lieu** — Remplacer l'illustration `enfants.png` et les 6 placeholders de galerie
  - Photo hero (façade ou intérieur accueillant)
  - 6 photos des espaces : salle de jeux, coin repas, espace repos, extérieur, etc.
  - Format : JPG ou PNG, puis conversion WebP (Phase 4)
  - Résolution : 1920x1080 pour hero, 800x600 pour galerie

### 🎨 Identité & métadonnées

- [ ] **Favicon** — Créer un favicon pissenlit / initiales T&L aux couleurs de la crèche
  - Formats : `favicon.ico` (16x16, 32x32) + `favicon.png` (180x180 pour Apple)
  - Hébergement : `/assets/favicon.ico` et `/assets/favicon-180.png`

- [ ] **Open Graph** — Métadonnées pour le partage réseaux sociaux
  ```html
  <meta property="og:title" content="Théo & Léa — Micro-crèche à Notre-Dame-des-Landes">
  <meta property="og:description" content="Ouverture janvier 2027 — Un cocon de douceur...">
  <meta property="og:image" content="https://theo-lea.fr/assets/og-image.jpg">
  <meta property="og:url" content="https://theo-lea.fr">
  ```

### ℹ️ Informations pratiques

- [ ] **Horaires d'ouverture** — Ajouter dans footer ou section dédiée
  - Exemple : "Lundi au vendredi, 7h30 - 18h30"

- [x] **Capacité & tranche d'âge** — Précisé dans la section "La crèche"
  - Actuel : "12 enfants de 10 semaines à 3 ans"

### 🔧 Technique

- [ ] **Logo Meeko en local** — Héberger le favicon Meeko dans `assets/` pour éviter la dépendance externe
  - Actuellement : `https://theo-lea.meeko.site/favicon.ico`
  - Cible : `/assets/meeko-favicon.png`

---

## 🌿 Phase 2 — Expérience enrichie (moyen terme)

> Objectif : rendre le site plus vivant et informatif pour les familles

- [ ] **Section Équipe** — Présentation des professionnelles avec photos et parcours
- [ ] **Galerie photos complète** — Photos des espaces intérieurs, extérieurs, activités (avec consentement)
- [ ] **Menu hamburger mobile** — Remplacer la nav masquée sur mobile par un menu burger accessible
- [ ] **Animations d'entrée au scroll** — Apparition douce des sections (`Intersection Observer`)
- [ ] **Graines de pissenlit volantes** — Animation CSS des graines qui s'envolent (keyframes drift)
- [ ] **FAQ** — Réponses aux questions fréquentes (tarifs, CAF, horaires, modalités d'accueil)
- [ ] **Mode sombre** — Variante nocturne tons bois sombres et bleu nuit
- [ ] **Section documents** — Projet pédagogique PDF téléchargeable, règlement de fonctionnement

---

## 📅 Phase 3 — Informations pratiques complètes (avant ouverture)

> Objectif : site complet prêt pour l'ouverture en janvier 2027

- [ ] **Actualités** — Tenir les familles informées de l'avancée du projet (section blog simple, HTML statique)
- [ ] **Témoignages** — Avis et retours des premières familles (avec consentement)
- [ ] **Calendrier** — Programme pédagogique mensuel ou hebdomadaire
- [ ] **Informations CAF** — Explication des aides financières disponibles (PAJE, CMG)
- [ ] **Compteur avant ouverture** — Compte à rebours sur le hero

---

## 🔒 Phase 4 — Technique & performance (en continu)

- [ ] **Optimisation images** — Format WebP, `loading="lazy"`, `srcset` responsive
- [ ] **Minification de production** — Minifier HTML/CSS sur l’environnement de déploiement
- [ ] **Score Lighthouse ≥ 90** — Performance, accessibilité, SEO, best practices
- [ ] **SEO local** — Balises méta complètes, schema.org `LocalBusiness` / `ChildCare`, Google My Business
- [ ] **Sitemap.xml** — Générer et exposer un sitemap XML pour l’indexation
- [ ] **HTTPS** — Certificat SSL actif via hébergeur
- [ ] **Analytics RGPD-friendly** — Plausible ou Umami (sans cookies)
- [ ] **Accessibilité renforcée** — Audit WCAG AA complet
- [ ] **Déploiement automatique** — GitHub Actions ou Netlify/Vercel pour déployer à chaque push

---

## 💡 Idées en vrac (à évaluer plus tard)

- Page « La journée type à la crèche » avec illustrations
- Album photo saisonnier (automne, hiver, printemps, été)
- Section « Nos partenaires » (fournisseurs locaux, artisans, maraîchers)
- Livre d'or numérique pour les familles
- Playlist musicale de la crèche 🎵
- Page « Le coin des recettes » — recettes du goûter et de la cantine
- Section « La nature autour de nous » — sorties, saisons, jardinage avec les enfants
- Newsletter simple (lien Mailchimp ou Brevo)

---

## 📌 Légende

| Symbole | Signification |
|---------|---------------|
| ✅ | Terminé |
| 🔄 | En cours |
| 🚧 | Planifié (court terme) |
| 💡 | Idée à évaluer |
| ❌ | Abandonné |

---

*Dernière mise à jour : 17 mai 2026 — Phase 1 en cours (contenu visuel, métadonnées et infos pratiques). Architecture v2 statique.*
