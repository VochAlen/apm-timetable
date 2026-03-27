import Papa from "papaparse";
import { getAirlineName, getAirportInfo } from "./airlineNames";

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatTime(raw) {
  if (raw === null || raw === undefined || raw === "") return "";
  // Ako je broj (SCT u JSON-u dolazi kao integer, npr. 905 → "09:05")
  const s = raw.toString().replace(":", "").padStart(4, "0");
  return s.slice(0, 2) + ":" + s.slice(2);
}

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export function formatDate(raw) {
  if (!raw) return "";
  const s = raw.toString().trim();
  if (!s) return "";

  // Format 1: YYYY-MM-DD  (CSV departures + JSON)
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, yyyy, mm, dd] = isoMatch;
    const month = parseInt(mm, 10);
    const day   = parseInt(dd, 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return "";
    return `${String(day).padStart(2, "0")}-${MONTHS[month - 1]}-${yyyy}`;
  }

  // Format 2: M/D/YYYY  (CSV arrivals)
  const usMatch = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    const [, mm, dd, yyyy] = usMatch;
    const month = parseInt(mm, 10);
    const day   = parseInt(dd, 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return "";
    return `${String(day).padStart(2, "0")}-${MONTHS[month - 1]}-${yyyy}`;
  }

  return s;
}

function getDaysString(row) {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const nums = [];
  days.forEach((d, i) => {
    if (row[d] === "Y" || row[d] === true) nums.push(i + 1);
  });
  return nums.join("");
}

/**
 * Provjera da li je red placeholder/prazan.
 * Važi i za CSV (stringovi) i za JSON (string ili broj).
 */
function isPlaceholder(row) {
  const flc = row.FLC?.toString().trim();
  const fln = row.FLN?.toString().trim();
  const vi1 = row.VI1?.toString().trim();
  // Preskoči ako je ijedan od ključnih polja "0", "-", prazno ili nedostaje
  if (!vi1 || vi1 === "0") return true;
  if (!flc || flc === "0") return true;
  if (!fln || fln === "0" || fln === "-") return true;
  // Preskoči ako je datum placeholder (1900-01-00)
  const fsd = row.FSD?.toString().trim() || "";
  if (fsd.startsWith("1900")) return true;
  return false;
}

/**
 * VI1 može da sadrži više aerodroma odvojenih zarezom (npr. "TIA,BRU").
 * Vraćamo prvi koji nije prazan.
 */
function parseVI1(vi1Raw) {
  if (!vi1Raw) return "";
  const parts = vi1Raw.toString().trim().split(",").map(p => p.trim()).filter(Boolean);
  return parts[0] || "";
}

// ─── Zajednička jezgro logika ─────────────────────────────────────────────────

function groupRows(rows) {
  const grouped = {};

  for (const row of rows) {
    if (isPlaceholder(row)) continue;

    const airportCode = parseVI1(row.VI1);
    if (!airportCode || airportCode === "0") continue;

    const flc = row.FLC?.toString().trim();
    const fln = row.FLN?.toString().trim();

    if (!grouped[airportCode]) {
      grouped[airportCode] = {
        airportCode,
        ...getAirportInfo(airportCode),
        flights: [],
      };
    }

    grouped[airportCode].flights.push({
      airline:      getAirlineName(flc),
      airlineCode:  flc,
      flightNumber: `${flc} ${fln}`,
      time:         formatTime(row.SCT),
      days:         getDaysString(row),
      start:        formatDate(row.FSD),
      end:          formatDate(row.FLD),
      terminal:     row.TER?.toString().trim() || "",
    });
  }

  const sortedKeys = Object.keys(grouped).sort();
  return sortedKeys.map((k) => ({
    ...grouped[k],
    flights: grouped[k].flights.sort((a, b) => a.time.localeCompare(b.time)),
  }));
}

// ─── CSV parser ───────────────────────────────────────────────────────────────

export function parseTimetableCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  return groupRows(result.data);
}

// ─── JSON parser ──────────────────────────────────────────────────────────────

/**
 * Parsira JSON string ili već-parsirani niz objekata.
 * Prihvata:
 *   - string  → JSON.parse pa groupRows
 *   - array   → direktno groupRows
 */
export function parseTimetableJSON(input) {
  let rows;
  if (typeof input === "string") {
    try {
      rows = JSON.parse(input);
    } catch (e) {
      throw new Error("Nevažeći JSON: " + e.message);
    }
  } else if (Array.isArray(input)) {
    rows = input;
  } else {
    throw new Error("JSON input mora biti string ili niz objekata.");
  }

  if (!Array.isArray(rows)) {
    throw new Error("JSON mora biti niz (array) objekata.");
  }

  return groupRows(rows);
}