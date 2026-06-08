# Dépannage Plomberie 80 — site vitrine

Site vitrine statique (HTML/CSS/JS, sans dépendance ni build) pour l'artisan
**Dépannage Plomberie 80** (plomberie · sanitaire · chauffage · climatisation),
secteur **Amiens & Somme (80)**.

Objectif : attirer une nouvelle clientèle locale et générer des demandes de
devis / appels (conversion orientée urgence).

## Structure

```
index.html          Page unique (hero, services, atouts, zones, FAQ, contact)
styles.css          Charte graphique mode jour (bleu/aqua + accent orange urgence)
script.js           Menu mobile + année dynamique
favicon.svg         Favicon (goutte d'eau + clé)
site.webmanifest    PWA / icône écran d'accueil
robots.txt          Indexation autorisée
sitemap.xml         Plan du site
assets/
  logo.svg          Logo complet (mark + wordmark)
  logo-mark.svg     Logo icône seule
```

## ⚠️ À CONFIRMER avant mise en production (placeholders)

Ces valeurs sont des **placeholders** : impossible de les récupérer depuis la
fiche PagesJaunes (page protégée). À remplacer partout (`index.html` + JSON-LD) :

| Donnée            | Placeholder actuel                      |
| ----------------- | --------------------------------------- |
| Téléphone         | `03 22 00 00 00` / `tel:+33322000000`   |
| E-mail            | `contact@depannage-plomberie-80.fr`     |
| Adresse / SIRET   | « À compléter » dans le JSON-LD         |
| Nom de domaine    | `www.depannage-plomberie-80.fr`         |
| Avis clients      | section « Avis » = exemples à remplacer par de vrais avis Google/PagesJaunes |
| Horaires exacts   | actuellement « 7j/7 » (à ajuster)       |

Recherche/remplacement rapide : chercher `+33322000000`, `03 22 00 00 00`,
`depannage-plomberie-80.fr`.

## Photos

Photos libres via le CDN Unsplash (licence gratuite, hotlink autorisé). Pour la
prod, il est recommandé de les **télécharger** dans `assets/` et de les servir
en local (perf + indépendance). Pensez aussi à générer `assets/og-cover.jpg`
(1200×630) pour le partage sur les réseaux sociaux.

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
