import NavigationBar from "@/components/nav/navigation-bar";
import TattooGrid from "@/components/gallery/tattoo-grid";
import AIShowcase from "@/components/sections/ai-showcase";
import ShopFinder from "@/components/sections/shop-finder";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">Featured Tattoos</h2>
          <TattooGrid />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">AI Tattoo Generator</h2>
          <AIShowcase />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">Find Tattoo Shops</h2>
          <ShopFinder />
        </section>
      </main>
    </div>
  );
}
