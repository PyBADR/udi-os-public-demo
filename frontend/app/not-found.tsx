import Link from "next/link";

export default function NotFound() {
  return (
    <div className="border border-rule bg-white p-10 text-center">
      <div className="text-xs uppercase tracking-widest text-ink-mute">
        404 · Record Not Found
      </div>
      <h1 className="mt-2 font-serif text-3xl text-ink">
        This resource is not in the registry.
      </h1>
      <p className="mt-3 max-w-xl mx-auto text-ink-mute">
        The requested case or page does not exist in the current preview
        dataset. All review actions require a registered case ID.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-block border border-ink px-4 py-2 text-sm text-ink hover:bg-ink hover:text-paper"
        >
          Return to Command Center
        </Link>
      </div>
    </div>
  );
}
