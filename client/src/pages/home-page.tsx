import NavigationBar from "@/components/nav/navigation-bar";
import TattooGrid from "@/components/gallery/tattoo-grid";
import TattooUploadForm from "@/components/gallery/tattoo-upload-form";
import AIShowcase from "@/components/sections/ai-showcase";
import ShopFinder from "@/components/sections/shop-finder";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <section id="gallery" className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-primary">Featured Tattoos</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Tattoo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload Your Tattoo</DialogTitle>
                </DialogHeader>
                <TattooUploadForm />
              </DialogContent>
            </Dialog>
          </div>
          <TattooGrid />
        </section>

        <section id="ai" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">AI Tattoo Generator</h2>
          <AIShowcase />
        </section>

        <section id="shops" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">Find Tattoo Shops</h2>
          <ShopFinder />
        </section>
      </main>
    </div>
  );
}