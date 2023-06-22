import "./globals.css";

import { Inter } from "next/font/google";
import Header from "./header/header";
import Provider from "./SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShubhamCodes",
  description: "Best Products from Globe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <header>
            <Header />
          </header>
          {children}
        </Provider>
      </body>
    </html>
  );
}
