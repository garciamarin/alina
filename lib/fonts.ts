import { Urbanist } from "next/font/google";
import localFont from "next/font/local";

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
