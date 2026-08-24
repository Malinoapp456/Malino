import "./globals.css";
export const metadata={title:"Malino",description:"Kreatives Mal-Abenteuer für Kinder",manifest:"/manifest.webmanifest",themeColor:"#72c9ff",icons:{icon:[{url:"/icon-192.png",sizes:"192x192",type:"image/png"},{url:"/icon-512.png",sizes:"512x512",type:"image/png"}],apple:"/apple-touch-icon.png"},appleWebApp:{capable:true,statusBarStyle:"default",title:"Malino"}};
export default function RootLayout({children}){return <html lang="de"><body>{children}</body></html>}
