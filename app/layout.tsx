import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import localFont from "next/font/local";
import "./globalStyles.css";

export const urbanist = Urbanist(
  {
    subsets: ["latin"],
    variable: "--font-urbanist",
  }
);

export const bahnSchrift = localFont({
  src: [
    {
      path: '../public/fonts/bahnschrift.ttf',
      weight: '400'
    },
  ],
  variable: '--font-bahnschrift'
})

export const metadata: Metadata = {
  title: "alina",
  description: "Alina Salzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} font-sans text-justify`}>{children}</body >
    </html >
  );
}
