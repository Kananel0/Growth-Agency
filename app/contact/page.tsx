'use client'
import { useEffect, useRef, useState } from 'react'

const services = ['Web Design & Dev','SEO & Content','Paid Media','CRO','Brand Strategy','Analytics','Other']
const budgets  = ['< $2,000/mo','$2k – $5k/mo','$5k – $10k/mo','$10k+/mo','Let\'s discuss']
const timelines= ['ASAP','1–3 months','3–6 months','6+ months']

const team = [
  { name:'Jordan Ellis',   role:'Head of Growth',      img:'JE', bio:'Ex-Google. 10+ years scaling DTC and SaaS brands globally.' },
  { name:'Mia Torres',     role:'Lead Web Designer',   img:'MT', bio:'Award-winning designer. Webby & Awwwards judge. Previously Figma.' },
  { name:'Raj Kapoor',     role:'Paid Media Director', img:'RK', bio:'Managed $40M+ in ad spend. Specialist in Google Shopping & Meta.' },
  { name:'Sophie Andres',  role:'SEO Strategist',      img:'SA', bio:'Built 3× organic channels from 0 to 1M monthly visits.' },
]

const offices = [
  { city:'London', addr:'14 Finsbury Sq, EC2A 1BR', tz:'GMT+1' },
  { city:'New York', addr:'350 Fifth Avenue, 41F', tz:'EST' },
  { city:'Remote', addr:'Worldwide coverage', tz:'24/7' },
]

export default function Contact() {
  const [service, setService] = useState('')
  const [budget, setBudget]   = useState('')
  const [timeline, setTimeline] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const tl = gsap.timeline({ defaults:{ ease:'power4.out' } })
      tl.fromTo('.ct-head span', { yPercent:110 }, { yPercent:0, stagger:0.08, duration:1.1 }, 0.2)
        .fromTo('.ct-sub',  { opacity:0, y:30 }, { opacity:1, y:0, duration:0.7 }, 0.8)
        .fromTo('.ct-form', { opacity:0, y:40 }, { opacity:1, y:0, duration:0.8 }, 0.9)
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.to(el, { opacity:1, y:0, duration:0.8, ease:'power3.out',
          scrollTrigger:{ trigger:el, start:'top 88%' } })
      })
      document.querySelectorAll('[data-stagger]').forEach(parent => {
        gsap.fromTo(parent.querySelectorAll('.s-item'),
          { opacity:0, y:40 }, { opacity:1, y:0, stagger:0.1, duration:0.7, ease:'power3.out',
            scrollTrigger:{ trigger:parent, start:'top 82%' } })
      })
    })()
  }, [])

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <div className="min-h-screen pt-32 pb-0">
      {/* Header */}
      <div className="px-8 lg:px-16 mb-20">
        <p className="font-mono text-xs text-lime uppercase tracking-widest mb-4">Get In Touch</p>
        <h1 className="ct-head font-display font-extrabold text-[clamp(3rem,9vw,9rem)] leading-[0.88] tracking-tight overflow-hidden mb-8">
          {["Let's","Build It."].map((w,i) => (
            <span key={i} className="block overflow-hidden">
              <span className="inline-block">{i===1 ? <><span className="text-lime">{w.slice(0,5)}</span>{w.slice(5)}</> : w}</span>
            </span>
          ))}
        </h1>
        <p className="ct-sub font-mono text-mute text-base max-w-xl leading-relaxed opacity-0">
          Fill in the brief below and we'll come back within 24 hours with a tailored proposal. No commitment, no hard sell — just a straight-talking conversation about how we can grow your business.
        </p>
      </div>

      {/* Main grid */}
      <div className="px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
        {/* Info col */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h3 className="reveal font-display font-bold text-xl text-ash mb-6">Contact Details</h3>
            <div className="space-y-4 font-mono text-sm">
              {[['Email','hello@growth-agency.io'],['Phone','+44 20 7946 0123'],['Response','Within 24 hours'],['Calls','Mon–Fri, 9–18 GMT']].map(([k,v]) => (
                <div key={k} className="reveal flex gap-6 border-b border-white/10 pb-4">
                  <span className="text-mute w-20 shrink-0">{k}</span>
                  <span className="text-ash">{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Offices */}
          <div>
            <h3 className="reveal font-display font-bold text-xl text-ash mb-6">Offices</h3>
            <div className="space-y-4" data-stagger>
              {offices.map(o => (
                <div key={o.city} className="s-item border border-white/10 p-5 hover:border-lime/30 card-lift transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-lime">{o.city}</span>
                    <span className="font-mono text-xs text-mute">{o.tz}</span>
                  </div>
                  <p className="font-mono text-xs text-mute">{o.addr}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Socials */}
          <div>
            <h3 className="reveal font-display font-bold text-xl text-ash mb-6">Follow Our Work</h3>
            <div className="flex flex-wrap gap-3">
              {['LinkedIn','Twitter / X','Dribbble','Instagram','GitHub'].map(s => (
                <a key={s} href="#" data-hover className="reveal font-mono text-xs border border-white/20 text-mute px-3 py-2 hover:border-lime hover:text-lime transition-all duration-200">{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-20">
              <div className="w-20 h-20 border border-lime rounded-full flex items-center justify-center text-lime text-3xl lime-glow">✓</div>
              <h2 className="font-display font-extrabold text-4xl text-ash">Brief received!</h2>
              <p className="font-mono text-mute text-sm max-w-sm leading-relaxed">We'll review your project and have a personalised proposal in your inbox within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ct-form opacity-0 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['Name','text','Your name'],['Email','email','your@email.com'],['Company','text','Company name'],['Website','url','https://...']].map(([l,t,ph]) => (
                  <div key={l}>
                    <label className="font-mono text-xs text-mute uppercase tracking-wider block mb-2">{l}</label>
                    <input type={t} placeholder={ph} required={l!=='Website'}
                      className="w-full bg-transparent border border-white/20 text-ash font-mono text-sm px-4 py-3 focus:outline-none focus:border-lime transition-colors duration-200 placeholder:text-mute/40" />
                  </div>
                ))}
              </div>

              <div>
                <label className="font-mono text-xs text-mute uppercase tracking-wider block mb-3">Service Needed</label>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => (
                    <button type="button" key={s} onClick={() => setService(s)} data-hover
                      className={`font-mono text-xs px-3 py-2 border transition-all duration-200 ${service===s ? 'border-lime text-lime bg-lime/10' : 'border-white/20 text-mute hover:border-white/40'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs text-mute uppercase tracking-wider block mb-3">Monthly Budget</label>
                  <div className="flex flex-col gap-2">
                    {budgets.map(b => (
                      <button type="button" key={b} onClick={() => setBudget(b)} data-hover
                        className={`font-mono text-xs px-3 py-2 border text-left transition-all duration-200 ${budget===b ? 'border-lime text-lime bg-lime/10' : 'border-white/20 text-mute hover:border-white/40'}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-mute uppercase tracking-wider block mb-3">Timeline</label>
                  <div className="flex flex-col gap-2">
                    {timelines.map(t => (
                      <button type="button" key={t} onClick={() => setTimeline(t)} data-hover
                        className={`font-mono text-xs px-3 py-2 border text-left transition-all duration-200 ${timeline===t ? 'border-lime text-lime bg-lime/10' : 'border-white/20 text-mute hover:border-white/40'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-mute uppercase tracking-wider block mb-2">Project Details</label>
                <textarea rows={5} placeholder="Tell us about your goals, current challenges and what success looks like..." required
                  className="w-full bg-transparent border border-white/20 text-ash font-mono text-sm px-4 py-3 focus:outline-none focus:border-lime transition-colors duration-200 placeholder:text-mute/40 resize-none" />
              </div>

              <button type="submit" data-hover className="w-full bg-lime text-ink font-display font-bold py-5 uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform duration-200">
                Send Project Brief →
              </button>
              <p className="font-mono text-xs text-mute text-center">No spam. No long-term commitment. Just a conversation.</p>
            </form>
          )}
        </div>
      </div>

      {/* Team */}
      <section className="px-8 lg:px-16 py-24 border-t border-white/10" data-stagger>
        <p className="s-item font-mono text-xs text-lime uppercase tracking-widest mb-4">The Team</p>
        <h2 className="s-item font-display font-extrabold text-3xl lg:text-5xl mb-12">
          Who You'll <span className="text-lime">Work With</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(m => (
            <div key={m.name} className="s-item group border border-white/10 p-6 hover:border-lime/40 card-lift transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center font-mono text-sm text-lime mb-5 group-hover:bg-lime/25 transition-colors duration-300">
                {m.img}
              </div>
              <div className="font-display font-bold text-lg text-ash mb-0.5">{m.name}</div>
              <div className="font-mono text-xs text-lime mb-3">{m.role}</div>
              <p className="font-mono text-xs text-mute leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-white/10 grid grid-cols-1 md:grid-cols-3">
        {[['⚡ Fast Turnaround','First deliverable within 5 business days of onboarding.'],
          ['🔒 NDA Protected','Every engagement covered by a full non-disclosure agreement.'],
          ['📈 ROI Guaranteed','We work free until we generate a positive return. No exceptions.']
        ].map(([t,d]) => (
          <div key={t as string} className="reveal px-8 lg:px-12 py-10 border-r border-white/10 last:border-r-0">
            <div className="font-display font-bold text-base text-ash mb-2">{t}</div>
            <p className="font-mono text-xs text-mute leading-relaxed">{d}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
