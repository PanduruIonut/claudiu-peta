/* events.js — exhibitions & events data.
   Shape consumed by features.js (renders into #events-list, split upcoming/past).
   All entries are tasteful BILINGUAL placeholders — replace with real content.
   { status:'upcoming'|'past', title:{en,ro}, date:{en,ro}, venue:{en,ro}, note:{en,ro}, url:'' } */
window.CP_EVENTS = [
  // TODO: confirm real FITS (Sibiu International Theatre Festival) participation, dates & venue.
  {
    status: 'upcoming',
    title: { en: 'Live painting at FITS', ro: 'Pictură live la FITS' },
    date:  { en: 'June 2026', ro: 'Iunie 2026' },
    venue: { en: 'Sibiu International Theatre Festival (FITS), Sibiu', ro: 'Festivalul Internațional de Teatru de la Sibiu (FITS), Sibiu' },
    note:  { en: 'Live cloud-and-sky mural painted in the open during the festival.', ro: 'Mural cu nori și cer pictat live, în aer liber, pe durata festivalului.' },
    url: ''
  },
  // TODO: replace with a real upcoming gallery exhibition.
  {
    status: 'upcoming',
    title: { en: 'Solo exhibition — “Faces Made of Sky”', ro: 'Expoziție personală — „Chipuri din cer”' },
    date:  { en: 'Autumn 2026', ro: 'Toamna 2026' },
    venue: { en: 'Gallery to be confirmed, Sibiu', ro: 'Galerie de confirmat, Sibiu' },
    note:  { en: 'New canvases from the 2DARK & VERSUS series.', ro: 'Lucrări noi din seriile 2DARK & VERSUS.' },
    url: ''
  },
  // TODO: replace with real past events.
  {
    status: 'past',
    title: { en: 'Group show — Contemporary Painting', ro: 'Expoziție de grup — Pictură contemporană' },
    date:  { en: '2025', ro: '2025' },
    venue: { en: 'Cultural Centre, Sibiu', ro: 'Centrul Cultural, Sibiu' },
    note:  { en: 'Selected works on canvas.', ro: 'Lucrări selectate pe pânză.' },
    url: ''
  },
  {
    status: 'past',
    title: { en: 'Mural commission — School facade', ro: 'Comandă mural — Fațadă de școală' },
    date:  { en: '2024', ro: '2024' },
    venue: { en: 'Sibiu', ro: 'Sibiu' },
    note:  { en: 'Large-scale “Music & Play” facade, painted on site.', ro: 'Fațadă „Muzică & Joc” la scară mare, pictată la fața locului.' },
    url: ''
  }
];
