'use client';

import { useCallback, useRef, useState } from 'react';

interface ExportActionsProps {
  code: string;
  version: '3' | '4';
  themeName: string;
}

export function ExportActions({ code, version, themeName }: ExportActionsProps) {
  const [copyLabel, setCopyLabel] = useState('Copy to Clipboard');
  const copyTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);

  // ---- Copy to Clipboard ----
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyLabel('Copied!');
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopyLabel('Copy to Clipboard'), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyLabel('Copied!');
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopyLabel('Copy to Clipboard'), 2000);
    }
  }, [code]);

  // ---- Download Config ----
  const handleDownloadConfig = useCallback(() => {
    const filename = version === '3' ? 'tailwind.config.js' : 'theme.css';
    const mimeType = version === '3' ? 'application/javascript' : 'text/css';
    const blob = new Blob([code], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [code, version]);

  // ---- Download Starter Kit ----
  const handleDownloadStarterKit = useCallback(async () => {
    setIsGeneratingZip(true);
    try {
      const [JSZip, { saveAs }] = await Promise.all([
        import('jszip').then((m) => m.default),
        import('file-saver'),
      ]);

      const zip = new JSZip();
      const slug = themeName.toLowerCase().replace(/\s+/g, '-');

      // 1. Config file
      if (version === '3') {
        zip.file('tailwind.config.js', code);
      } else {
        zip.file('theme.css', code);
      }

      // 2. package.json
      const packageJson = JSON.stringify(
        {
          name: slug || 'tailwind-theme',
          version: '1.0.0',
          private: true,
          scripts: {
            dev: version === '3'
              ? 'npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch'
              : 'npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch',
            build: version === '3'
              ? 'npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify'
              : 'npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --minify',
          },
          devDependencies: version === '3'
            ? { tailwindcss: '^3.4.0', autoprefixer: '^10.4.0', postcss: '^8.4.0' }
            : { tailwindcss: '^4.0.0', '@tailwindcss/cli': '^4.0.0' },
        },
        null,
        2,
      );
      zip.file('package.json', packageJson);

      // 3. src/input.css
      const inputCss = version === '3'
        ? '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n'
        : '@import "./theme.css";\n';

      const srcFolder = zip.folder('src')!;
      srcFolder.file('input.css', inputCss);

      // If v4, also put theme.css inside src/ for the import to work
      if (version === '4') {
        srcFolder.file('theme.css', code);
      }

      // 4. index.html
      const indexHtml = buildSampleHtml(version, themeName);
      zip.file('index.html', indexHtml);

      // 5. README.md
      const readme = buildReadme(version, themeName);
      zip.file('README.md', readme);

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${slug || 'tailwind-theme'}-starter.zip`);
    } catch (err) {
      console.error('Failed to generate starter kit:', err);
    } finally {
      setIsGeneratingZip(false);
    }
  }, [code, version, themeName]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Copy */}
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          copyLabel === 'Copied!'
            ? 'bg-green-600 text-white'
            : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
        }`}
      >
        {copyLabel === 'Copied!' ? (
          <CheckIcon />
        ) : (
          <ClipboardIcon />
        )}
        {copyLabel}
      </button>

      {/* Download Config */}
      <button
        type="button"
        onClick={handleDownloadConfig}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors duration-200"
      >
        <DownloadIcon />
        Download Config
      </button>

      {/* Download Starter Kit */}
      <button
        type="button"
        onClick={handleDownloadStarterKit}
        disabled={isGeneratingZip}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isGeneratingZip ? (
          <SpinnerIcon />
        ) : (
          <PackageIcon />
        )}
        {isGeneratingZip ? 'Generating...' : 'Download Starter Kit'}
      </button>
    </div>
  );
}

// ---- Helper: sample HTML ----
function buildSampleHtml(version: '3' | '4', themeName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${themeName} - Tailwind Theme</title>
  <link href="./dist/output.css" rel="stylesheet" />
</head>
<body class="bg-neutral-50 text-neutral-900 min-h-screen">
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-primary-600 mb-4">${themeName}</h1>
    <p class="text-lg text-neutral-600 mb-8">
      Your custom Tailwind CSS theme is ready. Edit the ${version === '3' ? 'tailwind.config.js' : 'theme.css'} file to customize.
    </p>

    <!-- Color swatches -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Colors</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="rounded-lg overflow-hidden shadow-sm">
          <div class="h-20 bg-primary-500"></div>
          <div class="p-2 text-sm text-center bg-white">Primary</div>
        </div>
        <div class="rounded-lg overflow-hidden shadow-sm">
          <div class="h-20 bg-secondary-500"></div>
          <div class="p-2 text-sm text-center bg-white">Secondary</div>
        </div>
        <div class="rounded-lg overflow-hidden shadow-sm">
          <div class="h-20 bg-accent-500"></div>
          <div class="p-2 text-sm text-center bg-white">Accent</div>
        </div>
        <div class="rounded-lg overflow-hidden shadow-sm">
          <div class="h-20 bg-neutral-500"></div>
          <div class="p-2 text-sm text-center bg-white">Neutral</div>
        </div>
      </div>
    </section>

    <!-- Buttons -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Buttons</h2>
      <div class="flex flex-wrap gap-3">
        <button class="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors">
          Primary
        </button>
        <button class="px-4 py-2 rounded-md bg-secondary-600 text-white hover:bg-secondary-700 transition-colors">
          Secondary
        </button>
        <button class="px-4 py-2 rounded-md bg-success-600 text-white hover:bg-success-700 transition-colors">
          Success
        </button>
        <button class="px-4 py-2 rounded-md bg-danger-600 text-white hover:bg-danger-700 transition-colors">
          Danger
        </button>
        <button class="px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors">
          Outline
        </button>
      </div>
    </section>

    <!-- Typography -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Typography</h2>
      <div class="space-y-2">
        <p class="text-xs text-neutral-500">Extra Small (xs)</p>
        <p class="text-sm text-neutral-600">Small (sm)</p>
        <p class="text-base text-neutral-700">Base</p>
        <p class="text-lg text-neutral-800">Large (lg)</p>
        <p class="text-xl font-medium text-neutral-900">Extra Large (xl)</p>
        <p class="text-2xl font-semibold text-neutral-900">2XL Heading</p>
      </div>
    </section>
  </div>
</body>
</html>`;
}

// ---- Helper: README ----
function buildReadme(version: '3' | '4', themeName: string): string {
  const configFile = version === '3' ? 'tailwind.config.js' : 'src/theme.css';

  return `# ${themeName} - Tailwind CSS Theme

A custom Tailwind CSS ${version === '3' ? 'v3' : 'v4'} theme generated by Tailwind Design System Configurator.

## Quick Start

1. Install dependencies:

\`\`\`bash
npm install
\`\`\`

2. Build the CSS:

\`\`\`bash
npm run build
\`\`\`

3. Or start the development watcher:

\`\`\`bash
npm run dev
\`\`\`

4. Open \`index.html\` in your browser to see the theme in action.

## Files

- \`${configFile}\` - Your theme configuration
- \`src/input.css\` - CSS entry point
- \`index.html\` - Sample page demonstrating the theme
- \`dist/output.css\` - Generated CSS (created after build)

## Customization

Edit \`${configFile}\` to modify colors, typography, spacing, and other design tokens.

${version === '3'
  ? 'See the [Tailwind CSS v3 docs](https://v3.tailwindcss.com/docs/configuration) for configuration reference.'
  : 'See the [Tailwind CSS v4 docs](https://tailwindcss.com/docs) for configuration reference.'}
`;
}

// ---- Icons ----
function ClipboardIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
