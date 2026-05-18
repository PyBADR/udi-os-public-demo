"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined" && console.error) {
      console.error("[ui-error-boundary]", error);
    }
  }, [error]);

  return (
    <div className="space-y-6 border border-rule bg-white p-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-ink-mute">
          Decision-support only · Human-reviewed · Non-action pilot
        </p>
        <h1 className="mt-3 font-serif text-2xl text-ink">
          A page-level error was caught
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-mute">
          This screen is part of a public preview. The application caught the
          error before it could reach a reviewer and no automatic action was
          taken. Refresh to retry, or use the navigation above to continue.
        </p>
        {error?.digest ? (
          <p className="mt-4 font-mono text-[11px] text-ink-mute">
            digest: {error.digest}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center border border-ink bg-ink px-4 py-2 text-sm text-paper hover:bg-ink-soft"
      >
        Retry
      </button>
    </div>
  );
}
