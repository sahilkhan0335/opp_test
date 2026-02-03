import type { Metadata } from "next";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { WaitlistModalProvider } from "@/contexts/WaitlistModalContext";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "oppspaces",
  description: "Swipe your next big opportunity",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <AppProviders>
          <WaitlistModalProvider>
            {children}
          </WaitlistModalProvider>
        </AppProviders>
      </body>
    </html>
  );
}
