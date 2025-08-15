import "@/app/globals.css";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Dancing_Script, Inter } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { APP_CONFIG } from "@/lib/constants";
import { Locale } from "@/lib/types";
import { Providers } from "@/lib/providers";

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata: Metadata = {
  generator: "Next.js 15 – next-intl",
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  metadataBase: new URL(APP_CONFIG.url),
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    siteName: APP_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased`}>
        <Providers>
          <ErrorBoundary>
            <NextIntlClientProvider locale={locale}>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1" role="main">
                    {children}
                  </main>
                  <Footer />
                </div>

                <Toaster 
                  position="top-center" 
                  richColors 
                  closeButton
                  duration={4000}
                />
              </ThemeProvider>
            </NextIntlClientProvider>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
