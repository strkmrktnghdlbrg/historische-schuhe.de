import { readFile, writeFile } from 'node:fs/promises';
const articles = JSON.parse(await readFile(new URL('../../../../../tmp/articles-slim.json', import.meta.url), 'utf8').catch(() => readFile('/tmp/articles-slim.json', 'utf8')));

const body = `export const meta = {
  name: 'historische-schuhe-internal-linking',
  description: 'Ergaenzt kontextuelle interne Links (Spiderweb) in allen historische-schuhe.de Artikeln je Silo',
  phases: [{ title: 'Verlinken', detail: 'ein Agent pro Artikel, fuegt 3-6 interne Links per Edit-Tool ein' }],
}

const BASE = '/Users/joshuastark/Documents/Claude Code/Affiliate projects/historische-schuhe.de/src/content/artikel/'
const ARTICLES = ${JSON.stringify(articles)}

// Sinnvolle Bruecken-Ziele (Silo-uebergreifend), plus die Money-Landingpage.
const BRIDGES = ['pflege-fuer-schuhe', 'schuhgroesse-passform-historische-schuhe', 'beste-shops-apps-historische-schuhe-kaufen', 'geschichte-der-schuhe', 'wendegenaehte-schuhe-erklaert', 'a-und-o-schuhe', 'macht-kleidung', 'leder-pflegen-historische-schuhe']
const EXTRA = [{ slug: 'mittelalterschuhe-vergleich', title: 'Mittelalterschuhe im Vergleich' }]
const fam = (s) => (s || '').split('/')[0].trim()

function candidatesFor(art) {
  const same = ARTICLES.filter((x) => x.slug !== art.slug && x.silo === art.silo)
  const prim = same.filter((x) => fam(x.epoche) && fam(x.epoche) === fam(art.epoche))
  const sec = same.filter((x) => !prim.includes(x))
  const bridges = ARTICLES.filter((x) => BRIDGES.includes(x.slug) && x.slug !== art.slug)
  const seen = new Set([art.slug])
  const list = []
  for (const x of [...prim, ...sec, ...bridges, ...EXTRA]) {
    if (!seen.has(x.slug)) { seen.add(x.slug); list.push({ slug: x.slug, title: x.title }) }
  }
  return list.slice(0, 16)
}

phase('Verlinken')

const results = await parallel(ARTICLES.map((art) => async () => {
  const cands = candidatesFor(art)
  const path = BASE + art.slug + '.md'
  const targetList = cands.map((c) => '- /' + c.slug + '/  =  ' + c.title).join('\\n')
  const prompt = \`Du verbesserst die interne Verlinkung (Spiderweb) eines deutschsprachigen Artikels auf historische-schuhe.de.

ARTIKEL-DATEI (absoluter Pfad): \${path}
SILO: \${art.silo}\${art.epoche ? ' / ' + art.epoche : ''}

AUFGABE:
1. Lies die Datei mit dem Read-Tool.
2. Fuege im BODY (Markdown nach dem Frontmatter) 3 bis 6 KONTEXTUELLE interne Links ein, indem du mit dem Edit-Tool je einen bereits vorhandenen, treffenden Satz-Ausschnitt in einen Markdown-Link verwandelst.
   - Beispiel: aus \\\`... robuste Lederstiefel ...\\\` wird \\\`... robuste [Lederstiefel](/mittelalterliche-stiefel-schuhe/) ...\\\`.
   - Waehle als Anker eine kurze, eindeutige Phrase (2 bis 6 Woerter), die GENAU EINMAL im Text vorkommt, thematisch zum Ziel passt, NICHT in einer Ueberschrift (##), NICHT in einer fettgedruckten FAQ-Frage (**...?**) und NICHT bereits Teil eines Links steht.
   - Der sichtbare Text bleibt gleich, du legst nur die Verlinkung darum.

REGELN:
- Verlinke NUR auf diese erlaubten Ziele (Slug = Thema), niemals erfundene Slugs:
\${targetList}
- Format immer [Ankertext](/slug/) mit fuehrendem und abschliessendem Slash.
- Jedes Ziel hoechstens EINMAL verlinken. Ueberspringe Ziele, die im Artikel schon verlinkt sind (pruefe vorhandene (/slug/)-Links).
- Bevorzuge Ziele aus demselben Silo / derselben Epoche, ergaenze sinnvolle Bruecken (Pflege, Passform, Kauf-Vergleich) wo es natuerlich passt.
- Aendere KEINEN Frontmatter, keine Ueberschriften, keine Fakten. Nur Links hinzufuegen.
- Wenn ein Edit fehlschlaegt (Phrase nicht eindeutig), waehle eine andere Phrase.

Gib am Ende {slug, added, links} als StructuredOutput zurueck (added = Anzahl tatsaechlich eingefuegter Links, links = Liste der Ziel-Slugs).\`
  const r = await agent(prompt, {
    label: 'link:' + art.slug,
    phase: 'Verlinken',
    agentType: 'general-purpose',
    schema: {
      type: 'object', additionalProperties: false,
      required: ['slug', 'added', 'links'],
      properties: {
        slug: { type: 'string' },
        added: { type: 'number' },
        links: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  return r ? { ...r, slug: art.slug } : { slug: art.slug, added: 0, links: [] }
}))

const total = results.reduce((s, r) => s + ((r && r.added) || 0), 0)
log(total + ' interne Links ergaenzt ueber ' + results.length + ' Artikel')
return { articles: results.length, linksAdded: total, results }
`;

await writeFile(new URL('./link-workflow.mjs', import.meta.url), body);
console.log('link-workflow.mjs geschrieben,', articles.length, 'Artikel eingebettet');
