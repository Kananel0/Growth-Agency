'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/',          label: 'Home'      },
  { href: '/portfolio', label: 'Work'      },
  { href: '/pricing',   label: 'Pricing'   },
  { href: '/contact',   label: 'Contact'   },
]

export default function Navbar() {
  const path = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let last = 0
    const fn = () => {
      const nav = navRef.current; if (!nav) return
      nav.style.transform = window.scrollY > last + 10 && window.scrollY > 80 && !menuOpen
        ? 'translateY(-110%)' : 'translateY(0)'
      last = window.scrollY
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [menuOpen])

  return (
    <>
      {/* ── Minimal nav — logo left, icon right (like Sofi) ── */}
      <nav ref={navRef}
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-10 py-4 transition-transform duration-500"
        style={{ background: 'transparent', mixBlendMode: 'normal' }}>
        <Link href="/"
          className="font-display font-extrabold text-base leading-none tracking-tight z-10"
          style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
          <span style={{ color: path === '/' ? '#060608' : '#F5F5F0' }}>growth</span>
          <span className="text-lime">—</span>
          <span style={{ color: path === '/' ? '#060608' : '#F5F5F0' }}>agency</span>
        </Link>

        {/* Gear/menu icon — like Sofi's settings icon top-right */}
        <button onClick={() => setMenuOpen(m => !m)} data-hover aria-label="Menu"
          className="z-10 w-9 h-9 flex items-center justify-center border transition-all duration-200"
          style={{
            borderColor: menuOpen ? '#C9FF47' : path === '/' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
            background: menuOpen ? '#C9FF47' : 'transparent',
            color: menuOpen ? '#060608' : path === '/' ? '#060608' : '#F5F5F0'
          }}>
          <span className="font-mono text-xs">{menuOpen ? '✕' : '⊞'}</span>
        </button>
      </nav>

      {/* ── Full-screen overlay menu ── */}
      <div className={`fixed inset-0 z-[400] flex flex-col justify-between px-6 lg:px-10 py-24 transition-all duration-500
        ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: '#060608' }}>
        <ul className="space-y-2 mt-8">
          {links.map(({ href, label }, i) => (
            <li key={href} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              className={`transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link href={href} onClick={() => setMenuOpen(false)}
                className="font-display font-extrabold text-ash leading-none hover:text-lime transition-colors duration-200 block"
                style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '-0.04em' }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="font-mono text-xs text-mute space-y-1">
            <p>hello@growth-agency.io</p>
            <p>+44 20 7946 0123</p>
          </div>
          <Link href="/contact" onClick={() => setMenuOpen(false)} data-hover
            className="font-mono text-xs text-lime border border-lime/60 px-6 py-3 uppercase tracking-widest hover:bg-lime hover:text-ink transition-all duration-200">
            Free Audit →
          </Link>
        </div>
      </div>
    </>
  )
}
