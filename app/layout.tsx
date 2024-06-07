import type { Metadata } from "next";
import "./globalStyles.css";
import { bahnSchrift, urbanist } from "@/lib/fonts";

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
    <html lang="en" className="text-justify">
      <body className={`${urbanist.variable} ${bahnSchrift.variable} font-sans`}>
        {children}
      </body >
    </html >
  );
}
