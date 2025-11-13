import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/Sidebar";
import Header from "@/components/app/Header";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen">
        <Header />
        <main className="flex-1 px-4  md:px-0 md:pe-4 py-4 md:py-6 lg:py-8 bg-secondary/30 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
