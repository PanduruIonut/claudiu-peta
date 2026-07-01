(function(){
  "use strict";

  var DICT = {
    en: {
      "doc.title.home":"Claudiu Peta — Visual artist · Muralist · Restorer",
      "doc.title.shop":"Shop — Claudiu Peta",

      "role":"Visual artist",
      "nav.works":"Artworks",
      "nav.graphics":"Graphics",
      "nav.paintings":"Painting",
      "nav.murals":"Murals",
      "nav.restoration":"Restoration",
      "nav.about":"About",
      "nav.shop":"Shop",
      "nav.contact":"Contact",
      "cart.aria":"Open enquiry list",
      "cart.titleAttr":"Enquiry list",
      "lang.aria":"Language",

      "hero.h1":"Faces made of <em>sky.</em>",
      "hero.see":"See the paintings",
      "hero.shop":"Shop original works",
      "hero.commission":"Commission a work",

      "intro":"I sign my work <em>PETA</em>. I paint surreal portraits where clouds and weather become a human face — on canvas and across whole buildings — and I bring old paintings and painted furniture back to life.",

      "sec.graphics.h2":"Graphics",
      "sec.graphics.meta":"Drawings & works on paper",
      "sec.graphics.soon":"A selection of graphic works is coming soon.",
      "sec.paintings.h2":"Painting",
      "sec.paintings.meta":"Acrylic on canvas · the 2DARK & VERSUS series",
      "sec.murals.h2":"Murals & Wall Art",
      "sec.murals.meta":"Facades, interiors & site-specific work",
      "mural.strategy":"Strategy — apartment gable, exterior",
      "mural.velocity":"Velocity — workshop interior",
      "mural.music1":"Music & Play — school facade",
      "mural.dragon":"Cloud Dragon — facade, in progress",
      "mural.united":"United — courtyard mural",
      "mural.oldcity":"Old City — interior wall map",
      "mural.night":"Night work — facade in progress",
      "mural.music2":"Music & Play — completed",

      "sec.restoration.h2":"Restoration",
      "sec.restoration.meta":"Oil paintings · painted furniture · before & after",
      "resto.feature":"Every restoration begins with listening to the piece. This oil on canvas arrived with widespread flaking and losses; treatment meant many small repairs and consolidations, careful touch-up, and a fresh varnish — worked only as far as the painting needed, never further.",
      "resto.bench":"Painted folk bench — before & after",
      "resto.floral":"Folk floral panels — repainting by hand",

      "about.label":"About the Artist",
      "about.lead":"I work between three kinds of making: surreal portraits on canvas, large murals on walls and facades, and the quiet repair of old paintings and painted furniture.",
      "about.body":"Clouds and weather keep turning into faces in my work — a way of painting an inner life onto the sky. The same patience and respect for material that a mural needs is what an old, damaged canvas asks for too. I take a limited number of commissions and conservation projects so each can be given the time it deserves.",

      "exhibited.eyebrow":"In the room",
      "exhibited.h2":"Shown in galleries, painted in the open, kept in homes.",

      "contact.eyebrow":"Commissions · murals · restoration",
      "contact.h2":"Let's begin a piece.",
      "contact.p":"Tell me about your wall, the painting you'd like, or a piece that needs care. For restorations, a photograph or two helps me give an honest first impression.",
      "contact.email":"Email the studio",

      "footer.meta":"Visual artist · Muralist · Restorer · signed PETA",

      "shop.eyebrow":"The Shop",
      "shop.h1":"Take a piece of the <em>sky</em> home.",
      "shop.intro":"Original acrylic paintings from the 2DARK & VERSUS series — each one unique — and fine-art prints of the cloud-and-sky portraits. Every work is sold by enquiry: add the pieces you love to your list and send it through, and I'll reply personally with price, availability, shipping, and framing.",
      "shop.tab.originals":"Originals",
      "shop.tab.prints":"Prints",
      "shop.tab.commissions":"Commissions",
      "shop.sec.originals.h2":"Original Paintings",
      "shop.sec.originals.meta":"Acrylic on canvas · one of a kind · signed PETA",
      "shop.sec.prints.h2":"Fine-Art Prints",
      "shop.sec.prints.meta":"Giclée on archival paper · open edition · three sizes",
      "shop.cta.eyebrow":"Can't find it · want a commission",
      "shop.cta.h2":"Looking for something specific?",
      "shop.cta.p":"If a piece is already sold, I can often make a print of it, or paint something new for your space. Tell me what you have in mind.",
      "shop.cta.contact":"Contact the studio",
      "shop.cta.review":"Review my list",

      "cart.title.list":"Your enquiry list",
      "cart.title.quote":"Request a quote",
      "cart.close":"Close",
      "cart.note":"No payment is taken here. Send your list and I'll reply with price, availability and shipping for each piece.",
      "cart.requestQuote":"Request a quote",
      "cart.empty":"Your list is empty. Add originals or prints to enquire.",
      "cart.remove":"Remove",
      "cart.back":"← Back to list",
      "cart.qtyMinus":"Decrease quantity",
      "cart.qtyPlus":"Increase quantity",

      "form.name":"Your name *",
      "form.email":"Email *",
      "form.phone":"Phone / WhatsApp (optional)",
      "form.message":"Message (optional)",
      "form.placeholder":"Framing, shipping destination, questions…",
      "form.send":"Send enquiry",
      "form.sending":"Sending…",
      "form.sendingMsg":"Sending your enquiry…",
      "form.sent":"Sent ✓",
      "form.success":"Thank you — your enquiry is on its way. I'll reply personally, usually within a couple of days.",
      "form.errEmpty":"Your list is empty.",
      "form.errFields":"Please add your name and email.",
      "form.errNotConfigured":"Form not configured yet. Please email {email} with your list.",
      "form.errGeneric":"Something went wrong sending the form. Please email {email} with your list.",

      "prod.tag.original":"Original",
      "prod.tag.print":"Print",
      "prod.medium":"Acrylic on canvas",
      "prod.printMedium":"Giclée print · archival paper",
      "prod.price":"Price on request",
      "prod.add":"Add to enquiry",
      "prod.inList":"In your list",
      "prod.added":"Added ✓",
      "prod.sizeAria":"Print size for {title}",

      "nav.events":"Events",
      "nav.bio":"BIO",
      "events.eyebrow":"Exhibitions & events",
      "events.h2":"Events",
      "events.meta":"Exhibitions, fairs & live painting",
      "events.upcoming":"Upcoming",
      "events.past":"Past",
      "events.none":"Dates announced soon.",
      "bio.label":"BIO",
      "cv.heading":"Curriculum Vitae",
      "cv.download":"Download CV (PDF)",
      "cv.updated":"Updated",
      "cv.education":"Education",
      "cv.exhibitions":"Selected exhibitions",
      "cv.projects":"Selected projects",
      "cv.grants":"Grants",
      "cv.commissions":"Selected commissions",
      "cv.full":"The full CV, with press and complete project list, is in the PDF.",
      "contact.commission":"Commission via message or email",
      "contact.phone":"Call",
      "shop.addCart":"Add to cart",
      "shop.enquire":"Enquire",
      "shop.originalNote":"Originals are sold by enquiry"
    },

    ro: {
      "doc.title.home":"Claudiu Peta — Artist vizual · Muralist · Restaurator",
      "doc.title.shop":"Magazin — Claudiu Peta",

      "role":"Artist vizual",
      "nav.works":"Lucrări",
      "nav.graphics":"Grafică",
      "nav.paintings":"Pictură",
      "nav.murals":"Murale",
      "nav.restoration":"Restaurare",
      "nav.about":"Despre",
      "nav.shop":"Magazin",
      "nav.contact":"Contact",
      "cart.aria":"Deschide lista de solicitări",
      "cart.titleAttr":"Listă de solicitări",
      "lang.aria":"Limbă",

      "hero.h1":"Chipuri din <em>cer.</em>",
      "hero.see":"Vezi picturile",
      "hero.shop":"Cumpără lucrări originale",
      "hero.commission":"Comandă o lucrare",

      "intro":"Îmi semnez lucrările cu <em>PETA</em>. Pictez portrete suprarealiste în care norii și vremea devin un chip omenesc — pe pânză și pe clădiri întregi — și readuc la viață picturi vechi și mobilier pictat.",

      "sec.graphics.h2":"Grafică",
      "sec.graphics.meta":"Desene & lucrări pe hârtie",
      "sec.graphics.soon":"O selecție de lucrări de grafică va apărea în curând.",
      "sec.paintings.h2":"Pictură",
      "sec.paintings.meta":"Acrilic pe pânză · seriile 2DARK & VERSUS",
      "sec.murals.h2":"Murale & Artă Murală",
      "sec.murals.meta":"Fațade, interioare & lucrări in situ",
      "mural.strategy":"Strategie — fronton de bloc, exterior",
      "mural.velocity":"Viteză — interior de atelier",
      "mural.music1":"Muzică & Joacă — fațadă de școală",
      "mural.dragon":"Dragonul de nori — fațadă, în lucru",
      "mural.united":"Împreună — mural de curte",
      "mural.oldcity":"Orașul Vechi — hartă murală interioară",
      "mural.night":"Lucru de noapte — fațadă în lucru",
      "mural.music2":"Muzică & Joacă — finalizat",

      "sec.restoration.h2":"Restaurare",
      "sec.restoration.meta":"Picturi în ulei · mobilier pictat · înainte & după",
      "resto.feature":"Orice restaurare începe cu ascultarea lucrării. Această pictură în ulei pe pânză a ajuns cu desprinderi și pierderi extinse; tratamentul a însemnat multe mici reparații și consolidări, retuș atent și un vernis nou — lucrat doar atât cât avea nevoie pictura, niciodată mai mult.",
      "resto.bench":"Bancă populară pictată — înainte & după",
      "resto.floral":"Panouri florale populare — repictare manuală",

      "about.label":"Despre Artist",
      "about.lead":"Lucrez între trei feluri de a crea: portrete suprarealiste pe pânză, murale mari pe ziduri și fațade, și repararea tăcută a picturilor vechi și a mobilierului pictat.",
      "about.body":"Norii și vremea se transformă mereu în chipuri în lucrările mele — un fel de a picta o viață interioară pe cer. Aceeași răbdare și același respect pentru material de care are nevoie un mural le cere și o pânză veche, deteriorată. Accept un număr limitat de comenzi și proiecte de conservare, pentru ca fiecăreia să i se poată acorda timpul cuvenit.",

      "exhibited.eyebrow":"În sală",
      "exhibited.h2":"Expuse în galerii, pictate în aer liber, păstrate în case.",

      "contact.eyebrow":"Comenzi · murale · restaurare",
      "contact.h2":"Să începem o lucrare.",
      "contact.p":"Spune-mi despre zidul tău, despre pictura pe care ți-o dorești sau despre o lucrare care are nevoie de îngrijire. Pentru restaurări, una-două fotografii mă ajută să-ți ofer o primă impresie sinceră.",
      "contact.email":"Scrie atelierului",

      "footer.meta":"Artist vizual · Muralist · Restaurator · semnat PETA",

      "shop.eyebrow":"Magazinul",
      "shop.h1":"Ia o bucată de <em>cer</em> acasă.",
      "shop.intro":"Picturi originale în acrilic din seriile 2DARK & VERSUS — fiecare unică — și printuri de artă ale portretelor din nori și cer. Fiecare lucrare se vinde la cerere: adaugă piesele care îți plac în listă și trimite-o, iar eu îți voi răspunde personal cu preț, disponibilitate, livrare și înrămare.",
      "shop.tab.originals":"Originale",
      "shop.tab.prints":"Printuri",
      "shop.tab.commissions":"Comenzi",
      "shop.sec.originals.h2":"Picturi Originale",
      "shop.sec.originals.meta":"Acrilic pe pânză · piesă unică · semnat PETA",
      "shop.sec.prints.h2":"Printuri de Artă",
      "shop.sec.prints.meta":"Giclée pe hârtie de arhivă · ediție deschisă · trei dimensiuni",
      "shop.cta.eyebrow":"Nu găsești · vrei o comandă",
      "shop.cta.h2":"Cauți ceva anume?",
      "shop.cta.p":"Dacă o lucrare este deja vândută, pot adesea face un print după ea sau pot picta ceva nou pentru spațiul tău. Spune-mi ce ai în gând.",
      "shop.cta.contact":"Contactează atelierul",
      "shop.cta.review":"Vezi lista mea",

      "cart.title.list":"Lista ta de solicitări",
      "cart.title.quote":"Cere o ofertă",
      "cart.close":"Închide",
      "cart.note":"Nu se face nicio plată aici. Trimite-ți lista și îți voi răspunde cu preț, disponibilitate și livrare pentru fiecare piesă.",
      "cart.requestQuote":"Cere o ofertă",
      "cart.empty":"Lista ta este goală. Adaugă originale sau printuri pentru a întreba.",
      "cart.remove":"Elimină",
      "cart.back":"← Înapoi la listă",
      "cart.qtyMinus":"Scade cantitatea",
      "cart.qtyPlus":"Crește cantitatea",

      "form.name":"Numele tău *",
      "form.email":"Email *",
      "form.phone":"Telefon / WhatsApp (opțional)",
      "form.message":"Mesaj (opțional)",
      "form.placeholder":"Înrămare, destinație livrare, întrebări…",
      "form.send":"Trimite solicitarea",
      "form.sending":"Se trimite…",
      "form.sendingMsg":"Se trimite solicitarea ta…",
      "form.sent":"Trimis ✓",
      "form.success":"Mulțumesc — solicitarea ta este pe drum. Îți voi răspunde personal, de obicei în câteva zile.",
      "form.errEmpty":"Lista ta este goală.",
      "form.errFields":"Te rog adaugă numele și emailul.",
      "form.errNotConfigured":"Formularul nu este încă configurat. Te rog scrie la {email} cu lista ta.",
      "form.errGeneric":"Ceva nu a mers la trimiterea formularului. Te rog scrie la {email} cu lista ta.",

      "prod.tag.original":"Original",
      "prod.tag.print":"Print",
      "prod.medium":"Acrilic pe pânză",
      "prod.printMedium":"Print giclée · hârtie de arhivă",
      "prod.price":"Preț la cerere",
      "prod.add":"Adaugă la solicitare",
      "prod.inList":"În lista ta",
      "prod.added":"Adăugat ✓",
      "prod.sizeAria":"Dimensiune print pentru {title}",

      "nav.events":"Evenimente",
      "nav.bio":"BIO",
      "events.eyebrow":"Expoziții & evenimente",
      "events.h2":"Evenimente",
      "events.meta":"Expoziții, târguri & pictură live",
      "events.upcoming":"Viitoare",
      "events.past":"Trecute",
      "events.none":"Datele vor fi anunțate în curând.",
      "bio.label":"BIO",
      "cv.heading":"Curriculum Vitae",
      "cv.download":"Descarcă CV (PDF)",
      "cv.updated":"Actualizat",
      "cv.education":"Educație",
      "cv.exhibitions":"Expoziții selectate",
      "cv.projects":"Proiecte selectate",
      "cv.grants":"Granturi",
      "cv.commissions":"Comenzi selectate",
      "cv.full":"CV-ul complet, cu presă și lista integrală de proiecte, este în PDF.",
      "contact.commission":"Comandă prin mesaj sau email",
      "contact.phone":"Sună",
      "shop.addCart":"Adaugă în coș",
      "shop.enquire":"Întreabă",
      "shop.originalNote":"Originalele se vând la cerere"
    }
  };

  function pickInitial(){
    var stored = null;
    try{ stored = localStorage.getItem("cp_lang"); }catch(e){}
    if(stored === "en" || stored === "ro") return stored;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("ro") === 0 ? "ro" : "en";
  }

  var lang = pickInitial();

  function t(key){
    return (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;
  }

  function applyStatic(root){
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function(el){
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-html]").forEach(function(el){
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function(el){
      // format: "attr:key;attr2:key2"
      el.getAttribute("data-i18n-attr").split(";").forEach(function(pair){
        var bits = pair.split(":");
        if(bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });
    document.documentElement.lang = lang;
  }

  function updateToggleUI(){
    document.querySelectorAll(".lang-toggle [data-lang]").forEach(function(b){
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  function setLang(l){
    if(l !== "en" && l !== "ro") return;
    if(l === lang){ updateToggleUI(); return; }
    lang = l;
    try{ localStorage.setItem("cp_lang", lang); }catch(e){}
    applyStatic();
    updateToggleUI();
    document.dispatchEvent(new CustomEvent("cp:langchange", { detail:{ lang: lang } }));
  }

  function wireToggle(){
    document.querySelectorAll(".lang-toggle [data-lang]").forEach(function(b){
      b.addEventListener("click", function(){ setLang(b.getAttribute("data-lang")); });
    });
    updateToggleUI();
  }

  // Public API
  window.I18N = {
    t: t,
    get lang(){ return lang; },
    setLang: setLang,
    apply: applyStatic
  };

  applyStatic();
  wireToggle();

})();
