import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { heroImages } from "@/lib/images";
import { getImage } from "@/lib/images";
import VideoModal from "@/components/VideoModal";
import { scrollToSection } from "@/lib/navigation";
import { useData } from "@/contexts/DataContext";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { getSiteSetting } = useData();

  const customHeroImage1 = getSiteSetting('hero_image_1');
  const customHeroImage2 = getSiteSetting('hero_image_2');

  const slides = [
    {
      image: customHeroImage1 ? getImage(customHeroImage1) : heroImages.engineer,
      title: "Soluções Estratégicas em Energia e Água",
      subtitle: "10+ anos de experiência no mercado angolano",
    },
    {
      image: customHeroImage2 ? getImage(customHeroImage2) : heroImages.installation,
      title: "Liderança e Rigor na Gestão de Serviços Públicos",
      subtitle: "Como agente autorizado EPAL, elevamos o padrão de atendimento e suporte comercial com transparência e rigor operacional",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 gradient-hero" />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fade-up">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 font-light">
                  {slide.subtitle}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="play" 
                    size="lg" 
                    className="group"
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Assista ao Vídeo
                  </Button>
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => scrollToSection('sobre')}
                  >
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-12"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </section>
  );
};

export default Hero;
