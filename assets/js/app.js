(function () {
  var SITE = window.SITE, PROJECTS = window.PROJECTS, CATEGORIES = window.CATEGORIES;
  var app = document.getElementById("app");
  var THEMES = [
    { id: "forest", name: "Forest", swatch: "linear-gradient(135deg,#f3f4ef 50%,#2d5a39 50%)" },
    { id: "xenon", name: "Xenon", swatch: "linear-gradient(135deg,#f3f5f7 50%,#4a52d9 50%)" },
    { id: "plume", name: "Plume", swatch: "linear-gradient(135deg,#0c1220 50%,#a3adff 50%)" },
    { id: "blueprint", name: "Blueprint", swatch: "linear-gradient(135deg,#163a66 50%,#ffd166 50%)" }
  ];
  var flow = null, revealObs = null, homeScroll = 0, activeFilter = "all";

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  var icon = {
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'
  };

  function cover(p) {
    if (p.cover.wordmark) return '<div class="cover-word">' + esc(p.cover.wordmark) + "</div>";
    if (p.cover.logo) return '<div class="cover-logo"><img src="' + esc(p.cover.logo) + '-sm.webp" alt="" loading="lazy" decoding="async">' + (p.cover.label ? "<span>" + esc(p.cover.label) + "</span>" : "") + "</div>";
    return '<img src="' + esc(p.cover.src) + '-sm.webp" alt="" loading="lazy" decoding="async" style="object-position:' + esc(p.cover.pos || "50% 50%") + '">';
  }

  /* ---------- theme ---------- */
  function applyTheme(id) {
    if (!THEMES.some(function (t) { return t.id === id; })) id = THEMES[0].id;
    document.documentElement.setAttribute("data-scheme", id);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--bg").trim());
    document.querySelectorAll(".theme-picker button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.theme === id ? "true" : "false");
    });
    if (flow) flow.refresh();
  }
  function initTheme() {
    var fromUrl = new URLSearchParams(location.search).get("theme");
    var chosen = SITE.showThemePicker ? (fromUrl || store("theme") || SITE.theme) : (fromUrl || SITE.theme);
    applyTheme(chosen);
    if (!SITE.showThemePicker) return;
    var el = document.createElement("div");
    el.className = "theme-picker";
    el.setAttribute("role", "group");
    el.setAttribute("aria-label", "Color scheme");
    el.innerHTML = '<span>Scheme</span>' + THEMES.map(function (t) {
      return '<button type="button" data-theme="' + t.id + '" title="' + t.name + '" aria-label="' + t.name + ' color scheme"><span style="background:' + t.swatch + '"></span></button>';
    }).join("");
    el.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      store("theme", b.dataset.theme); applyTheme(b.dataset.theme);
    });
    document.body.appendChild(el);
    applyTheme(document.documentElement.getAttribute("data-scheme"));
  }

  /* ---------- reveal on scroll ---------- */
  function observeReveals() {
    if (revealObs) revealObs.disconnect();
    var els = app.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) {
      // Anything already on screen shows immediately; only content below the fold animates in.
      if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add("in");
      else revealObs.observe(e);
    });
  }

  /* ---------- home ---------- */
  function cardHTML(p, i) {
    return '<a class="card reveal" style="--d:' + (i % 3) * 90 + 'ms" href="#project-' + esc(p.slug) + '" data-cat="' + esc(p.category) + '">' +
      '<div class="thumb' + (p.blurb ? " flip" : "") + '"><div class="face front">' + cover(p) + "</div>" +
        (p.blurb ? '<div class="face back"><p>' + esc(p.blurb) + '</p><span class="more">View project<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></span></div>' : "") +
      "</div>" +
      "<h3>" + esc(p.shortTitle || p.title) + "</h3>" +
      '<p class="meta"><span>' + esc(p.role) + "</span><span>" + esc(p.dates) + "</span></p>" +
      "</a>";
  }

  function renderHome() {
    var cats = CATEGORIES.filter(function (c) { return PROJECTS.some(function (p) { return p.category === c.id; }); });
    var c = SITE.contact;
    app.innerHTML =
      '<section class="hero" aria-label="Introduction">' +
        '<canvas aria-hidden="true"></canvas>' +
        '<div class="wrap hero-in">' +
          "<h1>" + esc(SITE.name) + "</h1>" +
          '<p class="lede"><span class="bg-text">' + esc(SITE.headline) + "</span></p>" +
          '<p class="intro"><span class="bg-text">' + esc(SITE.intro) + "</span></p>" +
          '<div class="cta"><a class="btn" href="#work">See my work</a><a class="btn ghost" href="' + esc(c.resume) + '" download>' + icon.download + "Download resume</a></div>" +
          '<dl class="facts">' + SITE.facts.map(function (f) { return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>"; }).join("") + "</dl>" +
        "</div>" +
        '<p class="flow-note">Flow past a cylinder. Move your cursor to steer it.</p>' +
      "</section>" +

      '<section class="block" id="work" aria-labelledby="work-h">' +
        '<div class="wrap">' +
          '<div class="section-head reveal"><div><h2 id="work-h">Projects and teams</h2><p>Click any project for the technical details, photos, and videos.</p></div>' +
            '<div class="filters" role="group" aria-label="Filter projects">' +
              '<button type="button" data-f="all" aria-pressed="true">All</button>' +
              cats.map(function (k) { return '<button type="button" data-f="' + esc(k.id) + '" aria-pressed="false">' + esc(k.label) + "</button>"; }).join("") +
            "</div></div>" +
          '<div class="grid">' + PROJECTS.map(cardHTML).join("") + "</div>" +
        "</div>" +
      "</section>" +

      '<section class="block" id="awards" aria-labelledby="awards-h" style="padding-top:24px">' +
        '<div class="wrap"><div class="section-head reveal"><h2 id="awards-h">Awards</h2></div>' +
          '<ul class="awards reveal">' + SITE.awards.map(function (a) {
            return "<li><strong>" + esc(a.title) + "</strong><span>" + esc(a.detail) + "</span><time>" + esc(a.date) + "</time></li>";
          }).join("") + "</ul></div>" +
      "</section>" +

      '<section class="block" id="about" aria-labelledby="about-h">' +
        '<div class="wrap about">' +
          '<img class="reveal" src="assets/img/headshot.webp" alt="Dean Puckett" loading="lazy" width="900" height="1350">' +
          '<div class="text reveal" style="--d:100ms"><div class="section-head" style="margin-bottom:20px"><h2 id="about-h">About me</h2></div>' +
            SITE.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
            '<div class="skills">' + SITE.skills.map(function (g) {
              return "<div><h3>" + esc(g.group) + '</h3><ul class="tags">' + g.items.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
            }).join("") + "</div>" +
          "</div>" +
        "</div>" +
      "</section>" +

      '<section class="block contact" id="contact" aria-labelledby="contact-h">' +
        '<div class="wrap reveal">' +
          '<div class="section-head" style="margin-bottom:20px"><div><h2 id="contact-h">Get in touch</h2><p>' + esc(SITE.contactLine) + '</p></div></div>' +
          '<a class="big" href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" +
          (c.phone ? '<p class="phone"><a href="tel:' + esc(c.phone.replace(/[^\d+]/g, "")) + '">' + esc(c.phone) + "</a></p>" : "") +
          '<div class="contact-row">' +
            c.links.map(function (l) { return '<a class="btn ghost" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>"; }).join("") +
            '<a class="btn" href="' + esc(c.resume) + '" download>' + icon.download + "Resume (PDF)</a>" +
          "</div>" +
        "</div>" +
      "</section>";

    // filters
    var grid = app.querySelector(".grid");
    app.querySelector(".filters").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      activeFilter = b.dataset.f; setFilter();
    });
    function setFilter() {
      app.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.f === activeFilter ? "true" : "false"); });
      var n = 0;
      grid.querySelectorAll(".card").forEach(function (card) {
        var show = activeFilter === "all" || card.dataset.cat === activeFilter;
        card.classList.toggle("hidden", !show);
        if (show) { card.style.setProperty("--d", (n++ % 3) * 70 + "ms"); card.classList.remove("in"); void card.offsetWidth; card.classList.add("in"); }
      });
    }
    if (activeFilter !== "all") setFilter();

    if (flow) flow.stop();
    flow = window.startFlow ? window.startFlow(app.querySelector(".hero canvas")) : null;
    observeReveals();
  }

  /* ---------- project ---------- */
  function renderProject(slug) {
    var i = PROJECTS.findIndex(function (p) { return p.slug === slug; });
    if (i < 0) { location.hash = "#work"; return; }
    var p = PROJECTS[i];
    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
    if (flow) { flow.stop(); flow = null; }

    var spec = [["Role", p.role], ["Dates", p.dates], ["Location", p.location], ["Type", p.type]].filter(function (r) { return r[1]; });
    var allMedia = [];
    function galleryHTML(list) {
      return (list || []).map(function (m) {
      var k = allMedia.push(m) - 1;
      var cls = m.wide ? ' class="wide"' : "";
      if (m.type === "video") {
        return "<figure" + cls + '><video controls playsinline preload="none" poster="' + esc(m.poster || "") + '"><source src="' + esc(m.src) + '" type="video/mp4"></video><figcaption>' + esc(m.caption) + "</figcaption></figure>";
      }
      return "<figure" + cls + '><button type="button" class="media" data-k="' + k + '" aria-label="Enlarge image: ' + esc(m.caption) + '"><img src="' + esc(m.src) + (m.wide ? ".webp" : "-sm.webp") + '" alt="' + esc(m.caption) + '" loading="lazy" decoding="async"></button><figcaption>' + esc(m.caption) + "</figcaption></figure>";
      }).join("");
    }
    var gallery = galleryHTML(p.media);
    var extra = (p.galleries || []).map(function (g) {
      var items = galleryHTML(g.media);
      return items ? '<section class="gallery" aria-label="' + esc(g.title) + '"><h2>' + esc(g.title) + "</h2>" + (g.text ? '<p class="gallery-text">' + esc(g.text) + "</p>" : "") + '<div class="gallery-grid even">' + items + "</div></section>" : "";
    }).join("");

    app.innerHTML =
      '<article class="project view-enter"><div class="wrap">' +
        '<a class="back" href="#work">' + icon.back + "All projects</a>" +
        '<header class="project-head">' +
          '<p class="org">' + esc(p.org) + "</p>" +
          "<h1>" + esc(p.title) + "</h1>" +
        "</header>" +
        '<dl class="spec">' + spec.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>" +
        '<ul class="tags">' + p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        '<div class="project-body">' +
          '<div class="copy">' +
            "<h2>The project</h2><p>" + esc(p.summary) + "</p>" +
            (p.did && p.did.length ? "<h2>What I did</h2><ul>" + p.did.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" : "") +
            (p.outcome ? "<h2>Outcome</h2><p>" + esc(p.outcome) + "</p>" : "") +
            (p.learned ? "<h2>What I learned</h2><p>" + esc(p.learned) + "</p>" : "") +
          "</div>" +
          ((p.keyFigure || (p.docs && p.docs.length)) ? '<aside class="aside">' +
            (p.keyFigure ? '<div class="figure-box"><strong>' + esc(p.keyFigure.value) + "</strong><span>" + esc(p.keyFigure.label) + "</span></div>" : "") +
            (p.docs || []).map(function (d) { return '<a class="doc-link" href="' + esc(d.href) + '" target="_blank" rel="noopener">' + esc(d.label) + icon.doc + "</a>"; }).join("") +
          "</aside>" : "") +
        "</div>" +
        extra +
        (gallery ? '<section class="gallery" aria-label="Photos and videos"><h2>Photos and videos</h2><div class="gallery-grid">' + gallery + "</div></section>" : "") +
        '<nav class="pager" aria-label="More projects">' +
          '<a href="#project-' + esc(prev.slug) + '"><small>Previous</small><strong>' + esc(prev.shortTitle || prev.title) + "</strong></a>" +
          '<a href="#project-' + esc(next.slug) + '"><small>Next</small><strong>' + esc(next.shortTitle || next.title) + "</strong></a>" +
        "</nav>" +
      "</div></article>";

    document.title = p.title + " | " + SITE.name;
    app.querySelectorAll(".gallery .media").forEach(function (b) {
      b.addEventListener("click", function () { openLightbox(allMedia[+b.dataset.k], b); });
    });
    window.scrollTo(0, 0);
  }

  /* ---------- lightbox ---------- */
  var lb, lbImg, lbCap, lbReturn;
  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Enlarged image");
    lb.innerHTML = '<button type="button" aria-label="Close">&times;</button><div><img alt=""><p></p></div>';
    lbImg = lb.querySelector("img"); lbCap = lb.querySelector("p");
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest("button")) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox(); });
    document.body.appendChild(lb);
  }
  function openLightbox(m, from) {
    lbReturn = from; lbImg.src = m.src + ".webp"; lbImg.alt = m.caption; lbCap.textContent = m.caption;
    lb.classList.add("open"); lb.querySelector("button").focus();
  }
  function closeLightbox() { lb.classList.remove("open"); if (lbReturn) lbReturn.focus(); }

  /* ---------- router ---------- */
  var current = null;
  function route() {
    var h = location.hash;
    var m = h.match(/^#project-([\w-]+)$/);
    if (m) {
      if (current === "home") homeScroll = window.scrollY;
      current = "project"; renderProject(m[1]);
      return;
    }
    document.title = SITE.name + " | Mechanical Engineering Portfolio";
    var from = current;
    if (current !== "home") { current = "home"; renderHome(); }
    var id = h.replace("#", "");
    var target = id && document.getElementById(id);
    if (target) {
      requestAnimationFrame(function () { target.scrollIntoView(); });
    } else if (!id) {
      window.scrollTo(0, from === "project" ? homeScroll : 0);
    }
  }

  /* ---------- nav ---------- */
  function initNav() {
    var nav = document.querySelector(".nav"), bar = document.querySelector(".progress");
    function onScroll() {
      var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle("scrolled", y > 8);
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    document.querySelectorAll("[data-resume]").forEach(function (a) { a.href = SITE.contact.resume; });
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  initTheme();
  buildLightbox();
  initNav();
  window.addEventListener("hashchange", route);
  route();
})();
