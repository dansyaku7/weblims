import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { LoadingProvider } from "@/components/context/LoadingContext";
// 1. IMPORT AuthProvider DARI NEXTAUTH YANG SUDAH KITA BUAT
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LIMS - Delta Indonesia Laboratory",
  description: "LIMS Delta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. BUNGKUS SEMUANYA DENGAN AuthProvider */}
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingProvider>
              {children}
              <Toaster richColors position="top-center" />
            </LoadingProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}