import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proplayas | Plataforma de Investigación",
  description: "Plataforma colaborativa para investigación y conocimiento en ciencias marinas y costas",
  keywords: ["investigación", "ciencias marinas", "colaboración", "conocimiento", "proplayas"],
  authors: [{ name: "Proplayas Team", url: "https://proplayas.org" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://proplayas.org",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://proplayas.org",
    title: "Proplayas | Plataforma de Investigación",
    description: "Plataforma colaborativa para investigación y conocimiento en ciencias marinas y costas",
    siteName: "Proplayas",
    images: [
      {
        url: "https://proplayas.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Proplayas",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proplayas",
    description: "Plataforma colaborativa para investigación",
    images: ["https://proplayas.org/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-center" expand={true} richColors />
      </body>
    </html>
  );
}
