# 🌿 Théo & Léa — www.theo-lea.fr

Site personnel statique aux couleurs bois & nature, pour Théo et Léa.

---

## ✨ Présentation

Un espace web chaleureux, ancré dans l'univers du bois et de la nature, qui raconte notre histoire, nos passions et nos valeurs. L'ambiance est douce, organique et authentique.

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
| Hero | `#home` | Accroche principale, boutons CTA |
| À propos | `#about` | 6 cartes thématiques (forêt, bois, eau…) |
| Notre histoire | `#story` | Timeline interactive |
| Galerie | `#gallery` | Grille de photos (placeholders) |
| Nos valeurs | `#values` | 4 cartes sur fond bleu |
| Contact | `#contact` | Formulaire complet |
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
