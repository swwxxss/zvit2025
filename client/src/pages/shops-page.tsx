import NavigationBar from "@/components/nav/navigation-bar";
import ShopFinder from "@/components/sections/shop-finder";

export default function ShopsPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">Найближчі тату салони</h1>
        <p className="text-muted-foreground mb-8">
          Знайдіть найкращі тату салони поблизу вас. Перегляньте рейтинги, відгуки та контактну інформацію.
        </p>
        <ShopFinder />
      </main>
    </div>
  );
}
