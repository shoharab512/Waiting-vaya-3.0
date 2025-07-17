import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waiting Vaya",
  description: "Waiting Vaya is a platform for problem solving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
            <Toaster />
          </ReduxProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
