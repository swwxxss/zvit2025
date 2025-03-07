import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Tattoo } from "@shared/schema";

interface TattooCardProps {
  tattoo: Tattoo;
}

export default function TattooCard({ tattoo }: TattooCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <img
          src={tattoo.imageUrl}
          alt={tattoo.title}
          className="w-full aspect-square object-cover"
        />
        {tattoo.description && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {tattoo.description}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-medium text-foreground">{tattoo.title}</h3>
            <p className="text-sm text-muted-foreground">{tattoo.style}</p>
          </div>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        {tattoo.tags && tattoo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tattoo.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}