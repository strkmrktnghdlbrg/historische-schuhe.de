# Deploy & Automatisierung — historische-schuhe.de

Repo: https://github.com/strkmrktnghdlbrg/historische-schuhe.de (privat)
Hosting: **A2 Hosting / cPanel (Apache)**, Docroot `…/historische-schuhe.de/astro-site/dist`.
Canonical: **www** (HTTP→HTTPS und non-www→www via `public/.htaccess`).

## Alles laeuft automatisch

**1. Deploy (bei jedem Push auf `main`)** — `.github/workflows/deploy.yml`
- baut Astro (`npm run build` → `dist/`), committet `dist/` zurueck auf `main`,
- deployt per SSH auf A2 Hosting (git pull am Server + Rechte setzen).
- Secrets: `CPANEL_USER`, `SSH_PRIVATE_KEY` (gesetzt). Laeuft bereits gruen.

**2. Amazon-Produktdaten (woechentlich, Mo 04:00 UTC)** — `.github/workflows/amazon-refresh.yml`
- `npm run amazon` holt frische amazon.de-Daten (Tag `historische-schuhe.de-21`),
- committet `src/data/amazon-products.json` + `amazon-asins.json` → loest Deploy aus.
- Secrets: `AMAZON_PAAPI_ACCESS_KEY`, `AMAZON_PAAPI_SECRET_KEY`, `AMAZON_PARTNER_TAG` (gesetzt).
- Manuell antreiben: `gh workflow run "Amazon-Produktdaten aktualisieren" -R strkmrktnghdlbrg/historische-schuhe.de`

## Redirects & SEO
- `public/.htaccess`: HTTP→HTTPS, non-www→www, alte `/thema/`-Kategorien → neue Hubs/Artikel (301), Gzip, Caching, Security-Header.
- `astro.config.mjs` `site` = `https://www.historische-schuhe.de` → korrekte Canonicals + Sitemap.
- `@astrojs/sitemap` erzeugt `/sitemap-index.xml` (in `robots.txt` referenziert).

## Sicherheit
- Keine Keys im Repo (geprueft). `.gitignore` blockt `*.env` und `.secrets/`.
- Alle Credentials nur als verschluesselte GitHub-Secrets bzw. lokal in `.secrets/`.
