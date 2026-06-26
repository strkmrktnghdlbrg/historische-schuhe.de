#!/usr/bin/env node
/**
 * fetch-amazon.mjs — Amazon PA-API 5.0 fuer historische-schuhe.de
 *
 * Pro Gruppe in src/data/amazon-asins.json:
 *   - feste "asins": []  -> GetItems holt genau diese ASINs
 *   - "keyword" gesetzt, asins leer -> SearchItems findet passende Produkte,
 *     die gefundenen ASINs werden in amazon-asins.json zurueckgeschrieben
 *
 * Output: src/data/amazon-products.json (keyed by ASIN).
 *
 * Credentials (Reihenfolge): process.env, dann
 *   /Users/joshuastark/Documents/Claude Code/.secrets/amazon-paapi-historische-schuhe.env
 * Variablen: AMAZON_PAAPI_ACCESS_KEY, AMAZON_PAAPI_SECRET_KEY, AMAZON_PARTNER_TAG,
 *   AMAZON_HOST (default webservices.amazon.de), AMAZON_REGION (default eu-west-1),
 *   AMAZON_MARKETPLACE (default www.amazon.de)
 *
 * Nutzung:  npm run amazon
 */
import crypto from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SECRETS_FILE = '/Users/joshuastark/Documents/Claude Code/.secrets/amazon-paapi-historische-schuhe.env';
const ASINS_PATH = resolve(ROOT, 'src/data/amazon-asins.json');
const OUT_PATH = resolve(ROOT, 'src/data/amazon-products.json');

/* --- 1. Env laden --- */
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
const fileEnv = loadEnvFile(SECRETS_FILE);
const env = (k, d) => process.env[k] || fileEnv[k] || d;

const ACCESS = env('AMAZON_PAAPI_ACCESS_KEY');
const SECRET = env('AMAZON_PAAPI_SECRET_KEY');
const TAG = env('AMAZON_PARTNER_TAG');
const HOST = env('AMAZON_HOST', 'webservices.amazon.de');
const REGION = env('AMAZON_REGION', 'eu-west-1');
const MARKETPLACE = env('AMAZON_MARKETPLACE', 'www.amazon.de');
const SERVICE = 'ProductAdvertisingAPI';

if (!ACCESS || !SECRET || !TAG) {
  console.error('FEHLER: Credentials fehlen (ACCESS/SECRET/TAG). .secrets/amazon-paapi-historische-schuhe.env pruefen.');
  process.exit(1);
}
if (TAG.startsWith('PENDING')) {
  console.error('FEHLER: AMAZON_PARTNER_TAG ist noch ein Platzhalter ("' + TAG + '").');
  console.error('Echten historische-schuhe.de Partner-Tag in .secrets/amazon-paapi-historische-schuhe.env eintragen, dann erneut ausfuehren.');
  process.exit(1);
}

const RESOURCES = [
  'Images.Primary.Large',
  'ItemInfo.Title',
  'ItemInfo.ByLineInfo',
  'ItemInfo.Features',
  'Offers.Listings.Price',
  'Offers.Listings.DeliveryInfo.IsPrimeEligible',
  'Offers.Listings.MerchantInfo',
];

/* --- 2. SigV4-Signierung (generisch fuer GetItems/SearchItems) --- */
const sha256 = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex');
const hmac = (key, s) => crypto.createHmac('sha256', key).update(s, 'utf8').digest();

function signedHeaders(path, target, payload) {
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''); // YYYYMMDDTHHMMSSZ
  const dateStamp = amzDate.slice(0, 8);
  const signedList = 'content-encoding;host;x-amz-date;x-amz-target';
  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `host:${HOST}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${target}\n`;
  const canonicalRequest = ['POST', path, '', canonicalHeaders, signedList, sha256(payload)].join('\n');
  const scope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256(canonicalRequest)].join('\n');
  const kDate = hmac('AWS4' + SECRET, dateStamp);
  const kRegion = hmac(kDate, REGION);
  const kService = hmac(kRegion, SERVICE);
  const kSigning = hmac(kService, 'aws4_request');
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');
  return {
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=utf-8',
    'host': HOST,
    'x-amz-date': amzDate,
    'x-amz-target': target,
    'Authorization': `AWS4-HMAC-SHA256 Credential=${ACCESS}/${scope}, SignedHeaders=${signedList}, Signature=${signature}`,
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(path, target, body, attempt = 0) {
  const payload = JSON.stringify(body);
  const res = await fetch(`https://${HOST}${path}`, {
    method: 'POST',
    headers: signedHeaders(path, target, payload),
    body: payload,
  });
  const text = await res.text();
  if (!res.ok) {
    // 429 Throttling: bis zu 2x mit Backoff wiederholen
    if (res.status === 429 && attempt < 2) {
      await sleep(4000 * (attempt + 1));
      return call(path, target, body, attempt + 1);
    }
    return { ok: false, status: res.status, body: text };
  }
  return { ok: true, data: JSON.parse(text) };
}

const getItems = (asins) => call('/paapi5/getitems',
  'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
  { ItemIds: asins, ItemIdType: 'ASIN', Marketplace: MARKETPLACE, PartnerTag: TAG, PartnerType: 'Associates', Resources: RESOURCES });

const searchItems = (keyword, searchIndex, count) => call('/paapi5/searchitems',
  'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
  { Keywords: keyword, SearchIndex: searchIndex || 'All', ItemCount: Math.min(count || 6, 10), Marketplace: MARKETPLACE, PartnerTag: TAG, PartnerType: 'Associates', Resources: RESOURCES });

function normalize(item) {
  const listing = item.Offers?.Listings?.[0];
  return {
    asin: item.ASIN,
    title: item.ItemInfo?.Title?.DisplayValue || '',
    brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue
        || item.ItemInfo?.ByLineInfo?.Manufacturer?.DisplayValue || '',
    features: item.ItemInfo?.Features?.DisplayValues?.slice(0, 3) || [],
    image: item.Images?.Primary?.Large?.URL || '',
    price: listing?.Price?.DisplayAmount || '',
    priceAmount: listing?.Price?.Amount ?? null,
    isPrime: !!listing?.DeliveryInfo?.IsPrimeEligible,
    url: item.DetailPageURL || '', // enthaelt bereits den Partner-Tag
    fetchedAt: new Date().toISOString().slice(0, 10),
  };
}

/* --- 3. Pro Gruppe abrufen --- */
const asinData = JSON.parse(readFileSync(ASINS_PATH, 'utf8'));
// Bestehende Produkte laden und mergen, damit ein transienter 429 keine Gruppe loescht
let products = {};
if (existsSync(OUT_PATH)) {
  try { products = JSON.parse(readFileSync(OUT_PATH, 'utf8')) || {}; } catch { products = {}; }
}
let total = 0;
const groups = Object.entries(asinData).filter(([k]) => !k.startsWith('_'));

console.log(`Amazon PA-API: Tag=${TAG}, Marktplatz=${MARKETPLACE}, ${groups.length} Gruppen`);

for (const [key, g] of groups) {
  let items = [];
  if (g.asins && g.asins.length > 0) {
    const r = await getItems(g.asins.slice(0, 10));
    if (!r.ok) { console.warn(`  ! ${key} GetItems ${r.status}: ${r.body.slice(0, 200)}`); }
    else items = r.data?.ItemsResult?.Items || [];
  } else if (g.keyword) {
    const r = await searchItems(g.keyword, g.searchIndex, g.count);
    if (!r.ok) { console.warn(`  ! ${key} SearchItems ${r.status}: ${r.body.slice(0, 200)}`); }
    else items = r.data?.SearchResult?.Items || [];
    // gefundene ASINs in die Gruppe zurueckschreiben
    g.asins = items.map((it) => it.ASIN);
  }
  for (const it of items) { products[it.ASIN] = normalize(it); total++; }
  console.log(`  ${key}: ${items.length} Produkte`);
  await sleep(2000); // Drossel gegen 429
}

writeFileSync(OUT_PATH, JSON.stringify(products, null, 2) + '\n', 'utf8');
writeFileSync(ASINS_PATH, JSON.stringify(asinData, null, 2) + '\n', 'utf8');
console.log(`\nFertig: ${total} Produkte -> src/data/amazon-products.json`);
console.log(`Gefundene ASINs zurueckgeschrieben -> src/data/amazon-asins.json`);
