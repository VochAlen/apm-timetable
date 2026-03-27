import jsPDF from "jspdf";
import "jspdf-autotable";

// Profesionalna color shema za aerodrom
const COLORS = {
  primary: [0, 70, 127],      // Tamno plava - Air Montenegro / Tivat
  secondary: [242, 117, 34],  // Narandžasta - akcent boja za arrivals
  departures: [22, 94, 2],    // Zelena (#165E02) za departures
  light: [245, 248, 250],     // Svetlo siva pozadina
  dark: [30, 30, 30],         // Tamna za tekst
  medium: [100, 100, 100],    // Srednje siva za sekundarni tekst
  border: [220, 230, 240],    // Border boja
  white: [255, 255, 255],
  tableHeader: [248, 250, 252],
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 15;
const CONTENT_W = PAGE_W - MARGIN * 2;
const SECTION_H = 16;
const PAGE_HEADER_H = 32;

// Column widths
const COL_WIDTHS = [48, 32, 20, 24, 28, 28];
const COL_LABELS = ["Airline", "Flight", "Time", "Days", "Start", "End"];

export function generateTimetablePDF(groupedData, type, seasonLabel, periodLabel, airportConfig = {}) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
  // Konfiguracija aerodroma (može se promijeniti preko UI)
  const {
    name = "Tivat",
    iata = "TIV",
    icao = "LYTV",
    subtitle = type === "arrivals" ? "Dolasci na aerodrom" : "Polasci sa aerodroma"
  } = airportConfig;
  
  const fullAirportName = `${name} Airport`;
  const airportCodeDisplay = `${icao} / ${iata}`;
  
  // Trenutni datum za footer
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

  const isArrivals = type === "arrivals";
  const typeLabel = isArrivals ? "ARRIVALS" : "DEPARTURES";
  const typeSubtitle = isArrivals ? `${subtitle} ${name}` : `${subtitle} ${name}`;
  
  // Dinamička boja zavisno od tipa
  const ACCENT_COLOR = isArrivals ? COLORS.secondary : COLORS.departures;

  function cityLabel(group) {
    const city = (group.city || "").trim();
    const country = (group.country || "").trim();
    if (city && country) return `${city}, ${country}`;
    if (city) return city;
    return group.airportCode || "";
  }

  function airportLabel(group) {
    const name = (group.airport || "").trim();
    if (!name || name === group.airportCode) return "";
    return name;
  }

  function drawPageHeader() {
    const y = MARGIN;
    
    // Logo mesto - pravougaonik sa tekstom (uvek plavi)
    doc.setFillColor(...COLORS.primary);
    doc.roundedRect(MARGIN, y, 55, 18, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(name.toUpperCase(), MARGIN + 5, y + 7);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("AIRPORT", MARGIN + 5, y + 13);
    
    // Glavni naslov
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...COLORS.dark);
    doc.text(typeLabel, PAGE_W / 2, y + 7, { align: "center" });
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.medium);
    doc.text(typeSubtitle, PAGE_W / 2, y + 14, { align: "center" });
    
    // Desna strana - sezona
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.primary);
    doc.text(seasonLabel, PAGE_W - MARGIN, y + 7, { align: "right" });
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.medium);
    doc.text(periodLabel, PAGE_W - MARGIN, y + 14, { align: "right" });
    
    // Dekorativna linija
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y + 22, PAGE_W - MARGIN, y + 22);
    
    // Sekundarna linija (u boji tipa)
    doc.setDrawColor(...ACCENT_COLOR);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, y + 23, MARGIN + 45, y + 23);
  }

  function drawTableHeader(x, y, width) {
    const headerHeight = 9;
    
    // Header pozadina sa blagom gradijent senkom
    doc.setFillColor(...COLORS.tableHeader);
    doc.rect(x, y, width, headerHeight, "F");
    
    // Gornja linija akcenta (u boji tipa)
    doc.setDrawColor(...ACCENT_COLOR);
    doc.setLineWidth(0.3);
    doc.line(x, y, x + width, y);
    
    // Text za header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.dark);
    
    const midY = y + headerHeight / 2 + 0.5;
    let currentX = x;
    
    for (let i = 0; i < COL_LABELS.length; i++) {
      const colWidth = COL_WIDTHS[i];
      const label = COL_LABELS[i];
      
      if (i === 2 || i === 3) {
        doc.text(label, currentX + colWidth / 2, midY, { align: "center" });
      } else {
        doc.text(label, currentX + 3, midY);
      }
      currentX += colWidth;
    }
    
    return headerHeight;
  }

  // Prepare table data
  let currentY = MARGIN + PAGE_HEADER_H;
  
  drawPageHeader();

  for (let gi = 0; gi < groupedData.length; gi++) {
    const group = groupedData[gi];
    
    if (!group.flights || group.flights.length === 0) continue;
    
    // Check if we need a new page
    if (currentY > PAGE_H - 70) {
      doc.addPage();
      currentY = MARGIN + PAGE_HEADER_H;
      drawPageHeader();
    }
    
    // Draw airport section header
    const headerHeight = SECTION_H;
    const headerY = currentY;
    
    // Pozadina
    doc.setFillColor(255, 255, 255);
    doc.rect(MARGIN, headerY, CONTENT_W, headerHeight, "F");
    
    // Leva vertikalna linija akcenta (u boji tipa)
    doc.setDrawColor(...ACCENT_COLOR);
    doc.setLineWidth(2.5);
    doc.line(MARGIN, headerY, MARGIN, headerY + headerHeight);
    
    // Donja suptilna linija
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, headerY + headerHeight, PAGE_W - MARGIN, headerY + headerHeight);
    
    const midY = headerY + headerHeight / 2 + 1;
    
    // City - veliko i bold
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.dark);
    doc.text(cityLabel(group), MARGIN + 8, midY);
    
    // IATA code badge - modern rounded (boja zavisi od tipa)
    const badgeX = MARGIN + 85;
    const badgeW = 26;
    const badgeH = headerHeight - 6;
    doc.setFillColor(...ACCENT_COLOR);
    doc.roundedRect(badgeX, headerY + 3, badgeW, badgeH, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(group.airportCode, badgeX + badgeW / 2, midY, { align: "center" });
    
    // Airport name - smaller, gray
    const aName = airportLabel(group);
    if (aName) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...COLORS.medium);
      doc.text(aName, badgeX + badgeW + 5, midY);
    }
    
    // Broj letova - mala oznaka
    const flightCount = group.flights.length;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.medium);
    doc.text(`${flightCount} flight${flightCount !== 1 ? 's' : ''}`, PAGE_W - MARGIN - 5, midY, { align: "right" });
    
    currentY += headerHeight;
    
    // Draw table header
    const tableHeaderHeight = drawTableHeader(MARGIN, currentY, CONTENT_W);
    currentY += tableHeaderHeight;
    
    // Prepare table body
    const tableBody = group.flights.map(flight => [
      flight.airline || "",
      flight.flightNumber || "",
      flight.time || "",
      flight.days || "",
      flight.start || "",
      flight.end || ""
    ]);
    
    // Create table
    doc.autoTable({
      startY: currentY,
      margin: { left: MARGIN, right: MARGIN },
      head: [],
      body: tableBody,
      styles: {
        fontSize: 7.5,
        cellPadding: { top: 2.8, bottom: 2.8, left: 3, right: 2 },
        lineWidth: 0.1,
        lineColor: [...COLORS.border],
        font: "helvetica",
        textColor: [...COLORS.dark],
        valign: "middle",
      },
      bodyStyles: { 
        fillColor: [255, 255, 255],
        textColor: [...COLORS.dark],
      },
      alternateRowStyles: { 
        fillColor: [250, 251, 252],
      },
      columnStyles: {
        0: { cellWidth: COL_WIDTHS[0] },
        1: { cellWidth: COL_WIDTHS[1] },
        2: { cellWidth: COL_WIDTHS[2], halign: "center" },
        3: { cellWidth: COL_WIDTHS[3], halign: "center" },
        4: { cellWidth: COL_WIDTHS[4] },
        5: { cellWidth: COL_WIDTHS[5] },
      },
      didDrawPage: function(data) {
        // Footer na svakoj stranici
        const footerY = PAGE_H - 12;
        
        // Linija iznad footera
        doc.setDrawColor(...COLORS.border);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, footerY - 4, PAGE_W - MARGIN, footerY - 4);
        
        // Disclaimer
        doc.setFontSize(6);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(...COLORS.medium);
        const disclaimer = `Timetable ${seasonLabel} presents scheduled data available on ${formattedDate}. All times are local. ` +
          `Airlines retain the right to make changes. Please verify with airlines or travel agents.`;
        doc.text(disclaimer, MARGIN, footerY, { maxWidth: CONTENT_W - 15 });
        
        // Airport logo u footeru (koristi korisnički naziv)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(5);
        doc.setTextColor(...COLORS.primary);
        doc.text(`${fullAirportName} • ${airportCodeDisplay}`, PAGE_W / 2, footerY + 3, { align: "center" });
      }
    });
    
    // Update currentY after table
    const lastTable = doc.lastAutoTable;
    if (lastTable) {
      currentY = lastTable.finalY + 6;
    }
  }

  return doc;
}

export function downloadPDF(doc, filename) {
  doc.save(filename);
}