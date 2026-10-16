function Emblem({ className, children }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const TechnologyIcon = ({ className }) => (
  <Emblem className={className}>
    <rect x="9" y="10" width="30" height="19" rx="4" />
    <path d="M19 39h10M24 29v10" />
    <path d="M20 19l-3 3 3 3M28 19l3 3-3 3" />
  </Emblem>
)

export const DataIcon = ({ className }) => (
  <Emblem className={className}>
    <rect x="11" y="27" width="7" height="10" rx="2" />
    <rect x="20.5" y="19" width="7" height="18" rx="2" />
    <rect x="30" y="12" width="7" height="25" rx="2" />
    <path d="M14.5 27L24 21l9.5-7" />
    <circle cx="14.5" cy="27" r="1.6" />
    <circle cx="24" cy="21" r="1.6" />
    <circle cx="33.5" cy="13" r="1.6" />
  </Emblem>
)

export const SecurityIcon = ({ className }) => (
  <Emblem className={className}>
    <path d="M24 8l14 5v9.5C38 31.2 32 36.6 24 39 16 36.6 10 31.2 10 22.5V13z" />
    <path d="M17 24h14M24 24v-6" />
    <circle cx="19" cy="24" r="1.4" />
    <circle cx="29" cy="24" r="1.4" />
    <circle cx="24" cy="18" r="1.4" />
  </Emblem>
)

export const CloudIcon = ({ className }) => (
  <Emblem className={className}>
    <path d="M14 28a5 5 0 0 1 .5-9.97A6.5 6.5 0 0 1 27.6 15.8a6.2 6.2 0 0 1 6.9 5.4A4.5 4.5 0 0 1 33.4 28z" />
    <path d="M24 28v4M18 32h12" />
    <circle cx="20" cy="33.5" r="1.2" />
    <circle cx="28" cy="33.5" r="1.2" />
  </Emblem>
)

export const LeadershipIcon = ({ className }) => (
  <Emblem className={className}>
    <circle cx="24" cy="24" r="3.6" />
    <path d="M24 13.5v7M14.5 29l6.5-4.4M33.5 29l-6.5-4.4M24 34v5" />
    <circle cx="24" cy="11" r="2.2" />
    <circle cx="12" cy="30" r="2.2" />
    <circle cx="36" cy="30" r="2.2" />
    <circle cx="24" cy="37" r="2.2" />
  </Emblem>
)

export const BusinessIcon = ({ className }) => (
  <Emblem className={className}>
    <rect x="9" y="19" width="30" height="15" rx="3" />
    <path d="M16 19v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
    <path d="M24 27v5" />
    <path d="M38 10l5 5M38 15h5v-5" />
  </Emblem>
)

export const DevOpsIcon = ({ className }) => (
  <Emblem className={className}>
    <path d="M10 26h24" />
    <circle cx="14" cy="26" r="2" />
    <circle cx="24" cy="26" r="2" />
    <circle cx="34" cy="26" r="2" />
    <path d="M41 13a11 11 0 1 0 4 12M41 13v5M41 13h-5" />
  </Emblem>
)

export const AIIcon = ({ className }) => (
  <Emblem className={className}>
    <circle cx="14" cy="13" r="2" />
    <circle cx="24" cy="13" r="2" />
    <circle cx="34" cy="13" r="2" />
    <circle cx="19" cy="24" r="2" />
    <circle cx="29" cy="24" r="2" />
    <circle cx="24" cy="35" r="2" />
    <path d="M24 15v7M15 15l4 7M33 15l-4 7M21 26l3 7M27 26l-3 7" />
  </Emblem>
)