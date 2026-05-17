# 🗺️ ROADMAP — www.theo-lea.fr

Feuille de route du site officiel de la micro-crèche **Théo & Léa** à Notre-Dame-des-Landes.  
Le site est une **page vitrine statique** (HTML + CSS, zéro dépendance). Les priorités sont organisées par phases.

---

## ✅ Phase 0 — Fondations (terminé)

- [x] Structure HTML5 sémantique
- [x] Design CSS complet (palette bleu & sable/pissenlit)
- [x] Navigation sticky responsive
- [x] Hero avec pissenlits SVG décoratifs animés
- [x] Section La crèche — présentation du lieu et du projet
- [x] Section Nos engagements — 6 cartes thématiques
- [x] Section Le projet — timeline 2024 → janvier 2027
- [x] Section Notre futur espace — galerie placeholder (6 espaces)
- [x] Section Nos valeurs — 4 piliers pédagogiques
- [x] Section Pré-inscription — intégration lien Meeko
- [x] Footer Contact — coordonnées, réseaux sociaux
- [x] Plan d'accès OpenStreetMap intégré
- [x] Liens Facebook & Instagram
- [x] Copyright dynamique (année via JS)
- [x] README & ROADMAP

---

## 🚧 Phase 1 — Contenu réel (court terme)

> Objectif : remplacer les placeholders par les vrais contenus de la crèche

- [ ] **Photos réelles** — Remplacer l'illustration `enfants.png` et les placeholders de galerie par de vraies photos du lieu
- [ ] **Textes finalisés** — Rédiger les textes définitifs pour chaque section
- [ ] **Favicon** — Créer un favicon pissenlit / initiales T&L aux couleurs de la crèche
- [ ] **Open Graph** — Métadonnées pour le partage réseaux sociaux (`og:title`, `og:image`, `og:description`)
- [ ] **Horaires d'ouverture** — Ajouter une section ou une mention des horaires d'accueil
- [ ] **Capacité & tranche d'âge** — Préciser le nombre de places et les âges accueillis
- [ ] **Logo Meeko en local** — Héberger le favicon Meeko dans `assets/` pour éviter la dépendance externe

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
- [ ] **Score Lighthouse ≥ 90** — Performance, accessibilité, SEO, best practices
- [ ] **SEO local** — Balises méta complètes, schema.org `LocalBusiness` / `ChildCare`, Google My Business
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

*Dernière mise à jour : Mai 2026 — retour à la version statique (suppression de Directus/CMS), réécriture complète des docs.*
