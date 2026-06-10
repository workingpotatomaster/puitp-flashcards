import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiszki PUiTP",
  description: "Fiszki do nauki na egzamin z Podstawowych Umiejętności i Technik Psychoterapeutycznych",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
