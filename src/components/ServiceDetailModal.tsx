import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/navigation";

interface Service {
  title: string;
  description: string;
  image: string;
  details: string;
  features: string[];
  benefits: string[];
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const ServiceDetailModal = ({ isOpen, onClose, service }: ServiceDetailModalProps) => {
  if (!service) return null;

  const handleContactClick = () => {
    onClose();
    scrollToSection('contato');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sobre o Serviço</h3>
            <p className="text-muted-foreground leading-relaxed">{service.details}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Características</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Benefícios</h3>
            <div className="grid gap-3">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full gradient-energy flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="hero" size="lg" className="flex-1" onClick={handleContactClick}>
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
