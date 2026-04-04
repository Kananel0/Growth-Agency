'use client'
import Link from 'next/link'

const cols = [
  { title: 'Services', links: ['SEO & Content', 'Paid Media', 'Web Design', 'CRO', 'Brand Strategy'] },
  { title: 'Company',  links: ['About', 'Work', 'Pricing', 'Contact', 'Blog'] },
  { title: 'Connect',  links: ['LinkedIn', 'Twitter / X', 'Dribbble', 'GitHub', 'Instagram'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-8 lg:px-16 pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="font-display font-extrabold text-2xl mb-4">
            <span className="text-lime">G</span>rowth<span className="text-mute mx-1">—</span>Agency
          </div>
          <p className="font-mono text-mute text-sm leading-relaxed max-w-xs mb-6">
            We transform ambitious brands into market leaders through data-driven growth strategies and world-class design.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-lime">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            Taking on new clients — Q3 2025
          </div>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h4 className="font-mono text-xs text-mute uppercase tracking-widest mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map(l => (
                <li key={l}>
                  <Link href="#" className="font-mono text-sm text-ash/70 hover:text-lime transition-colors duration-200 draw-line">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 font-mono text-xs text-mute gap-4">
        <span>© 2025 Growth Agency. All rights reserved.</span>
        <span>Built with Next.js · Three.js · GSAP</span>
        <span>hello@growth-agency.io</span>
      </div>
    </footer>
  )
}
