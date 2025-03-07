import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SHOWCASE_EXAMPLES = [
  {
    prompt: "Japanese Dragon",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSjn9_6vQOinHwc9pi_PmvUrkkkyLeF8gRuA&s",
    style: "Traditional Japanese"
  },
  {
    prompt: "Watercolor Rose",
    imageUrl: "https://i.pinimg.com/736x/af/87/fb/af87fb4510b56db6c2c03f8c4fb12fbe.jpg",
    style: "Watercolor"
  },
  {
    prompt: "Geometric Wolf",
    imageUrl: "https://i.pinimg.com/736x/6b/e2/bc/6be2bcf53e77b24a6c3c36b56ac5fd35.jpg",
    style: "Watercolor"
  }
];

export default function AIShowcase() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    // TODO: Implement actual AI generation here
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setGeneratedImage("https://placehold.co/400x400/2a2a2a/888888?text=Generated+Tattoo");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Generate Your Own Design</h3>
        <div className="flex gap-4">
          <Input
            placeholder="Describe your dream tattoo..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </div>
        {generatedImage && (
          <div className="mt-4">
            <img
              src={generatedImage}
              alt="Generated tattoo"
              className="rounded-lg w-full max-w-md mx-auto"
            />
          </div>
        )}
      </div>

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
    </div>
  );
}