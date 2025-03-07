import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function NavigationBar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">TattooVerse</h1>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="#gallery">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
                Gallery
              </span>
            </Link>
            <Link href="#ai">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
                AI Generator
              </span>
            </Link>
            <Link href="#shops">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
                Find Shops
              </span>
            </Link>
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