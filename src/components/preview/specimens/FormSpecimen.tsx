'use client';

const t = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease';

const inputBase: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
  padding: '0.5rem 0.75rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-neutral-300)',
  backgroundColor: 'var(--color-neutral-50)',
  color: 'var(--color-neutral-900)',
  outline: 'none',
  transition: t,
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
  fontWeight: 'var(--font-weight-medium)' as unknown as number,
  color: 'var(--color-neutral-700)',
  display: 'block',
  marginBottom: '0.375rem',
  transition: t,
};

export default function FormSpecimen() {
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
        Form Elements
      </h3>

      <div className="max-w-md space-y-5">
        {/* Text input */}
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            readOnly
            style={inputBase}
          />
        </div>

        {/* Email with error */}
        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            defaultValue="invalid-email"
            readOnly
            style={{
              ...inputBase,
              borderColor: 'var(--color-danger-500)',
              boxShadow: '0 0 0 3px var(--color-danger-100)',
            }}
          />
          <p
            className="mt-1"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-danger-600)',
              transition: t,
            }}
          >
            Please enter a valid email address.
          </p>
        </div>

        {/* Select */}
        <div>
          <label style={labelStyle}>Department</label>
          <select style={{ ...inputBase, cursor: 'pointer' }} defaultValue="engineering">
            <option value="" disabled>
              Select a department
            </option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
          </select>
        </div>

        {/* Checkbox group */}
        <fieldset className="space-y-2">
          <legend style={{ ...labelStyle, marginBottom: '0.5rem' }}>Preferences</legend>
          {['Email notifications', 'SMS alerts', 'Weekly digest'].map((label, i) => (
            <label
              key={label}
              className="flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral-700)',
                cursor: 'pointer',
                transition: t,
              }}
            >
              <input
                type="checkbox"
                defaultChecked={i === 0}
                style={{
                  accentColor: 'var(--color-primary-600)',
                  width: '1rem',
                  height: '1rem',
                }}
              />
              {label}
            </label>
          ))}
        </fieldset>

        {/* Radio group */}
        <fieldset className="space-y-2">
          <legend style={{ ...labelStyle, marginBottom: '0.5rem' }}>Priority</legend>
          {['Low', 'Medium', 'High'].map((label, i) => (
            <label
              key={label}
              className="flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral-700)',
                cursor: 'pointer',
                transition: t,
              }}
            >
              <input
                type="radio"
                name="priority"
                defaultChecked={i === 1}
                style={{
                  accentColor: 'var(--color-primary-600)',
                  width: '1rem',
                  height: '1rem',
                }}
              />
              {label}
            </label>
          ))}
        </fieldset>

        {/* Toggle switch */}
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)' as unknown as number,
              color: 'var(--color-neutral-700)',
              transition: t,
            }}
          >
            Enable dark mode
          </span>
          <button
            type="button"
            role="switch"
            aria-checked="true"
            className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full"
            style={{
              backgroundColor: 'var(--color-primary-600)',
              border: 'none',
              cursor: 'pointer',
              transition: t,
            }}
          >
            <span
              className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
              style={{
                transform: 'translateX(1.375rem)',
                transition: 'transform 0.2s ease',
              }}
            />
          </button>
        </div>

        {/* Textarea */}
        <div>
          <label style={labelStyle}>Message</label>
          <textarea
            rows={3}
            placeholder="Write your message..."
            readOnly
            style={{
              ...inputBase,
              resize: 'vertical',
            }}
          />
        </div>

        {/* Submit */}
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
            boxShadow: 'var(--shadow-sm)',
            transition: t,
          }}
        >
          Submit Form
        </button>
      </div>
    </section>
  );
}
