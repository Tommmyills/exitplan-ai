'use client'

import Link from 'next/link'
import { ArrowLeft, Home, TrendingUp, Shield, Check, AlertCircle } from 'lucide-react'

const goldenVisaCountries = [
  {
    flag: '🇵🇹',
    name: 'Portugal',
    program: 'Golden Visa',
    minInvestment: '€500,000',
    minAmount: 500000,
    residency: '5 years to citizenship',
    requirement: 'Investment fund or commercial property (residential excluded since 2023)',
    processingTime: '6–18 months',
    renewals: 'Every 2 years — only 7 days/yr in Portugal required',
    perks: ['EU freedom of movement', 'NHR tax regime', 'Family included', 'Path to Portuguese passport'],
    cons: ['Residential property no longer eligible', 'Higher minimums now', 'Bureaucratic delays'],
    yield: '4–6%',
    trend: 'up',
    color: 'gold',
    bestFor: 'EU passport seekers',
  },
  {
    flag: '🇪🇸',
    name: 'Spain',
    program: 'Golden Visa',
    minInvestment: '€500,000',
    minAmount: 500000,
    residency: '10 years to citizenship',
    requirement: '€500k in real estate (direct purchase — residential allowed)',
    processingTime: '3–6 months',
    renewals: 'Every 2 years — no stay requirement',
    perks: ['EU freedom of movement', 'Schengen access', 'Family visa included', 'No stay requirement'],
    cons: ['10-year path to citizenship', 'Property prices rising fast', 'Bureaucracy varies by region'],
    yield: '3–5%',
    trend: 'up',
    color: 'jade',
    bestFor: 'Mediterranean lifestyle',
  },
  {
    flag: '🇬🇷',
    name: 'Greece',
    program: 'Golden Visa',
    minInvestment: '€250,000',
    minAmount: 250000,
    residency: '7 years to citizenship',
    requirement: '€250k–€800k depending on property location (Athens zone €800k)',
    processingTime: '3–6 months',
    renewals: 'Every 5 years — no stay requirement',
    perks: ['Cheapest EU golden visa', 'Strong rental yields', 'Schengen access', 'No stay requirement'],
    cons: ['Raised Athens threshold to €800k', 'Healthcare quality varies', 'Language barrier'],
    yield: '4–7%',
    trend: 'up',
    color: 'gold',
    bestFor: 'Best value EU golden visa',
  },
  {
    flag: '🇮🇹',
    name: 'Italy',
    program: 'Investor Visa',
    minInvestment: '€250,000',
    minAmount: 250000,
    residency: '10 years to citizenship',
    requirement: '€250k in innovative startup or €500k in existing Italian company',
    processingTime: '4–6 months',
    renewals: 'Every 2 years',
    perks: ['Flat 7% tax scheme for southern Italy', '€100k flat tax option for wealthy', 'EU passport after 10yr', 'Family included'],
    cons: ['Not real estate based', 'Business investment only', 'Long citizenship path'],
    yield: 'N/A (business)',
    trend: 'stable',
    color: 'jade',
    bestFor: 'Business investors',
  },
  {
    flag: '🇵🇦',
    name: 'Panama',
    program: 'Qualified Investor',
    minInvestment: '$300,000',
    minAmount: 300000,
    residency: '5 years to citizenship',
    requirement: '$300k in Panamanian real estate or bank deposit',
    processingTime: '2–4 months',
    renewals: 'Every 2 years — minimal stay req',
    perks: ['Panama dollar economy', 'No worldwide income tax', 'Friendly Nation visa also available', 'Close to US'],
    cons: ['Not EU passport', 'Humidity + tropical weather', 'Developing infrastructure outside Panama City'],
    yield: '5–8%',
    trend: 'up',
    color: 'gold',
    bestFor: 'Americas base + tax savings',
  },
  {
    flag: '🇲🇹',
    name: 'Malta',
    program: 'MEIN Program',
    minInvestment: '€600,000',
    minAmount: 600000,
    residency: 'Direct citizenship path',
    requirement: '€600k contribution + €700k property purchase or €16k/yr rental + philanthropy',
    processingTime: '12–36 months',
    renewals: 'Citizenship — permanent',
    perks: ['Direct EU citizenship (not just residency)', 'English speaking country', 'EU freedom of movement', 'Reputable program'],
    cons: ['Most expensive option', 'Strict due diligence', 'Small island limitation'],
    yield: '3–4% (rental)',
    trend: 'stable',
    color: 'jade',
    bestFor: 'Fastest EU citizenship',
  },
]

const renovateGuide = [
  {
    step: '01',
    title: 'Find the undervalued property',
    desc: 'Target southern Italy (€1 homes), rural Portugal (€50k–€100k village homes), Georgian old town (Tbilisi €30k–€80k). Look for properties abandoned 5+ years.',
    cost: '€1k–€150k',
    emoji: '🔍',
  },
  {
    step: '02',
    title: 'Hire a local architect / lawyer',
    desc: 'Never buy without a local lawyer (not developer). Budget €1,500–€4,000 for due diligence, title search, and purchase contract review.',
    cost: '€1,500–€4,000',
    emoji: '⚖️',
  },
  {
    step: '03',
    title: 'Renovation budgeting',
    desc: 'Italy: €300–€600/sqm for full renovation. Portugal: €400–€800/sqm. Georgia: €150–€350/sqm. Get 3 contractor quotes. Add 20% buffer.',
    cost: 'Varies by country',
    emoji: '🔨',
  },
  {
    step: '04',
    title: 'Apply for renovation incentives',
    desc: 'Italy Superbonus allows 110% tax credit on renovations. Portugal Rural Interior program offers renovation grants. Greece has energy efficiency subsidies.',
    cost: 'Can offset 20–110% of reno cost',
    emoji: '💰',
  },
  {
    step: '05',
    title: 'Rental yield optimization',
    desc: 'Airbnb in European historic towns can yield 8–15% gross. Split between long-term and short-term. Get a local property manager (10–15% of revenue).',
    cost: '10–15% management fee',
    emoji: '📈',
  },
]

export default function PropertyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[700px] h-[700px] bg-gold-500/[0.04] top-[-100px] right-[-100px]" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-jade-500/[0.04] bottom-0 left-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Link href="/escape" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Escape Plan
        </Link>

        <div className="mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Home className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-white/50 text-sm font-mono">Investment & residency</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Buy Property.<br />
            <span className="gradient-text">Earn Residency.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Golden visa programs that turn real estate investment into legal residency — and eventually citizenship. Compare every program available to Americans.
          </p>
        </div>

        {/* Investment range guide */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { range: '€250k–€350k', where: 'Greece, Italy, Panama', outcome: 'Residency + rental income', tag: 'Entry point' },
            { range: '€500k', where: 'Portugal, Spain', outcome: 'EU residency + passport path', tag: 'Sweet spot' },
            { range: '€600k+', where: 'Malta, Andorra', outcome: 'Fastest EU citizenship', tag: 'Premium' },
          ].map((tier) => (
            <div key={tier.tag} className="glass-gold rounded-2xl p-5">
              <span className="glass px-2.5 py-1 rounded-full text-xs font-mono text-gold-400 mb-3 inline-block">{tier.tag}</span>
              <div className="font-display text-2xl font-bold text-gold-400 mb-1">{tier.range}</div>
              <div className="text-white/60 text-sm mb-1">{tier.where}</div>
              <div className="text-white/30 text-xs">{tier.outcome}</div>
            </div>
          ))}
        </div>

        {/* Golden visa cards */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Golden Visa <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">Every major investment residency program available to Americans</p>

          <div className="grid md:grid-cols-2 gap-5">
            {goldenVisaCountries.map((c, i) => (
              <div
                key={c.name}
                className="glass rounded-3xl p-7 animate-fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{c.flag}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold">{c.name}</h3>
                      <p className="text-white/30 text-xs font-mono">{c.program}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full glass font-mono ${c.color === 'gold' ? 'text-gold-400' : 'text-jade-400'}`}>
                    {c.bestFor}
                  </span>
                </div>

                {/* Min investment */}
                <div className="glass rounded-xl px-5 py-4 mb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white/30 text-xs font-mono mb-1">MINIMUM INVESTMENT</div>
                      <div className={`font-display text-3xl font-bold ${c.color === 'gold' ? 'text-gold-400' : 'text-jade-400'}`}>
                        {c.minInvestment}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/30 text-xs font-mono mb-1">RENTAL YIELD</div>
                      <div className="text-jade-400 font-bold">{c.yield}/yr</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <div className="text-white/25 text-xs mb-1">Residency path</div>
                    <div className="text-white/70">{c.residency}</div>
                  </div>
                  <div>
                    <div className="text-white/25 text-xs mb-1">Processing</div>
                    <div className="text-white/70">{c.processingTime}</div>
                  </div>
                </div>

                <p className="text-white/40 text-xs mb-4 leading-relaxed">{c.requirement}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-jade-400 text-xs font-semibold mb-2">Perks</div>
                    <ul className="space-y-1">
                      {c.perks.slice(0, 3).map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-xs text-white/50">
                          <Check className="w-3 h-3 text-jade-400 mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-400/70 text-xs font-semibold mb-2">Watch out</div>
                    <ul className="space-y-1">
                      {c.cons.slice(0, 2).map((con) => (
                        <li key={con} className="flex items-start gap-1.5 text-xs text-white/35">
                          <AlertCircle className="w-3 h-3 text-red-400/50 mt-0.5 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 glass rounded-xl px-4 py-2.5">
                  <p className="text-white/25 text-xs leading-relaxed">{c.renewals}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buy & Renovate section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Buy Cheap. Renovate. <span className="gradient-text">Profit.</span>
          </h2>
          <p className="text-white/40 text-sm mb-4">Italy €1 home programs, rural Portugal, Georgian old town — how to turn $50k into a cash-flowing asset abroad.</p>

          {/* Italy 1 euro homes callout */}
          <div className="glass-gold rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-5 items-start">
            <div className="text-4xl">🇮🇹</div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Italy €1 Home Program</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                Towns like Sambuca, Mussomeli, and Cinquefrondi offer homes for €1 with the condition you renovate within 3 years (budget €20,000–€100,000 for renovation). You can pair this with Italy's 7% flat tax regime for southern Italy residents.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Sambuca di Sicilia', 'Mussomeli', 'Gangi', 'Cinquefrondi', 'Reggio Emilia'].map((town) => (
                  <span key={town} className="glass px-3 py-1 rounded-full text-white/50 text-xs">{town}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Renovation steps */}
          <div className="space-y-4">
            {renovateGuide.map((step, i) => (
              <div key={step.step} className="glass rounded-2xl p-6 flex gap-5 animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="text-2xl shrink-0">{step.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-white/15 text-lg">{step.step}</span>
                    <h3 className="font-display text-lg font-bold">{step.title}</h3>
                    <span className="glass px-2.5 py-1 rounded-full text-jade-400 text-xs font-mono ml-auto">{step.cost}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-gold rounded-3xl p-8 text-center glow-gold">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Find Your Investment <span className="gradient-text">Sweet Spot</span>
          </h2>
          <p className="text-white/50 mb-6">Tell us your budget and goals — our AI matches you to the right golden visa program.</p>
          <Link href="/quiz" className="btn-capsule px-8 py-3.5 text-base font-semibold gap-2 inline-flex items-center">
            Start the AI Quiz →
          </Link>
        </div>
      </div>
    </main>
  )
}
