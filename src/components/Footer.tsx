import { 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Facebook, 
  Instagram, 
  Linkedin,
  Zap,
  Lock
} from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigateToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      // We're on home, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // We're on another page, navigate to home with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "Sobre", id: "sobre" },
    { name: "Serviços", id: "servicos" },
    { name: "Projetos", id: "projetos" },
    { name: "Blog", id: "blog" },
    { name: "Contato", id: "contato" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#a00000] to-[#7a0000] text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Electro Kafadinha Logo" className="w-12 h-12" />
              <span className="text-xl font-heading font-bold text-white">Electro Kafadinha</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Fornecedora autorizada de serviços de água e eletricidade em Angola. 
              Agente EPAL-EP com mais de 25 anos de experiência.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary hover:to-secondary text-white hover:text-white transition-all duration-300 hover:scale-110 shadow-electric border border-white/20 hover:border-transparent"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary hover:to-secondary text-white hover:text-white transition-all duration-300 hover:scale-110 shadow-electric border border-white/20 hover:border-transparent"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary hover:to-secondary text-white hover:text-white transition-all duration-300 hover:scale-110 shadow-electric border border-white/20 hover:border-transparent"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 relative inline-block text-white">
              Links Rápidos
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3 mt-8">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateToSection(link.id)}
                    className="text-white/80 hover:text-secondary transition-all duration-300 text-sm flex items-center gap-2 group cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 relative inline-block text-white">
              Nossos Serviços
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3 mt-8">
              {[
                "Distribuição de Água",
                "Energia Elétrica",
                "Instalações Comerciais",
                "Instalações Residenciais",
                "Manutenção Industrial",
                "Projetos Elétricos"
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => navigateToSection('servicos')}
                    className="text-white/80 hover:text-secondary transition-all duration-300 text-sm flex items-center gap-2 group cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-secondary group-hover:scale-125 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">{service}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 relative inline-block text-white">
              Contato
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4 mt-8">
              <li>
                <a
                  href="#"
                  className="flex items-start gap-3 text-white/90 hover:text-secondary transition-all duration-300 text-sm group"
                >
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 group-hover:scale-125 group-hover:text-primary transition-all duration-300" />
                  <span>Maiombe, Cabinda, Angola</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+244923456789"
                  className="flex items-center gap-3 text-white/90 hover:text-secondary transition-all duration-300 text-sm group"
                >
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0 group-hover:scale-125 group-hover:text-primary transition-all duration-300" />
                  <span>+244 924 792 015</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:electrokafadinhageral@gmail.com"
                  className="flex items-center gap-3 text-white/90 hover:text-secondary transition-all duration-300 text-sm group"
                >
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0 group-hover:scale-125 group-hover:text-primary transition-all duration-300" />
                  <span>electrokafadinhageral@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p className="animate-fade-in">
              © {currentYear} Electro Kafadinha, LDA. Todos os direitos reservados. Desenvolvido pela Vendaia
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                Privacidade
              </a>
              <span className="text-white/30">•</span>
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                Termos
              </a>
              <span className="text-white/30">•</span>
              <a
                href="https://app2.rovalerp.com/#/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition-colors duration-300 group"
                title="Sistema de gestão interna"
              >
                <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Acesso ERP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
