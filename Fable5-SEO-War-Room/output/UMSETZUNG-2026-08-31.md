# Umsetzung der War Map — historische-schuhe.de, 2026-08-31

Alle fünf Wetten des `BATTLE_PLAN.md` wurden am Tag der Erstellung umgesetzt, statt die 12-Wochen-Checkliste abzuarbeiten. Was dabei anders lief als geplant und was noch offen ist, steht hier.

Commits auf `claude/angry-swanson-2101cb`: `0cb2ece` (Quellen), `1ed2cc7` (dist). PR #1 auf `main`.

---

## Zwei Korrekturen an der Analyse

**1. Die GSC-Property existierte bereits.** Der BRIEF meldete "keine Property", weil der Service-Account `dashboard-reader@…` sie nicht sah. Unter Joshuas eigener Identität war `https://www.historische-schuhe.de/` längst als `siteOwner` angelegt. Der Befund war also nicht "fehlt", sondern "Service-Account hat keinen Zugriff". Behoben, beide Identitäten sind jetzt Inhaber.

Damit standen echte GSC-Daten zur Verfügung, die der Plan noch nicht hatte (01.06.–30.08.): **376 Impressionen, 4 Klicks, Ø-Position 55,8.** Sie bestätigen den Plan und schärfen ihn an drei Stellen:

- `mittelalter schuhe` 41 Impressionen auf Pos 67,8, `mittelalterschuhe` 21, `mittelalterliche schuhe shop` 24. Der Kern-Cluster wird gesucht, die Domain steht nur zu tief. Genau die Wette 3.
- **`cp-schuhe` und `cp schuhe` zusammen 27 Impressionen.** Die Marke des Vorgänger-Schuhmachers wird bis heute gesucht. Das war der stärkste Einzelbeleg dafür, dass die Backlink-Rescue (Wette 2) kein Selbstzweck ist.
- **`/blog/` hatte 7 Impressionen auf Position 2** und lieferte dabei 404. Eine rankende URL, die ins Leere lief.

**2. Der `affiliate_click`-Tag sendete keine Parameter.** Der Plan sah nur GA4-Custom-Dimensions vor. Bei der Umsetzung zeigte sich: Der Outbound-Gate pusht `affiliate_host`, `affiliate_url`, `affiliate_label` und `page_path` in den dataLayer, aber das GTM-Tag leitete davon nichts weiter. Custom Dimensions allein wären leer geblieben. Beides zusammen verdrahtet über `Tools/ga4-gtm-provision/wire_affiliate_params.py`, die Domain ist dort jetzt eingetragen.

---

## Was umgesetzt wurde

### Wette 1 — Messbarkeit

- GSC: Service-Account als Inhaber verifiziert (TAG_MANAGER über `GTM-5H9K4493`), Sitemap eingereicht, **0 Fehler, 0 Warnungen**.
- GTM: Live-Version 5 publiziert, `affiliate_click` bekommt 4 Parameter. Gegengeprüft am ausgelieferten Container.
- GA4 (544925204): Custom Dimensions `affiliate_host`, `affiliate_url`, `affiliate_label`.
- `/blog/` und `/blog/*` → 301 auf `/`.

### Wette 2 — epages-Backlink-Rescue

`.htaccess`-Block, der auf `QUERY_STRING` matcht, weil die Alt-URLs query-basiert sind (`?ObjectPath=/Shops/61580448/...`). Das `?` am Ende jeder Substitution verwirft die alten Parameter.

| Altes Ziel | Links | Neues Ziel |
|---|---|---|
| `Categories/W-schuhe`, `Original_Wendeschuhe`, `Products/W-*` | 13 | `/wendegenaehte-schuhe-erklaert/` |
| `Categories/Work-shop` | 4 | `/schuhe-selber-machen-mittelalter/` (neu) |
| `Categories/HS-schuhe` | 3 | `/schuhe-des-hochmittelalters/` |
| `Categories/Holzschuhe`, Trippen | 2 | `/schuhe-im-mittelalter/` |
| Kinderschuhe, `Products/K-*` | 2 | `/schuhgroesse-passform-historische-schuhe/` |
| `Geschichte Schuh` | 1 | `/geschichte-der-schuhe/` |
| Tunika, Hose, Krims Krams, Knochenwürfel, Häckchen | 5 | `/` (auf einer Schuhseite gibt es dafür kein ehrliches Ziel) |
| Rest (HS-*, M-*, FR-*, ViewObjectID) | 15 | `/schuhtypen/` |
| `/W-wie-Wendeschuhe` (pluspedia) | 2 | `/wendegenaehte-schuhe-erklaert/` |

Gegen die 30 echten Ziel-URLs aus `broken_targets.json` simuliert: **alle 45 epages-Links treffen ein Ziel, keiner fällt durch.**

### Wette 3 — Mittelalter-Kern

Konsolidiert (Inhalte in den Pillar übernommen, Quelle gelöscht, 301 gesetzt, interne Links umgebogen, Alt-Slug-Regeln auf das neue Endziel gezogen, damit keine Ketten entstehen):

- `schuhe-des-mittelalters` → `schuhe-im-mittelalter`
- `schuhe-des-18-jahrhunderts-in-europa` → `schuhe-des-18-jahrhunderts`
- `schuhe-19-jahrhundert` → `schuhe-des-19-jahrhunderts`

Neu: `/bundschuhe/` (Doppel-Intent Schuh + Bauernbewegung) und `/schnabelschuhe/`.
`/mittelalterschuhe-vergleich/` von Produktkacheln auf drei Nutzungsprofile umgebaut, mit Vergleichstabelle und FAQ-Schema.

### Wette 4 — Trachten-Silo

`/haferlschuhe/` (Pillar), `/haferlschuhe-herren/`, `/trachtenschuhe-damen/`, `/trachtenschuhe-herren/`. Amazon-Gruppen `haferlschuhe` (7 Produkte) und `trachtenschuhe-damen` (6).

### Wette 5

Bewusst **nicht** umgesetzt. Die Lotus- und 20er-Jahre-Upgrades sind im Plan als Kür nach abgeschlossenen Wetten 2 und 3 markiert, und deren Wirkung ist noch nicht gemessen.

---

## Faktenlage: was bewusst nicht behauptet wird

Beide neuen Mittelalter-Seiten und der Haferl-Pillar wurden gegen recherchierte Quellen geschrieben. Drei verbreitete Behauptungen stehen deshalb ausdrücklich **als unbelegt gekennzeichnet** im Text, statt sie mitzuschreiben:

- **Schnabelschuh-Spitzen bis zum Knie, am Bein hochgebunden.** Der Fundbefund aus Baynard's Castle (London) sagt: bei 93 von 210 Schuhen etwa ein Fünftel der Fußlänge, nur 7 Stück rund eine halbe. Die im Netz kursierende gestaffelte Zoll-Tabelle nach Ständen für das Gesetz von 1463 ließ sich nirgends belegen und wird als unbelegt geführt.
- **Haferlschuh "1803 von Franz Schratt erfunden".** Kein Primärbeleg auffindbar; der Heimatkundeverein Berchtesgaden datiert die erste namentliche Erwähnung auf 1826 und geht von einer Umgestaltung aus. Ebenso ohne Quelle: die Gamsklauen-Herleitung und die Zahl von 800 Allgäuer Werkstätten.
- **Bundschuh als bewusstes Gegenbild zum Ritterstiefel.** Gängige Forschungsdeutung, aber keine zeitgenössische Quelle. Im Text als Deutung markiert.

Die Cambridge-Skelettstudie (Dittmar et al. 2021, 177 Skelette, Hallux valgus 6 % → 27 %) steht als **Zusammenhang, nicht als Ursache** im Text.

**Amazon:** Für `/schnabelschuhe/` wurde die Produktgruppe wieder entfernt. Von 6 Suchtreffern war einer ein Schnabelstiefel, der Rest Kuhmaulschuhe, Renaissance-Stiefel und Römersandalen. Bei den Damen-Trachtenschuhen fielen zwei Listings unter 15 Euro raus. Kein Suchlink-Fallback erzwungen.

---

## Visual-Semantics-Durchgang

Audit bei 375 px im Browser gemessen, nicht geschätzt.

**Hauptbefund:** Der Antwortblock stand bei **1020 px** — hinter Lede, Meta-Band, Affiliate-Banner und einem 400 px hohen Hero-Bild. Damit war die Centerpiece Annotation auf **allen** Artikelseiten verschenkt, nicht nur auf den neuen.

Behoben im Template statt pro Seite:

- Neues Frontmatter-Feld `answer`, gerendert direkt nach der Meta-Zeile und **vor** Affiliate-Banner und Bild. Bewusst nicht im Rumpf, weil er dort zwangsläufig hinter beidem landet. Antwortblock jetzt bei **429 bis 515 px**.
- H1 auf Schirmen unter 600 px von 46 auf 32 px. Sparte allein 73 px vor dem Centerpiece.
- Vergleichsseite: Vergleichstabelle direkt unter den Antwortblock, weil bei einer Vergleichsquery die Gegenüberstellung das Centerpiece ist.

Nebenbefunde, ebenfalls site-weit behoben:

- **Kein strukturiertes Markup vorhanden.** Jetzt FAQPage (46 Seiten), Article (46) und BreadcrumbList (47), erzeugt aus dem sichtbaren Text über `src/lib/faq.ts`, damit Schema und Seite nicht auseinanderlaufen.
- **Markdown-Tabellen ohne Overflow-Rahmen.** Eine vierspaltige Tabelle hätte auf 375 px die ganze Seite quergeschoben. Rehype-Plugin `integrations/rehype-table-wrap.mjs` legt einen scrollbaren Rahmen darum. Die naheliegende CSS-Lösung scheidet aus, weil `display:block` den Tabellen-Layoutalgorithmus abschaltet.

Kein horizontaler Überlauf gemessen (`scrollWidth == innerWidth`).

---

## QA

- Build grün, 58 Seiten, Sitemap 56 URLs (vorher 52: +7 neu, −3 konsolidiert).
- 62 interne Link-Ziele, **0 kaputt**.
- **0** JSON-LD-Parse-Fehler.
- 75 Amazon-Gate-Ziele, **alle** `/dp/` mit Tag `historische-schuhe.de-21`, **0** Suchlinks.
- **0** Em-Dashes im Build, echte Umlaute (ein Ausrutscher in den Frontmatter-Beschreibungen wurde korrigiert).
- Redirect-Regeln gegen die echten Broken-Backlink-Ziele simuliert: 45/45 zugeordnet.

## Offen

1. **Merge von PR #1 nach `main`.** Erst der Push auf `main` löst den Deploy nach A2 aus. Bis dahin sind die 301er und die neuen Seiten nicht live. Der Merge wurde bewusst dem Menschen überlassen, weil er auf Produktion deployt.
2. **Nach dem Deploy:** die 301er live gegenprüfen (`curl -I` auf drei Ziele aus `broken_targets.json`, Erwartung 301 ohne Kette) und die 7 neuen URLs an IndexNow melden. Google wird nicht angestoßen.
3. **Bilder für `/trachtenschuhe-damen/` und `/trachtenschuhe-herren/`:** Wikimedia Commons hat zu Trachtenschuhen nichts Brauchbares. Beide Seiten laufen auf den Gradient-Fallback, wie `schuhe-der-1980er-jahre`. Bei Bedarf eigenes Bildmaterial nachliefern.
4. **Messpunkte** aus dem Plan bleiben gültig: Woche 6 (broken Backlinks < 10 im DataForSEO-Refresh), Woche 9 (`mittelalter schuhe` oder `bundschuhe` Top 30), Woche 12 (Quartalsbilanz). Vorher-Werte für die Nachmessung stehen oben: 376 Impressionen, 4 Klicks, Ø-Position 55,8 im Zeitraum 01.06.–30.08.2026.
