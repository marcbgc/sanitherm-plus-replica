import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function ImpressumModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white rounded-t-3xl px-8 pt-8 pb-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-navy">Impressum</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-navy" />
          </button>
        </div>
        <div className="px-8 py-6 space-y-6 text-navy/80 text-sm leading-relaxed">
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Angaben gemäß § 5 TMG</h3>
            <p>Sanitherm Plus GmbH<br />
            Kleinhaderner Str. 43B<br />
            80689 München</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Kontakt</h3>
            <p>Telefon: +49 (0) 179 / 687 8779<br />
            E-Mail: info@sanitherm.plus</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Handelsregister</h3>
            <p>Eingetragen im Handelsregister.<br />
            Registergericht: Amtsgericht München</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Umsatzsteuer-ID</h3>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            Auf Anfrage erhältlich.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p>Sanitherm Plus GmbH<br />
            Kleinhaderner Str. 43B<br />
            80689 München</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Haftung für Inhalte</h3>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Haftung für Links</h3>
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Urheberrecht</h3>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
