import data from "@/data/landing.json";
import { IconWhatsApp } from "@/components/atoms/Icon";

export function WhatsAppFab() {
  const { whatsapp } = data.site;

  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,0.75)] transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-[0_18px_40px_-8px_rgba(37,211,102,0.9)] active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <IconWhatsApp size={20} />
      {whatsapp.label}
    </a>
  );
}
