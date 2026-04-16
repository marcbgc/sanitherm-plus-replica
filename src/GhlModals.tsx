import { useEffect } from 'react'
import { X, Clock, Mail } from 'lucide-react'

const GHL_BOOKING_URL = 'https://api.velixq.com/widget/booking/zahdX9PVlcZAP6RU9Lj3'
const GHL_FORM_URL = 'https://api.velixq.com/widget/form/TQaggCOg1bTAYyxMtqX1'

type Props = { onClose: () => void }

function useModalEffects(onClose: () => void) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])
}

export function BookingModal({ onClose }: Props) {
  useModalEffects(onClose)

  return (
    <div className="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-navy">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fire/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-fire" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-white">Termin vereinbaren</p>
              <p className="text-xs text-white/50">Kostenlos & unverbindlich · Sanitherm Plus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto bg-white" style={{ maxHeight: 'calc(90vh - 72px)' }}>
          <iframe
            src={GHL_BOOKING_URL}
            scrolling="yes"
            style={{ width: '100%', minHeight: '650px', border: 'none', display: 'block' }}
            title="Termin buchen – Sanitherm Plus"
          />
        </div>
      </div>
    </div>
  )
}

export function FormModal({ onClose }: Props) {
  useModalEffects(onClose)

  return (
    <div className="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-navy">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fire/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-fire" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-white">Anfrage senden</p>
              <p className="text-xs text-white/50">Kostenlos & unverbindlich · Sanitherm Plus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto bg-white" style={{ maxHeight: 'calc(90vh - 72px)' }}>
          <iframe
            src={GHL_FORM_URL}
            scrolling="yes"
            style={{ width: '100%', minHeight: '500px', border: 'none', display: 'block' }}
            title="Anfrage senden – Sanitherm Plus"
          />
        </div>
      </div>
    </div>
  )
}
