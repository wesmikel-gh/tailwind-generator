'use client';

const t = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease';

const alerts = [
  {
    variant: 'success',
    title: 'Success',
    message: 'Your changes have been saved successfully.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    variant: 'warning',
    title: 'Warning',
    message: 'Your session will expire in 5 minutes.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    variant: 'danger',
    title: 'Error',
    message: 'There was a problem processing your request.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    variant: 'info',
    title: 'Information',
    message: 'A new software update is available for download.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
];

export default function AlertSpecimen() {
  return (
    <section className="space-y-6">
      <h3
        className="text-xs font-semibold uppercase tracking-wider"
        style={{
          color: 'var(--color-neutral-400)',
          letterSpacing: 'var(--tracking-widest)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Alerts
      </h3>

      <div className="space-y-3">
        {alerts.map(({ variant, title, message, icon }) => (
          <div
            key={variant}
            className="flex items-start gap-3 px-4 py-3"
            style={{
              backgroundColor: `var(--color-${variant}-50)`,
              border: `1px solid var(--color-${variant}-200)`,
              borderRadius: 'var(--radius-lg)',
              color: `var(--color-${variant}-700)`,
              transition: t,
            }}
          >
            <span className="mt-0.5 shrink-0" style={{ color: `var(--color-${variant}-500)` }}>
              {icon}
            </span>
            <div className="flex-1">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)' as unknown as number,
                  margin: '0 0 0.125rem 0',
                  color: `var(--color-${variant}-800)`,
                  transition: t,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  margin: 0,
                  color: `var(--color-${variant}-700)`,
                  transition: t,
                }}
              >
                {message}
              </p>
            </div>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: `var(--color-${variant}-400)`,
                padding: '0.25rem',
                transition: t,
              }}
              title="Dismiss"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
