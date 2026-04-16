import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function DatenschutzModal({ onClose }: { onClose: () => void }) {
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
          <h2 className="text-2xl font-display font-bold text-navy">Datenschutzerklärung</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-navy" />
          </button>
        </div>
        <div className="px-8 py-6 space-y-6 text-navy/80 text-sm leading-relaxed">
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">1. Datenschutz auf einen Blick</h3>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">2. Verantwortliche Stelle</h3>
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
            Sanitherm Plus GmbH<br />
            Kleinhaderner Str. 43B<br />
            80689 München<br />
            Telefon: +49 (0) 179 / 687 8779<br />
            E-Mail: info@sanitherm.plus</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">3. Datenerfassung auf dieser Website</h3>
            <p><strong>Kontaktformular:</strong> Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">4. Server-Log-Dateien</h3>
            <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">5. Google Maps</h3>
            <p>Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">6. Ihre Rechte</h3>
            <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-navy text-base mb-2">7. Beschwerderecht</h3>
            <p>Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren. Die zuständige Aufsichtsbehörde in Bayern ist der Bayerische Landesbeauftragte für den Datenschutz (BayLfD), Wagmüllerstraße 18, 80538 München.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
