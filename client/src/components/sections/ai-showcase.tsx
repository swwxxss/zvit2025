import { Card, CardContent } from "@/components/ui/card";

const SHOWCASE_EXAMPLES = [
  {
    prompt: "Japanese Dragon",
    imageUrl: "https://placehold.co/400x400/2a2a2a/888888?text=AI+Generated+Dragon",
    style: "Traditional Japanese"
  },
  {
    prompt: "Watercolor Rose",
    imageUrl: "https://placehold.co/400x400/2a2a2a/888888?text=AI+Generated+Rose",
    style: "Watercolor"
  },
  {
    prompt: "Geometric Wolf",
    imageUrl: "https://placehold.co/400x400/2a2a2a/888888?text=AI+Generated+Wolf",
    style: "Geometric"
  }
];

export default function AIShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SHOWCASE_EXAMPLES.map((example, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <img
              src={example.imageUrl}
              alt={example.prompt}
              className="w-full aspect-square object-cover rounded-md mb-4"
            />
            <h3 className="font-medium text-foreground mb-2">{example.prompt}</h3>
            <p className="text-sm text-muted-foreground">{example.style}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
