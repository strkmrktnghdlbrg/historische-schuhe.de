# historische-schuhe.de — Relaunch-Plan (Affiliate-Portal)

**Niche:** Historische & historisch inspirierte Schuhe — Mittelalter, Reenactment/LARP, Mittelaltermarkt, Antike (Römer/Griechen), Renaissance/Barock, 18./19. Jh., Trachten, Theater/Tanz, Gothic/Steampunk-Adjazenz.
**Stack-Ziel:** Astro 5 + Tailwind 4 (analog chromzubehoer/fettsucht/achtsame). Design: „Leder & Pergament" (siehe DESIGN-LEDER.md).
**Monetarisierung:** Amazon Affiliate (eigener Partner-Tag offen, z.B. `historische-schuhe-21`) + Content-Affiliate zu Spezial-Shops (Battle-Merchant, Mytholon, Burgschneider, Pera Peris) wo Partnerprogramm vorhanden.

## Rankings / Bestand ERHALTEN (vor Go-Live prüfen)
> Live-Domain crawlen (Sitemap), bestehende Artikel + bezahlte Gastbeiträge/Backlinks identifizieren (Playbook-Regel: Slug erhalten, dofollow-Backlinks nicht umbiegen). Aktuell auf der Seite vorhandene Artikel 1:1 mit Slug übernehmen und in die neue Silo-Struktur einhängen. Keine erfundenen Daten/Testimonials/Scores.

| URL (Platzhalter bis Crawl) | Rolle künftig |
|-----|---------------|
| `/...bestehender-artikel.../` | In passenden Silo einhängen, URL bleibt |

## Silo-Architektur (Topical Authority)

### Silo 1 — Nach Epoche  `/epochen/` (Geschichts-Anker, Brand-USP)
- `/antike-roemer-griechen/` (Caligae, Sandalen, Carbatinae)
- `/mittelalter/` (wendegenähte Schuhe, Bundschuhe, Schnabelschuhe) — höchste Tiefe
- `/renaissance-barock/` (Schnallenschuhe, Rokoko, Absatz)
- `/18-19-jahrhundert/` (viktorianisch, Biedermeier, Schnürstiefeletten)

### Silo 2 — Nach Anlass / Stil  `/stile/`
- `/larp-reenactment/` (robuste Stiefel, authentisch vs. praktisch)
- `/mittelaltermarkt/` (Einsteiger, Budget, schnell)
- `/trachten-schuhe/` (Dirndl/Lederhose, Haferl)
- `/theater-tanz/` (Bühne, historischer Tanz, Standfestigkeit)
- `/gothic-steampunk/` (Adjazenz-Trafficpuffer)

### Silo 3 — Nach Schuhtyp  `/schuhtypen/` (Money-Longtail)
- `/lederstiefel/` → **Money** (Vergleich)
- `/sandalen-antike/`
- `/bundschuhe-schnuerschuhe/`
- `/halbschuhe-slipper/`
- `/damen/` & `/herren/` Cross-Cuts

### Silo 4 — Wissen & Pflege  `/ratgeber/` (Breite, GEO/AEO, Trust)
- `/schuhgroesse-passform-historische-schuhe/` (Passform-Guide, hohe Suchintention)
- `/leder-pflegen-historische-schuhe/` (Pflege, Fett, Wachs)
- `/wendegenaehte-schuhe-erklaert/` (Technik/Authentizität)
- `/schuhe-selber-machen-mittelalter/` (DIY, Long-Read)
- `/echtleder-vs-kunstleder/` (Material-Vergleich)
- `/geschichte-der-schuhe/` (Pillar, Linkmagnet)

## Money / Affiliate-Seiten (Kern-Umsatz)
- `/mittelalterschuhe-vergleich/` — Top-Picks mit Score, Pro/Contra, CTA
- `/lederstiefel-vergleich/`
- `/beste-shops-apps-historische-schuhe-kaufen/` — Affiliate-Listicle „Wo & womit kaufst du historische Schuhe am besten?" (Amazon-App, Spezial-Shops, On/Off, mobile Shopping-Apps) — vom User explizit gewünschter Winkel.
- pro Epochen-/Stil-Hub jeweils ein eingebetteter „Empfehlungen"-Block.

## Content-Prinzipien
- Erzählerisch-handwerklich, sachkundig, ehrlich. Frage-Format + Kontext-Attribute (für wen / welcher Anlass / Budget / Authentizitätsgrad) für GEO/AEO (Playbook §5b).
- Verifizierte Fakten, keine erfundenen Testzahlen/Testimonials. Affiliate-Transparenz Pflicht. Keine Em-Dashes, echte Umlaute.
- Spiderweb-Verlinkung: Epoche ↔ Schuhtyp ↔ Money-Vergleich ↔ Pflege-Ratgeber.

## Roadmap
1. [x] Design-System „Leder & Pergament" + Startseiten-Mockup (mockups/index.html)
2. [x] Mockup im Browser verifizieren (Screenshot)
3. [x] Astro-Bootstrap (Layout, brand.css aus Tokens, Content Collections, Hubs, [slug], Legal) — Build grün, 16 Seiten, verifiziert
4. [ ] Live-URLs crawlen + Bestandsartikel/Backlink-/Gastbeitrag-Map (Slug-Erhalt)
5. [ ] Semrush-Keyword-Recherche je Silo (Volumina bestätigen)
6. [ ] Mittelalter-/Schuhtyp-Silo schreiben (Anker), Money-Vergleiche mit echten Amazon-Produkten/Tag
7. [ ] „Beste Shops/Apps"-Listicle ausbauen + Epochen-Silos + Ratgeber/Pflege
8. [ ] FAQ-Schema, GEO/AEO-Layer, echte Bilder statt Emoji-Platzhalter
9. [ ] GTM/AdSense/Impressum (Betreiber klären) + Deploy

## Offene Punkte (vom User klären)
- Amazon-Partner-Tag für historische-schuhe.de? Betreiber/Impressum (Webmagics?)
- Bestehende Live-Artikel/Slugs + bezahlte Gastbeiträge/Backlinks (für Slug-Erhalt)?
- Fokus-Reihenfolge der Epochen/Stile (Annahme: Mittelalter + LARP = stärkster Traffic)?
- Hosting/Deploy-Ziel + GTM/AdSense-IDs + Stay22 nicht relevant (kein Reiseportal)?
