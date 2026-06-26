// Zentrale Affiliate-/Tracking-Konfiguration.
export const AMAZON_TAG = 'historische-schuhe.de-21';
export const ADSENSE_CLIENT = 'ca-pub-7432388986384363';

// Amazon-Suchlink mit Partner-Tag (Platzhalter, bis echte ASINs hinterlegt sind).
export function amazonSearch(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.amazon.de/s?k=${q}&tag=${AMAZON_TAG}`;
}

// Amazon-Produktlink per ASIN mit Partner-Tag.
export function amazonProduct(asin: string): string {
  return `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`;
}
