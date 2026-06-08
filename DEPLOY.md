# Déploiement staging (Coolify — app statique séparée)

Le site est un conteneur **nginx autonome** (`Dockerfile` + `nginx.conf`). Il se
déploie comme **application Coolify indépendante** — **jamais** via le dépôt ou la
branche d'un autre projet.

## Mode retenu : upload direct + création dans l'UI Coolify

Paquet à uploader : **`plomberie80-site.zip`** (généré à la racine — régénérable
via `tar -a -c -f plomberie80-site.zip --exclude=.git .`). Il contient tous les
fichiers statiques + `Dockerfile` + `nginx.conf` (le `.dockerignore` exclut les
fichiers de dev de l'image finale).

À préparer côté Coolify :

- **Domaine temporaire** : sous-domaine à attribuer (ex. `plomberie80.<domaine-coolify>`)
  ou domaine auto-généré par Coolify.

## Procédure Coolify (UI)

1. **New Resource → Application** (sur le projet/serveur de votre choix —
   app **indépendante**, ne pas la rattacher au projet ActioFin).
2. **Source** : upload direct du contenu de `plomberie80-site.zip` comme
   contexte de build (ou extraire le zip dans le dossier source que Coolify
   utilise).
3. **Build Pack = Dockerfile** (le `Dockerfile` à la racine est détecté).
4. **Domains** : renseigner le domaine temporaire, laisser Coolify émettre le
   certificat Let's Encrypt.
5. **Deploy**. Healthcheck `GET /` intégré au conteneur (port 80).

> Si votre version de Coolify ne propose pas d'upload de contexte sans git, la
> voie de repli la plus simple reste un petit dépôt git privé pointé par Coolify
> (même contenu). Le reste de la procédure est identique.

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
