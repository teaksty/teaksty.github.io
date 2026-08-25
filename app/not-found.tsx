import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center pt-[clamp(7rem,13vw,10rem)]">
      <div className="rule" />
      <p className="micro-label mt-6">Error 404</p>
      <h1 className="mt-8 max-w-[14ch] text-headline font-medium">
        This page does not exist.
      </h1>
      <p className="mt-5 max-w-measure text-body text-muted">
        The address is either mistyped or points at something that has since been taken down.
      </p>
      <Link href="/" className="link-underline mt-10 self-start text-meta text-fg">
        Back to the index
      </Link>
    </section>
  );
}
