import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContentSection from "@/components/content-section";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LocaleProvider>
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen bg-slate-900">
            <Header />
            <ContentSection>
              <Component {...pageProps} />
            </ContentSection>
            <Footer />
          </div>
        </div>
      </LocaleProvider>
    </>
  );
}
