// Zentrale Silo-Definition: Hub-Links + Navigation je Silo.
export type SiloKey = 'epoche' | 'kultur' | 'schuhtyp' | 'ratgeber';

interface SiloDef {
  label: string;
  hubHref: string;
  links: { href: string; label: string }[];
}

export const silos: Record<SiloKey, SiloDef> = {
  epoche: {
    label: 'Epochen',
    hubHref: '/epochen/',
    links: [
      { href: '/antike-sandalen-schuhe/', label: 'Antike Sandalen' },
      { href: '/schuhe-im-mittelalter/', label: 'Schuhe im Mittelalter' },
      { href: '/renaissance-schuhe/', label: 'Renaissance-Schuhe' },
      { href: '/barocke-damenschuhe/', label: 'Barocke Damenschuhe' },
      { href: '/schuhe-des-18-jahrhunderts/', label: 'Schuhe des 18. Jahrhunderts' },
      { href: '/schuhe-viktorianischen-aera/', label: 'Viktorianische Ära' },
      { href: '/schuhe-des-20-jahrhunderts/', label: 'Schuhe des 20. Jahrhunderts' },
    ],
  },
  kultur: {
    label: 'Kulturen',
    hubHref: '/kulturen/',
    links: [
      { href: '/chinesische-lotus-schuhe/', label: 'Chinesische Lotusschuhe' },
      { href: '/japanische-geta-schuhe/', label: 'Japanische Geta' },
      { href: '/indische-mojaris/', label: 'Indische Mojaris' },
      { href: '/tuerkische-babuschen-schuhe/', label: 'Türkische Babuschen' },
      { href: '/tuerkische-reitstiefel-schuhe/', label: 'Türkische Reitstiefel' },
    ],
  },
  schuhtyp: {
    label: 'Schuhtypen',
    hubHref: '/schuhtypen/',
    links: [
      { href: '/mittelalterliche-stiefel-schuhe/', label: 'Mittelalterliche Stiefel' },
      { href: '/roemische-sandalen-schuhe/', label: 'Römische Sandalen' },
      { href: '/renaissance-pantoffeln-schuhe/', label: 'Renaissance-Pantoffeln' },
      { href: '/barocke-schuhschnallen-schuhe/', label: 'Barocke Schuhschnallen' },
    ],
  },
  ratgeber: {
    label: 'Ratgeber',
    hubHref: '/ratgeber/',
    links: [
      { href: '/geschichte-der-schuhe/', label: 'Geschichte der Schuhe' },
      { href: '/pflege-fuer-schuhe/', label: 'Schuhe richtig pflegen' },
      { href: '/schuhgroesse-passform-historische-schuhe/', label: 'Schuhgröße & Passform' },
      { href: '/beste-shops-apps-historische-schuhe-kaufen/', label: 'Beste Shops & Apps zum Kaufen' },
    ],
  },
};
