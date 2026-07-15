import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Providers } from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SunCart | Premium Summer Essentials Store",
  description: "Explore our curated collection of summer essentials including sunglasses, swimwear, hats, and organic sun protection. Enjoy the ultimate sun-soaked experience.",
  openGraph: {
    title: "SunCart | Premium Summer Essentials Store",
    description: "Explore our curated collection of summer essentials including sunglasses, swimwear, hats, and organic sun protection.",
    type: "website",
    siteName: "SunCart",
  },
  twitter: {
    card: "summary_large_image",
    title: "SunCart | Premium Summer Essentials Store",
    description: "Explore our curated collection of summer essentials including sunglasses, swimwear, hats, and organic sun protection.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="min-h-full flex flex-col bg-soft-beige text-slate-800">
        <Providers>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
