import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./Sidebar";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm border-b border-border px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden shrink-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 p-4 bg-sidebar text-sidebar-foreground border-sidebar-border"
          >
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-semibold hidden md:block text-foreground">
          {t("header.welcome", { name: "Talia" })}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder={t("header.searchPlaceholder")}
            className="pl-10 w-48 lg:w-64"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell size={20} />
        </Button>

        <Avatar className="w-9 h-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="Talia" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
