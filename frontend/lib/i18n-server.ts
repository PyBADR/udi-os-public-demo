import { cookies } from "next/headers";
import { LANG_COOKIE, type Lang } from "./i18n";

// Server-side language resolver. Reads the cookie set by LanguageToggle.
// Pages and the layout call this; client components must NOT import it.
export function getLang(): Lang {
  try {
    const v = cookies().get(LANG_COOKIE)?.value;
    return v === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}
