import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center";
  titleGradient?: boolean;
  className?: string;
}

const SectionHeader = ({
  badge,
  title,
  description,
  alignment = "center",
  titleGradient = true,
  className,
}: SectionHeaderProps) => {
  const alignmentClasses = alignment === "center" ? "text-center items-center" : "text-left items-start";
  
  return (
    <div className={cn("flex flex-col gap-4 mb-12", alignmentClasses, className)}>
      {badge && (
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase w-fit">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl font-bold font-heading leading-tight",
          titleGradient && "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
