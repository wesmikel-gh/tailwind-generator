'use client';

const t = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease';

const navLinks = ['Dashboard', 'Projects', 'Team', 'Settings'];

const stats = [
  { label: 'Total Users', value: '2,847', change: '+12.5%', color: 'primary', up: true },
  { label: 'Revenue', value: '$45.2k', change: '+8.2%', color: 'success', up: true },
  { label: 'Active Projects', value: '23', change: '-2.4%', color: 'warning', up: false },
  { label: 'Conversion', value: '3.24%', change: '+4.1%', color: 'info', up: true },
];

const activities = [
  { user: 'Alice', action: 'created a new project', time: '2 min ago', color: 'primary' },
  { user: 'Bob', action: 'updated the design system', time: '15 min ago', color: 'secondary' },
  { user: 'Carol', action: 'deployed to production', time: '1 hr ago', color: 'success' },
  { user: 'Dave', action: 'reported a bug', time: '3 hrs ago', color: 'danger' },
  { user: 'Eve', action: 'joined the team', time: '5 hrs ago', color: 'info' },
];

export default function LayoutSpecimen() {
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
        Dashboard Layout
      </h3>

      <div
        className="overflow-hidden"
        style={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-neutral-200)',
          transition: t,
        }}
      >
        {/* Nav bar */}
        <nav
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            backgroundColor: 'var(--color-neutral-800)',
            transition: t,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{
                backgroundColor: 'var(--color-primary-500)',
                borderRadius: 'var(--radius-sm)',
                transition: t,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="flex gap-1">
              {navLinks.map((link, i) => (
                <span
                  key={link}
                  className="px-2.5 py-1 text-xs"
                  style={{
                    fontFamily: 'var(--font-body)',
                    borderRadius: 'var(--radius-md)',
                    color:
                      i === 0
                        ? 'var(--color-neutral-50)'
                        : 'var(--color-neutral-400)',
                    backgroundColor:
                      i === 0 ? 'var(--color-neutral-700)' : 'transparent',
                    fontWeight:
                      i === 0
                        ? ('var(--font-weight-medium)' as unknown as number)
                        : undefined,
                    transition: t,
                  }}
                >
                  {link}
                </span>
              ))}
            </div>
          </div>
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs"
            style={{
              backgroundColor: 'var(--color-secondary-500)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-weight-semibold)' as unknown as number,
              transition: t,
            }}
          >
            A
          </div>
        </nav>

        {/* Content */}
        <div
          className="p-4"
          style={{
            backgroundColor: 'var(--color-neutral-100)',
            transition: t,
          }}
        >
          {/* Stat cards */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-3"
                style={{
                  backgroundColor: 'var(--color-neutral-50)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-neutral-200)',
                  transition: t,
                }}
              >
                <p
                  className="mb-1 text-xs"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-neutral-500)',
                    margin: '0 0 0.25rem 0',
                    transition: t,
                  }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)' as unknown as number,
                    color: 'var(--color-neutral-900)',
                    margin: '0 0 0.25rem 0',
                    transition: t,
                  }}
                >
                  {s.value}
                </p>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: s.up
                      ? 'var(--color-success-600)'
                      : 'var(--color-danger-600)',
                    transition: t,
                  }}
                >
                  {s.change}
                </span>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div
            className="p-4"
            style={{
              backgroundColor: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-neutral-200)',
              transition: t,
            }}
          >
            <h4
              className="mb-3"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)' as unknown as number,
                color: 'var(--color-neutral-900)',
                margin: '0 0 0.75rem 0',
                transition: t,
              }}
            >
              Recent Activity
            </h4>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{
                    paddingBottom:
                      i < activities.length - 1 ? '0.75rem' : undefined,
                    borderBottom:
                      i < activities.length - 1
                        ? '1px solid var(--color-neutral-100)'
                        : undefined,
                    transition: t,
                  }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs"
                    style={{
                      backgroundColor: `var(--color-${a.color}-100)`,
                      color: `var(--color-${a.color}-600)`,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)' as unknown as number,
                      transition: t,
                    }}
                  >
                    {a.user[0]}
                  </div>
                  <div className="flex-1">
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-neutral-800)',
                        margin: 0,
                        transition: t,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 'var(--font-weight-medium)' as unknown as number,
                        }}
                      >
                        {a.user}
                      </span>{' '}
                      {a.action}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-neutral-400)',
                      transition: t,
                    }}
                  >
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
