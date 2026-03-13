'use client';

const t = 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease, border-color 0.3s ease';

const cardBase: React.CSSProperties = {
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--color-neutral-200)',
  overflow: 'hidden',
  transition: t,
};

export default function CardSpecimen() {
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
        Cards
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Image Card */}
        <div style={cardBase}>
          <div
            className="flex h-40 items-center justify-center"
            style={{
              backgroundColor: 'var(--color-primary-100)',
              transition: t,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-400)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="p-4" style={{ transition: t }}>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)' as unknown as number,
                color: 'var(--color-neutral-900)',
                margin: '0 0 0.5rem 0',
                transition: t,
              }}
            >
              Featured Article
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral-600)',
                margin: '0 0 1rem 0',
                lineHeight: 'var(--leading-relaxed)',
                transition: t,
              }}
            >
              A brief description of the card content that gives users context about what to expect.
            </p>
            <button
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)' as unknown as number,
                color: 'var(--color-primary-600)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: t,
              }}
            >
              Read more &rarr;
            </button>
          </div>
        </div>

        {/* Stat Card */}
        <div style={{ ...cardBase, padding: '1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-neutral-500)',
              margin: '0 0 0.25rem 0',
              transition: t,
            }}
          >
            Total Revenue
          </p>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)' as unknown as number,
              color: 'var(--color-neutral-900)',
              margin: '0 0 0.5rem 0',
              transition: t,
            }}
          >
            $45,231.89
          </p>
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-500)" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-success-600)',
                transition: t,
              }}
            >
              +20.1% from last month
            </span>
          </div>
        </div>

        {/* Profile Card */}
        <div style={{ ...cardBase, padding: '1.5rem' }} className="flex flex-col items-center text-center">
          <div
            className="mb-3 flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              backgroundColor: 'var(--color-secondary-100)',
              color: 'var(--color-secondary-600)',
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)' as unknown as number,
              transition: t,
            }}
          >
            JD
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)' as unknown as number,
              color: 'var(--color-neutral-900)',
              margin: '0 0 0.25rem 0',
              transition: t,
            }}
          >
            Jane Doe
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-neutral-500)',
              margin: '0 0 1rem 0',
              transition: t,
            }}
          >
            Product Designer
          </p>
          <div className="flex gap-3">
            {['primary', 'secondary', 'accent'].map((c) => (
              <div
                key={c}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `var(--color-${c}-100)`,
                  color: `var(--color-${c}-600)`,
                  transition: t,
                  cursor: 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div style={{ ...cardBase, padding: '1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)' as unknown as number,
              color: 'var(--color-primary-600)',
              margin: '0 0 0.5rem 0',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wider)',
              transition: t,
            }}
          >
            Pro Plan
          </p>
          <div className="mb-4 flex items-baseline gap-1">
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)' as unknown as number,
                color: 'var(--color-neutral-900)',
                transition: t,
              }}
            >
              $29
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral-500)',
                transition: t,
              }}
            >
              /month
            </span>
          </div>
          <ul className="mb-4 space-y-2">
            {['Unlimited projects', '50GB storage', 'Priority support', 'Advanced analytics'].map(
              (f) => (
                <li
                  key={f}
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neutral-700)',
                    transition: t,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-500)" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              )
            )}
          </ul>
          <button
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)' as unknown as number,
              padding: '0.625rem 1rem',
              backgroundColor: 'var(--color-primary-600)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: t,
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
