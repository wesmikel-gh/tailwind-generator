'use client';

const t = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease';

const rows = [
  { name: 'Olivia Martin', email: 'olivia@example.com', role: 'Admin', status: 'Active', statusColor: 'success' },
  { name: 'Jackson Lee', email: 'jackson@example.com', role: 'Editor', status: 'Active', statusColor: 'success' },
  { name: 'Isabella Nguyen', email: 'isabella@example.com', role: 'Viewer', status: 'Inactive', statusColor: 'neutral' },
  { name: 'William Chen', email: 'william@example.com', role: 'Editor', status: 'Active', statusColor: 'success' },
  { name: 'Sofia Davis', email: 'sofia@example.com', role: 'Admin', status: 'Pending', statusColor: 'warning' },
];

const headers = ['Name', 'Email', 'Role', 'Status'];

export default function TableSpecimen() {
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
        Data Table
      </h3>

      <div
        className="overflow-hidden"
        style={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-neutral-200)',
          transition: t,
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--color-neutral-700)',
                transition: t,
              }}
            >
              {headers.map((h) => (
                <th
                  key={h}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)' as unknown as number,
                    color: 'var(--color-neutral-100)',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    transition: t,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.email}
                style={{
                  backgroundColor:
                    i % 2 === 0
                      ? 'var(--color-neutral-50)'
                      : 'transparent',
                  borderTop: '1px solid var(--color-neutral-100)',
                  transition: t,
                }}
                className="hover-row"
              >
                <td
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)' as unknown as number,
                    color: 'var(--color-neutral-900)',
                    padding: '0.75rem 1rem',
                    transition: t,
                  }}
                >
                  {row.name}
                </td>
                <td
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neutral-600)',
                    padding: '0.75rem 1rem',
                    transition: t,
                  }}
                >
                  {row.email}
                </td>
                <td
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neutral-600)',
                    padding: '0.75rem 1rem',
                    transition: t,
                  }}
                >
                  {row.role}
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)' as unknown as number,
                      padding: '0.125rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: `var(--color-${row.statusColor}-100)`,
                      color: `var(--color-${row.statusColor}-700)`,
                      transition: t,
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
