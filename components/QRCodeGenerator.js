"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QRCodeGenerator({ pdfData, filename, darkMode }) {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const generateQR = async () => {
    if (!pdfData) return;
    
    try {
      // Kreiraj URL sa podacima o PDF-u (može biti i link za preuzimanje)
      const dataToEncode = JSON.stringify({
        filename: filename,
        date: new Date().toISOString(),
        summary: {
          destinations: pdfData.grouped?.length || 0,
          type: pdfData.type,
        },
      });
      
      // Generiši QR kod
      const qrDataUrl = await QRCode.toDataURL(dataToEncode, {
        width: 200,
        margin: 2,
        color: {
          dark: darkMode ? "#00b4d8" : "#00467f",
          light: darkMode ? "#1e2a36" : "#ffffff",
        },
      });
      
      setQrCodeUrl(qrDataUrl);
      setShowQR(true);
    } catch (err) {
      console.error("Greška pri generisanju QR koda:", err);
    }
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <button
        style={{
          padding: "8px 16px",
          background: darkMode ? "#2a3a48" : "#e8f0fe",
          color: darkMode ? "#00b4d8" : "#00467f",
          border: "1px solid",
          borderColor: darkMode ? "#3a4a58" : "#c8d8e8",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onClick={generateQR}
      >
        📱 Generiši QR kod
      </button>
      
      {showQR && qrCodeUrl && (
        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            style={{ 
              width: "120px", 
              height: "120px",
              borderRadius: "8px",
              border: `1px solid ${darkMode ? "#3a4a58" : "#c8d8e8"}`,
              padding: "8px",
              background: darkMode ? "#1e2a36" : "white",
            }} 
          />
          <p style={{ fontSize: "10px", color: darkMode ? "#8a9aad" : "#6b7a99", marginTop: "8px" }}>
            Skenirajte za detalje o PDF-u
          </p>
        </div>
      )}
    </div>
  );
}