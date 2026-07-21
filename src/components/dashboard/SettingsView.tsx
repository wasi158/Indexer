"use client";

import { useState } from "react";
import data from "@/data/dashboard.json";
import { DashCard, DashboardShell } from "@/components/dashboard/DashboardShell";
import { cn } from "@/lib/cn";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 rounded-full transition-colors duration-300",
        checked ? "bg-brand" : "bg-black/15",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

export function SettingsView() {
  const { settings } = data;
  const [notifications, setNotifications] = useState(settings.notifications);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function toggleNotification(id: string) {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  }

  const accountFields = [
    { label: "NAME", value: settings.account.name },
    { label: "EMAIL", value: settings.account.email },
    { label: "ROLE", value: settings.account.role },
    { label: "NORMAL CREDITS", value: String(settings.account.normalCredits) },
    { label: "VIP CREDITS", value: String(settings.account.vipCredits) },
  ];

  return (
    <DashboardShell title={settings.title} subtitle={settings.subtitle}>
      <div className="space-y-4">
        <DashCard>
          <h2 className="mb-4 text-lg font-bold text-ink">Notifications</h2>
          <div className="divide-y divide-border">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{item.description}</p>
                </div>
                <Toggle
                  checked={item.enabled}
                  onChange={() => toggleNotification(item.id)}
                />
              </div>
            ))}
          </div>
        </DashCard>

        <DashCard>
          <h2 className="mb-4 text-lg font-bold text-ink">Account</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {accountFields.map((field) => (
              <div key={field.label}>
                <p className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">
                  {field.label}
                </p>
                <p className="mt-1 font-semibold text-ink">{field.value}</p>
              </div>
            ))}
          </div>
        </DashCard>

        <DashCard>
          <h2 className="mb-4 text-lg font-bold text-ink">{settings.password.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-ink-muted uppercase">
                {settings.password.currentLabel}
              </span>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-ink-muted uppercase">
                {settings.password.newLabel}
              </span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </label>
          </div>
          <button
            type="button"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-xl btn-primary-gradient px-5 text-sm font-semibold text-white shadow-brand transition hover:shadow-brand-lg hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {settings.password.cta}
          </button>
        </DashCard>

        <DashCard>
          <h2 className="mb-6 text-lg font-bold text-ink">
            {settings.creditHistory.title}
          </h2>
          <p className="py-8 text-center text-sm text-ink-muted">
            {settings.creditHistory.empty}
          </p>
        </DashCard>
      </div>
    </DashboardShell>
  );
}
