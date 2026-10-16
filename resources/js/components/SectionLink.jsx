import { Link } from '@inertiajs/react'

/**
 * Replaces links like `index.html#learning-areas` (cross-page section anchor).
 * The hash is applied to the URL here and consumed by useScrollToHash once the
 * Inertia visit completes.
 */
export default function SectionLink({ to, hash = '', children, ...rest }) {
  return (
    <Link href={hash ? `${to}#${hash}` : to} {...rest}>
      {children}
    </Link>
  )
}
