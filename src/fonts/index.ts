import localFont from "next/font/local";

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

export { mainFont };
