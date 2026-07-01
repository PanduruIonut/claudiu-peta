/* features.js — additive rendering for Events, CV, and Contact/social blocks.
   Vanilla, defer-safe. Runs after i18n.js (needs window.I18N) and after the
   data files (window.CP_EVENTS, window.CP_CV) on the pages that load them.
   Every selector is guarded — these containers exist only on some pages.
   Re-renders on the 'cp:langchange' event. Does NOT touch app.js. */
(function(){
  "use strict";

  var I18N = window.I18N || null;

  function lang(){ return I18N ? I18N.lang : "en"; }
  function t(key){ return I18N ? I18N.t(key) : key; }

  // Pick the current-language string from a {en, ro} object (graceful fallback).
  function L(obj){
    if(obj == null) return "";
    if(typeof obj === "string") return obj;
    return obj[lang()] || obj.en || obj.ro || "";
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    if(text != null) n.textContent = text;
    return n;
  }

  function clear(node){ while(node.firstChild) node.removeChild(node.firstChild); }

  /* ---------- Events ---------- */
  function renderEvents(){
    var list = document.getElementById("events-list");
    if(!list) return;
    clear(list);

    var data = Array.isArray(window.CP_EVENTS) ? window.CP_EVENTS : [];
    var upcoming = data.filter(function(e){ return e && e.status === "upcoming"; });
    var past     = data.filter(function(e){ return e && e.status === "past"; });

    if(!upcoming.length && !past.length){
      list.appendChild(el("p", "events-empty", t("events.none")));
      return;
    }

    function group(title, items){
      var section = el("div", "events-group");
      section.appendChild(el("h3", "events-group-title", title));
      if(!items.length){
        section.appendChild(el("p", "events-empty", t("events.none")));
      } else {
        var ul = el("ul", "events-items");
        items.forEach(function(ev){
          var li = el("li", "event");
          var head = el("div", "event-head");
          var titleText = L(ev.title);
          if(ev.url){
            var a = el("a", "event-title", titleText);
            a.href = ev.url;
            a.target = "_blank";
            a.rel = "noopener";
            head.appendChild(a);
          } else {
            head.appendChild(el("span", "event-title", titleText));
          }
          var dt = L(ev.date);
          if(dt) head.appendChild(el("span", "event-date", dt));
          li.appendChild(head);

          var venue = L(ev.venue);
          if(venue) li.appendChild(el("p", "event-venue", venue));
          var note = L(ev.note);
          if(note) li.appendChild(el("p", "event-note", note));
          ul.appendChild(li);
        });
        section.appendChild(ul);
      }
      return section;
    }

    list.appendChild(group(t("events.upcoming"), upcoming));
    list.appendChild(group(t("events.past"), past));
  }

  /* ---------- CV ---------- */
  function renderCV(){
    var body = document.getElementById("cv-body");
    if(!body) return;
    clear(body);

    var cv = window.CP_CV || {};

    if(cv.updated){
      var meta = el("p", "cv-updated");
      meta.appendChild(el("span", "cv-updated-label", t("cv.updated") + ": "));
      meta.appendChild(document.createTextNode(cv.updated));
      body.appendChild(meta);
    }

    function plainSection(titleKey, items){
      if(!Array.isArray(items) || !items.length) return;
      var sec = el("section", "cv-section");
      sec.appendChild(el("h3", "cv-section-title", t(titleKey)));
      var ul = el("ul", "cv-list");
      items.forEach(function(it){
        ul.appendChild(el("li", "cv-item", L(it)));
      });
      sec.appendChild(ul);
      body.appendChild(sec);
    }

    function datedSection(titleKey, items){
      if(!Array.isArray(items) || !items.length) return;
      var sec = el("section", "cv-section");
      sec.appendChild(el("h3", "cv-section-title", t(titleKey)));
      var ul = el("ul", "cv-list cv-list-dated");
      items.forEach(function(it){
        var li = el("li", "cv-item cv-item-dated");
        if(it && it.year) li.appendChild(el("span", "cv-year", it.year));
        li.appendChild(el("span", "cv-text", L(it && it.text)));
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      body.appendChild(sec);
    }

    plainSection("cv.education", cv.education);
    datedSection("cv.exhibitions", cv.exhibitions);
    datedSection("cv.projects", cv.projects);
    datedSection("cv.grants", cv.grants);
    plainSection("cv.commissions", cv.commissions);
  }

  /* ---------- Contact / social ---------- */
  function buildContacts(container, cfg){
    clear(container);
    var ul = el("ul", "contact-links");

    if(cfg.email){
      var liE = el("li", "contact-link contact-link-email");
      var aE = el("a", null, cfg.email);
      aE.href = "mailto:" + cfg.email;
      liE.appendChild(aE);
      ul.appendChild(liE);
    }

    if(cfg.phone){
      var liP = el("li", "contact-link contact-link-phone");
      var aP = el("a", null, cfg.phone);
      aP.href = "tel:" + String(cfg.phone).replace(/[^\d+]/g, "");
      liP.appendChild(aP);
      ul.appendChild(liP);
    }

    if(cfg.whatsapp && cfg.whatsapp.enabled && cfg.whatsapp.number){
      var digits = String(cfg.whatsapp.number).replace(/\D/g, "");
      if(digits){
        var liW = el("li", "contact-link contact-link-whatsapp");
        var aW = el("a", null, "WhatsApp");
        var url = "https://wa.me/" + digits;
        if(cfg.whatsapp.message){
          url += "?text=" + encodeURIComponent(cfg.whatsapp.message);
        }
        aW.href = url;
        aW.target = "_blank";
        aW.rel = "noopener";
        liW.appendChild(aW);
        ul.appendChild(liW);
      }
    }

    if(cfg.instagram){
      var liI = el("li", "contact-link contact-link-instagram");
      var aI = el("a", null, "Instagram");
      aI.href = cfg.instagram;
      aI.target = "_blank";
      aI.rel = "noopener";
      liI.appendChild(aI);
      ul.appendChild(liI);
    }

    if(cfg.facebook){
      var liF = el("li", "contact-link contact-link-facebook");
      var aF = el("a", null, "Facebook");
      aF.href = cfg.facebook;
      aF.target = "_blank";
      aF.rel = "noopener";
      liF.appendChild(aF);
      ul.appendChild(liF);
    }

    container.appendChild(ul);
  }

  function renderContacts(){
    var nodes = document.querySelectorAll("[data-contacts]");
    if(!nodes.length) return;
    var cfg = window.CP_CONFIG || {};
    nodes.forEach(function(n){ buildContacts(n, cfg); });
  }

  /* ---------- CV → PDF (print) ---------- */
  function wireCvDownload(){
    var btns = document.querySelectorAll("[data-cv-download]");
    btns.forEach(function(b){
      if(b.__cpWired) return;
      b.__cpWired = true;
      // If it's a real link to the PDF, let the browser open/download it.
      if(b.tagName === "A" && b.getAttribute("href")) return;
      b.addEventListener("click", function(e){
        e.preventDefault();
        window.print();
      });
    });
  }

  /* ---------- orchestrate ---------- */
  function renderAll(){
    renderEvents();
    renderCV();
    renderContacts();
  }

  function init(){
    renderAll();
    wireCvDownload();
    document.addEventListener("cp:langchange", renderAll);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
