# 🗺️ ROADMAP — www.theo-lea.fr

Feuille de route du site officiel de la micro-crèche **Théo & Léa** à Notre-Dame-des-Landes.  
Le site est une **page vitrine statique v2** (HTML + CSS, zéro dépendance) — après abandon de l'architecture Directus/CMS. Les priorités sont organisées par phases.

---

## 🔎 Analyse synthétique (mai 2026)

### Ce qui est solide
- Base technique simple et durable (site statique sans build).
- Positionnement clair et contenu éditorial globalement abouti.
- Identité visuelle cohérente et responsive déjà en place.

### Ce qui limite l’impact aujourd’hui
- Partage social et SEO local incomplets (Open Graph, schema, sitemap).
- Contenu visuel encore partiellement temporaire (« photos à venir »).
- Dépendance externe évitable sur l’icône Meeko.
- Expérience mobile perfectible (navigation masquée sans menu dédié).

---

## 🎯 Priorités d’actions proposées

### P0 — À traiter en premier (impact direct acquisition/conversion)
- [ ] Ajouter les balises **Open Graph** + Twitter Card (titre, description, image, URL).
- [ ] Implémenter le **SEO local** minimum viable :
  - balisage schema.org `ChildCare`/`LocalBusiness`
  - cohérence NAP (nom/adresse/téléphone)
  - préparation `sitemap.xml`
- [ ] Ajouter les **horaires d’ouverture** visibles dans la zone contact.

### P1 — Court terme (crédibilité et qualité perçue)
- [ ] Remplacer les visuels temporaires par des **photos réelles** (hero + galerie).
- [ ] Localiser les assets externes non critiques (**favicon Meeko**).
- [ ] Préparer une section **Équipe** (même version courte) pour renforcer la confiance.

### P2 — Moyen terme (UX et performance continue)
- [ ] Ajouter un **menu hamburger accessible** (mobile).
- [ ] Optimiser médias (WebP, `srcset`, lazy-loading ciblé).
- [ ] Mettre en place un suivi qualité (Lighthouse + vérification accessibilité WCAG AA).

---

## ✅ Phase 0 — Fondations (terminé)

- [x] Structure HTML5 sémantique
- [x] Design CSS complet (palette bleu & sable/pissenlit)
- [x] Navigation sticky responsive
- [x] Hero avec pissenlits décoratifs animés
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

- [ ] **Photos réelles du lieu** *(Priorité P1)* — Remplacer l'illustration `enfants.png` et les 6 placeholders de galerie
  - Photo hero (façade ou intérieur accueillant)
  - 6 photos des espaces : salle de jeux, coin repas, espace repos, extérieur, etc.
  - Format : JPG ou PNG, puis conversion WebP (Phase 4)
  - Résolution : 1920x1080 pour hero, 800x600 pour galerie

### 🎨 Identité & métadonnées

- [x] **Favicon** — Créer un favicon pissenlit / initiales T&L aux couleurs de la crèche
  - Formats : `favicon.ico` (16x16, 32x32) + `favicon.png` (180x180 pour Apple)
  - Hébergement : `/assets/favicon.ico` et `/assets/favicon-180.png`

- [ ] **Open Graph** *(Priorité P0)* — Métadonnées pour le partage réseaux sociaux
  ```html
  <meta property="og:title" content="Théo & Léa — Micro-crèche à Notre-Dame-des-Landes">
  <meta property="og:description" content="Ouverture janvier 2027 — Un cocon de douceur...">
  <meta property="og:image" content="https://theo-lea.fr/assets/og-image.jpg">
  <meta property="og:url" content="https://theo-lea.fr">
  ```

### ℹ️ Informations pratiques

- [ ] **Horaires d'ouverture** *(Priorité P0)* — Ajouter dans footer ou section dédiée
  - Exemple : "Lundi au vendredi, 7h30 - 18h30"

- [x] **Capacité & tranche d'âge** — Précisé dans la section "La crèche"
  - Actuel : "12 enfants de 10 semaines à 3 ans"

### 🔧 Technique

- [ ] **Logo Meeko en local** *(Priorité P1)* — Héberger le favicon Meeko dans `assets/` pour éviter la dépendance externe
  - Actuellement : `https://meeko.app/assets/apple-touch-icon-BeUq_aiW.png`
  - Cible : `/assets/meeko-favicon.png`

---

## 🌿 Phase 2 — Expérience enrichie (moyen terme)

> Objectif : rendre le site plus vivant et informatif pour les familles

- [ ] **Section Équipe** — Présentation des professionnelles avec photos et parcours
- [ ] **Galerie photos complète** — Photos des espaces intérieurs, extérieurs, activités (avec consentement)
- [ ] **Menu hamburger mobile** *(Priorité P2)* — Remplacer la nav masquée sur mobile par un menu burger accessible
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

- [ ] **Optimisation images** *(Priorité P2)* — Format WebP, `loading="lazy"`, `srcset` responsive
- [ ] **Minification de production** *(Priorité P2)* — Minifier HTML/CSS sur l’environnement de déploiement
- [ ] **Score Lighthouse ≥ 90** *(Priorité P2)* — Performance, accessibilité, SEO, best practices
- [ ] **SEO local** *(Priorité P0)* — Balises méta complètes, schema.org `LocalBusiness` / `ChildCare`, Google My Business
- [ ] **Sitemap.xml** *(Priorité P0)* — Générer et exposer un sitemap XML pour l’indexation
- [ ] **HTTPS** — Certificat SSL actif via hébergeur
- [ ] **Analytics RGPD-friendly** — Plausible ou Umami (sans cookies)
- [ ] **Accessibilité renforcée** *(Priorité P2)* — Audit WCAG AA complet
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

*Dernière mise à jour : 17 mai 2026 — priorisation ajoutée (P0/P1/P2), Phase 1 en cours. Architecture v2 statique.*
