const SWAPI_PROVIDERS = {
  PRIMARY: 'https://swapi.dev/api',
  FALLBACK: 'https://swapi.info/api',
} as const;

export { SWAPI_PROVIDERS };

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/characters', label: 'Personajes' },
  { href: '/starships', label: 'Naves' },
  { href: '/planets', label: 'Planetas' },
  { href: '/chat', label: 'Holocron' },
  { href: '/transform', label: 'Holocreador' },
] as const;

export const SABER_COLOR_VAR = {
  cyan: 'var(--saber-cyan)',
  green: 'var(--saber-green)',
  red: 'var(--saber-red)',
  purple: 'var(--saber-purple)',
} as const;

export type SaberColor = keyof typeof SABER_COLOR_VAR;

export const SABER_COLOR_OPTIONS = Object.keys(SABER_COLOR_VAR) as SaberColor[];

export const DEFAULT_SABER_COLOR: SaberColor = 'cyan';

// Transform feature limits
export const TRANSFORM_CONFIG = {
  MAX_ATTEMPTS: 4,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_IMAGE_SIZE_BYTES: 5 * 1024 * 1024,
  COOKIE_NAME: 'sw-transform-attempts',
  COOKIE_MAX_AGE_SECONDS: 60 * 60 * 24, // 24 hours
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
} as const;
