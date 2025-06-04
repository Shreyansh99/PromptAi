import type { Metadata } from "next";
import "@fontsource/poppins/700.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/fira-mono/400.css";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "PromptPilot - AI Prompt Optimizer",
  description: "Transform your ideas into powerful AI prompts with PromptPilot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white font-sans">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}
