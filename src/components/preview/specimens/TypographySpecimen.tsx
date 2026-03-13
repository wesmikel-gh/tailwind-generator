'use client';

const transitionStyle = 'color 0.3s ease, font-family 0.3s ease, font-size 0.3s ease';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const headingLevels: { tag: HeadingTag; size: string; label: string }[] = [
  { tag: 'h1', size: '5xl', label: 'Heading 1' },
  { tag: 'h2', size: '4xl', label: 'Heading 2' },
  { tag: 'h3', size: '3xl', label: 'Heading 3' },
  { tag: 'h4', size: '2xl', label: 'Heading 4' },
  { tag: 'h5', size: 'xl', label: 'Heading 5' },
  { tag: 'h6', size: 'lg', label: 'Heading 6' },
];

export default function TypographySpecimen() {
  return (
    <section className="space-y-6">
      <h3
        className="text-xs font-semibold uppercase tracking-wider"
        style={{
          color: 'var(--color-neutral-400)',
          letterSpacing: 'var(--tracking-widest)',
          fontFamily: 'var(--font-body)',
          transition: transitionStyle,
        }}
      >
        Typography
      </h3>

      {/* Headings */}
      <div className="space-y-4">
        {headingLevels.map(({ tag, size, label }) => {
          const Tag = tag;
          return (
            <div key={label} className="flex items-baseline gap-4">
              <Tag
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: `var(--text-${size})`,
                  fontWeight: 'var(--font-weight-bold)' as unknown as number,
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-neutral-900)',
                  transition: transitionStyle,
                  margin: 0,
                }}
              >
                {label}
              </Tag>
              <span
                className="shrink-0 text-xs"
                style={{
                  color: 'var(--color-neutral-400)',
                  fontFamily: 'var(--font-mono)',
                  transition: transitionStyle,
                }}
              >
                {tag} / var(--text-{size})
              </span>
            </div>
          );
        })}
      </div>

      {/* Body text */}
      <div className="space-y-3">
        <div className="flex items-baseline gap-4">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-neutral-700)',
              transition: transitionStyle,
              margin: 0,
              maxWidth: '65ch',
            }}
          >
            Body text renders in the body font family at the base size. This paragraph
            demonstrates how running prose looks with your chosen design tokens, including
            line height and letter spacing adjustments.
          </p>
          <span
            className="shrink-0 text-xs"
            style={{
              color: 'var(--color-neutral-400)',
              fontFamily: 'var(--font-mono)',
              transition: transitionStyle,
            }}
          >
            body / var(--text-base)
          </span>
        </div>

        {/* Caption */}
        <div className="flex items-baseline gap-4">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-neutral-500)',
              transition: transitionStyle,
              margin: 0,
            }}
          >
            Caption text for supplementary information
          </p>
          <span
            className="shrink-0 text-xs"
            style={{
              color: 'var(--color-neutral-400)',
              fontFamily: 'var(--font-mono)',
              transition: transitionStyle,
            }}
          >
            caption / var(--text-xs)
          </span>
        </div>

        {/* Label */}
        <div className="flex items-baseline gap-4">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)' as unknown as number,
              color: 'var(--color-neutral-700)',
              letterSpacing: 'var(--tracking-wide)',
              transition: transitionStyle,
            }}
          >
            Form Label
          </span>
          <span
            className="shrink-0 text-xs"
            style={{
              color: 'var(--color-neutral-400)',
              fontFamily: 'var(--font-mono)',
              transition: transitionStyle,
            }}
          >
            label / var(--text-sm)
          </span>
        </div>

        {/* Link */}
        <div className="flex items-baseline gap-4">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-primary-600)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              transition: transitionStyle,
            }}
          >
            This is a hyperlink
          </a>
          <span
            className="shrink-0 text-xs"
            style={{
              color: 'var(--color-neutral-400)',
              fontFamily: 'var(--font-mono)',
              transition: transitionStyle,
            }}
          >
            link / primary-600
          </span>
        </div>

        {/* Inline code */}
        <div className="flex items-baseline gap-4">
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-danger-600)',
              backgroundColor: 'var(--color-neutral-100)',
              padding: '0.125rem 0.375rem',
              borderRadius: 'var(--radius-sm)',
              transition: `${transitionStyle}, background-color 0.3s ease`,
            }}
          >
            const token = &quot;inline code&quot;;
          </code>
          <span
            className="shrink-0 text-xs"
            style={{
              color: 'var(--color-neutral-400)',
              fontFamily: 'var(--font-mono)',
              transition: transitionStyle,
            }}
          >
            mono / var(--text-sm)
          </span>
        </div>
      </div>
    </section>
  );
}
