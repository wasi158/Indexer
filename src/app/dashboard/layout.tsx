import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CampaignModalProvider } from "@/components/dashboard/NewCampaignModal";

export const metadata: Metadata = {
  title: "Dashboard — Instant Indexer",
  description: "Manage campaigns, sitemap imports, billing, and settings.",
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CampaignModalProvider>{children}</CampaignModalProvider>;
}
