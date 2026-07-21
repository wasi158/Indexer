"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import data from "@/data/dashboard.json";
import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconClose,
  IconLock,
  IconPlus,
} from "@/components/atoms/Icon";

type CampaignModalContextValue = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const CampaignModalContext = createContext<CampaignModalContextValue | null>(
  null,
);

export function useCampaignModal() {
  const ctx = useContext(CampaignModalContext);
  if (!ctx) {
    throw new Error("useCampaignModal must be used within CampaignModalProvider");
  }
  return ctx;
}

function countUrls(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean).length;
}

function NewCampaignModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modal = data.newCampaignModal;
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("normal");
  const [urls, setUrls] = useState("");
  const detected = countUrls(urls);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setName("");
      setSpeed("normal");
      setUrls("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-ink/45 backdrop-blur-[3px] animate-fade-up"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-campaign-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_80px_-24px_rgba(11,18,32,0.45)] animate-fade-up"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
              <IconPlus size={18} />
            </span>
            <h2 id="new-campaign-title" className="text-lg font-bold text-ink">
              {modal.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-faint transition hover:bg-brand-soft hover:text-ink"
            aria-label="Close"
          >
            <IconClose size={18} />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">
              {modal.nameLabel}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={modal.namePlaceholder}
              className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <div>
            <p className="mb-2 text-sm font-semibold text-ink">{modal.speedLabel}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {modal.speeds.map((option) => {
                const selected = speed === option.id;
                const locked = option.locked;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={locked}
                    onClick={() => !locked && setSpeed(option.id)}
                    className={cn(
                      "rounded-xl border px-3.5 py-3 text-left transition",
                      locked && "cursor-not-allowed bg-surface opacity-80",
                      !locked && selected
                        ? "border-brand bg-brand-soft shadow-[0_0_0_1px_rgba(13,148,136,0.15)]"
                        : !locked &&
                            "border-border bg-white hover:border-brand/35",
                    )}
                  >
                    <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
                      {locked && <IconLock size={14} className="text-ink-faint" />}
                      {option.title}
                    </span>
                    <span className="mt-1 block text-xs text-ink-muted">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 flex flex-wrap items-center gap-1 text-sm font-semibold text-ink">
              {modal.urlsLabel}
              <span className="font-medium text-ink-muted">
                · {modal.urlsHint} · {detected} detected
              </span>
            </span>
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder={modal.urlsPlaceholder}
              rows={5}
              className="w-full resize-y rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-surface/60 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:bg-brand-soft"
          >
            {modal.cancelLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-primary-gradient inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white shadow-brand transition hover:shadow-brand-lg hover:-translate-y-0.5"
          >
            {modal.submitLabel}
            <IconArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CampaignModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  );

  return (
    <CampaignModalContext.Provider value={value}>
      {children}
      <NewCampaignModal open={open} onClose={closeModal} />
    </CampaignModalContext.Provider>
  );
}
