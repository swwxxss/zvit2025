import AIShowcase from "@/components/sections/ai-showcase";
import NavigationBar from "@/components/nav/navigation-bar";

export default function AIGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">AI Tattoo Generator</h1>
        <p className="text-muted-foreground mb-8">
          Create unique tattoo designs using our AI-powered generator. Simply describe your desired tattoo,
          and our AI will create a custom design for you.
        </p>
        <AIShowcase />
      </main>
    </div>
  );
}
