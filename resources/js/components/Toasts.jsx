import { useEffect, useRef } from 'react'
import { usePage } from '@inertiajs/react'
import { useUI } from '../context/UIContext'

export default function Toasts() {
  const { toasts, showToast } = useUI()
  const { flash } = usePage().props
  const lastFlash = useRef(null)

  // Server flash messages (e.g. "Application submitted!") are surfaced through
  // the same toast queue the UI used before the backend existed.
  useEffect(() => {
    const message = flash?.success || flash?.error
    if (!message || lastFlash.current === message) return

    lastFlash.current = message
    showToast(message, flash?.success ? 'success' : 'error')
  }, [flash, showToast])

  return (
    <div className="toast-container" id="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast" role="status">
          {t.message}
        </div>
      ))}
    </div>
  )
}