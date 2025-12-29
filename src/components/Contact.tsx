import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeader from "@/components/ui/section-header";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const { addContactMessage } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    toast({
      title: "Mensagem Enviada!",
      description: "Entraremos em contato em breve. Obrigado!",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      details: "Luanda, Angola",
      link: null,
    },
    {
      icon: Phone,
      title: "Telefone",
      details: "+244 900 000 000",
      link: "tel:+244900000000",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@electrokafadinha.ao",
      link: "mailto:info@electrokafadinha.ao",
    },
    {
      icon: Clock,
      title: "Horário",
      details: "Seg - Sex: 8h - 18h",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          badge="Contato"
          title="Entre em contato"
          description="Estamos prontos para ajudar com sua solução energética. Fale conosco!"
          alignment="center"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-primary-foreground shadow-electric">
              <h3 className="text-2xl font-bold mb-2">Fale Conosco</h3>
              <p className="text-primary-foreground/90 mb-6">
                Nossa equipe está pronta para atender você.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 gradient-energy rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        {item.details}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.details}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted rounded-xl overflow-hidden h-64">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Mapa Interativo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl shadow-lg space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Nome Completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+244 900 000 000"
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Assunto da mensagem"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Descreva sua necessidade ou dúvida..."
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="w-5 h-5" />
                Enviar Mensagem
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ao enviar, você concorda com nossa política de privacidade.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
