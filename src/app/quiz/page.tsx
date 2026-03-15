'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, MapPin, Loader2 } from 'lucide-react'
import { QuizAnswers } from '@/types'
import Link from 'next/link'

const steps = [
  {
    id: 'budget',
    question: "What's your monthly budget for living abroad?",
    subtitle: 'Include rent, food, transport, and fun. Be honest — this shapes everything.',
    type: 'single',
    options: [
      { value: '1000', label: 'Under $1,000', desc: 'Budget explorer' },
      { value: '1500', label: '$1,000 – $1,500', desc: 'Lean & smart' },
      { value: '2500', label: '$1,500 – $2,500', desc: 'Comfortable nomad' },
      { value: '4000', label: '$2,500 – $4,000', desc: 'Solid lifestyle' },
      { value: '5000', label: '$4,000+', desc: 'Live like royalty' },
    ],
  },
  {
    id: 'climate',
    question: 'What climate do you thrive in?',
    subtitle: 'Weather affects mood, productivity, and quality of life more than you think.',
    type: 'single',
    options: [
      { value: 'warm', label: '☀️ Warm & Tropical', desc: 'Beaches, heat, sunshine year-round' },
      { value: 'mild', label: '🌤 Mild & Mediterranean', desc: 'Warm summers, gentle winters' },
      { value: 'cold', label: '❄️ Cool & Northern', desc: "I don't mind cold weather" },
      { value: 'any', label: '🌍 Anything goes', desc: "Climate isn't a dealbreaker" },
    ],
  },
  {
    id: 'remoteWork',
    question: 'How do you earn your income?',
    subtitle: 'This determines which visa types are available to you.',
    type: 'single',
    options: [
      { value: 'yes', label: '💻 100% Remote', desc: 'I work online from anywhere' },
      { value: 'hybrid', label: '🔄 Hybrid / Flexible', desc: 'Mix of remote and occasional travel' },
      { value: 'no', label: '🏢 Local / In-Person', desc: "I'll need to find work locally" },
    ],
  },
  {
    id: 'healthcare',
    question: 'How important is healthcare quality?',
    subtitle: 'Some of the best healthcare in the world is outside the US — and far cheaper.',
    type: 'single',
    options: [
      { value: 'low', label: '🟢 Low priority', desc: "I'm young and healthy, not worried" },
      { value: 'medium', label: '🟡 Medium priority', desc: 'I want decent access but not my #1 concern' },
      { value: 'high', label: '🔴 High priority', desc: 'World-class healthcare is essential for me' },
    ],
  },
  {
    id: 'language',
    question: 'What about language barriers?',
    subtitle: 'Language affects how quickly you integrate and feel at home.',
    type: 'single',
    options: [
      { value: 'english-only', label: '🇺🇸 English only please', desc: "I need to get by in English" },
      { value: 'willing-to-learn', label: '📚 Willing to learn basics', desc: "I'll pick up survival phrases" },
      { value: 'fluent-spanish', label: '🇪🇸 I speak Spanish', desc: 'Opens up tons of options' },
      { value: 'fluent-other', label: '🌍 I speak another language', desc: 'French, German, Portuguese, etc.' },
    ],
  },
  {
    id: 'region',
    question: 'Do you have a preferred region?',
    subtitle: 'Narrow it down or go global — we analyze all options.',
    type: 'single',
    options: [
      { value: 'europe', label: '🇪🇺 Europe', desc: 'Portugal, Spain, Germany, Georgia...' },
      { value: 'latin-america', label: '🌎 Latin America', desc: 'Mexico, Colombia, Costa Rica...' },
      { value: 'asia', label: '🌏 Asia', desc: 'Thailand, Vietnam, Bali...' },
      { value: 'anywhere', label: '🌍 Anywhere on Earth', desc: 'Show me the best overall match' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'What kind of lifestyle are you chasing?',
    subtitle: 'Paint us a picture of your ideal day abroad.',
    type: 'single',
    options: [
      { value: 'beach', label: '🏖 Beach & Coast', desc: 'Ocean, surf, sunset vibes' },
      { value: 'city', label: '🏙 Urban & Cosmopolitan', desc: 'Cafés, culture, nightlife' },
      { value: 'nature', label: '🏔 Nature & Adventure', desc: 'Mountains, hiking, off the beaten path' },
      { value: 'culture', label: '🎭 Culture & History', desc: 'Museums, architecture, deep roots' },
      { value: 'any', label: '✨ Surprise me', desc: 'Show me what the AI picks' },
    ],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const step = steps[currentStep]
  const progress = ((currentStep) / steps.length) * 100
  const currentAnswer = answers[step.id as keyof QuizAnswers]

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [step.id]: value }))
  }

  const handleNext = () => {
    if (!currentAnswer) return
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })

      if (!res.ok) throw new Error('Failed to get recommendations')

      const data = await res.json()
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      sessionStorage.setItem('exitplan_results', JSON.stringify({
        recommendations: data.recommendations,
        answers,
        sessionId,
      }))

      router.push(`/results?session=${sessionId}`)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-2 border-gold-400/20 animate-pulse" />
            <div className="absolute inset-2 rounded-full border-2 border-gold-400/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="absolute inset-4 rounded-full bg-gold-400/10 flex items-center justify-center">
              <span className="text-3xl animate-float">🌍</span>
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold mb-3">
            Analyzing Your <span className="gradient-text">Perfect Match</span>
          </h2>
          <p className="text-white/40 mb-8">Our AI is cross-referencing 180+ countries, visa pathways, cost of living data, and expat reports...</p>
          <div className="glass rounded-2xl p-4 text-left space-y-2">
            {['Matching climate preferences...', 'Calculating visa eligibility...', 'Scoring cost of living fit...', 'Building your 90-day plan...'].map((item, i) => (
              <div key={item} className="flex items-center gap-3 text-white/50 text-sm" style={{ animationDelay: `${i * 0.3}s` }}>
                <Loader2 className="w-3 h-3 text-jade-400 animate-spin" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-jade-500/4 rounded-full blur-[80px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-4xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-jade-500 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-obsidian" />
          </div>
          <span className="font-display text-lg font-bold">ExitPlan <span className="gradient-text-gold">AI</span></span>
        </Link>
        <div className="text-white/30 text-sm font-mono">
          {currentStep + 1} / {steps.length}
        </div>
      </nav>

      {/* Progress */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto w-full mb-12">
        <div className="w-full h-1 bg-white/5 rounded-full">
          <div
            className="progress-bar h-1 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Quiz content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 max-w-4xl mx-auto w-full">
        <div className="w-full max-w-2xl animate-fade-up">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {step.question}
          </h1>
          <p className="text-white/40 text-base mb-8 leading-relaxed">{step.subtitle}</p>

          <div className="space-y-3">
            {step.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`quiz-option w-full glass rounded-2xl p-5 text-left flex items-center justify-between border ${
                  currentAnswer === opt.value
                    ? 'selected'
                    : 'border-white/5'
                }`}
              >
                <div>
                  <div className="font-semibold text-base mb-0.5">{opt.label}</div>
                  <div className="text-white/40 text-sm">{opt.desc}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 ml-4 transition-all ${
                  currentAnswer === opt.value
                    ? 'border-gold-400 bg-gold-400'
                    : 'border-white/20'
                }`}>
                  {currentAnswer === opt.value && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-obsidian rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 mb-12">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {currentStep === steps.length - 1 ? 'Get My Plan' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
