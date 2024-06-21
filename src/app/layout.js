import { Karla, Lora } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"], variable: "--karla-font" });
const lora = Lora({ subsets: ["latin"], variable: "--lora-font" });

export const metadata = {
  title: "JogjaFood Finder",
  description: "JogjaFood Finder Website",
  icons: {
    icon: "/jff-favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${lora.variable}`}>{children}</body>
    </html>
  );
}
