import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigateToSection } from "@/lib/navigation";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Blog", href: "#blog" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => navigateToSection('home')} className="flex items-center gap-3 transition-transform hover:scale-105">
            <img src={logo} alt="Electro Kafadinha Logo" className="h-12 w-auto" />
            <span
              className={cn(
                "text-xl font-bold font-heading transition-all duration-300",
                isScrolled
                  ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  : "text-primary-foreground"
              )}
            >
              Electro Kafadinha
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigateToSection(item.href.substring(1))}
                className={cn(
                  "font-medium transition-colors relative group",
                  isScrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-white hover:text-white/90"
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="lg" onClick={() => navigateToSection('contato')}>
              Obter Soluções
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-all",
              isScrolled 
                ? "text-foreground" 
                : "text-white bg-white/10 backdrop-blur-sm border border-white/20"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border bg-white shadow-xl rounded-b-2xl animate-fade-in">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigateToSection(item.href.substring(1));
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors px-6 py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-6 pt-2">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    navigateToSection('contato');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Obter Soluções
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
