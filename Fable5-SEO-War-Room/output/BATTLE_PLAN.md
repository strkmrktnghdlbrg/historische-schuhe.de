# BATTLE_PLAN — historische-schuhe.de (Q4 2026, erstellt 2026-08-31)

**Diagnose in einem Satz:** Die Domain hat nischen-echte Autorität (97 Ref-Domains aus der Reenactment-Community) und null Rankings, weil (a) 18 % der Backlinks auf tote Shop-URLs zeigen, (b) die kaufnahen Kern-Keywords der Nische keine eigene Seite haben und (c) 42 massenmigrierte Artikel sich gegenseitig kannibalisieren, statt in wenigen tiefen Seiten gebündelt zu sein — ein Muster, das seit dem Google-Spam-Update vom 18.–21.08.2026 aktiv bestraft wird.

**Konsequenz für alle Wetten:** Tiefe und Konsolidierung statt Fläche. Keine einzige Wette erzeugt mehr als 6 neue URLs. Indexierung: Bing/IndexNow ja, Google nicht aktiv anstoßen (kein RalfyIndex, kein Indexing-API-Push — Google findet konsolidierte Seiten über die Sitemap und die reparierten Backlinks selbst).

---

## Die Wetten (priorisiert)

### Wette 1 — Messbarkeit herstellen (Woche 1, ~3 h) — der Enabler

**Warum zuerst:** Ohne GSC-Property ist keine Abbruchregel dieses Plans auswertbar. Eine frisch verifizierte Property sammelt ab Verifikation und füllt nicht rückwirkend auf — jede Woche Verzögerung kostet eine Woche Messhistorie.

**Der Play:**
- GSC-Property `https://www.historische-schuhe.de/` anlegen via `Tools/google-provision/gsc_provision.py --only historische-schuhe.de --auth both` (TAG_MANAGER-Verifikation funktioniert, Container `GTM-5H9K4493` liefert live aus). Sitemap `sitemap-index.xml` einreichen.
- GA4 (544925204): Custom Dimensions `link_url`, `link_text` anlegen (Event-Parameter werden gesendet, sind aber in keinem Bericht sichtbar).
- Alt-Leiche `/blog/` per 301 auf `/` (steht noch im Google-Index, liefert 404).

**KPI:** GSC live und Sitemap „Erfolgreich" bis Ende Woche 1. | **Risiko:** keins, reine Infrastruktur.

### Wette 2 — epages-Backlink-Rescue (Woche 1–2, ~6 h) — der billigste Autoritätsgewinn

**Warum:** 47 Backlinks (13 dofollow) aus dem Kern der Zielgruppe — mittelalterforum.com, mastermyr.de, dresden-spielt.de, LARP-Foren — landen auf 404. Das ist bereits verdiente, thematisch perfekte Autorität, die nur eingesammelt werden muss. Kein Outreach, kein Risiko, reine .htaccess-Arbeit.

**Der Play:**
- `.htaccess`: Regel-Block für `/epages/61580448.sf/*` — Kategorie-Muster auf passende Seiten mappen (W-schuhe/Wendeschuhe → `/wendegenaehte-schuhe-erklaert/`, HS-schuhe/Hochmittelalter → `/schuhe-des-hochmittelalters/`, Kinderschuhe/Produkte → `/mittelalterschuhe-vergleich/`), Catch-all auf `/schuhtypen/`. Vollständige Zielliste: `data/dataforseo/broken_targets.json` (30 URLs).
- Eine neue Seite, die der Linkkontext verdient: `/schuhe-selber-machen-mittelalter/` (DIY/Werkstatt-Long-Read; die mastermyr.de-Links hießen „Mittelalter und Wikingerschuhe kaufen **- basteln**", die Work-shop-Kategorie war Christian Pohens Kurs-Seite). Stand ohnehin im Ur-Plan.
- `/W-wie-Wendeschuhe` (pluspedia-Links) → 301 auf `/wendegenaehte-schuhe-erklaert/`.

**KPI:** 47 broken Backlinks < 10 im nächsten DataForSEO-Pull (Woche 6). | **Abbruchregel:** entfällt — einmalige Arbeit.

### Wette 3 — Mittelalter-Kern konsolidieren statt kannibalisieren (Woche 2–6, ~18 h) — die Kernwette

**Warum:** kayserstuhl.de beweist mit 213 Ref-Domains und 90er-Jahre-HTML, dass in dieser Nische Abdeckung + eine klare Seite pro Thema reicht (Platz 6 „mittelalter schuhe", SV 1.600). Wir haben mehr relevante Links pro Keyword-Ziel als jeder Kleinanbieter — aber drei konkurrierende Mittelalter-Artikel und keine Seite für die zwei größten Schuhtyp-Keywords der Nische.

**Der Play:**
1. **Konsolidieren (301, kein neuer Content):** `schuhe-des-mittelalters` → `schuhe-im-mittelalter` (Pillar); `schuhe-des-18-jahrhunderts-in-europa` → `schuhe-des-18-jahrhunderts`; `schuhe-19-jahrhundert` → `schuhe-des-19-jahrhunderts`. Die Pillar-Artikel nehmen die besten Abschnitte der aufgelösten Seiten auf (Tiefe statt Fläche; jeweils >2.000 Wörter, echte Quellen, Bild-Registry weiterverwenden).
2. **Zwei neue Money-Info-Hybride, die fehlen:** `/bundschuhe/` (SV 6.600; Doppel-Intent bedienen: Abschnitt Bundschuh-Bewegung 1493 für die Info-Suche + Kaufberatung mit Amazon-Gruppe `bundschuhe` für die Reenactor-Suche) und `/schnabelschuhe/` (SV 720; geo.de rankt Platz 7 mit Redaktion → Content kann hier in die Top 10).
3. **Vergleichsseite scharf machen:** `/mittelalterschuhe-vergleich/` von Produktgrid zu echter Kaufberatung (authentisch vs. LARP-tauglich vs. Budget, Größen-/Passformteil aus `schuhgroesse-passform-historische-schuhe` verlinkt, FAQ-Schema). Interne Links aller Epochen-/Schuhtyp-Artikel auf den Vergleich prüfen.

**KPI:** „mittelalter schuhe" oder „bundschuhe" in Top 30 bis Woche 9; ≥3 Keywords in Top 20 (GSC) bis Woche 12. | **Abbruchregel:** Wenn die konsolidierten Pillars nach 4 Wochen (Woche 10) laut GSC keine Impression-Steigerung zeigen, keine weiteren Konsolidierungen — dann ist das Problem domainweit (Sandbox/Update-Folge) und Woche 11–12 fließt in Wette 4 statt in weitere Mittelalter-Tiefe.

### Wette 4 — Trachten-/Haferlschuh-Silo (Woche 6–10, ~16 h) — die Volumenwette

**Warum:** Das größte kaufnahe Feld im Umkreis der Nische (~26.500 SV kombiniert: haferlschuhe 6.600, trachtenschuhe damen 6.600, trachtenschuhe herren 5.400, haferlschuhe herren 3.600, trachtenschuhe 3.600, haferlschuhe damen 1.300; CPC ~1 €) — stand im Ur-Plan und wurde beim Kultur-Pivot fallengelassen. GQ rankt Platz 7 auf „haferlschuhe" mit einem redaktionellen Listicle → die SERP lässt Content zu. Der Haferlschuh ist ein historischer bayerischer Werkschuh — sauberer Brand-Fit, kein Themen-Drift. Saisonaler Rückenwind: Oktoberfest-/Trachtensaison.

**Der Play:** 4 tiefe Seiten, nicht mehr: `/haferlschuhe/` (Pillar: Geschichte ab ~1803, Zwiegenäht-Machart, Tragekontext, Kaufberatung), `/haferlschuhe-herren/`, `/trachtenschuhe-damen/`, `/trachtenschuhe-herren/`. Je eigene Amazon-Produktgruppe (`scripts/fetch-amazon.mjs`, Gruppen in `src/data/amazon-asins.json` ergänzen), Verlinkung in Schuhtypen-Silo + Header-Navigation prüfen. Kein programmatisches Ausrollen auf Farben/Größen/Marken.

**KPI:** 1 Trachten-Keyword in Top 30 bis Woche 12 (Neurankings brauchen 4–8 Wochen); Amazon-Klicks auf Trachten-Gruppen > 0. | **Abbruchregel:** Wenn bis Woche 12 keine der 4 Seiten Impressions > 100/Woche erreicht, Silo nicht weiter ausbauen — erst Q1-Review.

### Wette 5 — Bestands-Upgrades für Info-Traffic (Woche 10–12, ~8 h) — der AdSense-Play

**Warum:** `lotusfüße` (SV 2.900, Pos 83) hat die schwächste Konkurrenz aller Volumen-Keywords im Bestand (Blog-SERP: frauenseiten.bremen, bambooblog, gehwerkstatt). Das 20er-Jahre-Cluster (~4.300 SV, Pos 40–60) hat 10 rankende Varianten und ist die meistbesuchte organische Seite. Beides zahlt auf AdSense und interne Links, nicht auf Amazon.

**Der Play:** `chinesische-lotus-schuhe` zum Referenzartikel ausbauen (Chronologie, Verbotsgeschichte, Museumsquellen — Tiefe, die die Blog-SERP nicht hat). `schuhe-der-1920er-jahre` als Style-Guide mit konkreten Kaufempfehlungen (neue Amazon-Gruppe `20er-schuhe`) — die SERP ist eine Shopping-SERP, das Format muss dazu passen.

**KPI:** lotusfüße in Top 20 bis Q1-Review. | **Abbruchregel:** Nur starten, wenn Wetten 2+3 abgeschlossen sind.

---

## Anti-Wetten (bewusst NICHT tun)

1. **Keine programmatische Fläche** — keine Marken-/Farb-/Größen-Seiten, keine Auto-Generierung neuer Artikel. Das Aug-Update straft exakt dieses Muster; die Domain trägt mit 42 massenmigrierten Artikeln bereits Risiko.
2. **Kein „trippen schuhe"-Chase** (SV 2.400): Brand-SERP der Berliner Designer-Marke, Top 3 = de.trippen.com. Der historische Trippen-Überschuh ist maximal einen Abschnitt im Bundschuh-/Mittelalter-Kontext wert.
3. **Kein Wikinger-Content-Drift** à la battlemerchant (wikinger frisuren etc.): funktioniert dort wegen Shop-Autorität, wäre hier Off-Topic-Fläche. Wikinger nur als Schuhthema (`wikinger schuhe` 480 + `wikinger stiefel` 590 gehören in den Bundschuh-/Stiefelkontext).
4. **Kein Linkaufbau vor Woche 12** — erst die 47 verdienten Links einsammeln (Wette 2). Kein Disavow (Spam-Anteil ~13 % ist harmlos).
5. **Google nicht aktiv anstoßen** — kein Indexing-Push für Google; IndexNow (Bing) für neue/konsolidierte URLs ja.

## Sequenzierung, verteidigt

W1 Messbarkeit vor allem (sonst blind) → W2 Rescue vor Content (Autorität fließt den neuen Seiten zu, 301s brauchen Wochen bis zur Wirkung) → W3 Kern-Konsolidierung vor Trachten-Silo (erst das Kannibalisierungs-/Qualitätsproblem der Bestandsdomain lösen, dann expandieren — Expansion auf einer vom Spam-Update angeschlagenen Domain wäre Fläche auf wackligem Fundament) → W4 Trachten als größte Neuland-Wette, wenn der Kern steht → W5 nur als Kür.

## Messpunkte

- **Woche 2:** GSC live? Sitemap-URLs „Gecrawlt/Indexiert"? `/epages/`-301s greifen (curl-Stichprobe)?
- **Woche 6:** DataForSEO-Refresh (`war_room_fetch.py full`): broken Backlinks < 10? Erste Bewegung konsolidierte Pillars?
- **Woche 9:** „mittelalter schuhe"/„bundschuhe" Top 30? Sonst Abbruchregel Wette 3 vorbereiten.
- **Woche 12:** Quartalsbilanz: ≥3 Keywords Top 20, ≥1 Trachten-Keyword Top 30, Amazon-Klicks/Monat vs. Baseline (20/90 Tage). Danach Q1-Re-Plan mit frischem War-Room-Pull.
