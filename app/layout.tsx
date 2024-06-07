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
    <html lang="en">
      <body className={`${urbanist.variable} ${bahnSchrift.variable} font-sans text-justify`}>
        {children}
      </body >
    </html >
  );
}
