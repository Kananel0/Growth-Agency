'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const plans = [
  { name:'Launch',  mo:1800,  yr:1350, desc:'Get your brand online with a high-converting website and a 90-day SEO foundation.',
    features:['5-Page Website (Next.js)','Basic GSAP Animations','On-Page SEO Setup','Google Analytics 4','1 Landing Page A/B Test','2 Revision Rounds','3-Week Delivery'],
    not:['Paid Media Management','CRO Sprint','Dedicated Account Manager'],  cta:'Get Started',   highlight:false },
  { name:'Growth',  mo:4500,  yr:3400, desc:'The full growth stack — paid media, SEO, CRO and a world-class website working in concert.',
    features:['Up to 10 Pages (Next.js + Three.js)','Advanced GSAP / WebGL','Full SEO Campaign','Google + Meta Ads Management','Monthly CRO Sprint','Dedicated Account Manager','Weekly Reporting','Unlimited Revisions'],
    not:[],  cta:'Most Popular',  highlight:true },
  { name:'Scale',   mo:0,     yr:0,    desc:'Enterprise-grade growth programmes for high-growth brands with complex requirements.',
    features:['Custom Scope & Team','Multi-Channel Growth Strategy','In-House Team Embedding','Board-Level Reporting','Priority 24/7 Support','NDA & Custom SLA'],
    not:[], cta:'Let\'s Talk',   highlight:false },
]

const faqs = [
  { q:'How quickly will we see results?', a:'Paid media results typically show within the first 30 days. SEO compounds from month 3 onward. Website redesigns often produce immediate conversion lifts on launch day.' },
  { q:'Do you work with businesses outside the UK/US?', a:'Yes — we work with brands globally. Our team is fully remote and experienced working across time zones. We have clients in 14 countries.' },
  { q:'What makes you different from other agencies?', a:'We integrate every channel under one strategy. Most agencies silo SEO from paid media from web. We build systems where each channel amplifies the others — and we own the outcome, not just the deliverables.' },
  { q:'Is there a minimum commitment?', a:'Our Launch plan has no lock-in. Growth and Scale plans start with a 3-month onboarding engagement, after which we move to rolling monthly agreements.' },
  { q:'What do I need to get started?', a:'Just a 30-min discovery call. We\'ll audit your current setup, identify the biggest opportunities and propose a tailored plan within 48 hours.' },
  { q:'Do you offer performance-based pricing?', a:'For established brands with sufficient data, we offer hybrid models where part of our fee is tied to hitting agreed revenue KPIs. Ask about this on your discovery call.' },
]

const compare = [
  { feature:'Website (Next.js)',          launch:true,  growth:true,  scale:true  },
  { feature:'Three.js / WebGL Hero',      launch:false, growth:true,  scale:true  },
  { feature:'GSAP Animations',            launch:'Basic',growth:'Advanced',scale:'Custom' },
  { feature:'SEO Campaign',               launch:'Setup',growth:'Full',   scale:'Custom' },
  { feature:'Google & Meta Ads',          launch:false, growth:true,  scale:true  },
  { feature:'CRO Sprints',               launch:false, growth:'Monthly',scale:'Continuous' },
  { feature:'Account Manager',           launch:false, growth:true,  scale:true  },
  { feature:'Reporting',                 launch:'Monthly',growth:'Weekly',scale:'Real-time' },
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
        gsap.to(el, { opacity:1, y:0, duration:0.9, ease:'power3.out',
          scrollTrigger:{ trigger:el, start:'top 88%' } })
      })
      document.querySelectorAll('[data-stagger]').forEach(parent => {
        gsap.fromTo(parent.querySelectorAll('.s-item'),
          { opacity:0, y:50 }, { opacity:1, y:0, stagger:0.12, duration:0.8, ease:'power3.out',
            scrollTrigger:{ trigger:parent, start:'top 82%' } })
      })
    })()
  }, [])

  const cell = (val: boolean|string) => {
    if (val === true)  return <span className="text-lime text-lg">✓</span>
    if (val === false) return <span className="text-mute/40">—</span>
    return <span className="font-mono text-xs text-ash">{val}</span>
  }

  return (
    <div className="min-h-screen pt-32 pb-0">
      {/* Header */}
      <div className="px-8 lg:px-16 text-center mb-16">
        <p className="reveal font-mono text-xs text-lime uppercase tracking-widest mb-4">Transparent Pricing</p>
        <h1 className="reveal font-display font-extrabold text-[clamp(3rem,8vw,7rem)] leading-none mb-6">
          Invest in <span className="text-lime">Growth</span>
        </h1>
        <p className="reveal font-mono text-mute text-base max-w-lg mx-auto leading-relaxed mb-10">
          No hidden fees. No long-term lock-in on our starter plan. Every engagement includes a full onboarding audit so we start from the right foundation.
        </p>
        {/* Toggle */}
        <div className="reveal inline-flex items-center gap-4 font-mono text-sm border border-white/10 rounded-full px-6 py-3">
          <span className={annual ? 'text-mute' : 'text-ash font-bold'}>Monthly</span>
          <button onClick={() => setAnnual(!annual)} data-hover
            className="w-12 h-6 rounded-full border border-white/20 relative transition-colors duration-300"
            style={{ background: annual ? '#C9FF47' : 'transparent' }}>
            <span className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 ${annual ? 'left-6 bg-ink' : 'left-0.5 bg-mute'}`} />
          </button>
          <span className={annual ? 'text-ash font-bold' : 'text-mute'}>Annual <span className="text-lime">Save 25%</span></span>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="px-8 lg:px-16 mb-24" data-stagger>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div key={p.name} className={`s-item border flex flex-col p-8 lg:p-10 relative card-lift
              ${p.highlight ? 'border-lime bg-lime/5 lime-glow' : 'border-white/10 hover:border-white/20'}`}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-ink font-mono text-xs px-4 py-1 uppercase tracking-widest whitespace-nowrap">
                  ★ Most Popular
                </span>
              )}
              <div className="mb-8">
                <div className="font-mono text-xs text-mute uppercase tracking-widest mb-3">{p.name}</div>
                <div className="font-display font-extrabold text-6xl text-ash mb-1 leading-none">
                  {p.mo === 0 ? 'Custom' : `$${(annual ? p.yr : p.mo).toLocaleString()}`}
                  {p.mo !== 0 && <span className="font-mono text-mute text-lg font-normal">/mo</span>}
                </div>
                {p.mo !== 0 && annual && <div className="font-mono text-xs text-lime mt-1">Billed annually — save ${((p.mo-p.yr)*12).toLocaleString()}/yr</div>}
                <p className="font-mono text-mute text-xs mt-4 leading-relaxed">{p.desc}</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-3 font-mono text-sm text-ash">
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
                className={`font-display font-bold text-sm text-center py-4 px-6 uppercase tracking-widest
                  transition-all duration-200 hover:scale-105 ${p.highlight ? 'bg-lime text-ink' : 'border border-mute/50 text-ash hover:border-ash'}`}>
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <section className="px-8 lg:px-16 py-20 border-t border-white/10">
        <h2 className="reveal font-display font-extrabold text-3xl lg:text-5xl mb-12">
          Plan <span className="text-lime">Comparison</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="font-mono text-xs text-mute uppercase tracking-wider text-left pb-4 w-1/2">Feature</th>
                {['Launch','Growth','Scale'].map(n => (
                  <th key={n} className={`font-display font-bold text-sm pb-4 text-center ${n==='Growth' ? 'text-lime' : 'text-ash'}`}>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {compare.map(row => (
                <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
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
      <section className="px-8 lg:px-16 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="reveal font-mono text-xs text-lime uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="reveal font-display font-extrabold text-3xl lg:text-5xl leading-tight">
              Common <span className="text-lime">Questions</span>
            </h2>
          </div>
          <div className="space-y-0 divide-y divide-white/10">
            {faqs.map((f,i) => (
              <div key={i} className="reveal">
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)} data-hover
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group">
                  <span className="font-display font-bold text-base text-ash group-hover:text-lime transition-colors duration-200">{f.q}</span>
                  <span className={`font-mono text-lime text-xl shrink-0 transition-transform duration-300 ${openFaq===i ? 'rotate-45' : ''}`}>+</span>
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
      <section className="px-8 lg:px-16 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="text-5xl mb-6">⬡</div>
          <h3 className="font-display font-extrabold text-3xl lg:text-5xl mb-6">Our <span className="text-lime">Growth Guarantee</span></h3>
          <p className="font-mono text-mute text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            If you're on our Growth plan and we don't generate a positive ROI within 90 days, we work for free until we do. We only win when you win.
          </p>
          <Link href="/contact" data-hover className="inline-block bg-lime text-ink font-display font-bold px-12 py-4 text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-200">
            Claim Free Audit →
          </Link>
        </div>
      </section>
    </div>
  )
}
