# 🌿 Théo & Léa — www.theo-lea.fr

Site vitrine officiel de la micro-crèche **Théo & Léa** (Notre-Dame-des-Landes), avec ouverture prévue en **janvier 2027**.

## 🧭 État du projet (analyse rapide)

### Points forts
- Site **100% statique** (HTML/CSS), simple à maintenir et à déployer.
- Identité visuelle cohérente (palette, typographies, iconographie).
- Message métier clair (projet, engagements, valeurs, pré-inscription, contact).
- Base accessibilité déjà présente (sémantique, labels, focus, responsive).
- Socle SEO/social désormais en place (Open Graph, Twitter Card, canonical, schema.org, `sitemap.xml`).

### Points à renforcer
- Les visuels réels du lieu restent à finaliser (les blocs placeholders ont été remplacés par des visuels provisoires).
- Navigation mobile minimaliste (liens masqués sans menu hamburger accessible).
- Référencement local à consolider côté diffusion et suivi (indexation, fiche établissement, Search Console).

### Priorités d’actions proposées
1. **P0 — Diffusion locale** : vérifier l’indexation du `sitemap.xml`, brancher les outils de suivi SEO et compléter la présence établissement.
2. **P1 — Crédibilité du projet** : vraies photos (hero + galerie + espace).
3. **P1 — Robustesse front** : supprimer dépendances médias externes non nécessaires (Meeko favicon local).
4. **P2 — UX mobile** : menu hamburger accessible.
5. **P2 — Performance continue** : optimisation images + minification + suivi Lighthouse.

### Dernières évolutions intégrées
- Ajout des métadonnées **Open Graph** et **Twitter Card** pour le partage social.
- Ajout du balisage **schema.org** (`ChildCare` / `LocalBusiness`) et du lien canonical.
- Génération de `sitemap.xml` pour l’indexation.
- Affichage des **horaires d’ouverture** sur le site : **lundi au vendredi, 7h30 – 18h00**.
- Localisation du favicon **Meeko** en asset local (`assets/meeko-favicon.png`).
- Ajout d’une section **Équipe** courte.

### P0 hors site — suivi opérationnel
- ✅ `https://theo-lea.fr/sitemap.xml` est publié et accessible.
- ⚠️ Search Console : fichier de vérification présent dans le repo (`google579dcd3bfd791eff.html`), à vérifier en production.
- ⏳ Fiche établissement (Google Business Profile) : harmoniser NAP (nom/adresse/téléphone) et relier le site.

> Le détail opérationnel est maintenu dans `ROADMAP.md`.

---

## 📍 Informations de contact

| | |
|---|---|
| **Adresse** | 16 impasse de la pie bavarde, 44130 Notre-Dame-des-Landes |
| **Téléphone** | [06 30 69 32 43](tel:+33630693243) |
| **E-mail** | [contact@theo-lea.fr](mailto:contact@theo-lea.fr) |
| **Facebook** | [Théo & Léa Micro-crèche](https://www.facebook.com/profile.php?id=61588872606051) |
| **Instagram** | [@microcreche.theoetlea.nddl](https://www.instagram.com/microcreche.theoetlea.nddl/) |
| **Pré-inscription** | [via Meeko](https://theo-lea.meeko.site/iframe/registration/one) |

---

## 📁 Structure du projet

```text
www-theo-lea-fr/
├── index.html
├── styles.css
├── sitemap.xml
├── assets/
│   ├── logo.svg
│   ├── logo.png
│   ├── logo-hd.png
│   ├── pissenlit-logo.png
│   ├── enfants.png
│   ├── favicon.ico
│   ├── favicon-180.png
│   ├── meeko-favicon.png
│   ├── espace-salle-jeux.jpg
│   ├── espace-coin-repas.jpg
│   ├── espace-repos.jpg
│   ├── espace-exterieur.jpg
│   ├── espace-lecture-calme.jpg
│   └── espace-activite-manuelle.jpg
├── README.md
└── ROADMAP.md
```

### 📊 Métriques actuelles

| Métrique | Valeur |
|----------|--------|
| Lignes HTML | 438 |
| Lignes CSS | 915 |
| Lignes XML | 45 |
| Dépendances build | 0 |
| JavaScript applicatif | 0 (hors script inline pour l’année du footer) |

---

## 🚀 Démarrage local

Aucune installation requise :

```bash
# Ouvrir directement
open index.html

# Ou lancer un serveur statique local
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

---

## 🧩 Fonctionnement

- Le contenu est géré dans `index.html`.
- Le design est géré dans `styles.css` (variables CSS dans `:root`).
- Le site fonctionne sans étape de build.
- Déploiement compatible GitHub Pages / Netlify / Vercel / Cloudflare Pages.

### 🖼️ Crédits photos (section « Notre futur espace »)

Les 6 photos ajoutées dans `assets/` proviennent de **Pexels** (licence gratuite d’utilisation, y compris usage commercial) :

- https://www.pexels.com/photo/3661356/
- https://www.pexels.com/photo/3184189/
- https://www.pexels.com/photo/10149159/
- https://www.pexels.com/photo/1619313/
- https://www.pexels.com/photo/256403/
- https://www.pexels.com/photo/1108100/

---

## 🗺️ Roadmap

Consulter `ROADMAP.md` pour le plan d’action priorisé (P0/P1/P2).

---

## 📜 Licence

© Théo & Léa — Tous droits réservés. Contenu personnel, non réutilisable sans autorisation.

---

*Dernière mise à jour : 17 mai 2026 — documentation réalignée après l’ajout d’Open Graph, schema.org, `sitemap.xml` et des horaires d’ouverture.*
