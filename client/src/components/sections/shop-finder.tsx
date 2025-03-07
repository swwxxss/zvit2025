import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import type { Shop } from "@shared/schema";

interface ContactInfo {
  phone: string;
  email: string;
}

export default function ShopFinder() {
  const { data: shops, isLoading } = useQuery<Shop[]>({
    queryKey: ["/api/shops"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {shops?.map((shop) => (
        <Card key={shop.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {shop.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{shop.description}</p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {shop.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {(shop.contactInfo as ContactInfo).phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {(shop.contactInfo as ContactInfo).email}
              </p>
              <p className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                {shop.rating}/5
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}