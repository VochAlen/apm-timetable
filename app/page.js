"use client";

import { useState, useRef, useEffect } from "react";
import { parseTimetableCSV, parseTimetableJSON } from "../lib/csvParser";
import { parseArrivalsNewCSV, parseDeparturesNewCSV } from "../lib/csvParserNew";
import { generateTimetablePDF, downloadPDF } from "../lib/pdfGenerator";

// ── Stil konstante ────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e8f0fe 0%, #f0f7ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    transition: "background 0.3s ease",
  },
  header: {
    background: "linear-gradient(90deg, #00467f 0%, #0077b6 100%)",
    color: "white",
    borderRadius: "16px",
    padding: "32px 48px",
    marginBottom: "32px",
    textAlign: "center",
    width: "100%",
    maxWidth: "720px",
    boxShadow: "0 8px 32px rgba(0,70,127,0.18)",
    position: "relative",
    transition: "all 0.3s ease",
  },
  headerSubtitle: {
    margin: "8px 0 0",
    opacity: 0.85,
    fontSize: "15px",
    fontWeight: 400,
  },
  languageSwitcher: {
    position: "absolute",
    top: "16px",
    right: "20px",
    display: "flex",
    gap: "8px",
  },
  langBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "11px",
    fontWeight: 600,
    cursor: "pointer",
    color: "white",
    transition: "all 0.2s",
  },
  langBtnActive: {
    background: "rgba(255,255,255,0.4)",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "24px",
    width: "100%",
    maxWidth: "720px",
    boxShadow: "0 4px 24px rgba(0,70,127,0.08)",
    transition: "all 0.3s ease",
  },
  label: {
    display: "block",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#00467f",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #c8d8e8",
    borderRadius: "8px",
    fontSize: "14px",
    background: "#f8fbff",
    boxSizing: "border-box",
    marginBottom: "16px",
    transition: "all 0.2s",
  },
  fileInput: {
    width: "100%",
    padding: "10px 14px",
    border: "2px dashed #b0c8e0",
    borderRadius: "8px",
    fontSize: "14px",
    background: "#f0f7ff",
    boxSizing: "border-box",
    marginBottom: "16px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  fileInputDragOver: {
    border: "2px solid #0077b6",
    background: "#e8f0fe",
  },
  row: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  btnArrivals: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(90deg, #0077b6, #00b4d8)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
    letterSpacing: "0.02em",
  },
  btnDepartures: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(90deg, #00467f, #0077b6)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
    letterSpacing: "0.02em",
  },
  btnSecondary: {
    padding: "10px 20px",
    background: "#e8f0fe",
    color: "#00467f",
    border: "1px solid #c8d8e8",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  status: {
    marginTop: "16px",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
  },
  statusOk: {
    background: "#e0f5e9",
    color: "#1b7f3a",
    border: "1px solid #a8dbb5",
  },
  statusErr: {
    background: "#fde8e8",
    color: "#c0392b",
    border: "1px solid #f5b7b1",
  },
  statusInfo: {
    background: "#e8f0fe",
    color: "#2563eb",
    border: "1px solid #bfcffc",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#00467f",
    marginBottom: "20px",
    marginTop: 0,
    borderBottom: "2px solid #e0eaf5",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tip: {
    fontSize: "12px",
    color: "#6b7a99",
    marginTop: "-10px",
    marginBottom: "16px",
  },
  preview: {
    marginTop: "20px",
    padding: "16px",
    background: "#f8fbff",
    borderRadius: "12px",
    border: "1px solid #e0eaf5",
    maxHeight: "300px",
    overflow: "auto",
  },
  previewTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#00467f",
    marginBottom: "12px",
  },
  previewList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  previewItem: {
    padding: "8px",
    borderBottom: "1px solid #e0eaf5",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  badge: {
    background: "#00467f",
    color: "white",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: 600,
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "400px",
    width: "90%",
  },
  configRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
  },
  configInput: {
    flex: 1,
  },
};

// Dark mode stilovi - samo za karticu i elemente unutar nje
const darkStyles = {
  card: {
    background: "#1e2a36",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
  },
  label: {
    color: "#00b4d8",
  },
  input: {
    background: "#2a3a48",
    border: "1px solid #3a4a58",
    color: "#e8f0fe",
  },
  fileInput: {
    background: "#2a3a48",
    border: "2px dashed #4a5a68",
    color: "#e8f0fe",
  },
  sectionTitle: {
    color: "#00b4d8",
    borderBottom: "2px solid #2a3a48",
  },
  tip: {
    color: "#8a9aad",
  },
  preview: {
    background: "#1e2a36",
    border: "1px solid #2a3a48",
  },
  previewTitle: {
    color: "#00b4d8",
  },
  previewItem: {
    borderBottom: "1px solid #2a3a48",
    color: "#e8f0fe",
  },
  btnSecondary: {
    background: "#2a3a48",
    color: "#00b4d8",
    border: "1px solid #3a4a58",
  },
  status: {
    background: "#1e2a36",
    border: "none",
  },
  statusOk: {
    background: "#1a3a2a",
    color: "#6bdc8c",
  },
  statusErr: {
    background: "#3a2a2a",
    color: "#ff8a7a",
  },
  statusInfo: {
    background: "#1a2a3a",
    color: "#6b9adc",
  },
  modalContent: {
    background: "#1e2a36",
  },
};

const TAB_CSV = "csv";
const TAB_NEW_CSV = "newcsv";
const TAB_JSON = "json";

// Tekstovi za različite jezike
const translations = {
  en: {
    title: "Airport Timetable",
    subtitle: "Seasonal Timetable PDF Generator",
    airportConfig: "Airport Configuration",
    airportName: "Airport Name",
    airportIATA: "IATA Code",
    airportICAO: "ICAO Code",
    arrivalsSubtitle: "Arrivals Subtitle",
    departuresSubtitle: "Departures Subtitle",
    seasonConfig: "Season Configuration",
    seasonLabel: "Season Label",
    periodLabel: "Period",
    dataFormat: "Data Format",
    csvFile: "CSV File (Old Format)",
    newCsvFile: "CSV File (New Format)",
    jsonFile: "JSON Input",
    departures: "Departures",
    arrivals: "Arrivals",
    generatePDF: "Generate PDF",
    generateBoth: "Generate Both PDFs",
    uploadCSV: "Upload CSV file",
    uploadJSON: "Upload JSON file",
    orPasteJSON: "Or paste JSON here",
    preview: "Preview",
    flights: "flights",
    destinations: "destinations",
    loading: "Generating...",
    error: "Error",
    success: "Success",
    noData: "No recognizable data",
    disclaimer: "Timetable presents scheduled data. All times are local. Airlines retain the right to make changes. Passengers should verify information with airlines or their travel agents.",
    search: "Search destinations...",
    history: "History",
    sendEmail: "Send to email",
    export: "Export",
    close: "Close",
    repeat: "Repeat",
    noHistory: "No previous PDFs generated",
    emailPlaceholder: "email@example.com",
    send: "Send",
    cancel: "Cancel",
    more: "more",
    destinations_count: "destinations",
  },
  me: {
    title: "Aerodrom",
    subtitle: "Generator reda letenja",
    airportConfig: "Konfiguracija aerodroma",
    airportName: "Naziv aerodroma",
    airportIATA: "IATA kod",
    airportICAO: "ICAO kod",
    arrivalsSubtitle: "Podnaslov za dolaske",
    departuresSubtitle: "Podnaslov za polaske",
    seasonConfig: "Konfiguracija sezone",
    seasonLabel: "Oznaka sezone",
    periodLabel: "Period",
    dataFormat: "Format podataka",
    csvFile: "CSV fajl (Stari format)",
    newCsvFile: "CSV fajl (Novi format)",
    jsonFile: "JSON unos",
    departures: "Polasci",
    arrivals: "Dolasci",
    generatePDF: "Generiši PDF",
    generateBoth: "Generiši oba PDF-a",
    uploadCSV: "Učitaj CSV fajl",
    uploadJSON: "Učitaj JSON fajl",
    orPasteJSON: "Ili zalijepi JSON ovdje",
    preview: "Pregled",
    flights: "letova",
    destinations: "destinacija",
    loading: "Generišem...",
    error: "Greška",
    success: "Uspješno",
    noData: "Nema prepoznatljivih podataka",
    disclaimer: "Red letenja prikazuje planirane podatke. Sva vremena su lokalna. Aviokompanije zadržavaju pravo izmjena. Preporučujemo provjeru informacija sa aviokompanijama. Made by Alen, Tivat Airport 2026",
    search: "Pretraži destinacije...",
    history: "Historija",
    sendEmail: "Pošalji na email",
    export: "Izvoz",
    close: "Zatvori",
    repeat: "Ponovi",
    noHistory: "Nema prethodno generisanih PDF-ova",
    emailPlaceholder: "email@example.com",
    send: "Pošalji",
    cancel: "Odustani",
    more: "više",
    destinations_count: "destinacija",
  },
  sr: {
    title: "Aerodrom",
    subtitle: "Generator reda letenja",
    airportConfig: "Konfiguracija aerodroma",
    airportName: "Naziv aerodroma",
    airportIATA: "IATA kod",
    airportICAO: "ICAO kod",
    arrivalsSubtitle: "Podnaslov za dolaske",
    departuresSubtitle: "Podnaslov za polaske",
    seasonConfig: "Konfiguracija sezone",
    seasonLabel: "Oznaka sezone",
    periodLabel: "Period",
    dataFormat: "Format podataka",
    csvFile: "CSV fajl (Stari format)",
    newCsvFile: "CSV fajl (Novi format)",
    jsonFile: "JSON unos",
    departures: "Polasci",
    arrivals: "Dolasci",
    generatePDF: "Generiši PDF",
    generateBoth: "Generiši oba PDF-a",
    uploadCSV: "Učitaj CSV fajl",
    uploadJSON: "Učitaj JSON fajl",
    orPasteJSON: "Ili nalepi JSON ovde",
    preview: "Pregled",
    flights: "letova",
    destinations: "destinacija",
    loading: "Generišem...",
    error: "Greška",
    success: "Uspešno",
    noData: "Nema prepoznatljivih podataka",
    disclaimer: "Red letenja prikazuje planirane podatke. Sva vremena su lokalna. Aviokompanije zadržavaju pravo izmena. Preporučujemo proveru informacija sa aviokompanijama.",
    search: "Pretraži destinacije...",
    history: "Istorija",
    sendEmail: "Pošalji na email",
    export: "Izvoz",
    close: "Zatvori",
    repeat: "Ponovi",
    noHistory: "Nema prethodno generisanih PDF-ova",
    emailPlaceholder: "email@example.com",
    send: "Pošalji",
    cancel: "Odustani",
    more: "više",
    destinations_count: "destinacija",
  },
};

export default function Home() {
  const [lang, setLang] = useState("me");
  const t = translations[lang];

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Konfiguracija aerodroma
  const [airportName, setAirportName] = useState("Tivat");
  const [airportIATA, setAirportIATA] = useState("TIV");
  const [airportICAO, setAirportICAO] = useState("LYTV");
  const [arrivalsSubtitle, setArrivalsSubtitle] = useState("Dolasci na aerodrom");
  const [departuresSubtitle, setDeparturesSubtitle] = useState("Polasci sa aerodroma");

  // Sezona
  const [season, setSeason] = useState("S26 – Summer 2026");
  const [period, setPeriod] = useState("30 MAR 2026 – 24 OCT 2026");

  // Tab
  const [tab, setTab] = useState(TAB_CSV);

  // Old CSV state
  const [depFile, setDepFile] = useState(null);
  const [arrFile, setArrFile] = useState(null);
  const [depPreview, setDepPreview] = useState(null);
  const [arrPreview, setArrPreview] = useState(null);
  const [depSearch, setDepSearch] = useState("");
  const [arrSearch, setArrSearch] = useState("");

  // New CSV state
  const [newDepFile, setNewDepFile] = useState(null);
  const [newArrFile, setNewArrFile] = useState(null);
  const [newDepPreview, setNewDepPreview] = useState(null);
  const [newArrPreview, setNewArrPreview] = useState(null);
  const [newDepSearch, setNewDepSearch] = useState("");
  const [newArrSearch, setNewArrSearch] = useState("");

  // JSON state
  const [jsonText, setJsonText] = useState("");
  const [jsonFile, setJsonFile] = useState(null);
  const [jsonDocType, setJsonDocType] = useState("departures");
  const [jsonPreview, setJsonPreview] = useState(null);
  const [jsonSearch, setJsonSearch] = useState("");

  // History
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Email dialog
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [currentPdfData, setCurrentPdfData] = useState(null);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Drag & drop state for old CSV
  const [depDragOver, setDepDragOver] = useState(false);
  const [arrDragOver, setArrDragOver] = useState(false);
  
  // Drag & drop state for new CSV
  const [newDepDragOver, setNewDepDragOver] = useState(false);
  const [newArrDragOver, setNewArrDragOver] = useState(false);
  
  // Separate refs for each file input
  const depFileInputRef = useRef(null);
  const arrFileInputRef = useRef(null);
  const newDepFileInputRef = useRef(null);
  const newArrFileInputRef = useRef(null);

  // Učitaj history i dark mode iz localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("tivat_pdf_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    const savedDarkMode = localStorage.getItem("tivat_dark_mode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    // Učitaj sačuvanu konfiguraciju aerodroma
    const savedAirportConfig = localStorage.getItem("airport_config");
    if (savedAirportConfig) {
      const config = JSON.parse(savedAirportConfig);
      setAirportName(config.name || "Tivat");
      setAirportIATA(config.iata || "TIV");
      setAirportICAO(config.icao || "LYTV");
      setArrivalsSubtitle(config.arrivalsSubtitle || "Dolasci na aerodrom");
      setDeparturesSubtitle(config.departuresSubtitle || "Polasci sa aerodroma");
    }
  }, []);

  // Sačuvaj konfiguraciju aerodroma
  const saveAirportConfig = () => {
    const config = {
      name: airportName,
      iata: airportIATA,
      icao: airportICAO,
      arrivalsSubtitle: arrivalsSubtitle,
      departuresSubtitle: departuresSubtitle,
    };
    localStorage.setItem("airport_config", JSON.stringify(config));
    setStatus({ type: "ok", msg: "Konfiguracija aerodroma sačuvana" });
  };

  // Sačuvaj generisani PDF u history
  const saveToHistory = (filename, type, destinations, data) => {
    const newEntry = {
      id: Date.now(),
      filename,
      type,
      destinations,
      date: new Date().toLocaleString(),
      season,
      period,
      airportConfig: {
        name: airportName,
        iata: airportIATA,
        icao: airportICAO,
        arrivalsSubtitle: arrivalsSubtitle,
        departuresSubtitle: departuresSubtitle,
      },
      data: data,
    };
    const newHistory = [newEntry, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem("tivat_pdf_history", JSON.stringify(newHistory));
  };

  // Helper za generisanje PDF-a sa trenutnom konfiguracijom aerodroma
  const generateAndDownloadPDF = (grouped, type, filename) => {
    const airportConfig = {
      name: airportName,
      iata: airportIATA,
      icao: airportICAO,
      subtitle: type === "arrivals" ? arrivalsSubtitle : departuresSubtitle,
    };
    const pdf = generateTimetablePDF(grouped, type, season, period, airportConfig);
    downloadPDF(pdf, filename);
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function readFileText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // Old CSV preview
  async function previewOldCSV(file) {
    if (!file) return null;
    try {
      const text = await readFileText(file);
      const grouped = parseTimetableCSV(text);
      return grouped;
    } catch (err) {
      return null;
    }
  }

  // New CSV preview
  async function previewNewCSV(file, isArrivals) {
    if (!file) return null;
    try {
      const text = await readFileText(file);
      const grouped = isArrivals ? parseArrivalsNewCSV(text) : parseDeparturesNewCSV(text);
      return grouped;
    } catch (err) {
      console.error("Preview error:", err);
      return null;
    }
  }

  // Old CSV handlers
  async function handleDepartureFileChange(file) {
    setDepFile(file);
    const preview = await previewOldCSV(file);
    setDepPreview(preview);
  }

  async function handleArrivalFileChange(file) {
    setArrFile(file);
    const preview = await previewOldCSV(file);
    setArrPreview(preview);
  }

  // New CSV handlers
  async function handleNewDepartureFileChange(file) {
    setNewDepFile(file);
    const preview = await previewNewCSV(file, false);
    setNewDepPreview(preview);
  }

  async function handleNewArrivalFileChange(file) {
    setNewArrFile(file);
    const preview = await previewNewCSV(file, true);
    setNewArrPreview(preview);
  }

  // JSON preview
  async function handleJSONPreview() {
    try {
      let input = jsonText.trim();
      if (jsonFile) {
        input = await readFileText(jsonFile);
      }
      if (!input) {
        setJsonPreview(null);
        return;
      }
      const grouped = parseTimetableJSON(input);
      setJsonPreview(grouped);
    } catch (err) {
      setJsonPreview(null);
    }
  }

  // Drag & drop handlers for old CSV
  const handleDepDragOver = (e) => {
    e.preventDefault();
    setDepDragOver(true);
  };

  const handleDepDragLeave = (e) => {
    e.preventDefault();
    setDepDragOver(false);
  };

  const handleDepDrop = (e) => {
    e.preventDefault();
    setDepDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleDepartureFileChange(file);
    } else {
      setStatus({ type: "err", msg: "Molimo učitajte CSV fajl za polaske" });
    }
  };

  const handleArrDragOver = (e) => {
    e.preventDefault();
    setArrDragOver(true);
  };

  const handleArrDragLeave = (e) => {
    e.preventDefault();
    setArrDragOver(false);
  };

  const handleArrDrop = (e) => {
    e.preventDefault();
    setArrDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleArrivalFileChange(file);
    } else {
      setStatus({ type: "err", msg: "Molimo učitajte CSV fajl za dolaske" });
    }
  };

  // Drag & drop handlers for new CSV
  const handleNewDepDragOver = (e) => {
    e.preventDefault();
    setNewDepDragOver(true);
  };

  const handleNewDepDragLeave = (e) => {
    e.preventDefault();
    setNewDepDragOver(false);
  };

  const handleNewDepDrop = (e) => {
    e.preventDefault();
    setNewDepDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleNewDepartureFileChange(file);
    } else {
      setStatus({ type: "err", msg: "Molimo učitajte CSV fajl za polaske (novi format)" });
    }
  };

  const handleNewArrDragOver = (e) => {
    e.preventDefault();
    setNewArrDragOver(true);
  };

  const handleNewArrDragLeave = (e) => {
    e.preventDefault();
    setNewArrDragOver(false);
  };

  const handleNewArrDrop = (e) => {
    e.preventDefault();
    setNewArrDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleNewArrivalFileChange(file);
    } else {
      setStatus({ type: "err", msg: "Molimo učitajte CSV fajl za dolaske (novi format)" });
    }
  };

  // ── Old CSV handlers ─────────────────────────────────────────────────────────

  async function handleOldCSVGenerate(type) {
    const file = type === "arrivals" ? arrFile : depFile;
    if (!file) {
      setStatus({ type: "err", msg: `${t.uploadCSV} ${type === "arrivals" ? t.arrivals : t.departures}` });
      return;
    }
    setLoading(true);
    setStatus({ type: "info", msg: t.loading });
    try {
      const text = await readFileText(file);
      const grouped = parseTimetableCSV(text);
      if (!grouped.length) throw new Error(t.noData);
      const filename = type === "arrivals" ? "arrivals.pdf" : "departures.pdf";
      generateAndDownloadPDF(grouped, type, filename);
      saveToHistory(filename, type, grouped.length, grouped);
      setCurrentPdfData({ grouped, type, filename });
      setStatus({ type: "ok", msg: `✓ ${filename} (${grouped.length} ${t.destinations})` });
    } catch (err) {
      setStatus({ type: "err", msg: `${t.error}: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  async function handleOldCSVBoth() {
    if (!depFile || !arrFile) {
      setStatus({ type: "err", msg: `${t.uploadCSV} ${t.departures} i ${t.arrivals}` });
      return;
    }
    setLoading(true);
    setStatus({ type: "info", msg: t.loading });
    try {
      const [arrText, depText] = await Promise.all([
        readFileText(arrFile),
        readFileText(depFile),
      ]);
      const arrGrouped = parseTimetableCSV(arrText);
      const depGrouped = parseTimetableCSV(depText);
      generateAndDownloadPDF(arrGrouped, "arrivals", "arrivals.pdf");
      generateAndDownloadPDF(depGrouped, "departures", "departures.pdf");
      saveToHistory("arrivals.pdf", "arrivals", arrGrouped.length, arrGrouped);
      saveToHistory("departures.pdf", "departures", depGrouped.length, depGrouped);
      setStatus({ type: "ok", msg: `✓ arrivals.pdf (${arrGrouped.length}) i departures.pdf (${depGrouped.length}) ${t.destinations}` });
    } catch (err) {
      setStatus({ type: "err", msg: `${t.error}: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  // ── New CSV handlers ─────────────────────────────────────────────────────────

  async function handleNewCSVGenerate(type) {
    const file = type === "arrivals" ? newArrFile : newDepFile;
    const parser = type === "arrivals" ? parseArrivalsNewCSV : parseDeparturesNewCSV;
    if (!file) {
      setStatus({ type: "err", msg: `${t.uploadCSV} ${type === "arrivals" ? t.arrivals : t.departures} (novi format)` });
      return;
    }
    setLoading(true);
    setStatus({ type: "info", msg: t.loading });
    try {
      const text = await readFileText(file);
      const grouped = parser(text);
      if (!grouped.length) throw new Error(t.noData);
      const filename = type === "arrivals" ? "arrivals.pdf" : "departures.pdf";
      generateAndDownloadPDF(grouped, type, filename);
      saveToHistory(filename, type, grouped.length, grouped);
      setCurrentPdfData({ grouped, type, filename });
      setStatus({ type: "ok", msg: `✓ ${filename} (${grouped.length} ${t.destinations})` });
    } catch (err) {
      setStatus({ type: "err", msg: `${t.error}: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  async function handleNewCSVBoth() {
    if (!newDepFile || !newArrFile) {
      setStatus({ type: "err", msg: `${t.uploadCSV} ${t.departures} i ${t.arrivals} (novi format)` });
      return;
    }
    setLoading(true);
    setStatus({ type: "info", msg: t.loading });
    try {
      const [arrText, depText] = await Promise.all([
        readFileText(newArrFile),
        readFileText(newDepFile),
      ]);
      const arrGrouped = parseArrivalsNewCSV(arrText);
      const depGrouped = parseDeparturesNewCSV(depText);
      generateAndDownloadPDF(arrGrouped, "arrivals", "arrivals.pdf");
      generateAndDownloadPDF(depGrouped, "departures", "departures.pdf");
      saveToHistory("arrivals.pdf", "arrivals", arrGrouped.length, arrGrouped);
      saveToHistory("departures.pdf", "departures", depGrouped.length, depGrouped);
      setStatus({ type: "ok", msg: `✓ arrivals.pdf (${arrGrouped.length}) i departures.pdf (${depGrouped.length}) ${t.destinations}` });
    } catch (err) {
      setStatus({ type: "err", msg: `${t.error}: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  // ── JSON handlers ─────────────────────────────────────────────────────────────

  async function handleJSONGenerate() {
    setLoading(true);
    setStatus({ type: "info", msg: t.loading });
    try {
      let input = jsonText.trim();
      if (jsonFile) {
        input = await readFileText(jsonFile);
      }
      if (!input) throw new Error(t.noData);

      const grouped = parseTimetableJSON(input);
      if (!grouped.length) throw new Error(t.noData);

      const filename = jsonDocType === "arrivals" ? "arrivals.pdf" : "departures.pdf";
      generateAndDownloadPDF(grouped, jsonDocType, filename);
      saveToHistory(filename, jsonDocType, grouped.length, grouped);
      setCurrentPdfData({ grouped, type: jsonDocType, filename });
      setStatus({ type: "ok", msg: `✓ ${filename} (${grouped.length} ${t.destinations})` });
    } catch (err) {
      setStatus({ type: "err", msg: `${t.error}: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  // ── Email handler ────────────────────────────────────────────────────────────

  const sendEmail = async () => {
    if (!email || !currentPdfData) return;
    
    setStatus({ type: "info", msg: "Šaljem email..." });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus({ type: "ok", msg: `✓ PDF poslat na ${email}` });
      setShowEmailDialog(false);
      setEmail("");
    } catch (err) {
      setStatus({ type: "err", msg: "Greška pri slanju email-a" });
    }
  };

  // ── Export handlers ──────────────────────────────────────────────────────────

  const exportToJSON = (data, type) => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus({ type: "ok", msg: "JSON fajl preuzet" });
  };

  // Helper za kombinovanje stilova
  const getCardStyle = () => ({
    ...styles.card,
    ...(darkMode ? darkStyles.card : {})
  });

  const getLabelStyle = () => ({
    ...styles.label,
    ...(darkMode ? darkStyles.label : {})
  });

  const getInputStyle = () => ({
    ...styles.input,
    ...(darkMode ? darkStyles.input : {})
  });

  const getFileInputStyle = (isDragOver) => ({
    ...styles.fileInput,
    ...(darkMode ? darkStyles.fileInput : {}),
    ...(isDragOver ? styles.fileInputDragOver : {})
  });

  const getSectionTitleStyle = () => ({
    ...styles.sectionTitle,
    ...(darkMode ? darkStyles.sectionTitle : {})
  });

  const getTipStyle = () => ({
    ...styles.tip,
    ...(darkMode ? darkStyles.tip : {})
  });

  const getPreviewStyle = () => ({
    ...styles.preview,
    ...(darkMode ? darkStyles.preview : {})
  });

  const getPreviewTitleStyle = () => ({
    ...styles.previewTitle,
    ...(darkMode ? darkStyles.previewTitle : {})
  });

  const getPreviewItemStyle = () => ({
    ...styles.previewItem,
    ...(darkMode ? darkStyles.previewItem : {})
  });

  const getBtnSecondaryStyle = () => ({
    ...styles.btnSecondary,
    ...(darkMode ? darkStyles.btnSecondary : {})
  });

  const getStatusStyle = () => {
    const base = {
      ...styles.status,
      ...(darkMode ? darkStyles.status : {})
    };
    if (status?.type === "ok") return { ...base, ...styles.statusOk, ...(darkMode ? darkStyles.statusOk : {}) };
    if (status?.type === "err") return { ...base, ...styles.statusErr, ...(darkMode ? darkStyles.statusErr : {}) };
    return { ...base, ...styles.statusInfo, ...(darkMode ? darkStyles.statusInfo : {}) };
  };

  const getModalContentStyle = () => ({
    ...styles.modalContent,
    ...(darkMode ? darkStyles.modalContent : {})
  });

  // Preview komponenta
  const PreviewSection = ({ data, title, searchTerm, setSearchTerm, showExport = false, type = "" }) => {
    if (!data || data.length === 0) return null;
    
    const filteredData = searchTerm 
      ? data.filter(d => 
          d.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.airportCode?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data;
    
    const totalFlights = data.reduce((sum, d) => sum + d.flights.length, 0);
    
    return (
      <div style={getPreviewStyle()}>
        <div style={getPreviewTitleStyle()}>
          {title} <span style={styles.badge}>{data.length} {t.destinations} / {totalFlights} {t.flights}</span>
        </div>
        <input
          type="text"
          placeholder={t.search}
          style={getInputStyle()}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul style={styles.previewList}>
          {filteredData.slice(0, 10).map((dest, idx) => (
            <li key={idx} style={getPreviewItemStyle()}>
              <span>
                <strong>{dest.airportCode}</strong> {dest.city}, {dest.country}
              </span>
              <span style={{ color: darkMode ? "#00b4d8" : "#0077b6" }}>{dest.flights.length} {t.flights}</span>
            </li>
          ))}
          {filteredData.length > 10 && (
            <li style={getPreviewItemStyle()}>
              + {filteredData.length - 10} {t.more} {t.destinations}
            </li>
          )}
        </ul>
        {showExport && data && (
          <button
            style={getBtnSecondaryStyle()}
            onClick={() => exportToJSON(data, type)}
          >
            📥 {t.export} JSON
          </button>
        )}
      </div>
    );
  };

  // History panel komponenta
  const HistoryPanel = () => {
    if (!showHistory) return null;
    
    return (
      <div style={getCardStyle()}>
        <h2 style={getSectionTitleStyle()}>
          📜 {t.history}
          <button 
            style={getBtnSecondaryStyle()}
            onClick={() => setShowHistory(false)}
          >
            {t.close}
          </button>
        </h2>
        {history.length === 0 ? (
          <p style={getTipStyle()}>{t.noHistory}</p>
        ) : (
          <ul style={styles.previewList}>
            {history.map((item) => (
              <li key={item.id} style={getPreviewItemStyle()}>
                <div>
                  <strong>{item.filename}</strong>
                  <div style={{ fontSize: "11px", color: "#6b7a99" }}>
                    {item.date} • {item.destinations} {t.destinations}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button 
                    style={getBtnSecondaryStyle()}
                    onClick={() => {
                      if (item.data) {
                        const airportConfig = item.airportConfig || {
                          name: airportName,
                          iata: airportIATA,
                          icao: airportICAO,
                          subtitle: item.type === "arrivals" ? arrivalsSubtitle : departuresSubtitle,
                        };
                        const pdf = generateTimetablePDF(item.data, item.type, item.season, item.period, airportConfig);
                        downloadPDF(pdf, item.filename);
                        setStatus({ type: "ok", msg: `✓ ${item.filename} regenerisan` });
                      }
                    }}
                  >
                    🔄 {t.repeat}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // Email dialog komponenta
  const EmailDialog = () => {
    if (!showEmailDialog) return null;
    
    return (
      <div style={styles.modal}>
        <div style={getModalContentStyle()}>
          <h2 style={getSectionTitleStyle()}>📧 {t.sendEmail}</h2>
          <label style={getLabelStyle()}>Email adresa</label>
          <input
            style={getInputStyle()}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
          />
          <div style={{ ...styles.row, marginTop: "16px" }}>
            <button
              style={getBtnSecondaryStyle()}
              onClick={() => setShowEmailDialog(false)}
            >
              {t.cancel}
            </button>
            <button
              style={{ ...styles.btnArrivals, margin: 0 }}
              onClick={sendEmail}
            >
              {t.send}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const tabBtn = (t) => ({
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    transition: "all .15s",
    background: tab === t ? "#00467f" : (darkMode ? "#2a3a48" : "#e8f0fe"),
    color: tab === t ? "white" : (darkMode ? "#00b4d8" : "#00467f"),
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.languageSwitcher}>
          <button
            style={{ ...styles.langBtn, background: darkMode ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)" }}
            onClick={() => {
              setDarkMode(!darkMode);
              localStorage.setItem("tivat_dark_mode", JSON.stringify(!darkMode));
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            style={styles.langBtn}
            onClick={() => setShowHistory(!showHistory)}
          >
            📜
          </button>
          {["en", "me", "sr"].map((l) => (
            <button
              key={l}
              style={{ ...styles.langBtn, ...(lang === l ? styles.langBtnActive : {}) }}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, letterSpacing: "-0.01em" }}>
          ✈ {t.title}
        </h1>
        <p style={styles.headerSubtitle}>{t.subtitle}</p>
      </div>

      {/* Konfiguracija aerodroma - NOVA KARTICA */}
      <div style={getCardStyle()}>
        <h2 style={getSectionTitleStyle()}>
          {t.airportConfig}
          <button 
            style={getBtnSecondaryStyle()}
            onClick={saveAirportConfig}
          >
            💾 Sačuvaj
          </button>
        </h2>
        <div style={styles.configRow}>
          <div style={styles.configInput}>
            <label style={getLabelStyle()}>{t.airportName}</label>
            <input 
              style={getInputStyle()} 
              value={airportName} 
              onChange={(e) => setAirportName(e.target.value)} 
              placeholder="Tivat"
            />
          </div>
          <div style={styles.configInput}>
            <label style={getLabelStyle()}>{t.airportIATA}</label>
            <input 
              style={getInputStyle()} 
              value={airportIATA} 
              onChange={(e) => setAirportIATA(e.target.value.toUpperCase())} 
              placeholder="TIV"
              maxLength={3}
            />
          </div>
          <div style={styles.configInput}>
            <label style={getLabelStyle()}>{t.airportICAO}</label>
            <input 
              style={getInputStyle()} 
              value={airportICAO} 
              onChange={(e) => setAirportICAO(e.target.value.toUpperCase())} 
              placeholder="LYTV"
              maxLength={4}
            />
          </div>
        </div>
        <div style={styles.configRow}>
          <div style={styles.configInput}>
            <label style={getLabelStyle()}>{t.arrivalsSubtitle}</label>
            <input 
              style={getInputStyle()} 
              value={arrivalsSubtitle} 
              onChange={(e) => setArrivalsSubtitle(e.target.value)} 
              placeholder="Dolasci na aerodrom"
            />
          </div>
          <div style={styles.configInput}>
            <label style={getLabelStyle()}>{t.departuresSubtitle}</label>
            <input 
              style={getInputStyle()} 
              value={departuresSubtitle} 
              onChange={(e) => setDeparturesSubtitle(e.target.value)} 
              placeholder="Polasci sa aerodroma"
            />
          </div>
        </div>
      </div>

      {/* Sezona */}
      <div style={getCardStyle()}>
        <h2 style={getSectionTitleStyle()}>{t.seasonConfig}</h2>
        <label style={getLabelStyle()}>{t.seasonLabel}</label>
        <input style={getInputStyle()} value={season} onChange={(e) => setSeason(e.target.value)} placeholder="npr. S26 – Summer 2026" />
        <label style={getLabelStyle()}>{t.periodLabel}</label>
        <input style={getInputStyle()} value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="npr. 30 MAR 2026 – 24 OCT 2026" />
      </div>

      {/* Tab switcher */}
      <div style={getCardStyle()}>
        <h2 style={getSectionTitleStyle()}>{t.dataFormat}</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button style={tabBtn(TAB_CSV)} onClick={() => { setTab(TAB_CSV); setStatus(null); }}>📄 {t.csvFile}</button>
          <button style={tabBtn(TAB_NEW_CSV)} onClick={() => { setTab(TAB_NEW_CSV); setStatus(null); }}>📄 {t.newCsvFile}</button>
          <button style={tabBtn(TAB_JSON)} onClick={() => { setTab(TAB_JSON); setStatus(null); }}>🔷 {t.jsonFile}</button>
        </div>
      </div>

      {/* Old CSV panel */}
      {tab === TAB_CSV && (
        <>
          <div style={getCardStyle()}>
            <h2 style={getSectionTitleStyle()}>{t.departures}</h2>
            <div
              style={getFileInputStyle(depDragOver)}
              onDragOver={handleDepDragOver}
              onDragLeave={handleDepDragLeave}
              onDrop={handleDepDrop}
              onClick={() => depFileInputRef.current?.click()}
            >
              📁 {depFile ? depFile.name : t.uploadCSV}
            </div>
            <input
              type="file"
              accept=".csv"
              ref={depFileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleDepartureFileChange(e.target.files[0])}
            />
            <p style={getTipStyle()}>Npr. S26FIDS_27MAR26-DEPARTURES.csv</p>
            <PreviewSection 
              data={depPreview} 
              title={t.departures} 
              searchTerm={depSearch}
              setSearchTerm={setDepSearch}
              showExport={true}
              type="departures"
            />

            <h2 style={{ ...getSectionTitleStyle(), marginTop: "24px" }}>{t.arrivals}</h2>
            <div
              style={getFileInputStyle(arrDragOver)}
              onDragOver={handleArrDragOver}
              onDragLeave={handleArrDragLeave}
              onDrop={handleArrDrop}
              onClick={() => arrFileInputRef.current?.click()}
            >
              📁 {arrFile ? arrFile.name : t.uploadCSV}
            </div>
            <input
              type="file"
              accept=".csv"
              ref={arrFileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleArrivalFileChange(e.target.files[0])}
            />
            <p style={getTipStyle()}>Npr. S26FIDS_27MAR26-ARRIVALS.csv</p>
            <PreviewSection 
              data={arrPreview} 
              title={t.arrivals} 
              searchTerm={arrSearch}
              setSearchTerm={setArrSearch}
              showExport={true}
              type="arrivals"
            />
          </div>

          <div style={getCardStyle()}>
            <h2 style={getSectionTitleStyle()}>{t.generatePDF}</h2>
            <div style={styles.row}>
              <button
                style={{ ...styles.btnArrivals, ...(loading || !arrFile ? styles.btnDisabled : {}) }}
                onClick={() => handleOldCSVGenerate("arrivals")}
                disabled={loading || !arrFile}
              >
                ⬇ {t.arrivals}.pdf
              </button>
              <button
                style={{ ...styles.btnDepartures, ...(loading || !depFile ? styles.btnDisabled : {}) }}
                onClick={() => handleOldCSVGenerate("departures")}
                disabled={loading || !depFile}
              >
                ⬆ {t.departures}.pdf
              </button>
            </div>
            <div style={{ marginTop: "12px" }}>
              <button
                style={{
                  width: "100%",
                  padding: "14px",
                  background: loading || (!depFile || !arrFile) ? "#c8d8e8" : "linear-gradient(90deg,#00467f,#00b4d8)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: loading || (!depFile || !arrFile) ? "not-allowed" : "pointer",
                  opacity: loading || (!depFile || !arrFile) ? 0.6 : 1
                }}
                onClick={handleOldCSVBoth}
                disabled={loading || !depFile || !arrFile}
              >
                {loading ? t.loading : `⬇ ${t.generateBoth}`}
              </button>
            </div>
            {status && <div style={getStatusStyle()}>{status.msg}</div>}
            {status?.type === "ok" && currentPdfData && (
              <div style={{ marginTop: "12px" }}>
                <button
                  style={getBtnSecondaryStyle()}
                  onClick={() => setShowEmailDialog(true)}
                >
                  📧 {t.sendEmail}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* New CSV panel */}
      {tab === TAB_NEW_CSV && (
        <>
          <div style={getCardStyle()}>
            <h2 style={getSectionTitleStyle()}>{t.departures}</h2>
            <div
              style={getFileInputStyle(newDepDragOver)}
              onDragOver={handleNewDepDragOver}
              onDragLeave={handleNewDepDragLeave}
              onDrop={handleNewDepDrop}
              onClick={() => newDepFileInputRef.current?.click()}
            >
              📁 {newDepFile ? newDepFile.name : t.uploadCSV}
            </div>
            <input
              type="file"
              accept=".csv"
              ref={newDepFileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleNewDepartureFileChange(e.target.files[0])}
            />
            <p style={getTipStyle()}>Npr. dep.csv (Oper, Type, Dep flt no., To, ETD, Period, DOW)</p>
            <PreviewSection 
              data={newDepPreview} 
              title={t.departures} 
              searchTerm={newDepSearch}
              setSearchTerm={setNewDepSearch}
              showExport={true}
              type="departures_new"
            />

            <h2 style={{ ...getSectionTitleStyle(), marginTop: "24px" }}>{t.arrivals}</h2>
            <div
              style={getFileInputStyle(newArrDragOver)}
              onDragOver={handleNewArrDragOver}
              onDragLeave={handleNewArrDragLeave}
              onDrop={handleNewArrDrop}
              onClick={() => newArrFileInputRef.current?.click()}
            >
              📁 {newArrFile ? newArrFile.name : t.uploadCSV}
            </div>
            <input
              type="file"
              accept=".csv"
              ref={newArrFileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleNewArrivalFileChange(e.target.files[0])}
            />
            <p style={getTipStyle()}>Npr. arr.csv (Oper, Type, Arr flt no., From, ETA, Period, DOW)</p>
            <PreviewSection 
              data={newArrPreview} 
              title={t.arrivals} 
              searchTerm={newArrSearch}
              setSearchTerm={setNewArrSearch}
              showExport={true}
              type="arrivals_new"
            />
          </div>

          <div style={getCardStyle()}>
            <h2 style={getSectionTitleStyle()}>{t.generatePDF}</h2>
            <div style={styles.row}>
              <button
                style={{ ...styles.btnArrivals, ...(loading || !newArrFile ? styles.btnDisabled : {}) }}
                onClick={() => handleNewCSVGenerate("arrivals")}
                disabled={loading || !newArrFile}
              >
                ⬇ {t.arrivals}.pdf
              </button>
              <button
                style={{ ...styles.btnDepartures, ...(loading || !newDepFile ? styles.btnDisabled : {}) }}
                onClick={() => handleNewCSVGenerate("departures")}
                disabled={loading || !newDepFile}
              >
                ⬆ {t.departures}.pdf
              </button>
            </div>
            <div style={{ marginTop: "12px" }}>
              <button
                style={{
                  width: "100%",
                  padding: "14px",
                  background: loading || (!newDepFile || !newArrFile) ? "#c8d8e8" : "linear-gradient(90deg,#00467f,#00b4d8)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: loading || (!newDepFile || !newArrFile) ? "not-allowed" : "pointer",
                  opacity: loading || (!newDepFile || !newArrFile) ? 0.6 : 1
                }}
                onClick={handleNewCSVBoth}
                disabled={loading || !newDepFile || !newArrFile}
              >
                {loading ? t.loading : `⬇ ${t.generateBoth}`}
              </button>
            </div>
            {status && <div style={getStatusStyle()}>{status.msg}</div>}
            {status?.type === "ok" && currentPdfData && (
              <div style={{ marginTop: "12px" }}>
                <button
                  style={getBtnSecondaryStyle()}
                  onClick={() => setShowEmailDialog(true)}
                >
                  📧 {t.sendEmail}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* JSON panel */}
      {tab === TAB_JSON && (
        <div style={getCardStyle()}>
          <h2 style={getSectionTitleStyle()}>{t.jsonFile}</h2>

          <label style={getLabelStyle()}>{t.departures} / {t.arrivals}</label>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {["departures", "arrivals"].map((type) => (
              <button
                key={type}
                onClick={() => setJsonDocType(type)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  background: jsonDocType === type ? "#0077b6" : (darkMode ? "#2a3a48" : "#e8f0fe"),
                  color: jsonDocType === type ? "white" : (darkMode ? "#00b4d8" : "#0077b6")
                }}
              >
                {type === "departures" ? "⬆ " + t.departures : "⬇ " + t.arrivals}
              </button>
            ))}
          </div>

          <label style={getLabelStyle()}>{t.uploadJSON}</label>
          <input
            type="file"
            accept=".json"
            style={getFileInputStyle(false)}
            onChange={(e) => { setJsonFile(e.target.files[0] || null); setJsonText(""); handleJSONPreview(); }}
          />
          <p style={getTipStyle()}>{t.uploadJSON} — {t.orPasteJSON}</p>

          <label style={getLabelStyle()}>{t.orPasteJSON}</label>
          <textarea
            style={{ ...getInputStyle(), height: "180px", resize: "vertical", fontFamily: "monospace", fontSize: "12px" }}
            value={jsonText}
            onChange={(e) => { setJsonText(e.target.value); setJsonFile(null); handleJSONPreview(); }}
            placeholder={'[\n  { "FLC": "JU", "FLN": "681", "SCT": 825, "VI1": "BEG", ... },\n  ...\n]'}
          />
          <PreviewSection 
            data={jsonPreview} 
            title={jsonDocType === "departures" ? t.departures : t.arrivals}
            searchTerm={jsonSearch}
            setSearchTerm={setJsonSearch}
            showExport={true}
            type={jsonDocType}
          />

          <button
            style={{
              width: "100%",
              padding: "14px",
              background: loading || (!jsonText.trim() && !jsonFile) ? "#c8d8e8" : "linear-gradient(90deg,#00467f,#0077b6)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading || (!jsonText.trim() && !jsonFile) ? "not-allowed" : "pointer",
              opacity: loading || (!jsonText.trim() && !jsonFile) ? 0.6 : 1
            }}
            onClick={handleJSONGenerate}
            disabled={loading || (!jsonText.trim() && !jsonFile)}
          >
            {loading ? t.loading : `🔷 ${t.generatePDF}`}
          </button>

          {status && <div style={getStatusStyle()}>{status.msg}</div>}
          {status?.type === "ok" && currentPdfData && (
            <div style={{ marginTop: "12px" }}>
              <button
                style={getBtnSecondaryStyle()}
                onClick={() => setShowEmailDialog(true)}
              >
                📧 {t.sendEmail}
              </button>
            </div>
          )}
        </div>
      )}

      {/* History panel */}
      <HistoryPanel />

      {/* Email dialog */}
      <EmailDialog />

      {/* Footer */}
      <div style={{ maxWidth: "720px", width: "100%", textAlign: "center" }}>
        <p style={getTipStyle()}>
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}