/* =========================================================
   Dépannage Plomberie 80 — générateur de pages statiques
   Usage : node build.mjs
   Sortie : HTML pur (aucune dépendance, aucun runtime de build).
   Éditer le CONTENU ici, puis régénérer. Ne pas éditer les .html à la main.
   ========================================================= */
import { writeFileSync } from "node:fs";

const SITE = "Dépannage Plomberie 80";
const DOMAIN = "https://www.depannage-plomberie-80.fr";
const TEL_DISPLAY = "06 19 72 90 80";
const TEL_HREF = "tel:+33619729080";
const YEAR = "2026";
// STAGING=true → site hébergé sur un sous-domaine de test (ex. *.actiofin.com) :
// NON indexé (meta noindex + robots Disallow). Passer à false pour la mise en prod
// sur le domaine définitif, puis régénérer (node build.mjs).
const STAGING = true;
const ROBOTS = STAGING ? "noindex, nofollow" : "index, follow";

const PHONE_SVG =
  '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"/></svg>';

// Jeu d'icônes métier sur-mesure (line icons 24×24, couleur héritée via currentColor).
const ICONS = {
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  waves: '<path d="M2 6c.6.5 1.4 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 1.1 0 1.9-.5 2.5-1"/><path d="M2 12c.6.5 1.4 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 1.1 0 1.9-.5 2.5-1"/><path d="M2 18c.6.5 1.4 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 1.1 0 1.9-.5 2.5-1"/>',
  bath: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M5 12V7a2 2 0 0 1 4 0"/><path d="M7 19l-1 2M17 19l1 2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  snow: '<path d="M12 3v18M5.2 7.5l13.6 9M18.8 7.5l-13.6 9"/><path d="M12 6l2.3-1.3M12 6 9.7 4.7M12 18l2.3 1.3M12 18l-2.3 1.3M5.4 10.4l-.2-2.6 2.6.2M18.6 10.4l.2-2.6-2.6.2M5.4 13.6l-.2 2.6 2.6-.2M18.6 13.6l.2 2.6-2.6-.2"/>',
  bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5z"/><path d="m9 12 2 2 4-4"/>',
  pin: '<path d="M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"/>',
};
const icon = (name) =>
  '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  (ICONS[name] || ICONS.wrench) +
  "</svg>";

const NAV = [
  ["Accueil", "index.html"],
  ["Services", "services.html"],
  ["Urgence", "urgence.html"],
  ["Zones", "zones.html"],
  ["FAQ", "faq.html"],
  ["Contact", "contact.html"],
];

/* ---------- JSON-LD ---------- */
const PLUMBER = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: SITE,
  legalName: "Imad Hemani",
  image: DOMAIN + "/assets/og-cover.jpg",
  url: DOMAIN + "/",
  telephone: "+33-6-19-72-90-80",
  priceRange: "€€",
  identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: "79353940400020" },
  description:
    "Plombier chauffagiste à Amiens et dans la Somme. Dépannage en urgence 7j/7, recherche de fuite, débouchage de canalisation, installation sanitaire, chauffage et climatisation.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amiens",
    postalCode: "80000",
    addressRegion: "Hauts-de-France",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Amiens" },
    { "@type": "AdministrativeArea", name: "Somme (80)" },
  ],
  geo: { "@type": "GeoCoordinates", latitude: 49.8941, longitude: 2.2958 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  makesOffer: [
    "Dépannage plomberie en urgence",
    "Recherche de fuite",
    "Débouchage de canalisation",
    "Installation sanitaire",
    "Chauffage",
    "Climatisation",
  ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
};

const FAQ_ITEMS = [
  ["Intervenez-vous en urgence le week-end et la nuit ?", "Oui. Nous assurons un service de dépannage plomberie 7j/7, y compris les soirs et week-ends, pour les fuites d'eau, dégâts des eaux et canalisations bouchées dans Amiens et la Somme."],
  ["Le devis est-il gratuit ?", "Oui, l'établissement du devis est gratuit et sans engagement. Nous vous communiquons le prix avant toute intervention."],
  ["Quelles zones couvrez-vous dans la Somme ?", "Nous intervenons à Amiens et dans tout le département de la Somme (80) : Abbeville, Albert, Doullens, Corbie, Péronne, Montdidier, Roye, ainsi que les communes alentours."],
  ["En combien de temps pouvez-vous intervenir ?", "Pour une urgence dans le secteur d'Amiens, nous nous efforçons d'intervenir dans l'heure. Le délai dépend de votre localisation et de la nature du dépannage."],
  ["Combien coûte un dépannage plomberie ?", "Le tarif dépend de la nature de l'intervention (recherche de fuite, débouchage, remplacement de pièce, dépannage chauffage). Nous établissons systématiquement un devis gratuit et détaillé, validé avec vous avant de commencer les travaux."],
  ["Que faire en attendant le plombier en cas de fuite d'eau ?", "Coupez l'arrivée d'eau au robinet général et, si la fuite est proche d'une prise ou d'un tableau électrique, coupez l'électricité de la zone concernée. Épongez l'eau, dégagez l'accès, puis appelez-nous : nous vous guidons par téléphone jusqu'à notre arrivée."],
];
const FAQPAGE = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
const breadcrumb = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: DOMAIN + "/" + path,
  })),
});

/* ---------- Shell ---------- */
const ld = (obj) => '<script type="application/ld+json">' + JSON.stringify(obj) + "</script>";

function head({ title, desc, path, jsonld = [] }) {
  const url = DOMAIN + "/" + (path === "index.html" ? "" : path);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0a3d62" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta name="robots" content="${ROBOTS}" />
  <meta name="author" content="${SITE}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="${SITE}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${DOMAIN}/assets/og-cover.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${DOMAIN}/assets/og-cover.jpg" />
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="apple-touch-icon" href="assets/logo-mark.svg" />
  <link rel="manifest" href="site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  ${[PLUMBER, ...jsonld].map(ld).join("\n  ")}
</head>
<body>
  <a class="skip-link" href="#contenu">Aller au contenu</a>`;
}

function header(active) {
  const links = NAV.map(([label, href]) => {
    const cur = href === active ? ' aria-current="page"' : "";
    return `<li><a href="${href}"${cur}>${label}</a></li>`;
  }).join("\n          ");
  return `
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="${SITE}, accueil">
        <img src="assets/logo.svg" alt="${SITE}" width="200" height="46" />
      </a>
      <nav class="nav" aria-label="Navigation principale">
        <button class="nav-toggle" id="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-menu" id="nav-menu">
          ${links}
        </ul>
      </nav>
      <a href="${TEL_HREF}" class="btn btn-phone header-cta">
        ${PHONE_SVG}
        <span>${TEL_DISPLAY}</span>
      </a>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="assets/logo.svg" alt="${SITE}" width="200" height="46" />
        <p>Plombier chauffagiste à Amiens et dans la Somme. Dépannage en urgence, recherche de fuite, débouchage, sanitaire, chauffage et climatisation.</p>
      </div>
      <nav class="footer-col" aria-label="Liens services">
        <h3>Services</h3>
        <ul>
          <li><a href="services.html">Tous nos services</a></li>
          <li><a href="urgence.html">Dépannage en urgence</a></li>
          <li><a href="services.html">Recherche de fuite</a></li>
          <li><a href="services.html">Débouchage</a></li>
        </ul>
      </nav>
      <nav class="footer-col" aria-label="Liens secteur">
        <h3>Secteur</h3>
        <ul>
          <li><a href="zones.html">Zones d'intervention</a></li>
          <li><a href="zones.html">Amiens</a></li>
          <li><a href="zones.html">Abbeville</a></li>
          <li><a href="zones.html">Toute la Somme (80)</a></li>
        </ul>
      </nav>
      <div class="footer-col">
        <h3>Contact</h3>
        <ul>
          <li><a href="${TEL_HREF}">${TEL_DISPLAY}</a></li>
          <li><a href="contact.html">Demander un devis</a></li>
          <li>7j/7 · Amiens &amp; Somme</li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year">${YEAR}</span> ${SITE} — Tous droits réservés. · <a href="mentions-legales.html">Mentions légales</a></p>
      <p><a href="#top">Retour en haut ↑</a></p>
    </div>
  </footer>

  <a href="${TEL_HREF}" class="fab-call" aria-label="Appeler le plombier">
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"/></svg>
  </a>

  <script src="script.js" defer></script>
</body>
</html>`;
}

function pageHero(title, sub, trail) {
  const crumbs = trail
    .map(([label, href], i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${label}</li>`
        : `<li><a href="${href}">${label}</a></li>`
    )
    .join("");
  return `
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane"><ol>${crumbs}</ol></nav>
        <h1>${title}</h1>
        <p>${sub}</p>
      </div>
    </section>`;
}

const ctaBand = (h, p) => `
    <section class="section">
      <div class="container">
        <div class="cta-band">
          <h2>${h}</h2>
          <p>${p}</p>
          <div class="cta-actions">
            <a href="${TEL_HREF}" class="btn btn-accent btn-lg">${PHONE_SVG} Appeler le ${TEL_DISPLAY}</a>
            <a href="contact.html" class="btn btn-outline btn-lg">Demander un devis gratuit</a>
          </div>
        </div>
      </div>
    </section>`;

const page = (file, { title, desc, jsonld = [], active, body }) =>
  writeFileSync(
    new URL("./" + file, import.meta.url),
    head({ title, desc, path: file, jsonld }) + header(active) + '\n\n  <main id="contenu">' + body + "\n  </main>" + footer() + "\n",
    "utf8"
  );

/* ===================== PAGES ===================== */

/* ---- Services (réutilisé Accueil + Services) ---- */
const SERVICES = [
  ["wrench", "Dépannage en urgence", "Fuite d'eau, rupture de canalisation, dégât des eaux. On stoppe le problème et on répare durablement, 7j/7.", ["Fuite d'eau et dégât des eaux", "Canalisation percée ou gelée", "Robinet, chasse d'eau, siphon"]],
  ["drop", "Recherche de fuite", "Détection précise et non destructive pour localiser l'origine d'une fuite sans casse inutile.", ["Caméra d'inspection", "Gaz traceur et détection acoustique", "Localisation avant réparation"]],
  ["waves", "Débouchage de canalisation", "Évier, WC, douche, colonne : débouchage mécanique et hydrocurage des canalisations bouchées.", ["Furet et débouchage mécanique", "Hydrocurage haute pression", "Évacuations et colonnes"]],
  ["bath", "Sanitaire & salle de bain", "Installation et remplacement de WC, lavabo, douche, robinetterie, chauffe-eau et ballon.", ["WC, lavabo, douche, baignoire", "Robinetterie et mitigeurs", "Chauffe-eau et ballon"]],
  ["flame", "Chauffage", "Installation, entretien et dépannage de radiateurs, chaudières et planchers chauffants.", ["Radiateurs et chaudières", "Plancher chauffant", "Entretien et dépannage"]],
  ["snow", "Climatisation", "Pose et maintenance de climatiseurs pour un confort toute l'année, été comme hiver.", ["Pose de climatiseurs", "Entretien et recharge", "Confort été comme hiver"]],
];

const servicesCards = SERVICES.map(
  ([ico, t, p]) => `
          <article class="card">
            <div class="card-ico">${icon(ico)}</div>
            <h3>${t}</h3>
            <p>${p}</p>
          </article>`
).join("");

const engagements = `
        <div class="cards">
          <article class="card"><div class="card-ico">${icon("doc")}</div><h3>Devis gratuit, sans engagement</h3><p>Le prix est annoncé et validé avec vous avant toute intervention. Aucune surprise sur la facture.</p></article>
          <article class="card"><div class="card-ico">${icon("bolt")}</div><h3>Intervention rapide</h3><p>Fuite, dégât des eaux, panne de chauffage : les urgences sont traitées en priorité, 7j/7.</p></article>
          <article class="card"><div class="card-ico">${icon("shield")}</div><h3>Travail garanti</h3><p>Des réparations soignées et durables, réalisées dans les règles de l'art.</p></article>
          <article class="card"><div class="card-ico">${icon("pin")}</div><h3>Artisan local déclaré</h3><p>Entreprise immatriculée (SIRET 793 539 404 00020), basée dans la Somme, proche de chez vous.</p></article>
        </div>`;

const ZONES = ["Amiens","Abbeville","Albert","Doullens","Corbie","Péronne","Montdidier","Roye","Ham","Rue","Friville-Escarbotin","Flixecourt","Ailly-sur-Somme","Camon","Longueau","… et alentours"];

/* ===== ACCUEIL ===== */
page("index.html", {
  title: `${SITE} — Plombier en urgence à Amiens & dans la Somme`,
  desc: "Plombier chauffagiste à Amiens et dans toute la Somme (80). Dépannage en urgence 7j/7, recherche de fuite, débouchage, sanitaire, chauffage et climatisation. Devis gratuit, intervention rapide.",
  active: "index.html",
  body: `
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span class="pulse"></span> Disponible 7j/7 · Amiens &amp; Somme</p>
          <h1>Votre plombier en <span class="hl">urgence</span> à Amiens et dans la Somme</h1>
          <p class="lead">Fuite d'eau, canalisation bouchée, panne de chauffage&nbsp;? Un artisan qualifié intervient rapidement chez vous. Diagnostic clair, devis gratuit, travail soigné.</p>
          <div class="hero-actions">
            <a href="${TEL_HREF}" class="btn btn-accent btn-lg">${PHONE_SVG} Appeler maintenant</a>
            <a href="contact.html" class="btn btn-outline btn-lg">Demander un devis gratuit</a>
          </div>
          <ul class="hero-points"><li>Intervention rapide</li><li>Devis gratuit</li><li>Artisan local</li></ul>
        </div>
        <figure class="hero-media">
          <img src="assets/hero-plombier.jpg" alt="Réseau de tuyauterie d'eau et de gaz installé par un plombier chauffagiste" width="900" height="1030" loading="eager" fetchpriority="high" />
        </figure>
      </div>
    </section>

    <section class="trustbar" aria-label="Nos garanties">
      <div class="container trust-grid">
        <div class="trust-item"><span class="trust-ico">${icon("bolt")}</span><div><strong>Intervention rapide</strong><span>Urgences traitées en priorité</span></div></div>
        <div class="trust-item"><span class="trust-ico">${icon("calendar")}</span><div><strong>7j/7</strong><span>Soirs &amp; week-ends inclus</span></div></div>
        <div class="trust-item"><span class="trust-ico">${icon("doc")}</span><div><strong>Devis gratuit</strong><span>Prix annoncé avant travaux</span></div></div>
        <div class="trust-item"><span class="trust-ico">${icon("shield")}</span><div><strong>Travail garanti</strong><span>Pièces &amp; main d'œuvre</span></div></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-head">
          <p class="kicker">Nos prestations</p>
          <h2>Tous vos travaux de plomberie, du dépannage à l'installation</h2>
          <p class="section-sub">Une expertise complète pour les particuliers et les professionnels d'Amiens et de la Somme.</p>
        </header>
        <div class="cards">${servicesCards}
        </div>
        <p style="text-align:center;margin:34px 0 0"><a href="services.html" class="btn btn-primary">Voir le détail de nos services</a></p>
      </div>
    </section>

    <section id="atouts" class="section section-soft">
      <div class="container split">
        <figure class="split-media">
          <img src="assets/atouts-plombier.jpg" alt="Artisan équipé de gants de protection en intervention sur une installation technique" width="900" height="810" loading="lazy" />
        </figure>
        <div class="split-copy">
          <p class="kicker">Pourquoi nous choisir</p>
          <h2>Un artisan de confiance, proche de chez vous</h2>
          <ul class="checklist">
            <li><strong>Réactivité.</strong> Les urgences sont notre priorité : on vous rappelle vite et on intervient sans tarder.</li>
            <li><strong>Transparence.</strong> Devis détaillé et gratuit, tarifs clairs, aucune mauvaise surprise.</li>
            <li><strong>Savoir-faire.</strong> Des interventions propres et durables, dans les règles de l'art.</li>
            <li><strong>Proximité.</strong> Basés dans la Somme, nous connaissons le secteur et restons disponibles.</li>
          </ul>
          <a href="contact.html" class="btn btn-primary">Parler à un plombier</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-head"><p class="kicker">Nos engagements</p><h2>Pourquoi nous confier votre dépannage</h2></header>
        ${engagements}
        <p class="reviews-cta">Déjà dépanné par nos soins&nbsp;? <a href="#" data-review-link>Laissez un avis</a> pour aider d'autres habitants de la Somme.</p>
      </div>
    </section>

    <section class="stats" aria-label="Chiffres clés">
      <div class="container stats-grid">
        <div class="stat"><span class="stat-num">7j/7</span><span class="stat-lbl">Disponibilité</span></div>
        <div class="stat"><span class="stat-num">&lt; 1h</span><span class="stat-lbl">Délai urgence Amiens*</span></div>
        <div class="stat"><span class="stat-num">100%</span><span class="stat-lbl">Devis gratuits</span></div>
        <div class="stat"><span class="stat-num">80</span><span class="stat-lbl">Tout le département</span></div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <header class="section-head">
          <p class="kicker">En images</p>
          <h2>Plomberie, sanitaire &amp; chauffage</h2>
          <p class="section-sub">Du dépannage rapide à l'installation soignée, pour les particuliers et les professionnels.</p>
        </header>
        <div class="gallery">
          <figure class="gallery-item"><img src="assets/sanitaire.jpg" alt="Salle de bain moderne avec lavabo, baignoire et robinetterie" width="800" height="600" loading="lazy" /><figcaption>Sanitaire &amp; salle de bain</figcaption></figure>
          <figure class="gallery-item"><img src="assets/chauffage.jpg" alt="Radiateur de chauffage avec robinet thermostatique" width="800" height="600" loading="lazy" /><figcaption>Chauffage</figcaption></figure>
          <figure class="gallery-item"><img src="assets/atouts-plombier.jpg" alt="Artisan en intervention équipé de gants de protection" width="900" height="810" loading="lazy" /><figcaption>Dépannage &amp; intervention</figcaption></figure>
        </div>
      </div>
    </section>
${ctaBand("Une urgence plomberie&nbsp;? Ne laissez pas la situation empirer", "Appelez votre artisan plombier à Amiens et dans la Somme. Diagnostic clair et devis gratuit avant toute intervention.")}`,
});

/* ===== SERVICES ===== */
page("services.html", {
  title: `Nos services de plomberie — ${SITE} (Amiens & Somme)`,
  desc: "Dépannage, recherche de fuite, débouchage, sanitaire, chauffage et climatisation à Amiens et dans la Somme (80). Artisan plombier chauffagiste, devis gratuit.",
  active: "services.html",
  jsonld: [breadcrumb([["Accueil", "index.html"], ["Services", "services.html"]])],
  body:
    pageHero("Nos services de plomberie", "Du dépannage d'urgence à l'installation complète : un seul artisan pour toute votre plomberie, à Amiens et dans la Somme.", [["Accueil", "index.html"], ["Services", "services.html"]]) +
    `
    <section class="section">
      <div class="container narrow">
        <div class="svc-list">
          ${SERVICES.map(([ico, t, p, items]) => `<article class="svc"><div class="card-ico">${icon(ico)}</div><div><h3>${t}</h3><p>${p}</p><ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul></div></article>`).join("\n          ")}
        </div>
      </div>
    </section>
${ctaBand("Besoin d'un de ces services&nbsp;?", "Décrivez-nous votre besoin : nous vous rappelons vite et établissons un devis gratuit avant toute intervention.")}`,
});

/* ===== URGENCE ===== */
page("urgence.html", {
  title: `Dépannage plomberie en urgence à Amiens 7j/7 — ${SITE}`,
  desc: "Urgence plomberie à Amiens et dans la Somme : fuite d'eau, dégât des eaux, canalisation bouchée, panne de chauffage. Intervention rapide 7j/7. Appelez le 06 19 72 90 80.",
  active: "urgence.html",
  jsonld: [breadcrumb([["Accueil", "index.html"], ["Urgence", "urgence.html"]])],
  body:
    pageHero("Dépannage plomberie en urgence, 7j/7", "Une fuite qui s'aggrave, un dégât des eaux, plus de chauffage&nbsp;? On intervient vite à Amiens et dans toute la Somme.", [["Accueil", "index.html"], ["Urgence", "urgence.html"]]) +
    `
    <section class="section">
      <div class="container narrow">
        <div class="callout"><strong>Urgence en cours&nbsp;?</strong> Appelez directement le <a href="${TEL_HREF}">${TEL_DISPLAY}</a> — c'est le moyen le plus rapide d'être pris en charge.</div>
        <h2>Quand nous appeler en urgence</h2>
        <ul class="checklist">
          <li><strong>Fuite d'eau ou dégât des eaux.</strong> Eau qui coule d'un plafond, d'un mur, sous un évier ou un ballon.</li>
          <li><strong>Canalisation bouchée.</strong> WC, évier ou douche totalement obstrués, refoulement d'eau.</li>
          <li><strong>Rupture ou gel de canalisation.</strong> Tuyau percé, joint qui lâche, canalisation gelée en hiver.</li>
          <li><strong>Plus d'eau chaude ou de chauffage.</strong> Chauffe-eau ou chaudière en panne, radiateurs froids.</li>
        </ul>
        <h2>Que faire en attendant notre arrivée</h2>
        <ol class="steps">
          <li><span class="step-n">1</span><h3>Coupez l'eau</h3><p>Fermez le robinet d'arrêt général pour stopper l'écoulement.</p></li>
          <li><span class="step-n">2</span><h3>Sécurisez</h3><p>Si l'eau approche d'une prise ou d'un tableau, coupez l'électricité de la zone.</p></li>
          <li><span class="step-n">3</span><h3>Appelez-nous</h3><p>On vous guide par téléphone et on intervient dans les meilleurs délais.</p></li>
        </ol>
      </div>
    </section>

    <section class="stats" aria-label="Chiffres clés">
      <div class="container stats-grid">
        <div class="stat"><span class="stat-num">7j/7</span><span class="stat-lbl">Soirs &amp; week-ends</span></div>
        <div class="stat"><span class="stat-num">&lt; 1h</span><span class="stat-lbl">Délai urgence Amiens*</span></div>
        <div class="stat"><span class="stat-num">100%</span><span class="stat-lbl">Devis gratuits</span></div>
        <div class="stat"><span class="stat-num">80</span><span class="stat-lbl">Tout le département</span></div>
      </div>
    </section>
${ctaBand("Appelez votre plombier d'urgence", "Disponible 7j/7 à Amiens et dans la Somme. On évalue l'urgence et on vous oriente immédiatement.")}`,
});

/* ===== ZONES ===== */
page("zones.html", {
  title: `Zones d'intervention — Plombier à Amiens et dans la Somme (80)`,
  desc: "Dépannage plomberie de proximité à Amiens, Abbeville, Albert, Doullens, Corbie, Péronne et dans toute la Somme (80). Artisan plombier chauffagiste local.",
  active: "zones.html",
  jsonld: [breadcrumb([["Accueil", "index.html"], ["Zones", "zones.html"]])],
  body:
    pageHero("Présents à Amiens et dans toute la Somme", "Un dépannage plomberie de proximité, partout dans le département 80.", [["Accueil", "index.html"], ["Zones", "zones.html"]]) +
    `
    <section class="section">
      <div class="container">
        <ul class="zones-list">${ZONES.map((z) => `<li>${z}</li>`).join("")}</ul>
      </div>
    </section>

    <section class="section section-soft seo-local" aria-label="Plombier dans la Somme">
      <div class="container narrow">
        <h2>Un plombier de proximité dans la Somme</h2>
        <div class="seo-prose">
          <p>Basés dans la Somme, nous connaissons le terrain : les logements anciens du centre d'Amiens, les pavillons de la périphérie, les communes rurales du département. Cette proximité nous permet d'intervenir vite et de proposer des solutions adaptées à votre installation.</p>
          <p>Que vous soyez à Amiens, Abbeville, Albert, Doullens, Corbie, Péronne, Montdidier ou Roye, nous nous déplaçons pour vos dépannages d'urgence comme pour vos travaux d'installation. Votre commune n'apparaît pas dans la liste&nbsp;? Appelez-nous au <a href="${TEL_HREF}">${TEL_DISPLAY}</a>, nous couvrons l'ensemble du département.</p>
        </div>
      </div>
    </section>
${ctaBand("Un plombier près de chez vous", "Dites-nous où vous êtes : on vous confirme le délai d'intervention et on établit un devis gratuit.")}`,
});

/* ===== FAQ ===== */
page("faq.html", {
  title: `Questions fréquentes — ${SITE}`,
  desc: "Délais, tarifs, zones, urgences week-end : toutes les réponses sur nos dépannages plomberie à Amiens et dans la Somme.",
  active: "faq.html",
  jsonld: [FAQPAGE, breadcrumb([["Accueil", "index.html"], ["FAQ", "faq.html"]])],
  body:
    pageHero("Questions fréquentes", "Tout savoir sur nos dépannages plomberie à Amiens et dans la Somme.", [["Accueil", "index.html"], ["FAQ", "faq.html"]]) +
    `
    <section class="section">
      <div class="container narrow">
        <div class="faq">
          ${FAQ_ITEMS.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n          ")}
        </div>
      </div>
    </section>
${ctaBand("Une autre question&nbsp;?", "Appelez-nous : on répond directement et on vous établit un devis gratuit si besoin.")}`,
});

/* ===== CONTACT ===== */
page("contact.html", {
  title: `Contact & devis gratuit — ${SITE} (Amiens & Somme)`,
  desc: "Contactez votre plombier à Amiens et dans la Somme. Devis gratuit, intervention 7j/7. Appelez le 06 19 72 90 80 ou envoyez votre demande.",
  active: "contact.html",
  jsonld: [breadcrumb([["Accueil", "index.html"], ["Contact", "contact.html"]])],
  body:
    pageHero("Contactez-nous", "Une urgence ou un projet&nbsp;? Réponse rapide et devis gratuit. Pour une urgence, l'appel reste le plus rapide.", [["Accueil", "index.html"], ["Contact", "contact.html"]]) +
    `
    <section class="section">
      <div class="container contact-grid">
        <div class="contact-info">
          <h2>Joindre votre plombier</h2>
          <ul class="contact-list">
            <li><span class="ci-ico">${icon("phone")}</span><div><span class="ci-lbl">Téléphone</span><a href="${TEL_HREF}" class="ci-val">${TEL_DISPLAY}</a></div></li>
            <li><span class="ci-ico">${icon("pin")}</span><div><span class="ci-lbl">Secteur</span><span class="ci-val">Amiens &amp; toute la Somme (80)</span></div></li>
            <li><span class="ci-ico">${icon("clock")}</span><div><span class="ci-lbl">Horaires</span><span class="ci-val">7j/7 — urgences soirs &amp; week-ends</span></div></li>
          </ul>
          <a href="${TEL_HREF}" class="btn btn-accent btn-lg">${PHONE_SVG} Appeler le plombier</a>
        </div>
        <form class="contact-form" action="#" method="post" aria-label="Formulaire de demande de devis" onsubmit="return false;">
          <div class="field"><label for="nom">Nom</label><input id="nom" name="nom" type="text" autocomplete="name" required placeholder="Votre nom" /></div>
          <div class="field"><label for="tel">Téléphone</label><input id="tel" name="tel" type="tel" autocomplete="tel" required placeholder="06 00 00 00 00" /></div>
          <div class="field"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email" placeholder="vous@exemple.fr" /></div>
          <div class="field"><label for="message">Votre besoin</label><textarea id="message" name="message" rows="4" required placeholder="Décrivez votre problème (fuite, débouchage, chauffage…)"></textarea></div>
          <button type="submit" class="btn btn-primary btn-lg btn-block">Envoyer ma demande</button>
          <p class="form-note">En urgence, privilégiez l'appel téléphonique pour une prise en charge immédiate.</p>
        </form>
      </div>
    </section>`,
});

/* ===== MENTIONS LÉGALES ===== */
page("mentions-legales.html", {
  title: `Mentions légales — ${SITE}`,
  desc: "Mentions légales du site Dépannage Plomberie 80, plombier à Amiens et dans la Somme (80).",
  active: "",
  jsonld: [breadcrumb([["Accueil", "index.html"], ["Mentions légales", "mentions-legales.html"]])],
  body:
    pageHero("Mentions légales", "Conformément à l'article 6 III de la loi n° 2004-575 du 21 juin 2004 (LCEN).", [["Accueil", "index.html"], ["Mentions légales", "mentions-legales.html"]]) +
    `
    <section class="section">
      <div class="container legal">
        <h2 style="border-top:0;margin-top:0;padding-top:0">Éditeur du site</h2>
        <dl>
          <dt>Dénomination</dt><dd>Imad Hemani — entrepreneur individuel</dd>
          <dt>Nom commercial</dt><dd>${SITE}</dd>
          <dt>Activité</dt><dd>Travaux d'installation d'eau et de gaz (plomberie, sanitaire, chauffage, climatisation)</dd>
          <dt>Siège</dt><dd>4 rue Stendhal, 80080 Amiens, France</dd>
          <dt>SIREN</dt><dd>793 539 404</dd>
          <dt>SIRET (siège)</dt><dd>793 539 404 00020</dd>
          <dt>Code APE / NAF</dt><dd>43.22A</dd>
          <dt>Téléphone</dt><dd><a href="${TEL_HREF}">${TEL_DISPLAY}</a></dd>
          <dt>E-mail</dt><dd class="todo">à compléter</dd>
          <dt>TVA</dt><dd class="todo">à compléter — le cas échéant, mention « TVA non applicable, art. 293 B du CGI »</dd>
        </dl>
        <h2>Directeur de la publication</h2>
        <p>Monsieur Imad Hemani.</p>
        <h2>Hébergeur</h2>
        <p class="todo">À compléter : nom, raison sociale, adresse et téléphone de l'hébergeur du site.</p>
        <h2>Médiation de la consommation</h2>
        <p>Conformément aux articles L612-1 et suivants du Code de la consommation, le professionnel met à disposition de ses clients consommateurs un médiateur de la consommation en vue de la résolution amiable d'un éventuel litige.</p>
        <p class="todo">À compléter : nom et site internet du médiateur de la consommation auquel l'entreprise adhère.</p>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des éléments du présent site (textes, logos, images, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction, sans autorisation préalable de l'éditeur, est interdite.</p>
        <h2>Données personnelles</h2>
        <p>Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et ne sont ni cédées ni vendues. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression en contactant l'éditeur.</p>
        <h2>Cookies</h2>
        <p>Ce site ne dépose pas de cookie de suivi publicitaire. Les seules ressources externes chargées sont les polices de caractères (Google Fonts).</p>
        <p style="margin-top:2rem"><a href="index.html">← Retour à l'accueil</a></p>
      </div>
    </section>`,
});

/* ---------- Sitemap ---------- */
const PAGES = ["", "services.html", "urgence.html", "zones.html", "faq.html", "contact.html", "mentions-legales.html"];
const PRIORITY = { "": "1.0", "services.html": "0.8", "urgence.html": "0.8", "zones.html": "0.7", "faq.html": "0.6", "contact.html": "0.7", "mentions-legales.html": "0.2" };
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  PAGES.map(
    (p) =>
      `  <url>\n    <loc>${DOMAIN}/${p}</loc>\n    <lastmod>2026-06-08</lastmod>\n    <changefreq>${p === "mentions-legales.html" ? "yearly" : "monthly"}</changefreq>\n    <priority>${PRIORITY[p]}</priority>\n  </url>`
  ).join("\n") +
  "\n</urlset>\n";
writeFileSync(new URL("./sitemap.xml", import.meta.url), sitemap, "utf8");

/* ---------- robots.txt (selon STAGING) ---------- */
const robotsTxt = STAGING
  ? "# Sous-domaine de test — interdiction totale d'indexation\nUser-agent: *\nDisallow: /\n"
  : "User-agent: *\nAllow: /\n\nSitemap: " + DOMAIN + "/sitemap.xml\n";
writeFileSync(new URL("./robots.txt", import.meta.url), robotsTxt, "utf8");

console.log("Généré : " + PAGES.length + " pages + sitemap.xml + robots.txt (" + (STAGING ? "STAGING noindex" : "PROD indexable") + ")");
