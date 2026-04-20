import type { Metadata } from "next";
import { DustMotes } from "@/components/DustMotes";
import { FooterLand } from "@/components/FooterLand";
import { Nav } from "@/components/Nav";
import { Rail } from "@/components/Rail";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lavender Family Ranch",
  description:
    "A private ranch outside Mound City, Kansas. By invitation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Italiana&family=Work+Sans:wght@300;400;500&display=swap"
        />
      </head>
      <body className="bg-cream text-ink">
        <Nav />
        <Rail />
        <DustMotes />
        {children}
        <FooterLand />
      </body>
    </html>
  );
}
