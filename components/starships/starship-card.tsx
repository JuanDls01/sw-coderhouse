import {
  EntityCard,
  type StatItemConfig,
  type BadgeConfig,
} from "@/components/ui/entity-card";
import { Icons } from "@/components/ui/icons";
import { formatStarshipCapacity } from "@/utils/formatStarshipCapacity";

export interface StarshipCardProps {
  name: string;
  model: string;
  manufacturer: string;
  length: string;
  maxAtmospheringSpeed: string;
  crew: string;
  cargoCapacity: string;
  starshipClass: string;
  films: number;
}

export function StarshipCard({
  name,
  model,
  manufacturer,
  length,
  maxAtmospheringSpeed,
  crew,
  cargoCapacity,
  starshipClass,
  films,
}: StarshipCardProps) {
  const badges: BadgeConfig[] = [
    { label: "Clase", value: starshipClass, variant: "default" },
    { label: "Peliculas", value: films, variant: "outline" },
  ];

  const stats: StatItemConfig[] = [
    { icon: Icons.Gauge, label: "Largo", value: length, unit: "M" },
    {
      icon: Icons.Zap,
      label: "velocidad",
      value: maxAtmospheringSpeed,
      unit: "KM/H",
    },
    { icon: Icons.Users, label: "Tripulación", value: crew },
    {
      icon: Icons.Package,
      label: "Carga",
      value: formatStarshipCapacity(cargoCapacity),
      unit: "KG",
    },
  ];

  return (
    <EntityCard>
      <EntityCard.Header
        title={name}
        subtitle={`Modelo: ${model}`}
        description={manufacturer}
        badges={badges}
      />
      <EntityCard.Content>
        <EntityCard.Stats
          items={stats}
          columns={2}
          title="Especificaciones Técnicas"
        />
      </EntityCard.Content>
    </EntityCard>
  );
}
