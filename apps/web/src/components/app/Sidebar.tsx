import {
  LayoutDashboard,
  Calendar,
  Book,
  GraduationCap,
  BarChart,
  Megaphone,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/zustand/auth.store";
import { useTranslation } from "react-i18next";

// Reusable content for both Desktop Sidebar and Mobile Sheet
export function SidebarContent() {
  const { logout } = useAuthStore();
  const { t } = useTranslation();

  const hoverClasses =
    "hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black";
  const activeClasses =
    "bg-white text-black dark:bg-white dark:text-black font-medium";

  // Define items inside the component so 't' works
  const navItems = [
    { name: t("sidebar.dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("sidebar.schedule"), href: "/schedule", icon: Calendar },
    { name: t("sidebar.courses"), href: "/courses", icon: Book },
    { name: t("sidebar.gradebook"), href: "/gradebook", icon: GraduationCap },
    { name: t("sidebar.performance"), href: "/performance", icon: BarChart },
    { name: t("sidebar.announcement"), href: "/announcement", icon: Megaphone },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="text-2xl font-bold mb-8 p-2">Coligo</div>

      <nav className="flex flex-col space-y-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href} // Use href as key since name changes with language
            to={item.href}
            end={item.href === "/dashboard"}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                isActive ? activeClasses : hoverClasses
              )
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => logout()}
        className={cn(
          "flex items-center space-x-3 p-3 rounded-lg mt-auto",
          "text-sidebar-foreground hover:bg-red-500/10 hover:text-red-600 transition-colors"
        )}
      >
        <LogOut size={20} />
        <span>{t("sidebar.logout")}</span>
      </button>
    </div>
  );
}

export default function Sidebar() {
  const sidebarBg = "bg-sidebar";
  const sidebarFg = "text-sidebar-foreground";

  return (
    <aside
      className={cn("w-64 p-4 hidden md:flex flex-col", sidebarBg, sidebarFg)}
    >
      <SidebarContent />
    </aside>
  );
}
