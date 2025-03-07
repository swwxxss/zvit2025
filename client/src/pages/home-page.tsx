import NavigationBar from "@/components/nav/navigation-bar";
import TattooGrid from "@/components/gallery/tattoo-grid";
import TattooUploadForm from "@/components/gallery/tattoo-upload-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
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
        
      </main>
    </div>
  );
}