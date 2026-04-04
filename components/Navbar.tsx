'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/',          label: 'Home'    },
  { href: '/portfolio', label: 'Work'    },
  { href: '/pricing',   label: 'Pricing' },
  { href: '/contact',   label: 'Contact' },
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
      <nav ref={navRef}
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-12 py-4 transition-transform duration-500 border-b border-black/8"
        style={{ background: 'rgba(245,245,240,0.88)', backdropFilter: 'blur(16px)' }}>

        <Link href="/" className="font-display font-extrabold text-base tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em', color: '#0A0A0C' }}>
          growth<span className="text-lime">—</span>agency
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}
                className={`u-draw font-mono text-xs uppercase tracking-widest transition-colors duration-150
                  ${path === href ? 'text-ink font-bold' : 'text-mute hover:text-ink'}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/contact" data-hover
            className="hidden md:block font-mono text-xs uppercase tracking-widest border border-black/20 text-ink
              px-5 py-2.5 hover:bg-ink hover:text-ash hover:border-ink transition-all duration-150">
            Free Audit ↗
          </Link>
          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(m => !m)} data-hover aria-label="Menu"
            className="md:hidden w-9 h-9 flex items-center justify-center border border-black/20 transition-all duration-200"
            style={{ background: menuOpen ? '#0A0A0C' : 'transparent', color: menuOpen ? '#F5F5F0' : '#0A0A0C' }}>
            <span className="font-mono text-xs">{menuOpen ? '✕' : '⊞'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[400] flex flex-col justify-between px-6 py-24 transition-all duration-500
        md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: '#F5F5F0' }}>
        <ul className="space-y-1 mt-8">
          {links.map(({ href, label }, i) => (
            <li key={href} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              className={`transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link href={href} onClick={() => setMenuOpen(false)}
                className="font-display font-extrabold text-ink leading-none hover:text-lime transition-colors duration-200 block"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', letterSpacing: '-0.04em', fontFamily: 'var(--font-syne)' }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" onClick={() => setMenuOpen(false)}
          className="font-mono text-xs text-ink border border-black/20 px-6 py-3 uppercase tracking-widest hover:bg-ink hover:text-ash transition-all duration-200 inline-block w-fit">
          Free Audit →
        </Link>
      </div>
    </>
  )
}
