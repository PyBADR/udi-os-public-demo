// Public Demo · Landing page — redirects to /v2/overview, which is
// the canonical executive entry for the public demo preview.

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function HomePage() {
  redirect("/v2/overview");
}
