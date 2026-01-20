import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";

export default function CharactersLoading() {
  return (
    <main className="container">
      <Typography variant="h1" className="my-6">
        Héroes y Villanos
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton className="h-60" key={i} />
        ))}
      </div>
    </main>
  );
}
