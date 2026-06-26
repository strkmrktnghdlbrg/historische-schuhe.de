// Holt reale, frei lizenzierte Bilder von Wikimedia Commons (PD/CC) je Artikel,
// laedt sie lokal nach public/images/articles/ und schreibt src/data/images.json
// mit verifizierter Attribution (Autor + Lizenz + Quelle aus der Commons-API).
import { writeFile, mkdir, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const UA = 'historische-schuhe.de/1.0 (Bildmigration; Kontakt kontakt@historische-schuhe.de)';
const OUT_DIR = new URL('../public/images/articles/', import.meta.url);
const REG_PATH = new URL('../src/data/images.json', import.meta.url);

const GLOBAL_AVOID = ['coin', 'banknote', 'stamp', 'map of', 'logo', 'icon', 'diagram', 'caligula', 'bust of', 'location map', 'toolshed', 'tegernsee', 'brooch', 'price', 'rules of'];
// Fehlgriffe / Duplikate: vor dem Re-Fetch verwerfen (lieber kein Bild als ein falsches).
const DISCARD = ['stiefel-schuhe-19-jahrhunderts', 'schuhe-viktorianischen-aera', 'roemische-legionaersschuhe', 'renaissance-schuhe'];

const SHOE = ['shoe', 'shoes', 'boot', 'boots', 'sandal', 'sandals', 'slipper', 'slippers', 'mule', 'chopine', 'geta', 'sabot', 'clog', 'footwear', 'schuh', 'stiefel', 'pump', 'sneaker', 'trainer', 'moccasin', 'last', 'buckle', 'mojari', 'jutti', 'babouche', 'poulaine', 'turnshoe', 'caliga', 'hobnail', 'pattens', 'patten', 'bootee'];

// slug -> Suchquery (museumslastig) + Relevanz-Tokens (inc = mind. 1 muss im Titel sein) + avoid
const IMAGES = [
  // ANTIKE
  { slug: 'antike-sandalen-schuhe', q: 'ancient leather sandal museum collection', inc: ['sandal', 'shoe', 'caliga', 'footwear'] },
  { slug: 'schuhe-im-alten-rom', q: 'Roman footwear leather shoe FindID', inc: ['shoe', 'caliga', 'sandal', 'footwear', 'hobnail'], avoid: ['statue'] },
  { slug: 'schuhe-des-antiken-griechenlands', q: 'ancient Greek sandal terracotta foot', inc: ['sandal', 'foot', 'shoe', 'footwear'] },
  { slug: 'roemische-sandalen-schuhe', q: 'Roman leather sandal caliga FindID', inc: ['caliga', 'sandal', 'shoe', 'footwear'] },
  { slug: 'roemische-legionaersschuhe', q: 'Roman caliga hobnail Vindolanda shoe', inc: ['caliga', 'hobnail', 'sandal', 'shoe', 'footwear'], avoid: ['good friday', 'procession', 'malta', 'zebbug', 'statue', 'reenact'] },
  // MITTELALTER
  { slug: 'schuhe-im-mittelalter', q: 'medieval leather turnshoe FindID', inc: ['shoe', 'schuh', 'turnshoe'] },
  { slug: 'schuhe-des-mittelalters', q: 'medieval welted leather shoe FindID', inc: ['shoe', 'schuh', 'turnshoe'] },
  { slug: 'schuhe-des-hochmittelalters', q: 'medieval leather shoe poulaine museum', inc: ['shoe', 'poulaine', 'schuh'] },
  { slug: 'mittelalterliche-stiefel-schuhe', q: 'medieval leather boot reproduction', inc: ['boot', 'shoe', 'stiefel'] },
  // RENAISSANCE / BAROCK
  { slug: 'renaissance-schuhe', q: 'renaissance leather shoe Bata Shoe Museum', inc: ['shoe', 'schuh', 'footwear'], avoid: ['diccionario', 'calleja', 'ilustraci', 'illustration', 'drawing', 'engraving', 'painting'] },
  { slug: 'renaissance-pantoffeln-schuhe', q: 'chopine platform shoe Bata Shoe Museum', inc: ['chopine', 'mule', 'pantoffel', 'shoe'] },
  { slug: 'barocke-damenschuhe', q: 'woman silk shoe 18th century MET', inc: ['shoe', 'mule', 'slipper', 'schuh'] },
  { slug: 'barocke-herrenschuhe', q: 'man leather buckle shoe 18th century MET', inc: ['shoe', 'boot', 'buckle', 'schuh'] },
  { slug: 'barocke-schuhschnallen-schuhe', q: 'shoe buckle 18th century silver MET', inc: ['buckle', 'schnalle'] },
  { slug: 'franzoesische-hofschuhe', q: 'silk court shoe 18th century LACMA MET', inc: ['shoe', 'mule', 'slipper'] },
  // 18. JH
  { slug: 'schuhe-des-18-jahrhunderts', q: '18th century silk shoe pair MET', inc: ['shoe', 'mule', 'slipper', 'schuh'] },
  { slug: 'schuhe-des-18-jahrhunderts-in-europa', q: '18th century leather shoe MET European', inc: ['shoe', 'mule', 'schuh'] },
  // 19. JH
  { slug: 'schuhe-des-19-jahrhunderts', q: '19th century button boot leather MET', inc: ['boot', 'shoe', 'schuh', 'stiefel'] },
  { slug: 'schuhe-19-jahrhundert', q: '19th century leather shoe MET pair', inc: ['shoe', 'boot', 'schuh'] },
  { slug: 'stiefel-schuhe-19-jahrhunderts', q: '19th century riding boot leather MET', inc: ['boot', 'stiefel', 'shoe'], avoid: ['klomp', 'clog', 'sabot', 'muiltje'] },
  { slug: 'schuhe-viktorianischen-aera', q: 'Victorian leather boot 19th century MET', inc: ['boot', 'shoe', 'bootee'], avoid: ['klomp', 'clog', 'sabot', 'muiltje'] },
  { slug: 'napoleonische-marschstiefel-schuhe', q: 'Hessian boot 19th century leather MET', inc: ['boot', 'hessian', 'stiefel'] },
  // 20. JH
  { slug: 'schuhe-des-20-jahrhunderts', q: 'leather shoe early 20th century MET', inc: ['shoe', 'boot', 'pump', 'schuh'] },
  { slug: 'schuhe-der-1920er-jahre', q: '1920s shoe strap heel MET', inc: ['shoe', 'pump', 'schuh', 'boot'] },
  { slug: 'schuhe-der-1950er-jahre', q: '1950s stiletto pump shoe MET', inc: ['shoe', 'pump', 'stiletto', 'heel'] },
  { slug: 'schuhe-der-1960er', q: '1960s boot shoe MET vintage', inc: ['boot', 'shoe'] },
  { slug: 'schuhe-der-1980er-jahre', q: 'sneakers trainers shoe 1980s', inc: ['sneaker', 'shoe', 'trainer'] },
  // KULTUR
  { slug: 'chinesische-lotus-schuhe', q: 'lotus shoe bound feet China Bata', inc: ['lotus', 'shoe'] },
  { slug: 'japanische-geta-schuhe', q: 'geta Japanese wooden sandal Bata', inc: ['geta', 'sandal'] },
  { slug: 'indische-mojaris', q: 'mojari jutti Indian shoe MET embroidered', inc: ['mojari', 'jutti', 'shoe', 'slipper'] },
  { slug: 'tuerkische-babuschen-schuhe', q: 'Ottoman Turkish slipper leather MET', inc: ['slipper', 'shoe', 'babouche', 'mule'] },
  { slug: 'tuerkische-reitstiefel-schuhe', q: 'Ottoman Turkish leather boot MET', inc: ['boot', 'stiefel', 'shoe'] },
  // RATGEBER / WISSEN
  { slug: 'schuhe-der-aegyptischen-pharaonen', q: 'ancient Egyptian sandals museum', inc: ['sandal', 'shoe'] },
  { slug: 'geschichte-der-schuhe', q: 'shoe collection Bata Shoe Museum display', inc: ['shoe', 'schuh', 'boot', 'footwear'] },
  { slug: 'pflege-fuer-schuhe', q: 'shoe polishing brush leather care', inc: ['shoe', 'polish', 'brush', 'boot', 'leather'] },
  { slug: 'macht-kleidung', q: 'red heel shoes Louis XIV portrait nobleman', inc: ['shoe', 'portrait', 'heel'] },
  { slug: 'a-und-o-schuhe', q: 'handmade leather shoes pair wooden', inc: ['shoe', 'schuh', 'boot'] },
  { slug: 'leder-pflegen-historische-schuhe', q: 'leather boot wax brush polish care', inc: ['leather', 'boot', 'shoe', 'polish', 'wax'] },
  { slug: 'schuhgroesse-passform-historische-schuhe', q: 'wooden shoe last cobbler shoemaker', inc: ['last', 'cobbler', 'shoe', 'shoemaker'] },
  { slug: 'wendegenaehte-schuhe-erklaert', q: 'turnshoe medieval leather reproduction', inc: ['turnshoe', 'shoe', 'schuh'] },
  { slug: 'schuhe-erster-mittelaltermarkt-einsteiger', q: 'medieval reenactment living history shoes', inc: ['shoe', 'reenactment', 'schuh', 'turnshoe'] },
  { slug: 'beste-shops-apps-historische-schuhe-kaufen', q: 'leather shoes pair Bata Shoe Museum', inc: ['shoe', 'boot', 'footwear'] },
  // HERO (Startseite)
  { slug: '_hero', q: 'leather shoes pair Bata Shoe Museum collection', inc: ['shoe', 'boot', 'footwear', 'sandal'] },
];

// Fuer schwierige Slugs: gezielte, real existierende Commons-Kategorien (nur passende Dateien).
const CATS = {
  'roemische-legionaersschuhe': ['Caliga'],
  'renaissance-schuhe': ['16th-century shoes', 'Chopines'],
  'barocke-damenschuhe': ['17th-century shoes', '18th-century mules (footwear)'],
  'franzoesische-hofschuhe': ['18th-century footwear in the Metropolitan Museum of Art', '18th-century shoes'],
  'schuhe-des-19-jahrhunderts': ['19th-century footwear in the Metropolitan Museum of Art', '19th-century shoes'],
  'stiefel-schuhe-19-jahrhunderts': ['19th-century footwear in the Metropolitan Museum of Art', '19th-century shoes'],
  'schuhe-viktorianischen-aera': ['19th-century footwear in the Metropolitan Museum of Art', '19th-century shoes'],
  'napoleonische-marschstiefel-schuhe': ['Hessian boots', 'Riding boots'],
  'schuhe-des-20-jahrhunderts': ['20th-century shoes', '20th-century footwear in the Metropolitan Museum of Art'],
  'schuhe-der-1950er-jahre': ['1950s footwear', '1950s shoes'],
  'schuhe-der-1960er': ['1960s footwear', '1960s shoes'],
  'schuhe-der-1980er-jahre': ['Sneakers', '1980s footwear'],
  'indische-mojaris': ['Jutti'],
  'tuerkische-babuschen-schuhe': ['Babouches', '18th-century mules (footwear)'],
  'tuerkische-reitstiefel-schuhe': ['Riding boots'],
  'geschichte-der-schuhe': ['9th-century shoes', 'Archaeological leather shoes'],
  'pflege-fuer-schuhe': ['Shoe polish'],
  'leder-pflegen-historische-schuhe': ['Shoe polish'],
  'schuhgroesse-passform-historische-schuhe': ["Cobbler's lasts", 'Lasts'],
  'wendegenaehte-schuhe-erklaert': ['14th-century shoes', '15th-century shoes'],
  'schuhe-erster-mittelaltermarkt-einsteiger': ['15th-century shoes', '13th-century shoes'],
  '_hero': ['Archaeological leather shoes', '11th-century shoes'],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stripHtml = (s) => (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

async function api(params) {
  const u = new URL('https://commons.wikimedia.org/w/api.php');
  u.search = new URLSearchParams({ format: 'json', ...params }).toString();
  const r = await fetch(u, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error('API ' + r.status);
  return r.json();
}

function candidates(pages) {
  return Object.values(pages)
    .map((p) => {
      const ii = (p.imageinfo || [])[0] || {};
      return { title: p.title || '', ii, w: ii.width || 0, mime: ii.mime || '' };
    })
    .filter((c) => /image\/(jpeg|png)/.test(c.mime) && c.ii.thumburl);
}

function pick(pages, inc, avoid, fromCategory, used) {
  const cand = candidates(pages).filter((c) => !used || !used.has(c.title));
  const bad = [...GLOBAL_AVOID, ...(avoid || [])];
  const hasBad = (t) => bad.some((b) => t.toLowerCase().includes(b));
  const hasInc = (t) => inc.some((i) => t.toLowerCase().includes(i.toLowerCase()));
  const hasShoe = (t) => SHOE.some((s) => new RegExp('\\b' + s + 's?\\b', 'i').test(t));
  if (fromCategory) {
    // Kategorie garantiert Relevanz: nur Avoid filtern, groesstes Bild nehmen.
    const ok = cand.filter((c) => !hasBad(c.title) && c.w >= 500);
    ok.sort((a, b) => b.w - a.w);
    return ok[0] || null;
  }
  // Volltextsuche: streng (item-Token UND Schuh-Token, kein Junk-Fallback).
  const good = cand.filter((c) => hasInc(c.title) && hasShoe(c.title) && !hasBad(c.title));
  good.sort((a, b) => b.w - a.w);
  return good[0] || null;
}

async function run() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
  // Bestehende (gute) Eintraege erhalten, Fehlgriffe verwerfen.
  let registry = {};
  if (existsSync(REG_PATH)) {
    try { registry = JSON.parse(await readFile(REG_PATH, 'utf8')); } catch {}
  }
  for (const slug of DISCARD) {
    delete registry[slug];
    try { await rm(new URL(`${slug}.jpg`, OUT_DIR)); } catch {}
  }
  const used = new Set(Object.values(registry).map((e) => 'File:' + e.title));
  const report = [];
  for (const item of IMAGES) {
    if (registry[item.slug]) { report.push(`KEEP  ${item.slug}  <-  ${registry[item.slug].title}`); continue; }
    try {
      let c = null;
      // 1) Kategorien (zuverlaessig relevant)
      for (const cat of (CATS[item.slug] || [])) {
        const d = await api({
          action: 'query', generator: 'categorymembers', gcmtitle: 'Category:' + cat,
          gcmtype: 'file', gcmlimit: '40',
          prop: 'imageinfo', iiprop: 'url|extmetadata|mime|size', iiurlwidth: '1280',
        });
        c = pick(d.query?.pages || {}, item.inc, item.avoid, true, used);
        if (c) break;
        await sleep(250);
      }
      // 2) Fallback Volltextsuche
      if (!c) {
        const d = await api({
          action: 'query', generator: 'search', gsrnamespace: '6',
          gsrsearch: item.q, gsrlimit: '12',
          prop: 'imageinfo', iiprop: 'url|extmetadata|mime|size', iiurlwidth: '1280',
        });
        c = pick(d.query?.pages || {}, item.inc, item.avoid, false, used);
      }
      if (!c) { report.push(`MISS  ${item.slug}  (keine passende Datei)`); continue; }
      used.add(c.title);
      const meta = c.ii.extmetadata || {};
      const author = stripHtml(meta.Artist?.value) || 'Unbekannt';
      const license = stripHtml(meta.LicenseShortName?.value) || 'siehe Quelle';
      const licenseUrl = meta.LicenseUrl?.value || '';
      const source = c.ii.descriptionurl || '';
      // Download
      const res = await fetch(c.ii.thumburl, { headers: { 'User-Agent': UA } });
      const buf = Buffer.from(await res.arrayBuffer());
      const fname = `${item.slug}.jpg`;
      await writeFile(new URL(fname, OUT_DIR), buf);
      registry[item.slug] = {
        src: `/images/articles/${fname}`,
        credit: author,
        license,
        licenseUrl,
        source,
        title: c.title.replace(/^File:/, ''),
      };
      report.push(`OK    ${item.slug}  <-  ${c.title.replace(/^File:/, '')}  [${license}] (${Math.round(buf.length / 1024)} KB)`);
      await sleep(350);
    } catch (e) {
      report.push(`ERR   ${item.slug}  ${e.message}`);
    }
  }
  await writeFile(REG_PATH, JSON.stringify(registry, null, 2) + '\n');
  console.log(report.join('\n'));
  console.log(`\n${Object.keys(registry).length}/${IMAGES.length} Bilder geholt.`);
}
run();
