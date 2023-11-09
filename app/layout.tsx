import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import "tw-elements/dist/css/tw-elements.min.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fetch Frontend Take-Home Exercise",
  description: "Hung Vu's submission for the Fetch frontend take-home exercise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <main className="p-5">
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
