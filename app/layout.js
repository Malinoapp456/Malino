import "./globals.css";
export const metadata = {
  title: "Malino – Dein kreativer Freund",
  description: "Sichere Mal-App für Kinder – ohne Werbung."
};
export default function RootLayout({children}) {
  return <html lang="de"><body>{children}</body></html>;
}
