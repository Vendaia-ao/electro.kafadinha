import { Button } from "@/components/ui/button";
import { Check, Zap, Droplet, Wrench } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { aboutImages } from "@/lib/images";
import { scrollToSection } from "@/lib/navigation";

const About = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Instalações Eléctricas de Alta, Media, Baixa Tensão e Iluminação Publica",
      description: "Equipe técnica certificada e experiente",
    },
    {
      icon: Droplet,
      title: "Gestão e Distribuição de Água",
      description: "Agente autorizado EPAL-EP",
    },
    {
      icon: Wrench,
      title: "Manutenção de Instalações Eléctricas, Iluminação Publica e Grupos Geradores",
      description: "Sistemas de backup e energia ininterrupta",
    },
  ];

  const features = [
    "Agente autorizado EPAL-EP",
    "Manutenção preventiva e corretiva",
    "Redes e PTs privados",
    "Soluções personalizadas",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-slide-in-left">
            <SectionHeader
              badge="Sobre Nós"
              title="Empresa líder em energia e água"
              description="A Electro Kafadinha, LDA é uma empresa angolana privada especializada nos setores de água 
              e eletricidade. Somos agentes da EPAL-EP e proprietários de redes e PTs privados, assegurando distribuição de energia através de ativos próprios e serviços especializados."
              alignment="left"
            />

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full gradient-energy mb-3">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Features List */}
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection('contato')}
            >
              Fale Conosco
            </Button>
          </div>

          {/* Right Column - Image Composition */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutImages.team}
                alt="Equipe profissional Electro Kafadinha"
                className="w-full h-auto object-cover"
              />
              
              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 bg-secondary text-secondary-foreground rounded-2xl p-6 shadow-golden">
                <div className="text-5xl font-bold mb-1">25+</div>
                <div className="text-sm font-semibold">Anos de Experiência</div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 top-6 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-6 left-0 w-48 h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
