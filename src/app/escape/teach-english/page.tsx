'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, DollarSign, Clock, Star, Check } from 'lucide-react'

const platforms = [
  {
    name: 'Cambly',
    type: 'Online · US/CA only',
    payRange: '$10.20–$12/hr',
    payNum: 11,
    costCover: 40,
    schedule: 'Flexible anytime',
    requirements: ['Native speaker', 'No degree needed', 'Stable WiFi'],
    pros: ['Instant approval', 'Set own hours', 'Pay weekly'],
    cons: ['Lower pay', 'Competitive for prime hours'],
    rating: 4.1,
    emoji: '🇺🇸',
    color: 'gold',
  },
  {
    name: 'NativeCamp',
    type: 'Online · Japan market',
    payRange: '$8–$12/hr',
    payNum: 10,
    costCover: 38,
    schedule: 'Japan time slots',
    requirements: ['Native speaker', 'No degree needed', 'TEFL optional'],
    pros: ['Unlimited students', 'Great for practice', 'Steady work'],
    cons: ['Japan timezone', 'Lower base rate'],
    rating: 3.9,
    emoji: '🇯🇵',
    color: 'jade',
  },
  {
    name: 'Engoo',
    type: 'Online · Asia market',
    payRange: '$12–$20/hr',
    payNum: 16,
    costCover: 65,
    schedule: 'Asia morning slots',
    requirements: ['Native/near-native', 'TEFL preferred', '6mo+ teaching exp'],
    pros: ['Better pay', 'Professional students', 'Career growth'],
    cons: ['More competitive', 'Fixed schedule'],
    rating: 4.3,
    emoji: '🌏',
    color: 'gold',
  },
  {
    name: 'Preply',
    type: 'Online · Global · Self-priced',
    payRange: '$15–$40/hr',
    payNum: 28,
    costCover: 90,
    schedule: 'Your own schedule',
    requirements: ['Any speaker level', 'Profile & intro video', 'Set your rate'],
    pros: ['Set your own price', 'Build long-term students', 'High ceiling'],
    cons: ['30% commission', 'Need to market yourself'],
    rating: 4.5,
    emoji: '💼',
    color: 'jade',
  },
  {
    name: 'iTalki',
    type: 'Online · Global · Marketplace',
    payRange: '$10–$60/hr',
    payNum: 30,
    costCover: 95,
    schedule: 'Your own schedule',
    requirements: ['Any background', 'Intro lesson profile', 'TEFL for "Teacher" tag'],
    pros: ['Highest pay ceiling', 'Loyal long-term students', 'Community & trust'],
    cons: ['18% commission', 'Takes time to build'],
    rating: 4.7,
    emoji: '⭐',
    color: 'gold',
  },
  {
    name: 'VIPKid / GOGOKID',
    type: 'Online · China market',
    payRange: '$14–$22/hr',
    payNum: 18,
    costCover: 70,
    schedule: 'China AM (US evenings)',
    requirements: ["Bachelor's degree", 'Teaching experience', 'TEFL recommended'],
    pros: ['Consistent pay', 'Structured curriculum', 'Good hourly'],
    cons: ['Degree required', 'China AM slots', 'Market uncertainty'],
    rating: 4.0,
    emoji: '🇨🇳',
    color: 'jade',
  },
]

const inPersonDestinations = [
  {
    country: '🇨🇳 China',
    salary: '$1,800–$3,500/mo',
    housing: 'Free apartment often included',
    flights: 'Return flight reimbursed',
    visa: 'Z visa (work)',
    req: "Bachelor's + TEFL",
    highlight: 'Best package deal',
  },
  {
    country: '🇰🇷 South Korea',
    salary: '$1,600–$2,800/mo',
    housing: 'Free apartment',
    flights: 'One-way flight covered',
    visa: 'E-2 work visa',
    req: "Bachelor's + no TEFL",
    highlight: 'Most organized program',
  },
  {
    country: '🇯🇵 Japan',
    salary: '$1,500–$2,500/mo',
    housing: 'Subsidized',
    flights: 'Not always covered',
    visa: 'Instructor visa',
    req: "Bachelor's required",
    highlight: 'JET Program — elite',
  },
  {
    country: '🇹🇭 Thailand',
    salary: '$1,000–$2,000/mo',
    housing: 'Not included',
    flights: 'Not covered',
    visa: 'Non-B visa',
    req: 'TEFL recommended',
    highlight: 'Lifestyle + adventure',
  },
  {
    country: '🇸🇦 Saudi Arabia',
    salary: '$3,000–$6,000/mo',
    housing: 'Free housing',
    flights: 'Covered both ways',
    visa: 'Work visa provided',
    req: "Bachelor's + 2yr exp",
    highlight: 'Maximum savings',
  },
  {
    country: '🇻🇳 Vietnam',
    salary: '$1,400–$2,400/mo',
    housing: 'Not included',
    flights: 'Sometimes covered',
    visa: 'Work permit',
    req: 'TEFL often enough',
    highlight: 'Low cost, great life',
  },
]

const teflGuide = [
  { step: '01', title: 'Choose your TEFL', desc: 'Go with a 120-hour accredited course. Best: TEFL.org, i-to-i, Bridge. Cost: $150–$400 online. Avoid free unaccredited certs.', time: '4–6 weeks' },
  { step: '02', title: 'Pick online or in-person', desc: 'Online pays $10–$40/hr from anywhere. In-person pays more but requires visa, flight, and relocation commitment.', time: '1 hour decision' },
  { step: '03', title: 'Set up your profile', desc: 'For online: record a 2-min intro video. Show your environment, energy, and approach. Profile photo matters immensely.', time: '1 day' },
  { step: '04', title: 'Get first students', desc: 'Offer trial lessons at 50% off. Get 5 reviews, then raise rates. On iTalki/Preply this is 2–4 weeks.', time: '2–4 weeks' },
  { step: '05', title: 'Scale to full-time', desc: '20 students × $25/hr × 20hrs/wk = $2,000/mo. In Thailand this is a luxurious life. Scale to $3,500+ with premium rates.', time: '3–6 months' },
]

export default function TeachEnglishPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-jade-500/[0.04] top-[-50px] right-[-50px]" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-gold-500/[0.04] bottom-0 left-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Link href="/escape" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Escape Plan
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-3.5 h-3.5 text-jade-400" />
            <span className="text-white/50 text-sm font-mono">Income abroad</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Teach English.<br />
            <span className="gradient-text">Fund Your Escape.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Earn $10–$60/hr teaching English online from any country with WiFi, or $1,500–$6,000/mo in-person with free housing. No degree needed for most platforms.
          </p>
        </div>

        {/* Quick income calc */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { label: 'Part-time online', calc: '10 hrs/wk @ $20', monthly: '$800/mo', note: 'Covers rent in SEA' },
            { label: 'Full-time online', calc: '20 hrs/wk @ $25', monthly: '$2,000/mo', note: 'Comfortable in Colombia' },
            { label: 'In-person abroad', calc: '40 hrs/wk + housing', monthly: '$2,500+/mo', note: 'Save 60% of salary' },
          ].map((c, i) => (
            <div key={i} className="glass-gold rounded-2xl p-6">
              <div className="text-white/40 text-xs font-mono mb-1">{c.label}</div>
              <div className="font-display text-3xl font-bold gradient-text-gold mb-0.5">{c.monthly}</div>
              <div className="text-white/30 text-sm mb-3">{c.calc}</div>
              <div className="text-jade-400 text-xs font-medium">{c.note}</div>
            </div>
          ))}
        </div>

        {/* Platform cards */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Platform <span className="gradient-text">Comparison</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">All platforms for teaching English online — ranked by earning potential</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((p, i) => (
              <div
                key={p.name}
                className="platform-card rounded-3xl p-6 animate-fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{p.emoji}</span>
                      <h3 className="font-display text-lg font-bold">{p.name}</h3>
                    </div>
                    <p className="text-white/30 text-xs">{p.type}</p>
                  </div>
                  <div className="flex items-center gap-1 glass px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                    <span className="text-xs font-mono text-gold-400">{p.rating}</span>
                  </div>
                </div>

                {/* Pay */}
                <div className={`rounded-xl px-4 py-3 mb-4 ${p.color === 'jade' ? 'bg-jade-500/8 border border-jade-500/15' : 'bg-gold-400/8 border border-gold-400/15'}`}>
                  <div className={`font-display text-2xl font-bold ${p.color === 'jade' ? 'text-jade-400' : 'text-gold-400'}`}>
                    {p.payRange}
                  </div>
                  <div className="text-white/30 text-xs mt-0.5">{p.schedule}</div>
                </div>

                {/* Monthly coverage */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white/30 text-xs">Covers monthly budget in low-cost country</span>
                    <span className="text-white/50 text-xs font-mono">{p.costCover}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.color === 'jade' ? 'bg-jade-500' : 'bg-gold-400'}`}
                      style={{ width: `${p.costCover}%` }}
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-1 mb-4">
                  {p.requirements.map((r) => (
                    <div key={r} className="flex items-center gap-2 text-xs text-white/40">
                      <Check className="w-3 h-3 text-jade-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>

                {/* Pros */}
                <div className="space-y-1">
                  {p.pros.map((pr) => (
                    <div key={pr} className="flex items-center gap-2 text-xs text-white/55">
                      <span className={p.color === 'jade' ? 'text-jade-400' : 'text-gold-400'}>+</span>
                      {pr}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* In-person destinations */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Teach In-Person <span className="gradient-text">Abroad</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">Best countries for classroom teaching with package deals</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inPersonDestinations.map((d, i) => (
              <div key={d.country} className="country-card rounded-2xl p-5 animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-base font-bold">{d.country}</h3>
                  <span className="glass px-2 py-0.5 rounded-full text-jade-400 text-xs font-mono">{d.highlight}</span>
                </div>

                <div className="font-display text-xl font-bold text-gold-400 mb-3">{d.salary}</div>

                <div className="space-y-1.5 text-sm">
                  {[
                    { label: 'Housing', val: d.housing },
                    { label: 'Flights', val: d.flights },
                    { label: 'Visa', val: d.visa },
                    { label: 'Requires', val: d.req },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2">
                      <span className="text-white/25 w-14 shrink-0 text-xs mt-0.5">{item.label}</span>
                      <span className="text-white/60 text-xs">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEFL Guide */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            TEFL <span className="gradient-text">Quick Guide</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">From zero to earning abroad in under 3 months</p>

          <div className="space-y-4">
            {teflGuide.map((step, i) => (
              <div key={step.step} className="glass rounded-2xl p-6 flex gap-5 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="font-mono text-white/10 text-4xl font-bold shrink-0 leading-none pt-1">{step.step}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-bold">{step.title}</h3>
                    <span className="glass px-2.5 py-1 rounded-full text-jade-400 text-xs font-mono">{step.time}</span>
                  </div>
                  <p className="text-white/50 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-gold rounded-3xl p-8 text-center glow-gold">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Pair Teaching Income With the <span className="gradient-text">Right Country</span>
          </h2>
          <p className="text-white/50 mb-6">$20/hr goes 3x further in some countries. Find yours with our AI quiz.</p>
          <Link href="/quiz" className="btn-capsule-jade px-8 py-3.5 text-base font-semibold gap-2 inline-flex items-center">
            Find My Best Country →
          </Link>
        </div>
      </div>
    </main>
  )
}
