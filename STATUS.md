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

## OFFEN (To-Dos)
1. **Echte Amazon-Produkte/ASINs** in Money-Seiten (`mittelalterschuhe-vergleich`, Tag `historische-schuhe.de-21` steht). Aktuell Platzhalter-Emojis/-Preise.
2. Optional: Bild für `schuhe-der-1980er-jahre` (Sneaker) gezielt nachliefern.
3. **Semrush-Keyword-Recherche** je Silo zur weiteren Priorisierung/Optimierung.
4. **GTM-ID** (offen, „kommt noch") + restliche Impressum-Daten (Webmagics HE-Nr.) + Hosting/Deploy (GitHub Actions, www→non-www 301, alte `/thema/`-Kategorien → Hub-301, `/thema/farbige-hosentrager/` → 410/301).
5. Inhaltliches Feinlektorat der 30 Workflow-Artikel (Stichprobe top, Vollcheck empfohlen).
6. Mobile-Menü ggf. auf Pattern B (Slide-in-Drawer) angleichen.

## Befehle
- Dev: `npm run dev --prefix "Affiliate projects/historische-schuhe.de" -- --port 4878`
- Build: `npm run build` im Projektordner
