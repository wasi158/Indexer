"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import auth from "@/data/auth.json";
import { setSession } from "@/lib/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/atoms/Button";
import { IconArrowRight } from "@/components/atoms/Icon";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = auth;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setLoading(true);
    setSession({ name: name.trim(), email: email.trim() });
    setTimeout(() => {
      router.push("/dashboard");
    }, 350);
  }

  return (
    <AuthShell
      title={signup.title}
      subtitle={signup.subtitle}
      footer={
        <>
          {signup.footer}{" "}
          <Link href={signup.footerHref} className="font-semibold text-brand hover:underline">
            {signup.footerLink}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            {signup.nameLabel}
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={signup.namePlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            {signup.emailLabel}
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={signup.emailPlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            {signup.passwordLabel}
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={signup.passwordPlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Creating…" : signup.submit}
          <IconArrowRight size={16} />
        </Button>

        <p className="text-center text-xs text-ink-faint">{signup.demoHint}</p>
      </form>
    </AuthShell>
  );
}
