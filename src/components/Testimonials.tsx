import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Diretor Comercial",
      company: "Empresa ABC, Lda",
      rating: 5,
      text: "A Electro Kafadinha transformou completamente a infraestrutura elétrica do nosso edifício comercial. Profissionalismo e qualidade excepcionais. Recomendo sem hesitação!",
    },
    {
      name: "Ana Silva",
      position: "Proprietária",
      company: "Residencial Benfica",
      rating: 5,
      text: "Excelente serviço de ligação de água através da EPAL. A equipe foi pontual, profissional e resolveu todos os nossos problemas rapidamente. Muito satisfeita!",
    },
    {
      name: "José Carvalho",
      position: "Gerente de Operações",
      company: "Indústria XYZ",
      rating: 5,
      text: "Trabalhamos com a Electro Kafadinha há mais de 5 anos. A manutenção preventiva que realizam nos poupa de grandes prejuízos. Equipe técnica altamente qualificada!",
    },
    {
      name: "Maria Santos",
      position: "Administradora",
      company: "Condomínio Talatona",
      rating: 5,
      text: "A instalação do posto de transformação foi realizada com perfeição. O pós-venda é excelente e sempre que precisamos estão disponíveis. Empresa de confiança!",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Testemunhos"
          title="O que nossos clientes dizem"
          description="A satisfação dos nossos clientes é a nossa maior conquista."
          alignment="center"
        />

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-electric z-10">
              <Quote className="w-8 h-8 text-white" />
            </div>
            
            <div className="bg-card rounded-3xl p-12 md:p-16 relative animate-fade-in border-2 border-border shadow-2xl">
              {/* Decorative gradient border top */}
              <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-t-3xl"></div>

              {/* Rating Stars */}
              <div className="flex gap-2 mb-8 justify-center mt-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-secondary text-secondary drop-shadow-lg" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-center mb-10 text-foreground tracking-wide">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="text-center">
                <div className="font-bold text-2xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {currentTestimonial.name}
                </div>
                <div className="text-muted-foreground text-base">
                  {currentTestimonial.position} • {currentTestimonial.company}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-muted hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all duration-300 hover:scale-110 border border-border hover:border-transparent hover:text-white"
                  aria-label="Testemunho anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-gradient-to-r from-primary to-secondary w-8"
                          : "bg-muted hover:bg-muted-foreground/50 w-2"
                      }`}
                      aria-label={`Ir para testemunho ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-muted hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all duration-300 hover:scale-110 border border-border hover:border-transparent hover:text-white"
                  aria-label="Próximo testemunho"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
