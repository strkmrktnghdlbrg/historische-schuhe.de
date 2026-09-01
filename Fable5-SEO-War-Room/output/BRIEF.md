# BRIEF — historische-schuhe.de (Stand 2026-08-31)

**Ziel:** Amazon-Affiliate-Provisionen (Tag `historische-schuhe.de-21`) über kaufnahe Rankings für Mittelalter-/Reenactment-/LARP-Schuhe; sekundär AdSense auf Wissens-Traffic.
**Kapazität:** 5 h/Woche.
**Stack:** Astro 5 auf A2 Hosting (Apache/.htaccess), Auto-Deploy via GitHub Actions, wöchentlicher Amazon-PA-API-Refresh. 42 Artikel, 52 Sitemap-URLs.
**Kontext:** Domain war bis ~2015 der Shop des Schuhmachers Christian Pohen („CP-Schuhe", epages). Relaunch als Affiliate-Portal Juni/Juli 2026. Google-Spam-Update 18.–21.08.2026 (Muster: programmatische Massenseiten) liegt direkt vor diesem Audit.

## 1. Ist-Zustand Rankings (DataForSEO, Aug 2026)

- **61 Keywords gesamt, 0 in Top 20.** Beste Position: 26 („schuhmode der 80er jahre"). ETV ≈ 37 €/Monat.
- **Trend fällt:** Pos-11-20-Keywords: Mai 13 → Juni 9 → Juli 5 → **Aug 1**. Der Relaunch hat den Verfall nicht gestoppt; das Aug-Spam-Update hat die Reste gekappt.
- Top-ETV-Cluster: `lotusfüße` (SV 2.900, Pos 83), 20er-Jahre-Schuhe (10 Varianten, SV je 720, Pos 40–60), 80er-Jahre (SV 880, Pos 26–73), `japanische schuhe` (720, Pos 79), `römische schuhe` (320, Pos 78).
- Money-Keywords: `mittelalter schuhe männer` Pos 74, `mittelalterliche schuhe` Pos 95 — **rankt mit der Startseite, nicht mit Money-Seiten**. Vergleichsseiten ranken für nichts.

## 2. Traffic & Conversion (GA4 544925204, 90 Tage)

- 201 organische Sessions (≈ 2/Tag), 234 Direct, 20 `affiliate_click` (Key Event, korrekt verdrahtet), 2.605 ad_impressions.
- Top-organische Landingpages: `/` (37), `/schuhe-der-1980er-jahre` (25), `/chinesische-lotus-schuhe` (19), `/schuhe-der-1920er-jahre` (16), `/schuhe-der-1960er` (12) — **der wenige Traffic landet auf den Vintage-/Info-Seiten, nicht auf Money-Seiten.**
- GA4-Custom-Dimensions: **keine** (link_url/link_text unsichtbar in Berichten — bekanntes Portfolio-Muster).

## 3. Indexierung & Anbindung

| System | Status |
|---|---|
| Google Index | Site ist indexiert (site:-Abfrage zeigt aktuelle URLs), aber Alt-Leiche `/blog/` (404) noch im Index |
| GSC | **KEINE Property** (Service-Account sieht 213 Properties, diese Domain fehlt) → keine Coverage-/Query-Daten. GTM-Container `GTM-5H9K4493` liefert live aus → TAG_MANAGER-Verifikation via `Tools/google-provision/gsc_provision.py` möglich |
| GA4 | Property 544925204 aktiv, Key Events konfiguriert ✓ |
| Bing/IndexNow | BWT registriert, IndexNow-Key live (200), URLs submitted ✓ |
| Redirects | `/thema/*` + Alt-Langslugs sauber per 301. **`/epages/*` (Alt-Shop) → 404** |

## 4. Backlinks — der unterschätzte Aktivposten

Eigene Domain: **97 Ref-Domains, 262 Backlinks, 47 broken (18 %), davon 13 dofollow.**

- **Profil ist nischen-echt, kein Spam-Problem:** mittelalterforum.com (100 Links), swashbuckler.style (50 dofollow), larpwiki.de, mastermyr.de, Reenactment-Gruppen (eyneburg.eu, stedinger.de, bergische-ritterschaft.de), französische LARP-Foren. Spam-Anteil grob 12–14 % der Hosts (URL-Shortener, „High Quality Dofollow Backlinks"-Anker, Bot-Verzeichnisse) — ignorierbar, kein Disavow nötig.
- **Alle 47 broken Links zeigen auf alte epages-Shop-URLs** (`/epages/61580448.sf/...`), 30 eindeutige Ziele, alle 404. Top-Ziele: Kategorie `W-schuhe`/Wendeschuhe (10 Links, 7 dofollow, u. a. mittelalterforum + dresden-spielt), Kategorie `Work-shop`/Selbermachen (4 dofollow, mastermyr.de Quellen-Seite), Hochmittelalter-Herrenschuhe, Holzschuhe/Trippen, Kinderschuhe. Anker: „CP-Schuhe", „Wendeschuhe", „Mittelalter und Wikingerschuhe kaufen - basteln".
- Daten: `data/dataforseo/backlinks_detail.json` + `broken_targets.json` (komplette 301-Zielliste).

## 5. Peer-Vergleich — Beweis, dass Autorität NICHT der Engpass ist

| Domain | Ref-Domains | Keywords | Organic ETV |
|---|---|---|---|
| **historische-schuhe.de** | **97** | **61** | **40 €** |
| kayserstuhl.de | 213 | 2.283 | 6.559 € |
| outfit4events.de | 569 | 9.597* | 108.339 € |
| battlemerchant.com | 2.821 | 9.773* | 132.344 € |
| celticwebmerchant.com | 1.097 | 5.596* | 27.551 € |

*\*Domain-Gesamtwerte aus discover; Pull enthält deren Top 300.*

**kayserstuhl.de ist der Beweis:** nur 2,2× unsere Ref-Domains, aber 37× Keywords und 160× ETV — mit tabellenlosen 90er-Jahre-.htm-Seiten. Rankt Platz 1 „römische schuhe" (SV 320), Platz 6 „mittelalter schuhe" (1.600), Platz 8 „wikinger schuhe" (480), Platz 3 „wendegenähte schuhe". Der Engpass von historische-schuhe.de ist **Abdeckung + Format**, nicht Linkaufbau. battlemerchant.com zeigt das Content-Modell: Blog-Ratgeber ranken Top 10 auf `wikinger` (33.100), `larp` (18.100), `reenactments` (2.900).

## 6. Query-Felder (SV Deutschland)

**A. Kernnische Mittelalter/Reenactment (klein, aber kaufnah, bester Topical Fit):**
`bundschuhe` 6.600 (Achtung: Mischintent mit Bundschuh-Bewegung, Wikipedia #1) · `mittelalter schuhe` 1.600 · `schnabelschuhe` 720 · `wikinger stiefel` 590 · `caligae` 590 · `wikinger schuhe` 480 · `mittelalter stiefel` 390 · `römische sandalen` 480 · `larp schuhe` 140 · `larp stiefel` 90. **Bundschuhe und Schnabelschuhe haben KEINE eigene Seite** trotz perfektem Fit. SERPs: Shops (leonardo-carbone, ritterladen, kayserstuhl) + vereinzelt Info (geo.de Platz 7 bei schnabelschuhe → Content kann ranken).

**B. Angrenzendes Volumenfeld Trachtenschuhe (das übersehene Feld):**
`haferlschuhe` 6.600 · `trachtenschuhe damen` 6.600 · `trachtenschuhe herren` 5.400 · `haferlschuhe herren` 3.600 · `trachtenschuhe` 3.600 · `haferlschuhe damen` 1.300 ≈ **26.500 SV kombiniert, CPC ~1 €**. Stand im ursprünglichen PLAN.md als Silo, wurde beim Kultur-Pivot fallengelassen. SERP: Shops + **GQ-Magazin Platz 7** („Die schönsten Haferlschuhe 2026") → redaktioneller Content rankt. Haferlschuh = historischer bayerischer Werkschuh → sauberer Brand-Fit.

**C. Adjazenz mit Vorsicht:** `gothic stiefel` 720, `piratenstiefel` 480, `viktorianische schuhe` 110. **Anti-Ziel:** `trippen schuhe` 2.400 SV ist Brand-Traffic der Berliner Designer-Marke Trippen (Top 3 = de.trippen.com) — nicht das Mittelalter-Überschuh-Keyword. Nicht jagen.

**D. Bestand mit Potenzial:** `lotusfüße` 2.900 SV, Pos 83, schwache Blog-SERP (frauenseiten.bremen, bambooblog, gehwerkstatt) → Top 10 mit Tiefe erreichbar, reiner AdSense-Play. 20er-Jahre-Cluster (~4.300 SV über Varianten, Pos 40–60, Shop-SERP mit otto/amazon/topvintage).

## 7. Affiliate-Integrität (geprüft 2026-08-31)

- 62 eindeutige Amazon-Ziele im Build, **alle** `/dp/`-Produktlinks mit korrektem Tag `historische-schuhe.de-21`, via Outbound-Gate `/go/?u=…` (robots-Disallow ✓, rel="sponsored nofollow noopener" ✓). **Null Suchlinks, null tote Tags.** 64 Produkte im Katalog, wöchentlicher Auto-Refresh (letzter: 31.08.). `check-asins.mjs` vorhanden (Creators-API-Credentials nur als GitHub-Secrets).

## 8. Duplikat-/Kannibalisierungs-Cluster (Spam-Update-relevant)

- Mittelalter: `schuhe-im-mittelalter` + `schuhe-des-mittelalters` + `schuhe-des-hochmittelalters` (+ `mittelalterliche-stiefel-schuhe` money)
- 18. Jh.: `schuhe-des-18-jahrhunderts` + `schuhe-des-18-jahrhunderts-in-europa`
- 19. Jh.: `schuhe-19-jahrhundert` + `schuhe-des-19-jahrhunderts` + `stiefel-schuhe-19-jahrhunderts`
- Rom/Antike: `schuhe-im-alten-rom` + `roemische-sandalen-schuhe` + `roemische-legionaersschuhe` + `antike-sandalen-schuhe` + `schuhe-des-antiken-griechenlands`

Alle 42 Artikel entstanden per Multi-Agent-Massenmigration im Juni — genau das Muster, das das Aug-Update abgestraft hat. Konsolidierung + Vertiefung statt neuer Fläche.

## Rohdaten

`data/dataforseo/`: own_ranked_keywords.json (61), own_historical_rank.json (6 Mon.), competitor_ranked_keywords.json (4×300), backlink_summary.json (5 Domains), backlinks_detail.json (322), broken_targets.json (30 Ziele), competitor_candidates.json (30), adjacent_keyword_volumes.json (38 SV-Checks), serp_snapshots.json (10 SERPs), indexcheck/serp_snapshots.json (site:-Abfrage).
