import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../store/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kıymetli Maden - Premium Altın Mağazası",
  description: "En kaliteli altın ürünler, canlı fiyatlar ve güvenilir hizmet. Gram altın, çeyrek altın, yarım altın ve tam altın fiyatları.",
  keywords: "altın, gram altın, çeyrek altın, yarım altın, tam altın, altın fiyatları, altın takı, altın yatırım",
  icons: {
    icon: '/browser-icon.png',
    shortcut: '/browser-icon.png',
    apple: '/browser-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
