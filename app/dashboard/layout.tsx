import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import DashboardShell from "@/components/agents/shared/DashboardShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Tableau de bord — ImmoGest",
  description: "Gérez vos biens et votre activité immobilière depuis votre espace ImmoGest.",
};

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
