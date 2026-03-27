// IATA kod aviokompanije → puni naziv
export const AIRLINE_NAMES = {
  TK: "Turkish Airlines",
  JU: "Air Serbia",
  LH: "Lufthansa",
  OS: "Austrian Airlines",
  EW: "Eurowings",
  U2: "easyJet",
  FR: "Ryanair",
  W6: "Wizz Air",
  DY: "Norwegian Air",
  SK: "SAS",
  BT: "airBaltic",
  LO: "LOT Polish Airlines",
  BA: "British Airways",
  IB: "Iberia",
  VY: "Vueling Airlines",
  OR: "TUI fly Netherlands",
  TO: "Transavia France",
  TB: "TUI fly Belgium",
  LS: "Jet2",
  WK: "Edelweiss Air",
  FZ: "flydubai",
  LY: "El Al",
  D8: "Norwegian (D8)",
  J2: "Azerbaijan Airlines",
  J9: "Jazeera Airways",
  HY: "Uzbekistan Airways",
  X9: "Avion Express",
  EC: "EasyJet Europe",
  IZ: "Arkia",
  "4V": "BH Airlines",
  "6H": "Israir",
  "4O": "Air Montenegro",
  "3F": "FlyOne Armenia",
  "5F": "FlyOne",
  DS: "EasyJet Switzerland",
  HN: "Heston Airlines",
  LG: "Luxair",
  C3: "Trade Air",
  E4: "Enter Air",
  "0": "Unknown",
};

export function getAirlineName(iataCode) {
  return AIRLINE_NAMES[iataCode] || iataCode;
}

// Airport IATA → grad, naziv aerodroma
export const AIRPORT_NAMES = {
  // ── Turska ──────────────────────────────────────────────────────────────────
  IST: { city: "Istanbul",       airport: "İstanbul Havalimanı",           country: "Turkey" },
  AYT: { city: "Antalya",        airport: "Antalya Airport",               country: "Turkey" },

  // ── Srbija ──────────────────────────────────────────────────────────────────
  BEG: { city: "Belgrade",       airport: "Belgrade Nikola Tesla Airport", country: "Serbia" },
  INI: { city: "Niš",            airport: "Constantine the Great Airport", country: "Serbia" },
  KVO: { city: "Kraljevo",       airport: "Morava Airport",                country: "Serbia" },

  // ── Crna Gora ────────────────────────────────────────────────────────────────
  TGD: { city: "Podgorica",      airport: "Podgorica Airport",             country: "Montenegro" },


  // ── Bosna i Hercegovina ──────────────────────────────────────────────────────
  RMO: { city: "Mostar",         airport: "Mostar International Airport",  country: "Bosnia & Herzegovina" },

  // ── Slovenija ────────────────────────────────────────────────────────────────
  LJU: { city: "Ljubljana",      airport: "Ljubljana Jože Pučnik Airport", country: "Slovenia" },

  // ── Hrvatska ────────────────────────────────────────────────────────────────
  ZAG: { city: "Zagreb",         airport: "Franjo Tuđman Airport",         country: "Croatia" },

  // ── Grčka ────────────────────────────────────────────────────────────────────
  // (dodati po potrebi)

  // ── UK ───────────────────────────────────────────────────────────────────────
  LHR: { city: "London",         airport: "Heathrow Airport",              country: "United Kingdom" },
  LGW: { city: "London",         airport: "Gatwick Airport",               country: "United Kingdom" },
  LTN: { city: "London",         airport: "Luton Airport",                 country: "United Kingdom" },
  STN: { city: "London",         airport: "Stansted Airport",              country: "United Kingdom" },
  MAN: { city: "Manchester",     airport: "Manchester Airport",            country: "United Kingdom" },
  BRS: { city: "Bristol",        airport: "Bristol Airport",               country: "United Kingdom" },
  BHX: { city: "Birmingham",     airport: "Birmingham Airport",            country: "United Kingdom" },
  EDI: { city: "Edinburgh",      airport: "Edinburgh Airport",             country: "United Kingdom" },
  GLA: { city: "Glasgow",        airport: "Glasgow Airport",               country: "United Kingdom" },
  NCL: { city: "Newcastle",      airport: "Newcastle Airport",             country: "United Kingdom" },
  LBA: { city: "Leeds",          airport: "Leeds Bradford Airport",        country: "United Kingdom" },
  EMA: { city: "East Midlands",  airport: "East Midlands Airport",         country: "United Kingdom" },
  LPL: { city: "Liverpool",      airport: "John Lennon Airport",           country: "United Kingdom" },
  BOH: { city: "Bournemouth",    airport: "Bournemouth Airport",           country: "United Kingdom" },
  EXT: { city: "Exeter",         airport: "Exeter Airport",                country: "United Kingdom" },
  NQY: { city: "Newquay",        airport: "Cornwall Airport Newquay",      country: "United Kingdom" },

  // ── Irska ────────────────────────────────────────────────────────────────────
  // (dodati po potrebi)

  // ── Francuska ────────────────────────────────────────────────────────────────
  CDG: { city: "Paris",          airport: "Charles de Gaulle Airport",     country: "France" },
  ORY: { city: "Paris",          airport: "Orly Airport",                  country: "France" },
  LYS: { city: "Lyon",           airport: "Lyon–Saint-Exupéry Airport",    country: "France" },
  NTE: { city: "Nantes",         airport: "Nantes Atlantique Airport",     country: "France" },
  PIS: { city: "Poitiers",       airport: "Poitiers–Biard Airport",        country: "France" },
  PUF: { city: "Pau",            airport: "Pau Pyrénées Airport",          country: "France" },
  SXB: { city: "Strasbourg",     airport: "Strasbourg Airport",            country: "France" },

  // ── Njemačka ─────────────────────────────────────────────────────────────────
  FRA: { city: "Frankfurt",      airport: "Frankfurt Airport",             country: "Germany" },
  MUC: { city: "Munich",         airport: "Munich Airport",                country: "Germany" },
  DUS: { city: "Düsseldorf",     airport: "Düsseldorf Airport",            country: "Germany" },
  HAM: { city: "Hamburg",        airport: "Hamburg Airport",               country: "Germany" },
  BER: { city: "Berlin",         airport: "Berlin Brandenburg Airport",    country: "Germany" },
  HAJ: { city: "Hannover",       airport: "Hannover Airport",              country: "Germany" },
  DRS: { city: "Dresden",        airport: "Dresden Airport",               country: "Germany" },
  NUE: { city: "Nuremberg",      airport: "Nuremberg Airport",             country: "Germany" },
  STR: { city: "Stuttgart",      airport: "Stuttgart Airport",             country: "Germany" },
  CGN: { city: "Cologne",        airport: "Cologne Bonn Airport",          country: "Germany" },
  FMO: { city: "Münster",        airport: "Münster Osnabrück Airport",     country: "Germany" },
  KSF: { city: "Kassel",         airport: "Kassel Airport",                country: "Germany" },

  // ── Austrija ─────────────────────────────────────────────────────────────────
  VIE: { city: "Vienna",         airport: "Vienna International Airport",  country: "Austria" },
  LNZ: { city: "Linz",           airport: "Linz Airport",                  country: "Austria" },

  // ── Švicarska ────────────────────────────────────────────────────────────────
  ZRH: { city: "Zurich",         airport: "Zurich Airport",                country: "Switzerland" },
  GVA: { city: "Geneva",         airport: "Geneva Airport",                country: "Switzerland" },
  BSL: { city: "Basel",          airport: "EuroAirport Basel",             country: "Switzerland" },

  // ── Belgija ──────────────────────────────────────────────────────────────────
  BRU: { city: "Brussels",       airport: "Brussels Airport",              country: "Belgium" },

  // ── Luksemburg ───────────────────────────────────────────────────────────────
  LUX: { city: "Luxembourg",     airport: "Luxembourg Airport",            country: "Luxembourg" },

  // ── Nizozemska ───────────────────────────────────────────────────────────────
  AMS: { city: "Amsterdam",      airport: "Amsterdam Airport Schiphol",    country: "Netherlands" },

  // ── Španija ──────────────────────────────────────────────────────────────────
  BCN: { city: "Barcelona",      airport: "Barcelona–El Prat Airport",     country: "Spain" },
  MAD: { city: "Madrid",         airport: "Adolfo Suárez Madrid–Barajas",  country: "Spain" },
  PMI: { city: "Palma",          airport: "Palma de Mallorca Airport",     country: "Spain" },

  // ── Italija ──────────────────────────────────────────────────────────────────
  BLQ: { city: "Bologna",        airport: "Guglielmo Marconi Airport",     country: "Italy" },
  SUF: { city: "Lamezia Terme",  airport: "Lamezia Terme Airport",         country: "Italy" },

  // ── Češka ────────────────────────────────────────────────────────────────────
  PRG: { city: "Prague",         airport: "Václav Havel Airport",          country: "Czech Republic" },
  BRQ: { city: "Brno",           airport: "Brno–Tuřany Airport",           country: "Czech Republic" },

  // ── Poljska ──────────────────────────────────────────────────────────────────
  WAW: { city: "Warsaw",         airport: "Chopin Airport",                country: "Poland" },
  KRK: { city: "Krakow",         airport: "Krakow Airport",                country: "Poland" },
  KTW: { city: "Katowice",       airport: "Katowice Airport",              country: "Poland" },

  // ── Mađarska ─────────────────────────────────────────────────────────────────
  BUD: { city: "Budapest",       airport: "Budapest Liszt Ferenc Airport", country: "Hungary" },

  // ── Norveška ─────────────────────────────────────────────────────────────────
  OSL: { city: "Oslo",           airport: "Oslo Gardermoen Airport",       country: "Norway" },

  // ── Švedska ──────────────────────────────────────────────────────────────────
  ARN: { city: "Stockholm",      airport: "Stockholm Arlanda Airport",     country: "Sweden" },

  // ── Danska ───────────────────────────────────────────────────────────────────
  CPH: { city: "Copenhagen",     airport: "Copenhagen Airport",            country: "Denmark" },

  // ── Finska ───────────────────────────────────────────────────────────────────
  HEL: { city: "Helsinki",       airport: "Helsinki Airport",              country: "Finland" },

  // ── Latvija ──────────────────────────────────────────────────────────────────
  RIX: { city: "Riga",           airport: "Riga International Airport",    country: "Latvia" },

  // ── Estonija ─────────────────────────────────────────────────────────────────
  TLL: { city: "Tallinn",        airport: "Tallinn Airport",               country: "Estonia" },

  // ── Litvanija ────────────────────────────────────────────────────────────────
  VNO: { city: "Vilnius",        airport: "Vilnius International Airport", country: "Lithuania" },

  // ── Armenija ─────────────────────────────────────────────────────────────────
  EVN: { city: "Yerevan",        airport: "Zvartnots International Airport", country: "Armenia" },

  // ── Azerbejdžan ──────────────────────────────────────────────────────────────
  GYD: { city: "Baku",           airport: "Heydar Aliyev Airport",         country: "Azerbaijan" },

  // ── Uzbekistan ───────────────────────────────────────────────────────────────
  TAS: { city: "Tashkent",       airport: "Islam Karimov International Airport", country: "Uzbekistan" },

  // ── Kuvajt ───────────────────────────────────────────────────────────────────
  KWI: { city: "Kuwait City",    airport: "Kuwait International Airport",  country: "Kuwait" },

  // ── UAE ──────────────────────────────────────────────────────────────────────
  DXB: { city: "Dubai",          airport: "Dubai International Airport",   country: "UAE" },
  AUH: { city: "Abu Dhabi",      airport: "Abu Dhabi International Airport", country: "UAE" },

  // ── Izrael ───────────────────────────────────────────────────────────────────
  TLV: { city: "Tel Aviv",       airport: "Ben Gurion Airport",            country: "Israel" },

  // ── Egipat ───────────────────────────────────────────────────────────────────
  SSH: { city: "Sharm el-Sheikh", airport: "Sharm el-Sheikh International Airport", country: "Egypt" },
  NBE: { city: "Enfidha",        airport: "Enfidha–Hammamet International Airport", country: "Tunisia" },

  // ── Kipar ────────────────────────────────────────────────────────────────────
  LCA: { city: "Larnaca",        airport: "Larnaca International Airport", country: "Cyprus" },

  // ── Norveška (Kristiansand) ───────────────────────────────────────────────────
  KRS: { city: "Kristiansand",   airport: "Kristiansand Airport",          country: "Norway" },

  // ── Francuska Gvajana / Brest ─────────────────────────────────────────────────
  BES: { city: "Brest",          airport: "Brest Bretagne Airport",        country: "France" },
};

export function getAirportInfo(iataCode) {
  return (
    AIRPORT_NAMES[iataCode] || {
      city: iataCode,
      airport: iataCode,
      country: "",
    }
  );
}