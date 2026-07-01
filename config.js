/* Site configuration — single source of truth for contact + social links.
   Consumed by features.js. All values are placeholders; replace before launch. */
(function(){
  "use strict";

  window.CP_CONFIG = {
    // WhatsApp on/off toggle — set enabled:false to hide it everywhere.
    whatsapp: {
      enabled: true,
      number: "40766483164", // international, digits only, no '+'
      message: "Bună! Aș dori o lucrare."
    },
    phone: "+40 766 483 164",
    instagram: "https://www.instagram.com/claudiu.peta/",
    facebook: "https://www.facebook.com/claudiu.peta",
    email: "claudiu.peta@gmail.com",
    commissions: {
      email: true,
      dm: true
    }
  };

})();
