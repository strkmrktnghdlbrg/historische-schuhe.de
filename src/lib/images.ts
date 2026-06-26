import data from '../data/images.json';

export interface ImageEntry {
  src: string;
  credit: string;
  license: string;
  licenseUrl: string;
  source: string;
  title: string;
}

const images = data as Record<string, ImageEntry>;

export function getImage(slug: string): ImageEntry | null {
  return images[slug] ?? null;
}

// Foto fuer den Startseiten-Hero (eigener Slug, sonst ein starkes Motiv als Fallback).
export function getHeroImage(): ImageEntry | null {
  return images['_hero'] ?? images['schuhe-im-mittelalter'] ?? null;
}

export function allImages(): [string, ImageEntry][] {
  return Object.entries(images).filter(([k]) => !k.startsWith('_'));
}
