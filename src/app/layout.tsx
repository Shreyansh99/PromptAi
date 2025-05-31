import type { Metadata } from "next";
import "@fontsource/poppins/700.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/fira-mono/400.css";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Prompt Genie - AI Prompt Optimizer",
  description: "Transform your ideas into powerful AI prompts with Prompt Genie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-modern-glass font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
