(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Page-load fade-in ---------- */
  window.addEventListener('load', function(){ document.body.classList.add('loaded'); });
  setTimeout(function(){ document.body.classList.add('loaded'); }, 1200);

  /* ---------- Image protection (deterrent only) ----------
     Blocks right-click "Save image as", drag-to-save and the mobile
     long-press menu on images. Delegated, so it also covers images
     added later by the shop and the lightbox. Note: this cannot stop
     screenshots, DevTools, or the network tab. */
  document.addEventListener('contextmenu', function(e){
    if(e.target && e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', function(e){
    if(e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  /* ---------- Track header height (mobile dropdown anchor) ---------- */
  (function(){
    var header = document.querySelector('.site-header');
    if(!header) return;
    function setH(){ document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px'); }
    setH();
    window.addEventListener('resize', setH, {passive:true});
    window.addEventListener('orientationchange', setH);
    if(window.ResizeObserver){ new ResizeObserver(setH).observe(header); }
  })();

  /* ---------- Mobile nav toggle ---------- */
  (function(){
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('primaryNav');
    if(!toggle || !nav) return;
    function closeNav(){
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });
  })();

  /* ---------- Performance: lazy-load + async decode (all but hero) ---------- */
  document.querySelectorAll('img').forEach(function(img){
    if(img.classList.contains('kenburns')) return; // hero stays eager
    if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
    img.setAttribute('decoding','async');
  });

  /* ---------- Gallery: wrap in zoom container + collect for lightbox ---------- */
  var gallery = [];
  var selector = '.masonry .item img, .murals-grid figure img, .resto-grid figure img, .resto-feature img';
  document.querySelectorAll(selector).forEach(function(img){
    var wrap = document.createElement('div');
    wrap.className = 'media-zoom';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
    var fig = img.closest('figure');
    var cap = fig ? fig.querySelector('figcaption') : null;
    var caption = cap ? cap.textContent.trim() : (img.getAttribute('alt') || '');
    var index = gallery.length;
    gallery.push({ src: img.getAttribute('src'), caption: caption });
    wrap.addEventListener('click', function(){ openLightbox(index); });
    wrap.setAttribute('role','button');
    wrap.setAttribute('tabindex','0');
    wrap.setAttribute('aria-label','View ' + (caption || 'artwork') + ' larger');
    wrap.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openLightbox(index); }
    });
  });

  /* ---------- Lightbox ---------- */
  var lb, lbImg, lbCap, lbCount, current = -1;
  (function buildLightbox(){
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role','dialog');
    lb.setAttribute('aria-modal','true');
    lb.setAttribute('aria-label','Artwork viewer');
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<div class="lb-count"></div>' +
      '<button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>' +
      '<div class="lb-stage"><img alt=""><div class="lb-caption"></div></div>' +
      '<button class="lb-btn lb-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('img');
    lbCap = lb.querySelector('.lb-caption');
    lbCount = lb.querySelector('.lb-count');
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-prev').addEventListener('click', function(e){ e.stopPropagation(); step(-1); });
    lb.querySelector('.lb-next').addEventListener('click', function(e){ e.stopPropagation(); step(1); });
    lb.addEventListener('click', function(e){ if(e.target === lb) closeLightbox(); });
  })();

  function renderLightbox(i){
    current = (i + gallery.length) % gallery.length;
    var item = gallery[current];
    lb.classList.remove('shown');
    var tmp = new Image();
    tmp.onload = function(){
      lbImg.src = item.src;
      lbImg.alt = item.caption;
      lbCap.textContent = item.caption;
      lbCount.textContent = (current + 1) + ' / ' + gallery.length;
      requestAnimationFrame(function(){ lb.classList.add('shown'); });
    };
    tmp.src = item.src;
    [current+1, current-1].forEach(function(n){
      var g = gallery[(n + gallery.length) % gallery.length];
      if(g){ var p = new Image(); p.src = g.src; }
    });
  }
  // Exposed so other scripts (e.g. shop) can open the shared viewer with an ad-hoc image
  function openLightbox(i){
    document.body.classList.add('lb-locked');
    lb.classList.add('open');
    renderLightbox(i);
  }
  window.CPViewImage = function(src, caption){
    gallery.push({ src: src, caption: caption || '' });
    openLightbox(gallery.length - 1);
  };
  function closeLightbox(){
    lb.classList.remove('open');
    lb.classList.remove('shown');
    document.body.classList.remove('lb-locked');
    current = -1;
  }
  function step(dir){ if(current > -1) renderLightbox(current + dir); }

  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    else if(e.key === 'ArrowRight') step(1);
    else if(e.key === 'ArrowLeft') step(-1);
  });
  (function(){
    var x0 = null;
    lb.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, {passive:true});
    lb.addEventListener('touchend', function(e){
      if(x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if(Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      x0 = null;
    }, {passive:true});
  })();

  /* ---------- Scroll reveal ---------- */
  var revealTargets = [];
  function addReveal(el, delayClass){ if(el){ el.classList.add('reveal'); if(delayClass) el.classList.add(delayClass); revealTargets.push(el); } }

  // Homepage targets (no-ops if absent)
  addReveal(document.querySelector('.intro p'));
  document.querySelectorAll('.sec-head').forEach(function(el){ addReveal(el); });
  document.querySelectorAll('.masonry .item').forEach(function(el,i){ addReveal(el, ['d1','d2','d3'][i%3]); });
  document.querySelectorAll('.murals-grid figure').forEach(function(el,i){ addReveal(el, ['d1','d2'][i%2]); });
  addReveal(document.querySelector('.resto-feature'));
  document.querySelectorAll('.resto-grid figure').forEach(function(el,i){ addReveal(el, ['d1','d2'][i%2]); });
  addReveal(document.querySelector('.about-inner img'));
  addReveal(document.querySelector('.about-inner > div'), 'd1');
  addReveal(document.querySelector('.exhibited-content'));
  addReveal(document.querySelector('.contact-inner'));

  // Generic opt-in for any page (e.g. shop)
  var ro = null;
  if(!reduce && ('IntersectionObserver' in window)){
    ro = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  }
  function registerReveal(el){
    if(!el) return;
    if(reduce || !ro){ el.classList.add('in'); return; }
    ro.observe(el);
  }
  document.querySelectorAll('[data-reveal]').forEach(function(el){ addReveal(el, el.getAttribute('data-reveal') || ''); });

  revealTargets.forEach(registerReveal);
  // Let dynamically-added elements opt in later
  window.CPReveal = function(el, delayClass){ if(el){ el.classList.add('reveal'); if(delayClass) el.classList.add(delayClass); registerReveal(el); } };

  /* ---------- Hero parallax ---------- */
  (function(){
    if(reduce) return;
    var heroMedia = document.querySelector('.hero-media');
    var hero = document.querySelector('.hero');
    if(!heroMedia || !hero) return;
    var ticking = false;
    function update(){
      var rect = hero.getBoundingClientRect();
      if(rect.bottom > 0 && rect.top < window.innerHeight){
        var offset = Math.max(0, -rect.top) * 0.22;
        heroMedia.style.transform = 'translateY(' + offset + 'px)';
      }
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }, {passive:true});
    update();
  })();

  /* ---------- Nav active-state on scroll (homepage anchors) ---------- */
  (function(){
    if(!('IntersectionObserver' in window)) return;
    var links = {};
    document.querySelectorAll('.nav a').forEach(function(a){
      var id = a.getAttribute('href');
      if(id && id.charAt(0) === '#' && id.length > 1) links[id.slice(1)] = a;
    });
    var sections = ['paintings','murals','restoration','about','contact']
      .map(function(id){ return document.getElementById(id); })
      .filter(Boolean);
    if(!sections.length) return;
    var so = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          Object.keys(links).forEach(function(k){ links[k].classList.remove('active'); });
          var link = links[en.target.id];
          if(link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function(s){ so.observe(s); });
  })();

})();
