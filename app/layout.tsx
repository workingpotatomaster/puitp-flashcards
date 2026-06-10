import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import BackgroundDecor from "@/components/BackgroundDecor";

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
    <html lang="pl" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <BackgroundDecor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
