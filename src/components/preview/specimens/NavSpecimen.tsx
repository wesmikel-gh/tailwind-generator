'use client';

const t = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease';

const navLinks = ['Home', 'Features', 'Pricing', 'About'];

export default function NavSpecimen() {
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
        Navigation
      </h3>

      <nav
        className="flex items-center justify-between px-6 py-3"
        style={{
          backgroundColor: 'var(--color-neutral-50)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-neutral-200)',
          boxShadow: 'var(--shadow-sm)',
          transition: t,
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{
              backgroundColor: 'var(--color-primary-600)',
              borderRadius: 'var(--radius-md)',
              transition: t,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)' as unknown as number,
              color: 'var(--color-neutral-900)',
              transition: t,
            }}
          >
            Acme
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-3 py-1.5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight:
                  i === 0
                    ? ('var(--font-weight-semibold)' as unknown as number)
                    : ('var(--font-weight-normal)' as unknown as number),
                color:
                  i === 0
                    ? 'var(--color-primary-600)'
                    : 'var(--color-neutral-600)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                backgroundColor:
                  i === 0 ? 'var(--color-primary-50)' : 'transparent',
                transition: t,
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)' as unknown as number,
            padding: '0.5rem 1rem',
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
      </nav>
    </section>
  );
}
