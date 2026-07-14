#!/usr/bin/env node
/**
 * fetch-amazon.mjs — holt Produktdaten von der Amazon Creators API fuer historische-schuhe.de
 *
 * Ersetzt die abgeschaltete PA-API 5.0 (SigV4). Neue Auth: OAuth2 client-credentials.
 *
 * Pro Gruppe in src/data/amazon-asins.json:
 *   - feste "asins": []  -> getItems holt genau diese ASINs
 *   - "keyword" gesetzt, asins leer -> searchItems findet passende Produkte,
 *     die gefundenen ASINs werden in amazon-asins.json zurueckgeschrieben
 *
 * Output: src/data/amazon-products.json (keyed by ASIN).
 *
 * Credentials (in dieser Reihenfolge):
 *   1. process.env  (z.B. GitHub Actions Secrets)
 *   2. Projekt-Tag/Marktplatz: .secrets/amazon-paapi-historische-schuhe.env
 *   3. Shared Creators-Creds:  .secrets/amazon-creators-api.env
 *
 * Erwartete Variablen:
 *   CREATORS_CREDENTIAL_ID, CREATORS_CREDENTIAL_SECRET   (OAuth2-App, shared)
 *   AMAZON_PARTNER_TAG                                    (projekt-spezifisch)
 *   CREATORS_MARKETPLACE / AMAZON_MARKETPLACE (default www.amazon.de)
 *
 * Nutzung:  npm run amazon
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CREATORS_FILE = '/Users/joshuastark/Documents/Claude Code/.secrets/amazon-creators-api.env';
const PROJECT_FILE = '/Users/joshuastark/Documents/Claude Code/.secrets/amazon-paapi-historische-schuhe.env';
const ASINS_PATH = resolve(ROOT, 'src/data/amazon-asins.json');
const OUT_PATH = resolve(ROOT, 'src/data/amazon-products.json');

/* --- 1. Env laden (Projekt-Tag + shared Creators-Creds) --- */
function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}
const fileEnv = { ...loadEnvFile(PROJECT_FILE), ...loadEnvFile(CREATORS_FILE) };
const env = (k, d) => process.env[k] || fileEnv[k] || d;

const CLIENT_ID = env('CREATORS_CREDENTIAL_ID');
const CLIENT_SECRET = env('CREATORS_CREDENTIAL_SECRET');
const TAG = env('AMAZON_PARTNER_TAG');
const MARKETPLACE = env('CREATORS_MARKETPLACE') || env('AMAZON_MARKETPLACE', 'www.amazon.de');
const TOKEN_URL = 'https://api.amazon.com/auth/o2/token';
const GETITEMS_URL = 'https://creatorsapi.amazon/catalog/v1/getItems';
const SEARCHITEMS_URL = 'https://creatorsapi.amazon/catalog/v1/searchItems';

if (!CLIENT_ID || !CLIENT_SECRET || !TAG) {
  console.error('FEHLER: Credentials fehlen (CREATORS_CREDENTIAL_ID/SECRET oder AMAZON_PARTNER_TAG).');
  console.error('.secrets/amazon-creators-api.env und .secrets/amazon-paapi-historische-schuhe.env pruefen.');
  process.exit(1);
}
if (TAG.startsWith('PENDING')) {
  console.error('FEHLER: AMAZON_PARTNER_TAG ist noch ein Platzhalter ("' + TAG + '").');
  console.error('Echten historische-schuhe.de Partner-Tag in .secrets/amazon-paapi-historische-schuhe.env eintragen, dann erneut ausfuehren.');
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

function normalize(item) {
  const listing = item.offersV2?.listings?.[0];
  return {
    asin: item.asin,
    title: item.itemInfo?.title?.displayValue || '',
    brand: item.itemInfo?.byLineInfo?.brand?.displayValue
        || item.itemInfo?.byLineInfo?.manufacturer?.displayValue || '',
    features: item.itemInfo?.features?.displayValues?.slice(0, 3) || [],
    image: item.images?.primary?.large?.url || '',
    price: listing?.price?.money?.displayAmount || '',
    priceAmount: listing?.price?.money?.amount ?? null,
    isPrime: !!listing?.deliveryInfo?.isPrimeEligible,
    url: item.detailPageURL || '', // enthaelt bereits den Partner-Tag
    fetchedAt: new Date().toISOString().slice(0, 10),
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
const groups = Object.entries(asinData).filter(([k]) => !k.startsWith('_'));

console.log(`Amazon Creators API: Tag=${TAG}, Marktplatz=${MARKETPLACE}, ${groups.length} Gruppen`);
const token = await getToken();

for (const [key, g] of groups) {
  let items = [];
  if (g.asins && g.asins.length > 0) {
    const r = await getItems(token, g.asins);
    if (!r.ok) { console.warn(`  ! ${key} getItems ${r.status}: ${r.body.slice(0, 200)}`); }
    else items = r.items;
  } else if (g.keyword) {
    const r = await searchItems(token, g.keyword, g.searchIndex, g.count);
    if (!r.ok) { console.warn(`  ! ${key} searchItems ${r.status}: ${r.body.slice(0, 200)}`); }
    else items = r.items;
    // gefundene ASINs in die Gruppe zurueckschreiben
    g.asins = items.map((it) => it.asin);
  }
  for (const it of items) { products[it.asin] = normalize(it); total++; }
  console.log(`  ${key}: ${items.length} Produkte`);
  await sleep(1500); // Drossel
}

writeFileSync(OUT_PATH, JSON.stringify(products, null, 2) + '\n', 'utf8');
writeFileSync(ASINS_PATH, JSON.stringify(asinData, null, 2) + '\n', 'utf8');
console.log(`\nFertig: ${total} Produkte -> src/data/amazon-products.json`);
console.log(`Gefundene ASINs zurueckgeschrieben -> src/data/amazon-asins.json`);
