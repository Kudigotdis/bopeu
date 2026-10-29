/*
 * Moves the sticky `.admin-header` from the top of every admin-*.html page to
 * the bottom, so it renders as a bottom bar (notably on portrait mobile).
 *
 * What it does per file:
 *   1. Inside the `.admin-header { ... }` rule only, rewrites `top:0` -> `bottom:0`.
 *   2. Extracts the `<header class="admin-header">...</header>` block and
 *      re-inserts it immediately before `</body>`.
 *
 * `.admin-layout { min-height: calc(100vh - 56px) }` is intentionally left
 * alone: the header stays in normal flow, so layout + 56px header = 100vh.
 *
 * Safe to re-run: files whose header already follows `.admin-layout` are
 * skipped for the move, and the CSS rewrite is a no-op once applied.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const HEADER_BLOCK = /<header class="admin-header">[\s\S]*?<\/header>/;
// Header plus the blank lines that followed it, so no gap is left at the top.
const HEADER_AND_GAP = /[ \t]*<header class="admin-header">[\s\S]*?<\/header>[ \t]*\r?\n(?:[ \t]*\r?\n)*/;
const HEADER_RULE = /(\.admin-header\s*\{)([^}]*)(\})/;

async function main() {
  const entries = await readdir(root, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /^admin-.*\.html$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const moved = [];
  const cssFixed = [];
  const alreadyDone = [];
  const skipped = [];

  for (const file of files) {
    const fullPath = resolve(root, file);
    const before = await readFile(fullPath, 'utf8');
    let content = before;

    content = content.replace(HEADER_RULE, (match, open, body, close) =>
      open + body.replace(/\btop\s*:\s*0\b/g, 'bottom:0') + close
    );
    if (content !== before) cssFixed.push(file);

    const headerMatch = content.match(HEADER_BLOCK);
    if (!headerMatch) {
      skipped.push(file);
      continue;
    }

    const headerIndex = content.indexOf(headerMatch[0]);
    const layoutIndex = content.indexOf('class="admin-layout"');
    const isMoved = layoutIndex !== -1 && headerIndex > layoutIndex;

    if (isMoved) {
      alreadyDone.push(file);
    } else {
      const headerBlock = headerMatch[0];
      content = content.replace(HEADER_AND_GAP, '');

      const closeIndex = content.lastIndexOf('</body>');
      if (closeIndex === -1) {
        skipped.push(`${file} (no </body>)`);
        continue;
      }

      const nl = content.includes('\r\n') ? '\r\n' : '\n';
      content = content.slice(0, closeIndex) + nl + headerBlock + nl + content.slice(closeIndex);
      moved.push(file);
    }

    if (content !== before) await writeFile(fullPath, content, 'utf8');
  }

  console.log(`Scanned ${files.length} admin page(s)`);
  console.log(`Header moved to bottom: ${moved.length}`);
  console.log(`CSS top:0 -> bottom:0: ${cssFixed.length}`);
  if (alreadyDone.length) console.log(`Already moved (skipped): ${alreadyDone.length}`);
  if (skipped.length) console.log(`No admin header (skipped): ${skipped.join(', ')}`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
