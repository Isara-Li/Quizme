import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Inter} from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quizme",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={cn(
          inter.className, 
          "antialiased min-h-screen flex flex-col"
        )}
      >
        <Providers>
          <Navbar className="fixed top-0 left-0 right-0 z-50" />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}