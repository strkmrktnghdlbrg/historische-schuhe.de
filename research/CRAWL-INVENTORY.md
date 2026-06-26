# historische-schuhe.de — Crawl-Inventory & Slug-Preservation-Map

**Quelle:** Live-WordPress auf `www.historische-schuhe.de` (Yoast-Sitemap), gecrawlt 2026-06-14.
**Plattform:** WordPress. Taxonomie unter `/thema/<slug>/`, Artikel root-level `/<slug>/`.
**Wichtig:** Bestehende Slugs ranken (auch wenn der Content AI-generiert/dünn ist). **Alle 37 Artikel-Slugs 1:1 erhalten**, Content neu & besser schreiben (User: „is auch AI content, kannst du besser"). www→non-www im Deploy via Redirect normalisieren, Slug bleibt.

## Taxonomie (alte /thema/-Kategorien)
schuhe-kleidung · farbige-hosentrager · schuhe · militaerisch · mittelalterliche · adlig · antike · kulturen · koeniglich · renaissance · 18-jahrhunderts · 19-jahrhunderts · 20-jahrhunderts · schuhmacherei

## Neue Silo-Zuordnung (Slug bleibt root-level, kein /thema/)
Silo-Enum: **epoche | kultur | schuhtyp | ratgeber** (vorher „stil" → ersetzt durch „kultur", da reale Content-Achse).

### Silo „epoche" (europäische Epochen + Antike)
| alter Slug (erhalten) | Thema | Epoche |
|---|---|---|
| `antike-sandalen-schuhe` | Antike Sandalen | Antike |
| `schuhe-im-alten-rom` | Schuhe im alten Rom | Antike/Rom |
| `roemische-sandalen-schuhe` | Römische Sandalen | Antike/Rom |
| `roemische-legionaersschuhe` | Römische Legionärsschuhe (caligae) | Antike/Rom/Militär |
| `schuhe-des-antiken-griechenlands` | Antikes Griechenland | Antike/Griechenland |
| `schuhe-der-aegyptischen-pharaonen` | Ägyptische Pharaonen | Antike/Ägypten |
| `schuhe-im-mittelalter` | Schuhe im Mittelalter | Mittelalter |
| `schuhe-des-mittelalters` | Schuhe des Mittelalters | Mittelalter |
| `schuhe-des-hochmittelalters` | Hochmittelalter | Mittelalter |
| `mittelalterliche-stiefel-schuhe` | Mittelalterliche Stiefel | Mittelalter |
| `renaissance-schuhe` | Renaissance-Schuhe | Renaissance |
| `renaissance-pantoffeln-schuhe` | Renaissance-Pantoffeln | Renaissance |
| `barocke-damenschuhe` | Barocke Damenschuhe | Barock |
| `barocke-herrenschuhe` | Barocke Herrenschuhe | Barock |
| `barocke-schuhschnallen-schuhe` | Barocke Schuhschnallen | Barock |
| `franzoesische-hofschuhe` | Französische Hofschuhe | Barock/höfisch |
| `schuhe-des-18-jahrhunderts` | 18. Jahrhundert | 18. Jh. |
| `schuhe-des-18-jahrhunderts-in-europa` | 18. Jh. in Europa | 18. Jh. |
| `napoleonische-marschstiefel-schuhe` | Napoleonische Marschstiefel | 19. Jh./Militär |
| `stiefel-schuhe-19-jahrhunderts` | Stiefel 19. Jh. | 19. Jh. |
| `schuhe-des-19-jahrhunderts` | Schuhe 19. Jh. | 19. Jh. |
| `schuhe-19-jahrhundert` | Schuhe 19. Jh. (Variante) | 19. Jh. |
| `schuhe-viktorianischen-aera` | Viktorianische Ära | 19. Jh. |
| `schuhe-des-20-jahrhunderts` | 20. Jahrhundert | 20. Jh. |
| `schuhe-der-1920er-jahre` | 1920er | 20. Jh. |
| `schuhe-der-1950er-jahre` | 1950er | 20. Jh. |
| `schuhe-der-1960er` | 1960er | 20. Jh. |
| `schuhe-der-1980er-jahre` | 1980er | 20. Jh. |

### Silo „kultur" (außereuropäische Kulturen)
| alter Slug (erhalten) | Thema | Region |
|---|---|---|
| `chinesische-lotus-schuhe` | Chinesische Lotusschuhe | China |
| `japanische-geta-schuhe` | Japanische Geta | Japan |
| `indische-mojaris` | Indische Mojaris | Indien |
| `tuerkische-reitstiefel-schuhe` | Türkische Reitstiefel | Türkei/Osmanisch |
| `tuerkische-babuschen-schuhe` | Türkische Babuschen | Türkei/Osmanisch |

### Silo „ratgeber" (Wissen, Pflege, Kauf)
| alter Slug (erhalten) | Thema |
|---|---|
| `geschichte-der-schuhe` | Geschichte der Schuhe (Pillar) |
| `pflege-fuer-schuhe` | Schuhpflege |
| `macht-kleidung` | Kleidung & Macht/Status (thematisch) |
| `a-und-o-schuhe` | „Das A und O" Schuh-Basics (thematisch) |

## Sonderfälle / Hinweise
- `farbige-hosentrager` (Thema „farbige Hosenträger") = themenfremd. **Entscheidung User (2026-06-14): kann gelöscht werden, NICHT migrieren/erhalten.** Wird im Relaunch nicht angelegt. Beim Deploy alte URL `/thema/farbige-hosentrager/` ggf. 410/301 auf Startseite.
- Vorhandener Amazon-Affiliate-Link im Menü („Schuhe kaufen" → amzn.to) bestätigt Affiliate-Intention. Neuer Tag: `historische-schuhe.de-21`.
- Mehrere fast-Duplikate (schuhe-im-mittelalter / schuhe-des-mittelalters / schuhe-des-hochmittelalters; schuhe-des-19-jahrhunderts / schuhe-19-jahrhundert / stiefel-schuhe-19-jahrhunderts). **Alle Slugs erhalten**, aber Content klar differenzieren (Überblick vs. Subthema) + sauber querverlinken gegen Kannibalisierung. Einer pro Cluster wird Hub/Pillar.

## Net-New (kein alter Slug, neue Affiliate-/Money-Ebene)
- `mittelalterschuhe-vergleich` (Money-Landing, bereits gebaut)
- `beste-shops-apps-historische-schuhe-kaufen` (Featured-Affiliate, gebaut)
- `schuhgroesse-passform-historische-schuhe` (Ratgeber, gebaut)
- `wendegenaehte-schuhe-erklaert` (Ratgeber, gebaut)
- `schuhe-erster-mittelaltermarkt-einsteiger` (LARP/Reenactment-Kaufhilfe, gebaut)

## Redirect-Regeln (Deploy)
- `www.` → non-www (oder umgekehrt, je nach Ziel-Canonical) 301.
- alte `/thema/<slug>/`-Kategorieseiten → neue Hub-URLs (`/epochen/`, `/kulturen/`, `/schuhtypen/`, `/ratgeber/`) per 301, soweit sinnvoll.
- Artikel-Slugs bleiben unverändert (kein Redirect nötig).
