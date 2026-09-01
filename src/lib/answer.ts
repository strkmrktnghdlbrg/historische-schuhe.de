// Rendert den Antwortblock aus dem Frontmatter-Feld `answer`.
//
// Bewusst ein Mini-Parser statt Markdown-Pipeline: Der Antwortblock ist ein
// Absatz mit Betonung und gelegentlich einem Link. Alles andere gehoert in den
// Rumpf, nicht ins Centerpiece.

const ESC: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ESC[c]);
}

/** **fett** und [Text](/ziel/) zu HTML. Alles andere wird escaped. */
export function renderAnswer(src: string | undefined): string | null {
  if (!src || !src.trim()) return null;
  let html = escapeHtml(src.trim());
  html = html.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return html;
}

/** Klartext-Fassung, z.B. fuer strukturierte Daten. */
export function answerText(src: string | undefined): string | null {
  if (!src || !src.trim()) return null;
  return src
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}
