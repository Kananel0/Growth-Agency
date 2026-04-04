'use client'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// FIX: Added <{ className?: string }> to satisfy TypeScript's strict mode
const ThreeScene = dynamic<{ className?: string }>(
  () => import('@/components/ThreeScene'), 
  { ssr: false }
)

/* ─── Intro word sequence (like Sofi: sleep→smart→naturally) ─── */
const INTRO_WORDS = [
  { word: 'grow',     num: '001' },
  { word: 'scale',   num: '002' },
  { word: 'dominate',num: '003' },
]

const SERVICES = [
  { n:'01', title:'SEO & Content',     desc:'Rank #1 and stay there. Data-led keyword strategy and content that converts.',                 stat:'340%',  statLabel:'avg traffic lift'  },
  { n:'02', title:'Paid Media',          desc:'Every dollar working harder. Google, Meta & LinkedIn engineered for maximum ROAS.',             stat:'4.8×',  statLabel:'blended ROAS'      },
  { n:'03', title:'Web Design & Dev',    desc:'Conversion-obsessed websites built with Next.js, Three.js & GSAP. Fast and beautiful.',       stat:'62%',   statLabel:'more conversions'  },
  { n:'04', title:'Branding & Identity', desc:'Logos, colour systems, typography and full identity rollouts that make you unforgettable.',    stat:'280%',  statLabel:'brand recall lift' },
  { n:'05', title:'Graphic Design',      desc:'Print, digital, social and motion assets engineered to stop the scroll and sell.',             stat:'5×',    statLabel:'content engagement'},
  { n:'06', title:'Cloud Services',      desc:'AWS, GCP & Azure architecture, DevOps pipelines and managed infra that scales without breaking.',stat:'99.9%', statLabel:'uptime guaranteed' },
]

const FEATURES = [
  { icon: '◎', label: 'Data-Driven',  desc: 'Every decision backed by attribution data and real revenue metrics — no vanity numbers.' },
  { icon: '◈', label: 'Full-Funnel',  desc: 'We connect every channel into one compounding growth system that reinforces itself.' },
  { icon: '◇', label: 'Fast Delivery',desc: 'First deliverable in 5 business days. Weekly sprints. Always shipping.' },
  { icon: '◉', label: 'ROI Guarantee',desc: 'If we don\'t return a positive ROI in 90 days, we work free until we do.' },
]

export default function Home() {
  const [introIdx, setIntroIdx]       = useState(0)
  const [introPhase, setIntroPhase]   = useState<'in'|'hold'|'out'>('in')
  const [introDone, setIntroDone]     = useState(false)
  const [scrollPct, setScrollPct]     = useState(0)
  const heroRef    = useRef<HTMLElement>(null)
  const featRef    = useRef<HTMLDivElement>(null)

  /* ── Intro word sequencer ── */
  useEffect(() => {
    if (introDone) return
    let timeout: ReturnType<typeof setTimeout>
    if (introPhase === 'in')   timeout = setTimeout(() => setIntroPhase('hold'), 400)
    if (introPhase === 'hold') timeout = setTimeout(() => setIntroPhase('out'),  700)
    if (introPhase === 'out') {
      timeout = setTimeout(() => {
        if (introIdx < INTRO_WORDS.length - 1) {
          setIntroIdx(i => i + 1); setIntroPhase('in')
        } else {
          setIntroDone(true)
        }
      }, 350)
    }
    return () => clearTimeout(timeout)
  }, [introPhase, introIdx, introDone])

  /* ── Scroll percentage ── */
  useEffect(() => {
    const fn = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setScrollPct(Math.round(pct * 100))
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* ── GSAP animations once intro done ── */
  useEffect(() => {
    if (!introDone) return
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* Hero text line by line */
      gsap.fromTo('.hero-line', { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'power4.out', delay: 0.1 })
      gsap.fromTo('.hero-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 })
      gsap.fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.0 })

      /* Parallax on hero image placeholder */
      gsap.to('.hero-visual', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
      })

      /* Features section — feature cards stagger in */
      gsap.fromTo('.feat-card', { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: featRef.current, start: 'top 75%' } })

      /* Service rows */
      gsap.utils.toArray<HTMLElement>('.svc-row').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.06,
            scrollTrigger: { trigger: el, start: 'top 88%' } })
      })

      /* Scroll-scrub big text */
      gsap.fromTo('.scrub-text', { xPercent: 0 }, {
        xPercent: -12, ease: 'none',
        scrollTrigger: { trigger: '.scrub-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      })

      /* Stats counter */
      document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
        ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => {
          const raw = el.dataset.count!
          const num = parseFloat(raw.replace(/[^0-9.]/g, ''))
          const suffix = raw.replace(/[0-9.]/g, '')
          let start = 0
          const step = () => {
            start = Math.min(start + num / 55, num)
            el.textContent = (Number.isInteger(num) ? Math.floor(start) : start.toFixed(1)) + suffix
            if (start < num) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }})
      })

      /* Reveal classes */
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
    })()
  }, [introDone])

  /* ── INTRO SCREEN ── */
  if (!introDone) {
    const { word, num } = INTRO_WORDS[introIdx]
    return (
      <div className="fixed inset-0 z-[9000] flex flex-col" style={{ fontFamily: 'var(--font-syne)' }}>
        {/* Top black bar */}
        <div className="flex-1 bg-ink" />
        {/* White word panel */}
        <div className="relative flex items-center justify-center bg-ash"
          style={{ height: '42vh', overflow: 'hidden' }}>
          <span className="absolute left-8 bottom-6 font-mono text-xs text-mute">{num}</span>
          <span className="absolute right-8 top-6 font-mono text-xs text-mute">©2025</span>
          <span
            className="font-display font-normal text-ink leading-none select-none"
            style={{
              fontSize: 'clamp(5rem, 14vw, 11rem)',
              letterSpacing: '-0.04em',
              transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
              opacity: introPhase === 'hold' ? 1 : 0,
              transform: introPhase === 'in' ? 'translateY(20px)' : introPhase === 'out' ? 'translateY(-20px)' : 'translateY(0)',
              display: 'block',
            }}
          >
            {word}
          </span>
        </div>
        {/* Bottom black bar */}
        <div className="flex-1 bg-ink" />
      </div>
    )
  }

  /* ── MAIN HOME PAGE ── */
  return (
    <>
      {/* ── STICKY BOTTOM BAR (like Sofi) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3
        border-t border-white/10 font-mono text-[10px] text-mute"
        style={{ background: 'rgba(6,6,8,0.9)', backdropFilter: 'blur(12px)' }}>
        <span className="tracking-widest hidden sm:block">
          data&nbsp;·&nbsp;design&nbsp;·&nbsp;delivery
        </span>
        <span className="text-dim/60 hidden lg:block tracking-wider">powered by growth-agency™</span>
        <span className="flex items-center gap-3">
          <span className="text-dim">scroll down</span>
          <span className="w-20 h-px bg-mute/40 relative overflow-hidden inline-block align-middle">
            <span className="absolute left-0 top-0 h-full bg-lime transition-all duration-100"
              style={{ width: `${scrollPct}%` }} />
          </span>
          <span className="text-ash tabular-nums w-8 text-right">{scrollPct}%</span>
        </span>
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden bg-ash pb-24 pt-28">
        <ThreeScene className="opacity-60" />

        {/* Big left-anchored text — exactly like Sofi's "feel better" */}
        <div className="relative z-10 px-8 lg:px-16 max-w-4xl">
          <div className="overflow-hidden mb-1"><h1 className="hero-line font-display font-extrabold text-ink leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(4.5rem, 13vw, 12rem)', opacity: 0 }}>we grow</h1></div>
          <div className="overflow-hidden mb-6"><h1 className="hero-line font-display font-extrabold text-ink leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(4.5rem, 13vw, 12rem)', opacity: 0 }}>brands.</h1></div>
          <p className="hero-sub font-mono text-mute text-base lg:text-lg max-w-sm leading-relaxed opacity-0">
            we have helped ambitious brands outrank, outspend and outsell their competition since 2017 — growth agency is rewriting what a modern agency can do.
          </p>
          <div className="hero-cta flex gap-4 mt-8 opacity-0">
            <Link href="/contact" data-hover
              className="bg-ink text-ash font-mono text-xs uppercase tracking-widest px-7 py-3.5
                hover:bg-lime hover:text-ink transition-all duration-200 rounded-full">
              get free audit
            </Link>
          </div>
        </div>

        {/* Hero visual — right-anchored, bleeds off screen like Sofi */}
        <div className="hero-visual absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-ash via-ash/20 to-transparent z-10" />
          <ThreeScene />
          {/* Abstract metric overlays */}
          <div className="absolute bottom-32 right-16 z-20 text-right font-mono">
            <div className="text-5xl font-bold text-ink/10" style={{ fontFamily: 'var(--font-syne)' }}>$12M+</div>
            <div className="text-xs text-mute mt-1">revenue generated 2024</div>
          </div>
        </div>
      </section>

      {/* ── DARK FEATURES — like Sofi's dark product section ── */}
      <section ref={featRef} className="relative bg-ink py-24 lg:py-36 overflow-hidden">
        {/* Floating 3D visual center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <ThreeScene />
        </div>

        <div className="relative z-10 px-8 lg:px-16">
          {/* Top label */}
          <p className="font-mono text-xs text-lime uppercase tracking-widest text-center mb-16">
            how we work
          </p>

          {/* 2×2 feature grid flanking the center — like Sofi's long life / connected cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {FEATURES.map((f, i) => (
              <div key={f.label}
                className="feat-card border border-white/10 p-8 lg:p-10 hover:border-lime/40
                  hover:bg-lime/5 transition-all duration-200 opacity-0 group">
                <div className="flex items-start justify-between mb-5">
                  <span className="text-lime text-2xl">{f.icon}</span>
                  <span className="font-mono text-xs text-mute/40">0{i+1}</span>
                </div>
                <div className="w-full h-px bg-white/10 mb-5" />
                <h3 className="font-display font-bold text-ash text-lg mb-3 group-hover:text-lime transition-colors duration-200">
                  {f.label}
                </h3>
                <p className="font-mono text-xs text-mute leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — 3-col cards like Sofi's product cards ── */}
      <section className="bg-ink border-t border-white/10 pb-0">
        <div className="px-8 lg:px-16 pt-20 pb-8">
          <p className="reveal font-mono text-xs text-lime uppercase tracking-widest mb-4">what we do</p>
          <h2 className="reveal font-display font-extrabold text-ash leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Our Services
          </h2>
        </div>

        {/* Grid — exactly like Sofi's 3-col product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10">
          {SERVICES.map((s, i) => (
            <div key={s.n}
              className="svc-row border-r border-b border-white/10 p-8 lg:p-10 opacity-0
                hover:bg-white/[0.03] transition-colors duration-200 group flex flex-col"
              style={{ minHeight: '280px' }}>
              {/* Top: latin-style service ref like Sofi's "lat:// valeriana" */}
              <div className="flex items-start justify-between mb-auto">
                <span className="font-mono text-xs text-mute/60">svc:// {s.title.toLowerCase().replace(/ /g, '-')}</span>
                <span className={`font-mono text-xs px-2 py-0.5 border border-mute/30 text-mute`}>{s.n}</span>
              </div>

              {/* Center title */}
              <h3 className="font-display font-bold text-ash text-2xl mt-8 mb-3 group-hover:text-lime transition-colors duration-300">
                {s.title}
              </h3>
              <p className="font-mono text-xs text-mute leading-relaxed flex-1">{s.desc}</p>

              {/* Bottom: stat row — exactly like Sofi's "target state: sleep / impact: =51%" */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                <span className="font-mono text-xs text-mute">
                  target: <span className="text-ash">{s.statLabel}</span>
                </span>
                <div className="flex items-center gap-2 font-mono text-xs text-lime">
                  <span data-count={s.stat.replace(/[^0-9.×%]/g,'')+s.stat.replace(/[0-9.]/g,'').replace(/[^×%+]/g,'')}>{s.stat}</span>
                  <span className="text-white/20">›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCROLL-SCRUB BIG TEXT (between dark/light sections) ── */}
      <div className="scrub-section bg-ink overflow-hidden py-20 border-t border-white/10">
        <p className="scrub-text font-display font-extrabold text-white/[0.04] whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(6rem, 18vw, 18rem)', letterSpacing: '-0.03em' }}>
          GROW · SCALE · CONVERT · RETAIN · GROW · SCALE ·
        </p>
      </div>

      {/* ── STATS ROW ── */}
      <section className="bg-ink border-t border-white/10 grid grid-cols-2 lg:grid-cols-4">
        {[
          { n:'60+',  l:'Brands Transformed' },
          { n:'98%',  l:'Client Retention'   },
          { n:'$12M', l:'Revenue Generated'  },
          { n:'340%', l:'Avg. ROAS Lift'      },
        ].map(s => (
          <div key={s.l} className="reveal px-8 lg:px-16 py-12 border-r border-white/10 last:border-r-0 group">
            <div className="font-display font-extrabold text-lime leading-none mb-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              {s.n}
            </div>
            <div className="font-mono text-xs text-mute uppercase tracking-widest">{s.l}</div>
          </div>
        ))}
      </section>

      {/* ── ABOUT / BRAND SECTION — warm full-bleed like Sofi's driftwood scene ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1a0a 0%, #0e1a0a 50%, #060608 100%)' }}>
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(201,255,71,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,255,71,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 px-8 lg:px-16 pb-24 pt-40">
          <p className="reveal font-mono text-xs text-lime uppercase tracking-widest mb-6">our philosophy</p>
          <h2 className="reveal font-display font-extrabold text-ash leading-[0.9] tracking-tight mb-8 max-w-3xl"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            Growth Isn't a Campaign.<br/>
            <span className="text-lime">It's a System.</span>
          </h2>
          <p className="reveal font-mono text-mute text-base max-w-lg leading-relaxed mb-10">
            most agencies sell tactics. we build compounding growth machines — interconnected systems across seo, paid media, cro and design that reinforce each other and scale with your business.
          </p>
          <Link href="/portfolio" data-hover
            className="reveal inline-block font-mono text-xs text-lime border border-lime/60 px-8 py-3.5 uppercase tracking-widest hover:bg-lime hover:text-ink transition-all duration-200 rounded-full">
            see case studies →
          </Link>
        </div>
      </section>

      {/* ── FOOTER MEGA TEXT — exactly like Sofi's "plants · people · planet" ── */}
      <section className="bg-ash border-t border-black/10 overflow-hidden pb-10">
        <div className="flex items-end justify-between px-8 pt-8 pb-2">
          <span className="font-mono text-[10px] text-black/30 uppercase tracking-widest">purity of</span>
          <span className="font-mono text-[10px] text-black/30 uppercase tracking-widest">power of</span>
          <span className="font-mono text-[10px] text-black/30 uppercase tracking-widest">proof of</span>
        </div>
        <div className="flex items-baseline gap-4 px-4" style={{ overflow: 'hidden' }}>
          {['data','design','delivery'].map((w, i) => (
            <span key={w} className="font-display font-extrabold text-ink leading-none tracking-tight flex-1 text-center"
              style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)', letterSpacing: '-0.04em' }}>
              {w}
              {i < 2 && <span className="text-lime mx-2 lg:mx-4">·</span>}
            </span>
          ))}
        </div>
        <p className="font-mono text-[10px] text-black/30 text-center mt-6">
          © all rights reserved '25
        </p>
      </section>
    </>
  )
}