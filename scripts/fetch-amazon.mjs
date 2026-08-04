#!/usr/bin/env node
/**
 * fetch-amazon.mjs — holt Produktdaten von der Amazon Creators API fuer historische-schuhe.de
 *
 * Ersetzt die abgeschaltete PA-API 5.0 (SigV4). Neue Auth: OAuth2 client-credentials.
 * Gleiche Konvention wie scooter-elektrik.de/scripts/fetch-amazon-prices.mjs
 * (Referenz-Implementierung fuer alle Amazon-Affiliate-Repos).
 *
 * Pro Gruppe in src/data/amazon-asins.json:
 *   - feste "asins": []  -> getItems holt genau diese ASINs
 *   - "keyword" gesetzt, asins leer -> searchItems findet passende Produkte,
 *     die gefundenen ASINs werden in amazon-asins.json zurueckgeschrieben
 *
 * Output: src/data/amazon-products.json (keyed by ASIN).
 *
 * Credentials: .env im Repo-Root (gitignored) oder process.env (CI-Secrets):
 *   AMAZON_CREATOR_CLIENT_ID
 *   AMAZON_CREATOR_CLIENT_SECRET
 *   AMAZON_CREATOR_PARTNER_TAG      (historische-schuhe.de-21)
 *   AMAZON_CREATOR_MARKETPLACE      (default www.amazon.de)
 *
 * Nutzung:  npm run amazon
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ASINS_PATH = resolve(ROOT, 'src/data/amazon-asins.json');
const OUT_PATH = resolve(ROOT, 'src/data/amazon-products.json');

/* --- 1. Env laden (.env im Repo-Root, process.env gewinnt) --- */
function loadEnv() {
  const out = {};
  const path = resolve(ROOT, '.env');
  if (existsSync(path)) {
    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return { ...out, ...process.env };
}
const env = loadEnv();

const CLIENT_ID = env.AMAZON_CREATOR_CLIENT_ID;
const CLIENT_SECRET = env.AMAZON_CREATOR_CLIENT_SECRET;
const TAG = env.AMAZON_CREATOR_PARTNER_TAG;
const MARKETPLACE = env.AMAZON_CREATOR_MARKETPLACE || 'www.amazon.de';
// EU-Token-Endpoint fuer .de-Konten (nicht api.amazon.com).
const TOKEN_URL = 'https://api.amazon.co.uk/auth/o2/token';
const GETITEMS_URL = 'https://creatorsapi.amazon/catalog/v1/getItems';
const SEARCHITEMS_URL = 'https://creatorsapi.amazon/catalog/v1/searchItems';

if (!CLIENT_ID || !CLIENT_SECRET || !TAG) {
  console.error('FEHLER: AMAZON_CREATOR_CLIENT_ID / _CLIENT_SECRET / _PARTNER_TAG fehlen.');
  console.error('Lokal: .env im Repo-Root anlegen. CI: GitHub-Secrets gleichen Namens setzen.');
  process.exit(1);
}

/* --- Nur GUELTIGE camelCase-Resources (andere => HTTP 400) --- */
const RESOURCES = [
  'images.primary.large',
  'itemInfo.title',
  'itemInfo.byLineInfo',
  'itemInfo.features',
  'offersV2.listings.price',
  'offersV2.listings.availability',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* --- 2. OAuth2 Token holen (client_credentials, gilt 1h) --- */
async function getToken() {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'creatorsapi::default',
  });
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const text = await res.text();
  if (!res.ok) { console.error(`Token-Fehler ${res.status}: ${text.slice(0, 300)}`); process.exit(1); }
  return JSON.parse(text).access_token;
}

/* --- 3. getItems / searchItems (Creators, lowerCamelCase) --- */
async function getItems(token, asins) {
  const payload = JSON.stringify({
    itemIds: asins.slice(0, 10),
    itemIdType: 'ASIN',
    marketplace: MARKETPLACE,
    partnerTag: TAG,
    partnerType: 'Associates',
    resources: RESOURCES,
  });
  const res = await fetch(GETITEMS_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: payload,
  });
  const text = await res.text();
  if (!res.ok) return { ok: false, status: res.status, body: text };
  return { ok: true, items: JSON.parse(text)?.itemsResult?.items || [] };
}

async function searchItems(token, keyword, searchIndex, count) {
  const payload = JSON.stringify({
    keywords: keyword,
    searchIndex: searchIndex || 'All',
    itemCount: Math.min(count || 6, 10),
    marketplace: MARKETPLACE,
    partnerTag: TAG,
    partnerType: 'Associates',
    resources: RESOURCES,
  });
  const res = await fetch(SEARCHITEMS_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: payload,
  });
  const text = await res.text();
  if (!res.ok) return { ok: false, status: res.status, body: text };
  return { ok: true, items: JSON.parse(text)?.searchResult?.items || [] };
}

const today = new Date().toISOString().slice(0, 10);

/**
 * Farb-/Groessen-Varianten desselben Artikels kommen als eigene ASINs zurueck
 * ("… Stiefel, Braun, 42" / "… (Schwarz, EU 41)"). Gleicher Key = gleiches Produkt.
 * Spiegelt variantKey() in src/components/AmazonBoxGrid.astro.
 */
const VARIANT_WORDS = new Set(['größe','groesse','grösse','gr','eu','us','uk','numerisch','erwachsene','schuhgrößensystem','braun','dunkelbraun','hellbraun','schwarz','weiß','weiss','beige','rot','blau','grün','gruen','grau','gold','silber','bunt','brown','black','white','red','blue','green','grey','gray','dark','light','farbe','color','colour']);
function variantKey(p) {
  const base = String(p.title || '')
    .split(/[(,]/)[0]
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, ' ')
    .split(' ')
    // Groessen-, Farb- und Einzelbuchstaben-Token raus: nur sie unterscheiden Varianten
    .filter((t) => t.length > 1 && !/^\d+$/.test(t) && !VARIANT_WORDS.has(t))
    .slice(0, 6)
    .join(' ');
  return `${String(p.brand || '').toLowerCase()}|${base}`;
}

function normalize(item) {
  const listings = item.offersV2?.listings || [];
  const listing = listings.find((l) => l.isBuyBoxWinner) || listings[0];
  const money = listing?.price?.money;
  return {
    asin: item.asin,
    title: item.itemInfo?.title?.displayValue || '',
    brand: item.itemInfo?.byLineInfo?.brand?.displayValue
        || item.itemInfo?.byLineInfo?.manufacturer?.displayValue || '',
    features: item.itemInfo?.features?.displayValues?.slice(0, 3) || [],
    image: item.images?.primary?.large?.url || '',
    price: money?.displayAmount || '',
    priceAmount: money?.amount ?? null,
    // Associates-Bedingungen: ein angezeigter Preis braucht ein Stand-Datum.
    priceUpdated: money?.amount != null ? today : null,
    isPrime: !!listing?.deliveryInfo?.isPrimeEligible,
    url: item.detailPageURL || '', // enthaelt bereits den Partner-Tag
    fetchedAt: today,
  };
}

/* --- 4. Pro Gruppe abrufen --- */
const asinData = JSON.parse(readFileSync(ASINS_PATH, 'utf8'));
// Bestehende Produkte laden und mergen, damit ein transienter Fehler keine Gruppe loescht
let products = {};
if (existsSync(OUT_PATH)) {
  try { products = JSON.parse(readFileSync(OUT_PATH, 'utf8')) || {}; } catch { products = {}; }
}
let total = 0;
let withPrice = 0;
const groups = Object.entries(asinData).filter(([k]) => !k.startsWith('_'));

console.log(`Amazon Creators API: Tag=${TAG}, Marktplatz=${MARKETPLACE}, ${groups.length} Gruppen`);
const token = await getToken();

for (const [key, g] of groups) {
  const want = g.count || 6;
  const picked = [];      // normalisierte Produkte, dedupliziert
  const seen = new Set(); // variantKey der bereits uebernommenen Produkte

  const take = (items) => {
    let added = 0;
    for (const it of items) {
      const p = normalize(it);
      if (!p.title) continue;
      const k = variantKey(p);
      if (seen.has(k)) continue; // Farb-/Groessenvariante eines schon gelisteten Artikels
      seen.add(k);
      picked.push(p);
      added++;
    }
    return added;
  };

  if (g.asins && g.asins.length > 0) {
    const r = await getItems(token, g.asins);
    if (!r.ok) console.warn(`  ! ${key} getItems ${r.status}: ${r.body.slice(0, 200)}`);
    else take(r.items);
  }
  // Zu wenige eigenstaendige Produkte (z.B. weil Varianten rausgefallen sind) -> per Keyword auffuellen
  if (picked.length < want && g.keyword) {
    await sleep(1500);
    const r = await searchItems(token, g.keyword, g.searchIndex, 10);
    if (!r.ok) console.warn(`  ! ${key} searchItems ${r.status}: ${r.body.slice(0, 200)}`);
    else take(r.items);
  }

  const finalItems = picked.slice(0, want);
  g.asins = finalItems.map((p) => p.asin);

  let groupPrices = 0;
  for (const p of finalItems) {
    products[p.asin] = p;
    total++;
    if (p.priceAmount != null) groupPrices++;
  }
  withPrice += groupPrices;
  console.log(`  ${key}: ${finalItems.length} Produkte, ${groupPrices} mit Preis`);
  await sleep(1500); // Drossel
}

// Nicht mehr verlinkte ASINs (ausgetauschte Varianten) rauswerfen — sonst bleiben
// veraltete Preise mit altem Stand-Datum in der Datei liegen.
const referenced = new Set(groups.flatMap(([, g]) => g.asins || []));
for (const asin of Object.keys(products)) if (!referenced.has(asin)) delete products[asin];

writeFileSync(OUT_PATH, JSON.stringify(products, null, 2) + '\n', 'utf8');
writeFileSync(ASINS_PATH, JSON.stringify(asinData, null, 2) + '\n', 'utf8');
console.log(`\nFertig: ${total} Produkte (${withPrice} mit Preis) -> src/data/amazon-products.json`);
console.log(`Gefundene ASINs zurueckgeschrieben -> src/data/amazon-asins.json`);
if (total > 0 && withPrice === 0) {
  // Frueher still durchgelaufen: Seite zeigte monatelang nur "Preis bei Amazon".
  console.error('WARNUNG: kein einziger Preis geliefert — offersV2-Resource oder Partner-Tag pruefen.');
  process.exit(2);
}
