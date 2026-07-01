/* cv.js — Curriculum Vitae data (curated selection shown in the BIO section).
   The full, detailed CV lives in assets/cv/Claudiu-Peta-CV-2026.pdf (Download button).
   Shape consumed by features.js — renders into #cv-body in the current language.
   To update: edit the entries below (keep the {en, ro} shape) and replace the PDF. */
window.CP_CV = {
  updated: '2026-06',

  education: [
    { en: '2024–present — Lucian Blaga University of Sibiu, Faculty of Social & Human Sciences, Conservation–Restoration (prof. Daniela Bădilă)',
      ro: '2024–prezent — Universitatea Lucian Blaga din Sibiu, Facultatea de Științe Socio-Umane, Conservare–Restaurare (prof. Daniela Bădilă)' },
    { en: '2025–2026 — University of Palermo, Conservation–Restoration, Erasmus+ (one semester)',
      ro: '2025–2026 — Universitatea din Palermo, Conservare–Restaurare, Erasmus+ (un semestru)' },
    { en: '2002–2005 — "Ilie Micu" People’s School of Arts & Crafts, Sibiu — Painting (prof. Vera Costea)',
      ro: '2002–2005 — Școala Populară de Arte și Meserii „Ilie Micu”, Sibiu — Pictură (prof. Vera Costea)' },
    { en: '2001–2004 — "Ilie Micu" People’s School of Arts & Crafts, Sibiu — Fashion design',
      ro: '2001–2004 — Școala Populară de Arte și Meserii „Ilie Micu”, Sibiu — Design vestimentar' }
  ],

  exhibitions: [
    { year: '2026', text: { en: '“Mai cu suflet” — Grupul Rod, Piața Mare (Diverta), FITS, Sibiu (group)',
                            ro: '„Mai cu suflet” — Grupul Rod, Piața Mare (Diverta), FITS, Sibiu (grup)' } },
    { year: '2026', text: { en: '“Rodium” — ATU Toys · NAC, Sibiu (group)',
                            ro: '„Rodium” — ATU Toys · NAC, Sibiu (grup)' } },
    { year: '2025', text: { en: 'Sibiu Contemporary Art Festival — Ursuline Monastery, Sibiu (group)',
                            ro: 'Sibiu Contemporary Art Festival — Mănăstirea Ursulinelor, Sibiu (grup)' } },
    { year: '2025', text: { en: '“10-Q”, FITS — Grupul Rod, Promenada Mall, Sibiu (group)',
                            ro: '„10-Q”, FITS — Grupul Rod, Promenada Mall, Sibiu (grup)' } },
    { year: '2023', text: { en: '“VERSUS” — ATU Toys · NAC, Sibiu (duo, with Roxana Băcilă)',
                            ro: '„VERSUS” — ATU Toys · NAC, Sibiu (duo, cu Roxana Băcilă)' } },
    { year: '2019', text: { en: '“2DARK and Other Stories” — Romanian Library, Freiburg im Breisgau, Germany (duo)',
                            ro: '„2DARK and Other Stories” — Biblioteca Română, Freiburg im Breisgau, Germania (duo)' } },
    { year: '2019', text: { en: '“2DARK” — Sibio, Sibiu (solo)',
                            ro: '„2DARK” — Sibio, Sibiu (solo)' } }
  ],

  projects: [
    { year: '2023', text: { en: '“Let’s play!” — 128 m² mural, RoWay / NorMania, Charlotte Dietrich School, Sibiu',
                            ro: '„Let’s play!” — mural 128 m², RoWay / NorMania, Școala Charlotte Dietrich, Sibiu' } },
    { year: '2022', text: { en: '“Prietenie” — 11 m² mural, Consulate General of Germany, Sibiu',
                            ro: '„Prietenie” — mural 11 m², Consulatul General al Germaniei, Sibiu' } },
    { year: '2022', text: { en: '“The road to all our dreams” — 181 m² mural, Cube Performance, Voluntari',
                            ro: '„The road to all our dreams” — mural 181 m², Cube Performance, Voluntari' } },
    { year: '2021', text: { en: '“Meditația” — 118 m² mural, ZIDART · Pillars of Humanity, Bacău',
                            ro: '„Meditația” — mural 118 m², ZIDART · Pillars of Humanity, Bacău' } },
    { year: '2017', text: { en: '“The Fish” — land art, 4.8 m, Seurasaari island, Helsinki, Finland',
                            ro: '„The Fish” — land art, 4,8 m, insula Seurasaari, Helsinki, Finlanda' } },
    { year: '2016', text: { en: '“Învață să zbori” — Sibiu International StreetArt Festival, 68 m², Sibiu',
                            ro: '„Învață să zbori” — Sibiu International StreetArt Festival, 68 m², Sibiu' } }
  ],

  grants: [
    { year: '2025', text: { en: 'Erasmus+ study programme, UniPa, Palermo, Italy',
                            ro: 'Erasmus+ program de studii, UniPa, Palermo, Italia' } },
    { year: '2018', text: { en: 'Erasmus+ “JumaKu — Jugend macht Kunst”, Goethe-Institut, Ranis, Germany',
                            ro: 'Erasmus+ „JumaKu — Jugend macht Kunst”, Goethe-Institut, Ranis, Germania' } },
    { year: '2017', text: { en: 'Erasmus+ “JumaKu — Jugend macht Kunst”, Goethe-Institut, Helsinki, Finland',
                            ro: 'Erasmus+ „JumaKu — Jugend macht Kunst”, Goethe-Institut, Helsinki, Finlanda' } }
  ]
};
