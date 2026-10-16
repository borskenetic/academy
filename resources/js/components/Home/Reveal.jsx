import useReveal from '../../hooks/useReveal'

/** Wrapper that fades/slides its content in when it enters the viewport. */
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}