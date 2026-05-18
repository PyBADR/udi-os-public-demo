// Public Demo · Layout — minimal nav exposing only the two demo
// surfaces. Replaces the private repo's full V2 journey nav with
// a two-route public navigation. The brand line and metadata are
// derived from the private repo's i18n dictionary.
//
// No internal route references, no private nav entries, no staged
// items. This is the public-demo-mirror layout.

import type { Metadata } from "next";
import { getLang } from "@/lib/i18n-server";
import Link from "next/link";
import "./globals.css";
import { dirFor, t } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";

export const metadata: Metadata = {
  title: "GCC Urban Decision Intelligence OS — Public Demo Preview",
  description:
    "Public investor-facing demo of the GCC Urban Decision Intelligence OS. Advisory only. Cloud-agnostic. Human-reviewed. No automated decisioning. No active cloud integration. No production deployment claim.",
};

interface NavEntry {
  label_en: string;
  label_ar: string;
  href: string;
}
const NAV: NavEntry[] = [
  { label_en: "Overview",          label_ar: "نظرة عامة",       href: "/v2/overview" },
  { label_en: "Partner Backbone",  label_ar: "عمود الشركاء",     href: "/v2/partner-backbone" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getLang();
  const dir = dirFor(lang);

  return (
    <html lang={lang} dir={dir}>
      <body className="min-h-screen font-sans" data-testid={`body-lang-${lang}`}>
        <header className="v2-shell-bg border-b v2-border-line print:hidden">
          <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between gap-6">
            <Link href="/" className="flex flex-col">
              <span className="text-xs uppercase tracking-widest v2-text-muted">
                {t("brand.line1", lang)}
              </span>
              <span className="font-serif text-xl v2-text-strong">
                {t("brand.line2", lang)}
              </span>
            </Link>
            <div className="flex items-center gap-6 flex-wrap justify-end">
              <nav
                aria-label="Public demo navigation"
                className="flex items-center gap-x-5 gap-y-2 flex-wrap text-sm"
              >
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="v2-text-muted hover:text-[var(--v2-text)] whitespace-nowrap"
                  >
                    {lang === "ar" ? (
                      <span lang="ar" dir="rtl" className="[unicode-bidi:isolate]">
                        {n.label_ar}
                      </span>
                    ) : (
                      n.label_en
                    )}
                  </Link>
                ))}
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border v2-border-line v2-text-muted">
                  public demo preview
                </span>
              </nav>
              <LanguageToggle current={lang} />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>

        <footer className="v2-shell-bg border-t v2-border-line mt-16 print:hidden">
          <div className="mx-auto max-w-7xl px-6 py-6 text-xs v2-text-muted flex items-center justify-between gap-6 flex-wrap">
            <span>
              Public demo preview · advisory only · human-reviewed · no
              automated decisioning · no active cloud integration · no
              official municipal integration · no production deployment.
            </span>
            <span data-testid="footer-public-demo">v0.demo</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
