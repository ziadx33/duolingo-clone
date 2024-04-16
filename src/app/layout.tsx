import { ThemeProvider } from "@/components/theme-provider";
import { mainFont } from "@/fonts";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "./next-auth-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <NextAuthProvider>{children}</NextAuthProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
