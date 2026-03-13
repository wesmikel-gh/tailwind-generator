'use client';

const t = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease';

const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;

export default function BadgeSpecimen() {
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
        Badges
      </h3>

      {/* Solid */}
      <div className="space-y-2">
        <p
          className="text-xs"
          style={{
            color: 'var(--color-neutral-500)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Solid
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {colors.map((c) => (
            <span
              key={c}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)' as unknown as number,
                padding: '0.125rem 0.625rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: `var(--color-${c}-100)`,
                color: `var(--color-${c}-700)`,
                transition: t,
              }}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Outline */}
      <div className="space-y-2">
        <p
          className="text-xs"
          style={{
            color: 'var(--color-neutral-500)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Outline
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {colors.map((c) => (
            <span
              key={c}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)' as unknown as number,
                padding: '0.125rem 0.625rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'transparent',
                color: `var(--color-${c}-600)`,
                border: `1px solid var(--color-${c}-300)`,
                transition: t,
              }}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
