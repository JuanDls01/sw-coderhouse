export const SWAPI_URL = "http://swapi.info/api";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/characters", label: "Personajes" },
  { href: "/starships", label: "Naves" },
  { href: "/planets", label: "Planetas" },
] as const;

export const SABER_COLOR_VAR = {
  cyan: "var(--saber-cyan)",
  green: "var(--saber-green)",
  red: "var(--saber-red)",
  purple: "var(--saber-purple)",
  yellow: "var(--saber-yellow)",
} as const;

export type SaberColor = keyof typeof SABER_COLOR_VAR;

export const SABER_COLOR_OPTIONS = Object.keys(SABER_COLOR_VAR) as SaberColor[];

export const DEFAULT_SABER_COLOR: SaberColor = "cyan";
