export const metadata = {
  title: "Tivat Airport – Timetable PDF Generator",
  description: "Generate seasonal timetable PDFs for Tivat Airport (LYTV/TIV)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f0f4f8" }}>
        {children}
      </body>
    </html>
  );
}
