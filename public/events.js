/* events.js — exhibitions & events data (shown in the Events section).
   Shape consumed by features.js (renders into #events-list as photo cards, split upcoming/past).
   { status:'upcoming'|'past', title:{en,ro}, date:{en,ro}, venue:{en,ro}, note:{en,ro},
     image:'uploads/xxx.jpg' (optional), focus:'right center' (optional object-position), url:'' }
   image is optional — cards without one still render cleanly (text-only).
   focus tunes how the photo is cropped in its frame (default '50% 35%').
   To update: edit the entries below and move finished shows to status:'past'. */
window.CP_EVENTS = [
  {
    status: 'upcoming',
    title: { en: '“Mai cu suflet” — Grupul Rod', ro: '„Mai cu suflet” — Grupul Rod' },
    date:  { en: '2026', ro: '2026' },
    venue: { en: 'Piața Mare (Diverta), FITS — Sibiu International Theatre Festival, Sibiu', ro: 'Piața Mare (Diverta), FITS — Festivalul Internațional de Teatru de la Sibiu' },
    note:  { en: 'Group show with Grupul Rod during FITS.', ro: 'Expoziție de grup cu Grupul Rod, în cadrul FITS.' },
    image: 'uploads/489055588_1221184700013596_8704243040357316248_n.jpg',
    focus: 'right center',
    url: ''
  },
  {
    status: 'upcoming',
    title: { en: '“Rodium” — ATU Toys · NAC', ro: '„Rodium” — ATU Toys · NAC' },
    date:  { en: '2026', ro: '2026' },
    venue: { en: 'NAC, Sibiu', ro: 'NAC, Sibiu' },
    note:  { en: 'Group exhibition.', ro: 'Expoziție de grup.' },
    image: 'uploads/490142212_1221462879985778_22541791813130917_n.jpg',
    focus: 'right center',
    url: ''
  },
  {
    status: 'past',
    title: { en: 'Sibiu Contemporary Art Festival', ro: 'Sibiu Contemporary Art Festival' },
    date:  { en: '2025', ro: '2025' },
    venue: { en: 'Ursuline Monastery, Sibiu', ro: 'Mănăstirea Ursulinelor, Sibiu' },
    note:  { en: 'Group show.', ro: 'Expoziție de grup.' },
    image: 'uploads/492678241_24109865288625262_278128664145362783_n.jpg',
    focus: '50% 40%',
    url: ''
  },
  {
    status: 'past',
    title: { en: '“10-Q”, FITS — Grupul Rod', ro: '„10-Q”, FITS — Grupul Rod' },
    date:  { en: '2025', ro: '2025' },
    venue: { en: 'Promenada Mall, Sibiu', ro: 'Promenada Mall, Sibiu' },
    note:  { en: 'Group show during the Sibiu International Theatre Festival.', ro: 'Expoziție de grup, în cadrul FITS.' },
    image: 'uploads/489916025_1221463949985671_3031214626376531084_n.jpg',
    focus: '50% 35%',
    url: ''
  },
  {
    status: 'past',
    title: { en: '“VERSUS” — with Roxana Băcilă', ro: '„VERSUS” — cu Roxana Băcilă' },
    date:  { en: '2023', ro: '2023' },
    venue: { en: 'ATU Toys · NAC, Sibiu', ro: 'ATU Toys · NAC, Sibiu' },
    note:  { en: 'Two-person exhibition.', ro: 'Expoziție în doi.' },
    image: 'uploads/489099170_1221184706680262_4945963792714248027_n.jpg',
    focus: 'right center',
    url: 'https://sibiu100.ro/cultura/niu-herisanu-galeria-nac/'
  },
  {
    status: 'past',
    title: { en: '“2DARK” — solo exhibition', ro: '„2DARK” — expoziție personală' },
    date:  { en: '2019', ro: '2019' },
    venue: { en: 'Sibio, Sibiu', ro: 'Sibio, Sibiu' },
    note:  { en: 'First public showing of the 2DARK series.', ro: 'Prima prezentare publică a seriei 2DARK.' },
    image: 'uploads/490110622_1221463723319027_4314837407855216683_n.jpg',
    focus: 'right center',
    url: ''
  }
];
