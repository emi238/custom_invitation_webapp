import { redirect } from 'next/navigation'

export default function Home() {
  const defaultSlug =
    process.env.DEFAULT_INVITE_SLUG ?? process.env.NEXT_PUBLIC_DEFAULT_INVITE_SLUG

  // If configured, the user lands directly on the envelope experience.
  // This avoids showing the starter Next.js home page.
  if (defaultSlug) {
    redirect(`/invite/${defaultSlug}`)
  }

  // Otherwise, keep a minimal landing page (no mocked invite data).
  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-[#2A0A3A] via-[#3B1155] to-[#5A2A7A] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <h1 className="text-xl font-semibold tracking-wide">Open an invitation</h1>
        <p className="mt-2 text-white/80 text-sm">
          Visit <span className="font-mono">/invite/&lt;slug&gt;</span> or set{' '}
          <span className="font-mono">DEFAULT_INVITE_SLUG</span> to auto-redirect.
        </p>
      </div>
    </main>
  )
}
