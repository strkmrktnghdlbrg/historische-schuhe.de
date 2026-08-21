// Prüft alle im Katalog verlinkten ASINs gegen die Amazon Creators API und
// meldet jedes Produkt, auf das ein Klick nichts mehr einbringt.
//
//   node scripts/check-asins.mjs            # Bericht, Exit 1 nur bei toten ASINs
//   node scripts/check-asins.mjs --report   # nur Bericht, immer Exit 0
//
// Warum das nötig ist: Amazon nimmt laufend Produkte aus dem Sortiment, und auf
// einer Affiliate-Seite merkt das ohne Prüfung niemand. Der Link geht dann
// weiter auf eine Seite ohne Kaufoption — oder ins Leere.
//
// DREI FÄLLE, die auseinandergehalten werden müssen. Die Unterscheidung ist der
// ganze Zweck dieses Skripts, denn sie entscheidet, ob jemand etwas tun muss:
//
//   weg            Die API meldet InvalidParameterValue oder ItemNotFound, und
//                  amazon.de antwortet auf die ASIN mit "Seite wurde nicht
//                  gefunden". Das kommt nicht zurück. Der Eintrag muss ersetzt
//                  werden — NUR dieser Fall lässt den Job rot werden.
//   ohne Angebot   Die ASIN löst auf, hat aber gerade kein kaufbares Angebot
//                  ("Derzeit nicht verfügbar"). Das ist bei gängigen Produkten
//                  oft vorübergehend. Wird gemeldet, ohne den Job zu kippen:
//                  ein rotes X jeden Montag für eine Gitarre, die nächste Woche
//                  wieder lieferbar ist, erzieht nur dazu, das X zu ignorieren.
//   nicht abrufbar ItemNotAccessible — das Produkt steht bei Amazon, wird aber
//                  über die API nicht ausgeliefert. Der Kauflink verdient
//                  weiter, nur Preis und Bild fehlen. Ebenfalls nur Meldung.
//
// Zugangsdaten aus .env (gitignored) oder aus der Umgebung:
//   AMAZON_CREATOR_CLIENT_ID / _CLIENT_SECRET / _PARTNER_TAG / _MARKETPLACE
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const reportOnly = process.argv.includes('--report');

function loadEnv() {
  const out = {};
  try {
    for (const line of readFileSync(join(root, '.env'), 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
  return { ...out, ...process.env };
}
const env = loadEnv();
const CLIENT_ID = env.AMAZON_CREATOR_CLIENT_ID;
const CLIENT_SECRET = env.AMAZON_CREATOR_CLIENT_SECRET;
const PARTNER_TAG = env.AMAZON_CREATOR_PARTNER_TAG;
const MARKETPLACE = env.AMAZON_CREATOR_MARKETPLACE || 'www.amazon.de';
if (!CLIENT_ID || !CLIENT_SECRET || !PARTNER_TAG) {
  console.error('Fehlende AMAZON_CREATOR_* Zugangsdaten (.env oder Umgebung).');
  process.exit(1);
}

/** Codes, die heissen: die ASIN gibt es auf diesem Marktplatz nicht mehr. */
const WEG = new Set(['InvalidParameterValue', 'ItemNotFound']);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getToken() {
  const res = await fetch('https://api.amazon.co.uk/auth/o2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'creatorsapi::default',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Token fehlgeschlagen: ' + JSON.stringify(data).slice(0, 200));
  return data.access_token;
}

async function getItems(token, ids, attempt = 0) {
  const res = await fetch('https://creatorsapi.amazon/catalog/v1/getItems', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: JSON.stringify({
      itemIds: ids,
      itemIdType: 'ASIN',
      marketplace: MARKETPLACE,
      partnerTag: PARTNER_TAG,
      partnerType: 'Associates',
      resources: ['itemInfo.title', 'offersV2.listings.price', 'offersV2.listings.availability'],
    }),
  });
  if (!res.ok) {
    // 429 und 5xx sind vorübergehend. Ohne Retry fehlt still ein ganzer
    // Zehnerblock und die Seite gilt fälschlich als sauber.
    if ((res.status === 429 || res.status >= 500) && attempt < 5) {
      await sleep(3000 * 2 ** attempt);
      return getItems(token, ids, attempt + 1);
    }
    // Auch nach den Versuchen noch gedrosselt: NICHT werfen. Eine Drosselung
    // ist keine Aussage über die Produkte, und ein rotes X dafür ist genau
    // das Rauschen, das dieser Job vermeiden soll. Der Block landet als
    // "unklar" im Bericht; die Reissleine unten fängt den Fall ab, dass so
    // viel gedrosselt wurde, dass der Lauf nichts mehr aussagt.
    if (res.status === 429 || res.status >= 500) {
      return { items: [], errors: [], gedrosselt: true };
    }
    // 4xx dagegen betrifft die Anfrage selbst — falscher Tag, abgelaufene
    // Zugangsdaten, falscher Marktplatz. Das muss laut scheitern.
    throw new Error(`getItems HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const data = await res.json();
  // `errors` gehört zwingend mit zurück: ein HTTP 200 heisst nicht, dass jede
  // ASIN beantwortet wurde. Die API lässt einzelne aus `items` weg und
  // begründet das daneben — und genau diese Begründung trennt "weg" von
  // "kommt wieder".
  return { items: data?.itemsResult?.items || [], errors: data?.errors || [] };
}

// ASINs samt Fundstelle einsammeln, damit der Bericht direkt auf die Datei zeigt.
function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (['node_modules', '.git', 'dist'].includes(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|js|mjs|json|astro)$/.test(e.name)) out.push(p);
  }
  return out;
}
const where = new Map();
for (const f of walk(join(root, 'src'))) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(/asin['"]?\s*[:=]\s*['"]([A-Z0-9]{10})['"]/gi)) {
    if (!where.has(m[1])) where.set(m[1], relative(root, f).split('\\').join('/'));
  }
}
const asins = [...where.keys()];
console.log(`${asins.length} ASINs im Katalog gefunden`);
if (!asins.length) {
  console.log('Nichts zu prüfen.');
  process.exit(0);
}

const token = await getToken();
const weg = [];           // ASIN existiert nicht mehr -> Job wird rot
const ohneAngebot = [];   // löst auf, aber nicht kaufbar -> nur Meldung
const nichtAbrufbar = []; // ItemNotAccessible -> nur Meldung
const unklar = [];        // keine Begründung, meist Drosselung -> nur Meldung
let ok = 0;

for (let i = 0; i < asins.length; i += 10) {
  const batch = asins.slice(i, i + 10);
  const { items, errors, gedrosselt } = await getItems(token, batch);
  if (gedrosselt) {
    for (const id of batch) unklar.push({ asin: id, file: where.get(id) || '', grund: 'gedrosselt' });
    process.stdout.write(`  ${Math.min(i + 10, asins.length)}/${asins.length}\r`);
    await sleep(2000);
    continue;
  }
  const grund = {};
  for (const err of errors) {
    for (const id of batch) {
      if (String(err.message || '').includes(id)) grund[id] = err.code || 'unbekannt';
    }
  }
  for (const id of batch) {
    const it = items.find((x) => x.asin === id);
    const eintrag = { asin: id, file: where.get(id) || '' };
    if (!it) {
      const code = grund[id];
      if (WEG.has(code)) weg.push({ ...eintrag, grund: code });
      else if (code === 'ItemNotAccessible') nichtAbrufbar.push({ ...eintrag, grund: code });
      else unklar.push({ ...eintrag, grund: code || 'ohne Begruendung' });
      continue;
    }
    const listing = it.offersV2?.listings?.find((l) => l.isBuyBoxWinner) || it.offersV2?.listings?.[0];
    const titel = (it.itemInfo?.title?.displayValue || '').slice(0, 70);
    if (listing?.price?.money?.amount != null) ok++;
    else ohneAngebot.push({ ...eintrag, titel, hinweis: listing?.availability?.message || 'kein Angebot' });
  }
  process.stdout.write(`  ${Math.min(i + 10, asins.length)}/${asins.length}\r`);
  await sleep(700);
}

console.log(
  `\nkaufbar: ${ok}   weg: ${weg.length}   ohne Angebot: ${ohneAngebot.length}` +
    `   nicht abrufbar: ${nichtAbrufbar.length}   unklar: ${unklar.length}\n`,
);

function liste(titel, eintraege, zeile) {
  if (!eintraege.length) return;
  console.log(titel);
  const nachDatei = {};
  for (const e of eintraege) (nachDatei[e.file] ||= []).push(e);
  for (const [file, list] of Object.entries(nachDatei).sort()) {
    console.log(`  ${file}`);
    for (const e of list) console.log(`     ${zeile(e)}`);
  }
  console.log('');
}

liste('WEG — ASIN gibt es nicht mehr, Eintrag ersetzen:', weg, (e) => `${e.asin}  [${e.grund}]`);
liste('OHNE ANGEBOT — löst auf, aber nicht kaufbar (kann zurückkommen):', ohneAngebot,
  (e) => `${e.asin}  ${e.hinweis}  ${e.titel}`);
liste('NICHT ABRUFBAR — steht bei Amazon, kommt nur nicht über die API:', nichtAbrufbar,
  (e) => `${e.asin}  [${e.grund}]`);
liste('UNKLAR — meist Drosselung, zweiter Lauf lohnt:', unklar, (e) => `${e.asin}  [${e.grund}]`);

// Reissleine: Wenn die Drosselung mehr als die Hälfte verschluckt hat, ist der
// Lauf keine Entwarnung, sondern ein kaputter Lauf. Das muss auffallen — sonst
// meldet der Job wochenlang "nichts gefunden", weil er nichts prüfen konnte.
const nichtsGesehen = ok + ohneAngebot.length + weg.length + nichtAbrufbar.length;
if (nichtsGesehen < asins.length / 2) {
  console.log(
    `::error::Nur ${nichtsGesehen} von ${asins.length} ASINs konnten geprüft werden — ` +
      'überwiegend Drosselung. Der Lauf sagt nichts aus, bitte später wiederholen.',
  );
  process.exit(reportOnly ? 0 : 1);
}

// Nur der Fall "weg" verlangt eine Handlung, also kippt auch nur er den Job.
// Alles andere ist eine Beobachtung und steht als Warnung im Lauf.
if (ohneAngebot.length) console.log(`::warning::${ohneAngebot.length} von ${asins.length} ASINs ohne kaufbares Angebot`);
if (nichtAbrufbar.length) console.log(`::warning::${nichtAbrufbar.length} ASINs nicht über die API abrufbar`);
if (unklar.length) console.log(`::warning::${unklar.length} ASINs ungeprüft (meist Drosselung)`);
if (weg.length) console.log(`::error::${weg.length} von ${asins.length} ASINs existieren nicht mehr`);

process.exit(!reportOnly && weg.length ? 1 : 0);
