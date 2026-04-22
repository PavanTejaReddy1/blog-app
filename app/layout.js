import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        <Header className="z-50"/>
    
        <main className="pt-2">
          {children}
        </main>

      </body>
    </html>
  );
}
