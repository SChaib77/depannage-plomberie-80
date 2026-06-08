# Déploiement staging (Coolify — app statique séparée)

Le site est un conteneur **nginx autonome** (`Dockerfile` + `nginx.conf`). Il se
déploie comme **application Coolify indépendante** — **jamais** via le dépôt ou la
branche d'un autre projet.

## Prérequis (à fournir)

1. **Source git accessible par Coolify** : ce dossier poussé sur un dépôt
   (GitHub/GitLab) que l'instance Coolify peut lire. Le dépôt local n'a pas
   encore de remote.
2. **Accès Coolify** : soit la création manuelle dans l'UI, soit un token API +
   l'UUID du serveur/projet cible.
3. **Domaine temporaire** : sous-domaine à attribuer (ex. `plomberie80.<domaine-coolify>`)
   ou domaine auto-généré par Coolify.

## Procédure Coolify (UI — ~5 étapes)

1. **New Resource → Application**.
2. Source = le dépôt git (branche `master`).
3. Build Pack = **Dockerfile** (détecté automatiquement).
4. **Domains** : renseigner le domaine temporaire, laisser Coolify émettre le
   certificat Let's Encrypt.
5. **Deploy**. Healthcheck `GET /` intégré au conteneur.

## Vérification post-déploiement

- `GET /` → 200, page d'accueil
- `GET /services.html`, `/urgence.html`, `/zones.html`, `/faq.html`, `/contact.html` → 200
- `GET /mentions-legales.html` → 200
- `GET /sitemap.xml` → 200
- Tester un lien `tel:` et la navigation mobile (menu burger)

## Aperçu local (sans Coolify)

```
docker build -t plomberie80 . && docker run --rm -p 8080:80 plomberie80
# puis http://localhost:8080
```

Ou sans Docker : `npx serve .` (ou `python -m http.server 8080`).
