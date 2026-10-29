/*
 * Gives every admin-*.html page the BOPEU app top bar and strips the leftover
 * branding out of the bottom `.admin-header` navigation bar.
 *
 * Per file (admin-login.html is skipped — a "Log out" bar on a sign-in page
 * makes no sense):
 *   1. Inserts the `.app-header` block (logo + Logout button) directly after
 *      the `<body ...>` tag.
 *   2. Drops the "Sign out" <a href="admin-login.html"> link from the admin
 *      header — the Logout button in the app header replaces it.
 *   3. Drops the header brand block: both the `class="admin-brand"` variant
 *      and the inline-styled `admin-mark` variant used by the other pages.
 *   4. Removes the whole `<header class="admin-header">` when the brand was
 *      the only thing in it (11 pages), so no empty dark bar is left behind.
 *   5. Removes the now-unused `.admin-brand { ... }` and `.admin-mark { ... }`
 *      CSS rules.
 *   6. Resizes `.admin-layout` so the bars fill the viewport exactly: pages with
 *      both bars use calc(100vh - 118px), the pages whose bottom bar was
 *      deleted use calc(100vh - 62px).
 *
 * Safe to re-run: every step is a no-op once it has been applied.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const APP_HEADER = [
  '<div class="app-header">',
  '    <img src="Assets/logo/bopeu_logo.webp" alt="BOPEU" class="app-logo" data-logo-key="bopeu">',
  '    <button type="button" id="loginToggleBtn" class="btn header-login-btn btn-secondary" onclick="handleLoginToggle()">Logout</button>',
  '</div>'
];

const BODY_TAG = /<body[^>]*>/;
const HEADER_BLOCK = /<header class="admin-header">[\s\S]*?<\/header>/;
/* Whole brand-only header, together with the blank line that preceded it. */
const BRAND_ONLY_HEADER = /\r?\n(?:[ \t]*\r?\n)*[ \t]*<header class="admin-header">[\s\S]*?<\/header>(?=\r?\n)/;
const SIGNOUT_LINE = /[ \t]*<a\b[^>]*?href="admin-login\.html"[^>]*>[^<]*<\/a>[ \t]*\r?\n/g;
const SIGNOUT_INLINE = /[ \t]*<a\b[^>]*?href="admin-login\.html"[^>]*>[^<]*<\/a>/g;
const BRAND_CSS = /[ \t]*\.admin-brand\s*\{[^}]*\}[ \t]*(\r?\n)?/g;
const MARK_CSS = /[ \t]*\.admin-mark\s*\{[^}]*\}[ \t]*(\r?\n)?/g;
const LAYOUT_HEIGHT = /(\.admin-layout\s*\{[^}]*?min-height\s*:\s*)calc\(100vh\s*-\s*\d+px\)/g;
const TOP_BAR_HEIGHT = 62;
const BOTTOM_BAR_HEIGHT = 56;

async function main() {
  const entries = await readdir(root, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /^admin-.*\.html$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const report = {
    topBar: [],
    signOut: [],
    brand: [],
    removedHeader: [],
    brandCss: [],
    markCss: [],
    height: []
  };
  const skipped = [];

  for (const file of files) {
    if (file === 'admin-login.html') {
      skipped.push(`${file} (sign-in page)`);
      continue;
    }

    const fullPath = resolve(root, file);
    const before = await readFile(fullPath, 'utf8');
    const nl = before.includes('\r\n') ? '\r\n' : '\n';
    let content = before;

    /* ---- admin header cleanup ------------------------------------------- */
    const headerMatch = content.match(HEADER_BLOCK);
    if (headerMatch) {
      let block = headerMatch[0];

      if (/href="admin-login\.html"/.test(block)) report.signOut.push(file);
      block = block.replace(SIGNOUT_LINE, '').replace(SIGNOUT_INLINE, '');

      if (/<nav\b/.test(block)) {
        const hadBrand = !/^<header class="admin-header">\s*<nav\b/.test(block);
        block = block.replace(/(<header class="admin-header">)([\s\S]*?)(<nav\b)/, (_m, open, middle, nav) => {
          const tail = middle.match(/(\r?\n[ \t]*)$/);
          return open + (tail ? tail[1] : nl + '  ') + nav;
        });
        if (hadBrand) report.brand.push(file);
        content = content.replace(headerMatch[0], block);
      } else {
        content = content.replace(BRAND_ONLY_HEADER, '');
        report.removedHeader.push(file);
      }
    } else {
      skipped.push(file);
    }

    /* ---- dead brand CSS -------------------------------------------------- */
    const withoutBrandCss = content.replace(BRAND_CSS, '');
    if (withoutBrandCss !== content) {
      report.brandCss.push(file);
      content = withoutBrandCss;
    }

    const withoutMarkCss = content.replace(MARK_CSS, '');
    if (withoutMarkCss !== content) {
      report.markCss.push(file);
      content = withoutMarkCss;
    }

    /* ---- layout height --------------------------------------------------- */
    /* Pages that kept their bottom nav need room for both bars; the pages whose
       bar was deleted only carry the 62px app header. */
    const bars = TOP_BAR_HEIGHT + (/<header class="admin-header">/.test(content) ? BOTTOM_BAR_HEIGHT : 0);
    const height = `calc(100vh - ${bars}px)`;
    const resized = content.replace(LAYOUT_HEIGHT, `$1${height}`);
    if (resized !== content) {
      report.height.push(file);
      content = resized;
    }

    /* ---- top app header -------------------------------------------------- */
    if (!content.includes('class="app-header"')) {
      const bodyMatch = content.match(BODY_TAG);
      if (!bodyMatch) {
        skipped.push(`${file} (no <body>)`);
      } else {
        const at = bodyMatch.index + bodyMatch[0].length;
        const rest = content.slice(at).replace(/^(?:[ \t]*\r?\n)+/, '');
        content = content.slice(0, at) + nl + nl + APP_HEADER.join(nl) + nl + nl + rest;
        report.topBar.push(file);
      }
    }

    if (content !== before) await writeFile(fullPath, content, 'utf8');
  }

  const changed = new Set([
    ...report.topBar,
    ...report.signOut,
    ...report.brand,
    ...report.removedHeader,
    ...report.brandCss,
    ...report.markCss,
    ...report.height
  ]);

  const log = (label, list) => console.log(`${label}: ${list.length}` + (list.length ? ` -> ${list.join(', ')}` : ''));

  console.log(`Scanned ${files.length} admin page(s)`);
  console.log(`Files changed: ${changed.size}`);
  log('App header inserted', report.topBar);
  log('Sign-out link removed from admin header', report.signOut);
  log('Brand block removed from admin header', report.brand);
  log('Brand-only admin header removed', report.removedHeader);
  log('.admin-brand CSS removed', report.brandCss);
  log('.admin-mark CSS removed', report.markCss);
  log('.admin-layout height resized', report.height);
  if (skipped.length) log('No admin header (skipped)', skipped);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
