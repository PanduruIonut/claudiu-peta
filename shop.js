(function(){
  "use strict";

  /* =====================================================================
   *  CONFIG — replace before going live
   *  1. WEB3FORMS_KEY: free key at https://web3forms.com, tied to the
   *     studio's inbox — this is where ORIGINAL-painting enquiries land.
   *  2. STUDIO_EMAIL: shown to the visitor as a fallback contact.
   *  3. PRINT_PRICE: fixed Snipcart price (RON) for every print — TODO real.
   *  Snipcart public API key lives in shop.html (#snipcart data-api-key).
   * ===================================================================== */
  var WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // TODO real Web3Forms key
  var STUDIO_EMAIL  = "contact@claudiupeta.ro";    // TODO real studio email
  var PRINT_PRICE   = "250.00";                    // TODO real print price (RON)

  var STORAGE_KEY = "cp_enquiry_v1";

  /* ---------- i18n helper ---------- */
  function t(key){ return (window.I18N && window.I18N.t(key)) || key; }

  /* ---------- Catalogue (16 works — shared with the portfolio) ---------- */
  var WORKS = [
    { id:"howl",        title:"The Howl",                          src:"uploads/489916025_1221463949985671_3031214626376531084_n.jpg" },
    { id:"glacial",     title:"Glacial Emotion",       year:2019,  src:"uploads/488933954_1221462866652446_1769582109575111419_n.jpg" },
    { id:"guardian",    title:"The Guardian",                      src:"uploads/489008531_1221463993319000_911687192828125055_n.jpg" },
    { id:"meditation",  title:"The Meditation",                    src:"uploads/489036346_1221463946652338_4836620163774395685_n.jpg" },
    { id:"darkmoon",    title:"The Dark Side of The Moon", year:2019, src:"uploads/489637181_1221463979985668_8672517752140816680_n.jpg" },
    { id:"breathing",   title:"The Breathing",         year:2019,  src:"uploads/489813172_1221462916652441_1054166871537871619_n.jpg" },
    { id:"exhale",      title:"The Exhale",            year:2019,  src:"uploads/489603746_1221462873319112_7167221441405655584_n.jpg" },
    { id:"darklight",   title:"Dark Light",            year:2019,  src:"uploads/490110622_1221463723319027_4314837407855216683_n.jpg" },
    { id:"spy",         title:"The Spy",               year:2019,  src:"uploads/490142212_1221462879985778_22541791813130917_n.jpg" },
    { id:"always",      title:"Always in my mind",     year:2023,  src:"uploads/489020128_1221184703346929_9024423350101927094_n.jpg" },
    { id:"frompain",    title:"When it comes from pain", year:2023, src:"uploads/489055588_1221184700013596_8704243040357316248_n.jpg" },
    { id:"willbeso",    title:"I think it will be so",  year:2023,  src:"uploads/489099170_1221184706680262_4945963792714248027_n.jpg" },
    { id:"donttell",    title:"Please, don't tell",    year:2023,  src:"uploads/489128685_1221184640013602_7577972868209388897_n.jpg" },
    { id:"songdepths",  title:"Song from the depths of the soul", year:2023, src:"uploads/489217602_1221184593346940_5535240052013245168_n.jpg" },
    { id:"dolor",       title:"Dolor",                 year:2023,  src:"uploads/489288843_1221458849986181_3146628413477019959_n.jpg" },
    { id:"morethan",    title:"More than perfect",     year:2023,  src:"uploads/489887650_1221184716680261_8634085307208487951_n.jpg" }
  ];

  // Print sizes — drive both the visible note and Snipcart's custom-field options.
  var PRINT_SIZE_CODES = ["A3", "A2", "A1"];

  function originalMeta(w){ return t("prod.medium") + (w.year ? " · " + w.year : ""); }

  /* ---------- DOM helper ---------- */
  function el(tag, cls, text){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text != null) e.textContent = text;
    return e;
  }

  /* =====================================================================
   *  PRINTS — buyable via Snipcart (fixed price, RON)
   * ===================================================================== */
  function buildPrintCard(w){
    var card = el("div","product");

    var media = el("div","product-media");
    var img = el("img"); img.src = w.src; img.alt = w.title + " — fine-art print";
    media.appendChild(img);
    var tag = el("span","product-tag", t("prod.tag.print"));
    media.appendChild(tag);
    media.addEventListener("click", function(){ if(window.CPViewImage) window.CPViewImage(w.src, w.title); });
    card.appendChild(media);

    var body = el("div","product-body");
    var title = el("div","product-title", w.title);
    var meta = el("div","product-meta", t("prod.printMedium"));
    var price = el("div","product-price", PRINT_PRICE.split(".")[0] + " RON · A3–A1"); // TODO real price
    body.appendChild(title); body.appendChild(meta); body.appendChild(price);

    var foot = el("div","product-foot");
    // Snipcart add-to-cart button — Size handled by Snipcart's custom field.
    var btn = el("button","snipcart-add-item btn", t("shop.addCart"));
    btn.type = "button";
    btn.setAttribute("data-item-id", "print-" + w.id);
    btn.setAttribute("data-item-name", w.title + " — Print"); // language-stable for Snipcart
    btn.setAttribute("data-item-price", PRINT_PRICE);          // TODO real price (RON)
    btn.setAttribute("data-item-url", "/shop.html");
    btn.setAttribute("data-item-image", w.src);
    btn.setAttribute("data-item-description", "Giclée fine-art print on archival paper, signed PETA.");
    btn.setAttribute("data-item-custom1-name", "Size");
    btn.setAttribute("data-item-custom1-options", PRINT_SIZE_CODES.join("|")); // A3|A2|A1
    foot.appendChild(btn);
    body.appendChild(foot);
    card.appendChild(body);

    i18nUpdaters.push(function(){
      tag.textContent = t("prod.tag.print");
      meta.textContent = t("prod.printMedium");
      price.textContent = PRINT_PRICE.split(".")[0] + " RON · A3–A1";
      btn.textContent = t("shop.addCart");
    });
    return card;
  }

  /* =====================================================================
   *  ORIGINALS — enquiry only (Web3Forms drawer, no payment)
   * ===================================================================== */
  var i18nUpdaters = [];

  function buildOriginalCard(w){
    var card = el("div","product");

    var media = el("div","product-media");
    var img = el("img"); img.src = w.src; img.alt = w.title + (w.year ? ", " + w.year : "");
    media.appendChild(img);
    var tag = el("span","product-tag", t("prod.tag.original"));
    media.appendChild(tag);
    media.addEventListener("click", function(){ if(window.CPViewImage) window.CPViewImage(w.src, w.title + (w.year?", "+w.year:"")); });
    card.appendChild(media);

    var body = el("div","product-body");
    var title = el("div","product-title", w.title);
    var meta = el("div","product-meta", originalMeta(w));
    var price = el("div","product-price", t("prod.price"));
    body.appendChild(title); body.appendChild(meta); body.appendChild(price);

    var foot = el("div","product-foot");
    var btn = el("button","btn ghost", t("shop.enquire"));
    btn.type = "button";
    btn.setAttribute("data-original", w.id);
    function refresh(){
      if(hasOriginal(w.id)){ btn.textContent = t("prod.inList"); btn.disabled = true; }
      else { btn.textContent = t("shop.enquire"); btn.disabled = false; }
    }
    btn.addEventListener("click", function(){
      addOriginal({ key:"o:"+w.id, workId:w.id, title:w.title, src:w.src, year:w.year });
      flash(btn); refresh(); openDrawer();
    });
    refresh();
    foot.appendChild(btn);
    body.appendChild(foot);
    card.appendChild(body);

    i18nUpdaters.push(function(){
      tag.textContent = t("prod.tag.original");
      meta.textContent = originalMeta(w);
      price.textContent = t("prod.price");
      if(!btn.classList.contains("added")) refresh();
    });
    return card;
  }

  function flash(btn){
    btn.classList.add("added");
    btn.textContent = t("prod.added");
    setTimeout(function(){
      btn.classList.remove("added");
      btn.textContent = btn.disabled ? t("prod.inList") : t("shop.enquire");
    }, 1100);
  }

  /* ---------- Enquiry state (originals) ---------- */
  function loadCart(){
    try{ var raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
    catch(e){ return []; }
  }
  function saveCart(c){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); }catch(e){} }
  var cart = loadCart();

  function hasOriginal(id){ return cart.some(function(i){ return i.workId === id; }); }
  function addOriginal(item){
    if(hasOriginal(item.workId)) return;
    cart.push(item); saveCart(cart); syncAll();
  }
  function removeItem(key){ cart = cart.filter(function(i){ return i.key !== key; }); saveCart(cart); syncAll(); }

  /* ---------- Render catalogue ---------- */
  function renderCatalogue(){
    var pGrid = document.getElementById("printsGrid");
    var oGrid = document.getElementById("originalsGrid");
    if(pGrid){
      WORKS.forEach(function(w){ var c = buildPrintCard(w); pGrid.appendChild(c); if(window.CPReveal) window.CPReveal(c); });
    }
    if(oGrid){
      WORKS.forEach(function(w){ var c = buildOriginalCard(w); oGrid.appendChild(c); if(window.CPReveal) window.CPReveal(c); });
    }
  }

  /* ---------- Enquiry drawer ---------- */
  var drawer = document.getElementById("cartDrawer");
  var overlay = document.getElementById("cartOverlay");
  var itemsEl = document.getElementById("cartItems");
  var listView = document.getElementById("cartListView");
  var checkoutView = document.getElementById("checkoutView");
  var drawerTitle = document.getElementById("drawerTitle");

  function openDrawer(){
    if(!drawer) return;
    showListView();
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("lb-locked");
  }
  function closeDrawer(){
    if(!drawer) return;
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("lb-locked");
  }
  function showListView(){
    if(!listView) return;
    listView.classList.remove("hidden");
    if(checkoutView) checkoutView.classList.remove("active");
    if(drawerTitle) drawerTitle.textContent = t("cart.title.list");
  }
  function showCheckout(){
    if(!cart.length) return;
    listView.classList.add("hidden");
    checkoutView.classList.add("active");
    drawerTitle.textContent = t("cart.title.quote");
  }

  function renderDrawer(){
    if(!itemsEl) return;
    itemsEl.innerHTML = "";
    var toCk = document.getElementById("toCheckout");
    if(!cart.length){
      itemsEl.appendChild(el("div","cart-empty", t("cart.empty")));
      if(toCk) toCk.disabled = true;
      return;
    }
    if(toCk) toCk.disabled = false;
    cart.forEach(function(item){
      var line = el("div","cart-line");
      var img = el("img"); img.src = item.src; img.alt = item.title; line.appendChild(img);
      var info = el("div","cart-line-info");
      info.appendChild(el("div","cart-line-title", item.title));
      info.appendChild(el("div","cart-line-meta", t("prod.tag.original") + (item.year ? " · " + item.year : "")));
      var ctrl = el("div","cart-line-ctrl");
      var rm = el("button","cart-remove", t("cart.remove"));
      rm.addEventListener("click", function(){ removeItem(item.key); });
      ctrl.appendChild(rm);
      info.appendChild(ctrl);
      line.appendChild(info);
      itemsEl.appendChild(line);
    });
  }

  function syncAll(){
    renderDrawer();
    // Reflect enquiry count on the footer "Review my list" trigger (NOT .cart-count — that is Snipcart's).
    var footBtn = document.getElementById("cartBtnFooter");
    if(footBtn){
      var base = t("shop.cta.review");
      footBtn.textContent = cart.length ? base + " (" + cart.length + ")" : base;
    }
    document.querySelectorAll("[data-original]").forEach(function(btn){
      if(btn.classList.contains("added")) return;
      var id = btn.getAttribute("data-original");
      if(hasOriginal(id)){ btn.textContent = t("prod.inList"); btn.disabled = true; }
      else if(btn.disabled){ btn.textContent = t("shop.enquire"); btn.disabled = false; }
    });
    if(!cart.length && checkoutView && checkoutView.classList.contains("active")) showListView();
  }

  /* ---------- Checkout submit (Web3Forms) ---------- */
  function composeOrder(){
    var lines = cart.map(function(i){
      return "- [ORIGINAL] " + i.title + (i.year ? " (" + i.year + ")" : "");
    });
    return "Enquiry — " + cart.length + " original(s):\n\n" + lines.join("\n");
  }

  function initCheckout(){
    var form = document.getElementById("enquiryForm");
    var statusEl = document.getElementById("formStatus");
    var sendBtn = document.getElementById("sendEnquiry");
    if(!form) return;

    form.addEventListener("submit", function(e){
      e.preventDefault();
      statusEl.className = "form-status";
      statusEl.textContent = "";

      if(form.botcheck && form.botcheck.value){ return; }
      if(!cart.length){ statusEl.classList.add("err"); statusEl.textContent = t("form.errEmpty"); return; }

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      if(!name || !email){ statusEl.classList.add("err"); statusEl.textContent = t("form.errFields"); return; }

      if(WEB3FORMS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY"){
        statusEl.classList.add("err");
        statusEl.innerHTML = t("form.errNotConfigured").replace("{email}",
          "<a href='mailto:" + STUDIO_EMAIL + "' style='border-bottom:1px solid currentColor'>" + STUDIO_EMAIL + "</a>");
        return;
      }

      var qty = cart.length;
      var payload = {
        access_key: WEB3FORMS_KEY,
        subject: "New original-painting enquiry — Claudiu Peta (" + qty + " item" + (qty>1?"s":"") + ")",
        from_name: name,
        name: name,
        email: email,
        phone: form.phone.value.trim(),
        message: composeOrder() + (form.note.value.trim() ? "\n\nMessage:\n" + form.note.value.trim() : "")
      };

      sendBtn.disabled = true;
      sendBtn.textContent = t("form.sending");
      statusEl.textContent = t("form.sendingMsg");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(data.success){
          cart = []; saveCart(cart); syncAll();
          form.reset();
          statusEl.classList.add("ok");
          statusEl.textContent = t("form.success");
          sendBtn.textContent = t("form.sent");
        } else { throw new Error(data.message || "failed"); }
      })
      .catch(function(){
        statusEl.classList.add("err");
        statusEl.innerHTML = t("form.errGeneric").replace("{email}",
          "<a href='mailto:" + STUDIO_EMAIL + "' style='border-bottom:1px solid currentColor'>" + STUDIO_EMAIL + "</a>");
        sendBtn.disabled = false;
        sendBtn.textContent = t("form.send");
      });
    });
  }

  /* ---------- Language change ---------- */
  document.addEventListener("cp:langchange", function(){
    i18nUpdaters.forEach(function(fn){ fn(); });
    renderDrawer();
    syncAll();
    if(drawerTitle){
      drawerTitle.textContent = (checkoutView && checkoutView.classList.contains("active"))
        ? t("cart.title.quote") : t("cart.title.list");
    }
  });

  /* ---------- Wire up ---------- */
  function wire(){
    var footBtn = document.getElementById("cartBtnFooter");
    if(footBtn) footBtn.addEventListener("click", openDrawer);
    var close = document.getElementById("cartClose");
    if(close) close.addEventListener("click", closeDrawer);
    if(overlay) overlay.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && drawer && drawer.classList.contains("open")) closeDrawer();
    });
    var toCheckout = document.getElementById("toCheckout");
    if(toCheckout) toCheckout.addEventListener("click", showCheckout);
    var back = document.getElementById("backToList");
    if(back) back.addEventListener("click", showListView);
    initCheckout();
  }

  renderCatalogue();
  wire();
  syncAll();

  if(window.location.hash === "#enquiry") setTimeout(openDrawer, 250);

})();
