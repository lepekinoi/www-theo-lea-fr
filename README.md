# 🌿 Théo & Léa — www.theo-lea.fr

Site vitrine officiel de la micro-crèche **Théo & Léa** (Notre-Dame-des-Landes), avec ouverture prévue en **janvier 2027**.

## 🧭 État du projet (analyse rapide)

### Points forts
- Site **100% statique** (HTML/CSS), simple à maintenir et à déployer.
- Identité visuelle cohérente (palette, typographies, iconographie).
- Message métier clair (projet, engagements, valeurs, pré-inscription, contact).
- Base accessibilité déjà présente (sémantique, labels, focus, responsive).

### Points à renforcer
- Métadonnées sociales/SEO local encore incomplètes (Open Graph, schema.org, sitemap).
- Une partie du contenu visuel est encore en mode attente (galerie « photos à venir »).
- Dépendance externe pour l’icône Meeko dans le CTA de pré-inscription.
- Navigation mobile minimaliste (liens masqués sans menu hamburger accessible).

### Priorités d’actions proposées
1. **P0 — Visibilité & conversion** : Open Graph + SEO local + infos pratiques (horaires).
2. **P1 — Crédibilité du projet** : vraies photos (hero + galerie + espace).
3. **P1 — Robustesse front** : supprimer dépendances médias externes non nécessaires (Meeko favicon local).
4. **P2 — UX mobile** : menu hamburger accessible.
5. **P2 — Performance continue** : optimisation images + minification + suivi Lighthouse.

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
├── assets/
│   ├── logo.svg
│   ├── logo.png
│   ├── logo-hd.png
│   ├── pissenlit-logo.png
│   ├── enfants.png
│   ├── favicon.ico
│   └── favicon-180.png
├── README.md
└── ROADMAP.md
```

### 📊 Métriques actuelles

| Métrique | Valeur |
|----------|--------|
| Lignes HTML | 366 |
| Lignes CSS | 915 |
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

---

## 🗺️ Roadmap

Consulter `ROADMAP.md` pour le plan d’action priorisé (P0/P1/P2).

---

## 📜 Licence

© Théo & Léa — Tous droits réservés. Contenu personnel, non réutilisable sans autorisation.

---

*Dernière mise à jour : 17 mai 2026*
