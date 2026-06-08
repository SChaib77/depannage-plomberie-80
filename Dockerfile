# Site statique Dépannage Plomberie 80 — image nginx autonome (Coolify-ready)
# Build : docker build -t plomberie80 .   |   Run : docker run -p 8080:80 plomberie80
FROM nginx:1.27-alpine

# Config nginx (sécurité + cache + try_files)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fichiers du site (le .dockerignore exclut build.mjs, Dockerfile, README, .git, etc.)
COPY . /usr/share/nginx/html
# nginx.conf est requis dans le contexte (COPY ci-dessus) mais ne doit pas etre servi
RUN rm -f /usr/share/nginx/html/nginx.conf

EXPOSE 80
# Pas de HEALTHCHECK baké : pour un site 100% statique, nginx running = sain.
# (Coolify peut configurer un healthcheck HTTP côté UI si souhaité.)
