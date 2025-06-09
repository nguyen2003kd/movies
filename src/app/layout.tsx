import type { Metadata } from "next";
import "./globals.css";
import Header from "./(component)/heard";
import Footer from "./(component)/footer";
export const metadata: Metadata = {
  title: "Page Home",
  description: "This is page home",
};

export default function RootLayout({
   children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="bg-black static">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
