# Claudiu Peta — Artist Website

Portfolio &amp; shop for **Claudiu Peta** (signed *PETA*) — painter, muralist and restorer based in Sibiu, Romania.

Surreal cloud-and-sky portraits on canvas, large-scale murals on walls and facades, and the careful restoration of old paintings and painted furniture.

## Stack

Static site — plain HTML, CSS and vanilla JavaScript. No build step. Hosted on GitHub Pages.

- `index.html` — single-page portfolio (hero, paintings, murals, restoration, about, contact)
- `shop.html` — shop (original paintings + fine-art prints, enquiry cart)
- `styles.css` — shared styles
- `app.js` — shared UI layer: lightbox, scroll reveals, hero parallax, lazy-loading, mobile nav, image-save deterrent
- `i18n.js` — EN / RO language toggle and translations
- `shop.js` — catalogue rendering, enquiry cart, Web3Forms checkout
- `uploads/` — artwork images

## Before going live

The shop's enquiry form posts to [Web3Forms](https://web3forms.com). In `shop.js`, set:

- `WEB3FORMS_KEY` — a real access key tied to the studio inbox
- `STUDIO_EMAIL` — the studio's contact address

Also update the WhatsApp / Instagram links and the `mailto:` address in the contact sections.
