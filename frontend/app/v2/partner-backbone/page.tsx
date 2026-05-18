// IR-47 — Partner Intelligence Backbone Layer · /v2/partner-backbone.
//
// Cloud-agnostic architecture mapping for partner readiness. The
// surface is a client component (tabbed interface, in-page state)
// rendered inside a server route shell so the page can opt into
// `force-dynamic` like every other V2 surface and pick up the
// gcc_lang cookie via the layout-level <html lang dir>.
//
// Advisory architecture only. No active cloud integration claim.
// No package change. No backend. No API call. No fetch.

import { PartnerBackboneSurface } from "@/components/v2/partner-backbone/PartnerBackboneSurface";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PartnerBackboneSurface />;
}
