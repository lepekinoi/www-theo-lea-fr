# 🌿 Théo & Léa — www.theo-lea.fr

Site officiel de la micro-crèche **Théo & Léa**, à Notre-Dame-des-Landes (44130). Ouverture prévue en janvier 2027.

---

## ✨ Présentation

Un espace web chaleureux, ancré dans l'univers du bois et de la nature, dédié à la micro-crèche Théo & Léa. Un lieu doux, rassurant et bienveillant pour les tout-petits et leurs familles.

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
| Bleu foncé (titres, nav, CTA) | ![#2C5F7A](https://placehold.co/16x16/2C5F7A/2C5F7A.png) | `#2C5F7A` |
| Bleu moyen (liens, accents) | ![#4A8FA8](https://placehold.co/16x16/4A8FA8/4A8FA8.png) | `#4A8FA8` |
| Bleu clair (fonds, halos) | ![#A8CBDA](https://placehold.co/16x16/A8CBDA/A8CBDA.png) | `#A8CBDA` |
| Sable foncé (icônes bois) | ![#8B6B45](https://placehold.co/16x16/8B6B45/8B6B45.png) | `#8B6B45` |
| Sable moyen (bordures, tags) | ![#C4986A](https://placehold.co/16x16/C4986A/C4986A.png) | `#C4986A` |
| Sable clair (fonds cartes) | ![#E8D5B7](https://placehold.co/16x16/E8D5B7/E8D5B7.png) | `#E8D5B7` |
| Fond principal | ![#F7F0E6](https://placehold.co/16x16/F7F0E6/F7F0E6.png) | `#F7F0E6` |

**Typographies :**
- **Playfair Display** — titres, ambiance serif chaleureuse
- **Lato** — corps de texte, lisibilité optimale

**Matières & ambiance :** grain de bois (CSS), dégradés naturels, émojis nature, tons terre.

---

## 📁 Structure du projet

```
www-theo-lea-fr/
├── index.html      ← Page principale (HTML5 sémantique)
├── styles.css      ← Feuille de style (variables CSS, responsive)
├── README.md       ← Ce fichier
└── ROADMAP.md      ← Feuille de route du projet
```

---

## 📄 Sections de la page

| Section | ID | Description |
|---------|----|-------------|
| Navigation | `nav` | Sticky, bleu foncé, liens de section |
| Hero | `#home` | Accroche principale, pissenlit logo animés, boutons CTA |
| La crèche | `#creche` | Présentation de la micro-crèche |
| Nos engagements | `#engagements` | Valeurs éducatives et pédagogiques |
| Le projet | `#projet` | Histoire et vision du projet |
| Notre futur espace | `#espace` | Galerie placeholder des espaces |
| Nos valeurs | `#valeurs` | Piliers de la micro-crèche |
| Pré-inscription | `#inscription` | Lien Meeko pour la pré-inscription |
| Nous contacter | `#contact` | Coordonnées & réseaux sociaux (dans le footer) |
| Footer | — | Liens, copyright |

---

## 🚀 Démarrage rapide

Aucune dépendance, aucun build nécessaire. Il suffit d'ouvrir `index.html` dans un navigateur :

```bash
# Option 1 — Ouvrir directement
open index.html

# Option 2 — Serveur local avec Python
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

---

## ♿ Accessibilité

- HTML5 sémantique (`<nav>`, `<header>`, `<section>`, `<article>`, `<footer>`)
- Attributs `aria-label` sur les éléments interactifs et décoratifs
- Contrastes conformes WCAG AA
- Navigation au clavier (focus visible, `tabindex` sur la galerie)

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
