# Growth Agency — Full-Stack Growth Partner Website

Modern, high-converting agency website built with Next.js 14, GSAP, Three.js & Tailwind.

## Pages & Sections

### `/` — Home
Hero (Three.js sphere) → Client logos marquee → Stats grid → Services grid (6) → About/Philosophy → Process (4 steps) → Testimonials → Tech marquee → CTA banner

### `/portfolio` — Work
Header → Stats bar → Filter tabs → Project list (6 case studies with metrics) → Awards section → Pull quote → CTA

### `/pricing` — Pricing
Header + annual/monthly toggle → 3 pricing cards (Launch / Growth / Scale) → Feature comparison table → FAQ accordion (6 Qs) → Growth Guarantee CTA

### `/contact` — Contact
Hero → Contact details + Offices + Socials → Full project brief form (service, budget, timeline, details) → Team grid (4 members) → Trust bar

## Shared Components
- `Navbar.tsx` — auto-hides on scroll, active route highlight, "Free Audit" CTA
- `Footer.tsx` — 3-column links + copyright bar
- `ThreeScene.tsx` — 3,000-particle sphere with mouse parallax + wireframe core

## Animations
- **GSAP timeline** on hero: badge → h1 words → subtitle → CTAs → scroll hint
- **ScrollTrigger** reveals: `.reveal`, `.reveal-left`, `.reveal-scale`
- **Stagger groups**: `[data-stagger]` → children with `.s-item`
- **Lenis** smooth scroll with lerped custom cursor
- **Marquee** A (clients) + Marquee B reversed (tech stack)
- **FAQ accordion** with smooth max-height transition
- **Filter animation** on portfolio grid re-render

## Design System
| Token | Value |
|---|---|
| `--ink` | `#060608` |
| `--lime` | `#C9FF47` |
| `--ash` | `#F5F5F0` |
| `--mute` | `#555560` |
| Display font | Syne 400/600/700/800 |
| Mono font | DM Mono 400/500 |

## Run
```bash
unzip growth-agency.zip && cd growth-agency
npm install
npm run dev
# → http://localhost:3000
```
