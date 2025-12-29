import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  badge?: string;
  secondaryBadge?: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
}

const ProjectCard = ({
  image,
  title,
  description,
  badge,
  secondaryBadge,
  buttonText = "Saiba Mais",
  onClick,
  className,
}: ProjectCardProps) => {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-up",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Badges */}
        {(badge || secondaryBadge) && (
          <div className="absolute top-4 left-4 flex gap-2">
            {badge && (
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide shadow-electric">
                {badge}
              </span>
            )}
            {secondaryBadge && (
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wide shadow-golden">
                {secondaryBadge}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold font-heading text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
        <Button
          variant="ghost"
          className="group/btn p-0 h-auto font-semibold text-primary hover:text-secondary transition-colors"
          onClick={onClick}
        >
          {buttonText}
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </article>
  );
};

export default ProjectCard;
