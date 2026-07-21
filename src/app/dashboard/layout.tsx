import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CampaignModalProvider } from "@/components/dashboard/NewCampaignModal";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Dashboard — Instant Indexer",
  description: "Manage campaigns, sitemap imports, billing, and settings.",
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard>
      <CampaignModalProvider>{children}</CampaignModalProvider>
    </AuthGuard>
  );
}
