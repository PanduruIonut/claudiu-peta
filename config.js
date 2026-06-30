/* Site configuration — single source of truth for contact + social links.
   Consumed by features.js. All values are placeholders; replace before launch. */
(function(){
  "use strict";

  window.CP_CONFIG = {
    // Disabled until a real number is supplied — flip enabled:true and set the number.
    whatsapp: {
      enabled: false,
      number: "40700000000", // TODO real WhatsApp number (international, digits only, no '+')
      message: "Bună! Aș dori o lucrare."
    },
    instagram: "https://www.instagram.com/claudiu.peta/",
    facebook: "https://www.facebook.com/claudiu.peta",
    email: "claudiu.peta@gmail.com",
    commissions: {
      email: true,
      dm: true
    }
  };

})();
