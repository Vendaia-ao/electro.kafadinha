import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Building2, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/navigation";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  location?: string;
  client?: string;
  details: string;
  challenges?: string[];
  solutions?: string[];
}

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
  if (!project) return null;

  const handleContactClick = () => {
    onClose();
    scrollToSection('contato');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="capitalize">{project.category}</span>
            </div>
            {project.location && (
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{project.location}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sobre o Projeto</h3>
            <p className="text-muted-foreground leading-relaxed">{project.details}</p>
          </div>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Desafios</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Solutions */}
          {project.solutions && project.solutions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Soluções Implementadas</h3>
              <ul className="space-y-2">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="hero" size="lg" className="flex-1" onClick={handleContactClick}>
              Solicitar Projeto Similar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
