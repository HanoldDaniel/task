import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Providers } from "~/core/providers/Providers";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
