'use client'

import Link from 'next/link'
import { ArrowRight, Globe, BookOpen, Briefcase, Home, Sun, Map } from 'lucide-react'

const modules = [
  {
    href: '/escape/cheapest',
    icon: Globe,
    emoji: '🌍',
    title: 'Cheapest Countries',
    desc: 'Live well on $800–$2,000/month. Ranked by cost, visa ease, and quality of life.',
    tag: 'Cost of Living',
    color: 'gold',
    stat: '$850/mo avg',
  },
  {
    href: '/escape/teach-english',
    icon: BookOpen,
    emoji: '📚',
    title: 'Teach English Abroad',
    desc: 'Earn $15–$30/hr online or $1,500–$4,000/mo in-person. No degree needed for most platforms.',
    tag: 'Income Abroad',
    color: 'jade',
    stat: '$25/hr avg',
  },
  {
    href: '/escape/work-abroad',
    icon: Briefcase,
    emoji: '💼',
    title: 'Work Abroad',
    desc: 'USAJobs overseas, UN, NATO, remote boards, seasonal gigs, and government contractor roles.',
    tag: 'Employment',
    color: 'gold',
    stat: '1,200+ roles',
  },
  {
    href: '/escape/property',
    icon: Home,
    emoji: '🏠',
    title: 'Property & Residency',
    desc: 'Buy property to earn EU residency. Portugal, Spain, Greece, Italy, Panama golden visa routes.',
    tag: 'Investment',
    color: 'jade',
    stat: 'From €250k',
  },
  {
    href: '/escape/seasonal',
    icon: Sun,
    emoji: '🌤',
    title: 'Seasonal Living',
    desc: 'AI-powered 4-season rotation planner. Never pay full-price rent or deal with winters again.',
    tag: 'Lifestyle',
    color: 'gold',
    stat: 'AI-powered',
  },
  {
    href: '/escape/local-knowledge',
    icon: Map,
    emoji: '🗺',
    title: 'Local Knowledge',
    desc: 'Hidden gems, cheap neighborhoods, expat hubs, and up-and-coming areas before they blow up.',
    tag: 'Intel',
    color: 'jade',
    stat: '50+ cities',
  },
]

export default function EscapePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Liquid morphism background */}
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[700px] h-[700px] bg-gold-500/[0.04] top-[-100px] left-[-200px]" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-jade-500/[0.04] bottom-[100px] right-[-100px]" />
        <div className="blob blob-3 w-[400px] h-[400px] bg-gold-400/[0.03] top-1/2 left-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-white/50 text-sm font-mono">Complete escape toolkit</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
            Your <span className="gradient-text">Escape Plan</span><br />
            Starts Here
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Six modules covering every angle of the move — from finding the cheapest country to landing a job, earning residency, and living seasonally like the ultra-wealthy do.
          </p>
        </div>

        {/* Score teaser */}
        <div className="glass-gold rounded-3xl p-8 md:p-10 max-w-2xl mx-auto mb-20 glow-gold text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Don't know where to start?
          </h2>
          <p className="text-white/50 mb-6 leading-relaxed">
            Take the 3-question Escape Score quiz and find out your Freedom Score, best visa options, and ideal budget — in 30 seconds.
          </p>
          <Link href="/score" className="btn-capsule px-8 py-3.5 text-base font-semibold gap-2">
            Calculate My Escape Score
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Module grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="module-card rounded-3xl p-7 group block animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className="text-3xl">{mod.emoji}</div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`font-mono text-xs px-2.5 py-1 rounded-full glass ${
                    mod.color === 'gold' ? 'text-gold-400' : 'text-jade-400'
                  }`}>
                    {mod.tag}
                  </span>
                  <span className={`font-mono text-xs font-bold ${
                    mod.color === 'gold' ? 'text-gold-300/70' : 'text-jade-400/70'
                  }`}>
                    {mod.stat}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-gold-300 transition-colors">
                {mod.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                {mod.desc}
              </p>

              <div className={`inline-flex items-center gap-2 text-sm font-medium ${
                mod.color === 'gold' ? 'text-gold-400' : 'text-jade-400'
              } group-hover:gap-3 transition-all`}>
                Explore module
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="section-divider mb-16" />
          <p className="text-white/30 text-sm font-mono mb-4">Ready to go deeper?</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Let AI Match You to the <span className="gradient-text">Perfect Country</span>
          </h2>
          <Link href="/quiz" className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-lg font-bold">
            Start the Relocation Quiz
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
