// Dépannage Plomberie 80 — interactions légères (vanilla, sans dépendance)
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  // ---- Menu mobile ----
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---- Année dynamique ----
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // ---- Formulaire de devis -> ouverture d'un e-mail pré-rempli ----
  // (site 100% statique, sans backend : on compose un mailto avec les champs)
  var form = document.getElementById("devis-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var email = form.getAttribute("data-email") || "";
      var nom = val("nom"), tel = val("tel"), mail = val("email"), msg = val("message");
      var subject = "Demande de devis" + (nom ? " - " + nom : "");
      var body =
        "Nom : " + nom + "\n" +
        "Telephone : " + tel + "\n" +
        "E-mail : " + mail + "\n\n" +
        "Demande :\n" + msg + "\n";
      var href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var status = document.getElementById("form-status");
      if (status) {
        status.textContent = "Votre messagerie va s'ouvrir avec votre demande. Si rien ne se passe, ecrivez-nous a " + email + ".";
      }
      window.location.href = href;
    });
  }

  // ---- Apparition au scroll ----
  // La classe .reveal n'est ajoutee QUE si IntersectionObserver existe :
  // sans JS / sans IO, le contenu reste visible (jamais masque).
  var reveals = document.querySelectorAll(
    ".section-head, .card, .svc, .gallery-item, .stat, .checklist li, .steps li"
  );
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
  }
})();
