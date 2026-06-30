/* Site configuration — single source of truth for contact + social links.
   Consumed by features.js. All values are placeholders; replace before launch. */
(function(){
  "use strict";

  window.CP_CONFIG = {
    // TODO real WhatsApp number (international, digits only, no '+')
    whatsapp: {
      enabled: true,
      number: "40700000000",
      message: "Bună! Aș dori o lucrare."
    },
    instagram: "https://instagram.com/REPLACE", // TODO real Instagram URL
    facebook: "https://facebook.com/REPLACE",   // TODO real Facebook URL
    email: "contact@claudiupeta.ro",            // TODO real site email
    commissions: {
      email: true,
      dm: true
    }
  };

})();
