// Liest den "Häufige Fragen"-Block aus dem Markdown-Rumpf eines Artikels und
// gibt Frage/Antwort-Paare zurueck. Grundlage fuer das FAQPage-Schema.
//
// Warum aus dem Rumpf und nicht aus dem Frontmatter: Die 42 Bestandsartikel
// haben ihre FAQ bereits im Text. Ein zweites Feld im Frontmatter waere eine
// Kopie, die frueher oder spaeter vom sichtbaren Text abweicht - und ein
// FAQ-Schema, das etwas anderes behauptet als die Seite zeigt, ist genau der
// Verstoss, den Google mit strukturierten Daten abstraft.
//
// Erwartetes Format (so schreiben alle Bestandsartikel):
//
//   ## Häufige Fragen
//
//   **Frage mit Fragezeichen?** Antwort im selben Absatz.
//
//   **Naechste Frage?**
//   Antwort im Absatz darunter.

export interface FaqItem {
  q: string;
  a: string;
}

const HEADING = /^##\s+Häufige Fragen\s*$/m;

/** Markdown-Inline-Auszeichnung entfernen: Links, Fett, Kursiv, Code. */
function stripMarkdown(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseFaq(body: string | undefined): FaqItem[] {
  if (!body) return [];
  const m = HEADING.exec(body);
  if (!m) return [];

  // Nur bis zur naechsten H2 lesen - was danach kommt, ist ein anderes Thema.
  let section = body.slice(m.index + m[0].length);
  const next = /^##\s+/m.exec(section);
  if (next) section = section.slice(0, next.index);

  const items: FaqItem[] = [];
  // Jeder Block beginnt mit **Frage?**; der Rest bis zum naechsten ** ist die Antwort.
  const re = /\*\*(.+?\?)\*\*([\s\S]*?)(?=\n\s*\*\*|$)/g;
  let hit: RegExpExecArray | null;
  while ((hit = re.exec(section)) !== null) {
    const q = stripMarkdown(hit[1]);
    const a = stripMarkdown(hit[2]);
    // Ohne Antwort ist der Eintrag im Schema wertlos und laut Google unzulaessig.
    if (q && a) items.push({ q, a });
  }
  return items;
}

/** Fertiges FAQPage-Objekt oder null, wenn die Seite keine FAQ hat. */
export function faqSchema(body: string | undefined): object | null {
  const items = parseFaq(body);
  if (items.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}
