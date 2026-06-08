# Dépannage Plomberie 80 — site vitrine

Site vitrine statique (HTML/CSS/JS, sans dépendance ni build) pour l'artisan
**Dépannage Plomberie 80** (plomberie · sanitaire · chauffage · climatisation),
secteur **Amiens & Somme (80)**.

Objectif : attirer une nouvelle clientèle locale et générer des demandes de
devis / appels (conversion orientée urgence).

## Structure (site multi-pages)

```
build.mjs           Générateur (Node, sans dépendance) — produit les .html ci-dessous
index.html          Accueil (hero, services, engagements, étapes, stats, CTA)
services.html       Détail des 6 services
urgence.html        Page urgence (conversion, 7j/7, que faire)
zones.html          Zones d'intervention + SEO local Somme
faq.html            FAQ (JSON-LD FAQPage)
contact.html        Contact + formulaire de devis
mentions-legales.html  Mentions légales (LCEN)
styles.css          Charte graphique mode jour (bleu/aqua + accent orange urgence)
script.js           Menu mobile + année dynamique
favicon.svg         Favicon (goutte d'eau + clé)
site.webmanifest    PWA / icône écran d'accueil
robots.txt          Indexation autorisée
sitemap.xml         Plan du site (généré)
assets/
  logo.svg / logo-mark.svg          Logos
  hero-plombier.jpg / atouts-plombier.jpg / og-cover.jpg   Photos locales
```

### Régénérer les pages

Le **contenu et le shell partagé** (header, footer, nav, JSON-LD) vivent dans
`build.mjs`. **Ne pas éditer les `.html` à la main** — modifier `build.mjs`
puis régénérer :

```
node build.mjs
```

Chaque page porte : `<title>`/meta uniques, canonical, Open Graph, JSON-LD
`Plumber` + `BreadcrumbList` (+ `FAQPage` sur la FAQ), nav avec état actif,
fil d'Ariane. La sortie reste du HTML pur, déployable sans étape de build.

## Données réelles (registre public INSEE/INPI)

Identité de l'annonceur vérifiée et intégrée (`index.html` + JSON-LD + `mentions-legales.html`) :

| Donnée            | Valeur                                  |
| ----------------- | --------------------------------------- |
| Exploitant        | Imad Hemani (entreprise individuelle)   |
| Nom commercial    | Dépannage Plomberie 80                  |
| Téléphone         | `06 19 72 90 80` / `tel:+33619729080` ✅ |
| SIRET / SIREN     | `79353940400020` / `793 539 404` ✅      |
| APE / NAF         | `43.22A` ✅                              |
| Siège             | 4 rue Stendhal, 80080 Amiens (en mentions légales uniquement — non affiché publiquement) ✅ |

## ⚠️ Reste à confirmer (données détenues par le gérant)

| Donnée            | État                                     |
| ----------------- | --------------------------------------- |
| E-mail            | placeholder `contact@depannage-plomberie-80.fr` (à remplacer) |
| Nom de domaine    | placeholder `www.depannage-plomberie-80.fr` (canonical/OG/sitemap) |
| Hébergeur         | « À compléter » dans `mentions-legales.html` (dépend de l'hébergement) |
| Médiateur conso   | « À compléter » dans `mentions-legales.html` (obligatoire) |
| Statut TVA        | « À compléter » (mention art. 293 B si micro) |
| Avis clients      | CTA Google à connecter (`data-review-link`) — aucun avis inventé |
| Horaires exacts   | actuellement « 7j/7 » (à ajuster)       |
| 2e numéro         | `07 44 41 59 53` trouvé, non affiché (à intégrer si souhaité) |

## Photos

Photos libres téléchargées en local dans `assets/` (licence Unsplash, usage
commercial gratuit sans attribution) : `hero-plombier.jpg` (réseau eau/gaz),
`atouts-plombier.jpg` (artisan en intervention), `og-cover.jpg` (1200×630, partage social).
Aucune dépendance CDN externe.

## SEO intégré

- `<title>` + meta description orientés « plombier Amiens / Somme / urgence »
- Open Graph + Twitter Card
- Données structurées JSON-LD : `Plumber` (LocalBusiness) + `FAQPage`
- `robots.txt` + `sitemap.xml` + canonical
- HTML sémantique, `lang="fr"`, hiérarchie de titres, attributs `alt`

## Aperçu local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```
npx serve .          # ou : python -m http.server 8080
```

## Déploiement staging

Site 100 % statique → déployable sur n'importe quel hébergement statique
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, ou un sous-dossier Coolify).
Aucune étape de build. Voir la conversation pour le choix de la cible staging.
