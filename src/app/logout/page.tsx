"use client";

import Link from "next/link";
import { useEffect } from "react";
import auth from "@/data/auth.json";
import { clearSession } from "@/lib/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/atoms/Button";
import { IconArrowRight, IconLogOut } from "@/components/atoms/Icon";

export default function LogoutPage() {
  const { logout } = auth;

  useEffect(() => {
    clearSession();
  }, []);

  return (
    <AuthShell title={logout.title} subtitle={logout.subtitle}>
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <IconLogOut size={24} />
        </span>
        <p className="mb-6 text-sm text-ink-muted">
          Your local demo session has been cleared.
        </p>
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Button href="/signin" className="w-full" size="lg">
            {logout.primary}
            <IconArrowRight size={16} />
          </Button>
          <Button href="/" variant="secondary" className="w-full" size="lg">
            {logout.secondary}
          </Button>
        </div>
        <Link href="/signup" className="mt-4 text-sm font-medium text-brand hover:underline">
          Create a new account
        </Link>
      </div>
    </AuthShell>
  );
}
