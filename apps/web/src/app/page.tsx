import Link from "next/link";

const complianceItems = [
  "Uses TikTok OAuth/Login Kit only with user authorization.",
  "Reads public TikTok video metrics after authorization, such as views, likes, comments, and shares.",
  "Does not ask for TikTok passwords, cookies, sessions, copied tokens, or browser credentials.",
  "Does not scrape TikTok or automate likes, follows, comments, favorites, or messages.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] text-zinc-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
              TA
            </div>
            <div>
              <div className="text-sm font-semibold">TikTok Ads Co-Pilot</div>
              <div className="text-xs text-zinc-500">Creator ad decision support</div>
            </div>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium">
            <Link href="/terms" className="text-zinc-600 hover:text-zinc-950">
              Terms
            </Link>
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-950">
              Privacy
            </Link>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <div className="mb-3 inline-flex rounded-lg border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase text-zinc-600 shadow-sm">
              TikTok Login Kit testing
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Creator ads decision support for TikTok videos.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              TikTok Ads Co-Pilot helps creators and small teams review public
              video metrics, decide which clips are worth testing with ad budget,
              and prepare clearer performance reports.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/api/tiktok/connect"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-cyan-700 px-3 text-sm font-medium text-white transition-colors hover:bg-cyan-800"
              >
                Connect with TikTok
              </a>
              <Link
                href="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-950 px-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Open prototype
              </Link>
              <Link
                href="/videos"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50"
              >
                View mock videos
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-zinc-950">
              Developer compliance summary
            </div>
            <div className="mt-4 space-y-3">
              {complianceItems.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-600">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-zinc-50 p-3 text-sm leading-6 text-zinc-600">
              Users can disconnect TikTok access or request deletion of connected
              TikTok data by contacting the app owner during testing.
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-zinc-200 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>(c) 2026 TikTok Ads Co-Pilot. Prototype for creator ad decisions.</div>
          <div className="flex gap-4 font-medium">
            <Link href="/terms" className="hover:text-zinc-950">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-zinc-950">
              Privacy
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
