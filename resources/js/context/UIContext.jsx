import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null) // 'search' | 'register' | null
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const openModal = useCallback((name) => setActiveModal(name), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  const showToast = useCallback((message, type = 'success') => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const value = useMemo(
    () => ({ activeModal, openModal, closeModal, toasts, showToast }),
    [activeModal, openModal, closeModal, toasts, showToast]
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within a UIProvider')
  return ctx
}