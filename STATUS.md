# historische-schuhe.de — STATUS

**Stand:** 2026-06-14 · Bootstrap + Crawl + Config + erste Content-Migration. Build grün (23 Seiten).

## Neu in dieser Runde
- **Live-WP gecrawlt** (`www.historische-schuhe.de`, Yoast-Sitemap): 37 Artikel + Taxonomie. Vollständige Slug-Preservation-Map in `research/CRAWL-INVENTORY.md`. Bestehender Content ist AI/dünn → wird neu & besser geschrieben, **Slugs 1:1 erhalten**.
- **Silo-Modell angepasst** an reale Content-Achse: `stil` → **`kultur`** (China/Japan/Indien/Türkei). Silos jetzt: epoche | kultur | schuhtyp | ratgeber. Alter `/stile/`-Pfad leitet auf `/kulturen/`.
- **Affiliate/Tracking verdrahtet:** Amazon-Tag `historische-schuhe.de-21` (`src/data/affiliate.ts`), AdSense `ca-pub-7432388986384363` (Loader in BaseLayout-Head), `public/ads.txt` + `public/robots.txt`. Impressum = Webmagics Ltd.
- **6 Flagship-Artikel migriert** (echte Slugs, neu geschrieben, faktentreu, GEO/AEO-Frageblöcke, interne Verlinkung):
  - epoche: `schuhe-im-mittelalter`, `roemische-legionaersschuhe`, `schuhe-der-aegyptischen-pharaonen`
  - kultur: `chinesische-lotus-schuhe`, `japanische-geta-schuhe`
  - schuhtyp (money): `mittelalterliche-stiefel-schuhe`

## Was steht
- **Design** „Leder & Pergament" (Vorlage-DNA Paragraph, umgefärbt). Tokens in `src/styles/brand.css`. Light-Theme: Pergament-Canvas, Oxblood-CTA, Messing-Akzent, Cormorant Garamond + Inter. Siehe `DESIGN-LEDER.md`.
- **Startseiten-Mockup** `mockups/index.html` (Node-Server Port 4877) — verifiziert.
- **Astro 5 + Tailwind 4** Projekt im Root. Dev Port 4878 (`historische-schuhe-site` in zentraler launch.json).
- **Struktur** (analog chromzubehoer):
  - `src/layouts/` BaseLayout, LegalLayout
  - `src/components/` Header, Footer, HubPage
  - `src/content.config.ts` Collection `artikel` (silo: epoche|stil|schuhtyp|ratgeber; type: ratgeber|money|hub)
  - `src/data/silos.ts` Silo-Navigation
  - `src/pages/` index, [slug] (Artikel-Template mit Sidebar), mittelalterschuhe-vergleich (Money-Landing), Hubs (epochen/stile/schuhtypen/ratgeber), Legal (impressum/datenschutz/affiliate-hinweis/kontakt)
  - `src/content/artikel/` 6 Seed-Artikel inkl. Featured-Affiliate „Beste App & Shops zum Kaufen" (vom User gewünscht)

## Verifiziert
- `npm run build` grün, 16 Seiten.
- Startseite (Hero, Trust, 4 Silos, Money-Block, Ratgeber-Grid aus Collection, Epochen-Zeitstrahl, FAQ, CTA) rendert wie Mockup.
- Artikel-Template + Money-Landing rendern, interne Verlinkung greift.

## Content-Migration KOMPLETT (2026-06-14)
- **Alle 37 Live-Artikel migriert** auf erhaltenen Slugs, neu & faktentreu geschrieben (12 manuell + 30 via Multi-Agent-Workflow `scripts/migrate-articles.mjs`, alle 30 ok). **42 Artikel** gesamt (37 erhalten + 5 net-new Affiliate/Ratgeber). Build grün, **53 Seiten**. 0 Em-Dashes, echte Umlaute, FAQ-Blöcke + interne Spiderweb-Verlinkung + Affiliate-Disclosure. Duplikat-Cluster (Mittelalter, 19. Jh., 18. Jh.) als Pillar + differenzierte Subthemen.
- Workflow-Script wiederverwendbar (resume via `resumeFromRunId`).

## Bilder KOMPLETT (2026-06-14)
- **41/43 echte, frei lizenzierte Wikimedia-Commons-Bilder** (PD/CC) via `scripts/fetch-images.mjs` geholt, lokal in `public/images/articles/`, Attribution-Registry `src/data/images.json` (Autor + Lizenz + Quelle aus Commons-API, nichts erfunden). Museumslastig (MET, Bata Shoe Museum, Rijksmuseum, LACMA, PAS/FindID), strenge Relevanzfilter + Kategorie-Fallback + Dedup.
- `Figure.astro` (Hero mit Bildnachweis-Caption) in `[slug].astro`; Hub-Cards + Startseiten-Grid + Hero nutzen Bilder; **`/bildnachweise/`** listet alle 41 (Footer-Link). Build grün, **54 Seiten**.
- Ohne passendes Bild: `schuhe-der-1980er-jahre` (Sneaker) → Gradient-Fallback; Hero nutzt Mittelalterschuh-Foto. Bei Bedarf nachliefern.
- `farbige-hosentrager`: laut User gelöscht/nicht migriert (war nie angelegt).

## Interne Verlinkung KOMPLETT (2026-06-14)
- **2 Layer:** (a) deterministischer „Verwandte Beiträge"-Block in `[slug].astro` (4 Silo-/Epochen-Geschwister pro Artikel + „Alle Beiträge in <Silo>"-Link); (b) kontextuelle Inline-Links im Fließtext via Multi-Agent-Workflow (`scripts/link-workflow.mjs`, 2 Läufe wegen API-Rate-Limit beim 1. 42er-Burst, dann 10er-Nachzügler).
- **210 interne Body-Links über 42 Artikel** (Ø 5/Artikel), **jeder Artikel ≥3**, **0 kaputte Ziele** (geprüft). Spiderweb: Silo + Epochen-Familie bevorzugt, Brücken zu Pflege/Passform/Vergleich. Build grün, 54 Seiten.
- Reusable: `scripts/articles-index.mjs`, `scripts/gen-link-workflow.mjs`, `scripts/link-workflow.mjs`.

## Amazon PA-API + Git KOMPLETT (2026-06-26)
- **PA-API aktiv**, Tag `historische-schuhe.de-21`. `scripts/fetch-amazon.mjs` (SigV4, GetItems/SearchItems) + `npm run amazon`. **18 Produkte / 6 Gruppen** (mittelalterschuhe, lederstiefel, roemische-sandalen, bundschuhe, larp-stiefel, schuhpflege) in `src/data/amazon-products.json` (+ asins.json). Keys NUR in `.secrets/amazon-paapi-historische-schuhe.env` (chmod 600, außerhalb Git) — **nie committet**.
- Komponenten `AmazonBox.astro` + `AmazonBoxGrid.astro` (Leder-Theme), Schema-Feld `amazonGroup`. Eingebunden: `/mittelalterschuhe-vergleich/`, neue `/lederstiefel-vergleich/`, + 7 Artikel via `amazonGroup`. rel="sponsored nofollow noopener".
- **Git-Repo initialisiert** (Initial Commit `92eee1d`, Branch main), `.gitignore` schützt secrets/env. GitHub-Action `amazon-refresh.yml` (wöchentlich, Repo-Secrets) committet frische Produktdaten zurück.
- **ClickUp** Task `869cvcu0c` aktualisiert: Status „live site", Theme=Astro, Monetization=amz+adsense, Kommentar mit Vollstatus. AMZ ID war bereits korrekt.
- PA-API liefert aktuell teils KEINE Preise → Box-Fallback „Bei Amazon ansehen" (greift, normalisiert sich mit Account-Reife).

## Automatisierung LIVE (2026-07-01/03)
- **Hosting:** A2 Hosting / cPanel (Apache), Docroot `…/astro-site/dist`. Canonical **www** (`public/.htaccess`: HTTP→HTTPS, non-www→www).
- **Auto-Deploy:** `.github/workflows/deploy.yml` — jeder Push auf main → Astro-Build → `dist/` committen → SSH-Deploy zu A2. Secrets `CPANEL_USER`+`SSH_PRIVATE_KEY` gesetzt, Runs grün.
- **Auto-Amazon:** `amazon-refresh.yml` (Mo 04:00 UTC) → `npm run amazon` → committet Produktdaten → löst Deploy aus. Amazon-Secrets gesetzt.
- **Reconciled (diese Runde):** `astro.config` `site` → www + `@astrojs/sitemap` (erzeugt `/sitemap-index.xml`), `robots.txt` → www-Sitemap, `/thema/`-301-Redirects in `.htaccess` (statt Cloudflare `_redirects`). Cloudflare-Artefakte (`_redirects`, `deploy-cloudflare.yml`) entfernt. Build grün, 55 Seiten + Sitemap.

## OFFEN (To-Dos)
1. **GTM-ID** („kommt noch") + restliche Impressum-Daten (Webmagics HE-Nr.).
2. ASIN-/Keyword-Feinschliff (mehr Authentizität, echte Preise), optional 1980er-Sneaker-Bild.
3. Semrush-Recherche, Feinlektorat, Mobile-Menü Pattern B.

## Befehle
- Dev: `npm run dev --prefix "Affiliate projects/historische-schuhe.de" -- --port 4878`
- Build: `npm run build` im Projektordner
