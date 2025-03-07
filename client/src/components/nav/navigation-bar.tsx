import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

export default function NavigationBar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-primary">TattooVerse</h1>
          <div className="hidden md:flex space-x-6">
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors">
              Gallery
            </a>
            <a href="#ai" className="text-foreground hover:text-primary transition-colors">
              AI Generator
            </a>
            <a href="#shops" className="text-foreground hover:text-primary transition-colors">
              Find Shops
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              {user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
