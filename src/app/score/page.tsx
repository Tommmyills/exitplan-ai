'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Share2, RefreshCw, Download, Check } from 'lucide-react'

type Step = 0 | 1 | 2 | 3

const questions = [
  {
    id: 'readiness',
    question: 'How ready are you to leave?',
    sub: 'Be honest — this affects your Freedom Score significantly.',
    options: [
      { value: 'a', label: '🔍 Just exploring', score: 25, budget: null },
      { value: 'b', label: '🤔 Seriously thinking about it', score: 50, budget: null },
      { value: 'c', label: '✈️ Ready, just need a plan', score: 75, budget: null },
      { value: 'd', label: '📦 Already packed mentally', score: 100, budget: null },
    ],
  },
  {
    id: 'budget',
    question: "What's your monthly budget abroad?",
    sub: 'Your take-home after taxes, or what you can comfortably spend monthly.',
    options: [
      { value: 'a', label: '💵 Under $800/mo', score: 40, budget: 800 },
      { value: 'b', label: '💵 $800–$1,500/mo', score: 65, budget: 1200 },
      { value: 'c', label: '💵 $1,500–$3,000/mo', score: 85, budget: 2250 },
      { value: 'd', label: '💵 $3,000+/mo', score: 100, budget: 3500 },
    ],
  },
  {
    id: 'barrier',
    question: "What's your biggest barrier right now?",
    sub: 'The biggest thing standing between you and the move.',
    options: [
      { value: 'a', label: '💰 Money / saving enough', score: 55, budget: null },
      { value: 'b', label: '📋 Visa / legal uncertainty', score: 60, budget: null },
      { value: 'c', label: '😨 Fear / uncertainty', score: 70, budget: null },
      { value: 'd', label: '✅ Nothing — just need direction', score: 90, budget: null },
    ],
  },
]

const visaDifficulty = (budget: number) => {
  if (budget <= 800) return { label: 'Medium', color: 'text-gold-400', desc: 'Digital nomad & tourist visas. Some countries harder.' }
  if (budget <= 1500) return { label: 'Easy', color: 'text-jade-400', desc: 'Most digital nomad & D7-style visas accessible.' }
  return { label: 'Very Easy', color: 'text-jade-400', desc: 'Golden visas & investor residency accessible.' }
}

const getScoreLabel = (score: number) => {
  if (score < 40) return { label: 'Warming Up', emoji: '🌱', desc: 'You\'re in research mode. That\'s step one.' }
  if (score < 55) return { label: 'Awakening', emoji: '👁', desc: 'The pull is real. Now build the plan.' }
  if (score < 70) return { label: 'Ready to Move', emoji: '🚀', desc: 'You have what it takes. Start the process.' }
  if (score < 85) return { label: 'Freedom Seeker', emoji: '🦅', desc: 'You\'re close. Remove the final blockers.' }
  return { label: 'Free Agent', emoji: '⚡', desc: 'Nothing is stopping you. Make the move.' }
}

const getTopCountries = (budget: number, readinessScore: number) => {
  if (budget <= 800) return ['🇬🇪 Georgia', '🇻🇳 Vietnam', '🇧🇦 Bosnia']
  if (budget <= 1200) return ['🇨🇴 Colombia', '🇹🇭 Thailand', '🇲🇽 Mexico']
  if (budget <= 2000) return ['🇵🇹 Portugal', '🇪🇸 Spain', '🇨🇷 Costa Rica']
  return ['🇵🇹 Portugal Golden Visa', '🇬🇷 Greece Golden Visa', '🇲🇹 Malta']
}

export default function ScorePage() {
  const [step, setStep] = useState<Step>(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentQuestion = step < 3 ? questions[step] : null

  const selectOption = (value: string) => {
    setSelectedOption(value)
  }

  const advance = () => {
    if (!selectedOption) return
    const newAnswers = { ...answers, [questions[step as 0 | 1 | 2].id]: selectedOption }
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (step === 2) {
      // Calculate score
      const scores = [0, 1, 2].map((i) => {
        const q = questions[i]
        const ans = i === 2 ? selectedOption : (i === 0 ? newAnswers.readiness : newAnswers.budget)
        const opt = q.options.find((o) => o.value === ans)
        return opt?.score || 0
      })
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / 3)
      setFinalScore(avg)
      setStep(3)
    } else {
      setStep((s) => (s + 1) as Step)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setSelectedOption(null)
    setFinalScore(null)
  }

  const copyShare = () => {
    if (!finalScore) return
    const label = getScoreLabel(finalScore)
    const text = `My ExitPlan AI Escape Score: ${finalScore}/100 — ${label.label} ${label.emoji}\n\nCheck yours at exitplan.ai/score`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Get budget from answers
  const budgetAnswer = answers.budget
  const budgetOpt = budgetAnswer ? questions[1].options.find((o) => o.value === budgetAnswer) : null
  const budget = budgetOpt?.budget || 1200

  const visaInfo = visaDifficulty(budget)
  const scoreLabel = finalScore ? getScoreLabel(finalScore) : null
  const topCountries = finalScore ? getTopCountries(budget, finalScore) : []

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-gold-500/[0.05] top-[-100px] right-[-100px]" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-jade-500/[0.04] bottom-[-50px] left-[-50px]" />
        <div className="blob blob-3 w-[400px] h-[400px] bg-gold-400/[0.03] top-1/3 left-1/3" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
            <span className="text-white/50 text-sm font-mono">3 questions · 30 seconds</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Your <span className="gradient-text">Escape Score</span>
          </h1>
          <p className="text-white/45 text-base leading-relaxed">
            Find out your Freedom Score, monthly budget tier, and visa difficulty — in 30 seconds.
          </p>
        </div>

        {/* Quiz flow */}
        {step < 3 && currentQuestion && (
          <div className="flex-1">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i < step ? 'bg-jade-500' : i === step ? 'bg-gold-400' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            <div className="glass rounded-3xl p-8 md:p-10">
              <div className="text-white/25 text-sm font-mono mb-3">{step + 1} of 3</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{currentQuestion.question}</h2>
              <p className="text-white/40 text-sm mb-8">{currentQuestion.sub}</p>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 font-medium text-base ${
                      selectedOption === opt.value
                        ? 'border-gold-400 bg-gold-400/10 text-white'
                        : 'border-white/8 bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <button
                onClick={advance}
                disabled={!selectedOption}
                className={`btn-capsule w-full py-4 text-base font-semibold justify-center gap-2 transition-all ${
                  !selectedOption ? 'opacity-30 cursor-not-allowed' : ''
                }`}
              >
                {step === 2 ? 'Calculate My Score' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 3 && finalScore !== null && scoreLabel && (
          <div className="flex-1">
            {/* Score card */}
            <div ref={cardRef} className="glass-gold rounded-3xl p-8 md:p-10 glow-gold mb-6 text-center">
              {/* Score ring */}
              <div className="flex justify-center mb-6">
                <div
                  className="score-ring w-36 h-36 flex items-center justify-center"
                  style={{ '--score': `${finalScore}%` } as React.CSSProperties}
                >
                  <div className="w-[120px] h-[120px] rounded-full bg-obsidian flex flex-col items-center justify-center">
                    <div className="font-display text-4xl font-bold gradient-text-gold">{finalScore}</div>
                    <div className="text-white/30 text-xs font-mono">/100</div>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="text-4xl mb-2">{scoreLabel.emoji}</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{scoreLabel.label}</h2>
              <p className="text-white/60 mb-8">{scoreLabel.desc}</p>

              {/* 3 stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass rounded-2xl p-4">
                  <div className="text-white/25 text-[10px] font-mono mb-1.5">FREEDOM SCORE</div>
                  <div className="font-display text-2xl font-bold gradient-text-gold">{finalScore}</div>
                  <div className="text-white/30 text-xs">out of 100</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-white/25 text-[10px] font-mono mb-1.5">MONTHLY BUDGET</div>
                  <div className="font-display text-xl font-bold text-jade-400">${budget.toLocaleString()}</div>
                  <div className="text-white/30 text-xs">comfortable</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-white/25 text-[10px] font-mono mb-1.5">VISA DIFFICULTY</div>
                  <div className={`font-display text-xl font-bold ${visaInfo.color}`}>{visaInfo.label}</div>
                  <div className="text-white/30 text-xs">for you</div>
                </div>
              </div>

              {/* Top countries */}
              <div className="glass rounded-2xl p-4 mb-6 text-left">
                <div className="text-white/25 text-xs font-mono mb-3">YOUR TOP MATCHES</div>
                <div className="flex flex-wrap gap-2">
                  {topCountries.map((c) => (
                    <span key={c} className="glass-gold px-3 py-1.5 rounded-full text-sm text-gold-300 font-medium">{c}</span>
                  ))}
                </div>
              </div>

              {/* Visa note */}
              <p className="text-white/30 text-xs leading-relaxed">{visaInfo.desc}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="/quiz"
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold w-full"
              >
                Get My Full Relocation Plan
                <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={copyShare}
                  className="btn-capsule px-5 py-3 text-sm font-semibold gap-2 justify-center"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-jade-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Share Score
                    </>
                  )}
                </button>

                <button
                  onClick={reset}
                  className="btn-capsule-jade px-5 py-3 text-sm font-semibold gap-2 justify-center"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retake
                </button>
              </div>
            </div>

            {/* Explore links */}
            <div className="mt-8 glass rounded-2xl p-5">
              <div className="text-white/25 text-xs font-mono mb-4">EXPLORE NEXT</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: '/escape/cheapest', label: 'Cheapest Countries' },
                  { href: '/escape/teach-english', label: 'Teach English' },
                  { href: '/escape/work-abroad', label: 'Work Abroad' },
                  { href: '/escape/seasonal', label: 'Seasonal Living' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="glass px-3 py-2.5 rounded-xl text-xs text-white/50 hover:text-gold-400 hover:border-gold-400/20 transition-colors border border-transparent"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
