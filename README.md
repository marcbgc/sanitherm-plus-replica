# Sanitherm Plus GmbH – Website (Optimiert)

Moderne, hochkonvertierende Website für die Sanitherm Plus GmbH – Meisterbetrieb für Heizung, Sanitär und Wasserschadenbeseitigung in München.

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 4
- **Animationen:** CSS + IntersectionObserver (kein framer-motion)
- **Icons:** Lucide React
- **Fonts:** Montserrat (Headlines) + Inter (Body)

## Performance-Optimierungen

- Preconnect zu CloudFront und Google Fonts
- Hero-Bild via `<link rel="preload">` mit `fetchpriority="high"`
- Google Fonts non-blocking geladen, nur 4 Gewichte statt 10
- Framer Motion entfernt (~120 kB gzipped Bundle-Ersparnis)
- Code-Splitting: Impressum, Datenschutz und beide GHL-Modals als Lazy-Chunks
- Explizite Bild-Dimensionen gegen Layout-Shift (CLS)
- Passive Scroll-Listener
- `prefers-reduced-motion` Support

## Features

- Responsive Design (Mobile-first)
- Sticky Navigation mit Notdienst-CTA
- Hero mit Typewriter-Effekt und animiertem Counter
- Leistungs-Grid mit Bildern
- Wasserschaden-Notfall-Banner
- Google Bewertungen
- GHL-Integration (Buchungskalender + Anfrageformular)
- Google Maps (klickbar, lazy)
- Smooth Scroll Animationen
- SEO-optimierte Meta-Tags

## Installation & Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Build lokal testen
npm run preview
```

## Deployment

Die Website wird als statische Seite gehostet.

1. Code nach GitHub pushen
2. Hosting-Dienst mit dem Repository verbinden (Cloudflare Pages, Vercel, Netlify)
3. Build Command: `npm run build`
4. Output Directory: `dist`

## Kontakt

Sanitherm Plus GmbH
Kleinhaderner Str. 43B, 80689 München
Tel: +49 (0) 179 / 687 8779
E-Mail: info@sanitherm.plus
