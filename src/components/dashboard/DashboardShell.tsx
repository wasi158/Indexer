"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import data from "@/data/dashboard.json";
import { cn } from "@/lib/cn";
import {
  Icon,
  IconBolt,
  IconClose,
  IconLogoMark,
  IconLogOut,
  IconMenu,
  IconPlus,
  type IconName,
} from "@/components/atoms/Icon";
import { WhatsAppFab } from "@/components/organisms/WhatsAppFab";
import { useCampaignModal } from "@/components/dashboard/NewCampaignModal";
import { getSession, type AuthSession } from "@/lib/auth";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { brand, nav, user } = data;
  const [session, setSessionState] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSessionState(getSession());
  }, []);

  const displayName = session?.name || user.name;
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/45 backdrop-blur-[2px] lg:hidden transition-opacity",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-sidebar text-white transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-brand/25 to-transparent" />

        <div className="relative flex items-center justify-between gap-2 px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl btn-primary-gradient text-white shadow-brand">
              <IconLogoMark size={18} />
            </span>
            <span className="text-[15px] font-bold tracking-tight">{brand}</span>
          </Link>
          <button
            type="button"
            className="lg:hidden rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white"
            onClick={onClose}
            aria-label="Close menu"
          >
            <IconClose size={18} />
          </button>
        </div>

        <nav className="relative mt-1 flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-brand/20 text-brand-light shadow-[inset_0_0_0_1px_rgba(45,212,191,0.25)]"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-light" />
                )}
                <Icon name={item.icon as IconName} size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative border-t border-white/8 bg-sidebar-elevated/40 px-4 py-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full btn-primary-gradient text-sm font-bold text-white shadow-brand">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{displayName}</p>
              <p className="text-xs text-white/45">{user.role}</p>
            </div>
          </div>
          <Link
            href="/logout"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-white/50 transition hover:text-brand-light"
          >
            <IconLogOut size={15} />
            Sign out
          </Link>
        </div>
      </aside>
    </>
  );
}

export function DashboardHeader({
  title,
  subtitle,
  onMenu,
}: {
  title: string;
  subtitle: string;
  onMenu: () => void;
}) {
  const { user, headerCta } = data;
  const { openModal } = useCampaignModal();

  return (
    <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-ink shadow-sm transition hover:border-brand/30 hover:text-brand lg:hidden"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <IconMenu size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.85rem]">
            {title}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-sm font-medium text-ink-muted shadow-sm">
          <IconBolt size={14} className="text-brand" />
          {user.credits} credits
        </span>
        <button
          type="button"
          onClick={openModal}
          className="btn-primary-gradient inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold text-white shadow-brand transition hover:shadow-brand-lg hover:-translate-y-0.5"
        >
          <IconPlus size={15} />
          {headerCta.label}
        </button>
      </div>
    </header>
  );
}

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen dash-canvas">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <DashboardHeader
            title={title}
            subtitle={subtitle}
            onMenu={() => setMobileOpen(true)}
          />
          {children}
        </div>
      </div>
      <WhatsAppFab />
    </div>
  );
}

export function DashCard({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "card-lift rounded-2xl border border-border bg-surface-elevated p-5 shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
