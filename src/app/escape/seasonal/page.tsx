'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sun, Snowflake, Leaf, Flower2, ArrowRight, RefreshCw } from 'lucide-react'

type Season = 'spring' | 'summer' | 'fall' | 'winter'
type Priority = 'cost' | 'warmth' | 'culture' | 'beach' | 'adventure'

const seasonDestinations: Record<Season, Array<{
  country: string; flag: string; city: string; temp: string; why: string; cost: string; visa: string; highlights: string[]
}>> = {
  spring: [
    { country: 'Japan', flag: '🇯🇵', city: 'Kyoto', temp: '14–22°C', why: 'Cherry blossom season — world-famous. March–April is peak.', cost: '$2,200/mo', visa: '90-day free', highlights: ['Sakura viewing', 'Mild weather', 'Peak culture', 'Affordable offseason ryokan'] },
    { country: 'Portugal', flag: '🇵🇹', city: 'Lisbon', temp: '16–22°C', why: 'Before summer crowds. Cheapest flights. Best weather for walking.', cost: '$1,600/mo', visa: '90-day Schengen', highlights: ['Pre-tourist crowds', 'Festival season starts', 'Best hiking weather', 'Affordable'] },
    { country: 'Morocco', flag: '🇲🇦', city: 'Marrakech', temp: '20–28°C', why: 'Perfect temps before summer heat. Desert tours without dying of heat.', cost: '$900/mo', visa: '90-day free', highlights: ['Sahara tours', 'Spring flowers', 'Pre-tourist crush', 'Incredible food'] },
    { country: 'Colombia', flag: '🇨🇴', city: 'Cartagena', temp: '28–32°C', why: 'Dry season in Caribbean coast. Perfect beach weather with lower crowds.', cost: '$1,100/mo', visa: '90-day free', highlights: ['Caribbean beaches', 'Dry season', 'Walled city magic', 'Low cost'] },
  ],
  summer: [
    { country: 'Montenegro', flag: '🇲🇪', city: 'Kotor', temp: '28–35°C', why: 'Mediterranean coast without Dubrovnik prices. Hidden gem Adriatic.', cost: '$1,200/mo', visa: '90-day free', highlights: ['Crystal clear Adriatic', 'Medieval towns', 'Yacht culture', 'Cheaper than Croatia'] },
    { country: 'Georgia', flag: '🇬🇪', city: 'Tbilisi + Batumi', temp: '26–32°C', why: 'Black Sea coast season. Cool mountains an hour away. 365-day visa free.', cost: '$900/mo', visa: '365-day free', highlights: ['Beach + mountains combo', 'Wine country', 'No visa ever', 'Ultra cheap'] },
    { country: 'Iceland', flag: '🇮🇸', city: 'Reykjavik', temp: '10–18°C', why: '24hr daylight. Midnight sun. Landscapes that look like another planet.', cost: '$3,500/mo', visa: '90-day Schengen', highlights: ['Midnight sun', 'Puffins & whales', 'Geysers & waterfalls', 'Unique experience'] },
    { country: 'Vietnam', flag: '🇻🇳', city: 'Da Nang', temp: '28–34°C', why: 'Dry season on central coast. Beach + food paradise at ultra-low prices.', cost: '$900/mo', visa: 'E-visa 90 days', highlights: ['Marble Mountains', 'Hoi An nearby', 'Epic seafood', 'Cheapest beach life'] },
  ],
  fall: [
    { country: 'Turkey', flag: '🇹🇷', city: 'Istanbul', temp: '16–24°C', why: 'Shoulder season. Half the crowds, full experience. Bosphorus at golden hour.', cost: '$1,000/mo', visa: 'E-visa 90 days', highlights: ['Post-summer calm', 'Lower prices', 'Perfect sightseeing temps', 'Incredible food'] },
    { country: 'Mexico', flag: '🇲🇽', city: 'Oaxaca', temp: '22–28°C', why: 'Día de los Muertos (Nov 1-2). Best cultural experience in the Americas.', cost: '$1,100/mo', visa: '180-day tourist', highlights: ['Day of the Dead', 'Mezcal culture', 'Pre-Hispanic ruins', 'Art scene explosion'] },
    { country: 'Bali', flag: '🇮🇩', city: 'Ubud', temp: '26–30°C', why: 'Dry season ends, shoulder season begins. Balance of price and weather.', cost: '$1,200/mo', visa: 'Visa on arrival 30 days', highlights: ['Rice terrace season', 'Lower crowds', 'Wellness culture', 'Artist community'] },
    { country: 'Spain', flag: '🇪🇸', city: 'Seville', temp: '18–26°C', why: 'Unbearable summer heat is gone. Most beautiful time in Andalusia.', cost: '$1,800/mo', visa: '90-day Schengen', highlights: ['Post-summer cooling', 'Flamenco season', 'Food festivals', 'Golden light'] },
  ],
  winter: [
    { country: 'Thailand', flag: '🇹🇭', city: 'Chiang Mai', temp: '18–28°C', why: 'Cool dry season. Best weather of the year. Digital nomad mecca at peak.', cost: '$1,000/mo', visa: 'Tourist 30+30 days', highlights: ['Cool & dry', 'Yi Peng lanterns (Nov)', 'Nomad community peak', 'Mountain hiking'] },
    { country: 'Costa Rica', flag: '🇨🇷', city: 'Tamarindo', temp: '28–34°C', why: 'Dry season (Dec–April). Perfect Pacific beach weather. Pura vida peak.', cost: '$1,800/mo', visa: '90-day free', highlights: ['Dry season surf', 'Turtle nesting', 'Pacific sunsets', 'Jungle + beach'] },
    { country: 'Colombia', flag: '🇨🇴', city: 'Medellín', temp: '20–26°C', why: 'Eternal spring, but Dec-Feb is cleanest air season. Expats flood in.', cost: '$1,000/mo', visa: '90-day free', highlights: ['Eternal spring climate', 'Expat Christmas energy', 'Best air quality', 'Festival season'] },
    { country: 'Mexico', flag: '🇲🇽', city: 'Puerto Vallarta', temp: '24–30°C', why: 'Pacific beach perfect weather. Strong expat community. Easy from US/CA.', cost: '$1,400/mo', visa: '180-day tourist', highlights: ['Perfect beach weather', 'Whale watching', 'Expat community', 'Easy US flights'] },
  ],
}

const seasonIcons = {
  spring: { icon: Flower2, label: 'Spring', sub: 'Mar–May', emoji: '🌸' },
  summer: { icon: Sun, label: 'Summer', sub: 'Jun–Aug', emoji: '☀️' },
  fall: { icon: Leaf, label: 'Fall', sub: 'Sep–Nov', emoji: '🍂' },
  winter: { icon: Snowflake, label: 'Winter', sub: 'Dec–Feb', emoji: '❄️' },
}

const rotationExamples = [
  {
    name: 'Budget Maximizer',
    monthlyAvg: '$1,050/mo',
    savings: '$18k/yr vs US',
    plan: [
      { season: 'Winter', where: 'Thailand (Chiang Mai)', cost: '$950', why: 'Coolest season, cheap' },
      { season: 'Spring', where: 'Colombia (Medellín)', cost: '$1,000', why: 'Eternal spring' },
      { season: 'Summer', where: 'Georgia (Tbilisi)', cost: '$850', why: 'Free visa, cheapest euro' },
      { season: 'Fall', where: 'Mexico (Oaxaca)', cost: '$1,100', why: 'Culture season, close to US' },
    ],
  },
  {
    name: 'Beach Chaser',
    monthlyAvg: '$1,400/mo',
    savings: '$12k/yr vs US',
    plan: [
      { season: 'Winter', where: 'Costa Rica (Tamarindo)', cost: '$1,800', why: 'Dry season surf' },
      { season: 'Spring', where: 'Colombia (Cartagena)', cost: '$1,100', why: 'Caribbean dry season' },
      { season: 'Summer', where: 'Montenegro (Kotor)', cost: '$1,200', why: 'Adriatic peak' },
      { season: 'Fall', where: 'Bali (Canggu)', cost: '$1,200', why: 'Shoulder season beach' },
    ],
  },
  {
    name: 'Culture Maximizer',
    monthlyAvg: '$1,500/mo',
    savings: '$10k/yr vs US',
    plan: [
      { season: 'Winter', where: 'Japan (Tokyo)', cost: '$2,200', why: 'Winter festivals' },
      { season: 'Spring', where: 'Japan (Kyoto)', cost: '$2,200', why: 'Cherry blossom' },
      { season: 'Summer', where: 'Turkey (Istanbul)', cost: '$1,000', why: 'Peak season culture' },
      { season: 'Fall', where: 'Mexico (Oaxaca)', cost: '$1,100', why: 'Day of the Dead' },
    ],
  },
]

export default function SeasonalPage() {
  const [activeSeason, setActiveSeason] = useState<Season>('winter')
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [aiPlan, setAiPlan] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const togglePriority = (p: Priority) => {
    setPriorities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : prev.length < 3 ? [...prev, p] : prev
    )
  }

  const generatePlan = async () => {
    if (priorities.length < 2) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    const plans: Record<string, string> = {
      'cost,warmth': 'Winter: Georgia → Spring: Colombia → Summer: Vietnam → Fall: Turkey',
      'cost,beach': 'Winter: Thailand → Spring: Colombia (Cartagena) → Summer: Montenegro → Fall: Bali',
      'warmth,beach': 'Winter: Costa Rica → Spring: Cartagena → Summer: Montenegro → Fall: Bali',
      'culture,cost': 'Winter: Thailand (festivals) → Spring: Morocco → Summer: Georgia → Fall: Mexico (Oaxaca)',
      'culture,warmth': 'Winter: Mexico (CDMX) → Spring: Japan (Kyoto) → Summer: Turkey → Fall: Oaxaca (Day of Dead)',
      'adventure,cost': 'Winter: Colombia (coffee region) → Spring: Morocco (desert) → Summer: Georgia (mountains) → Fall: Vietnam',
    }
    const key = priorities.slice(0, 2).sort().join(',')
    setAiPlan(plans[key] || 'Winter: Thailand → Spring: Colombia → Summer: Montenegro → Fall: Mexico')
    setLoading(false)
  }

  const currentDests = seasonDestinations[activeSeason]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-jade-500/[0.04] top-0 right-0" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-gold-500/[0.04] bottom-0 left-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Link href="/escape" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Escape Plan
        </Link>

        <div className="mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Sun className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-white/50 text-sm font-mono">AI-powered seasonal planner</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Follow the Sun.<br />
            <span className="gradient-text">Never Rent Full Price.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            The ultra-wealthy have always done this. Move with the seasons — always in perfect weather, always at shoulder-season prices. Our AI builds your rotation plan.
          </p>
        </div>

        {/* AI Planner */}
        <div className="glass-gold rounded-3xl p-8 md:p-10 mb-16 glow-gold">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gold-400/20 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-gold-400" />
            </div>
            <h2 className="font-display text-2xl font-bold">AI Rotation Planner</h2>
          </div>

          <p className="text-white/50 text-sm mb-6">Pick your top 2–3 priorities and we'll generate a personalized 4-season rotation plan.</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {([
              { key: 'cost', label: '💰 Lowest Cost' },
              { key: 'warmth', label: '🌡 Always Warm' },
              { key: 'culture', label: '🎭 Rich Culture' },
              { key: 'beach', label: '🏖 Beach Life' },
              { key: 'adventure', label: '🏔 Adventure' },
            ] as { key: Priority; label: string }[]).map((p) => (
              <button
                key={p.key}
                onClick={() => togglePriority(p.key)}
                className={`filter-tab px-4 py-2 text-sm font-medium transition-all ${
                  priorities.includes(p.key) ? 'active' : 'text-white/50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={generatePlan}
            disabled={priorities.length < 2 || loading}
            className={`btn-capsule px-8 py-3 text-sm font-semibold inline-flex items-center gap-2 ${
              priorities.length < 2 ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating your rotation...
              </>
            ) : (
              <>
                Generate My Rotation Plan
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {aiPlan && (
            <div className="mt-6 glass rounded-2xl p-5 border border-gold-400/20">
              <div className="text-gold-400 text-xs font-mono mb-2">YOUR PERSONALIZED ROTATION</div>
              <p className="text-white/80 font-medium leading-relaxed">{aiPlan}</p>
              <div className="mt-3 flex gap-2">
                <span className="text-jade-400 text-xs">✓ Estimated savings vs US: $12,000–$22,000/yr</span>
              </div>
            </div>
          )}
        </div>

        {/* Season explorer */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Explore by <span className="gradient-text">Season</span>
          </h2>

          {/* Season tabs */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {(Object.entries(seasonIcons) as [Season, typeof seasonIcons[Season]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveSeason(key)}
                className={`filter-tab px-5 py-3 flex items-center gap-2 text-sm font-medium ${
                  activeSeason === key ? 'active' : 'text-white/50'
                }`}
              >
                <span>{val.emoji}</span>
                <span>{val.label}</span>
                <span className="text-white/25 text-xs">{val.sub}</span>
              </button>
            ))}
          </div>

          {/* Destination cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {currentDests.map((dest, i) => (
              <div key={dest.city} className="glass rounded-3xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dest.flag}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{dest.city}</h3>
                      <p className="text-white/30 text-sm">{dest.country} · {dest.temp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold-400 font-bold">{dest.cost}</div>
                    <div className="text-white/25 text-xs">{dest.visa}</div>
                  </div>
                </div>

                <p className="text-white/55 text-sm leading-relaxed mb-4">{dest.why}</p>

                <div className="flex flex-wrap gap-2">
                  {dest.highlights.map((h) => (
                    <span key={h} className="glass px-3 py-1 rounded-full text-xs text-white/50">{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Example rotations */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Example <span className="gradient-text">Rotations</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">Three proven seasonal lifestyle blueprints</p>

          <div className="grid md:grid-cols-3 gap-5">
            {rotationExamples.map((ex, i) => (
              <div key={ex.name} className="glass rounded-3xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <h3 className="font-display text-lg font-bold mb-1">{ex.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold-400 font-bold">{ex.monthlyAvg}</span>
                  <span className="text-jade-400 text-xs">{ex.savings}</span>
                </div>
                <div className="space-y-3">
                  {ex.plan.map((p) => (
                    <div key={p.season} className="flex items-start gap-3">
                      <span className="text-white/20 text-xs font-mono w-12 shrink-0 mt-0.5">{p.season}</span>
                      <div>
                        <div className="text-white/70 text-sm font-medium">{p.where}</div>
                        <div className="text-white/30 text-xs">{p.cost}/mo · {p.why}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-gold rounded-3xl p-8 text-center glow-gold">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Build Your Full <span className="gradient-text">Escape Blueprint</span>
          </h2>
          <p className="text-white/50 mb-6">Get a complete relocation plan with visa steps, neighborhoods, and cost breakdowns.</p>
          <Link href="/quiz" className="btn-capsule px-8 py-3.5 text-base font-semibold gap-2 inline-flex items-center">
            Start the AI Quiz →
          </Link>
        </div>
      </div>
    </main>
  )
}
