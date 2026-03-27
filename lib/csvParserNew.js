// lib/csvParserNew.js
import Papa from "papaparse";
import { getAirlineName, getAirportInfo } from "./airlineNames";

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatTime(raw) {
  if (raw === null || raw === undefined || raw === "") return "";
  // Ako je broj (npr. 1240 → "12:40")
  const s = raw.toString().replace(":", "").padStart(4, "0");
  return s.slice(0, 2) + ":" + s.slice(2);
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function formatDate(raw) {
  if (!raw) return "";
  const s = raw.toString().trim();
  if (!s) return "";

  // Format 1: YYYY-MM-DD
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, yyyy, mm, dd] = isoMatch;
    const month = parseInt(mm, 10);
    const day = parseInt(dd, 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return "";
    return `${String(day).padStart(2, "0")}-${MONTHS[month - 1]}-${yyyy}`;
  }

  // Format 2: YYYY-MM-DD - YYYY-MM-DD (period range)
  const rangeMatch = s.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/);
  if (rangeMatch) {
    const [, startDate, endDate] = rangeMatch;
    // For period, we use the start date as FSD and end date as FLD
    return formatDate(startDate);
  }

  return s;
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
    "Sunday": "7"
  };
  
  return dayMap[dow] || "";
}

function parsePeriodRange(periodStr) {
  if (!periodStr) return { start: "", end: "" };
  
  const match = periodStr.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/);
  if (match) {
    return { start: match[1], end: match[2] };
  }
  return { start: "", end: "" };
}

function isPlaceholder(row) {
  // Proveri da li je red validan
  const oper = row.Oper?.toString().trim();
  const fltNo = row["Dep flt no."] || row["Arr flt no."];
  const to = row.To || row.From;
  const etd = row.ETD || row.ETA;
  
  if (!oper || oper === "" || oper === "0") return true;
  if (!fltNo || fltNo === "" || fltNo === "0") return true;
  if (!to || to === "" || to === "0") return true;
  if (!etd || etd === "" || etd === "0") return true;
  
  return false;
}

function extractAirportCodeFromCity(cityStr) {
  if (!cityStr) return "";
  
  // Pokušaj da izvučeš IATA kod iz stringa kao što je "London Luton (LTN)"
  const iataMatch = cityStr.match(/\(([A-Z]{3})\)/);
  if (iataMatch) {
    return iataMatch[1];
  }
  
  // Fallback: pokušaj da pronađeš poznate aerodrome po imenu
  const airportMap = {
    "Belgrade": "BEG",
    "Istanbul Airport": "IST",
    "London Luton": "LTN",
    "London Gatwick": "LGW",
    "London Heathrow": "LHR",
    "Bristol": "BRS",
    "Manchester": "MAN",
    "Birmingham": "BHX",
    "Podgorica": "TGD",
    "Vienna International Airport": "VIE",
    "Zurich Airport": "ZRH",
    "Geneva": "GVA",
    "Brussels": "BRU",
    "Amsterdam": "AMS",
    "Paris Orly": "ORY",
    "Paris Charles de Gaulle": "CDG",
    "Berlin": "BER",
    "Dusseldorf": "DUS",
    "Frankfurt Airport": "FRA",
    "Munich": "MUC",
    "Stuttgart": "STR",
    "Copenhagen": "CPH",
    "Oslo": "OSL",
    "Stockholm Arlanda": "ARN",
    "Helsinki": "HEL",
    "Riga": "RIX",
    "Tallinn": "TLL",
    "Vilnius": "VNO",
    "Warsaw Chopin Airport": "WAW",
    "Katowice": "KTW",
    "Prague": "PRG",
    "Ljubljana Joze Pucnik Airport": "LJU",
    "Dubai": "DXB",
    "Ben Gurion International Airport": "TLV",
    "Baku": "GYD",
    "Kuwait": "KWI",
    "Yerevan": "EVN",
    "Chisinau": "RMO",
    "Tashkent": "TAS",
    "Aqaba King Hussein International Airport": "AQJ",
    "London Stansted Airport": "STN"
  };
  
  for (const [name, code] of Object.entries(airportMap)) {
    if (cityStr.includes(name)) {
      return code;
    }
  }
  
  // Ako ništa ne uspe, vrati prazno
  return "";
}

function extractAirlineCode(airlineName) {
  if (!airlineName) return "";
  
  const airlineMap = {
    "Air Montenegro": "4O",
    "Air Serbia": "JU",
    "Turkish Airlines": "TK",
    "easyJet": "U2",
    "EasyJet Europe": "EC",
    "EasyJet Switzerland": "DS",
    "Jet2.com": "LS",
    "British Airways": "BA",
    "Lufthansa": "LH",
    "Austrian Airlines": "OS",
    "Eurowings": "EW",
    "SAS Scandinavian Airlines": "SK",
    "Norwegian Air Shuttle": "DY",
    "Norwegian Air Sweden AOC AB": "D8",
    "FlyOne Armenia": "3F",
    "FlyOne": "5F",
    "Azerbaijan Airlines": "J2",
    "Jazeera Airways": "J9",
    "El-Al Israel Airlines Ltd Sundor": "LY",
    "Israir Airlines": "6H",
    "flydubai": "FZ",
    "Transavia France": "TO",
    "TUI Airlines Belgium": "TB",
    "TUI Airlines Nederlands": "OR",
    "Vueling Airlines": "VY",
    "Iberia": "IB",
    "LOT Polish Airlines": "LO",
    "Air Baltic": "BT",
    "Luxair": "LG",
    "Edelweiss": "WK",
    "Heston Airlines": "HN",
    "Avion Express": "X9",
    "Enter Air": "E4",
    "Trade Air": "C3",
    "Vision Air": "4V",
    "Fly Lili": "LIL",
    "Neos": "NO",
    "Sunclass Airlines": "DK",
    "Uzbekistan Airways": "HY"
  };
  
  for (const [name, code] of Object.entries(airlineMap)) {
    if (airlineName.includes(name)) {
      return code;
    }
  }
  
  return airlineName.substring(0, 2).toUpperCase();
}

function getFlightNumber(fltNo) {
  if (!fltNo) return "";
  // Ukloni sve što nije broj i slova
  return fltNo.toString().trim();
}

function getFlightType(row) {
  const type = row.Type?.toString().trim() || "";
  if (type === "Normal Service") return "Normal Service";
  if (type === "Passenger Only") return "Passenger Only";
  if (type === "Business Aviation/Air Taxi") return "Business Aviation/Air Taxi";
  if (type === "Non-revenue (Positioning/Ferry/Delivery/Demo)") return "Non-revenue";
  return type;
}

function groupRowsFromNewFormat(rows, isArrivals) {
  const grouped = {};

  for (const row of rows) {
    if (isPlaceholder(row)) continue;

    // Ekstraktuj podatke zavisno od toga da li je arrivals ili departures
    const airportCity = isArrivals ? row.From : row.To;
    const airportCode = extractAirportCodeFromCity(airportCity);
    const fltNo = isArrivals ? row["Arr flt no."] : row["Dep flt no."];
    const time = isArrivals ? row.ETA : row.ETD;
    const periodRange = row.Period;
    const dow = row.DOW;
    
    if (!airportCode || airportCode === "") continue;
    
    const airlineName = row.Oper?.toString().trim();
    const airlineCode = extractAirlineCode(airlineName);
    const flightNumber = getFlightNumber(fltNo);
    
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
      airlineCode: airlineCode,
      flightNumber: `${airlineCode} ${flightNumber}`,
      time: formatTime(time),
      days: getDaysStringFromDOW(dow),
      start: formatDate(start),
      end: formatDate(end),
      terminal: "",
      flightType: getFlightType(row),
    });
  }

  const sortedKeys = Object.keys(grouped).sort();
  return sortedKeys.map((k) => ({
    ...grouped[k],
    flights: grouped[k].flights.sort((a, b) => a.time.localeCompare(b.time)),
  }));
}

// ─── CSV parser za novi format ───────────────────────────────────────────────

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