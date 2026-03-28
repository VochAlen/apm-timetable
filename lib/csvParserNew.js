// lib/csvParserNew.js
import Papa from "papaparse";
import { getAirlineName, getAirportInfo } from "./airlineNames";

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatTime(raw) {
  if (raw === null || raw === undefined || raw === "") return "";
  const s = raw.toString().replace(":", "").padStart(4, "0");
  return s.slice(0, 2) + ":" + s.slice(2);
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function formatDate(raw) {
  if (!raw) return "";
  const s = raw.toString().trim();
  if (!s) return "";

  // Format: YYYY-MM-DD
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, yyyy, mm, dd] = isoMatch;
    const month = parseInt(mm, 10);
    const day = parseInt(dd, 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return "";
    return `${String(day).padStart(2, "0")}-${MONTHS[month - 1]}-${yyyy}`;
  }

  // Format: YYYY-MM-DD - YYYY-MM-DD (period range) → uzmi samo start
  const rangeMatch = s.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/);
  if (rangeMatch) {
    return formatDate(rangeMatch[1]);
  }

  return s;
}

function parsePeriodRange(periodStr) {
  if (!periodStr) return { start: "", end: "" };
  const match = periodStr.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/);
  if (match) return { start: match[1], end: match[2] };
  return { start: "", end: "" };
}

function getDaysStringFromDOW(dow) {
  if (!dow || dow === "") return "";
  const dayMap = {
    "Monday": "1",
    "Tuesday": "2",
    "Wednesday": "3",
    "Thursday": "4",
    "Friday": "5",
    "Saturday": "6",
    "Sunday": "7",
  };
  return dayMap[dow] || "";
}

// ─── Izvlačenje IATA koda ─────────────────────────────────────────────────────
// Pokušava više strategija:
// 1. Direktan IATA kod iz dedicated kolone (TC za dep, FC za arr)
// 2. IATA kod u zagradi unutar stringa npr. "Belgrade (BEG)"
// 3. Fallback mapa po imenu grada/aerodroma

const CITY_TO_IATA = {
  "Belgrade": "BEG",
  "Istanbul Airport": "IST",
  "Istanbul": "IST",
  "Sabiha Gokcen": "SAW",
  "London Luton": "LTN",
  "London Gatwick": "LGW",
  "London Heathrow": "LHR",
  "London Stansted Airport": "STN",
  "London Stansted": "STN",
  "Bristol": "BRS",
  "Manchester": "MAN",
  "Birmingham": "BHX",
  "Edinburgh": "EDI",
  "Glasgow": "GLA",
  "Newcastle": "NCL",
  "Leeds Bradford": "LBA",
  "East Midlands": "EMA",
  "Liverpool": "LPL",
  "Bournemouth": "BOH",
  "Newquay": "NQY",
  "Exeter": "EXT",
  "Podgorica": "TGD",
  "Vienna International Airport": "VIE",
  "Vienna": "VIE",
  "Zurich Airport": "ZRH",
  "Zurich": "ZRH",
  "Geneva": "GVA",
  "Brussels": "BRU",
  "Brussels South Charleroi": "CRL",
  "Amsterdam": "AMS",
  "Maastricht": "MST",
  "Paris Orly": "ORY",
  "Paris Charles de Gaulle": "CDG",
  "Paris Beauvais": "BVA",
  "Paris": "CDG",
  "Lille": "LIL",
  "Lyon": "LYS",
  "Nantes": "NTE",
  "Berlin": "BER",
  "Frankfurt Airport": "FRA",
  "Frankfurt": "FRA",
  "Munich": "MUC",
  "Dusseldorf": "DUS",
  "Düsseldorf": "DUS",
  "Hamburg": "HAM",
  "Stuttgart": "STR",
  "Cologne": "CGN",
  "Dortmund": "DTM",
  "Baden-Baden": "FKB",
  "Karlsruhe": "FKB",
  "Memmingen": "FMM",
  "Copenhagen": "CPH",
  "Oslo": "OSL",
  "Stockholm Arlanda": "ARN",
  "Stockholm": "ARN",
  "Malmo": "MMX",
  "Malmö": "MMX",
  "Helsinki": "HEL",
  "Riga": "RIX",
  "Tallinn": "TLL",
  "Vilnius": "VNO",
  "Warsaw Chopin Airport": "WAW",
  "Warsaw": "WAW",
  "Katowice": "KTW",
  "Krakow": "KRK",
  "Gdansk": "GDN",
  "Poznan": "POZ",
  "Wroclaw": "WRO",
  "Rzeszow": "RZE",
  "Prague": "PRG",
  "Brno": "BRQ",
  "Bratislava": "BTS",
  "Budapest": "BUD",
  "Ljubljana Joze Pucnik Airport": "LJU",
  "Ljubljana": "LJU",
  "Zagreb": "ZAG",
  "Athens": "ATH",
  "Barcelona": "BCN",
  "Madrid": "MAD",
  "Palma": "PMI",
  "Rome": "FCO",
  "Milan Malpensa": "MXP",
  "Milan": "MXP",
  "Bologna": "BLQ",
  "Catania": "CTA",
  "Lamezia Terme": "SUF",
  "Dubai": "DXB",
  "Abu Dhabi": "AUH",
  "Ben Gurion International Airport": "TLV",
  "Tel Aviv": "TLV",
  "Baku": "GYD",
  "Kuwait": "KWI",
  "Yerevan": "EVN",
  "Tashkent": "TAS",
  "Almaty": "ALA",
  "Astana": "NQZ",
  "Nursultan": "NQZ",
  "Chisinau": "RMO",
  "Mostar": "RMO",
  "Ankara": "ESB",
  "Antalya": "AYT",
  "Izmir": "ADB",
  "Aqaba King Hussein International Airport": "AQJ",
  "Aqaba": "AQJ",
  "Sharm el-Sheikh": "SSH",
  "Enfidha": "NBE",
  "Larnaca": "LCA",
  "Kristiansand": "KRS",
  "Brest": "BES",
  "Luxembourg": "LUX",
  "Linz": "LNZ",
  "Basel": "BSL",
  "Nurnberg": "NUE",
  "Nuremberg": "NUE",
  "Hannover": "HAJ",
  "Dresden": "DRS",
  "Munster": "FMO",
  "Münster": "FMO",
};

function extractAirportCode(iataFromColumn, cityStr) {
  // 1. Direktan IATA kod iz kolone (TC ili FC) — najpouzdaniji
  if (iataFromColumn && iataFromColumn.trim().length === 3 && /^[A-Z]{3}$/.test(iataFromColumn.trim())) {
    return iataFromColumn.trim();
  }

  if (!cityStr) return "";
  const city = cityStr.trim();

  // 2. IATA u zagradi npr. "Belgrade (BEG)"
  const bracketMatch = city.match(/\(([A-Z]{3})\)/);
  if (bracketMatch) return bracketMatch[1];

  // 3. Fallback mapa po imenu
  for (const [name, code] of Object.entries(CITY_TO_IATA)) {
    if (city.includes(name)) return code;
  }

  return "";
}

// ─── Mapiranje naziva aviokompanije → IATA kod ───────────────────────────────

const AIRLINE_NAME_TO_CODE = {
  "Air Montenegro": "4O",
  "Air Serbia": "JU",
  "Turkish Airlines": "TK",
  "easyJet": "U2",
  "EasyJet Europe": "EC",
  "EasyJet Switzerland": "DS",
  "Jet2.com": "LS",
  "Jet2": "LS",
  "British Airways": "BA",
  "Lufthansa": "LH",
  "Austrian Airlines": "OS",
  "Eurowings": "EW",
  "SAS Scandinavian Airlines": "SK",
  "SAS": "SK",
  "Norwegian Air Shuttle": "DY",
  "Norwegian Air Sweden AOC AB": "D8",
  "Norwegian": "DY",
  "FlyOne Armenia": "3F",
  "FlyOne": "5F",
  "Fly Lili": "LIL",
  "Azerbaijan Airlines": "J2",
  "Jazeera Airways": "J9",
  "El-Al Israel Airlines Ltd Sundor": "LY",
  "El Al": "LY",
  "Israir Airlines": "6H",
  "Israir": "6H",
  "Arkia Airlines": "IZ",
  "Arkia": "IZ",
  "flydubai": "FZ",
  "Transavia France": "TO",
  "Transavia": "TO",
  "TUI Airlines Belgium": "TB",
  "TUI Airlines Nederlands": "OR",
  "TUI fly Belgium": "TB",
  "TUI fly Netherlands": "OR",
  "Vueling Airlines": "VY",
  "Vueling": "VY",
  "Iberia": "IB",
  "LOT Polish Airlines": "LO",
  "LOT": "LO",
  "Air Baltic": "BT",
  "airBaltic": "BT",
  "Luxair": "LG",
  "Edelweiss": "WK",
  "Heston Airlines": "HN",
  "Avion Express": "X9",
  "Enter Air": "E4",
  "Trade Air": "C3",
  "Vision Air": "4V",
  "BH Airlines": "4V",
  "Neos": "NO",
  "Sunclass Airlines": "DK",
  "Uzbekistan Airways": "HY",
  "Ryanair": "FR",
  "Wizz Air": "W6",
  "Pegasus Airlines": "PC",
  "SunExpress": "XQ",
  "Air Astana": "KC",
  "Aegean Air": "A3",
  "Aegeanair": "A3",
};

function extractAirlineCode(airlineName) {
  if (!airlineName) return "";
  const name = airlineName.trim();
  for (const [key, code] of Object.entries(AIRLINE_NAME_TO_CODE)) {
    if (name.includes(key)) return code;
  }
  // Fallback: prva dva slova velikim slovima
  return name.substring(0, 2).toUpperCase();
}

// ─── Grupisanje redova ────────────────────────────────────────────────────────

function isPlaceholder(row, isArrivals) {
  const oper = row.Oper?.toString().trim();
  const fltNo = isArrivals ? row["Arr flt no."] : row["Dep flt no."];
  const time = isArrivals ? row.ETA : row.ETD;

  if (!oper || oper === "" || oper === "0") return true;
  if (!fltNo || fltNo === "" || fltNo === "0") return true;
  if (!time || time === "" || time === "0") return true;

  return false;
}

function groupRowsFromNewFormat(rows, isArrivals) {
  const grouped = {};

  for (const row of rows) {
    if (isPlaceholder(row, isArrivals)) continue;

    // ── Departures: IATA iz kolone TC, naziv iz kolone To
    // ── Arrivals:   IATA iz kolone FC, naziv iz kolone From
    const iataColumn = isArrivals ? (row.FC || row.FVC || "") : (row.TC || row.TVC || "");
    const cityColumn = isArrivals ? (row.From || "") : (row.To || "");

    const airportCode = extractAirportCode(iataColumn, cityColumn);
    if (!airportCode) continue;

    const fltNo = isArrivals ? row["Arr flt no."] : row["Dep flt no."];
    const time = isArrivals ? row.ETA : row.ETD;
    const periodRange = row.Period;
    const dow = row.DOW;

    const airlineName = row.Oper?.toString().trim();
    const airlineCode = extractAirlineCode(airlineName);
    const flightNumber = fltNo?.toString().trim() || "";

    const { start, end } = parsePeriodRange(periodRange);

    if (!grouped[airportCode]) {
      grouped[airportCode] = {
        airportCode,
        ...getAirportInfo(airportCode),
        flights: [],
      };
    }

    grouped[airportCode].flights.push({
      airline: getAirlineName(airlineCode),
      airlineCode,
      flightNumber: `${airlineCode} ${flightNumber}`,
      time: formatTime(time),
      days: getDaysStringFromDOW(dow),
      start: formatDate(start),
      end: formatDate(end),
      terminal: "",
      flightType: row.Type?.toString().trim() || "",
    });
  }

  const sortedKeys = Object.keys(grouped).sort();
  return sortedKeys.map((k) => ({
    ...grouped[k],
    flights: grouped[k].flights.sort((a, b) => a.time.localeCompare(b.time)),
  }));
}

// ─── Exportovani parseri ──────────────────────────────────────────────────────

export function parseArrivalsNewCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  return groupRowsFromNewFormat(result.data, true);
}

export function parseDeparturesNewCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  return groupRowsFromNewFormat(result.data, false);
}