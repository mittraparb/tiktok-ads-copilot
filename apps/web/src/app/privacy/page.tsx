import Link from "next/link";

const privacySections = [
  {
    title: "TikTok authorization",
    body: "TikTok Ads Co-Pilot uses TikTok OAuth/Login Kit with user authorization. Users approve access through TikTok before any TikTok account or public video metric data is read.",
  },
  {
    title: "TikTok data read after authorization",
    body: "After authorization, the app may read public TikTok video metrics available through the TikTok Display API, including video ID, title, description, cover image URL, share URL, duration, create time, view count, like count, comment count, and share count.",
  },
  {
    title: "Data the app does not collect",
    body: "The app does not ask for TikTok passwords and does not collect TikTok cookies, sessions, copied tokens, browser credentials, or manually pasted TikTok account secrets.",
  },
  {
    title: "No scraping or automation",
    body: "The app does not scrape TikTok and does not automate engagement actions such as likes, follows, comments, favorites, or direct messages.",
  },
  {
    title: "How data is used",
    body: "Public video metrics are used to calculate explainable Pre-Boost Scores, show recommendations, and support brand-friendly reporting. The app does not sell connected TikTok data.",
  },
  {
    title: "Disconnect and deletion",
    body: "Users can disconnect TikTok access or request deletion of connected TikTok data by contacting the app owner during testing.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] text-zinc-950">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <LegalHeader />

        <article className="flex-1 py-10">
          <div className="mb-3 text-xs font-semibold uppercase text-zinc-500">
            Developer compliance
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">
            This policy explains the data handling approach for TikTok Ads Co-Pilot
            during prototype testing and creator analytics for TikTok Login Kit
            and Display API setup.
          </p>

          <div className="mt-8 space-y-4">
            {privacySections.map((item) => (
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
        <Link href="/terms" className="text-zinc-600 hover:text-zinc-950">
          Terms
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
