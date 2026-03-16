'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MapPin, Menu, X, ChevronDown } from 'lucide-react'

const escapeLinks = [
  { href: '/escape/cheapest', label: '🌍 Cheapest Countries' },
  { href: '/escape/teach-english', label: '📚 Teach English' },
  { href: '/escape/work-abroad', label: '💼 Work Abroad' },
  { href: '/escape/property', label: '🏠 Property & Residency' },
  { href: '/escape/seasonal', label: '🌤 Seasonal Living' },
  { href: '/escape/local-knowledge', label: '🗺 Local Knowledge' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [escapeOpen, setEscapeOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-jade-500 flex items-center justify-center shadow-[0_0_16px_rgba(240,200,74,0.3)] group-hover:shadow-[0_0_24px_rgba(240,200,74,0.5)] transition-all">
              <MapPin className="w-4 h-4 text-obsidian" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              ExitPlan <span className="gradient-text-gold">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {/* Escape Plan dropdown */}
            <div className="relative" onMouseEnter={() => setEscapeOpen(true)} onMouseLeave={() => setEscapeOpen(false)}>
              <Link
                href="/escape"
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/escape') ? 'text-gold-400' : 'text-white/50 hover:text-white'
                }`}
              >
                Escape Plan
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${escapeOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown */}
              {escapeOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 glass rounded-2xl py-2 shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-white/10">
                  {escapeLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-gold-400 ${
                        pathname === link.href ? 'text-gold-400' : 'text-white/60'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/score"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/score') ? 'text-jade-400' : 'text-white/50 hover:text-white'
              }`}
            >
              Escape Score
            </Link>

            <Link
              href="/quiz"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/quiz') ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              AI Quiz
            </Link>
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/quiz"
              className="hidden md:inline-flex btn-capsule px-5 py-2.5 text-sm font-semibold items-center gap-1.5"
            >
              Get My Plan →
            </Link>
            <button
              className="md:hidden glass w-9 h-9 rounded-xl flex items-center justify-center text-white/70"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/[0.06] py-4 px-6 space-y-1">
            <Link href="/escape" onClick={() => setOpen(false)} className="block py-3 text-white/70 hover:text-gold-400 font-medium transition-colors">
              Escape Plan
            </Link>
            {escapeLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-2.5 pl-4 text-white/50 hover:text-gold-400 text-sm transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/score" onClick={() => setOpen(false)} className="block py-3 text-white/70 hover:text-jade-400 font-medium transition-colors">
              Escape Score
            </Link>
            <Link href="/quiz" onClick={() => setOpen(false)} className="block mt-2 btn-capsule px-5 py-3 text-sm font-semibold text-center">
              Get My Plan →
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-[68px]" />
    </>
  )
}
