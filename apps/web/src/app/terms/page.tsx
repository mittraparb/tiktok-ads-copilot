import Link from "next/link";

const terms = [
  {
    title: "Use of TikTok authorization",
    body: "TikTok Ads Co-Pilot uses TikTok OAuth/Login Kit only with user authorization. During testing, a user chooses whether to authorize access through TikTok. The app does not ask for TikTok passwords.",
  },
  {
    title: "Data used for the prototype",
    body: "After user authorization, the app may read public TikTok video metrics available through the TikTok Display API, including video ID, title, description, cover image URL, share URL, duration, create time, view count, like count, comment count, and share count.",
  },
  {
    title: "No scraping or engagement automation",
    body: "The app does not scrape TikTok, does not use browser automation to collect TikTok data, and does not automate likes, follows, comments, favorites, direct messages, or other engagement actions.",
  },
  {
    title: "No copied credentials or tokens",
    body: "The app does not collect TikTok cookies, sessions, copied tokens, browser credentials, or manually pasted TikTok account secrets.",
  },
  {
    title: "Decision support only",
    body: "Recommendations are guidance based on available signals. The app does not guarantee ad results and does not claim that ads will be cheaper.",
  },
  {
    title: "Disconnect and deletion requests",
    body: "Users can disconnect TikTok access or request deletion of connected TikTok data by contacting the app owner during testing.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] text-zinc-950">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <LegalHeader />

        <article className="flex-1 py-10">
          <div className="mb-3 text-xs font-semibold uppercase text-zinc-500">
            Developer compliance
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Terms of Use</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">
            These terms describe how TikTok Ads Co-Pilot is used during prototype
            testing and creator analytics for TikTok Login Kit and Display API
            setup. This product is a decision-support prototype for creators and
            small teams.
          </p>

          <div className="mt-8 space-y-4">
            {terms.map((item) => (
              <section
                key={item.title}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-base font-semibold text-zinc-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{item.body}</p>
              </section>
            ))}
          </div>
        </article>

        <LegalFooter />
      </section>
    </main>
  );
}

function LegalHeader() {
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <Link href="/" className="text-sm font-semibold text-zinc-950">
        TikTok Ads Co-Pilot
      </Link>
      <nav className="flex items-center gap-3 text-sm font-medium">
        <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-950">
          Prototype
        </Link>
        <Link href="/privacy" className="text-zinc-600 hover:text-zinc-950">
          Privacy
        </Link>
      </nav>
    </header>
  );
}

function LegalFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-zinc-200 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
      <div>(c) 2026 TikTok Ads Co-Pilot.</div>
      <div className="flex gap-4 font-medium">
        <Link href="/terms" className="hover:text-zinc-950">
          Terms
        </Link>
        <Link href="/privacy" className="hover:text-zinc-950">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
