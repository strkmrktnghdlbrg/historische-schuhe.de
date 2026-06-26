export const meta = {
  name: 'historische-schuhe-internal-linking',
  description: 'Ergaenzt kontextuelle interne Links (Spiderweb) in allen historische-schuhe.de Artikeln je Silo',
  phases: [{ title: 'Verlinken', detail: 'ein Agent pro Artikel, fuegt 3-6 interne Links per Edit-Tool ein' }],
}

const BASE = '/Users/joshuastark/Documents/Claude Code/Affiliate projects/historische-schuhe.de/src/content/artikel/'
const ARTICLES = [{"slug":"a-und-o-schuhe","silo":"ratgeber","epoche":"","title":"Das A und O guter Schuhe: Passform, Material und Qualität"},{"slug":"antike-sandalen-schuhe","silo":"epoche","epoche":"Antike","title":"Antike Sandalen: Schuhe der Griechen, Römer und des Orients"},{"slug":"barocke-damenschuhe","silo":"epoche","epoche":"Barock","title":"Barocke Damenschuhe: Absatz, Seide und höfische Pracht"},{"slug":"barocke-herrenschuhe","silo":"epoche","epoche":"Barock","title":"Barocke Herrenschuhe: Absatzschuhe, Schnallen und Stulpenstiefel"},{"slug":"barocke-schuhschnallen-schuhe","silo":"schuhtyp","epoche":"Barock","title":"Barocke Schuhschnallen: das Statussymbol am Schuh"},{"slug":"beste-shops-apps-historische-schuhe-kaufen","silo":"ratgeber","epoche":"","title":"Die beste App & die besten Shops, um historische Schuhe zu kaufen"},{"slug":"chinesische-lotus-schuhe","silo":"kultur","epoche":"China","title":"Chinesische Lotusschuhe: Geschichte eines umstrittenen Brauchs"},{"slug":"franzoesische-hofschuhe","silo":"epoche","epoche":"Barock / höfisch","title":"Französische Hofschuhe: Glanz und Eleganz von Versailles"},{"slug":"geschichte-der-schuhe","silo":"ratgeber","epoche":"","title":"Die Geschichte des Schuhs: von der Antike bis zum Barock"},{"slug":"indische-mojaris","silo":"kultur","epoche":"Indien","title":"Indische Mojaris: bestickte Schuhe der Maharadschas"},{"slug":"japanische-geta-schuhe","silo":"kultur","epoche":"Japan","title":"Japanische Geta: die hölzerne Sandale und ihre Geschichte"},{"slug":"leder-pflegen-historische-schuhe","silo":"ratgeber","epoche":"","title":"Lederschuhe pflegen: Fett, Wachs und was Echtleder wirklich braucht"},{"slug":"macht-kleidung","silo":"ratgeber","epoche":"","title":"Schuhe und Macht: wie Kleidung Status zeigte"},{"slug":"mittelalterliche-stiefel-schuhe","silo":"schuhtyp","epoche":"Mittelalter","title":"Mittelalterliche Stiefel: Formen, Einsatz und Kaufberatung"},{"slug":"napoleonische-marschstiefel-schuhe","silo":"epoche","epoche":"19. Jahrhundert / Militär","title":"Napoleonische Marschstiefel: Schuhwerk der Soldaten um 1800"},{"slug":"pflege-fuer-schuhe","silo":"ratgeber","epoche":"","title":"Schuhe richtig pflegen: Leder, Wildleder und historische Schuhe"},{"slug":"renaissance-pantoffeln-schuhe","silo":"schuhtyp","epoche":"Renaissance","title":"Renaissance-Pantoffeln: die Chopine und der modische Pantoffel"},{"slug":"renaissance-schuhe","silo":"epoche","epoche":"Renaissance","title":"Renaissance-Schuhe: Kuhmaulschuhe, Absatz und neue Eleganz"},{"slug":"roemische-legionaersschuhe","silo":"epoche","epoche":"Antike / Rom","title":"Römische Legionärsschuhe: die Caligae und ihre Geschichte"},{"slug":"roemische-sandalen-schuhe","silo":"schuhtyp","epoche":"Antike / Rom","title":"Römische Sandalen: Formen, Aufbau und Vorbild für heute"},{"slug":"schuhe-19-jahrhundert","silo":"epoche","epoche":"19. Jahrhundert","title":"Mode und Wandel: Schuhe im 19. Jahrhundert"},{"slug":"schuhe-der-1920er-jahre","silo":"epoche","epoche":"20. Jahrhundert","title":"Schuhe der 1920er Jahre: Riemchen, Charleston und Art déco"},{"slug":"schuhe-der-1950er-jahre","silo":"epoche","epoche":"20. Jahrhundert","title":"Schuhe der 1950er Jahre: Stiletto, Saddle Shoe und Petticoat-Mode"},{"slug":"schuhe-der-1960er","silo":"epoche","epoche":"20. Jahrhundert","title":"Schuhe der 1960er Jahre: Go-go-Boots und Mod-Style"},{"slug":"schuhe-der-1980er-jahre","silo":"epoche","epoche":"20. Jahrhundert","title":"Schuhe der 1980er Jahre: Sneaker, Pop und Pumps"},{"slug":"schuhe-der-aegyptischen-pharaonen","silo":"epoche","epoche":"Antike / Ägypten","title":"Schuhe der ägyptischen Pharaonen: Status und Symbolik"},{"slug":"schuhe-des-18-jahrhunderts-in-europa","silo":"epoche","epoche":"18. Jahrhundert","title":"Schuhe des 18. Jahrhunderts in Europa: regionale Unterschiede"},{"slug":"schuhe-des-18-jahrhunderts","silo":"epoche","epoche":"18. Jahrhundert","title":"Schuhe des 18. Jahrhunderts: Rokoko, Schnallen und Seide"},{"slug":"schuhe-des-19-jahrhunderts","silo":"epoche","epoche":"19. Jahrhundert","title":"Schuhe des 19. Jahrhunderts: Industrialisierung und neue Formen"},{"slug":"schuhe-des-20-jahrhunderts","silo":"epoche","epoche":"20. Jahrhundert","title":"Schuhe des 20. Jahrhunderts: vom Knopfstiefel zum Sneaker"},{"slug":"schuhe-des-antiken-griechenlands","silo":"epoche","epoche":"Antike / Griechenland","title":"Schuhe des antiken Griechenlands: Sandalen, Krepides und Kothurn"},{"slug":"schuhe-des-hochmittelalters","silo":"epoche","epoche":"Mittelalter","title":"Schuhe des Hochmittelalters (1000 bis 1250)"},{"slug":"schuhe-des-mittelalters","silo":"epoche","epoche":"Mittelalter","title":"Schuhe des Mittelalters: Alltag, Stand und Material"},{"slug":"schuhe-erster-mittelaltermarkt-einsteiger","silo":"ratgeber","epoche":"","title":"Schuhe für den ersten Mittelaltermarkt: Einsteiger-Guide"},{"slug":"schuhe-im-alten-rom","silo":"epoche","epoche":"Antike / Rom","title":"Schuhe im alten Rom: Calceus, Caliga und Soleae"},{"slug":"schuhe-im-mittelalter","silo":"epoche","epoche":"Mittelalter","title":"Schuhe im Mittelalter: Machart, Formen und wie du sie heute trägst"},{"slug":"schuhe-viktorianischen-aera","silo":"epoche","epoche":"19. Jahrhundert","title":"Schuhe der viktorianischen Ära: Eleganz und Etikette"},{"slug":"schuhgroesse-passform-historische-schuhe","silo":"ratgeber","epoche":"","title":"Schuhgröße bei historischen Schuhen richtig wählen"},{"slug":"stiefel-schuhe-19-jahrhunderts","silo":"epoche","epoche":"19. Jahrhundert","title":"Stiefel des 19. Jahrhunderts: Schnürstiefel, Reitstiefel und Stiefelette"},{"slug":"tuerkische-babuschen-schuhe","silo":"kultur","epoche":"Türkei","title":"Türkische Babuschen: die Pantoffel des Orients"},{"slug":"tuerkische-reitstiefel-schuhe","silo":"kultur","epoche":"Türkei","title":"Türkische Reitstiefel: Schuhwerk der osmanischen Reiter"},{"slug":"wendegenaehte-schuhe-erklaert","silo":"ratgeber","epoche":"","title":"Wendegenähte Schuhe erklärt: woran du Qualität erkennst"}]

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

const TARGETS = ['schuhe-erster-mittelaltermarkt-einsteiger', 'schuhgroesse-passform-historische-schuhe', 'wendegenaehte-schuhe-erklaert', 'schuhe-19-jahrhundert', 'schuhe-der-1920er-jahre', 'schuhe-der-1950er-jahre', 'schuhe-des-18-jahrhunderts-in-europa', 'schuhe-viktorianischen-aera', 'tuerkische-babuschen-schuhe', 'tuerkische-reitstiefel-schuhe']

phase('Verlinken')

const results = await parallel(ARTICLES.filter((a) => TARGETS.includes(a.slug)).map((art) => async () => {
  const cands = candidatesFor(art)
  const path = BASE + art.slug + '.md'
  const targetList = cands.map((c) => '- /' + c.slug + '/  =  ' + c.title).join('\n')
  const prompt = `Du verbesserst die interne Verlinkung (Spiderweb) eines deutschsprachigen Artikels auf historische-schuhe.de.

ARTIKEL-DATEI (absoluter Pfad): ${path}
SILO: ${art.silo}${art.epoche ? ' / ' + art.epoche : ''}

AUFGABE:
1. Lies die Datei mit dem Read-Tool.
2. Fuege im BODY (Markdown nach dem Frontmatter) 3 bis 6 KONTEXTUELLE interne Links ein, indem du mit dem Edit-Tool je einen bereits vorhandenen, treffenden Satz-Ausschnitt in einen Markdown-Link verwandelst.
   - Beispiel: aus \`... robuste Lederstiefel ...\` wird \`... robuste [Lederstiefel](/mittelalterliche-stiefel-schuhe/) ...\`.
   - Waehle als Anker eine kurze, eindeutige Phrase (2 bis 6 Woerter), die GENAU EINMAL im Text vorkommt, thematisch zum Ziel passt, NICHT in einer Ueberschrift (##), NICHT in einer fettgedruckten FAQ-Frage (**...?**) und NICHT bereits Teil eines Links steht.
   - Der sichtbare Text bleibt gleich, du legst nur die Verlinkung darum.

REGELN:
- Verlinke NUR auf diese erlaubten Ziele (Slug = Thema), niemals erfundene Slugs:
${targetList}
- Format immer [Ankertext](/slug/) mit fuehrendem und abschliessendem Slash.
- Jedes Ziel hoechstens EINMAL verlinken. Ueberspringe Ziele, die im Artikel schon verlinkt sind (pruefe vorhandene (/slug/)-Links).
- Bevorzuge Ziele aus demselben Silo / derselben Epoche, ergaenze sinnvolle Bruecken (Pflege, Passform, Kauf-Vergleich) wo es natuerlich passt.
- Aendere KEINEN Frontmatter, keine Ueberschriften, keine Fakten. Nur Links hinzufuegen.
- Wenn ein Edit fehlschlaegt (Phrase nicht eindeutig), waehle eine andere Phrase.

Gib am Ende {slug, added, links} als StructuredOutput zurueck (added = Anzahl tatsaechlich eingefuegter Links, links = Liste der Ziel-Slugs).`
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
