import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/ui/section-header";

const FAQ = () => {
  const faqs = [
    {
      question: "Como ligar minha residência à rede elétrica da Electro Kafadinha?",
      answer: "Para ligar sua residência à nossa rede, você deve entrar em contato através dos nossos canais de atendimento. Nossa equipe técnica irá realizar uma visita ao local, fazer o levantamento técnico necessário e apresentar um orçamento. O processo inclui a instalação do padrão de entrada, ligação à rede e certificação das instalações.",
    },
    {
      question: "Vocês são agentes autorizados da EPAL-EP?",
      answer: "Sim, somos agentes autorizados da EPAL-EP (Empresa Pública de Água). Isso nos permite realizar ligações de água, instalações hidráulicas e manutenções em nome da EPAL, garantindo qualidade e conformidade com todas as normas técnicas vigentes.",
    },
    {
      question: "Quais tipos de serviços de manutenção vocês oferecem?",
      answer: "Oferecemos manutenção preventiva e corretiva de instalações elétricas, sistemas hidráulicos, transformadores e postos de transformação. Nossos serviços incluem inspeções periódicas, testes de equipamentos, substituição de componentes desgastados e atendimento emergencial 24 horas para empresas com contrato de manutenção.",
    },
    {
      question: "Qual é o prazo médio para instalação de um posto de transformação?",
      answer: "O prazo varia de acordo com a complexidade do projeto, potência necessária e condições do local. Em média, uma instalação de PT pode levar de 30 a 60 dias, incluindo o projeto técnico, aprovação junto aos órgãos competentes, aquisição de equipamentos e instalação física. Projetos maiores podem requerer mais tempo.",
    },
    {
      question: "Vocês atendem apenas Luanda ou outras províncias também?",
      answer: "Estamos sediados em Luanda e atendemos toda a província. Para projetos de grande porte em outras províncias, realizamos uma avaliação prévia de viabilidade. Entre em contato conosco para discutir seu projeto específico e verificar nossa disponibilidade para atendimento em sua região.",
    },
    {
      question: "Como funciona o atendimento de emergência?",
      answer: "Para clientes com contrato de manutenção, oferecemos atendimento de emergência 24 horas, 7 dias por semana. Você pode acionar nossa equipe através do telefone de emergência ou WhatsApp. Nossa equipe técnica é mobilizada imediatamente para resolver problemas críticos de energia ou água que possam causar prejuízos ao seu negócio ou residência.",
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Aceitamos diversas formas de pagamento, incluindo transferência bancária, depósito, cheque e dinheiro. Para projetos de grande porte, oferecemos planos de pagamento flexíveis. Entre em contato conosco para discutir as melhores condições para seu projeto.",
    },
    {
      question: "Vocês fornecem garantia para os serviços realizados?",
      answer: "Sim, todos os nossos serviços possuem garantia. Para instalações elétricas e hidráulicas, oferecemos garantia de 12 meses contra defeitos de execução. Equipamentos fornecidos possuem garantia do fabricante. Além disso, oferecemos contratos de manutenção preventiva para garantir o funcionamento contínuo das suas instalações.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Left Column - Title */}
          <div className="lg:sticky lg:top-32 animate-slide-in-left">
            <SectionHeader
              badge="FAQ"
              title="Perguntas Frequentes"
              description="Encontre respostas para as dúvidas mais comuns sobre nossos serviços. 
              Não encontrou o que procura? Entre em contato conosco!"
              alignment="left"
            />
          </div>

          {/* Right Column - Accordion */}
          <div className="animate-slide-in-right">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-lg px-6 border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
