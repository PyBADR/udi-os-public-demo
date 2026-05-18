"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANG_COOKIE, type Lang } from "@/lib/i18n";

// Sets a long-lived cookie and triggers a router refresh so server components
// re-render with the new language. The cookie is read by `getLang()` in
// `lib/i18n.ts` from `next/headers.cookies()`.
export function LanguageToggle({ current }: { current: Lang }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function set(next: Lang) {
    if (next === current) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => router.refresh());
  }

  const btn = (lang: Lang, label: string) => (
    <button
      type="button"
      onClick={() => set(lang)}
      data-testid={`lang-toggle-${lang}`}
      aria-pressed={current === lang}
      disabled={pending}
      className={`px-2 py-1 text-[11px] font-mono border ${
        current === lang
          ? "border-ink bg-ink text-paper"
          : "border-rule text-ink-mute hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-1" data-testid="language-toggle">
      {btn("en", "EN")}
      {btn("ar", "AR")}
    </div>
  );
}
