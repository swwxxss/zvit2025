import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";
import { Tattoo, Comment } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TattooCardProps {
  tattoo: Tattoo;
}

export default function TattooCard({ tattoo }: TattooCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: [`/api/tattoos/${tattoo.id}/comments`],
    enabled: isCommentsOpen,
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/tattoos/${tattoo.id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tattoos"] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (content: string) => {
      await apiRequest("POST", `/api/tattoos/${tattoo.id}/comments`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [`/api/tattoos/${tattoo.id}/comments`] 
      });
      setNewComment("");
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    },
  });

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    commentMutation.mutate(newComment);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <img
          src={tattoo.imageUrl}
          alt={tattoo.title}
          className="w-full aspect-square object-cover"
        />
        {tattoo.description && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {tattoo.description}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-medium text-foreground">{tattoo.title}</h3>
            <p className="text-sm text-muted-foreground">{tattoo.style}</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsCommentsOpen(true)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="ml-1">{comments.length}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Comments</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-muted p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                    />
                    <Button 
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || commentMutation.isPending}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => likeMutation.mutate()}
              disabled={likeMutation.isPending}
            >
              <Heart className={`h-5 w-5 ${tattoo.likes > 0 ? 'fill-current text-red-500' : ''}`} />
              <span className="ml-1">{tattoo.likes}</span>
            </Button>
          </div>
        </div>
        {tattoo.tags && tattoo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tattoo.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}