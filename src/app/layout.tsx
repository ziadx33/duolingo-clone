import { mainFont } from "@/fonts";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Duolingo clone",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
