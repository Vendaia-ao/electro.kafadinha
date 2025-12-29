import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const TabButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  className,
}: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-6 py-4 rounded-lg text-left transition-all duration-300 group w-full",
        isActive
          ? "gradient-energy text-primary-foreground shadow-electric scale-105"
          : "bg-card hover:bg-muted text-foreground hover:scale-102",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
          isActive
            ? "bg-primary-foreground/20"
            : "bg-primary/10 group-hover:bg-primary/20"
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5 transition-colors",
            isActive ? "text-primary-foreground" : "text-primary"
          )}
        />
      </div>
      <span className="font-semibold text-lg">{label}</span>
    </button>
  );
};

export default TabButton;
