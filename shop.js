(function(){
  "use strict";

  /* =====================================================================
   *  CONFIG — replace these two values before going live
   *  1. WEB3FORMS_KEY: create a free key at https://web3forms.com (tie it
   *     to the studio's email address; that's where enquiries are sent).
   *  2. STUDIO_EMAIL: shown to the visitor as a fallback contact.
   * ===================================================================== */
  var WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
  var STUDIO_EMAIL  = "hello@claudiupeta.com";

  var STORAGE_KEY = "cp_cart_v1";

  /* ---------- i18n helper ---------- */
  function t(key){ return (window.I18N && window.I18N.t(key)) || key; }

  /* ---------- Catalogue ---------- */
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
  var PRINT_SIZES = [
    { code:"A3", label:"A3 — 30 × 42 cm" },
    { code:"A2", label:"A2 — 42 × 59 cm" },
    { code:"A1", label:"A1 — 59 × 84 cm" }
  ];
  function sizeLabel(code){
    for(var i=0;i<PRINT_SIZES.length;i++){ if(PRINT_SIZES[i].code===code) return PRINT_SIZES[i].label; }
    return code;
  }
  function originalMeta(w){ return t("prod.medium") + (w.year ? " · " + w.year : ""); }

  /* ---------- Cart state ---------- */
  function loadCart(){
    try{ var raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
    catch(e){ return []; }
  }
  function saveCart(c){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); }catch(e){} }
  var cart = loadCart();

  function totalQty(){ return cart.reduce(function(n,i){ return n + i.qty; }, 0); }
  function addItem(item){
    var existing = null;
    for(var i=0;i<cart.length;i++){ if(cart[i].key === item.key){ existing = cart[i]; break; } }
    if(existing){ if(item.type === "print") existing.qty += 1; }
    else { cart.push(item); }
    saveCart(cart); syncAll();
  }
  function removeItem(key){ cart = cart.filter(function(i){ return i.key !== key; }); saveCart(cart); syncAll(); }
  function changeQty(key, delta){
    for(var i=0;i<cart.length;i++){
      if(cart[i].key === key){
        cart[i].qty += delta;
        if(cart[i].qty < 1){ removeItem(key); return; }
        break;
      }
    }
    saveCart(cart); syncAll();
  }
  function hasOriginal(id){ return cart.some(function(i){ return i.type==="original" && i.workId===id; }); }

  /* ---------- Count badge ---------- */
  function syncCount(){
    var n = totalQty();
    document.querySelectorAll(".cart-count").forEach(function(el){
      el.textContent = n;
      el.classList.toggle("show", n > 0);
    });
  }

  /* ---------- Product cards ---------- */
  var i18nUpdaters = [];
  function el(tag, cls, text){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text != null) e.textContent = text;
    return e;
  }

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
    var btn = el("button","btn", t("prod.add"));
    function refresh(){
      if(hasOriginal(w.id)){ btn.textContent = t("prod.inList"); btn.disabled = true; }
      else { btn.textContent = t("prod.add"); btn.disabled = false; }
    }
    btn.addEventListener("click", function(){
      addItem({ key:"o:"+w.id, type:"original", workId:w.id, title:w.title, src:w.src, year:w.year, qty:1 });
      flash(btn); refresh(); openDrawer();
    });
    btn.setAttribute("data-original", w.id);
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
    var price = el("div","product-price", t("prod.price"));
    body.appendChild(title); body.appendChild(meta); body.appendChild(price);
    var foot = el("div","product-foot");
    var sel = el("select","size-select");
    sel.setAttribute("aria-label", t("prod.sizeAria").replace("{title}", w.title));
    PRINT_SIZES.forEach(function(s){ var o = el("option", null, s.label); o.value = s.code; sel.appendChild(o); });
    var btn = el("button","btn ghost", t("prod.add"));
    btn.addEventListener("click", function(){
      var code = sel.value || PRINT_SIZES[0].code;
      addItem({ key:"p:"+w.id+":"+code, type:"print", workId:w.id, title:w.title, src:w.src, sizeCode:code, qty:1 });
      flash(btn); openDrawer();
    });
    foot.appendChild(sel); foot.appendChild(btn);
    body.appendChild(foot);
    card.appendChild(body);

    i18nUpdaters.push(function(){
      tag.textContent = t("prod.tag.print");
      meta.textContent = t("prod.printMedium");
      price.textContent = t("prod.price");
      sel.setAttribute("aria-label", t("prod.sizeAria").replace("{title}", w.title));
      if(!btn.classList.contains("added")) btn.textContent = t("prod.add");
    });
    return card;
  }

  function flash(btn){
    var added = t("prod.added");
    btn.classList.add("added");
    btn.textContent = added;
    setTimeout(function(){
      btn.classList.remove("added");
      if(!btn.disabled){
        btn.textContent = btn.getAttribute("data-original") ? t("prod.add") : t("prod.add");
      } else {
        btn.textContent = t("prod.inList");
      }
    }, 1100);
  }

  function renderCatalogue(){
    var oGrid = document.getElementById("originalsGrid");
    var pGrid = document.getElementById("printsGrid");
    if(oGrid){
      WORKS.forEach(function(w){ var c = buildOriginalCard(w); oGrid.appendChild(c); if(window.CPReveal) window.CPReveal(c); });
    }
    if(pGrid){
      WORKS.forEach(function(w){ var c = buildPrintCard(w); pGrid.appendChild(c); if(window.CPReveal) window.CPReveal(c); });
    }
  }

  /* ---------- Drawer ---------- */
  var drawer = document.getElementById("cartDrawer");
  var overlay = document.getElementById("cartOverlay");
  var itemsEl = document.getElementById("cartItems");
  var listView = document.getElementById("cartListView");
  var checkoutView = document.getElementById("checkoutView");
  var drawerTitle = document.getElementById("drawerTitle");

  function openDrawer(){
    if(!drawer){ window.location.href = "shop.html#cart"; return; }
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

  function lineMeta(item){
    return item.type === "original"
      ? t("prod.medium") + (item.year ? " · " + item.year : "")
      : t("prod.tag.print") + " · " + sizeLabel(item.sizeCode);
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
      info.appendChild(el("div","cart-line-meta", lineMeta(item)));
      var ctrl = el("div","cart-line-ctrl");
      if(item.type === "print"){
        var qty = el("div","qty");
        var minus = el("button",null,"−"); minus.setAttribute("aria-label", t("cart.qtyMinus"));
        var span = el("span",null,String(item.qty));
        var plus = el("button",null,"+"); plus.setAttribute("aria-label", t("cart.qtyPlus"));
        minus.addEventListener("click", function(){ changeQty(item.key,-1); });
        plus.addEventListener("click", function(){ changeQty(item.key, 1); });
        qty.appendChild(minus); qty.appendChild(span); qty.appendChild(plus);
        ctrl.appendChild(qty);
      }
      var rm = el("button","cart-remove", t("cart.remove"));
      rm.addEventListener("click", function(){ removeItem(item.key); });
      ctrl.appendChild(rm);
      info.appendChild(ctrl);
      line.appendChild(info);
      itemsEl.appendChild(line);
    });
  }

  function syncAll(){
    syncCount();
    renderDrawer();
    document.querySelectorAll("[data-original]").forEach(function(btn){
      var id = btn.getAttribute("data-original");
      if(btn.classList.contains("added")) return;
      if(hasOriginal(id)){ btn.textContent = t("prod.inList"); btn.disabled = true; }
      else if(btn.disabled){ btn.textContent = t("prod.add"); btn.disabled = false; }
    });
    if(!cart.length && checkoutView && checkoutView.classList.contains("active")) showListView();
  }

  /* ---------- Checkout submit (Web3Forms) ---------- */
  function composeOrder(){
    var lines = cart.map(function(i){
      var label = (i.type === "original" ? "ORIGINAL" : "PRINT");
      var sz = i.type === "print" ? (" — " + sizeLabel(i.sizeCode)) : (i.year ? " (" + i.year + ")" : "");
      var qty = i.type === "print" ? (" x" + i.qty) : "";
      return "- [" + label + "] " + i.title + sz + qty;
    });
    return "Enquiry — " + totalQty() + " item(s):\n\n" + lines.join("\n");
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

      var qty = totalQty();
      var payload = {
        access_key: WEB3FORMS_KEY,
        subject: "New shop enquiry — Claudiu Peta (" + qty + " item" + (qty>1?"s":"") + ")",
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
    if(drawerTitle){
      drawerTitle.textContent = (checkoutView && checkoutView.classList.contains("active"))
        ? t("cart.title.quote") : t("cart.title.list");
    }
  });

  /* ---------- Wire up ---------- */
  function wire(){
    document.querySelectorAll("#cartBtn, #cartBtnFooter").forEach(function(b){
      b.addEventListener("click", openDrawer);
    });
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

  if(window.location.hash === "#cart") setTimeout(openDrawer, 250);

})();
