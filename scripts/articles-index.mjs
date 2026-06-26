// Liest alle Artikel-Frontmatter und gibt eine kompakte JSON-Liste aus.
import { readdir, readFile } from 'node:fs/promises';

const DIR = new URL('../src/content/artikel/', import.meta.url);
const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));

function fm(src, key) {
  const m = src.match(new RegExp('^' + key + ':\\s*(.*)$', 'm'));
  if (!m) return null;
  return m[1].trim().replace(/^["']|["']$/g, '');
}

const out = [];
for (const f of files.sort()) {
  const src = await readFile(new URL(f, DIR), 'utf8');
  out.push({
    slug: f.replace(/\.md$/, ''),
    title: fm(src, 'title'),
    description: fm(src, 'description'),
    silo: fm(src, 'silo'),
    epoche: fm(src, 'epocheLabel') || '',
    type: fm(src, 'type') || 'ratgeber',
  });
}
console.log(JSON.stringify(out));
