# Tivat Airport Timetable PDF Generator

Next.js aplikacija koja čita sezonske CSV fajlove i generiše PDF-ove u stilu LYTV timetablea.

## Instalacija

```bash
npm install
npm run dev
```

## Korišćenje

1. Smesti CSV fajlove u `/public/data/` folder:
   - `S26FIDS_27MAR26-DEPARTURES.csv`
   - `S26FIDS_27MAR26-ARRIVALS.csv`

2. Otvori http://localhost:3000

3. Klikni "Generate Departures PDF" ili "Generate Arrivals PDF"

## Zavisnosti

- `next` - React framework
- `react`, `react-dom`
- `papaparse` - CSV parsing
- `jspdf` - PDF generisanje
- `jspdf-autotable` - tabele u PDF-u

## Struktura projekta

```
├── app/
│   ├── layout.js
│   ├── page.js               ← glavna stranica
│   └── api/
│       └── generate-pdf/
│           └── route.js      ← API ruta za PDF generisanje (server-side)
├── lib/
│   ├── csvParser.js          ← parsiranje i grupisanje CSV podataka
│   ├── airlineNames.js       ← IATA kod → naziv aviokompanije
│   └── pdfGenerator.js       ← generisanje PDF-a (client-side, jsPDF)
├── public/
│   └── data/
│       ├── S26FIDS_27MAR26-DEPARTURES.csv
│       └── S26FIDS_27MAR26-ARRIVALS.csv
└── package.json
```
