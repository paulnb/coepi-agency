import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- This connects your design file!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coepi Agency",
  description: "AI Automation & Creative Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}