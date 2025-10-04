import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import siteConfig from "@/data/site-config.json";
import metaContent from "@/data/meta-content.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Enhanced Structured Data for Local SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Elite Cabs 24X7",
  "alternateName": "Elite Cabs Mumbai",
  "description": "Premium car rental service in Mumbai with professional drivers. 24X7 airport transfers, corporate travel, wedding & event transportation. Best cab service near me.",
  "url": "https://elitecabsmumbai.com",
  "telephone": "+917021751691",
  "email": "contact.elitecabsmumbai@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Mumbai",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.0760,
    "longitude": 72.8777,
  },
  "openingHours": [
    "Mo-Su 00:00-23:59"
  ],
  "priceRange": "₹₹ - ₹₹₹₹",
  "image": "/assets/logo.png",
  "logo": "/assets/logo.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "28593",
    "bestRating": "5",
    "worstRating": "1"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Mumbai Metropolitan Area",
    "description": "Serving all areas of Mumbai including South Mumbai, Western Suburbs, Eastern Suburbs, Navi Mumbai, and Thane"
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Mumbai, Maharashtra",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Car Rental Services in Mumbai",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Airport Transfer Service",
          "description": "24X7 airport pickup and drop services in Mumbai. Domestic and International airport transfers.",
          "serviceType": "Airport Transfer"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Local Taxi Service",
          "description": "Local taxi service within Mumbai city for daily commuting and sightseeing.",
          "serviceType": "Local Taxi"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Corporate Travel",
          "description": "Premium corporate transportation services for business meetings and events.",
          "serviceType": "Corporate Travel"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding & Event Transportation",
          "description": "Special event and wedding car rental services with luxury vehicles.",
          "serviceType": "Event Transportation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Outstation Taxi",
          "description": "Outstation taxi service from Mumbai to Pune, Lonavala, Mahabaleshwar and other destinations.",
          "serviceType": "Outstation Travel"
        }
      }
    ]
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "name": "Customer Service",
    "serviceUrl": "https://elitecabsmumbai.com",
    "servicePhone": "+917021751691",
    "availableLanguage": ["Hindi", "English", "Marathi"]
  },
  "sameAs": [
    "https://wa.me/917021751691"
  ]
};

// Taxi Service Schema for better local SEO
const taxiServiceSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Elite Cabs 24X7",
  "description": "Premium taxi service in Mumbai offering 24X7 cab service near me with professional drivers.",
  "url": "https://elitecabsmumbai.com",
  "telephone": "+917021751691",
  "serviceType": "Taxi Service",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Elite Cabs 24X7",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  },
  "areaServed": "Mumbai, Maharashtra",
  "availableAtOrFrom": {
    "@type": "Place",
    "name": "Mumbai",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  },
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Digital Wallets",
  "priceRange": "₹₹ - ₹₹₹₹"
};

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  keywords: siteConfig.meta.keywords.split(', '),
  authors: [{ name: siteConfig.meta.author }],
  creator: "ITZ Adarsh",
  publisher: "Elite Cabs 24X7",
  formatDetection: metaContent.meta.formatDetection,
  metadataBase: new URL('https://elitecabsmumbai.com'),
  alternates: {
    canonical: metaContent.links.canonical,
  },
  openGraph: {
    title: siteConfig.meta.og.title,
    description: siteConfig.meta.og.description,
    url: siteConfig.meta.og.url,
    siteName: "Elite Cabs 24X7",
    type: siteConfig.meta.og.type,
    locale: "en_IN",
    images: [
      {
        url: siteConfig.meta.og.image,
        width: 1200,
        height: 630,
        alt: siteConfig.meta.og.title,
      },
    ],
  },
  twitter: {
    card: siteConfig.meta.twitter.card,
    title: siteConfig.meta.twitter.title,
    description: siteConfig.meta.twitter.description,
    images: [
      {
        url: siteConfig.meta.twitter.image,
        width: 1200,
        height: 675,
        alt: siteConfig.meta.twitter.title,
      },
    ],
    creator: "@elitecabsmumbai",
    site: "@elitecabsmumbai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: metaContent.verification.googleSiteVerification,
  },
  category: "transportation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(taxiServiceSchema)
          }}
        />
        <link rel="icon" href={siteConfig.icons.favicon} />
        <link rel="apple-touch-icon" href={siteConfig.icons.appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={siteConfig.icons.favicon} />
        <link rel="icon" type="image/png" sizes="16x16" href={siteConfig.icons.favicon} />
        <meta name="theme-color" content={metaContent.meta.themeColor} />
        <meta name="msapplication-TileColor" content={metaContent.meta.msapplicationTileColor} />
        <meta name="msapplication-config" content={metaContent.meta.msapplicationConfig} />
        
        {/* Preconnect links for performance */}
        {metaContent.links.preconnect.map((url: string, index: number) => (
          <link key={`preconnect-${index}`} rel="preconnect" href={url} crossOrigin="anonymous" />
        ))}
        
        {/* DNS prefetch links */}
        {metaContent.links.dnsPrefetch.map((url: string, index: number) => (
          <link key={`dns-${index}`} rel="dns-prefetch" href={url} />
        ))}
        
        {/* Security meta tags */}
        <meta name="referrer" content={metaContent.security.referrer} />
        <meta name="google-site-verification" content="xiZ2jypV_3eoxtsouKEWUHJNaoQHQ1urHT16j9Pkr1s" />
        
        {/* Additional verification meta tags */}
        {metaContent.verification.msvalidate && (
          <meta name="msvalidate.01" content={metaContent.verification.msvalidate} />
        )}
        {metaContent.verification.yandexVerification && (
          <meta name="yandex-verification" content={metaContent.verification.yandexVerification} />
        )}
        {metaContent.verification.facebookDomainVerification && (
          <meta name="facebook-domain-verification" content={metaContent.verification.facebookDomainVerification} />
        )}
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        
        {/* Business hours meta tag */}
        <meta name="business:hours:day" content="monday,tuesday,wednesday,thursday,friday,saturday,sunday" />
        <meta name="business:hours:start" content="00:00" />
        <meta name="business:hours:end" content="23:59" />
        <meta name="google-adsense-account" content="ca-pub-2355033797574310">
        
        {/* Contact info meta tags */}
        <meta name="contact" content="+917021751691" />
        <meta name="contact:email" content="contact.elitecabsmumbai@gmail.com" />
        <meta name="contact:whatsapp" content="+917021751691" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
