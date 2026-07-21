"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import auth from "@/data/auth.json";
import { setSession } from "@/lib/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/atoms/Button";
import { IconArrowRight } from "@/components/atoms/Icon";

export default function SignInPage() {
  const router = useRouter();
  const { signin } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setSession({
      email: email.trim(),
      name: email.split("@")[0] || "Member",
    });
    setTimeout(() => {
      router.push("/dashboard");
    }, 350);
  }

  return (
    <AuthShell
      title={signin.title}
      subtitle={signin.subtitle}
      footer={
        <>
          {signin.footer}{" "}
          <Link href={signin.footerHref} className="font-semibold text-brand hover:underline">
            {signin.footerLink}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            {signin.emailLabel}
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={signin.emailPlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            {signin.passwordLabel}
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={signin.passwordPlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Signing in…" : signin.submit}
          <IconArrowRight size={16} />
        </Button>

        <p className="text-center text-xs text-ink-faint">{signin.demoHint}</p>
      </form>
    </AuthShell>
  );
}
