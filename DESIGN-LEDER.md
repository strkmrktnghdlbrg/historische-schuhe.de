# historische-schuhe.de — Design-System „Leder & Pergament"

**Vorlage-DNA:** Paragraph (`ParagraphDESIGN.md`) — warmes, fast monastisches Canvas, editoriale Serifen-Headlines gegen ruhige Sans-Body, großzügige Radien, weiche Schatten statt harter Farbe. Umgefärbt auf ein historisch-handwerkliches Leder-/Pergament-Thema (Schuster, Reenactment, Mittelaltermarkt, Trachten, Theater).

**Theme:** light (warmes Pergament-Canvas, dunkle Leder-Tinte, Oxblood-CTA, Messing-Akzent).

## Farb-Tokens

| Name | Value | Token | Rolle |
|------|-------|-------|-------|
| Pergament | `#f4ece0` | `--parchment` | Primärer Page-Background (warmes Altpapier) |
| Pergament Tief | `#ede2d2` | `--parchment-2` | Kontrast-Bänder, abgesetzte Sektionen |
| Leinen | `#fffdf8` | `--linen` | Karten-Oberflächen, erhabene Flächen, Button-Text auf dunkel |
| Leder-Tinte | `#2a1d12` | `--ink` | Headlines & Body, prominente Icons (dunkles Leder-Braun) |
| Espresso | `#3d2c1d` | `--espresso` | dunkle Sektionen (Footer, Hero-Akzentkarte) |
| Oxblood | `#7c2d2a` | `--oxblood` | **Primär-Akzent**: CTA, aktive States, Top-Pick (gefärbtes Leder) |
| Oxblood Glow | `#974039` | `--oxblood-glow` | Hover, Fokus |
| Messing | `#b08a3e` | `--brass` | Sekundär-Akzent: Sterne-Rating, Score-Zahlen, Zierlinien, Badges |
| Messing Hell | `#e3c585` | `--brass-hi` | Glanzlicht in Messing-Verlauf |
| Patina | `#5f7355` | `--patina` | seltener Grün-Akzent (Pflege/Naturleder-Themen, sparsam) |
| Sattel | `#8a6f52` | `--saddle` | warmes Mittelbraun, Captions, dekorative Linien |
| Muted | `#9a8770` | `--muted` | Sekundärtext, Metadaten |
| Hairline | `#e2d6c2` | `--line` | Borders, Divider auf Pergament |

**Messing-Verlauf (Brand-Signatur):** Score-Zahlen / Logo-Mark / seltene Badges via `linear-gradient(180deg,#e3c585 0%,#b08a3e 55%,#8a6a28 100%)` mit `background-clip:text`. Sparsam (H1-Detail, Logo, Score), nie im Fließtext.

## Typografie
- **Display/Headlines:** `Cormorant Garamond` (600/700) — elegante, klassische Renaissance-Serife, editorial, „historisch". Substitut: Georgia, serif. Negatives Tracking bei großen Größen (-0.02em).
- **Body/UI:** `Inter` (400/500/600) — neutral, modern lesbar, hält den Kontrast zur Serife.
- Kicker/Eyebrow: Inter, uppercase, weites Tracking (.14em), in `--saddle`.

## Form-Sprache
- Warme Flächen, Radius 14px auf Karten, 9px auf Buttons. Weiche, tiefe Schatten (`0 18px 40px -20px rgba(60,40,20,.35)`), keine harten Borders außer Hairlines in `--line`.
- Buttons: Primär = `--oxblood` Fill, Leinen-Text. Sekundär = Ghost mit `--saddle`-Border auf Pergament.
- Sterne-Rating: `--brass` gefüllt. Top-Pick-Badge: `--oxblood`.
- Zierdivider: dünner Messing→transparent-Verlauf als Sektions-Trenner (Anklang an geprägte Lederkante).
- Optionales feines „Genarbtes-Leder"-Noise/Tile auf dunklen Karten (sehr subtil).

## Layout-Bausteine (Affiliate-Portal-Muster)
1. Sticky Nav (Pergament/blur, Messing-Logo-Mark, Mega-Menü nach Silo) + Such-Trigger.
2. Hero (Pergament, Cormorant-H1, Value-Prop, 2 CTAs, Trust-Mikrocopy, Produkt-/Stiefel-Visual).
3. Trust-Strip (neutrale USPs: handverlesen, nach Epoche sortiert, ehrliche Vergleiche, Affiliate-transparent — KEINE erfundenen Testzahlen).
4. Silo-Karten (Nach Epoche · Nach Anlass/Stil · Nach Schuhtyp · Wissen/Pflege).
5. Money-Block: Vergleich (z.B. Mittelalterschuhe / Lederstiefel) — Produktkarten mit Score, Pro/Contra, CTA.
6. Ratgeber-Grid (migrierte Bestandsartikel + neue), inkl. Affiliate-Listicle „Beste Shops/Apps für historische Schuhe".
7. „Nach Epoche"-Zeitstrahl (Antike · Mittelalter · Renaissance/Barock · 18./19. Jh.).
8. FAQ (Schema-fähig, AEO — Passform, Pflege, wendegenäht etc.).
9. Footer (Silos, Impressum/Betreiber, Affiliate-Disclaimer).

## Tonalität
Sachkundig, handwerklich, ein wenig erzählerisch (Schuster-/Geschichts-Nähe) aber sauber und ehrlich. Keine fabrizierten Testimonials/Scores, keine erfundenen Testzahlen. Affiliate-Transparenz Pflicht. Keine Em-Dashes, echte Umlaute (ö/ä/ü/ß).
