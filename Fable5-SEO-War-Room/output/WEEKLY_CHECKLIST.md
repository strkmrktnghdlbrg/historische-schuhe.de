# WEEKLY_CHECKLIST — historische-schuhe.de (Q4 2026)

> **Stand 2026-08-31: Die Wetten 1 bis 4 sind vollständig umgesetzt, siehe `output/UMSETZUNG-2026-08-31.md`.** Abgehakte Punkte sind erledigt. Offen bleiben der Merge von PR #1 nach `main` (löst den Deploy aus), danach der IndexNow-Ping und die Live-Prüfung der 301er, sowie die Messpunkte in Woche 6, 9 und 12. Wette 5 (Lotus- und 20er-Upgrades) ist bewusst nicht gestartet: Sie ist im Plan als Kür nach gemessener Wirkung der Wetten 2 und 3 markiert.

Standalone-Checkliste für die ausführende Session. Kontext: `output/BRIEF.md` + `output/BATTLE_PLAN.md` in diesem Ordner. Projekt-Repo-Root = Ordner über `Fable5-SEO-War-Room/`. Budget ≈ 5 h/Woche.

**Harte Regeln für ALLE Aufgaben:**
- Keine Em-/En-Dashes, echte Umlaute, keine erfundenen Fakten/Testzahlen/Testimonials.
- Jede neue/geänderte Seite: FAQ-Block, interne Spiderweb-Links (≥3), Affiliate-Disclosure nur bei echten Partnerlinks.
- Amazon nur über bestehende Komponenten (`AmazonBox`/`AmazonBoxGrid`, Gruppen in `src/data/amazon-asins.json`, dann `npm run amazon`). Keine handgeschriebenen Amazon-URLs, keine Suchlinks.
- Neue/konsolidierte URLs: an Bing/IndexNow melden (`Tools/bing-indexnow`), **Google NICHT aktiv anstoßen** (kein RalfyIndex).
- Nach jedem Push: Deploy-Workflow läuft automatisch; `npm run build` vorher lokal grün.

## Woche 1 — Messbarkeit (Wette 1) + Rescue-Start (Wette 2)

- [x] [Manual] GSC-Property anlegen: `python3 "/Users/joshuastark/Documents/Claude Code/Tools/google-provision/gsc_provision.py" --only historische-schuhe.de --auth both` (TAG_MANAGER-Verifikation über live ausgelieferten Container `GTM-5H9K4493`). Danach Sitemap `https://www.historische-schuhe.de/sitemap-index.xml` einreichen.
- [x] [Manual] GA4-Property 544925204: Custom Dimensions `link_url` und `link_text` (Event-Scope) anlegen (Admin-API oder UI; Muster siehe glasshotel-Eintrag in SEO-War-Room-STATUS.md).
- [x] [Sonnet] `public/.htaccess`: 301 `/blog/` und `/blog/.*` → `/`. Build + Deploy + curl-Check.
- [x] [Sonnet] `public/.htaccess`: epages-Rescue-Block schreiben. Quelle: `Fable5-SEO-War-Room/data/dataforseo/broken_targets.json` (30 Ziel-URLs). Mapping-Regeln (RewriteCond auf QUERY_STRING, da epages-Pfade Query-basiert sind):
  - `ObjectPath=...Categories/W-schuhe` oder `Original_Wendeschuhe` → `/wendegenaehte-schuhe-erklaert/`
  - `Categories/Work-shop` → `/schuhe-selber-machen-mittelalter/` (Seite kommt in Woche 2; bis dahin Regel auskommentiert lassen)
  - `Categories/HS-schuhe` (Hochmittelalter) → `/schuhe-des-hochmittelalters/`
  - `Categories/Holzschuhe` → `/schuhe-im-mittelalter/`
  - Catch-all `^epages/` → `/schuhtypen/`
  - Außerdem: `/W-wie-Wendeschuhe` → `/wendegenaehte-schuhe-erklaert/`
  - WICHTIG: Query-String beim Redirect verwerfen (`?` am Ziel), sonst hängen die epages-Parameter am Ziel. Mit `curl -I` gegen 3 Original-URLs aus broken_targets.json testen (Erwartung: 301 → 200, keine Kette > 2).

## Woche 2 — Rescue abschließen (Wette 2)

- [x] [Sonnet] Neuen Artikel `/schuhe-selber-machen-mittelalter/` schreiben (Long-Read ≥2.000 Wörter): wendegenähte Konstruktion Schritt für Schritt, Werkzeug, Leder-Auswahl, Schnittmuster-Quellen, Anfängerfehler, Bezug zu Christian Pohens Werkstatt-Tradition der Domain (ohne erfundene Details), FAQ. Silo `ratgeber`. Amazon-Gruppe `schuhpflege` einbinden (Werkzeug-Gruppe nur, wenn echte passende Produkte via PA-API gefunden werden).
- [x] [Sonnet] Work-shop-Redirect-Regel in `.htaccess` aktivieren, Build, Deploy, curl-Check aller 5 Mapping-Muster.
- [ ] [Sonnet] Neue URL an IndexNow melden (Bing).
- [ ] [Manual] GSC-Check: Property sammelt Daten? Sitemap-Status „Erfolgreich"?

## Woche 3–4 — Konsolidierung (Wette 3, Teil 1)

- [x] [Sonnet] Pillar-Merge Mittelalter: beste Abschnitte aus `src/content/artikel/schuhe-des-mittelalters.md` in `schuhe-im-mittelalter.md` einarbeiten (Ziel >2.500 Wörter, Struktur: Alltag/Stände/Machart/Funde/FAQ), dann Quell-Datei löschen + 301 in `.htaccess` (`/schuhe-des-mittelalters/` → `/schuhe-im-mittelalter/`). Interne Links im Repo auf das alte Ziel umbiegen (`grep -rl "schuhe-des-mittelalters" src/`).
- [x] [Sonnet] Gleiches Muster 18. Jh.: `schuhe-des-18-jahrhunderts-in-europa.md` → in `schuhe-des-18-jahrhunderts.md` mergen + 301. ACHTUNG: Alt-Langslug-Redirects in `.htaccess` (Zeilen mit `schuhe-des-18-jahrhunderts-in-europa`) auf das neue Endziel umstellen, keine Redirect-Ketten.
- [x] [Sonnet] Gleiches Muster 19. Jh.: `schuhe-19-jahrhundert.md` → in `schuhe-des-19-jahrhunderts.md` mergen + 301 (Militärstiefel-Artikel `stiefel-schuhe-19-jahrhunderts` bleibt als differenzierter Subartikel bestehen).
- [x] [Sonnet] Build-QA: Sitemap-Diff prüfen (2 URLs weniger), 0 interne Links auf 301-Ziele, IndexNow-Meldung der Pillar-URLs.

## Woche 5–6 — Lücken füllen (Wette 3, Teil 2)

- [x] [Sonnet] Neue Seite `/bundschuhe/` (≥2.000 Wörter, Money-Info-Hybrid): Was ist ein Bundschuh, Abgrenzung wendegenäht, **eigener Abschnitt Bundschuh-Bewegung 1493** (Info-Intent!), Kaufberatung authentisch vs. Markt-tauglich, Amazon-Gruppe `bundschuhe` (existiert bereits in `amazon-asins.json`), FAQ-Schema. Silo `schuhtyp`.
- [x] [Sonnet] Neue Seite `/schnabelschuhe/` (≥1.500 Wörter): Poulaines/Gotik, Standeswesen + Verbote, moderne Repliken + Kaufteil, FAQ. Neue Amazon-Gruppe `schnabelschuhe` in `asins.json` + `npm run amazon` (wenn PA-API nichts Passendes liefert: ohne Produktgrid veröffentlichen, KEIN Suchlink-Fallback erzwingen). **Erledigt: Gruppe angelegt, geprueft und wieder entfernt. Von 6 Treffern war einer ein Schnabelstiefel, der Rest Kuhmaulschuhe, Renaissance-Stiefel und Roemersandalen. Die Seite laeuft ohne Produktgrid.**
- [x] [Sonnet] Beide URLs: interne Links aus allen Mittelalter-/Schuhtyp-Artikeln setzen (≥4 eingehende), IndexNow.
- [ ] [Manual] **Messpunkt Woche 6:** `python3 "/Users/joshuastark/Documents/Claude Code/Tools/war-room-fetch/war_room_fetch.py" full historische-schuhe.de "Fable5-SEO-War-Room/data/dataforseo/refresh-w6" battlemerchant.com outfit4events.de kayserstuhl.de celticwebmerchant.com` → broken Backlinks < 10? GSC: Impressions-Trend der Pillars?

## Woche 7–8 — Vergleich scharf machen (Wette 3, Teil 3) + Trachten-Start (Wette 4)

- [x] [Sonnet] `/mittelalterschuhe-vergleich/` umbauen: Einstieg als Antwort (welcher Schuh für welchen Zweck), 3 Nutzerprofile (Reenactor authentisch / LARP robust / Markt-Einsteiger budget), Produktboxen den Profilen zuordnen, Passform-Absatz mit Link auf `schuhgroesse-passform-historische-schuhe`, FAQ-Schema. Keine erfundenen Scores.
- [x] [Sonnet] Trachten-Recherche: SERP-Formate für `haferlschuhe`, `trachtenschuhe damen/herren` prüfen (aktuelle Daten: `data/dataforseo/serp_snapshots.json`), Amazon-Sortiment via PA-API sichten, Gruppen `haferlschuhe`, `trachtenschuhe-damen`, `trachtenschuhe-herren` in `asins.json` anlegen, `npm run amazon`.
- [x] [Sonnet] Pillar `/haferlschuhe/` schreiben (≥2.500 Wörter): Geschichte (bayerischer Werkschuh, Zwiegenäht-Machart), Anlässe, Marken-Landschaft ehrlich (Manufaktur vs. Massenware), Kaufberatung + Amazon-Gruppe, Pflege-Verweis, FAQ. Silo `schuhtyp`, Navigation prüfen.

## Woche 9–10 — Trachten-Silo komplett (Wette 4)

- [x] [Sonnet] `/haferlschuhe-herren/` (Kaufstrecke, SV 3.600) + `/trachtenschuhe-damen/` (SV 6.600) + `/trachtenschuhe-herren/` (SV 5.400): je ≥1.200 Wörter, echte Produktauswahl über PA-API, Absatz-/Sohlen-/Anlass-Beratung, Querverlinkung untereinander + zum Pillar, FAQ. IndexNow je URL.
- [ ] [Manual] **Messpunkt Woche 9:** GSC: „mittelalter schuhe"/„bundschuhe" Top 30? Wenn nein und auch keine Impression-Steigerung der Pillars: Abbruchregel Wette 3 aktivieren (keine weiteren Konsolidierungen, W11–12 voll auf Trachten).

## Woche 11–12 — Kür + Bilanz

- [ ] [Sonnet] (Nur wenn W1–10 abgehakt) `chinesische-lotus-schuhe.md` zum Referenzartikel ausbauen (Chronologie, Verbotsgeschichte 1912ff, Museums-/Literaturquellen aus `src/data/images.json`-Registry, keine Sensationssprache). Ziel: Tiefe, die die Blog-SERP (frauenseiten.bremen, bambooblog) nicht hat.
- [ ] [Sonnet] (Optional) `schuhe-der-1920er-jahre.md` als Style-Guide mit Amazon-Gruppe `20er-schuhe` (nur bei echten PA-API-Treffern).
- [ ] [Manual] **Quartalsbilanz Woche 12:** GSC-Export; Ziele: ≥3 Keywords Top 20, ≥1 Trachten-Keyword Top 30, broken Backlinks < 10, Amazon-Klicks/Monat vs. Baseline (20 Klicks/90 Tage). Frischen War-Room-Pull für Q1-Re-Plan; Ergebnis in `/Users/joshuastark/Documents/Claude Code/Playbooks/SEO-War-Room-STATUS.md` nachtragen.

## Dauerregeln (jede Woche, ~15 min)

- [ ] `amazon-refresh.yml`-Run grün? (Montags 04:00 UTC; bei rotem Run: `check-asins`-Report lesen, tote ASINs ersetzen.)
- [ ] GSC: neue 404s aus Crawling-Berichten in `.htaccess`-Redirects übersetzen (nur bei echten eingehenden Links, sonst 404 lassen).
