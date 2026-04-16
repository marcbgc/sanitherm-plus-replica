import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import {
  Phone, Mail, MapPin, Clock, ChevronRight, Star,
  Flame, AlertTriangle, Shield, Award,
  CheckCircle, ArrowRight, Menu, X, ThermometerSun,
  ShowerHead, BadgeCheck
} from 'lucide-react'

/* ─── Lazy-loaded Modals (Code-Splitting) ─── */
const ImpressumModal = lazy(() => import('./ImpressumModal'))
const DatenschutzModal = lazy(() => import('./DatenschutzModal'))
const BookingModal = lazy(() => import('./GhlModals').then(m => ({ default: m.BookingModal })))
const FormModal = lazy(() => import('./GhlModals').then(m => ({ default: m.FormModal })))

/* ─── Konfiguration ─── */
const SANITHERM_PHONE = 'tel:+491796878779'

/* ─── Fade-in via IntersectionObserver (Ersatz für framer-motion) ─── */
function FadeIn({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'span'
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { rootMargin: '-30px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const style = delay ? { transitionDelay: `${delay}s` } : undefined

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`fade-in ${visible ? 'is-visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

/* ─── Animated Counter (ohne framer-motion) ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const duration = 2000
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(target * progress))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          obs.disconnect()
        }
      })
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Typewriter ─── */
function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIndex((wordIndex + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex, words])

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire-light to-fire">
      {displayed}
      <span className="animate-pulse text-fire">|</span>
    </span>
  )
}

/* ─── Navigation ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Bewertungen', href: '#bewertungen' },
    { label: 'Kontakt', href: '#kontakt' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028621005/nDemuLrXPE7LoD3GGV97LE/sanitherm_logo_7e85b2a7.jpg"
              alt="Sanitherm Plus Logo"
              width="56"
              height="56"
              className="h-14 w-14 rounded-xl object-cover shadow-md"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-fire ${scrolled ? 'text-navy/80' : 'text-white/90'}`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+491796878779" className="relative inline-flex items-center gap-2 bg-fire hover:bg-fire-dark text-white font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-fire/30 hover:shadow-fire/50">
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              <Phone className="w-4 h-4" />
              Notdienst 24/7
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-navy' : 'text-white'}`}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-6 space-y-4">
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-navy font-medium text-lg">{link.label}</a>
            ))}
            <a href="tel:+491796878779" className="flex items-center justify-center gap-2 bg-fire text-white font-semibold px-5 py-3 rounded-full mt-4">
              <Phone className="w-4 h-4" /> Notdienst anrufen
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero Section ─── */
function Hero() {
  const typewriterWords = ['Heizung & Sanitär', 'Badsanierung', 'Wasserschaden-Hilfe', 'Wärmepumpen']

  const stats = [
    { value: 20, suffix: '+', label: 'Jahre Erfahrung' },
    { value: 1000, suffix: '+', label: 'Zufriedene Kunden' },
    { value: 30, suffix: ' Min', label: 'Reaktionszeit' },
    { value: 24, suffix: '/7', label: 'Notdienst' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663028621005/nDemuLrXPE7LoD3GGV97LE/sanitherm_hero_v2-CjsjmtNhkZMwiYA3EwJkAC.webp)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/97 via-navy/90 to-navy/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-0 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
            <BadgeCheck className="w-4 h-4 text-fire-light" />
            <span className="text-white/90 text-sm font-medium">Meisterbetrieb · München & Umgebung</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
            Ihr Experte für{' '}
            <br className="hidden sm:block" />
            <Typewriter words={typewriterWords} />
            <br className="hidden sm:block" />
            <span className="text-white/90 text-3xl sm:text-4xl lg:text-5xl">in München</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            Von der Heizungsinstallation über Badsanierung bis zur schnellen Wasserschadenbeseitigung – wir sind Ihr zuverlässiger Partner in München und Umgebung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#kontakt" className="inline-flex items-center justify-center gap-2 bg-fire hover:bg-fire-dark text-white font-semibold px-8 py-4 rounded-full transition-all shadow-xl shadow-fire/30 hover:shadow-fire/50 hover:-translate-y-0.5">
              Kostenlose Beratung <ArrowRight className="w-5 h-5" />
            </a>
            <a href="tel:+491796878779" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all hover:bg-white/20">
              <Phone className="w-5 h-5" /> +49 179 687 8779
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-8 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-display font-bold text-fire-light">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-1" />
        </div>
      </div>
    </section>
  )
}

/* ─── Leistungen ─── */
const services = [
  {
    icon: ThermometerSun,
    title: 'Heizungsinstallation',
    description: 'Moderne Heizsysteme für Ihr Zuhause – von der Planung bis zur Wartung. Wir installieren Gas-, Öl- und Wärmepumpenheizungen.',
    features: ['Heizungsinstallation & Wartung', 'Wärmepumpen', 'Fußbodenheizung', 'Heizkörpertausch'],
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028621005/nDemuLrXPE7LoD3GGV97LE/sanitherm_heizung_neu-iBe5aEtuncFCEFURXzC3sw.webp',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: ShowerHead,
    title: 'Sanitär & Badsanierung',
    description: 'Vom tropfenden Wasserhahn bis zur kompletten Badsanierung – professionell, sauber und termingerecht.',
    features: ['Badsanierung', 'Rohrleitungsbau', 'Armaturentausch', 'Abflussprobleme'],
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028621005/nDemuLrXPE7LoD3GGV97LE/sanitherm_bad_modern-EVQYN7kqJuydV43F25HSo3.webp',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: AlertTriangle,
    title: 'Wasserschaden-Soforthilfe',
    description: 'Schnelle Hilfe bei Wasserschäden – 24 Stunden am Tag, 7 Tage die Woche. Wir sind in 30 Minuten vor Ort.',
    features: ['Sofort-Einsatz 24/7', 'Leckortung', 'Trocknung', 'Schadensregulierung'],
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028621005/nDemuLrXPE7LoD3GGV97LE/sanitherm_wasserschaden_neu-WzoSzEzQfiuzYF4bbweGTz.webp',
    color: 'from-red-500 to-orange-600',
  },
]

function Services() {
  return (
    <section id="leistungen" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-fire font-semibold text-sm tracking-wider uppercase mb-4">Unsere Leistungen</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy mb-6">Kompetenz in allen Bereichen</h2>
            <p className="text-text-muted text-lg">Als inhabergeführter Meisterbetrieb bieten wir Ihnen Komplettlösungen aus einer Hand – zuverlässig, fair und professionell.</p>
          </div>
        </FadeIn>

        <div className="space-y-20">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-3xl">
                    <img src={service.image} alt={service.title} loading="lazy" decoding="async" width="800" height="600" className="w-full h-80 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`} />
                    <div className="absolute top-6 left-6">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                        <service.icon className="w-7 h-7 text-navy" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy mb-4">{service.title}</h3>
                  <p className="text-text-muted text-lg mb-8 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 bg-warm-gray rounded-xl px-4 py-3">
                        <CheckCircle className="w-5 h-5 text-fire shrink-0" />
                        <span className="text-sm font-medium text-navy">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#kontakt" className="inline-flex items-center gap-2 text-fire font-semibold hover:gap-3 transition-all">
                    Jetzt anfragen <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Wasserschaden Notfall Banner ─── */
function EmergencyBanner() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-fire to-orange-500" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="hidden md:inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-pulse">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">Wasserschaden? Wir sind sofort da!</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">Bei Wasserschäden zählt jede Minute. Unser Notdienst-Team ist rund um die Uhr für Sie erreichbar und innerhalb kürzester Zeit vor Ort.</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <a href="tel:+491796878779" className="inline-flex items-center justify-center gap-3 bg-white text-fire-dark font-bold px-10 py-5 rounded-full text-lg transition-all hover:shadow-2xl hover:-translate-y-1 shadow-xl">
            <Phone className="w-6 h-6" /> Jetzt anrufen: +49 179 687 8779
          </a>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {['In 30 Min. vor Ort', 'Leckortung & Trocknung', 'Versicherungsabwicklung'].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Über uns ─── */
function About() {
  return (
    <section id="ueber-uns" className="py-24 lg:py-32 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <FadeIn className="w-full lg:w-1/2">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028621005/nDemuLrXPE7LoD3GGV97LE/sanitherm_ueber_uns_v2-HDe332YfL79ug266hAfLxb.webp" alt="Sanitherm Plus GmbH Werkstatt" loading="lazy" decoding="async" width="800" height="500" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-fire" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl text-navy">20+</div>
                    <div className="text-text-muted text-sm">Jahre Erfahrung</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="w-full lg:w-1/2">
            <span className="inline-block text-fire font-semibold text-sm tracking-wider uppercase mb-4">Über uns</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy mb-6">Inhabergeführter Meisterbetrieb aus München</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">Seit über 20 Jahren sind wir als inhabergeführter Meisterbetrieb in München und Umgebung tätig. Unser Team aus erfahrenen Fachkräften steht Ihnen bei allen Fragen rund um Heizung, Sanitär und Wasserschadenbeseitigung zur Seite.</p>
            <p className="text-text-muted text-lg leading-relaxed mb-8">Wir setzen auf modernste Technik, faire Preise und eine persönliche Betreuung – von der ersten Beratung bis zur finalen Abnahme.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, text: 'Meisterbetrieb' },
                { icon: Flame, text: 'Faire Preise' },
                { icon: Clock, text: 'Termingerecht' },
                { icon: BadgeCheck, text: 'Zufriedenheitsgarantie' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                  <item.icon className="w-5 h-5 text-fire shrink-0" />
                  <span className="text-sm font-medium text-navy">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Bewertungen ─── */
const reviews = [
  { name: 'Boškan Diana', rating: 5, text: 'Nach dem Schock des Wasserschadens waren wir völlig überfordert – aber das Team war sofort da, unglaublich freundlich und einfach professionell. Alles wurde schnell, sauber und zuverlässig erledigt. Wir sind unglaublich dankbar und können den Service wärmstens empfehlen!', time: 'vor 10 Monaten' },
  { name: 'Lovro Marketing', rating: 5, text: 'Exzellenter Service. Wir hatten einen Notfall und Sanitherm Plus konnte sehr schnell helfen und den Wasserschaden reparieren.', time: 'vor 2 Monaten' },
  { name: 'Vladimir Zizak', rating: 5, text: 'Mein Vermieter hat die Firma beauftragt, einige Arbeiten im Badezimmer durchzuführen. Ich bin sehr zufrieden; sie waren sehr höflich und sauber. Ich kann sie wärmstens empfehlen.', time: 'vor 10 Monaten' },
  { name: 'Darko Lovric', rating: 5, text: 'Sehr zufrieden mit der Arbeit. Professionell, pünktlich und sauber. Kann ich nur weiterempfehlen!', time: 'vor 3 Monaten' },
]

function Reviews() {
  return (
    <section id="bewertungen" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-fire font-semibold text-sm tracking-wider uppercase mb-4">Kundenstimmen</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy mb-6">Was unsere Kunden sagen</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-lg font-semibold text-navy">4.8 / 5</span>
            </div>
            <p className="text-text-muted">Basierend auf Google Bewertungen</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-warm-gray rounded-2xl p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-navy/80 leading-relaxed mb-6 text-[15px]">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-semibold text-navy text-sm">{review.name}</div>
                    <div className="text-text-muted text-xs">{review.time}</div>
                  </div>
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_24dp.png" alt="Google" width="20" height="20" loading="lazy" className="w-5 h-5 ml-auto" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Kontaktformular (Hybrid) ─── */
function ContactForm() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const openBooking = useCallback(() => setBookingOpen(true), [])
  const openForm = useCallback(() => setFormOpen(true), [])

  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Linke Spalte: Kontaktinfos */}
          <FadeIn className="w-full lg:w-5/12">
            <span className="inline-block text-fire font-semibold text-sm tracking-wider uppercase mb-4">Kontakt</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">Jetzt unverbindlich anfragen</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">Kurz Bescheid geben – wir rufen Sie schnellstmöglich zurück. Oder buchen Sie direkt einen Wunschtermin.</p>
            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Telefon', value: '+49 (0) 179 / 687 8779', href: 'tel:+491796878779' },
                { icon: Mail, label: 'E-Mail', value: 'info@sanitherm.plus', href: 'mailto:info@sanitherm.plus' },
                { icon: MapPin, label: 'Adresse', value: 'Kleinhaderner Str. 43B, 80689 München', href: '#karte' },
                { icon: Clock, label: 'Öffnungszeiten', value: 'Mo–Fr: 07:00 – 17:00 Uhr', href: undefined as string | undefined },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-fire-light" />
                  </div>
                  <div>
                    <div className="text-white/50 text-sm mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-white font-medium hover:text-fire-light transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-white font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Rechte Spalte: Aktions-Karten + Buttons */}
          <FadeIn delay={0.2} className="w-full lg:w-7/12 flex flex-col justify-center">

            {/* 3 Info-Karten */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Clock, title: 'Schnelle Reaktion', desc: 'Wir melden uns innerhalb von 30 Minuten zurück.' },
                { icon: Shield, title: 'Kostenlos & unverbindlich', desc: 'Keine versteckten Kosten, kein Risiko.' },
                { icon: CheckCircle, title: 'Meisterbetrieb', desc: 'Über 20 Jahre Erfahrung in München.' },
              ].map((card, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-fire/20 rounded-xl flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-fire" />
                  </div>
                  <p className="font-semibold text-white text-sm mb-1">{card.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Zwei Haupt-Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={SANITHERM_PHONE}
                className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-fire text-white font-semibold text-lg hover:bg-fire-dark transition-all shadow-xl shadow-fire/30 group"
              >
                <Phone className="w-6 h-6 group-hover:animate-bounce" />
                Jetzt anrufen
              </a>
              <button
                onClick={openForm}
                className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border-2 border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                <Mail className="w-6 h-6" />
                Anfrage senden
              </button>
            </div>

            <button
              onClick={openBooking}
              className="mt-4 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl border border-white/10 text-white/60 font-medium hover:text-white hover:border-white/30 transition-all text-sm"
            >
              <Clock className="w-4 h-4" />
              Oder direkt einen Wunschtermin buchen
            </button>

          </FadeIn>
        </div>
      </div>

      {/* Modals – lazy loaded */}
      <Suspense fallback={null}>
        {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
        {formOpen && <FormModal onClose={() => setFormOpen(false)} />}
      </Suspense>
    </section>
  )
}

/* ─── Google Maps ─── */
function MapSection() {
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <section id="karte" className="relative">
      <div className="relative group cursor-pointer" onClick={() => setMapLoaded(true)}>
        {!mapLoaded ? (
          <div
            className="w-full h-[450px] bg-gray-200 flex flex-col items-center justify-center gap-3 hover:bg-gray-300 transition-colors"
            role="button"
            aria-label="Karte laden"
          >
            <MapPin className="w-10 h-10 text-navy/40" />
            <p className="text-navy/60 font-medium text-sm">Karte anzeigen</p>
          </div>
        ) : (
          <a href="https://www.google.com/maps/place/Sanitherm+Plus+GmbH/@48.1285012,11.4874069,17z" target="_blank" rel="noopener noreferrer" className="block relative group cursor-pointer">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.5!2d11.4874069!3d48.1285012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479dd9d9a476414d%3A0xeccb76599ca5a95c!2sSanitherm%20Plus%20GmbH!5e0!3m2!1sde!2sde!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sanitherm Plus GmbH Standort"
              className="w-full pointer-events-none"
            />
          </a>
        )}
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer({ onImpressum, onDatenschutz }: { onImpressum: () => void; onDatenschutz: () => void }) {
  return (
    <footer className="bg-navy-dark py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028621005/nDemuLrXPE7LoD3GGV97LE/sanitherm_logo_7e85b2a7.jpg"
                alt="Sanitherm Plus Logo"
                width="64"
                height="64"
                loading="lazy"
                className="h-16 w-16 rounded-xl object-cover shadow-lg"
              />
              <div>
                <div className="font-display font-bold text-lg text-white leading-tight">Sanitherm Plus</div>
                <div className="text-white/40 text-xs">GmbH · München</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">Ihr Meisterbetrieb für Heizung, Sanitär und Wasserschadenbeseitigung in München. Über 20 Jahre Erfahrung.</p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Navigation</h4>
            <div className="space-y-3">
              {[
                { label: 'Leistungen', href: '#leistungen' },
                { label: 'Über uns', href: '#ueber-uns' },
                { label: 'Bewertungen', href: '#bewertungen' },
                { label: 'Kontakt', href: '#kontakt' },
              ].map(link => (
                <a key={link.href} href={link.href} className="block text-white/50 hover:text-fire-light transition-colors text-sm">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+491796878779" className="flex items-center gap-2 text-white/50 hover:text-fire-light transition-colors"><Phone className="w-4 h-4" /> +49 (0) 179 / 687 8779</a>
              <a href="mailto:info@sanitherm.plus" className="flex items-center gap-2 text-white/50 hover:text-fire-light transition-colors"><Mail className="w-4 h-4" /> info@sanitherm.plus</a>
              <div className="flex items-center gap-2 text-white/50"><MapPin className="w-4 h-4 shrink-0" /> Kleinhaderner Str. 43B, 80689 München</div>
              <div className="flex items-center gap-2 text-white/50"><Clock className="w-4 h-4" /> Mo–Fr: 07:00 – 17:00 Uhr</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Sanitherm Plus GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <button onClick={onImpressum} className="text-white/30 hover:text-white/60 text-sm transition-colors">Impressum</button>
            <button onClick={onDatenschutz} className="text-white/30 hover:text-white/60 text-sm transition-colors">Datenschutz</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  const [showImpressum, setShowImpressum] = useState(false)
  const [showDatenschutz, setShowDatenschutz] = useState(false)

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <EmergencyBanner />
      <About />
      <Reviews />
      <ContactForm />
      <MapSection />
      <Footer onImpressum={() => setShowImpressum(true)} onDatenschutz={() => setShowDatenschutz(true)} />

      <Suspense fallback={null}>
        {showImpressum && <ImpressumModal onClose={() => setShowImpressum(false)} />}
        {showDatenschutz && <DatenschutzModal onClose={() => setShowDatenschutz(false)} />}
      </Suspense>
    </div>
  )
}
