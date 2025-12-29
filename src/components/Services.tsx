import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Home, Factory, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import TabButton from "@/components/ui/tab-button";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import { useData } from "@/contexts/DataContext";

const Services = () => {
  const { services, resolveImage } = useData();
  const [activeTab, setActiveTab] = useState("comercial");
  const [selectedService, setSelectedService] = useState<any>(null);

  const tabs = [
    { id: "comercial", label: "Comercial", icon: Building2 },
    { id: "residencial", label: "Residencial", icon: Home },
    { id: "industrial", label: "Industrial", icon: Factory },
  ];

  // Filter services by category and status
  const currentServices = services
    .filter(s => s.category === activeTab && s.status === 'published')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Nossos Serviços"
          title="Soluções completas em energia e água"
          description="Oferecemos uma gama completa de serviços para atender às necessidades de nossos clientes nos setores comercial, residencial e industrial."
          alignment="center"
        />

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <div className="flex lg:flex-col gap-4">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {currentServices.map((service) => (
              <div
                key={service.id}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resolveImage(service.imageUrl)}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="group p-0 h-auto hover:bg-transparent"
                    onClick={() => setSelectedService(service)}
                  >
                    <span className="text-primary">Ler Mais</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServiceDetailModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </section>
  );
};

export default Services;
