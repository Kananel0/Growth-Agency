'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const cats = ['All','Web Design','Paid Media','SEO','Brand']

const projects = [
  { id:'01', title:'Techwave Rebrand',     cat:'Brand',      year:'2024', tags:['Identity','Motion','Web'],             metric:'+280% brand searches', desc:'Complete brand overhaul and web rebuild for a B2B SaaS company. New positioning drove 280% increase in branded search volume.' },
  { id:'02', title:'Luminary ROAS Engine', cat:'Paid Media',  year:'2024', tags:['Google Ads','Meta','CRO'],             metric:'4.8× ROAS achieved',   desc:'Full paid media restructure for a DTC beauty brand. Achieved 4.8× blended ROAS across Google Shopping and Meta within 90 days.' },
  { id:'03', title:'Orbita SEO Domination',cat:'SEO',         year:'2024', tags:['Content','Technical','Link Building'], metric:'#1 for 340 keywords',   desc:'12-month SEO campaign for a fintech startup. Reached position 1 for 340 commercial keywords and 3× organic revenue.' },
  { id:'04', title:'Nexflow Web App',      cat:'Web Design',  year:'2023', tags:['Next.js','Three.js','GSAP'],           metric:'+62% trial signups',    desc:'Conversion-focused SaaS website with immersive 3D hero. A/B tested checkout flow increased trial signups by 62%.' },
  { id:'05', title:'Stealth Launch',       cat:'Brand',       year:'2023', tags:['Strategy','Launch','PR'],              metric:'$2.1M raised in 48hrs', desc:'Go-to-market strategy and digital launch for a Web3 platform. Campaign generated $2.1M in seed funding within 48 hours.' },
  { id:'06', title:'Crest Clinic CRO',     cat:'Web Design',  year:'2023', tags:['CRO','UX','Analytics'],               metric:'+91% lead volume',      desc:'UX audit and CRO sprint for a healthcare brand. Redesigned booking flow and landing pages drove 91% more qualified leads.' },
]

const awards = [
  { y:'2024', a:'Awwwards Site of the Day', p:'Nexflow Web App' },
  { y:'2024', a:'Webby Award — Best Agency', p:'Growth Agency' },
  { y:'2023', a:'CSS Design Awards', p:'Stealth Launch' },
  { y:'2023', a:'Clutch Global Top 100', p:'Growth Agency' },
]

const caseStats = [
  { n:'60+', l:'Projects' }, { n:'$12M+', l:'Revenue Generated' }, { n:'340%', l:'Avg. ROAS Lift' }, { n:'98%', l:'Retained Clients' }
]

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [hovered, setHovered] = useState<string|null>(null)
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter)

  useEffect(() => {
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo('.port-title span', { yPercent:110 }, {
        yPercent:0, stagger:0.07, duration:1.1, ease:'power4.out',
        scrollTrigger:{ trigger:'.port-title', start:'top 85%' }
      })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.to(el, { opacity:1, y:0, duration:0.9, ease:'power3.out',
          scrollTrigger:{ trigger:el, start:'top 88%' } })
      })
      document.querySelectorAll('[data-stagger]').forEach(parent => {
        gsap.fromTo(parent.querySelectorAll('.s-item'),
          { opacity:0, y:50 }, { opacity:1, y:0, stagger:0.1, duration:0.7, ease:'power3.out',
            scrollTrigger:{ trigger:parent, start:'top 82%' } })
      })
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const { gsap } = await import('gsap')
      gsap.fromTo('.proj-card', { opacity:0, y:30 }, { opacity:1, y:0, stagger:0.08, duration:0.6, ease:'power3.out' })
    })()
  }, [filter])

  return (
    <div className="min-h-screen pt-32 pb-0">
      {/* Header */}
      <div className="px-8 lg:px-16 mb-20">
        <p className="font-mono text-xs text-lime uppercase tracking-widest mb-4">Case Studies</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h1 className="port-title font-display font-extrabold text-[clamp(3rem,8vw,8rem)] leading-[0.88] tracking-tight overflow-hidden">
            {['Our','Work'].map((w,i) => (
              <span key={i} className="block overflow-hidden">
                <span className="inline-block">{i===1 ? <><span className="text-lime">{w[0]}</span>{w.slice(1)}</> : w}</span>
              </span>
            ))}
          </h1>
          <p className="font-mono text-mute text-sm max-w-xs leading-relaxed lg:text-right">
            Real campaigns. Real results. Every project listed includes verified performance data.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-y border-white/10 grid grid-cols-2 lg:grid-cols-4" data-stagger>
        {caseStats.map(s => (
          <div key={s.l} className="s-item px-8 lg:px-16 py-8 border-r border-white/10 last:border-r-0">
            <div className="font-display font-extrabold text-4xl text-lime">{s.n}</div>
            <div className="font-mono text-xs text-mute mt-1 uppercase tracking-wider">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="px-8 lg:px-16 py-8 flex gap-3 flex-wrap border-b border-white/10">
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} data-hover
            className={`font-mono text-xs px-4 py-2 border transition-all duration-200
              ${filter===c ? 'border-lime text-lime bg-lime/10' : 'border-mute/30 text-mute hover:border-mute hover:text-ash'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Project list */}
      <div className="px-8 lg:px-16 divide-y divide-white/10">
        {filtered.map((p) => (
          <div key={p.id} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}
            className={`proj-card group py-10 lg:py-12 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center
              cursor-pointer transition-all duration-400 ${hovered===p.id ? 'pl-4' : ''}`}>
            <span className="font-mono text-xs text-mute w-8 shrink-0 pt-2">{p.id}</span>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tags.map(t => (
                  <span key={t} className="font-mono text-xs text-mute border border-mute/20 px-2 py-0.5">{t}</span>
                ))}
              </div>
              <h2 className={`font-display font-bold text-3xl lg:text-5xl transition-colors duration-300 ${hovered===p.id ? 'text-lime' : 'text-ash'}`}>
                {p.title}
              </h2>
              <p className="font-mono text-sm text-mute mt-2 max-w-xl leading-relaxed">{p.desc}</p>
            </div>
            <div className="shrink-0 lg:text-right">
              <div className={`font-display font-bold text-lg transition-colors duration-300 ${hovered===p.id ? 'text-lime' : 'text-ash'}`}>{p.metric}</div>
              <div className="font-mono text-xs text-mute mt-1">{p.cat} · {p.year}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Awards */}
      <section className="px-8 lg:px-16 py-28 border-t border-white/10" data-stagger>
        <p className="s-item font-mono text-xs text-lime uppercase tracking-widest mb-4">Recognition</p>
        <h2 className="s-item font-display font-extrabold text-[clamp(2rem,5vw,4rem)] leading-tight mb-12">
          Industry <span className="text-lime">Awards</span>
        </h2>
        <div className="divide-y divide-white/10">
          {awards.map((a,i) => (
            <div key={i} className="s-item flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 gap-2">
              <span className="font-mono text-xs text-mute w-12">{a.y}</span>
              <span className="font-display font-bold text-xl text-ash flex-1 sm:px-8">{a.a}</span>
              <span className="font-mono text-sm text-mute">{a.p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial pullquote */}
      <section className="px-8 lg:px-16 py-24 border-t border-white/10 text-center reveal">
        <div className="max-w-3xl mx-auto">
          <p className="font-display font-bold text-2xl lg:text-4xl text-ash leading-snug mb-8">
            "Growth Agency is the only agency we've worked with that <span className="text-lime">actually understands the full funnel</span> — from first click to repeat customer."
          </p>
          <div className="font-mono text-sm text-mute">— Alex Tran, VP Growth · Nexflow</div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 lg:px-16 py-24 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="reveal">
          <h3 className="font-display font-extrabold text-4xl lg:text-5xl mb-3">Ready to be next?</h3>
          <p className="font-mono text-mute text-sm">Let's discuss your growth goals over a free strategy call.</p>
        </div>
        <Link href="/contact" data-hover className="reveal shrink-0 bg-lime text-ink font-display font-bold px-10 py-5 text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-200">
          Start a Project →
        </Link>
      </section>
    </div>
  )
}
