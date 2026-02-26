import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radje — Online Draairad",
  description:
    "Draai aan het rad! Alfabet draairad in Pim Pam Pet stijl of maak je eigen rad met eigen opties.",
  openGraph: {
    title: "Radje — Online Draairad",
    description:
      "Draai aan het rad! Alfabet draairad in Pim Pam Pet stijl of maak je eigen rad met eigen opties.",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary",
    title: "Radje — Online Draairad",
    description:
      "Draai aan het rad! Alfabet draairad in Pim Pam Pet stijl of maak je eigen rad met eigen opties.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${nunito.variable} antialiased`}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
