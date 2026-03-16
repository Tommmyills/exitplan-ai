'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Globe, Zap, Shield, TrendingUp, MapPin, Star, Check } from 'lucide-react'

// --- Animated counter hook ---
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

// --- Scroll reveal component ---
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// --- Counter stat ---
function StatCounter({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(target, 2000, start)
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div className="font-display text-3xl font-bold gradient-text-gold mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/40 text-sm">{label}</div>
    </div>
  )
}

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Matching',
    desc: 'Claude AI analyzes your lifestyle, budget, and goals to surface the perfect countries for you.',
  },
  {
    icon: Globe,
    title: 'Visa Intelligence',
    desc: 'Every visa pathway available to Americans — sorted by ease, cost, and timeline.',
  },
  {
    icon: Shield,
    title: 'Safety & Healthcare',
    desc: 'Real expat data on safety ratings, healthcare quality, and cost of living.',
  },
  {
    icon: TrendingUp,
    title: '90-Day Relocation Plan',
    desc: 'Step-by-step action plan from deciding to landing — nothing left to figure out.',
  },
]

const testimonials = [
  {
    name: 'Jake M.',
    location: 'Now in Medellín, Colombia',
    text: 'I wasted 3 months researching on Reddit. ExitPlan AI gave me my answer in 90 seconds. I moved 4 months later.',
    rating: 5,
    savings: 'Saves $1,800/mo vs Austin',
  },
  {
    name: 'Sarah K.',
    location: 'Now in Lisbon, Portugal',
    text: 'The visa breakdown alone was worth it. D7 visa approved, living my best life in Cascais.',
    rating: 5,
    savings: 'Saves $2,400/mo vs NYC',
  },
  {
    name: 'Marcus T.',
    location: 'Now in Chiang Mai, Thailand',
    text: 'Remote worker with $2,500/month. This app told me exactly where to go. Living like royalty in Thailand.',
    rating: 5,
    savings: 'Saves $3,200/mo vs LA',
  },
]

const escapeModules = [
  { href: '/escape/cheapest', emoji: '🌍', title: 'Cheapest Countries', desc: 'Live on $800–$2k/mo' },
  { href: '/escape/teach-english', emoji: '📚', title: 'Teach English', desc: 'Earn $10–$60/hr abroad' },
  { href: '/escape/work-abroad', emoji: '💼', title: 'Work Abroad', desc: 'Federal, UN, remote jobs' },
  { href: '/escape/property', emoji: '🏠', title: 'Property & Residency', desc: 'EU Golden Visas' },
  { href: '/escape/seasonal', emoji: '🌤', title: 'Seasonal Living', desc: 'AI rotation planner' },
  { href: '/escape/local-knowledge', emoji: '🗺', title: 'Local Knowledge', desc: 'Hidden gems & hubs' },
]

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Liquid morphism background */}
      <div className="fixed inset-0 bg-obsidian">
        <div className="blob w-[700px] h-[700px] bg-gold-500/[0.05] top-[-200px] left-[10%]" />
        <div className="blob blob-2 w-[600px] h-[600px] bg-jade-500/[0.04] bottom-[5%] right-[5%]" />
        <div className="blob blob-3 w-[400px] h-[400px] bg-gold-400/[0.03] top-[40%] left-[-5%]" />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-10 pb-24 px-6 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-up">
          <div className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
          <span className="text-white/60 text-sm font-mono">AI-powered relocation intelligence</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up stagger-1">
          Find the Best Country<br />
          to Move to in{' '}
          <span className="gradient-text">60 Seconds</span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-2">
          Answer 7 questions. Get AI-matched to your ideal country abroad — with visa options, cost breakdowns, and a 90-day relocation plan built for Americans.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up stagger-3">
          <Link
            href="/quiz"
            className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl"
          >
            Start the Relocation Quiz
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/score"
            className="btn-capsule px-8 py-4 text-base font-semibold inline-flex items-center gap-2"
          >
            Get My Escape Score
          </Link>
        </div>

        {/* Floating country pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-20 animate-fade-up stagger-4">
          {['🇵🇹 Portugal', '🇪🇸 Spain', '🇲🇽 Mexico', '🇹🇭 Thailand', '🇨🇷 Costa Rica', '🇩🇪 Germany', '🇬🇪 Georgia', '🇨🇴 Colombia'].map((c) => (
            <span key={c} className="glass px-3 py-1.5 rounded-full text-sm text-white/60">
              {c}
            </span>
          ))}
        </div>

        {/* Animated stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up stagger-5">
          <StatCounter target={50000} suffix="+" label="Americans relocated" start={statsVisible} />
          <StatCounter target={180} suffix="+" label="Countries analyzed" start={statsVisible} />
          <StatCounter target={60} suffix=" sec" label="To your plan" start={statsVisible} />
          <StatCounter target={98} suffix="%" label="Match accuracy" start={statsVisible} />
        </div>
      </section>

      {/* Escape Plan modules */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="text-jade-400 font-mono text-sm tracking-widest uppercase">Complete Toolkit</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Your Complete <span className="gradient-text">Escape Plan</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">Six modules covering every angle of the move — from cheapest countries to golden visas.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {escapeModules.map((mod, i) => (
            <Reveal key={mod.href} delay={i * 0.07}>
              <Link href={mod.href} className="module-card rounded-2xl p-5 flex items-center gap-4 group">
                <div className="text-2xl shrink-0">{mod.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white/80 group-hover:text-gold-300 transition-colors">{mod.title}</div>
                  <div className="text-white/35 text-xs">{mod.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-gold-400 transition-colors shrink-0" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <Link href="/escape" className="btn-capsule px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
            Explore All Modules →
          </Link>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-jade-400 font-mono text-sm tracking-widest uppercase">Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            3 Steps to Your <span className="gradient-text">New Life Abroad</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Take the Quiz', desc: 'Tell us your budget, lifestyle, climate preference, and what matters most. 7 questions, under 60 seconds.', icon: '🎯' },
            { step: '02', title: 'AI Analyzes', desc: 'Claude AI cross-references your answers with real visa laws, cost of living data, and expat reports.', icon: '🧠' },
            { step: '03', title: 'Get Your Plan', desc: 'Receive your top 3 countries with visa paths, cost breakdowns, and a personalized 90-day relocation plan.', icon: '✈️' },
          ].map((step, i) => (
            <Reveal key={step.step} delay={i * 0.15}>
              <div className="glass rounded-3xl p-8 relative h-full">
                <div className="font-mono text-white/[0.07] text-7xl font-bold absolute top-6 right-6">{step.step}</div>
                <div className="text-4xl mb-5">{step.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-gold-400 font-mono text-sm tracking-widest uppercase">Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Everything You Need to <span className="gradient-text">Make the Move</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="glass rounded-3xl p-8 flex gap-6 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gold-400/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section id="countries" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-jade-400 font-mono text-sm tracking-widest uppercase">Destinations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Curated for <span className="gradient-text">Americans</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">Every country researched for American-specific visa pathways, English accessibility, and expat community strength.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { flag: '🇵🇹', name: 'Portugal', tag: 'Best for remote workers', score: 96, cost: '$1,800–$3,500/mo' },
            { flag: '🇨🇴', name: 'Colombia', tag: 'Best value + culture', score: 91, cost: '$900–$1,800/mo' },
            { flag: '🇹🇭', name: 'Thailand', tag: 'Ultra affordable', score: 93, cost: '$850–$1,800/mo' },
            { flag: '🇪🇸', name: 'Spain', tag: 'Mediterranean lifestyle', score: 89, cost: '$2,000–$4,000/mo' },
            { flag: '🇬🇪', name: 'Georgia', tag: 'Tax-free haven', score: 94, cost: '$650–$1,200/mo' },
            { flag: '🇲🇽', name: 'Mexico', tag: 'Closest & easiest', score: 88, cost: '$900–$2,000/mo' },
            { flag: '🇨🇷', name: 'Costa Rica', tag: 'Pura Vida lifestyle', score: 87, cost: '$1,500–$3,200/mo' },
            { flag: '🇩🇪', name: 'Germany', tag: 'Stability & opportunity', score: 85, cost: '$2,500–$5,000/mo' },
          ].map((c, i) => (
            <Reveal key={c.name} delay={i * 0.07}>
              <div className="country-card rounded-2xl p-5 h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{c.flag}</span>
                  <span className="font-mono text-xs text-jade-400 glass px-2 py-1 rounded-full">{c.score}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{c.name}</h3>
                <p className="text-white/40 text-sm mb-2">{c.tag}</p>
                <p className="text-white/25 text-xs font-mono">{c.cost}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-8">
          <Link href="/escape/cheapest" className="btn-capsule-jade px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
            See All Countries →
          </Link>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* Social proof */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Real Americans, <span className="gradient-text">Real Moves</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.15}>
              <div className="glass rounded-3xl p-7 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-5 italic flex-1">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {t.location}
                  </div>
                  <div className="mt-2 text-jade-400 text-xs font-semibold">{t.savings}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Escape Score CTA */}
      <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="text-jade-400 font-mono text-sm mb-3">30-SECOND QUIZ</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                What's Your <span className="gradient-text">Freedom Score?</span>
              </h2>
              <p className="text-white/50 leading-relaxed">3 questions to reveal your escape readiness, ideal budget tier, and visa difficulty level.</p>
            </div>
            <div className="shrink-0">
              <Link href="/score" className="btn-capsule px-8 py-4 text-base font-semibold inline-flex items-center gap-2">
                Calculate My Score
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 px-6 max-w-3xl mx-auto text-center">
        <Reveal>
          <div className="glass-gold rounded-3xl p-12 glow-gold">
            <div className="text-5xl mb-6">✈️</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text-gold">Exit?</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">
              60 seconds is all it takes to discover where you're meant to live.
            </p>
            <Link
              href="/quiz"
              className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-lg font-bold"
            >
              Start the Relocation Quiz
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/25 text-sm mt-4">Free · No account needed · 60 seconds</p>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {['✓ No email required', '✓ AI-powered by Claude', '✓ 50,000+ users'].map((t) => (
                <span key={t} className="text-white/30 text-xs">{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-gold-400 to-jade-500 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-obsidian" />
            </div>
            <span className="font-display font-bold">ExitPlan AI</span>
          </div>
          <div className="flex items-center gap-6 text-white/25 text-sm">
            <Link href="/escape" className="hover:text-white/50 transition-colors">Escape Plan</Link>
            <Link href="/score" className="hover:text-white/50 transition-colors">Escape Score</Link>
            <Link href="/quiz" className="hover:text-white/50 transition-colors">AI Quiz</Link>
          </div>
          <p className="text-white/20 text-xs text-center md:text-right">© 2025 ExitPlan AI · Not legal advice · Consult an immigration attorney</p>
        </div>
      </footer>
    </main>
  )
}
