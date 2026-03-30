"use client";

import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getAirlineName, getAirportInfo } from "../lib/airlineNames";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Helper funkcija za filtriranje jednodnevnih letova
function filterValidFlights(flights) {
  return flights.filter(flight => {
    const isSameDay = flight.start && flight.end && flight.start === flight.end;
    const isYearRound = flight.start?.toLowerCase().includes("year-round") ||
                       flight.end?.toLowerCase().includes("year-round") ||
                       (flight.start === "" && flight.end === "");
    return !(isSameDay && !isYearRound);
  });
}

// Helper za dobijanje ispravnog naziva aviokompanije preko IATA koda
function getNormalizedAirlineName(airlineCode, airlineName) {
  // Prvo pokušaj preko IATA koda
  if (airlineCode) {
    const mappedName = getAirlineName(airlineCode);
    if (mappedName && mappedName !== airlineCode) {
      return mappedName;
    }
  }
  
  // Ako nema IATA koda, pokušaj preko naziva
  if (airlineName) {
    // Mapa za dodatna ujednačavanja
    const additionalMap = {
      "Air Montenegro": "Air Montenegro",
      "Air Serbia": "Air Serbia",
      "easyJet": "easyJet",
      "EasyJet Europe": "easyJet",
      "EasyJet Switzerland": "easyJet",
      "Jet2.com": "Jet2",
      "Jet2": "Jet2",
      "Norwegian Air Shuttle": "Norwegian",
      "Norwegian Air Sweden AOC AB": "Norwegian",
      "Norwegian": "Norwegian",
      "SAS Scandinavian Airlines": "SAS",
      "SAS": "SAS",
      "TUI fly Belgium": "TUI fly",
      "TUI fly Netherlands": "TUI fly",
      "TUI Airlines Belgium": "TUI fly",
      "TUI Airlines Nederlands": "TUI fly",
      "LOT Polish Airlines": "LOT",
      "LOT": "LOT",
      "airBaltic": "airBaltic",
      "Air Baltic": "airBaltic",
      "FlyOne": "FlyOne",
      "FlyOne Armenia": "FlyOne",
      "Azerbaijan Airlines": "Azerbaijan Airlines",
      "Jazeera Airways": "Jazeera Airways",
      "flydubai": "flydubai",
      "Transavia": "Transavia",
      "Transavia France": "Transavia",
      "Vueling": "Vueling",
      "Vueling Airlines": "Vueling",
      "British Airways": "British Airways",
      "Lufthansa": "Lufthansa",
      "Austrian Airlines": "Austrian Airlines",
      "Eurowings": "Eurowings",
      "Turkish Airlines": "Turkish Airlines",
      "Pegasus Airlines": "Pegasus",
      "SunExpress": "SunExpress",
      "Air Astana": "Air Astana",
      "Aegean Air": "Aegean Airlines",
      "Ryanair": "Ryanair",
      "Wizz Air": "Wizz Air",
      "El Al": "El Al",
      "Israir": "Israir",
      "Arkia": "Arkia",
      "Uzbekistan Airways": "Uzbekistan Airways",
      "Edelweiss": "Edelweiss",
      "Luxair": "Luxair",
      "Heston Airlines": "Heston Airlines",
      "Avion Express": "Avion Express",
      "Enter Air": "Enter Air",
      "Trade Air": "Trade Air",
      "Neos": "Neos",
      "Sunclass Airlines": "Sunclass",
      "Air France": "Air France",
      "KLM": "KLM",
      "Brussels Airlines": "Brussels Airlines",
      "Swiss": "Swiss",
      "Aer Lingus": "Aer Lingus",
      "TAP Air Portugal": "TAP Air Portugal",
      "ITA Airways": "ITA Airways",
      "Air Dolomiti": "Air Dolomiti",
      "Volotea": "Volotea",
      "Air Europa": "Air Europa",
      "Czech Airlines": "Czech Airlines",
      "Smartwings": "Smartwings",
      "Aeroflot": "Aeroflot",
      "Ukraine International Airlines": "Ukraine International Airlines",
      "TAROM": "TAROM",
      "Bulgaria Air": "Bulgaria Air",
      "Croatia Airlines": "Croatia Airlines",
      "Finnair": "Finnair",
      "Icelandair": "Icelandair",
      "Widerøe": "Widerøe",
      "Sky Express": "Sky Express",
      "Olympic Air": "Olympic Air",
      "Air Albania": "Air Albania",
      "Gulf Air": "Gulf Air",
      "Oman Air": "Oman Air",
      "Qatar Airways": "Qatar Airways",
      "Emirates": "Emirates",
      "Etihad Airways": "Etihad Airways",
      "Royal Jordanian": "Royal Jordanian",
      "Middle East Airlines": "Middle East Airlines",
      "Air Arabia": "Air Arabia",
      "EgyptAir": "EgyptAir",
      "Air Cairo": "Air Cairo",
      "Royal Air Maroc": "Royal Air Maroc",
      "Tunisair": "Tunisair",
      "Air Algérie": "Air Algérie",
      "Belavia": "Belavia",
      "SCAT Airlines": "SCAT Airlines",
      "Qazaq Air": "Qazaq Air",
    };
    
    for (const [key, value] of Object.entries(additionalMap)) {
      if (airlineName.includes(key)) {
        return value;
      }
    }
    return airlineName;
  }
  
  return "Unknown";
}

export default function StatisticsDashboard({ data, darkMode, t }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!data || !data.length) return;

    // Spojimo sve letove iz svih grupa (arrivals, departures)
    const allValidFlights = [];
    const destinationMap = new Map();
    const airlineCountMap = new Map();
    const dayCountMap = new Map([['1', 0], ['2', 0], ['3', 0], ['4', 0], ['5', 0], ['6', 0], ['7', 0]]);
    
    // Nazivi dana za prikaz
    const dayNames = {
      '1': 'Mon', '2': 'Tue', '3': 'Wed', '4': 'Thu', '5': 'Fri', '6': 'Sat', '7': 'Sun'
    };

    for (const group of data) {
      if (!group || !group.length) continue;
      
      for (const dest of group) {
        const validFlights = filterValidFlights(dest.flights);
        
        if (validFlights.length === 0) continue;

        // Destinacije - koristi getAirportInfo za ispravne podatke
        const airportInfo = getAirportInfo(dest.airportCode);
        
        if (!destinationMap.has(dest.airportCode)) {
          destinationMap.set(dest.airportCode, {
            airportCode: dest.airportCode,
            city: airportInfo.city || dest.city || dest.airportCode,
            country: airportInfo.country || dest.country || "",
            flightCount: 0,
          });
        }
        
        const destStats = destinationMap.get(dest.airportCode);
        
        for (const flight of validFlights) {
          destStats.flightCount++;
          allValidFlights.push(flight);
          
          // Aviokompanije - koristi getNormalizedAirlineName
          const airlineName = getNormalizedAirlineName(
            flight.airlineCode, 
            flight.airline
          );
          
          airlineCountMap.set(airlineName, (airlineCountMap.get(airlineName) || 0) + 1);
          
          // Dani u nedelji - parsiranje DOW stringa
          if (flight.days) {
            const daysStr = flight.days.toString();
            for (let i = 0; i < daysStr.length; i++) {
              const day = daysStr[i];
              if (day >= '1' && day <= '7') {
                dayCountMap.set(day, (dayCountMap.get(day) || 0) + 1);
              }
            }
          }
        }
      }
    }

    if (destinationMap.size === 0) {
      setStats({ isEmpty: true });
      return;
    }

    // 1. Ukupan broj destinacija (samo one sa validnim letovima)
    const totalDestinations = destinationMap.size;
    
    // 2. Ukupan broj validnih letova
    const totalFlights = allValidFlights.length;

    // 3. Sve aviokompanije (sortirane po broju letova)
    const allAirlines = Array.from(airlineCountMap.entries())
      .sort((a, b) => b[1] - a[1]);
    
    // Ukupan broj aviokompanija
    const totalAirlines = allAirlines.length;

    // 4. Raspored letova po danima u nedelji
    const daysData = [];
    const dayLabels = [];
    for (let i = 1; i <= 7; i++) {
      const dayKey = i.toString();
      dayLabels.push(dayNames[dayKey]);
      daysData.push(dayCountMap.get(dayKey) || 0);
    }

    // 5. Top 10 najprometnijih destinacija
    const topDestinations = Array.from(destinationMap.values())
      .sort((a, b) => b.flightCount - a.flightCount)
      .slice(0, 10);

    setStats({
      isEmpty: false,
      totalDestinations,
      totalFlights,
      totalAirlines,
      allAirlines,        // Sve aviokompanije
      topDestinations,
      daysData,
      dayLabels,
    });
  }, [data]);

  if (!stats) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>Učitavanje statistike...</p>
      </div>
    );
  }

  if (stats.isEmpty) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>Nema podataka za prikaz. Učitajte fajl sa letovima.</p>
        <p style={{ fontSize: "12px", marginTop: "8px" }}>
          ℹ️ Prikazuju se samo sezonski letovi (letovi koji traju duže od jednog dana).
        </p>
      </div>
    );
  }

  // Chart.js konfiguracija za tamnu/svetlu temu
  const chartTextColor = darkMode ? "#e8f0fe" : "#00467f";
  const chartGridColor = darkMode ? "#3a4a58" : "#c8d8e8";
  const chartBackgroundColor = darkMode ? "rgba(0, 180, 216, 0.7)" : "rgba(0, 70, 127, 0.7)";
  const chartBorderColor = darkMode ? "#00b4d8" : "#00467f";

  // Bar chart za top destinacije
  const destinationsChartData = {
    labels: stats.topDestinations.map(d => `${d.city} (${d.airportCode})`),
    datasets: [
      {
        label: "Broj letova",
        data: stats.topDestinations.map(d => d.flightCount),
        backgroundColor: chartBackgroundColor,
        borderColor: chartBorderColor,
        borderWidth: 1,
      },
    ],
  };

  // Pie chart za aviokompanije (top 5, ostalo u "Ostale")
  let pieData = [];
  let pieLabels = [];
  const top5Airlines = stats.allAirlines.slice(0, 5);
  const otherCount = stats.allAirlines.slice(5).reduce((sum, [, count]) => sum + count, 0);
  
  for (const [name, count] of top5Airlines) {
    pieLabels.push(name.length > 15 ? name.substring(0, 12) + "..." : name);
    pieData.push(count);
  }
  if (otherCount > 0) {
    pieLabels.push("Ostale");
    pieData.push(otherCount);
  }

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieData,
        backgroundColor: [
          "rgba(0, 70, 127, 0.8)",
          "rgba(22, 94, 2, 0.8)",
          "rgba(242, 117, 34, 0.8)",
          "rgba(0, 180, 216, 0.8)",
          "rgba(100, 100, 100, 0.8)",
          "rgba(150, 150, 150, 0.8)",
        ],
        borderColor: darkMode ? "#1e2a36" : "white",
        borderWidth: 2,
      },
    ],
  };

  // Bar chart za dane u nedelji
  const daysChartData = {
    labels: stats.dayLabels,
    datasets: [
      {
        label: "Broj letova",
        data: stats.daysData,
        backgroundColor: darkMode ? "rgba(242, 117, 34, 0.7)" : "rgba(242, 117, 34, 0.7)",
        borderColor: darkMode ? "#f27522" : "#f27522",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: { color: chartTextColor, font: { size: 10 } },
      },
      tooltip: {
        backgroundColor: darkMode ? "#1e2a36" : "white",
        titleColor: chartTextColor,
        bodyColor: chartTextColor,
      },
    },
    scales: {
      y: {
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor },
      },
      x: {
        ticks: { color: chartTextColor, maxRotation: 45, minRotation: 45 },
        grid: { color: chartGridColor },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right",
        labels: { color: chartTextColor, font: { size: 9 } },
      },
      tooltip: {
        backgroundColor: darkMode ? "#1e2a36" : "white",
        titleColor: chartTextColor,
        bodyColor: chartTextColor,
      },
    },
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <h3 style={{ color: chartTextColor, marginBottom: "20px" }}>
        📊 Statistika reda letenja (samo sezonski letovi)
      </h3>
      
      {/* Napomena o filtriranju */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "10px", 
        background: darkMode ? "#2a3a48" : "#e8f0fe", 
        borderRadius: "8px",
        fontSize: "12px",
        color: darkMode ? "#8a9aad" : "#6b7a99"
      }}>
        ℹ️ Prikazani su samo sezonski letovi (letovi koji traju duže od jednog dana). 
        Jednodnevni letovi (start = end) nisu uključeni u statistiku.
      </div>
      
      {/* KPI kartice */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
        gap: "16px", 
        marginBottom: "24px" 
      }}>
        <div style={{ 
          background: darkMode ? "#2a3a48" : "white", 
          borderRadius: "12px", 
          padding: "16px", 
          textAlign: "center", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: chartTextColor }}>
            {stats.totalDestinations}
          </div>
          <div style={{ fontSize: "12px", color: darkMode ? "#8a9aad" : "#6b7a99" }}>
            Sezonskih destinacija
          </div>
        </div>
        <div style={{ 
          background: darkMode ? "#2a3a48" : "white", 
          borderRadius: "12px", 
          padding: "16px", 
          textAlign: "center", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: chartTextColor }}>
            {stats.totalFlights}
          </div>
          <div style={{ fontSize: "12px", color: darkMode ? "#8a9aad" : "#6b7a99" }}>
            Ukupno sezonskih letova
          </div>
        </div>
        <div style={{ 
          background: darkMode ? "#2a3a48" : "white", 
          borderRadius: "12px", 
          padding: "16px", 
          textAlign: "center", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: chartTextColor }}>
            {stats.totalAirlines}
          </div>
          <div style={{ fontSize: "12px", color: darkMode ? "#8a9aad" : "#6b7a99" }}>
            Aviokompanija
          </div>
        </div>
      </div>

      {/* Grafikoni */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "24px" 
      }}>
        {/* Top destinacije */}
        <div style={{ 
          background: darkMode ? "#1e2a36" : "white", 
          borderRadius: "12px", 
          padding: "16px", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
        }}>
          <h4 style={{ color: chartTextColor, marginBottom: "12px" }}>✈ Top 10 destinacija</h4>
          <Bar data={destinationsChartData} options={chartOptions} height={250} />
        </div>

        {/* Raspored po danima */}
        <div style={{ 
          background: darkMode ? "#1e2a36" : "white", 
          borderRadius: "12px", 
          padding: "16px", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
        }}>
          <h4 style={{ color: chartTextColor, marginBottom: "12px" }}>📅 Letovi po danima u nedelji</h4>
          <Bar data={daysChartData} options={chartOptions} height={250} />
        </div>

        {/* Top aviokompanije - Pie chart */}
        <div style={{ 
          background: darkMode ? "#1e2a36" : "white", 
          borderRadius: "12px", 
          padding: "16px", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
        }}>
          <h4 style={{ color: chartTextColor, marginBottom: "12px" }}>🏢 Raspored letova po aviokompanijama</h4>
          <div style={{ height: "250px" }}>
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Lista top destinacija */}
      <div style={{ 
        marginTop: "24px", 
        background: darkMode ? "#1e2a36" : "white", 
        borderRadius: "12px", 
        padding: "16px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
      }}>
        <h4 style={{ color: chartTextColor, marginBottom: "12px" }}>🏆 Najprometnije destinacije</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {stats.topDestinations.map((dest, idx) => (
            <div 
              key={dest.airportCode} 
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "8px 0", 
                borderBottom: `1px solid ${darkMode ? "#2a3a48" : "#e0eaf5"}` 
              }}
            >
              <span style={{ fontWeight: "bold", color: chartTextColor }}>
                {idx + 1}. {dest.city} ({dest.airportCode})
                {dest.country && <span style={{ fontSize: "11px", color: darkMode ? "#8a9aad" : "#6b7a99", marginLeft: "8px" }}>({dest.country})</span>}
              </span>
              <span style={{ color: darkMode ? "#00b4d8" : "#0077b6", fontWeight: "bold" }}>
                {dest.flightCount} letova
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista SVIH aviokompanija (umesto samo top 10) */}
      <div style={{ 
        marginTop: "24px", 
        background: darkMode ? "#1e2a36" : "white", 
        borderRadius: "12px", 
        padding: "16px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
      }}>
        <h4 style={{ color: chartTextColor, marginBottom: "12px" }}>
          ✈️ Sve aviokompanije ({stats.totalAirlines})
        </h4>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
          gap: "8px",
          maxHeight: "400px",
          overflowY: "auto",
          padding: "8px"
        }}>
          {stats.allAirlines.map(([name, count], idx) => (
            <div 
              key={name} 
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "6px 8px", 
                borderBottom: `1px solid ${darkMode ? "#2a3a48" : "#e0eaf5"}`,
                fontSize: "13px"
              }}
            >
              <span style={{ color: chartTextColor }}>
                {idx + 1}. {name}
              </span>
              <span style={{ color: darkMode ? "#00b4d8" : "#0077b6", fontWeight: "bold" }}>
                {count} letova
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}