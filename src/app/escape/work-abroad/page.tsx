'use client'

import Link from 'next/link'
import { ArrowLeft, Briefcase, ExternalLink, Globe, Building, Shield, Cpu, Leaf } from 'lucide-react'

const jobBoards = [
  {
    name: 'USAJobs Overseas',
    url: 'usajobs.gov',
    type: 'Federal Government',
    icon: Shield,
    emoji: '🦅',
    desc: 'Official US federal job board with overseas postings across embassies, military bases, USAID, State Dept, and 400+ agencies.',
    salaryRange: '$50,000–$180,000/yr',
    locations: 'Worldwide — 180+ countries',
    benefits: ['Federal benefits package', 'COLA adjustments', 'Housing allowance', 'Security clearance roles'],
    tip: 'Filter by "Overseas" and "Duty Station Outside US". Many roles require clearance but civilian roles exist.',
    color: 'gold',
    difficulty: 'Medium',
  },
  {
    name: 'UN Jobs',
    url: 'careers.un.org',
    type: 'International Organization',
    icon: Globe,
    emoji: '🌐',
    desc: 'United Nations and all UN agencies: UNICEF, WHO, WFP, UNHCR. Roles in development, humanitarian, admin, and technical fields.',
    salaryRange: '$60,000–$220,000/yr',
    locations: 'Worldwide with mission areas',
    benefits: ['Tax-free salary', 'Pension scheme', 'Travel stipend', 'Education grant for kids'],
    tip: 'Start as UNV (UN Volunteer) to build profile. G-series roles don\'t require language tests.',
    color: 'jade',
    difficulty: 'Hard',
  },
  {
    name: 'NATO Careers',
    url: 'nato.int/cps/en/natolive/71176.htm',
    type: 'Defense Alliance',
    icon: Shield,
    emoji: '⚔️',
    desc: 'Civilian roles at NATO HQ Brussels, SHAPE Mons, and 30+ facilities across Europe and beyond in policy, IT, communications, and operations.',
    salaryRange: '$65,000–$175,000/yr',
    locations: 'Belgium, Germany, UK, Netherlands, Turkey + more',
    benefits: ['NATO pension', 'Tax-free status', 'Housing allowance', 'Education subsidies'],
    tip: 'NATO requires citizenship from member state. US citizens fully eligible. Secret clearance a plus.',
    color: 'gold',
    difficulty: 'Hard',
  },
  {
    name: 'Remote.co',
    url: 'remote.co/remote-jobs',
    type: 'Remote Work Board',
    icon: Cpu,
    emoji: '💻',
    desc: 'Top-quality remote job board with vetted listings. Focus on established companies with remote-first culture, not gig work.',
    salaryRange: '$40,000–$200,000/yr',
    locations: 'Anywhere with internet',
    benefits: ['Work from any country', 'US salary abroad', 'Async culture', 'Digital nomad lifestyle'],
    tip: 'Best for tech, marketing, customer success. Companies marked "Remote Friendly" are global hire.',
    color: 'jade',
    difficulty: 'Medium',
  },
  {
    name: 'We Work Remotely',
    url: 'weworkremotely.com',
    type: 'Remote Work Board',
    icon: Cpu,
    emoji: '🌍',
    desc: 'Largest remote job community. Heavy on programming, design, marketing, and support roles from companies already distributed globally.',
    salaryRange: '$35,000–$180,000/yr',
    locations: 'Anywhere — truly global',
    benefits: ['Huge volume of listings', 'Developer-heavy', 'Async companies', 'Visa-friendly employers'],
    tip: 'Apply with your timezone shown as flexible. Many companies prefer candidates already abroad.',
    color: 'jade',
    difficulty: 'Medium',
  },
  {
    name: 'Seasonal Work Abroad',
    url: 'seasonalwork.net',
    type: 'Seasonal & Temporary',
    icon: Leaf,
    emoji: '🌱',
    desc: 'Harvest jobs, resort work, yacht crew, ski patrol, farm stays, dive instructors. Get paid to live in incredible places for 3–6 months.',
    salaryRange: '$800–$4,000/mo + housing',
    locations: 'New Zealand, Australia, Norway, Mediterranean yachts, Swiss Alps',
    benefits: ['Free housing often included', 'Experience & skills', 'Working visa pathways', 'Incredible social life'],
    tip: 'Australia Working Holiday Visa (age 18–35) is the king of this category. One year, extendable to 3.',
    color: 'gold',
    difficulty: 'Easy',
  },
]

const contractorTypes = [
  {
    title: 'Military Contractor',
    companies: 'SAIC, Booz Allen, CACI, Leidos, DynCorp',
    salary: '$80k–$200k+',
    locations: 'OCONUS — Germany, Japan, Korea, Middle East',
    req: 'Secret+ clearance, relevant field',
    emoji: '🛡',
  },
  {
    title: 'Development Contractor',
    companies: 'Chemonics, Palladium, AECOM, Creative Associates',
    salary: '$60k–$140k',
    locations: 'Africa, MENA, Southeast Asia, Balkans',
    req: 'International dev background, language skills',
    emoji: '🌱',
  },
  {
    title: 'Tech Contractor Abroad',
    companies: 'Toptal, Turing, Andela, Deel, Remote.com',
    salary: '$50k–$250k',
    locations: 'Anywhere — full remote',
    req: 'Strong portfolio, English fluency',
    emoji: '⚡',
  },
  {
    title: 'Oil & Gas / Energy',
    companies: 'Halliburton, Schlumberger, Baker Hughes, Shell',
    salary: '$100k–$300k',
    locations: 'Middle East, North Sea, West Africa, SE Asia',
    req: 'Engineering or trade certification',
    emoji: '⛽',
  },
]

const visaWorkRoutes = [
  { country: '🇩🇪 Germany', visa: 'Opportunity Card', desc: 'Job-seeker visa to find work in Germany', req: 'Degree + German or qualified worker', duration: '1 year to find job' },
  { country: '🇵🇹 Portugal', visa: 'D3 Highly Qualified', desc: 'For tech workers, researchers, managers', req: 'Job offer + qualification', duration: '2 years renewable' },
  { country: '🇸🇬 Singapore', visa: 'Employment Pass', desc: 'Employer-sponsored work visa', req: 'S$4,500+/mo salary offer', duration: '1–2 years renewable' },
  { country: '🇨🇦 Canada', visa: 'Global Talent Stream', desc: 'Fast-track 2-week work permit for tech', req: 'Tech job offer from Canadian company', duration: 'Varies' },
  { country: '🇦🇺 Australia', visa: 'TSS 482', desc: 'Temporary skills shortage sponsorship', req: 'Job offer in shortage occupation', duration: '2–4 years' },
  { country: '🇳🇱 Netherlands', visa: 'Highly Skilled Migrant', desc: 'Employer-sponsored for qualified professionals', req: 'Recognized sponsor + salary threshold', duration: '3 years renewable' },
]

export default function WorkAbroadPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-obsidian pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-gold-500/[0.04] top-0 left-0" />
        <div className="blob blob-2 w-[500px] h-[500px] bg-jade-500/[0.04] bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Link href="/escape" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Escape Plan
        </Link>

        <div className="mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Briefcase className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-white/50 text-sm font-mono">Employment intelligence</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Work Abroad.<br />
            <span className="gradient-text">Keep US Income.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Federal jobs, international orgs, remote boards, contractor gigs, and seasonal work. Every path to getting paid overseas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { val: '4.8M', label: 'Americans working abroad' },
            { val: '280+', label: 'Countries with US federal posts' },
            { val: '$95k', label: 'Avg federal overseas salary' },
            { val: '40%', label: 'Tax savings vs domestic' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text-gold mb-1">{s.val}</div>
              <div className="text-white/35 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Job boards */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Where to <span className="gradient-text">Find the Jobs</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">Top platforms for finding work abroad or fully remote</p>

          <div className="grid md:grid-cols-2 gap-5">
            {jobBoards.map((board, i) => (
              <div
                key={board.name}
                className="glass rounded-3xl p-7 animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{board.emoji}</div>
                    <div>
                      <h3 className="font-display text-lg font-bold">{board.name}</h3>
                      <p className="text-white/30 text-xs font-mono">{board.type}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono glass ${
                      board.difficulty === 'Easy' ? 'text-jade-400' :
                      board.difficulty === 'Medium' ? 'text-gold-400' : 'text-red-400'
                    }`}>
                      {board.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4">{board.desc}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="glass rounded-xl px-3 py-2">
                    <div className="text-white/25 text-[10px] font-mono mb-0.5">SALARY</div>
                    <div className={`text-sm font-bold ${board.color === 'gold' ? 'text-gold-400' : 'text-jade-400'}`}>
                      {board.salaryRange}
                    </div>
                  </div>
                  <div className="glass rounded-xl px-3 py-2">
                    <div className="text-white/25 text-[10px] font-mono mb-0.5">LOCATIONS</div>
                    <div className="text-white/60 text-xs leading-tight">{board.locations}</div>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  {board.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-white/45">
                      <span className={`${board.color === 'gold' ? 'text-gold-400' : 'text-jade-400'}`}>✦</span>
                      {b}
                    </div>
                  ))}
                </div>

                <div className="glass rounded-xl px-4 py-3 border border-white/5">
                  <p className="text-white/35 text-xs leading-relaxed">
                    <span className="text-gold-400 font-semibold">Pro tip: </span>
                    {board.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contractor types */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Contractor <span className="gradient-text">Roles</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">High-paying contract work with overseas deployment</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contractorTypes.map((c, i) => (
              <div key={c.title} className="country-card rounded-2xl p-5 animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="text-2xl mb-3">{c.emoji}</div>
                <h3 className="font-display text-base font-bold mb-1">{c.title}</h3>
                <div className="text-gold-400 font-bold text-sm mb-2">{c.salary}</div>
                <p className="text-white/30 text-xs mb-2">{c.locations}</p>
                <p className="text-white/20 text-xs italic">{c.companies}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work visa routes */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Work Visa <span className="gradient-text">Routes</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">Countries actively recruiting American professionals</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visaWorkRoutes.map((v, i) => (
              <div key={v.country} className="glass rounded-2xl p-5 animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-base font-bold">{v.country}</h3>
                  <span className="glass-gold px-2 py-0.5 rounded-full text-gold-400 text-xs font-mono">{v.duration}</span>
                </div>
                <div className="text-jade-400 text-sm font-semibold mb-2">{v.visa}</div>
                <p className="text-white/50 text-xs leading-relaxed mb-2">{v.desc}</p>
                <p className="text-white/25 text-xs italic">Req: {v.req}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-gold rounded-3xl p-8 text-center glow-gold">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Find Where Your Skills <span className="gradient-text">Thrive Abroad</span>
          </h2>
          <p className="text-white/50 mb-6">Our AI matches your career background to the best overseas opportunities.</p>
          <Link href="/quiz" className="btn-capsule px-8 py-3.5 text-base font-semibold gap-2 inline-flex items-center">
            Start the AI Quiz →
          </Link>
        </div>
      </div>
    </main>
  )
}
