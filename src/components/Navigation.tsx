
import { Button } from "@/components/ui/button";
import { Clock, User, History as HistoryIcon } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Clock },
    { id: "profile", label: "Profile", icon: User },
    { id: "history", label: "History", icon: HistoryIcon },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900">TimeTracker</h1>
          <div className="flex space-x-1 md:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center space-x-1 md:space-x-2 h-10 px-2 md:px-4 text-xs md:text-sm touch-manipulation"
                >
                  <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
