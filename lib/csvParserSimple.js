// lib/csvParserSimple.js
import Papa from "papaparse";
import { getAirlineName, getAirportInfo } from "./airlineNames";

export function formatMonthDay(raw) {
  if (!raw) return "";
  const s = raw.toString().trim();
  
  // Format: "May 13th" -> "13 May"
  const match = s.match(/([A-Za-z]+)\s+(\d+)(?:st|nd|rd|th)?/);
  if (match) {
    const month = match[1];
    const day = match[2];
    return `${day} ${month}`;
  }
  
  return s;
}

export function parseSimpleTimetableCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  
  const rows = result.data.filter(row => {
    const airport = row.Airport?.toString().trim();
    const airline = row.Airline?.toString().trim();
    const startOps = row["Start of Operations"]?.toString().trim();
    
    if (!airport || airport === "") return false;
    if (!airline || airline === "") return false;
    if (!startOps || startOps === "") return false;
    
    return true;
  });
  
  // Grupisanje po aerodromu
  const grouped = {};
  
  for (const row of rows) {
    let airportStr = row.Airport?.toString().trim();
    
    // Ekstraktuj IATA kod iz stringa kao "AMSTERDAM (AMS)"
    const iataMatch = airportStr.match(/\(([A-Z]{3})\)/);
    let airportCode = "";
    let airportCity = airportStr;
    
    if (iataMatch) {
      airportCode = iataMatch[1];
      airportCity = airportStr.replace(`(${airportCode})`, "").trim();
    } else {
      // Pokušaj da pronađeš kod po imenu
      const airportMap = {
        "AMSTERDAM": "AMS",
        "BAKU": "GYD",
        "BARCELONA": "BCN",
        "BERLIN": "BER",
        "BELGRADE": "BEG",
        "BRISTOL": "BRS",
        "BIRMINGHAM": "BHX",
        "BRUSSELS": "BRU",
        "BRNO": "BRQ",
        "COPENHAGEN": "CPH",
        "CHISINAU": "RMO",
        "DUBAI": "DXB",
        "DUSSELDORF": "DUS",
        "FRANKFURT": "FRA",
        "GENEVA": "GVA",
        "HELSINKI": "HEL",
        "ISTANBUL": "IST",
        "KATOWICE": "KTW",
        "KRALJEVO": "KVO",
        "KUWAIT": "KWI"
      };
      airportCode = airportMap[airportCity] || airportCity.substring(0, 3);
    }
    
    // Parsiranje avio kompanija (mogu biti više, odvojene zarezom)
    const airlineStr = row.Airline?.toString().trim();
    const airlines = airlineStr.split(',').map(a => a.trim());
    
    const startDate = formatMonthDay(row["Start of Operations"]?.toString().trim());
    
    if (!grouped[airportCode]) {
      grouped[airportCode] = {
        airportCode,
        city: airportCity,
        ...getAirportInfo(airportCode),
        flights: [],
      };
    }
    
    for (const airline of airlines) {
      // Pronađi IATA kod aviokompanije
      let airlineCode = "";
      const airlineMap = {
        "TUI Fly": "OR",
        "TUI Fly Belgium": "TB",
        "Azerbaijan Airlines": "J2",
        "Vueling": "VY",
        "easyJet": "U2",
        "Eurowings": "EW",
        "Air Montenegro": "4O",
        "Air Serbia": "JU",
        "Jet2.com": "LS",
        "SAS": "SK",
        "Norwegian": "DY",
        "SkyUp MT": "U5",
        "Fly One": "5F",
        "Flydubai": "FZ",
        "Lufthansa": "LH",
        "Turkish Airlines": "TK",
        "LOT Polish": "LO",
        "Jazeera Airways": "J9"
      };
      
      for (const [name, code] of Object.entries(airlineMap)) {
        if (airline.includes(name)) {
          airlineCode = code;
          break;
        }
      }
      
      if (!airlineCode) {
        airlineCode = airline.substring(0, 2).toUpperCase();
      }
      
      grouped[airportCode].flights.push({
        airline: getAirlineName(airlineCode),
        airlineCode: airlineCode,
        startDate: startDate,
        rawStartDate: row["Start of Operations"]?.toString().trim(),
      });
    }
  }
  
  // Sortiranje po gradu
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const cityA = grouped[a].city || a;
    const cityB = grouped[b].city || b;
    return cityA.localeCompare(cityB);
  });
  
  return sortedKeys.map(k => ({
    ...grouped[k],
    flights: grouped[k].flights.sort((a, b) => {
      // Sortiranje po datumu (prioritet za year-round)
      if (a.startDate === "Year-round" && b.startDate !== "Year-round") return -1;
      if (a.startDate !== "Year-round" && b.startDate === "Year-round") return 1;
      return a.startDate.localeCompare(b.startDate);
    }),
  }));
}