'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const cats = ['All','Web Design','Paid Media','SEO','Brand']

const projects = [
  { id:'01', title:'Techwave Rebrand',      cat:'Brand',     year:'2024', tags:['Identity','Motion','Web'],             metric:'+280% brand searches', desc:'Complete brand overhaul and web rebuild for a B2B SaaS company. New positioning drove 280% increase in branded search volume.' },
  { id:'02', title:'Luminary ROAS Engine',  cat:'Paid Media', year:'2024', tags:['Google Ads','Meta','CRO'],            metric:'4.8× ROAS achieved',   desc:'Full paid media restructure for a DTC beauty brand. Achieved 4.8× blended ROAS across Google Shopping and Meta within 90 days.' },
  { id:'03', title:'Orbita SEO Domination', cat:'SEO',        year:'2024', tags:['Content','Technical','Link Building'],metric:'#1 for 340 keywords',  desc:'12-month SEO campaign for a fintech startup. Reached position 1 for 340 commercial keywords and 3× organic revenue.' },
  { id:'04', title:'Nexflow Web App',       cat:'Web Design', year:'2023', tags:['Next.js','Three.js','GSAP'],          metric:'+62% trial signups',   desc:'Conversion-focused SaaS website with immersive 3D hero. A/B tested checkout flow increased trial signups by 62%.' },
  { id:'05', title:'Stealth Launch',        cat:'Brand',      year:'2023', tags:['Strategy','Launch','PR'],             metric:'$2.1M raised in 48hrs', desc:'Go-to-market strategy and digital launch for a Web3 platform. Campaign generated $2.1M in seed funding within 48 hours.' },
  { id:'06', title:'Crest Clinic CRO',      cat:'Web Design', year:'2023', tags:['CRO','UX','Analytics'],              metric:'+91% lead volume',     desc:'UX audit and CRO sprint for a healthcare brand. Redesigned booking flow and landing pages drove 91% more qualified leads.' },
]

const awards = [
  { y:'2024', a:'Awwwards Site of the Day', p:'Nexflow Web App' },
  { y:'2024', a:'Webby Award — Best Agency', p:'Growth Agency' },
  { y:'2023', a:'CSS Design Awards',         p:'Stealth Launch' },
  { y:'2023', a:'Clutch Global Top 100',     p:'Growth Agency' },
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
      gsap.fromTo('.port-word span', { yPercent: 110 }, { yPercent: 0, stagger: 0.07, duration: 1.1, ease: 'power4.out' })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
      document.querySelectorAll('[data-stagger]').forEach(parent => {
        gsap.fromTo(parent.querySelectorAll('.s-item'), { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: parent, start: 'top 82%' } })
      })
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const { gsap } = await import('gsap')
      gsap.fromTo('.proj-card', { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' })
    })()
  }, [filter])

  return (
    <div className="min-h-screen pt-28 pb-0 bg-ash text-ink">
      {/* Header */}
      <div className="px-8 lg:px-16 mb-12">
        <p className="font-mono text-xs text-mute uppercase tracking-widest mb-4">Case Studies</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h1 className="port-word font-display font-extrabold leading-[0.88] tracking-tight"
            style={{ fontFamily:'var(--font-syne)', fontSize:'clamp(3rem,9vw,9rem)' }}>
            {['Our','Work'].map((w,i) => (
              <span key={i} className="block overflow-hidden">
                <span className="inline-block">{i===1 ? <><span className="text-lime">{w[0]}</span>{w.slice(1)}</> : w}</span>
              </span>
            ))}
          </h1>
          <p className="font-mono text-mute text-sm max-w-xs leading-relaxed lg:text-right">
            Real campaigns. Real results. Every project includes verified performance data.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-y border-black/10 grid grid-cols-2 lg:grid-cols-4" data-stagger>
        {[['60+','Projects'],['$12M+','Revenue Generated'],['340%','Avg. ROAS Lift'],['98%','Retained Clients']].map(([n,l]) => (
          <div key={l} className="s-item px-8 lg:px-16 py-8 border-r border-black/10 last:border-r-0">
            <div className="font-display font-extrabold text-4xl text-ink" style={{fontFamily:'var(--font-syne)'}}>{n}</div>
            <div className="font-mono text-xs text-mute mt-1 uppercase tracking-wider">{l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="px-8 lg:px-16 py-6 flex gap-3 flex-wrap border-b border-black/10">
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} data-hover
            className={`font-mono text-xs px-4 py-2 border transition-all duration-150
              ${filter===c ? 'border-ink bg-ink text-ash' : 'border-black/20 text-mute hover:border-ink hover:text-ink'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Project rows */}
      <div className="px-8 lg:px-16 divide-y divide-black/10">
        {filtered.map(p => (
          <div key={p.id} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}
            className={`proj-card flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center py-10 cursor-pointer transition-all duration-300 ${hovered===p.id ? 'pl-4' : ''}`}>
            <span className="font-mono text-xs text-mute w-8 shrink-0 pt-1">{p.id}</span>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tags.map(t => (
                  <span key={t} className="font-mono text-xs text-mute border border-black/20 px-2 py-0.5">{t}</span>
                ))}
              </div>
              <h2 className={`font-display font-bold transition-colors duration-200 leading-tight
                ${hovered===p.id ? 'text-lime' : 'text-ink'}`}
                style={{ fontFamily:'var(--font-syne)', fontSize:'clamp(1.8rem,4vw,3.5rem)' }}>
                {p.title}
              </h2>
              <p className="font-mono text-sm text-mute mt-2 max-w-xl leading-relaxed">{p.desc}</p>
            </div>
            <div className="shrink-0 lg:text-right">
              <div className={`font-display font-bold text-lg transition-colors duration-200 ${hovered===p.id ? 'text-lime' : 'text-ink'}`}
                style={{fontFamily:'var(--font-syne)'}}>{p.metric}</div>
              <div className="font-mono text-xs text-mute mt-1">{p.cat} · {p.year}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Awards */}
      <section className="px-8 lg:px-16 py-24 border-t border-black/10" data-stagger>
        <p className="s-item font-mono text-xs text-mute uppercase tracking-widest mb-4">Recognition</p>
        <h2 className="s-item font-display font-extrabold text-ink mb-12" style={{fontFamily:'var(--font-syne)',fontSize:'clamp(2rem,5vw,4rem)'}}>
          Industry <span className="text-lime">Awards</span>
        </h2>
        <div className="divide-y divide-black/10">
          {awards.map((a,i) => (
            <div key={i} className="s-item flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 gap-2">
              <span className="font-mono text-xs text-mute w-12">{a.y}</span>
              <span className="font-display font-bold text-xl text-ink flex-1 sm:px-8" style={{fontFamily:'var(--font-syne)'}}>{a.a}</span>
              <span className="font-mono text-sm text-mute">{a.p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="px-8 lg:px-16 py-20 border-t border-black/10 text-center reveal">
        <p className="font-display font-bold text-ink leading-snug max-w-3xl mx-auto mb-6"
          style={{fontFamily:'var(--font-syne)',fontSize:'clamp(1.5rem,3.5vw,2.8rem)'}}>
          "Growth Agency is the only agency we've worked with that <span className="text-lime">actually understands the full funnel</span> — from first click to repeat customer."
        </p>
        <div className="font-mono text-sm text-mute">— Alex Tran, VP Growth · Nexflow</div>
      </section>

      {/* CTA */}
      <section className="px-8 lg:px-16 py-20 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="reveal">
          <h3 className="font-display font-extrabold text-ink mb-2" style={{fontFamily:'var(--font-syne)',fontSize:'clamp(2rem,4vw,3.5rem)'}}>Ready to be next?</h3>
          <p className="font-mono text-mute text-sm">Let's discuss your growth goals over a free strategy call.</p>
        </div>
        <Link href="/contact" data-hover
          className="reveal shrink-0 bg-ink text-ash font-mono text-xs px-10 py-4 uppercase tracking-widest hover:bg-lime hover:text-ink transition-all duration-150">
          Start a Project →
        </Link>
      </section>
    </div>
  )
}
