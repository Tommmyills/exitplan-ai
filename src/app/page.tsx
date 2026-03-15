'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Zap, Shield, TrendingUp, MapPin, Star } from 'lucide-react'

const stats = [
  { value: '50K+', label: 'Americans relocated' },
  { value: '180+', label: 'Countries analyzed' },
  { value: '60 sec', label: 'To your plan' },
  { value: '98%', label: 'Match accuracy' },
]

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Matching',
    desc: 'Claude analyzes your lifestyle, budget, and goals to surface the perfect countries for you.',
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
  },
  {
    name: 'Sarah K.',
    location: 'Now in Lisbon, Portugal',
    text: 'The visa breakdown alone was worth it. D7 visa approved, living my best life in Cascais.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    location: 'Now in Chiang Mai, Thailand',
    text: 'Remote worker with $2,500/month. This app told me exactly where to go. Living like royalty in Thailand.',
    rating: 5,
  },
]

const countries = ['🇵🇹 Portugal', '🇪🇸 Spain', '🇲🇽 Mexico', '🇹🇭 Thailand', '🇨🇷 Costa Rica', '🇩🇪 Germany', '🇬🇪 Georgia', '🇨🇴 Colombia']

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-obsidian">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-jade-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gold-400/3 rounded-full blur-[80px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-jade-500 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-obsidian" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">ExitPlan <span className="gradient-text-gold">AI</span></span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-white/50 hover:text-white/80 text-sm transition-colors hidden md:block">How it works</a>
          <a href="#countries" className="text-white/50 hover:text-white/80 text-sm transition-colors hidden md:block">Countries</a>
          <Link href="/quiz" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">
            Start Free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-24 px-6 max-w-7xl mx-auto text-center">
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
          <p className="text-white/30 text-sm">Free · No signup required · 60 seconds</p>
        </div>

        {/* Floating country pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-20 animate-fade-up stagger-4">
          {countries.map((c) => (
            <span key={c} className="glass px-3 py-1.5 rounded-full text-sm text-white/60">
              {c}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up stagger-5">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="font-display text-3xl font-bold gradient-text-gold mb-1">{s.value}</div>
              <div className="text-white/40 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-jade-400 font-mono text-sm tracking-widest uppercase">Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            3 Steps to Your <span className="gradient-text">New Life Abroad</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Take the Quiz',
              desc: 'Tell us your budget, lifestyle, climate preference, and what matters most. 7 questions, under 60 seconds.',
              icon: '🎯',
            },
            {
              step: '02',
              title: 'AI Analyzes',
              desc: 'Our AI cross-references your answers with real visa laws, cost of living data, and expat reports.',
              icon: '🧠',
            },
            {
              step: '03',
              title: 'Get Your Plan',
              desc: 'Receive your top 3 countries with visa paths, cost breakdowns, and a personalized 90-day relocation plan.',
              icon: '✈️',
            },
          ].map((step, i) => (
            <div key={step.step} className={`glass rounded-3xl p-8 relative animate-fade-up`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="font-mono text-white/10 text-7xl font-bold absolute top-6 right-6">{step.step}</div>
              <div className="text-4xl mb-5">{step.icon}</div>
              <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-400 font-mono text-sm tracking-widest uppercase">Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Everything You Need to <span className="gradient-text">Make the Move</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className="glass rounded-3xl p-8 flex gap-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-2xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <f.icon className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section id="countries" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-jade-400 font-mono text-sm tracking-widest uppercase">Destinations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Curated for <span className="gradient-text">Americans</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">Every country is researched for American-specific visa pathways, English accessibility, and expat community strength.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { flag: '🇵🇹', name: 'Portugal', tag: 'Best for remote workers', score: 96 },
            { flag: '🇨🇴', name: 'Colombia', tag: 'Best value + culture', score: 91 },
            { flag: '🇹🇭', name: 'Thailand', tag: 'Ultra affordable', score: 93 },
            { flag: '🇪🇸', name: 'Spain', tag: 'Mediterranean lifestyle', score: 89 },
            { flag: '🇬🇪', name: 'Georgia', tag: 'Tax-free haven', score: 94 },
            { flag: '🇲🇽', name: 'Mexico', tag: 'Closest & easiest', score: 88 },
            { flag: '🇨🇷', name: 'Costa Rica', tag: 'Pura Vida lifestyle', score: 87 },
            { flag: '🇩🇪', name: 'Germany', tag: 'Stability & opportunity', score: 85 },
          ].map((c, i) => (
            <div key={c.name} className="country-card rounded-2xl p-5 animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{c.flag}</span>
                <span className="font-mono text-xs text-jade-400 glass px-2 py-1 rounded-full">{c.score}</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-1">{c.name}</h3>
              <p className="text-white/40 text-sm">{c.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Real Americans, <span className="gradient-text">Real Moves</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="glass rounded-3xl p-7 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-5 italic">"{t.text}"</p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 px-6 max-w-3xl mx-auto text-center">
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
        </div>
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
          <p className="text-white/20 text-sm">© 2025 ExitPlan AI · Not legal or financial advice · Always consult an immigration attorney</p>
        </div>
      </footer>
    </main>
  )
}
