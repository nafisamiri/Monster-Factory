import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Monster Factory",
  description: "Generates a monster inc character based on your given images using OpenAI Dall-E.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full h-screen flex flex-col justify-between bg-gray-100">
        <Header />
        {children}
      </body>
    </html>
  );
}
