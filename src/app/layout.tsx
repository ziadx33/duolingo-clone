import { ThemeProvider } from "@/components/theme-provider";
import { mainFont } from "@/fonts";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import NextAuthProvider from "./next-auth-provider";
import { Toaster } from "@/components/ui/sonner";

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
          <NextAuthProvider>
            <TRPCReactProvider>
              <main>{children}</main>
              <Toaster richColors />
            </TRPCReactProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
