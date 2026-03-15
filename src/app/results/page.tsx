'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Star, DollarSign, Shield, Heart, Globe, Lock,
  ChevronDown, ChevronUp, Check, ArrowRight, Plane, Calendar
} from 'lucide-react'
import { CountryRecommendation } from '@/types'

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 28
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle
          cx="32" cy="32" r="28" fill="none"
          stroke="url(#scoreGrad)" strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0c84a" />
            <stop offset="100%" stopColor="#22c97a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-sm font-bold text-gold-300">{score}</span>
      </div>
    </div>
  )
}

function CountryCard({
  rec,
  index,
  isPremium,
  onUpgrade,
}: {
  rec: CountryRecommendation
  index: number
  isPremium: boolean
  onUpgrade: () => void
}) {
  const [expanded, setExpanded] = useState(index === 0)
  const [planExpanded, setPlanExpanded] = useState(false)

  const rankLabels = ['🥇 Top Pick', '🥈 Runner-Up', '🥉 Third Choice']

  return (
    <div
      className={`country-card rounded-3xl overflow-hidden animate-fade-up border ${
        index === 0 ? 'border-gold-400/30' : 'border-white/5'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Header */}
      <div
        className={`p-6 cursor-pointer ${index === 0 ? 'bg-gold-400/5' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{rec.flag}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-white/40 uppercase tracking-wider">{rankLabels[index]}</span>
              </div>
              <h3 className="font-display text-2xl font-bold">{rec.country}</h3>
              <p className="text-white/40 text-sm mt-1">{rec.costOfLiving}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ScoreRing score={rec.score} />
            <div className="text-white/30">
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {rec.cities.slice(0, 3).map(city => (
            <span key={city} className="glass text-xs px-3 py-1.5 rounded-full text-white/60 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-white/5 pt-6">
          {/* Summary */}
          <div className="glass rounded-2xl p-5">
            <p className="text-white/70 leading-relaxed text-sm">{rec.summary}</p>
          </div>

          {/* Pros / Cons */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-jade-400 text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
                <Check className="w-3 h-3" /> Pros
              </h4>
              <ul className="space-y-2">
                {rec.pros.map(pro => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-jade-400 mt-1.5 shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>⚠</span> Challenges
              </h4>
              <ul className="space-y-2">
                {rec.cons.map(con => (
                  <li key={con} className="flex items-start gap-2 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visa Options */}
          <div>
            <h4 className="text-gold-400 text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
              <Globe className="w-3 h-3" /> Visa Options for Americans
            </h4>
            <div className="flex flex-wrap gap-2">
              {rec.visaOptions.map(v => (
                <span key={v} className="glass-gold text-xs px-3 py-1.5 rounded-full text-gold-300">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* 90-day Plan */}
          {rec.relocationPlan && (
            <div>
              <button
                onClick={() => setPlanExpanded(!planExpanded)}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors mb-3"
              >
                <Calendar className="w-4 h-4 text-jade-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-jade-400">90-Day Relocation Plan</span>
                {planExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {planExpanded && (
                <div className="glass rounded-2xl p-5">
                  <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">{rec.relocationPlan}</p>
                </div>
              )}
            </div>
          )}

          {/* Premium Locked Content */}
          {!isPremium && (
            <div className="relative rounded-2xl overflow-hidden">
              <div className="glass p-5 blur-sm pointer-events-none select-none">
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/10 rounded w-2/3" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-obsidian/60 backdrop-blur-sm rounded-2xl">
                <button
                  onClick={onUpgrade}
                  className="flex items-center gap-2 glass-gold px-5 py-3 rounded-xl text-gold-300 text-sm font-semibold hover:bg-gold-400/10 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Unlock Visa Steps, Housing & Tax Guide
                </button>
              </div>
            </div>
          )}

          {/* Premium Content */}
          {isPremium && rec.visaDetails && (
            <div className="space-y-4">
              <div className="glass-gold rounded-2xl p-5">
                <h4 className="text-gold-400 text-xs font-mono uppercase tracking-wider mb-3">Visa Application Steps</h4>
                <p className="text-white/60 text-sm leading-relaxed">{rec.visaDetails}</p>
              </div>
              {rec.neighborhoods && (
                <div className="glass rounded-2xl p-5">
                  <h4 className="text-jade-400 text-xs font-mono uppercase tracking-wider mb-3">Best Neighborhoods</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.neighborhoods.map(n => (
                      <span key={n} className="glass text-xs px-3 py-1.5 rounded-full text-white/60">{n}</span>
                    ))}
                  </div>
                </div>
              )}
              {rec.taxInfo && (
                <div className="glass rounded-2xl p-5">
                  <h4 className="text-gold-400 text-xs font-mono uppercase tracking-wider mb-3">Tax Considerations</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{rec.taxInfo}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  const upgraded = searchParams.get('upgraded') === 'true'

  const [recommendations, setRecommendations] = useState<CountryRecommendation[]>([])
  const [isPremium, setIsPremium] = useState(upgraded)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('exitplan_results')
    if (stored) {
      const data = JSON.parse(stored)
      setRecommendations(data.recommendations || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (upgraded) setIsPremium(true)
  }, [upgraded])

  const handleUpgrade = async () => {
    setUpgrading(true)
    try {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUpgrading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-white/40">Loading your results...</div>
      </div>
    )
  }

  if (!recommendations.length) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 text-center">
        <div>
          <div className="text-5xl mb-4">🌍</div>
          <h2 className="font-display text-2xl font-bold mb-3">No results found</h2>
          <p className="text-white/40 mb-6">Let's start over and find your perfect country.</p>
          <Link href="/quiz" className="btn-primary px-6 py-3 rounded-xl font-semibold">
            Take the Quiz
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-jade-500/4 rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-jade-500 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-obsidian" />
          </div>
          <span className="font-display text-lg font-bold">ExitPlan <span className="gradient-text-gold">AI</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/quiz" className="text-white/40 hover:text-white/70 text-sm transition-colors">
            Retake Quiz
          </Link>
          {!isPremium && (
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            >
              <Lock className="w-3.5 h-3.5" />
              Unlock Full Plan – $19
            </button>
          )}
          {isPremium && (
            <span className="glass-gold px-4 py-2 rounded-xl text-gold-300 text-sm font-semibold flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-gold-400" />
              Premium Unlocked
            </span>
          )}
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Plane className="w-4 h-4 text-jade-400" />
            <span className="text-white/60 text-sm font-mono">Your AI Relocation Report</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Your Top <span className="gradient-text">3 Countries</span>
          </h1>
          <p className="text-white/40 text-lg">Based on your quiz, our AI found your ideal places to live abroad.</p>
        </div>

        {/* Premium Banner */}
        {!isPremium && (
          <div className="glass-gold rounded-3xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 glow-gold animate-fade-up">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🔓</div>
              <div>
                <h3 className="font-display text-lg font-bold gradient-text-gold">Unlock Your Full Relocation Plan</h3>
                <p className="text-white/50 text-sm mt-0.5">Detailed visa steps · Housing sites · Neighborhoods · Tax guide · Healthcare setup</p>
              </div>
            </div>
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="btn-primary shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold whitespace-nowrap"
            >
              {upgrading ? 'Loading...' : 'Unlock Full Plan – $19'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Country Cards */}
        <div className="space-y-6">
          {recommendations.map((rec, i) => (
            <CountryCard
              key={rec.country}
              rec={rec}
              index={i}
              isPremium={isPremium}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>

        {/* What's included in premium */}
        {!isPremium && (
          <div className="mt-12 glass rounded-3xl p-8 animate-fade-up">
            <h3 className="font-display text-2xl font-bold mb-6 text-center">
              Unlock the <span className="gradient-text-gold">Full Plan</span> for $19
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🛂', title: 'Visa Application Steps', desc: 'Exact steps to apply for your visa, documents needed, timeline, and fees' },
                { icon: '🏘', title: 'Neighborhood Recommendations', desc: 'Best neighborhoods for expats in each recommended city' },
                { icon: '🏠', title: 'Housing Websites', desc: 'Where to find apartments and what to expect for rent in each city' },
                { icon: '💰', title: 'Tax Considerations', desc: 'What taxes you may owe as an American living abroad — and how to minimize' },
                { icon: '🏥', title: 'Healthcare Setup', desc: 'How to get covered: local insurance, private plans, international health insurance' },
                { icon: '📅', title: 'Relocation Timeline Checklist', desc: 'Week-by-week action items from decision to landing' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white/2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-white/40 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg"
              >
                {upgrading ? 'Redirecting to checkout...' : 'Get Full Relocation Plan – $19'}
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-white/20 text-xs mt-3">One-time payment · Instant access · 30-day money-back guarantee</p>
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="text-white/20 text-xs text-center mt-12">
          This report is for informational purposes only. Always consult with an immigration attorney before making relocation decisions.
        </p>
      </main>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-white/40">Loading...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
