import {
  EntityCard,
  type StatItemConfig,
  type BadgeConfig,
} from "@/components/ui/entity-card";
import { Icons } from "@/components/ui/icons";

export interface CharacterCardProps {
  name: string;
  birthYear: string;
  films: number;
  ships: number;
  height: string;
  mass: string;
  gender: string;
}

export function CharacterCard({
  name,
  birthYear,
  films,
  ships,
  height,
  mass,
  gender,
}: CharacterCardProps) {
  const badges: BadgeConfig[] = [
    { label: "Peliculas", value: films, variant: "default" },
    { label: "Naves", value: ships, variant: "outline" },
  ];

  const stats: StatItemConfig[] = [
    { icon: Icons.Height, label: "Altura", value: height, unit: "CM" },
    { icon: Icons.Weight, label: "Peso", value: mass, unit: "KG" },
    { icon: Icons.User, label: "Genero", value: gender },
  ];

  return (
    <EntityCard>
      <EntityCard.Header
        title={name}
        subtitle={`Nacimiento: ${birthYear}`}
        badges={badges}
      />
      <EntityCard.Content>
        <EntityCard.Stats items={stats} columns={3} />
      </EntityCard.Content>
    </EntityCard>
  );
}
