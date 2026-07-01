/* events.js — exhibitions & events data (shown in the Events section).
   Shape consumed by features.js (renders into #events-list, split upcoming/past).
   { status:'upcoming'|'past', title:{en,ro}, date:{en,ro}, venue:{en,ro}, note:{en,ro}, url:'' }
   To update: edit the entries below and move finished shows to status:'past'. */
window.CP_EVENTS = [
  {
    status: 'upcoming',
    title: { en: '“Mai cu suflet” — Grupul Rod', ro: '„Mai cu suflet” — Grupul Rod' },
    date:  { en: '2026', ro: '2026' },
    venue: { en: 'Piața Mare (Diverta), FITS — Sibiu International Theatre Festival, Sibiu', ro: 'Piața Mare (Diverta), FITS — Festivalul Internațional de Teatru de la Sibiu' },
    note:  { en: 'Group show with Grupul Rod during FITS.', ro: 'Expoziție de grup cu Grupul Rod, în cadrul FITS.' },
    url: ''
  },
  {
    status: 'upcoming',
    title: { en: '“Rodium” — ATU Toys · NAC', ro: '„Rodium” — ATU Toys · NAC' },
    date:  { en: '2026', ro: '2026' },
    venue: { en: 'NAC, Sibiu', ro: 'NAC, Sibiu' },
    note:  { en: 'Group exhibition.', ro: 'Expoziție de grup.' },
    url: ''
  },
  {
    status: 'past',
    title: { en: 'Sibiu Contemporary Art Festival', ro: 'Sibiu Contemporary Art Festival' },
    date:  { en: '2025', ro: '2025' },
    venue: { en: 'Ursuline Monastery, Sibiu', ro: 'Mănăstirea Ursulinelor, Sibiu' },
    note:  { en: 'Group show.', ro: 'Expoziție de grup.' },
    url: ''
  },
  {
    status: 'past',
    title: { en: '“10-Q”, FITS — Grupul Rod', ro: '„10-Q”, FITS — Grupul Rod' },
    date:  { en: '2025', ro: '2025' },
    venue: { en: 'Promenada Mall, Sibiu', ro: 'Promenada Mall, Sibiu' },
    note:  { en: 'Group show during the Sibiu International Theatre Festival.', ro: 'Expoziție de grup, în cadrul FITS.' },
    url: ''
  },
  {
    status: 'past',
    title: { en: '“VERSUS” — with Roxana Băcilă', ro: '„VERSUS” — cu Roxana Băcilă' },
    date:  { en: '2023', ro: '2023' },
    venue: { en: 'ATU Toys · NAC, Sibiu', ro: 'ATU Toys · NAC, Sibiu' },
    note:  { en: 'Two-person exhibition.', ro: 'Expoziție în doi.' },
    url: 'https://sibiu100.ro/cultura/niu-herisanu-galeria-nac/'
  },
  {
    status: 'past',
    title: { en: '“2DARK” — solo exhibition', ro: '„2DARK” — expoziție personală' },
    date:  { en: '2019', ro: '2019' },
    venue: { en: 'Sibio, Sibiu', ro: 'Sibio, Sibiu' },
    note:  { en: 'First public showing of the 2DARK series.', ro: 'Prima prezentare publică a seriei 2DARK.' },
    url: ''
  }
];
