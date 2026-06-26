export const meta = {
  name: 'historische-schuhe-content-migration',
  description: 'Migriert 30 historische-schuhe.de Artikel (erhaltene Slugs) als neu geschriebenen, faktentreuen Content',
  phases: [{ title: 'Schreiben', detail: 'ein Agent pro Artikel, schreibt die Markdown-Datei direkt' }],
}

const BASE = '/Users/joshuastark/Documents/Claude Code/Affiliate projects/historische-schuhe.de/src/content/artikel/'

// Bereits migriert (nicht erneut): schuhe-im-mittelalter, roemische-legionaersschuhe,
// schuhe-der-aegyptischen-pharaonen, chinesische-lotus-schuhe, japanische-geta-schuhe,
// mittelalterliche-stiefel-schuhe, geschichte-der-schuhe + 5 net-new Ratgeber.

const ITEMS = [
  // ANTIKE
  { slug: 'antike-sandalen-schuhe', silo: 'epoche', epocheLabel: 'Antike', type: 'ratgeber', category: 'Antike', icon: '🏛️', readMin: 8,
    title: 'Antike Sandalen: Schuhe der Griechen, Römer und des Orients',
    description: 'Die Sandale war der Schuh der Antike. Formen, Materialien und Bedeutung von Griechenland über Rom bis in den Orient, plus Einordnung für Sammler und Darsteller.',
    brief: 'Überblick über die Sandale als prägende Schuhform der Antike: Materialien (Leder, Papyrus, Espartogras), Riemenformen, soziale Bedeutung, Unterschiede zwischen Kulturen.',
    related: ['/roemische-sandalen-schuhe/', '/schuhe-im-alten-rom/', '/schuhe-des-antiken-griechenlands/', '/schuhe-der-aegyptischen-pharaonen/'] },
  { slug: 'schuhe-im-alten-rom', silo: 'epoche', epocheLabel: 'Antike / Rom', type: 'ratgeber', category: 'Antike', icon: '🏛️', readMin: 8,
    title: 'Schuhe im alten Rom: Calceus, Caliga und Soleae',
    description: 'Die Römer kannten ein erstaunlich differenziertes Schuhsystem. Vom geschlossenen Calceus über die Caliga bis zur Soleae, geordnet nach Rang und Anlass.',
    brief: 'Das römische Schuhsystem: Calceus (geschlossener Bürgerschuh), Caliga (Militär), Solea (Haussandale), Pero. Rangabhängigkeit, drinnen vs. draußen.',
    related: ['/roemische-sandalen-schuhe/', '/roemische-legionaersschuhe/', '/antike-sandalen-schuhe/'] },
  { slug: 'schuhe-des-antiken-griechenlands', silo: 'epoche', epocheLabel: 'Antike / Griechenland', type: 'ratgeber', category: 'Antike', icon: '🏺', readMin: 7,
    title: 'Schuhe des antiken Griechenlands: Sandalen, Krepides und Kothurn',
    description: 'Vom barfüßigen Alltag bis zur kunstvollen Sandale: Schuhe im antiken Griechenland, ihre Formen wie Krepis und Kothurn und ihre Rolle im Theater.',
    brief: 'Griechische Sandalenformen (Krepis), der hohe Kothurn im Theater und in der Tragödie, das Barfuß-Ideal, Leder und Riemen.',
    related: ['/antike-sandalen-schuhe/', '/schuhe-im-alten-rom/', '/geschichte-der-schuhe/'] },
  { slug: 'roemische-sandalen-schuhe', silo: 'schuhtyp', epocheLabel: 'Antike / Rom', type: 'ratgeber', category: 'Sandalen', icon: '🩴', readMin: 7,
    title: 'Römische Sandalen: Formen, Aufbau und Vorbild für heute',
    description: 'Römische Sandalen von der einfachen Soleae bis zur genagelten Marschsandale. Aufbau, Riemenführung und worauf du bei einer Nachbildung achtest.',
    brief: 'Aufbau römischer Sandalen, Riemenführung, Nagelung der Sohle, Varianten, kurzer Kaufhinweis für Reenactment.',
    related: ['/roemische-legionaersschuhe/', '/schuhe-im-alten-rom/', '/schuhgroesse-passform-historische-schuhe/', '/beste-shops-apps-historische-schuhe-kaufen/'] },
  // MITTELALTER
  { slug: 'schuhe-des-mittelalters', silo: 'epoche', epocheLabel: 'Mittelalter', type: 'ratgeber', category: 'Mittelalter', icon: '⚔️', readMin: 8,
    title: 'Schuhe des Mittelalters: Alltag, Stand und Material',
    description: 'Welche Schuhe trugen Bauern, Bürger und Adel im Mittelalter? Ein Blick auf Materialien, soziale Unterschiede und den Alltag jenseits der Burgmauern.',
    brief: 'Fokus auf soziale Schichten und Alltag (anders als der Machart-Pillar /schuhe-im-mittelalter/): wer trug was, Material, Reparatur, Trippen. Verweise auf den Pillar.',
    related: ['/schuhe-im-mittelalter/', '/schuhe-des-hochmittelalters/', '/mittelalterliche-stiefel-schuhe/', '/pflege-fuer-schuhe/'] },
  { slug: 'schuhe-des-hochmittelalters', silo: 'epoche', epocheLabel: 'Mittelalter', type: 'ratgeber', category: 'Mittelalter', icon: '🏰', readMin: 7,
    title: 'Schuhe des Hochmittelalters (1000 bis 1250)',
    description: 'Das Hochmittelalter brachte feinere Schuhformen, mehr Vielfalt und erste modische Akzente. Was die Epoche zwischen 1000 und 1250 schuhtechnisch prägte.',
    brief: 'Spezifischer Zeitraum 1000 bis 1250: zunehmende Vielfalt, feinere Verarbeitung, Städte und Zünfte, Übergang zur spätmittelalterlichen Mode.',
    related: ['/schuhe-im-mittelalter/', '/schuhe-des-mittelalters/', '/renaissance-schuhe/'] },
  // RENAISSANCE / BAROCK
  { slug: 'renaissance-schuhe', silo: 'epoche', epocheLabel: 'Renaissance', type: 'ratgeber', category: 'Renaissance', icon: '👑', readMin: 8,
    title: 'Renaissance-Schuhe: Kuhmaulschuhe, Absatz und neue Eleganz',
    description: 'Die Renaissance löste die spitzen Schnabelschuhe ab. Breite Kuhmaulschuhe, erste Absätze und der Wandel vom Funktions- zum Modeschuh.',
    brief: 'Kuhmaulschuhe (breite Form als Gegenbewegung zum Schnabelschuh), erste Absätze, Samt und Leder, Mode als Statussache.',
    related: ['/renaissance-pantoffeln-schuhe/', '/barocke-damenschuhe/', '/schuhe-im-mittelalter/'] },
  { slug: 'renaissance-pantoffeln-schuhe', silo: 'schuhtyp', epocheLabel: 'Renaissance', type: 'ratgeber', category: 'Pantoffeln', icon: '🥿', readMin: 7,
    title: 'Renaissance-Pantoffeln: die Chopine und der modische Pantoffel',
    description: 'Pantoffeln und die hohe Chopine waren in der Renaissance Statussymbole. Herkunft, Aufbau und warum manche Modelle absurd hoch wurden.',
    brief: 'Chopine (Plateau-Überschuh, vor allem Venedig), modischer Pantoffel, Funktion gegen Schmutz und als Statuszeichen, teils extreme Höhen.',
    related: ['/renaissance-schuhe/', '/barocke-damenschuhe/'] },
  { slug: 'barocke-damenschuhe', silo: 'epoche', epocheLabel: 'Barock', type: 'ratgeber', category: 'Barock', icon: '👠', readMin: 8,
    title: 'Barocke Damenschuhe: Absatz, Seide und höfische Pracht',
    description: 'Im Barock wurde der Damenschuh zum Kunstwerk. Hohe Absätze, Seidenstoffe und Verzierungen, getragen am Hof von Versailles bis Wien.',
    brief: 'Hohe Absätze, Seide und Brokat, Stickerei, der Damenschuh als höfisches Kunstwerk, Bezug zu Schnallen und Hofschuhen.',
    related: ['/barocke-herrenschuhe/', '/barocke-schuhschnallen-schuhe/', '/franzoesische-hofschuhe/'] },
  { slug: 'barocke-herrenschuhe', silo: 'epoche', epocheLabel: 'Barock', type: 'ratgeber', category: 'Barock', icon: '🥿', readMin: 7,
    title: 'Barocke Herrenschuhe: Absatzschuhe, Schnallen und Stulpenstiefel',
    description: 'Auch Männer trugen im Barock Absätze. Vom roten Hackenschuh bis zum Stulpenstiefel, der Herrenschuh als Zeichen von Macht und Mode.',
    brief: 'Herrenabsatz, rote Absätze, Schnallenschuh, Stulpen- und Trichterstiefel, Schuh als Machtzeichen.',
    related: ['/barocke-damenschuhe/', '/barocke-schuhschnallen-schuhe/', '/franzoesische-hofschuhe/'] },
  { slug: 'barocke-schuhschnallen-schuhe', silo: 'schuhtyp', epocheLabel: 'Barock', type: 'ratgeber', category: 'Schnallen', icon: '✨', readMin: 6,
    title: 'Barocke Schuhschnallen: das Statussymbol am Schuh',
    description: 'Die Schuhschnalle war im Barock und Rokoko ein eigenes Schmuckstück. Materialien von Messing bis Silber, Formen und Bedeutung der barocken Schnalle.',
    brief: 'Schuhschnalle als abnehmbares Schmuckstück, Materialien (Messing, Silber, Strass), Formen, Wechsel zwischen Schuhen, Ende mit der Revolution.',
    related: ['/barocke-herrenschuhe/', '/barocke-damenschuhe/'] },
  { slug: 'franzoesische-hofschuhe', silo: 'epoche', epocheLabel: 'Barock / höfisch', type: 'ratgeber', category: 'Barock', icon: '👑', readMin: 8,
    title: 'Französische Hofschuhe: Glanz und Eleganz von Versailles',
    description: 'Am französischen Hof war der Schuh politische Botschaft. Die roten Absätze Ludwigs XIV., Seide und Pracht der höfischen Mode.',
    brief: 'Versailles, die talons rouges (roten Absätze) Ludwigs XIV. als Privileg des Hofes, Seide, Mode als Politik.',
    related: ['/barocke-damenschuhe/', '/barocke-herrenschuhe/', '/macht-kleidung/'] },
  // 18. JH
  { slug: 'schuhe-des-18-jahrhunderts', silo: 'epoche', epocheLabel: '18. Jahrhundert', type: 'ratgeber', category: '18. Jahrhundert', icon: '🎩', readMin: 8,
    title: 'Schuhe des 18. Jahrhunderts: Rokoko, Schnallen und Seide',
    description: 'Das 18. Jahrhundert verfeinerte den Schuh: geschwungene Absätze, edle Schnallen und Seidenstoffe im Rokoko, bis die Revolution alles veränderte.',
    brief: 'Pillar fürs 18. Jh.: Rokoko-Eleganz, geschwungener Louis-Absatz, Schnallen, Seide, Wandel durch die Französische Revolution.',
    related: ['/schuhe-des-18-jahrhunderts-in-europa/', '/barocke-schuhschnallen-schuhe/', '/schuhe-des-19-jahrhunderts/'] },
  { slug: 'schuhe-des-18-jahrhunderts-in-europa', silo: 'epoche', epocheLabel: '18. Jahrhundert', type: 'ratgeber', category: '18. Jahrhundert', icon: '🗺️', readMin: 7,
    title: 'Schuhe des 18. Jahrhunderts in Europa: regionale Unterschiede',
    description: 'England, Frankreich, Deutschland: Wie sich der Schuh des 18. Jahrhunderts von Land zu Land unterschied, zwischen höfischer Mode und bürgerlicher Praxis.',
    brief: 'Regionale Unterschiede (anders als der Pillar): französische Hofmode vs. englische Praktik vs. deutschsprachiger Raum, Stadt und Land.',
    related: ['/schuhe-des-18-jahrhunderts/', '/franzoesische-hofschuhe/'] },
  // 19. JH
  { slug: 'schuhe-des-19-jahrhunderts', silo: 'epoche', epocheLabel: '19. Jahrhundert', type: 'ratgeber', category: '19. Jahrhundert', icon: '🎩', readMin: 8,
    title: 'Schuhe des 19. Jahrhunderts: Industrialisierung und neue Formen',
    description: 'Das 19. Jahrhundert machte Schuhe erschwinglich. Maschinelle Fertigung, die Unterscheidung von links und rechts und der Aufstieg der Stiefelette.',
    brief: 'Pillar fürs 19. Jh.: maschinelle Fertigung, Nähmaschine, Standardgrößen, Unterscheidung links und rechts, Stiefelette, breitere Verfügbarkeit.',
    related: ['/stiefel-schuhe-19-jahrhunderts/', '/schuhe-viktorianischen-aera/', '/schuhe-19-jahrhundert/', '/schuhe-des-20-jahrhunderts/'] },
  { slug: 'schuhe-19-jahrhundert', silo: 'epoche', epocheLabel: '19. Jahrhundert', type: 'ratgeber', category: '19. Jahrhundert', icon: '👞', readMin: 6,
    title: 'Mode und Wandel: Schuhe im 19. Jahrhundert',
    description: 'Vom Biedermeier bis zur Gründerzeit wandelte sich der Schuh rasant. Ein Überblick über Stile, Materialien und gesellschaftliche Einflüsse des 19. Jahrhunderts.',
    brief: 'Kompakter Begleiter zum Pillar, Fokus Stil und Gesellschaft: Biedermeier, Gründerzeit, Bürgertum, Mode im Wandel. Verweise auf den Pillar.',
    related: ['/schuhe-des-19-jahrhunderts/', '/schuhe-viktorianischen-aera/'] },
  { slug: 'stiefel-schuhe-19-jahrhunderts', silo: 'epoche', epocheLabel: '19. Jahrhundert', type: 'ratgeber', category: '19. Jahrhundert', icon: '🥾', readMin: 7,
    title: 'Stiefel des 19. Jahrhunderts: Schnürstiefel, Reitstiefel und Stiefelette',
    description: 'Der Stiefel prägte das 19. Jahrhundert. Vom hohen Reitstiefel über den Schnürstiefel bis zur eleganten Damenstiefelette der viktorianischen Zeit.',
    brief: 'Fokus Stiefel im 19. Jh.: Reitstiefel, Schnürstiefel, Knopfstiefelette, Material und Mode.',
    related: ['/schuhe-des-19-jahrhunderts/', '/schuhe-viktorianischen-aera/', '/mittelalterliche-stiefel-schuhe/'] },
  { slug: 'schuhe-viktorianischen-aera', silo: 'epoche', epocheLabel: '19. Jahrhundert', type: 'ratgeber', category: '19. Jahrhundert', icon: '👢', readMin: 7,
    title: 'Schuhe der viktorianischen Ära: Eleganz und Etikette',
    description: 'Die viktorianische Mode verlangte nach feinen Stiefeletten und Knopfschuhen. Wie sich Etikette, Material und Form im England des 19. Jahrhunderts trafen.',
    brief: 'Viktorianisches England, Knopfstiefeletten, Etikette, schwarzes Leder und Stoff, Damen- und Herrenmode.',
    related: ['/schuhe-des-19-jahrhunderts/', '/stiefel-schuhe-19-jahrhunderts/'] },
  { slug: 'napoleonische-marschstiefel-schuhe', silo: 'epoche', epocheLabel: '19. Jahrhundert / Militär', type: 'ratgeber', category: '19. Jahrhundert', icon: '🪖', readMin: 7,
    title: 'Napoleonische Marschstiefel: Schuhwerk der Soldaten um 1800',
    description: 'Die Soldaten der Napoleonischen Kriege marschierten in robusten Lederstiefeln. Aufbau, das Problem der nicht unterschiedenen Füße und die Logistik der Armee.',
    brief: 'Militärstiefel um 1800, gerade Leisten (kein links und rechts), Versorgung und Logistik, Belastung auf langen Märschen.',
    related: ['/roemische-legionaersschuhe/', '/stiefel-schuhe-19-jahrhunderts/'] },
  // 20. JH
  { slug: 'schuhe-des-20-jahrhunderts', silo: 'epoche', epocheLabel: '20. Jahrhundert', type: 'ratgeber', category: '20. Jahrhundert', icon: '👟', readMin: 9,
    title: 'Schuhe des 20. Jahrhunderts: vom Knopfstiefel zum Sneaker',
    description: 'Kein Jahrhundert veränderte den Schuh so stark. Ein Überblick von der Belle Époque über den Siegeszug des Sportschuhs bis zur Designermode.',
    brief: 'Pillar fürs 20. Jh.: Belle Époque, Weltkriege, Aufstieg des Sportschuhs und Sneakers, Designermode, Massenproduktion.',
    related: ['/schuhe-der-1920er-jahre/', '/schuhe-der-1950er-jahre/', '/schuhe-der-1960er/', '/schuhe-der-1980er-jahre/'] },
  { slug: 'schuhe-der-1920er-jahre', silo: 'epoche', epocheLabel: '20. Jahrhundert', type: 'ratgeber', category: '20. Jahrhundert', icon: '👠', readMin: 7,
    title: 'Schuhe der 1920er Jahre: Riemchen, Charleston und Art déco',
    description: 'Die Goldenen Zwanziger brachten den Riemchenschuh und den T-Strap. Wie Tanz, Emanzipation und Art déco die Schuhmode der 1920er prägten.',
    brief: 'Riemchenschuh und T-Strap (Mary Jane), Tanz (Charleston), Art déco, kürzere Röcke machen Schuhe sichtbar, Emanzipation.',
    related: ['/schuhe-des-20-jahrhunderts/', '/schuhe-der-1950er-jahre/'] },
  { slug: 'schuhe-der-1950er-jahre', silo: 'epoche', epocheLabel: '20. Jahrhundert', type: 'ratgeber', category: '20. Jahrhundert', icon: '👠', readMin: 7,
    title: 'Schuhe der 1950er Jahre: Stiletto, Saddle Shoe und Petticoat-Mode',
    description: 'Die 1950er erfanden den Stiletto-Absatz und liebten den zweifarbigen Saddle Shoe. Die Schuhmode zwischen Eleganz, Rock n Roll und Wirtschaftswunder.',
    brief: 'Stiletto-Absatz, zweifarbiger Saddle Shoe, Petticoat-Mode, Jugendkultur und Rock n Roll, Wirtschaftswunder.',
    related: ['/schuhe-des-20-jahrhunderts/', '/schuhe-der-1960er/'] },
  { slug: 'schuhe-der-1960er', silo: 'epoche', epocheLabel: '20. Jahrhundert', type: 'ratgeber', category: '20. Jahrhundert', icon: '👢', readMin: 7,
    title: 'Schuhe der 1960er Jahre: Go-go-Boots und Mod-Style',
    description: 'Die Sechziger marschierten in weißen Go-go-Boots. Wie Mod-Kultur, Aufbruchstimmung und neue Materialien die Schuhmode der 1960er revolutionierten.',
    brief: 'Go-go-Boots, Mod-Style, neue Kunststoffe und Farben, Jugend- und Popkultur, Wandel der Silhouette.',
    related: ['/schuhe-des-20-jahrhunderts/', '/schuhe-der-1950er-jahre/', '/schuhe-der-1980er-jahre/'] },
  { slug: 'schuhe-der-1980er-jahre', silo: 'epoche', epocheLabel: '20. Jahrhundert', type: 'ratgeber', category: '20. Jahrhundert', icon: '👟', readMin: 7,
    title: 'Schuhe der 1980er Jahre: Sneaker, Pop und Pumps',
    description: 'Die Achtziger machten den Sneaker zum Kult und liebten kräftige Farben. Wie Popkultur, Fitnesswelle und Hip-Hop die Schuhmode der 1980er formten.',
    brief: 'Sneaker-Kult, Hip-Hop und Sportmarken, Fitness- und Aerobic-Welle, kräftige Farben, Pumps im Büro.',
    related: ['/schuhe-des-20-jahrhunderts/', '/schuhe-der-1960er/'] },
  // KULTUR
  { slug: 'indische-mojaris', silo: 'kultur', epocheLabel: 'Indien', type: 'ratgeber', category: 'Kulturen', icon: '🪷', readMin: 7,
    title: 'Indische Mojaris: bestickte Schuhe der Maharadschas',
    description: 'Mojaris und Juttis sind die kunstvoll bestickten Lederschuhe Indiens. Herkunft, die spitze Form, reiche Stickerei und ihre Rolle an den Fürstenhöfen.',
    brief: 'Mojari und Jutti: bestickte Lederschuhe, oft ohne links und rechts, hochgebogene Spitze, Handwerk, Fürstenhöfe, bis heute getragen.',
    related: ['/chinesische-lotus-schuhe/', '/japanische-geta-schuhe/', '/tuerkische-babuschen-schuhe/'] },
  { slug: 'tuerkische-babuschen-schuhe', silo: 'kultur', epocheLabel: 'Türkei', type: 'ratgeber', category: 'Kulturen', icon: '🥿', readMin: 6,
    title: 'Türkische Babuschen: die Pantoffel des Orients',
    description: 'Babuschen sind die weichen, hinten offenen Lederpantoffeln des Orients. Aufbau, die typisch hochgebogene Spitze und ihre Verbreitung im Osmanischen Reich.',
    brief: 'Babusche: weicher Lederpantoffel, hinten offen, hochgebogene Spitze, Verbreitung im Osmanischen Reich und in Nordafrika, Material und Farben.',
    related: ['/tuerkische-reitstiefel-schuhe/', '/indische-mojaris/'] },
  { slug: 'tuerkische-reitstiefel-schuhe', silo: 'kultur', epocheLabel: 'Türkei', type: 'ratgeber', category: 'Kulturen', icon: '🐎', readMin: 7,
    title: 'Türkische Reitstiefel: Schuhwerk der osmanischen Reiter',
    description: 'Die Reiter des Osmanischen Reiches trugen hohe, weiche Lederstiefel. Form, Funktion im Sattel und ihr Einfluss auf die Stiefelmode Europas.',
    brief: 'Osmanische Reitstiefel: weiches Leder, hoher Schaft, Funktion im Sattel, Einfluss auf europäische Stiefelmode (Husaren).',
    related: ['/tuerkische-babuschen-schuhe/', '/stiefel-schuhe-19-jahrhunderts/'] },
  // RATGEBER
  { slug: 'pflege-fuer-schuhe', silo: 'ratgeber', epocheLabel: null, type: 'ratgeber', category: 'Pflege', icon: '🧴', readMin: 8,
    title: 'Schuhe richtig pflegen: Leder, Wildleder und historische Schuhe',
    description: 'Wie du historische und moderne Lederschuhe reinigst, pflegst und lagerst. Fett, Wachs, Imprägnierung und was Wildleder anders braucht als glattes Leder.',
    brief: 'Breiter Pflege-Guide: Glattleder vs. Wildleder und Velours, Reinigung, Fett und Wachs, Imprägnierung, Lagerung und Schuhspanner. Ergänzt /leder-pflegen-historische-schuhe/.',
    related: ['/leder-pflegen-historische-schuhe/', '/schuhgroesse-passform-historische-schuhe/'] },
  { slug: 'macht-kleidung', silo: 'ratgeber', epocheLabel: null, type: 'ratgeber', category: 'Wissen', icon: '👑', readMin: 8,
    title: 'Schuhe und Macht: wie Kleidung Status zeigte',
    description: 'Vom roten Absatz bis zur goldenen Sandale: Wie Schuhe und Kleidung über Jahrhunderte gesellschaftlichen Rang, Macht und Zugehörigkeit signalisierten.',
    brief: 'Schuhe und Kleidung als Statuszeichen quer durch die Epochen: ägyptische Sandalen, römischer Rang, rote Hofabsätze, Kleiderordnungen.',
    related: ['/franzoesische-hofschuhe/', '/schuhe-der-aegyptischen-pharaonen/', '/geschichte-der-schuhe/'] },
  { slug: 'a-und-o-schuhe', silo: 'ratgeber', epocheLabel: null, type: 'ratgeber', category: 'Wissen', icon: '🧭', readMin: 7,
    title: 'Das A und O guter Schuhe: Passform, Material und Qualität',
    description: 'Woran du gute Schuhe erkennst, egal ob historisch oder modern. Die wichtigsten Kriterien von der Passform über das Material bis zur Verarbeitung.',
    brief: 'Qualitätsmerkmale: Passform, echtes Leder, saubere Naht, Sohle, Verarbeitung. Brücke zwischen historisch und modern, praktisch und ehrlich.',
    related: ['/schuhgroesse-passform-historische-schuhe/', '/pflege-fuer-schuhe/', '/beste-shops-apps-historische-schuhe-kaufen/'] },
]

function frontmatter(it) {
  const L = ['---', `title: "${it.title}"`, `description: "${it.description}"`, `silo: "${it.silo}"`]
  if (it.epocheLabel) L.push(`epocheLabel: "${it.epocheLabel}"`)
  L.push(`type: "${it.type}"`, `category: "${it.category}"`, `icon: "${it.icon}"`,
    'pubDate: 2024-08-19', 'updated: 2026-06-14', `readMin: ${it.readMin}`, '---')
  return L.join('\n')
}

const RULES = `Du bist erfahrene deutschsprachige Fachredaktion für historische Schuhe (Portal historische-schuhe.de). Schreibe einen NEUEN, hochwertigen Artikel-BODY in Markdown.

Stil und Regeln (streng):
- Deutsch, du-Form, sachkundig und ein wenig erzählerisch, aber präzise und ehrlich.
- Historisch korrekt. KEINE erfundenen Zahlen, Datumsangaben, Testwerte, Testimonials oder Studien. Nur breit gesichertes Allgemeinwissen; im Zweifel allgemein bleiben statt zu erfinden.
- KEINE Em-Dashes (kein Gedankenstrich-Langstrich). Nutze normale Bindestriche oder Kommas. IMMER echte Umlaute ä ö ü ß verwenden, niemals ae oe ue ss.
- KEINE H1-Überschrift im Body (die Seite rendert den Titel automatisch). Beginne mit 1 bis 2 einleitenden Sätzen, dann ## Abschnitte.
- 3 bis 5 Abschnitte mit ## Überschriften, gern mit kurzen Aufzählungen.
- Baue 2 bis 4 INTERNE Links natürlich ein, ausschließlich aus der vorgegebenen Link-Liste, im Format [Ankertext](/slug/).
- Schließe mit "## Häufige Fragen" und genau 2 Frage-Antwort-Paaren. Jede Frage als **Fett-Frage?** gefolgt von der Antwort.
- Affiliate-ehrlich: keine reißerischen Versprechen. Wenn ein Kaufhinweis passt, dezent und transparent.
- Länge: ca. {WORDS} Wörter.`

phase('Schreiben')

const results = await parallel(ITEMS.map((it) => async () => {
  const path = BASE + it.slug + '.md'
  const fm = frontmatter(it)
  const words = it.readMin * 110
  const prompt = `${RULES.replace('{WORDS}', String(words))}

THEMA: ${it.title}
KURZBESCHREIBUNG (Suchintention): ${it.description}
INHALTLICHER FOKUS: ${it.brief}
ERLAUBTE INTERNE LINKS (nur diese, 2 bis 4 davon einbauen): ${it.related.join(' , ')}

AUFGABE:
1. Schreibe den Artikel-Body gemäß aller Regeln.
2. Schreibe die Datei mit dem Write-Tool nach exakt diesem absoluten Pfad:
${path}
3. Der Dateiinhalt ist GENAU dieser Frontmatter-Block, dann eine Leerzeile, dann dein Body. Frontmatter NICHT verändern:

${fm}

Gib danach das Ergebnis als StructuredOutput zurück.`
  const r = await agent(prompt, {
    label: `schreibe:${it.slug}`,
    phase: 'Schreiben',
    agentType: 'general-purpose',
    schema: {
      type: 'object',
      additionalProperties: false,
      required: ['slug', 'ok', 'words'],
      properties: {
        slug: { type: 'string' },
        ok: { type: 'boolean', description: 'true wenn die Datei erfolgreich geschrieben wurde' },
        words: { type: 'number', description: 'ungefähre Wortzahl des Body' },
      },
    },
  })
  return r ? { ...r, slug: it.slug } : { slug: it.slug, ok: false, words: 0 }
}))

const ok = results.filter((r) => r && r.ok)
log(`${ok.length}/${ITEMS.length} Artikel geschrieben`)
return { total: ITEMS.length, written: ok.length, results }
