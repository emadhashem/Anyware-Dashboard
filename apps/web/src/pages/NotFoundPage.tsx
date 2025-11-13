import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-background text-foreground">
      <div className="text-center bg-card p-8 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="text-muted-foreground mt-2 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Button
          asChild
          onClick={() => navigate(-1)}
          className="cursor-pointer "
        >
          <p>Back</p>
        </Button>
      </div>
    </div>
  );
}
