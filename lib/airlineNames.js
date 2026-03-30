// IATA kod aviokompanije → puni naziv
export const AIRLINE_NAMES = {
  // ── Postojeće ────────────────────────────────────────────────────────────────
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
  IZ: "Arkia Airlines",
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

  // ── Dodato ranije ───────────────────────────────────────────────────────────
  KC: "Air Astana",
  PC: "Pegasus Airlines",
  XQ: "SunExpress",
  A3: "Aegean Airlines",
  P3: "Air Astana (P3)",

  // ==================== NOVE Aviokompanije ====================
  
  // ── Zapadna Evropa ──────────────────────────────────────────────────────────
  AF: "Air France",
  KL: "KLM Royal Dutch Airlines",
  SN: "Brussels Airlines",
  LX: "Swiss International Air Lines",
  EI: "Aer Lingus",
  TP: "TAP Air Portugal",
  AZ: "ITA Airways",
  EN: "Air Dolomiti",
  HV: "Transavia Netherlands",
  V7: "Volotea",
  YW: "Air Nostrum",
  NT: "Binter Canarias",
  PM: "Canaryfly",
  UX: "Air Europa",
  JK: "Joon", // bivša, ali može se pojaviti
  VY: "Vueling", // već imamo ali dodajem puni naziv

  // ── Centralna i Istočna Evropa ──────────────────────────────────────────────
  OK: "Czech Airlines",
  QS: "Smartwings",
  WZ: "Red Wings Airlines",
  U6: "Ural Airlines",
  SU: "Aeroflot",
  FV: "Rossiya Airlines",
  DP: "Pobeda",
  S7: "S7 Airlines",
  PS: "Ukraine International Airlines",
  M9: "Motor Sich Airlines",
  RO: "TAROM",
  FB: "Bulgaria Air",
  JU: "Air Serbia", // već imamo
  
  OU: "Croatia Airlines",


  // ── Skandinavija ────────────────────────────────────────────────────────────
  AY: "Finnair",
  FI: "Icelandair",
  NY: "Air Iceland Connect",
  RC: "Atlantic Airways", // Farski otoci
  WF: "Widerøe",

  // ── Mediteran ───────────────────────────────────────────────────────────────
  A7: "Air Mediterranean",
  CY: "Cyprus Airways",
  GQ: "Sky Express",
  OA: "Olympic Air",
  B9: "Air Albania",
  Z6: "Albanian Airlines",
  GM: "Air Prishtina",
  KU: "Kuwait Airways",
  GF: "Gulf Air",
  WY: "Oman Air",
  QR: "Qatar Airways",
  EK: "Emirates",
  EY: "Etihad Airways",
  RJ: "Royal Jordanian",
  ME: "Middle East Airlines",
  RB: "Syrian Air",
  IA: "Iraqi Airways",
  IF: "Fly Baghdad",
  OV: "SalamAir",

  G9: "Air Arabia",
  "5W": "Wizz Air Abu Dhabi",
  NP: "Nile Air",
  MS: "EgyptAir",
  SM: "Air Cairo",
  AL: "Alexandria Airlines",
  UJ: "AlMasria Universal Airlines",

  // ── Kavkaz i Centralna Azija ────────────────────────────────────────────────
  A9: "Georgian Airways",
  M2: "MyWay Airlines",
  QF: "Qazaq Air",
  DV: "SCAT Airlines",
  YK: "Air Kirgizstan",
  T5: "Turkmenistan Airlines",
  SZ: "Somon Air", // Tadžikistan
  UT: "UTair Aviation",

  // ── Afrika (sjeverna) ───────────────────────────────────────────────────────
  AT: "Royal Air Maroc",
  TU: "Tunisair",
  UG: "Tunisair Express",
  AH: "Air Algérie",
  
  LN: "Libyan Airlines",

  // ── Rusija i ZND ────────────────────────────────────────────────────────────
  B2: "Belavia",
  EO: "Pegas Fly",
  Y7: "NordStar Airlines",
  IO: "IrAero",
  N4: "Nordwind Airlines",
  RL: "Royal Flight",
  ZF: "Azur Air",
  AZ: "Alrosa Air", // AZ je već ITA, pa koristimo drugi kod

  // ── Čarter i sezonski ───────────────────────────────────────────────────────
  X3: "TUI fly Germany",
  XT: "TUI fly Nordic",
  XR: "Corendon Airlines Europe",
  CAI: "Corendon Airlines", // nema IATA, koristimo CAI
  FH: "Freebird Airlines",
  H9: "Air Anatolia",
  KK: "AtlasGlobal",
  KZ: "Nok Air", // Azija
  YL: "Yamal Airlines",
  I2: "Iberia Express",
  O6: "Avianca Brazil", // južna Amerika
  Y4: "Volaris", // Meksiko

  // ── Dodatne low-cost ────────────────────────────────────────────────────────
  HG: "Niki", // bivša
  XR: "Corendon Airlines Europe",
  X3: "TUI fly Germany",
  XT: "TUI fly Nordic",
  "7O": "SmartLynx Airlines",
  YL: "Yamal Airlines",
  BZ: "Blue Air", // Rumunija
  H2: "Sky Airline",
  JY: "InterCaribbean Airways",

  // ── UAE i Zaliv ─────────────────────────────────────────────────────────────
  EK: "Emirates",
  EY: "Etihad Airways",
  QR: "Qatar Airways",
  FZ: "flydubai", // već imamo
  G9: "Air Arabia",
  "5W": "Wizz Air Abu Dhabi",
  OV: "SalamAir", // Oman
  WY: "Oman Air",
  KU: "Kuwait Airways", // već imamo
  GF: "Gulf Air", // Bahrein
  RJ: "Royal Jordanian", // Jordan
  IA: "Iraqi Airways",
  IF: "Fly Baghdad",
  RB: "Syrian Air",
  ME: "Middle East Airlines", // Libanon
};



export function getAirlineName(iataCode) {
  return AIRLINE_NAMES[iataCode] || iataCode;
}

// Airport IATA → grad, naziv aerodroma
export const AIRPORT_NAMES = {
  // ── Turska ──────────────────────────────────────────────────────────────────
  IST: { city: "Istanbul", airport: "İstanbul Havalimanı", country: "Turkey" },
  SAW: { city: "Istanbul", airport: "Sabiha Gökçen Airport", country: "Turkey" },
  AYT: { city: "Antalya", airport: "Antalya Airport", country: "Turkey" },
  ESB: { city: "Ankara", airport: "Esenboğa International Airport", country: "Turkey" },
  ADB: { city: "Izmir", airport: "Adnan Menderes Airport", country: "Turkey" },

  // ── Srbija ──────────────────────────────────────────────────────────────────
  BEG: { city: "Belgrade", airport: "Belgrade Nikola Tesla Airport", country: "Serbia" },
  INI: { city: "Niš", airport: "Constantine the Great Airport", country: "Serbia" },
  KVO: { city: "Kraljevo", airport: "Morava Airport", country: "Serbia" },

  // ── Crna Gora ────────────────────────────────────────────────────────────────
  TGD: { city: "Podgorica", airport: "Podgorica Airport", country: "Montenegro" },

  // ── Bosna i Hercegovina ──────────────────────────────────────────────────────
  RMO: { city: "Mostar", airport: "Mostar International Airport", country: "Bosnia & Herzegovina" },

  // ── Slovenija ────────────────────────────────────────────────────────────────
  LJU: { city: "Ljubljana", airport: "Ljubljana Jože Pučnik Airport", country: "Slovenia" },

  // ── Hrvatska ────────────────────────────────────────────────────────────────
  ZAG: { city: "Zagreb", airport: "Franjo Tuđman Airport", country: "Croatia" },
  SPU: { city: "Split", airport: "Split Airport", country: "Croatia" },
  DBV: { city: "Dubrovnik", airport: "Dubrovnik Airport", country: "Croatia" },
  ZAD: { city: "Zadar", airport: "Zadar Airport", country: "Croatia" },
  PUY: { city: "Pula", airport: "Pula Airport", country: "Croatia" },
  RJK: { city: "Rijeka", airport: "Rijeka Airport", country: "Croatia" },

  // ── Grčka ────────────────────────────────────────────────────────────────────
  ATH: { city: "Athens", airport: "Eleftherios Venizelos Airport", country: "Greece" },
  SKG: { city: "Thessaloniki", airport: "Thessaloniki Airport", country: "Greece" },
  HER: { city: "Heraklion", airport: "Heraklion International Airport", country: "Greece" },
  RHO: { city: "Rhodes", airport: "Rhodes International Airport", country: "Greece" },
  CHQ: { city: "Chania", airport: "Chania International Airport", country: "Greece" },
  CFU: { city: "Corfu", airport: "Corfu International Airport", country: "Greece" },
  ZTH: { city: "Zakynthos", airport: "Zakynthos International Airport", country: "Greece" },
  JMK: { city: "Mykonos", airport: "Mykonos Airport", country: "Greece" },
  JTR: { city: "Santorini", airport: "Santorini International Airport", country: "Greece" },

  // ── Italija ──────────────────────────────────────────────────────────────────
  BLQ: { city: "Bologna", airport: "Guglielmo Marconi Airport", country: "Italy" },
  SUF: { city: "Lamezia Terme", airport: "Lamezia Terme Airport", country: "Italy" },
  MXP: { city: "Milan", airport: "Milan Malpensa Airport", country: "Italy" },
  FCO: { city: "Rome", airport: "Leonardo da Vinci–Fiumicino Airport", country: "Italy" },
  CTA: { city: "Catania", airport: "Catania–Fontanarossa Airport", country: "Italy" },

  // ── UK ───────────────────────────────────────────────────────────────────────
  LHR: { city: "London", airport: "Heathrow Airport", country: "United Kingdom" },
  LGW: { city: "London", airport: "Gatwick Airport", country: "United Kingdom" },
  LTN: { city: "London", airport: "Luton Airport", country: "United Kingdom" },
  STN: { city: "London", airport: "Stansted Airport", country: "United Kingdom" },
  MAN: { city: "Manchester", airport: "Manchester Airport", country: "United Kingdom" },
  BRS: { city: "Bristol", airport: "Bristol Airport", country: "United Kingdom" },
  BHX: { city: "Birmingham", airport: "Birmingham Airport", country: "United Kingdom" },
  EDI: { city: "Edinburgh", airport: "Edinburgh Airport", country: "United Kingdom" },
  GLA: { city: "Glasgow", airport: "Glasgow Airport", country: "United Kingdom" },
  NCL: { city: "Newcastle", airport: "Newcastle Airport", country: "United Kingdom" },
  LBA: { city: "Leeds", airport: "Leeds Bradford Airport", country: "United Kingdom" },
  EMA: { city: "East Midlands", airport: "East Midlands Airport", country: "United Kingdom" },
  LPL: { city: "Liverpool", airport: "John Lennon Airport", country: "United Kingdom" },
  BOH: { city: "Bournemouth", airport: "Bournemouth Airport", country: "United Kingdom" },
  EXT: { city: "Exeter", airport: "Exeter Airport", country: "United Kingdom" },
  NQY: { city: "Newquay", airport: "Cornwall Airport Newquay", country: "United Kingdom" },

  // ── Francuska ────────────────────────────────────────────────────────────────
  CDG: { city: "Paris", airport: "Charles de Gaulle Airport", country: "France" },
  ORY: { city: "Paris", airport: "Orly Airport", country: "France" },
  BVA: { city: "Paris", airport: "Paris Beauvais Airport", country: "France" },
  LYS: { city: "Lyon", airport: "Lyon–Saint-Exupéry Airport", country: "France" },
  NTE: { city: "Nantes", airport: "Nantes Atlantique Airport", country: "France" },
  LIL: { city: "Lille", airport: "Lille Airport", country: "France" },
  PIS: { city: "Poitiers", airport: "Poitiers–Biard Airport", country: "France" },
  PUF: { city: "Pau", airport: "Pau Pyrénées Airport", country: "France" },
  SXB: { city: "Strasbourg", airport: "Strasbourg Airport", country: "France" },
  BES: { city: "Brest", airport: "Brest Bretagne Airport", country: "France" },
  NCE: { city: "Nice", airport: "Nice Côte d'Azur Airport", country: "France" },
  MRS: { city: "Marseille", airport: "Marseille Provence Airport", country: "France" },
  TLS: { city: "Toulouse", airport: "Toulouse–Blagnac Airport", country: "France" },
  BOD: { city: "Bordeaux", airport: "Bordeaux–Mérignac Airport", country: "France" },

  // ── Njemačka ─────────────────────────────────────────────────────────────────
  FRA: { city: "Frankfurt", airport: "Frankfurt Airport", country: "Germany" },
  MUC: { city: "Munich", airport: "Munich Airport", country: "Germany" },
  DUS: { city: "Düsseldorf", airport: "Düsseldorf Airport", country: "Germany" },
  HAM: { city: "Hamburg", airport: "Hamburg Airport", country: "Germany" },
  BER: { city: "Berlin", airport: "Berlin Brandenburg Airport", country: "Germany" },
  HAJ: { city: "Hannover", airport: "Hannover Airport", country: "Germany" },
  DRS: { city: "Dresden", airport: "Dresden Airport", country: "Germany" },
  NUE: { city: "Nuremberg", airport: "Nuremberg Airport", country: "Germany" },
  STR: { city: "Stuttgart", airport: "Stuttgart Airport", country: "Germany" },
  CGN: { city: "Cologne", airport: "Cologne Bonn Airport", country: "Germany" },
  FMO: { city: "Münster", airport: "Münster Osnabrück Airport", country: "Germany" },
  KSF: { city: "Kassel", airport: "Kassel Airport", country: "Germany" },
  DTM: { city: "Dortmund", airport: "Dortmund Airport", country: "Germany" },
  FKB: { city: "Baden-Baden", airport: "Karlsruhe/Baden-Baden Airport", country: "Germany" },
  FMM: { city: "Memmingen", airport: "Memmingen Airport", country: "Germany" },

  // ── Austrija ─────────────────────────────────────────────────────────────────
  VIE: { city: "Vienna", airport: "Vienna International Airport", country: "Austria" },
  LNZ: { city: "Linz", airport: "Linz Airport", country: "Austria" },
  SZG: { city: "Salzburg", airport: "Salzburg Airport", country: "Austria" },
  GRZ: { city: "Graz", airport: "Graz Airport", country: "Austria" },

  // ── Švicarska ────────────────────────────────────────────────────────────────
  ZRH: { city: "Zurich", airport: "Zurich Airport", country: "Switzerland" },
  GVA: { city: "Geneva", airport: "Geneva Airport", country: "Switzerland" },
  BSL: { city: "Basel", airport: "EuroAirport Basel", country: "Switzerland" },

  // ── Belgija ──────────────────────────────────────────────────────────────────
  BRU: { city: "Brussels", airport: "Brussels Airport", country: "Belgium" },
  CRL: { city: "Brussels", airport: "Brussels South Charleroi Airport", country: "Belgium" },
  ANR: { city: "Antwerp", airport: "Antwerp International Airport", country: "Belgium" },

  // ── Luksemburg ───────────────────────────────────────────────────────────────
  LUX: { city: "Luxembourg", airport: "Luxembourg Airport", country: "Luxembourg" },

  // ── Nizozemska ───────────────────────────────────────────────────────────────
  AMS: { city: "Amsterdam", airport: "Amsterdam Airport Schiphol", country: "Netherlands" },
  MST: { city: "Maastricht", airport: "Maastricht Aachen Airport", country: "Netherlands" },
  EIN: { city: "Eindhoven", airport: "Eindhoven Airport", country: "Netherlands" },
  RTM: { city: "Rotterdam", airport: "Rotterdam The Hague Airport", country: "Netherlands" },

  // ── Španija ──────────────────────────────────────────────────────────────────
  BCN: { city: "Barcelona", airport: "Barcelona–El Prat Airport", country: "Spain" },
  MAD: { city: "Madrid", airport: "Adolfo Suárez Madrid–Barajas", country: "Spain" },
  PMI: { city: "Palma", airport: "Palma de Mallorca Airport", country: "Spain" },

  // ── Portugal ─────────────────────────────────────────────────────────────────
  LIS: { city: "Lisbon", airport: "Humberto Delgado Airport", country: "Portugal" },
  OPO: { city: "Porto", airport: "Francisco Sá Carneiro Airport", country: "Portugal" },
  FAO: { city: "Faro", airport: "Faro Airport", country: "Portugal" },
  FNC: { city: "Funchal", airport: "Madeira Airport", country: "Portugal" },

  // ── Irska ────────────────────────────────────────────────────────────────────
  DUB: { city: "Dublin", airport: "Dublin Airport", country: "Ireland" },
  SNN: { city: "Shannon", airport: "Shannon Airport", country: "Ireland" },
  ORK: { city: "Cork", airport: "Cork Airport", country: "Ireland" },

  // ── Skandinavija ────────────────────────────────────────────────────────────
  OSL: { city: "Oslo", airport: "Oslo Gardermoen Airport", country: "Norway" },
  BGO: { city: "Bergen", airport: "Bergen Flesland Airport", country: "Norway" },
  SVG: { city: "Stavanger", airport: "Stavanger Airport", country: "Norway" },
  TRD: { city: "Trondheim", airport: "Trondheim Airport", country: "Norway" },
  KRS: { city: "Kristiansand", airport: "Kristiansand Airport", country: "Norway" },

  ARN: { city: "Stockholm", airport: "Stockholm Arlanda Airport", country: "Sweden" },
  GOT: { city: "Gothenburg", airport: "Göteborg Landvetter Airport", country: "Sweden" },
  MMX: { city: "Malmö", airport: "Malmö Airport", country: "Sweden" },

  CPH: { city: "Copenhagen", airport: "Copenhagen Airport", country: "Denmark" },
  BLL: { city: "Billund", airport: "Billund Airport", country: "Denmark" },
  AAL: { city: "Aalborg", airport: "Aalborg Airport", country: "Denmark" },

  HEL: { city: "Helsinki", airport: "Helsinki Airport", country: "Finland" },
  TMP: { city: "Tampere", airport: "Tampere–Pirkkala Airport", country: "Finland" },

  KEF: { city: "Reykjavik", airport: "Keflavík International Airport", country: "Iceland" },
  RKV: { city: "Reykjavik", airport: "Reykjavík Airport", country: "Iceland" },

  // ── Češka ────────────────────────────────────────────────────────────────────
  PRG: { city: "Prague", airport: "Václav Havel Airport", country: "Czech Republic" },
  BRQ: { city: "Brno", airport: "Brno–Tuřany Airport", country: "Czech Republic" },

  // ── Slovačka ─────────────────────────────────────────────────────────────────
  BTS: { city: "Bratislava", airport: "Milan Rastislav Štefánik Airport", country: "Slovakia" },

  // ── Poljska ──────────────────────────────────────────────────────────────────
  WAW: { city: "Warsaw", airport: "Chopin Airport", country: "Poland" },
  KRK: { city: "Krakow", airport: "Krakow Airport", country: "Poland" },
  KTW: { city: "Katowice", airport: "Katowice Airport", country: "Poland" },
  GDN: { city: "Gdańsk", airport: "Gdańsk Lech Wałęsa Airport", country: "Poland" },
  WRO: { city: "Wrocław", airport: "Wrocław Airport", country: "Poland" },
  POZ: { city: "Poznań", airport: "Poznań–Ławica Airport", country: "Poland" },
  RZE: { city: "Rzeszów", airport: "Rzeszów–Jasionka Airport", country: "Poland" },

  // ── Mađarska ─────────────────────────────────────────────────────────────────
  BUD: { city: "Budapest", airport: "Budapest Liszt Ferenc Airport", country: "Hungary" },
  DEB: { city: "Debrecen", airport: "Debrecen International Airport", country: "Hungary" },

  // ── Rumunija ─────────────────────────────────────────────────────────────────
  OTP: { city: "Bucharest", airport: "Henri Coandă International Airport", country: "Romania" },
  CLJ: { city: "Cluj-Napoca", airport: "Cluj International Airport", country: "Romania" },
  TSR: { city: "Timișoara", airport: "Timișoara Traian Vuia International Airport", country: "Romania" },
  IAS: { city: "Iași", airport: "Iași International Airport", country: "Romania" },

  // ── Bugarska ─────────────────────────────────────────────────────────────────
  SOF: { city: "Sofia", airport: "Sofia Airport", country: "Bulgaria" },
  BOJ: { city: "Burgas", airport: "Burgas Airport", country: "Bulgaria" },
  VAR: { city: "Varna", airport: "Varna Airport", country: "Bulgaria" },

  // ── Severna Makedonija ───────────────────────────────────────────────────────
  SKP: { city: "Skopje", airport: "Skopje International Airport", country: "North Macedonia" },
  OHD: { city: "Ohrid", airport: "Ohrid St. Paul the Apostle Airport", country: "North Macedonia" },

  // ── Albanija ─────────────────────────────────────────────────────────────────
  TIA: { city: "Tirana", airport: "Tirana International Airport", country: "Albania" },

  // ── Malta ────────────────────────────────────────────────────────────────────
  MLA: { city: "Malta", airport: "Malta International Airport", country: "Malta" },

  // ── Kipar ────────────────────────────────────────────────────────────────────
  LCA: { city: "Larnaca", airport: "Larnaca International Airport", country: "Cyprus" },
  PFO: { city: "Paphos", airport: "Paphos International Airport", country: "Cyprus" },

  // ── Ukrajina ─────────────────────────────────────────────────────────────────
  KBP: { city: "Kyiv", airport: "Boryspil International Airport", country: "Ukraine" },
  LWO: { city: "Lviv", airport: "Lviv Danylo Halytskyi International Airport", country: "Ukraine" },
  ODS: { city: "Odesa", airport: "Odesa International Airport", country: "Ukraine" },

  // ── Rusija ───────────────────────────────────────────────────────────────────
  MHD: { city: "Moscow", airport: "Domodedovo International Airport", country: "Russia" },
  SVO: { city: "Moscow", airport: "Sheremetyevo International Airport", country: "Russia" },
  VKO: { city: "Moscow", airport: "Vnukovo International Airport", country: "Russia" },
  LED: { city: "St. Petersburg", airport: "Pulkovo Airport", country: "Russia" },
  KZN: { city: "Kazan", airport: "Kazan International Airport", country: "Russia" },
  SVX: { city: "Yekaterinburg", airport: "Koltsovo Airport", country: "Russia" },

  // ── Bliski istok i UAE ──────────────────────────────────────────────────────
  DXB: { city: "Dubai", airport: "Dubai International Airport", country: "UAE" },
  DWC: { city: "Dubai", airport: "Al Maktoum International Airport", country: "UAE" },
  AUH: { city: "Abu Dhabi", airport: "Abu Dhabi International Airport", country: "UAE" },
  SHJ: { city: "Sharjah", airport: "Sharjah International Airport", country: "UAE" },
  RKT: { city: "Ras Al Khaimah", airport: "Ras Al Khaimah International Airport", country: "UAE" },

  DOH: { city: "Doha", airport: "Hamad International Airport", country: "Qatar" },

  BAH: { city: "Manama", airport: "Bahrain International Airport", country: "Bahrain" },

  KWI: { city: "Kuwait City", airport: "Kuwait International Airport", country: "Kuwait" },

  MCT: { city: "Muscat", airport: "Muscat International Airport", country: "Oman" },
  SLL: { city: "Salalah", airport: "Salalah Airport", country: "Oman" },

  RUH: { city: "Riyadh", airport: "King Khalid International Airport", country: "Saudi Arabia" },
  JED: { city: "Jeddah", airport: "King Abdulaziz International Airport", country: "Saudi Arabia" },
  DMM: { city: "Dammam", airport: "King Fahd International Airport", country: "Saudi Arabia" },
  MED: { city: "Medina", airport: "Prince Mohammad bin Abdulaziz Airport", country: "Saudi Arabia" },

  AMM: { city: "Amman", airport: "Queen Alia International Airport", country: "Jordan" },
  AQJ: { city: "Aqaba", airport: "King Hussein International Airport", country: "Jordan" },

  BEY: { city: "Beirut", airport: "Beirut–Rafic Hariri International Airport", country: "Lebanon" },

  DAM: { city: "Damascus", airport: "Damascus International Airport", country: "Syria" },

  BGW: { city: "Baghdad", airport: "Baghdad International Airport", country: "Iraq" },
  EBL: { city: "Erbil", airport: "Erbil International Airport", country: "Iraq" },
  BSR: { city: "Basra", airport: "Basra International Airport", country: "Iraq" },

  IKA: { city: "Tehran", airport: "Imam Khomeini International Airport", country: "Iran" },
  THR: { city: "Tehran", airport: "Mehrabad International Airport", country: "Iran" },
  MHD: { city: "Mashhad", airport: "Mashhad International Airport", country: "Iran" },
  SYZ: { city: "Shiraz", airport: "Shiraz International Airport", country: "Iran" },

  TLV: { city: "Tel Aviv", airport: "Ben Gurion Airport", country: "Israel" },

  // ── Kavkaz ───────────────────────────────────────────────────────────────────
  EVN: { city: "Yerevan", airport: "Zvartnots International Airport", country: "Armenia" },

  GYD: { city: "Baku", airport: "Heydar Aliyev International Airport", country: "Azerbaijan" },
  NAJ: { city: "Nakhchivan", airport: "Nakhchivan International Airport", country: "Azerbaijan" },

  TBS: { city: "Tbilisi", airport: "Tbilisi International Airport", country: "Georgia" },
  BUS: { city: "Batumi", airport: "Batumi International Airport", country: "Georgia" },
  KUT: { city: "Kutaisi", airport: "David the Builder Kutaisi International Airport", country: "Georgia" },

  // ── Centralna Azija ──────────────────────────────────────────────────────────
  TAS: { city: "Tashkent", airport: "Islam Karimov Tashkent International Airport", country: "Uzbekistan" },
  SKD: { city: "Samarkand", airport: "Samarkand International Airport", country: "Uzbekistan" },
  BHK: { city: "Bukhara", airport: "Bukhara International Airport", country: "Uzbekistan" },

  ALA: { city: "Almaty", airport: "Almaty International Airport", country: "Kazakhstan" },
  NQZ: { city: "Astana", airport: "Nursultan Nazarbayev International Airport", country: "Kazakhstan" },
  SCO: { city: "Aktau", airport: "Aktau Airport", country: "Kazakhstan" },
  GUW: { city: "Atyrau", airport: "Atyrau Airport", country: "Kazakhstan" },

  FRU: { city: "Bishkek", airport: "Manas International Airport", country: "Kyrgyzstan" },

  DYU: { city: "Dushanbe", airport: "Dushanbe International Airport", country: "Tajikistan" },

  ASB: { city: "Ashgabat", airport: "Ashgabat International Airport", country: "Turkmenistan" },

  // ── Sjeverna Afrika ──────────────────────────────────────────────────────────
  CMN: { city: "Casablanca", airport: "Mohammed V International Airport", country: "Morocco" },
  RAK: { city: "Marrakech", airport: "Marrakesh Menara Airport", country: "Morocco" },
  TNG: { city: "Tangier", airport: "Tangier Ibn Battouta Airport", country: "Morocco" },
  AGA: { city: "Agadir", airport: "Agadir–Al Massira Airport", country: "Morocco" },
  FEZ: { city: "Fez", airport: "Fès–Saïss Airport", country: "Morocco" },

  TUN: { city: "Tunis", airport: "Tunis–Carthage International Airport", country: "Tunisia" },
  MIR: { city: "Monastir", airport: "Monastir Habib Bourguiba International Airport", country: "Tunisia" },
  DJE: { city: "Djerba", airport: "Djerba–Zarzis International Airport", country: "Tunisia" },
  NBE: { city: "Enfidha", airport: "Enfidha–Hammamet International Airport", country: "Tunisia" },

  ALG: { city: "Algiers", airport: "Houari Boumediene Airport", country: "Algeria" },
  ORN: { city: "Oran", airport: "Oran Es Sénia Airport", country: "Algeria" },

  CAI: { city: "Cairo", airport: "Cairo International Airport", country: "Egypt" },
  HRG: { city: "Hurghada", airport: "Hurghada International Airport", country: "Egypt" },
  SSH: { city: "Sharm el Sheikh", airport: "Sharm el Sheikh International Airport", country: "Egypt" },
  LXR: { city: "Luxor", airport: "Luxor International Airport", country: "Egypt" },
  RMF: { city: "Marsa Alam", airport: "Marsa Alam International Airport", country: "Egypt" },

  TIP: { city: "Tripoli", airport: "Tripoli International Airport", country: "Libya" },
  BEN: { city: "Benghazi", airport: "Benina International Airport", country: "Libya" },
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