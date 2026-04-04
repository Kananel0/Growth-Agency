'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const plans = [
  { name:'Launch', mo:1800, yr:1350, desc:'Get your brand online with a high-converting website and a 90-day SEO foundation.',
    features:['5-Page Website (Next.js)','Basic GSAP Animations','On-Page SEO Setup','Google Analytics 4','1 Landing Page A/B Test','2 Revision Rounds','3-Week Delivery'],
    not:['Paid Media Management','CRO Sprint','Dedicated Account Manager'], cta:'Get Started', highlight:false },
  { name:'Growth', mo:4500, yr:3400, desc:'The full growth stack — paid media, SEO, CRO and a world-class website working in concert.',
    features:['Up to 10 Pages (Next.js + Three.js)','Advanced GSAP / WebGL','Full SEO Campaign','Google + Meta Ads Management','Monthly CRO Sprint','Dedicated Account Manager','Weekly Reporting','Unlimited Revisions'],
    not:[], cta:'Most Popular', highlight:true },
  { name:'Scale', mo:0, yr:0, desc:'Enterprise-grade growth programmes for high-growth brands with complex requirements.',
    features:['Custom Scope & Team','Multi-Channel Growth Strategy','In-House Team Embedding','Board-Level Reporting','Priority 24/7 Support','NDA & Custom SLA'],
    not:[], cta:"Let's Talk", highlight:false },
]

const faqs = [
  { q:'How quickly will we see results?', a:'Paid media results typically show within 30 days. SEO compounds from month 3. Website redesigns often produce immediate conversion lifts on launch day.' },
  { q:'Do you work with businesses outside the UK/US?', a:'Yes — we work globally. Our team is fully remote and experienced across time zones. We have clients in 14 countries.' },
  { q:'What makes you different from other agencies?', a:'We integrate every channel under one strategy. Most agencies silo SEO from paid media from web. We build systems where each channel amplifies the others.' },
  { q:'Is there a minimum commitment?', a:'Our Launch plan has no lock-in. Growth and Scale plans start with a 3-month onboarding engagement, then rolling monthly.' },
  { q:'What do I need to get started?', a:'Just a 30-min discovery call. We\'ll audit your setup, identify opportunities and propose a plan within 48 hours.' },
  { q:'Do you offer performance-based pricing?', a:'For established brands with sufficient data, we offer hybrid models where part of our fee is tied to agreed revenue KPIs. Ask on your discovery call.' },
]

const compare = [
  { feature:'Website (Next.js)',     launch:true,    growth:true,       scale:true },
  { feature:'Three.js / WebGL',      launch:false,   growth:true,       scale:true },
  { feature:'GSAP Animations',       launch:'Basic', growth:'Advanced', scale:'Custom' },
  { feature:'SEO Campaign',          launch:'Setup', growth:'Full',     scale:'Custom' },
  { feature:'Google & Meta Ads',     launch:false,   growth:true,       scale:true },
  { feature:'CRO Sprints',           launch:false,   growth:'Monthly',  scale:'Continuous' },
  { feature:'Account Manager',       launch:false,   growth:true,       scale:true },
  { feature:'Reporting',             launch:'Monthly',growth:'Weekly',  scale:'Real-time' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number|null>(null)

  useEffect(() => {
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.to(el, { opacity:1, y:0, duration:0.9, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 88%' } })
      })
      document.querySelectorAll('[data-stagger]').forEach(parent => {
        gsap.fromTo(parent.querySelectorAll('.s-item'), { opacity:0, y:50 },
          { opacity:1, y:0, stagger:0.12, duration:0.8, ease:'power3.out', scrollTrigger:{ trigger:parent, start:'top 82%' } })
      })
    })()
  }, [])

  const cell = (val: boolean|string) => {
    if (val === true)  return <span className="text-lime text-lg font-bold">✓</span>
    if (val === false) return <span className="text-black/20">—</span>
    return <span className="font-mono text-xs text-ink">{val}</span>
  }

  return (
    <div className="min-h-screen pt-28 pb-0 bg-ash text-ink">
      {/* Header */}
      <div className="px-8 lg:px-16 text-center mb-14">
        <p className="reveal font-mono text-xs text-mute uppercase tracking-widest mb-4">Transparent Pricing</p>
        <h1 className="reveal font-display font-extrabold leading-none mb-6"
          style={{fontFamily:'var(--font-syne)',fontSize:'clamp(3rem,8vw,7rem)'}}>
          Invest in <span className="text-lime" style={{WebkitTextStroke:'2px #0A0A0C'}}>Growth</span>
        </h1>
        <p className="reveal font-mono text-mute text-base max-w-lg mx-auto leading-relaxed mb-10">
          No hidden fees. No long-term lock-in on our starter plan. Every engagement includes a full onboarding audit.
        </p>
        {/* Toggle */}
        <div className="reveal inline-flex items-center gap-4 font-mono text-sm border border-black/20 px-6 py-3">
          <span className={annual ? 'text-mute' : 'text-ink font-bold'}>Monthly</span>
          <button onClick={() => setAnnual(!annual)} data-hover
            className="w-12 h-6 border border-black/20 relative transition-colors duration-200"
            style={{ background: annual ? '#0A0A0C' : 'transparent' }}>
            <span className={`absolute top-0.5 w-5 h-5 transition-all duration-300 ${annual ? 'left-6 bg-ash' : 'left-0.5 bg-mute'}`} />
          </button>
          <span className={annual ? 'text-ink font-bold' : 'text-mute'}>Annual <span className="text-lime font-bold">–25%</span></span>
        </div>
      </div>

      {/* Cards */}
      <div className="px-8 lg:px-16 mb-24" data-stagger>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/10">
          {plans.map((p,i) => (
            <div key={p.name}
              className={`s-item flex flex-col p-8 lg:p-10 relative border-r border-black/10 last:border-r-0
                ${p.highlight ? 'bg-ink text-ash' : 'bg-ash text-ink'}`}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-ink font-mono text-xs px-4 py-1 uppercase tracking-widest whitespace-nowrap">
                  ★ Most Popular
                </span>
              )}
              <div className="mb-8">
                <div className={`font-mono text-xs uppercase tracking-widest mb-3 ${p.highlight ? 'text-mute' : 'text-mute'}`}>{p.name}</div>
                <div className={`font-display font-extrabold text-6xl leading-none mb-1 ${p.highlight ? 'text-ash' : 'text-ink'}`}
                  style={{fontFamily:'var(--font-syne)'}}>
                  {p.mo === 0 ? 'Custom' : `$${(annual ? p.yr : p.mo).toLocaleString()}`}
                  {p.mo !== 0 && <span className="font-mono text-mute text-lg font-normal">/mo</span>}
                </div>
                {p.mo !== 0 && annual && <div className="font-mono text-xs text-lime mt-1">Save ${((p.mo-p.yr)*12).toLocaleString()}/yr</div>}
                <p className={`font-mono text-xs mt-4 leading-relaxed ${p.highlight ? 'text-mute' : 'text-mute'}`}>{p.desc}</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map(f => (
                  <li key={f} className={`flex items-start gap-3 font-mono text-sm ${p.highlight ? 'text-ash/80' : 'text-ink/80'}`}>
                    <span className="text-lime mt-0.5 shrink-0">✓</span>{f}
                  </li>
                ))}
                {p.not.map(f => (
                  <li key={f} className="flex items-start gap-3 font-mono text-sm text-mute/40 line-through">
                    <span className="mt-0.5 shrink-0">✗</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" data-hover
                className={`font-mono text-xs text-center py-4 px-6 uppercase tracking-widest transition-all duration-150
                  ${p.highlight ? 'bg-lime text-ink hover:bg-ash' : 'border border-black/20 text-ink hover:bg-ink hover:text-ash hover:border-ink'}`}>
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <section className="px-8 lg:px-16 py-20 border-t border-black/10">
        <h2 className="reveal font-display font-extrabold text-ink mb-12" style={{fontFamily:'var(--font-syne)',fontSize:'clamp(2rem,5vw,4rem)'}}>
          Plan <span className="text-lime">Comparison</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-black/10">
                <th className="font-mono text-xs text-mute uppercase tracking-wider text-left pb-4 w-1/2">Feature</th>
                {['Launch','Growth','Scale'].map(n => (
                  <th key={n} className={`font-display font-bold text-sm pb-4 text-center ${n==='Growth' ? 'text-lime' : 'text-ink'}`}
                    style={{fontFamily:'var(--font-syne)'}}>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {compare.map(row => (
                <tr key={row.feature} className="hover:bg-black/[0.02] transition-colors">
                  <td className="font-mono text-sm text-mute py-4">{row.feature}</td>
                  <td className="text-center py-4">{cell(row.launch)}</td>
                  <td className="text-center py-4">{cell(row.growth)}</td>
                  <td className="text-center py-4">{cell(row.scale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 lg:px-16 py-20 border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="reveal font-mono text-xs text-mute uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="reveal font-display font-extrabold text-ink" style={{fontFamily:'var(--font-syne)',fontSize:'clamp(2rem,5vw,4rem)'}}>
              Common <span className="text-lime">Questions</span>
            </h2>
          </div>
          <div className="divide-y divide-black/10">
            {faqs.map((f,i) => (
              <div key={i} className="reveal">
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)} data-hover
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group">
                  <span className="font-display font-bold text-base text-ink group-hover:text-lime transition-colors duration-150"
                    style={{fontFamily:'var(--font-syne)'}}>{f.q}</span>
                  <span className={`font-mono text-ink text-xl shrink-0 transition-transform duration-300 ${openFaq===i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${openFaq===i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
                  <p className="font-mono text-sm text-mute leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="px-8 lg:px-16 py-24 border-t border-black/10 text-center reveal">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display font-extrabold text-ink mb-6" style={{fontFamily:'var(--font-syne)',fontSize:'clamp(2rem,5vw,4rem)'}}>
            Our <span className="text-lime">Growth Guarantee</span>
          </h3>
          <p className="font-mono text-mute text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            If you're on our Growth plan and we don't generate a positive ROI within 90 days, we work for free until we do. We only win when you win.
          </p>
          <Link href="/contact" data-hover
            className="inline-block bg-ink text-ash font-mono text-xs px-12 py-4 uppercase tracking-widest hover:bg-lime hover:text-ink transition-all duration-150">
            Claim Free Audit →
          </Link>
        </div>
      </section>
    </div>
  )
}
