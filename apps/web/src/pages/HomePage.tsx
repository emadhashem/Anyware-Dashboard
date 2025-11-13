import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/zustand/auth.store";

export default function HomePage() {
  const { isLoggedIn, login, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-background">
      <div className="bg-white dark:bg-card p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-foreground">
          Coligo Project
        </h1>
        <p className="mb-6 text-muted-foreground">
          {isLoggedIn
            ? "You are logged in."
            : "Please log in to view the dashboard."}
        </p>
        {isLoggedIn ? (
          <Button variant="destructive" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button onClick={handleLogin}>Log In (Mock)</Button>
        )}
      </div>
    </div>
  );
}
