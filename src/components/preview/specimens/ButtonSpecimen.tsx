'use client';

const t = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease';

const sizes = {
  sm: { fontSize: 'var(--text-xs)', padding: '0.375rem 0.75rem' },
  md: { fontSize: 'var(--text-sm)', padding: '0.5rem 1rem' },
  lg: { fontSize: 'var(--text-base)', padding: '0.625rem 1.5rem' },
} as const;

type Size = keyof typeof sizes;

function Btn({
  children,
  style,
  disabled,
  size = 'md',
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  disabled?: boolean;
  size?: Size;
}) {
  const s = sizes[size];
  return (
    <button
      disabled={disabled}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--font-weight-medium)' as unknown as number,
        fontSize: s.fontSize,
        padding: s.padding,
        borderRadius: 'var(--radius-md)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: t,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export default function ButtonSpecimen() {
  return (
    <section className="space-y-6">
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <h3
        className="text-xs font-semibold uppercase tracking-wider"
        style={{
          color: 'var(--color-neutral-400)',
          letterSpacing: 'var(--tracking-widest)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Buttons
      </h3>

      {/* Primary */}
      <div className="space-y-2">
        <p className="text-xs" style={{ color: 'var(--color-neutral-500)', fontFamily: 'var(--font-body)' }}>
          Primary
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {(['sm', 'md', 'lg'] as Size[]).map((size) => (
            <Btn
              key={size}
              size={size}
              style={{
                backgroundColor: 'var(--color-primary-600)',
                color: '#fff',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              Button {size}
            </Btn>
          ))}
          <Btn
            disabled
            style={{
              backgroundColor: 'var(--color-primary-600)',
              color: '#fff',
            }}
          >
            Disabled
          </Btn>
          <Btn
            style={{
              backgroundColor: 'var(--color-primary-600)',
              color: '#fff',
            }}
          >
            <LoadingSpinner />
            Loading
          </Btn>
        </div>
      </div>

      {/* Secondary */}
      <div className="space-y-2">
        <p className="text-xs" style={{ color: 'var(--color-neutral-500)', fontFamily: 'var(--font-body)' }}>
          Secondary
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {(['sm', 'md', 'lg'] as Size[]).map((size) => (
            <Btn
              key={size}
              size={size}
              style={{
                backgroundColor: 'var(--color-secondary-600)',
                color: '#fff',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              Button {size}
            </Btn>
          ))}
        </div>
      </div>

      {/* Outline */}
      <div className="space-y-2">
        <p className="text-xs" style={{ color: 'var(--color-neutral-500)', fontFamily: 'var(--font-body)' }}>
          Outline
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {(['sm', 'md', 'lg'] as Size[]).map((size) => (
            <Btn
              key={size}
              size={size}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-primary-600)',
                border: '1px solid var(--color-primary-300)',
              }}
            >
              Button {size}
            </Btn>
          ))}
        </div>
      </div>

      {/* Ghost */}
      <div className="space-y-2">
        <p className="text-xs" style={{ color: 'var(--color-neutral-500)', fontFamily: 'var(--font-body)' }}>
          Ghost
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {(['sm', 'md', 'lg'] as Size[]).map((size) => (
            <Btn
              key={size}
              size={size}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-neutral-700)',
              }}
            >
              Button {size}
            </Btn>
          ))}
        </div>
      </div>

      {/* Destructive */}
      <div className="space-y-2">
        <p className="text-xs" style={{ color: 'var(--color-neutral-500)', fontFamily: 'var(--font-body)' }}>
          Destructive
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {(['sm', 'md', 'lg'] as Size[]).map((size) => (
            <Btn
              key={size}
              size={size}
              style={{
                backgroundColor: 'var(--color-danger-600)',
                color: '#fff',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              Delete {size}
            </Btn>
          ))}
        </div>
      </div>
    </section>
  );
}
