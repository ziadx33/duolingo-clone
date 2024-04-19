import localFont from "next/font/local";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { type NextFontWithVariable } from "next/dist/compiled/@next/font";

const mainFont = localFont({
  variable: "--font-main",
  src: [
    {
      path: "./main.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const arFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ar",
  weight: "700",
});

const fonts: Record<string, NextFontWithVariable> = { ar: arFont };

export { mainFont, arFont, fonts };
