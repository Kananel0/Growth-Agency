'use client'
import './globals.css'
import { Syne, DM_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useRef } from 'react'

const syne   = Syne({ subsets:['latin'], variable:'--font-syne', weight:['400','600','700','800'] })
const dmMono = DM_Mono({ subsets:['latin'], variable:'--font-dm-mono', weight:['400','500'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current; if (!cursor) return
    let cx = 0, cy = 0, tx = 0, ty = 0
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', move)
    const lerp = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'
      requestAnimationFrame(lerp)
    }
    lerp()
    const enter = () => cursor.classList.add('expand')
    const leave = () => cursor.classList.remove('expand')
    const attachCursor = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave)
      })
    }
    attachCursor()
    const obs = new MutationObserver(attachCursor)
    obs.observe(document.body, { childList:true, subtree:true })
    return () => { window.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])

  useEffect(() => {
    let lenis: any
    ;(async () => {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({ duration:1.6, easing:(t:number) => Math.min(1,1.001-Math.pow(2,-10*t)) })
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })()
    return () => lenis?.destroy()
  }, [])

  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <head><title>Growth Agency — Scale Your Brand</title></head>
      <body>
        <div id="cursor" ref={cursorRef} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
