'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Wifi, Heart, Shield, TrendingUp } from 'lucide-react'

const budgetFilters = [
  { label: 'Under $800', value: 800 },
  { label: 'Under $1,200', value: 1200 },
  { label: 'Under $1,500', value: 1500 },
  { label: 'Under $2,000', value: 2000 },
  { label: 'All Countries', value: 9999 },
]

const countries = [
  {
    flag: '🇬🇪',
    name: 'Georgia',
    region: 'Eastern Europe',
    minCost: 650,
    maxCost: 1200,
    visaEase: 98,
    quality: 82,
    wifi: 90,
    healthcare: 70,
    safety: 88,
    highlights: ['365-day visa-free for Americans', '1% flat tax on foreign income', 'Tbilisi — booming nomad scene'],
    bestFor: 'Budget kings',
    color: 'jade',
  },
  {
    flag: '🇲🇩',
    name: 'Moldova',
    region: 'Eastern Europe',
    minCost: 500,
    maxCost: 850,
    visaEase: 90,
    quality: 68,
    wifi: 82,
    healthcare: 62,
    safety: 78,
    highlights: ['Cheapest in Europe', '90-day visa-free', 'Affordable wine country'],
    bestFor: 'Ultra budget',
    color: 'jade',
  },
  {
    flag: '🇲🇽',
    name: 'Mexico',
    region: 'Latin America',
    minCost: 900,
    maxCost: 2000,
    visaEase: 92,
    quality: 84,
    wifi: 80,
    healthcare: 78,
    safety: 70,
    highlights: ['Closest to the US', 'Huatulco under $900/mo', 'Temp resident visa easy'],
    bestFor: 'Convenience seekers',
    color: 'gold',
  },
  {
    flag: '🇨🇴',
    name: 'Colombia',
    region: 'Latin America',
    minCost: 900,
    maxCost: 1800,
    visaEase: 85,
    quality: 85,
    wifi: 82,
    healthcare: 80,
    safety: 72,
    highlights: ['Eternal spring climate', 'Medellín for $1k/mo', 'Strong expat community'],
    bestFor: 'City lovers',
    color: 'gold',
  },
  {
    flag: '🇹🇭',
    name: 'Thailand',
    region: 'Southeast Asia',
    minCost: 850,
    maxCost: 1800,
    visaEase: 78,
    quality: 86,
    wifi: 85,
    healthcare: 90,
    safety: 84,
    highlights: ['World-class food from $1', 'LTR visa — 10 year stay', 'Chiang Mai $1k/mo easily'],
    bestFor: 'Asian dream',
    color: 'jade',
  },
  {
    flag: '🇻🇳',
    name: 'Vietnam',
    region: 'Southeast Asia',
    minCost: 700,
    maxCost: 1400,
    visaEase: 72,
    quality: 82,
    wifi: 88,
    healthcare: 72,
    safety: 86,
    highlights: ['Da Nang beach life under $1k', 'E-visa easy', 'Growing tech scene'],
    bestFor: 'Budget Asia',
    color: 'jade',
  },
  {
    flag: '🇵🇹',
    name: 'Portugal',
    region: 'Europe',
    minCost: 1400,
    maxCost: 2800,
    visaEase: 88,
    quality: 92,
    wifi: 88,
    healthcare: 88,
    safety: 94,
    highlights: ['D7 passive income visa', 'NHR tax scheme', 'Alentejo from $1,400/mo'],
    bestFor: 'European life',
    color: 'gold',
  },
  {
    flag: '🇷🇸',
    name: 'Serbia',
    region: 'Eastern Europe',
    minCost: 750,
    maxCost: 1300,
    visaEase: 92,
    quality: 79,
    wifi: 90,
    healthcare: 72,
    safety: 86,
    highlights: ['Belgrade nightlife world-famous', 'No tax on foreign income', '90-day free + easy extension'],
    bestFor: 'Nomad hub',
    color: 'gold',
  },
  {
    flag: '🇧🇦',
    name: 'Bosnia',
    region: 'Eastern Europe',
    minCost: 600,
    maxCost: 1000,
    visaEase: 85,
    quality: 72,
    wifi: 80,
    healthcare: 65,
    safety: 84,
    highlights: ['Sarajevo under $700/mo', 'Stunning mountains', 'Off the beaten path'],
    bestFor: 'Adventure seekers',
    color: 'jade',
  },
  {
    flag: '🇪🇨',
    name: 'Ecuador',
    region: 'Latin America',
    minCost: 800,
    maxCost: 1400,
    visaEase: 88,
    quality: 80,
    wifi: 78,
    healthcare: 76,
    safety: 68,
    highlights: ['Uses USD — no FX risk', 'Cuenca rated #1 retirement city', 'Pensioner visa from $800/mo'],
    bestFor: 'Retirees',
    color: 'gold',
  },
  {
    flag: '🇲🇾',
    name: 'Malaysia',
    region: 'Southeast Asia',
    minCost: 1000,
    maxCost: 1800,
    visaEase: 82,
    quality: 88,
    wifi: 86,
    healthcare: 88,
    safety: 86,
    highlights: ['MM2H long-term visa', 'English widely spoken', 'KL $1,200/mo luxury'],
    bestFor: 'Family relocation',
    color: 'jade',
  },
  {
    flag: '🇵🇱',
    name: 'Poland',
    region: 'Europe',
    minCost: 1000,
    maxCost: 1800,
    visaEase: 75,
    quality: 86,
    wifi: 90,
    healthcare: 82,
    safety: 90,
    highlights: ['Kraków cheaper than Berlin', 'Strong tech ecosystem', 'EU gateway'],
    bestFor: 'Euro access',
    color: 'gold',
  },
]

export default function CheapestCountriesPage() {
  const [activeFilter, setActiveFilter] = useState(9999)
  const [sortBy, setSortBy] = useState<'cost' | 'quality' | 'visa'>('cost')

  const filtered = countries
    .filter((c) => c.minCost <= activeFilter)
    .sort((a, b) => {
      if (sortBy === 'cost') return a.minCost - b.minCost
      if (sortBy === 'quality') return b.quality - a.quality
      if (sortBy === 'visa') return b.visaEase - a.visaEase
      return 0
    })

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-jade-500/[0.04] top-0 right-0" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-gold-500/[0.04] bottom-0 left-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Back */}
        <Link href="/escape" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Escape Plan
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <DollarSign className="w-3.5 h-3.5 text-jade-400" />
            <span className="text-white/50 text-sm font-mono">Cost of living intelligence</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Live Well on <span className="gradient-text">$800–$2,000</span><br />
            Per Month
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            12 countries where your money goes 2–5x further than the US. Filtered by budget, sorted by what matters.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Budget filter tabs */}
          <div className="flex flex-wrap gap-2">
            {budgetFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`filter-tab px-4 py-2 text-sm font-medium ${
                  activeFilter === f.value ? 'active' : 'text-white/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex gap-2 md:ml-auto">
            {[
              { key: 'cost', label: 'Lowest Cost' },
              { key: 'quality', label: 'Best Quality' },
              { key: 'visa', label: 'Easiest Visa' },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key as 'cost' | 'quality' | 'visa')}
                className={`filter-tab px-3 py-1.5 text-xs font-medium ${
                  sortBy === s.key ? 'active' : 'text-white/40'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Country count */}
        <p className="text-white/30 text-sm font-mono mb-6">
          {filtered.length} countries matching your filter
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((c, i) => (
            <div
              key={c.name}
              className="country-card rounded-3xl p-6 animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-3xl mr-3">{c.flag}</span>
                </div>
                <span className={`font-mono text-xs px-2.5 py-1 rounded-full glass ${
                  c.color === 'jade' ? 'text-jade-400' : 'text-gold-400'
                }`}>
                  {c.bestFor}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold mb-0.5">{c.name}</h3>
              <p className="text-white/30 text-xs font-mono mb-4">{c.region}</p>

              {/* Cost range */}
              <div className="glass-gold rounded-xl px-4 py-3 mb-4">
                <div className="text-gold-400 font-display text-2xl font-bold">
                  ${c.minCost.toLocaleString()}–${c.maxCost.toLocaleString()}
                  <span className="text-white/30 text-sm font-body font-normal ml-1">/mo</span>
                </div>
                <div className="text-white/30 text-xs mt-0.5">comfortable lifestyle</div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { icon: Shield, label: 'Safety', val: c.safety, color: 'jade' },
                  { icon: Heart, label: 'Health', val: c.healthcare, color: 'gold' },
                  { icon: Wifi, label: 'WiFi', val: c.wifi, color: 'jade' },
                  { icon: TrendingUp, label: 'Visa', val: c.visaEase, color: 'gold' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-sm font-bold font-mono ${
                      stat.color === 'jade' ? 'text-jade-400' : 'text-gold-400'
                    }`}>
                      {stat.val}
                    </div>
                    <div className="text-white/25 text-[10px] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-white/50">
                    <span className={`mt-0.5 text-xs ${c.color === 'jade' ? 'text-jade-400' : 'text-gold-400'}`}>✦</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-gold rounded-3xl p-8 text-center glow-gold">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Find Your Perfect <span className="gradient-text">Budget Match</span>
          </h2>
          <p className="text-white/50 mb-6">Take the full AI quiz and get a personalized country ranking based on your exact budget and lifestyle.</p>
          <Link href="/quiz" className="btn-capsule px-8 py-3.5 text-base font-semibold gap-2 inline-flex items-center">
            Get My AI Recommendation →
          </Link>
        </div>
      </div>
    </main>
  )
}
