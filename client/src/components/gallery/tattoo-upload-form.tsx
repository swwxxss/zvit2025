import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTattooSchema } from "@shared/schema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type TattooUploadData = {
  title: string;
  style: string;
  description?: string;
  imageUrl: string;
  tags?: string[];
};

export default function TattooUploadForm() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<TattooUploadData>({
    resolver: zodResolver(insertTattooSchema),
  });

  const uploadMutation = useMutation({
    mutationFn: async (data: TattooUploadData) => {
      const res = await apiRequest("POST", "/api/tattoos", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tattoos"] });
      toast({
        title: "Success",
        description: "Tattoo uploaded successfully",
      });
      form.reset();
      setImagePreview(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("imageUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    uploadMutation.mutate(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 mx-auto rounded"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImagePreview(null);
                  form.setValue("imageUrl", "");
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <label className="block mt-2 cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="text-primary hover:underline">
                  Upload a photo
                </span>
                <span className="text-muted-foreground"> or drag and drop</span>
              </label>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Traditional, Realistic, Minimalist" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={uploadMutation.isPending || !imagePreview}
        >
          {uploadMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Upload Tattoo
        </Button>
      </form>
    </Form>
  );
}
