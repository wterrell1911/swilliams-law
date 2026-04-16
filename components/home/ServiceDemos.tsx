import { cn } from "@/lib/utils"

function Stars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

export function GEODemo() {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* AI Chat Header */}
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0v-1H3a1 1 0 010-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">AI Answer</span>
          </div>
        </div>

        {/* Chat Content */}
        <div className="p-4 sm:p-6 max-w-2xl mx-auto">
          {/* User Query */}
          <div className="flex justify-end mb-5">
            <div className="bg-gray-100 rounded-2xl rounded-br-md px-4 py-2.5 max-w-xs">
              <p className="text-sm text-gray-800">What should I do after a car accident in Atlanta?</p>
            </div>
          </div>

          {/* AI Response */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              After a car accident in Atlanta, you should take these immediate steps:
            </p>
            <ol className="text-sm text-gray-700 leading-relaxed space-y-2 list-decimal list-inside mb-4">
              <li><strong>Check for injuries</strong> and call 911 if anyone is hurt.</li>
              <li><strong>Document everything</strong> — take photos of the scene, damage, and any visible injuries.</li>
              <li><strong>Exchange information</strong> with the other driver (insurance, license, contact info).</li>
              <li><strong>Seek medical attention</strong> within 72 hours, even if you feel fine. Delayed injuries are common.</li>
              <li><strong>Consult a personal injury attorney</strong> before speaking with insurance adjusters.</li>
            </ol>
            <p className="text-sm text-gray-700 leading-relaxed">
              Georgia follows a modified comparative negligence rule, so acting quickly to preserve evidence is critical for your case.
            </p>
          </div>

          {/* Source Citation — Key Visual */}
          <div className="relative rounded-lg border-2 border-gold-500/40 bg-gold-500/5 p-4">
            <span className="absolute -top-2.5 right-3 bg-gold-500 text-navy-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Your Firm Cited
            </span>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] text-warmWhite font-bold">MG</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-0.5">Mitchell &amp; Gray Law</div>
                <div className="text-xs text-green-700 mb-1">mitchellgraylaw.com</div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  &quot;The first 72 hours after a car accident are critical for your personal injury case. Most people make mistakes that cost them thousands in compensation.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-navy-900/50 text-center mt-4">
        We optimize your content so AI assistants cite your firm when potential clients ask questions about your practice area.
      </p>
    </div>
  )
}

export function SEODemo() {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Google Search Bar */}
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex-1 bg-gray-100 rounded-full px-5 py-2.5 text-sm text-gray-700 font-medium">
              car accident lawyer atlanta
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="p-4 sm:p-6 max-w-2xl mx-auto">
          <p className="text-xs text-gray-500 mb-4">About 4,230,000 results (0.42 seconds)</p>

          {/* Result #1 — Highlighted */}
          <div className="relative rounded-lg border-2 border-gold-500/40 bg-gold-500/5 p-4 -mx-2">
            <span className="absolute -top-2.5 right-3 bg-gold-500 text-navy-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Position #1
            </span>
            <div className="text-xs text-green-700 mb-0.5">https://www.mitchellgraylaw.com</div>
            <h3 className="text-lg text-blue-800 font-medium mb-1 leading-snug">
              Mitchell &amp; Gray Law | Atlanta Personal Injury Attorney
            </h3>
            <div className="flex items-center gap-1.5 mb-2">
              <Stars count={5} />
              <span className="text-xs text-gray-500">4.9 (47 reviews)</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Injured in a car accident? The Atlanta personal injury attorneys at Mitchell &amp; Gray Law have recovered millions for accident victims. Free consultation. No fee unless we win.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-700">
              <span className="hover:underline">Free Consultation</span>
              <span className="hover:underline">Car Accidents</span>
              <span className="hover:underline">About Our Firm</span>
              <span className="hover:underline">Client Results</span>
            </div>
          </div>

          {/* Result #2 — Dimmed */}
          <div className="mt-5 opacity-40 p-2">
            <div className="text-xs text-green-700 mb-0.5">https://www.atlinjurylaw.com</div>
            <h3 className="text-base text-blue-800 mb-1">Atlanta Car Accident Lawyers | Free Case Review</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Top rated car accident attorneys serving the greater Atlanta area. Over 20 years of experience...
            </p>
          </div>

          {/* Result #3 — More dimmed */}
          <div className="mt-4 opacity-25 p-2">
            <div className="text-xs text-green-700 mb-0.5">https://www.gacaraccidentfirm.com</div>
            <h3 className="text-base text-blue-800 mb-1">Georgia Car Accident Attorney | Serving Atlanta</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Experienced car accident lawyer in Atlanta, GA. Call today for a free evaluation of your case...
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-navy-900/50 text-center mt-4">
        We optimize your site to show up when potential clients are actively searching for your services.
      </p>
    </div>
  )
}

export function ContentDemo() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        {/* Blog Post Card */}
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {/* Featured image placeholder */}
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 h-40 flex items-center justify-center relative">
            <div className="text-center">
              <svg className="w-10 h-10 text-gold-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-warmWhite/60 text-xs font-medium uppercase tracking-wider">Blog Post</span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-red-50 text-red-700 text-[11px] font-semibold rounded-full border border-red-200">
                Personal Injury
              </span>
              <span className="text-xs text-gray-400">Jan 15, 2026</span>
              <span className="text-xs text-gray-400">&middot;</span>
              <span className="text-xs text-gray-400">5 min read</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
              What To Do Immediately After a Car Accident in Georgia
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              The first 72 hours after a car accident are critical for your personal injury case. Most people make mistakes that can cost them thousands in compensation. Here&apos;s what every Georgia driver needs to know...
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-navy-800 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-warmWhite font-bold">MG</span>
              </div>
              <span className="text-xs text-gray-500">Mitchell &amp; Gray Law</span>
            </div>
          </div>
        </div>

        {/* Content Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Publishing Schedule</h4>
            <span className="text-[10px] text-gray-400">Jan 2026</span>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="text-[9px] text-gray-400 font-medium py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {/* Empty cells for offset, then 31 days */}
            {[null, null, null].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1
              const hasPost = [1, 4, 7, 10, 13, 16, 19, 22].includes(day)
              return (
                <div
                  key={day}
                  className={cn(
                    "aspect-square rounded-md flex items-center justify-center text-[10px] relative",
                    hasPost
                      ? "bg-gold-500/15 text-gold-700 font-bold"
                      : "text-gray-400"
                  )}
                >
                  {day}
                  {hasPost && (
                    <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full" />
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-gray-500">Posts this month</span>
              <span className="font-bold text-navy-900">8 articles</span>
            </div>
            <div className="flex items-center justify-between text-[10px] mt-1">
              <span className="text-gray-500">Avg. word count</span>
              <span className="font-bold text-navy-900">1,400</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-navy-900/50 text-center mt-4">
        We write SEO-optimized articles that establish your authority and drive organic traffic. 4-8 posts per month, all in your voice.
      </p>
    </div>
  )
}

export function VideoDemo() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-3 items-center relative">
        {/* Raw Clip */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gray-800 aspect-[9/14] sm:aspect-video relative flex items-center justify-center">
            {/* Shaky/raw indicators */}
            <div className="absolute inset-0 border-4 border-dashed border-gray-600/40 m-2 rounded" />
            <div className="text-center z-10">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <div className="text-gray-500 text-xs">0:47</div>
            </div>
            {/* REC indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-[10px] text-red-400 font-mono font-bold">REC</span>
            </div>
            {/* Low quality badge */}
            <div className="absolute bottom-3 left-3 text-[10px] text-gray-500 bg-gray-900/80 px-2 py-0.5 rounded">
              720p &middot; Vertical &middot; No audio mix
            </div>
          </div>
          <div className="p-3 bg-gray-50 text-center">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Raw Clip from Client</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gold-500 rounded-full p-2 shadow-lg">
            <svg className="w-5 h-5 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
        <div className="flex md:hidden justify-center -my-1">
          <div className="bg-gold-500 rounded-full p-2 shadow-lg">
            <svg className="w-5 h-5 text-navy-950 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Polished Video */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 aspect-[9/14] sm:aspect-video relative flex items-center justify-center overflow-hidden">
            {/* Play button */}
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center z-10">
              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            {/* Branded lower third */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-gold-500 rounded flex items-center justify-center">
                  <span className="text-[8px] text-navy-950 font-bold">MG</span>
                </div>
                <span className="text-white text-xs font-semibold">Mitchell &amp; Gray Law</span>
              </div>
              <p className="text-white/90 text-[11px] leading-snug">
                &quot;The biggest mistake after a car accident is waiting too long to get checked out...&quot;
              </p>
            </div>
            {/* HD badge */}
            <div className="absolute top-3 right-3 text-[10px] text-white/80 bg-black/50 px-2 py-0.5 rounded font-medium">
              1080p HD
            </div>
            {/* Caption indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded">
              <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 3a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] text-white/80 font-medium">CC</span>
            </div>
          </div>
          <div className="p-3 bg-green-50 text-center">
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Published to Instagram, TikTok, YouTube</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-navy-900/50 text-center mt-4">
        Send us raw clips from your phone. We handle editing, captions, branding, and posting. 24-48 hour turnaround.
      </p>
    </div>
  )
}

export function SocialDemo() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Post 1 - Instagram style tip */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <span className="text-[7px] font-bold bg-gradient-to-br from-purple-500 to-orange-400 bg-clip-text text-transparent">IG</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-gray-900">mitchellgraylaw</span>
          </div>
          <div className="bg-navy-900 aspect-square flex items-center justify-center p-5">
            <div className="text-center">
              <div className="text-gold-500 text-3xl font-display font-bold mb-2">3</div>
              <div className="text-white text-xs font-bold uppercase tracking-wider leading-tight">
                Things NOT<br />To Say To<br />Insurance Adjusters
              </div>
              <div className="mt-3 w-8 h-0.5 bg-gold-500 mx-auto" />
              <div className="text-white/50 text-[9px] mt-2 uppercase tracking-widest">Swipe &rarr;</div>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="flex items-center gap-3 mb-1">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </div>
            <p className="text-[10px] text-gray-500"><strong className="text-gray-800">142 likes</strong></p>
          </div>
        </div>

        {/* Post 2 - Facebook style review */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">f</span>
            </div>
            <span className="text-[11px] font-semibold text-gray-900">Mitchell &amp; Gray Law</span>
          </div>
          <div className="p-4">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <Stars count={5} className="mb-1.5" />
              <p className="text-xs text-gray-700 leading-relaxed italic">
                &quot;After my accident I didn&apos;t know where to turn. The team at Mitchell &amp; Gray guided me through everything and got me a settlement I never expected. Can&apos;t recommend them enough.&quot;
              </p>
              <p className="text-[10px] text-gray-400 mt-2">&mdash; Marcus T., Atlanta</p>
            </div>
          </div>
          <div className="px-3 py-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span>24 likes &middot; 3 shares</span>
              <span className="text-blue-600 font-medium">Client Review</span>
            </div>
          </div>
        </div>

        {/* Post 3 - LinkedIn style attorney spotlight */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
            <div className="w-6 h-6 rounded bg-blue-700 flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">in</span>
            </div>
            <span className="text-[11px] font-semibold text-gray-900">D. Mitchell, Esq.</span>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-700 leading-relaxed mb-3">
              Proud to share that our firm just surpassed 5 years serving the Atlanta community. What started as a solo practice has grown into a team of 4 dedicated to personal injury victims.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed mb-3">
              Every case reminds me why I chose this work. If you&apos;re injured, you deserve someone who fights for you.
            </p>
            <div className="bg-navy-50 rounded-lg p-3 flex items-center gap-3 border border-navy-100">
              <div className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-warmWhite font-bold">MG</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-900">Attorney Spotlight</div>
                <div className="text-[10px] text-gray-500">5 Years Serving Atlanta</div>
              </div>
            </div>
          </div>
          <div className="px-3 py-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span>89 reactions &middot; 12 comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-navy-900/60">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-gold-500 rounded-full" />
          <strong className="text-navy-900 font-semibold">12</strong> posts this month
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-electric-500 rounded-full" />
          <strong className="text-navy-900 font-semibold">3,400</strong> impressions
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <strong className="text-navy-900 font-semibold">89</strong> profile visits
        </span>
      </div>
      <p className="text-sm text-navy-900/50 text-center mt-3">
        We create, schedule, and manage your social presence across all platforms. You approve, we post.
      </p>
    </div>
  )
}

export function ReputationDemo() {
  return (
    <div>
      <div className="max-w-lg mx-auto bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Mitchell &amp; Gray Law</h4>
                <p className="text-[10px] text-gray-500">Personal Injury Attorney in Atlanta, GA</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-full px-2.5 py-1 flex items-center gap-1">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] text-green-700 font-semibold">+14 this month</span>
            </div>
          </div>

          {/* Rating Display */}
          <div className="flex items-center gap-3 mt-4">
            <div className="text-4xl font-bold text-gray-900">4.8</div>
            <div>
              <Stars count={5} className="mb-0.5" />
              <p className="text-xs text-gray-500">47 reviews on Google</p>
            </div>
          </div>
        </div>

        {/* Review Snippets */}
        <div className="p-5 space-y-3">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-[9px] text-white font-bold">JR</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-800">James R.</span>
              <Stars count={5} />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              &quot;Best experience with a lawyer I&apos;ve ever had. They kept me informed every step of the way and the settlement exceeded my expectations.&quot;
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-[9px] text-white font-bold">AT</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-800">Ashley T.</span>
              <Stars count={5} />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              &quot;They handled everything professionally from start to finish. I didn&apos;t have to worry about a thing while recovering from my injury.&quot;
            </p>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="px-5 pb-5">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Review Growth</span>
              <span className="text-[10px] text-gray-400">6 months</span>
            </div>
            <div className="h-16 flex items-end gap-0.5">
              {[
                { month: "Aug", height: 15, count: 8 },
                { month: "Sep", height: 25, count: 14 },
                { month: "Oct", height: 40, count: 22 },
                { month: "Nov", height: 55, count: 30 },
                { month: "Dec", height: 72, count: 39 },
                { month: "Jan", height: 88, count: 47 },
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className="text-[8px] text-gray-500 font-medium">{bar.count}</span>
                  <div
                    className="w-full bg-gradient-to-t from-gold-500 to-gold-400 rounded-t"
                    style={{ height: `${bar.height}%` }}
                  />
                  <span className="text-[8px] text-gray-400">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-navy-900/50 text-center mt-4">
        We help you generate authentic reviews and manage your online reputation. Most firms see 3-5x more reviews within 90 days.
      </p>
    </div>
  )
}

export function LeadTrackingDemo() {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Dashboard Header */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs font-semibold text-gray-700">Lead Dashboard</span>
          </div>
          <span className="text-[10px] text-gray-400">This Week &middot; Jan 20-26, 2026</span>
        </div>

        <div className="p-5">
          {/* Stat Cards Row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Calls This Week", value: "23", icon: "phone", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Form Submissions", value: "12", icon: "form", color: "text-green-600", bg: "bg-green-50" },
              { label: "Consultations Booked", value: "8", icon: "calendar", color: "text-gold-600", bg: "bg-gold-50" },
            ].map((stat) => (
              <div key={stat.label} className={cn("rounded-lg p-3 border border-gray-100", stat.bg)}>
                <div className={cn("text-2xl sm:text-3xl font-bold mb-0.5", stat.color)}>{stat.value}</div>
                <div className="text-[10px] text-gray-500 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Source Breakdown */}
          <div className="mb-5">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Lead Sources</h4>
            <div className="space-y-2.5">
              {[
                { source: "Google Search", pct: 45, color: "bg-blue-500" },
                { source: "Google Maps", pct: 28, color: "bg-green-500" },
                { source: "Social Media", pct: 15, color: "bg-purple-500" },
                { source: "Referral", pct: 12, color: "bg-gold-500" },
              ].map((item) => (
                <div key={item.source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700">{item.source}</span>
                    <span className="text-xs font-bold text-gray-900">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(item.color, "h-full rounded-full")}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Line */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Leads Over Time</span>
              <span className="text-[10px] text-green-600 font-semibold flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                +34% vs last month
              </span>
            </div>
            <svg viewBox="0 0 300 60" className="w-full h-12" preserveAspectRatio="none">
              <defs>
                <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M0,55 L25,50 L50,48 L75,42 L100,38 L125,35 L150,30 L175,25 L200,22 L225,18 L250,12 L275,8 L300,5 L300,60 L0,60 Z"
                fill="url(#leadGradient)"
              />
              {/* Line */}
              <path
                d="M0,55 L25,50 L50,48 L75,42 L100,38 L125,35 L150,30 L175,25 L200,22 L225,18 L250,12 L275,8 L300,5"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1">
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-navy-900/50 text-center mt-4">
        Know exactly where every lead comes from. We set up tracking from day one so you see real ROI — not guesswork.
      </p>
    </div>
  )
}
