import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Tattoo } from "@shared/schema";

interface TattooCardProps {
  tattoo: Tattoo;
}

export default function TattooCard({ tattoo }: TattooCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <img
          src={tattoo.imageUrl}
          alt={tattoo.title}
          className="w-full aspect-square object-cover"
        />
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-foreground">{tattoo.title}</h3>
          <p className="text-sm text-muted-foreground">{tattoo.style}</p>
        </div>
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
