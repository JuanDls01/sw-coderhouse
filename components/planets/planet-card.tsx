import { EntityCard, type StatItemConfig } from "@/components/ui/entity-card";
import { Icons } from "@/components/ui/icons";

export interface PlanetCardProps {
  name: string;
  terrain: string;
  climate: string;
  gravity: string;
  population: string;
}

export function PlanetCard({
  name,
  terrain,
  climate,
  gravity,
  population,
}: PlanetCardProps) {
  const stats: StatItemConfig[] = [
    { icon: Icons.Earth, label: "Climate", value: climate },
    { icon: Icons.Scale, label: "Gravity", value: gravity },
    { icon: Icons.Users, label: "Population", value: population },
  ];

  return (
    <EntityCard>
      <EntityCard.Header
        title={name}
        subtitle={`Core Classification: ${terrain}`}
      />
      <EntityCard.Content>
        <EntityCard.Stats items={stats} columns={2} />
      </EntityCard.Content>
    </EntityCard>
  );
}
