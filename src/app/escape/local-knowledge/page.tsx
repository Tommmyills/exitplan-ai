'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Map, TrendingUp, Users, Star, Eye } from 'lucide-react'

type Tab = 'gems' | 'neighborhoods' | 'expat-hubs' | 'upcoming'

const hiddenGems = [
  {
    place: 'Plovdiv, Bulgaria',
    flag: '🇧🇬',
    type: 'Hidden city',
    cost: '$600–$900/mo',
    why: "Europe's oldest city. Beautiful old town. Thriving art scene. Under-the-radar for expats.",
    expats: 'Small but growing',
    wifi: 'Strong 5G city',
    visa: '90-day free (EU candidate)',
    tags: ['History', 'Art scene', 'Ultra cheap', 'Pre-EU prices'],
    hotness: 72,
  },
  {
    place: 'Kotor, Montenegro',
    flag: '🇲🇪',
    type: 'Coastal gem',
    cost: '$900–$1,400/mo',
    why: 'Medieval walled city on the Adriatic. Cheaper than Dubrovnik. Growing digital nomad scene.',
    expats: 'Small growing community',
    wifi: 'Decent, improving',
    visa: '90-day free',
    tags: ['Medieval town', 'Adriatic sea', 'Growing scene', 'Underpriced'],
    hotness: 68,
  },
  {
    place: 'Bacalar, Mexico',
    flag: '🇲🇽',
    type: 'Nature escape',
    cost: '$700–$1,200/mo',
    why: '"Lake of Seven Colors" — stunning lagoon town. Zero crowds vs Tulum. Ultra chill.',
    expats: 'Tiny, bohemian',
    wifi: 'Getting better',
    visa: '180-day tourist',
    tags: ['Turquoise lake', 'No crowds', 'Pre-boom', 'Nature paradise'],
    hotness: 81,
  },
  {
    place: 'Kutaisi, Georgia',
    flag: '🇬🇪',
    type: 'Ancient city',
    cost: '$450–$700/mo',
    why: "Georgia's 2nd city. Ancient monasteries. Cheapest entry point in Europe. Almost zero tourists.",
    expats: 'Barely any — pioneers only',
    wifi: 'Solid in city',
    visa: '365-day free',
    tags: ['Ultra cheap', 'No tourists', 'Ancient history', '365-day free visa'],
    hotness: 59,
  },
  {
    place: 'Medellin Side Towns',
    flag: '🇨🇴',
    type: 'Suburb escape',
    cost: '$600–$900/mo',
    why: 'El Retiro, Envigado, Sabaneta — Medellín lifestyle at 40% lower price. Colombian middle-class neighborhoods.',
    expats: 'Small expat presence',
    wifi: 'Strong',
    visa: '90-day free',
    tags: ['El Retiro', 'Envigado', 'Sabaneta', 'Local feel'],
    hotness: 75,
  },
  {
    place: 'Taroudant, Morocco',
    flag: '🇲🇦',
    type: 'Ancient medina',
    cost: '$400–$700/mo',
    why: 'Called "little Marrakech" but 10x cheaper and authentic. Walled city, souks, no tourists.',
    expats: 'Ultra rare — total pioneer',
    wifi: 'Limited outside riads',
    visa: '90-day free',
    tags: ['Ancient medina', 'Ultra authentic', 'No tourists', 'Cheapest Morocco'],
    hotness: 48,
  },
]

const cheapNeighborhoods = [
  {
    city: 'Lisbon, Portugal',
    flag: '🇵🇹',
    neighborhoods: [
      { name: 'Mouraria', avgRent: '€600–€900/mo 1BR', vibe: 'Multicultural, local feel, hills', avoid: 'Alfama (tourist markup)' },
      { name: 'Almada (across river)', avgRent: '€500–€750/mo 1BR', vibe: 'Local life, 10 min ferry to Lisbon', avoid: 'Chiado / Príncipe Real' },
      { name: 'Amadora', avgRent: '€550–€800/mo 1BR', vibe: 'Metro access, full local, cheap markets', avoid: 'Belém, Cascais (premium)' },
    ],
  },
  {
    city: 'Barcelona, Spain',
    flag: '🇪🇸',
    neighborhoods: [
      { name: 'Nou Barris', avgRent: '€700–€1,000/mo 1BR', vibe: 'Residential, local, metro connected', avoid: 'Eixample, Gothic Quarter' },
      { name: 'Sant Andreu', avgRent: '€750–€1,100/mo 1BR', vibe: 'Village feel inside the city, authentic', avoid: 'Gràcia, Born' },
      { name: 'Hospitalet de Llobregat', avgRent: '€650–€950/mo 1BR', vibe: 'Metro access, 10 min from center, local', avoid: 'Sarrià, Pedralbes' },
    ],
  },
  {
    city: 'Medellín, Colombia',
    flag: '🇨🇴',
    neighborhoods: [
      { name: 'Envigado', avgRent: '$350–$600/mo 1BR', vibe: 'Colombian suburbia, safe, great food', avoid: 'El Poblado (tourist prices)' },
      { name: 'Laureles', avgRent: '$400–$650/mo 1BR', vibe: 'Local professionals, great cafes, walkable', avoid: 'El Centro (safety)' },
      { name: 'Sabaneta', avgRent: '$300–$500/mo 1BR', vibe: 'Quiet, artsy, lowest prices, flower sellers', avoid: 'El Poblado markup' },
    ],
  },
  {
    city: 'Chiang Mai, Thailand',
    flag: '🇹🇭',
    neighborhoods: [
      { name: 'Nimmanhaemin outskirts', avgRent: '$200–$400/mo 1BR', vibe: 'Near nomad hubs but cheaper streets', avoid: 'Old City tourist apartments' },
      { name: 'Hang Dong', avgRent: '$150–$300/mo 1BR', vibe: 'Thai residential, temples, very local', avoid: 'Phuket entirely' },
      { name: 'Santitham', avgRent: '$200–$350/mo 1BR', vibe: 'Local Thai neighborhood, authentic markets', avoid: 'Riverside tourist strip' },
    ],
  },
]

const expatHubs = [
  { city: 'Medellín, Colombia', flag: '🇨🇴', expats: '15,000+', hotspot: 'El Poblado / Laureles', communities: 'Nomad Medellín, Expats Colombia FB, Remote Year', type: 'Digital Nomad Capital Americas', cost: '$900–$1,800/mo' },
  { city: 'Chiang Mai, Thailand', flag: '🇹🇭', expats: '20,000+', hotspot: 'Nimman area', communities: 'Nomad List meetups, CMCO, DNX', type: 'Asia Digital Nomad King', cost: '$800–$1,500/mo' },
  { city: 'Lisbon, Portugal', flag: '🇵🇹', expats: '80,000+', hotspot: 'Príncipe Real / Santos', communities: 'Lisbon Expats FB, NL community, Startup Lisboa', type: 'EU Expat Capital', cost: '$1,600–$2,800/mo' },
  { city: 'Tbilisi, Georgia', flag: '🇬🇪', expats: '30,000+', hotspot: 'Vake / Vera', communities: 'Tbilisi Digital Nomads, Expat Exchange', type: 'Rising Nomad Hub', cost: '$600–$1,200/mo' },
  { city: 'Playa del Carmen, Mexico', flag: '🇲🇽', expats: '25,000+', hotspot: 'Zazil-Ha / Centro', communities: 'PDC Expats, Riviera Maya Nomads', type: 'Caribbean Coast Expat Hub', cost: '$1,000–$2,000/mo' },
  { city: 'Bali, Indonesia', flag: '🇮🇩', expats: '40,000+', hotspot: 'Canggu / Seminyak', communities: 'Canggu Nomads, Bali Expat Society', type: 'Lifestyle Capital Asia', cost: '$1,000–$2,000/mo' },
]

const upcomingAreas = [
  {
    place: 'Tirana, Albania',
    flag: '🇦🇱',
    stage: 'Very early',
    current: '$400–$700/mo',
    projected: '$700–$1,100 by 2027',
    why: 'EU candidate country. Flooding with young Europeans. 5 hrs from Rome. Incredible Mediterranean food.',
    signals: ['EU accession talks accelerating', 'Tech startup scene forming', 'Airbnb doubling YoY', 'Direct flights added'],
    hotness: 88,
  },
  {
    place: 'Skopje, North Macedonia',
    flag: '🇲🇰',
    stage: 'Early',
    current: '$450–$750/mo',
    projected: '$800–$1,200 by 2026',
    why: 'Euro-candidate. Baroque city center. Extreme low cost. Growing nomad community arriving from Georgia.',
    signals: ['NATO member since 2020', 'EU candidacy active', 'Digital nomad FB groups forming', 'Airport expanding'],
    hotness: 71,
  },
  {
    place: 'Novi Sad, Serbia',
    flag: '🇷🇸',
    stage: 'Early',
    current: '$550–$850/mo',
    projected: '$900–$1,400 by 2026',
    why: 'European Capital of Culture 2022. Beautiful Danube city. Tech companies setting up. Belgrade overflow.',
    signals: ['IT hub overflow from Belgrade', 'Direct EU flights', 'Exit Festival international fame', 'Young professional influx'],
    hotness: 76,
  },
  {
    place: 'Kotor, Montenegro',
    flag: '🇲🇪',
    stage: 'Breaking',
    current: '$900–$1,400/mo',
    projected: '$1,500–$2,200 by 2026',
    why: 'NATO member, EU candidate. Bay of Kotor — one of the most beautiful places on earth. Just discovered.',
    signals: ['Montenegro EU accession', 'Yacht scene exploding', 'Property prices 30% YoY', 'Nomad community forming'],
    hotness: 84,
  },
]

export default function LocalKnowledgePage() {
  const [activeTab, setActiveTab] = useState<Tab>('gems')

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-jade-500/[0.04] top-0 left-0" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-gold-500/[0.04] bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Link href="/escape" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Escape Plan
        </Link>

        <div className="mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Map className="w-3.5 h-3.5 text-jade-400" />
            <span className="text-white/50 text-sm font-mono">Ground-level intelligence</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Know Before <span className="gradient-text">Everyone Else.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Hidden gems before they blow up. Cheap neighborhoods everyone else misses. Expat hubs where your tribe already lives. Places about to 2x in price.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { key: 'gems', label: '💎 Hidden Gems', icon: Eye },
            { key: 'neighborhoods', label: '🏘 Cheap Neighborhoods', icon: Map },
            { key: 'expat-hubs', label: '👥 Expat Hubs', icon: Users },
            { key: 'upcoming', label: '📈 Up & Coming', icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              className={`filter-tab px-5 py-3 text-sm font-medium ${
                activeTab === tab.key ? 'active' : 'text-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hidden Gems */}
        {activeTab === 'gems' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hiddenGems.map((gem, i) => (
              <div key={gem.place} className="module-card rounded-3xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{gem.flag}</span>
                    <div>
                      <h3 className="font-display text-base font-bold">{gem.place}</h3>
                      <span className="text-white/30 text-xs">{gem.type}</span>
                    </div>
                  </div>
                </div>

                {/* Hotness meter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white/25 text-xs">Discovery heat</span>
                    <span className="text-gold-400 text-xs font-mono">{gem.hotness}/100</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="h-full bg-gradient-to-r from-jade-500 to-gold-400 rounded-full" style={{ width: `${gem.hotness}%` }} />
                  </div>
                </div>

                <div className="glass-gold rounded-xl px-4 py-3 mb-4">
                  <div className="text-gold-400 font-bold">{gem.cost}</div>
                  <div className="text-white/30 text-xs">{gem.visa}</div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4">{gem.why}</p>

                <div className="flex flex-wrap gap-1.5">
                  {gem.tags.map((t) => (
                    <span key={t} className="glass px-2.5 py-1 rounded-full text-xs text-white/40">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cheap Neighborhoods */}
        {activeTab === 'neighborhoods' && (
          <div className="space-y-6">
            {cheapNeighborhoods.map((city, i) => (
              <div key={city.city} className="glass rounded-3xl p-7 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{city.flag}</span>
                  <h3 className="font-display text-xl font-bold">{city.city}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {city.neighborhoods.map((hood) => (
                    <div key={hood.name} className="glass rounded-2xl p-4">
                      <h4 className="font-semibold mb-1 text-gold-400">{hood.name}</h4>
                      <div className="text-jade-400 text-sm font-bold mb-2">{hood.avgRent}</div>
                      <p className="text-white/50 text-xs leading-relaxed mb-2">{hood.vibe}</p>
                      <p className="text-white/25 text-xs italic">Avoid: {hood.avoid}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expat Hubs */}
        {activeTab === 'expat-hubs' && (
          <div className="grid md:grid-cols-2 gap-5">
            {expatHubs.map((hub, i) => (
              <div key={hub.city} className="glass rounded-3xl p-7 animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{hub.flag}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold">{hub.city}</h3>
                      <span className="text-jade-400 text-xs font-mono">{hub.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold-400 font-bold text-sm">{hub.cost}</div>
                    <div className="text-white/25 text-xs">{hub.expats} expats</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-white/25 w-24 shrink-0 text-xs">Hotspot</span>
                    <span className="text-white/65">{hub.hotspot}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-white/25 w-24 shrink-0 text-xs">Find people</span>
                    <span className="text-white/55 text-xs">{hub.communities}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, idx) => (
                    <div key={idx} className={`h-1.5 w-8 rounded-full ${idx < 4 ? 'bg-jade-500' : 'bg-white/10'}`} />
                  ))}
                  <span className="text-white/30 text-xs ml-2">Community strength</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Up & Coming */}
        {activeTab === 'upcoming' && (
          <div className="space-y-5">
            {upcomingAreas.map((area, i) => (
              <div key={area.place} className="glass rounded-3xl p-7 animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center gap-4 md:w-48">
                    <span className="text-3xl">{area.flag}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{area.place}</h3>
                      <span className="glass px-2 py-0.5 rounded-full text-jade-400 text-xs font-mono">{area.stage}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Price trajectory */}
                    <div className="flex items-center gap-4 mb-3">
                      <div>
                        <div className="text-white/25 text-xs mb-0.5">Now</div>
                        <div className="text-gold-400 font-bold">{area.current}</div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-jade-400" />
                      <div>
                        <div className="text-white/25 text-xs mb-0.5">Projected</div>
                        <div className="text-white/60 font-medium">{area.projected}</div>
                      </div>

                      {/* Hotness */}
                      <div className="ml-auto text-right">
                        <div className="text-white/25 text-xs mb-0.5">Heat score</div>
                        <div className="font-bold gradient-text-gold">{area.hotness}/100</div>
                      </div>
                    </div>

                    <p className="text-white/55 text-sm leading-relaxed mb-3">{area.why}</p>

                    <div className="flex flex-wrap gap-2">
                      {area.signals.map((s) => (
                        <span key={s} className="glass px-3 py-1 rounded-full text-xs text-jade-400/80 border border-jade-500/15">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 glass-gold rounded-3xl p-8 text-center glow-gold">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Get Your AI-Matched <span className="gradient-text">Country + Neighborhood</span>
          </h2>
          <p className="text-white/50 mb-6">Take the quiz and we'll match you to a country, city, and neighborhood based on your lifestyle.</p>
          <Link href="/quiz" className="btn-capsule px-8 py-3.5 text-base font-semibold gap-2 inline-flex items-center">
            Find My Perfect Spot →
          </Link>
        </div>
      </div>
    </main>
  )
}
