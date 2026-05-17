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

| Rôle | Couleur | Code hex |
|------|---------|----------|
| Bleu foncé (titres, nav, CTA) | Bleu canard profond | `#2C5F7A` |
| Bleu moyen (liens, accents) | Bleu azur | `#4A8FA8` |
| Bleu clair (fonds, halos) | Ciel pâle | `#A8CBDA` |
| Sable foncé (icônes bois) | Bois chaud | `#8B6B45` |
| Sable moyen (bordures, tags) | Sable doré | `#C4986A` |
| Sable clair (fonds cartes) | Lin | `#E8D5B7` |
| Fond principal | Ivoire naturel | `#F7F0E6` |

**Typographies :**
- **Playfair Display** — titres, ambiance serif chaleureuse
- **Lato** — corps de texte, lisibilité optimale

**Ambiance :** tons naturels bois & ciel, pissenlits décoratifs SVG, dégradés doux, émojis nature.

---

## 📁 Structure du projet

```
www-theo-lea-fr/
├── index.html      ← Page unique (HTML5 sémantique, tout-en-un)
├── styles.css      ← Feuille de style (variables CSS, responsive)
├── assets/         ← Images statiques (logo, illustration enfants)
├── README.md       ← Ce fichier
└── ROADMAP.md      ← Feuille de route du projet
```

> **Aucun JavaScript externe, aucun build, aucun CMS.**  
> Le seul script présent met à jour l'année du copyright en bas de page.

---

## 📄 Sections de la page

| Section | ID | Description |
|---------|----|-------------|
| Navigation | `nav` | Sticky, liens internes |
| Hero | `#home` | Logo, pissenlits SVG animés, CTA, badge ouverture |
| La crèche | `#creche` | Présentation du projet et du lieu |
| Nos engagements | `#engagements` | 6 cartes : nature, bienveillance, rythme, alimentation, créativité, sécurité |
| Notre projet | `#projet` | Timeline de 2024 à l'ouverture janvier 2027 |
| Notre futur espace | `#espace` | Galerie placeholder des 6 espaces (photos à venir) |
| Nos valeurs | `#valeurs` | 4 piliers : nature, bienveillance, éveil global, partenariat |
| Pré-inscription | `#inscription` | Lien Meeko |
| Contact & Footer | `#contact` | Coordonnées, réseaux sociaux, carte OpenStreetMap |

---

## 🚀 Démarrage rapide

Aucune dépendance, aucun build nécessaire :

```bash
# Option 1 — Ouvrir directement dans le navigateur
open index.html

# Option 2 — Serveur local
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
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

## 📜 Licence

© Théo & Léa — Tous droits réservés. Contenu personnel, non réutilisable sans autorisation.

---

*Dernière mise à jour : Mai 2026*
