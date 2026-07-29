import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl min-h-[70vh] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-xl items-center w-full">
        {/* Left Column */}
        <div className="md:col-span-7">
          <span className="inline-block py-1 px-3 bg-error-container text-on-error-container rounded-full text-label-md font-label-md mb-md uppercase">
            404 Error
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-gutter leading-tight">
            This page has been archived or removed.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-lg">
            We couldn't find the resource you requested. It might have been moved to a new category, or the URL might have been typed incorrectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-base max-w-lg">
            <Link
              className="bg-primary-container text-on-primary px-8 py-4 rounded-xl font-headline-md text-label-md font-bold text-center hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
              href="/"
            >
              Back to Homepage
            </Link>
            <Link
              className="border border-outline text-on-surface px-8 py-4 rounded-xl font-headline-md text-label-md font-bold text-center hover:bg-surface-variant/20 transition-all whitespace-nowrap"
              href="/blog"
            >
              Browse Recent Posts
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-5 flex justify-center mt-xl md:mt-0">
          <div className="text-[180px] md:text-[240px] font-black text-outline-variant/30 leading-none select-none">
            404
          </div>
        </div>
      </div>
    </main>
  );
}
