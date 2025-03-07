import { useQuery } from "@tanstack/react-query";
import TattooCard from "./tattoo-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tattoo } from "@shared/schema";

export default function TattooGrid() {
  const { data: tattoos, isLoading } = useQuery<Tattoo[]>({
    queryKey: ["/api/tattoos"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
      </div>
    );
  }

  if (!tattoos?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tattoos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tattoos.map((tattoo) => (
        <TattooCard key={tattoo.id} tattoo={tattoo} />
      ))}
    </div>
  );
}
