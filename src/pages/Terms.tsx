import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
              Termos de Serviço
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <p className="text-muted-foreground">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>

              <section>
                <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao contratar os serviços da Electro Kafadinha, LDA, você concorda com estes Termos de Serviço. Se não concordar com qualquer parte destes termos, por favor, não utilize nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Serviços Oferecidos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A Electro Kafadinha oferece os seguintes serviços:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Distribuição de energia elétrica através de redes privadas</li>
                  <li>Distribuição de água como agente autorizado EPAL-EP</li>
                  <li>Instalação e manutenção de sistemas elétricos</li>
                  <li>Instalação de postos de transformação (PTs)</li>
                  <li>Serviços de canalização e manutenção</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Obrigações do Cliente</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O cliente compromete-se a:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Fornecer informações precisas e completas</li>
                  <li>Efetuar pagamentos dentro dos prazos estabelecidos</li>
                  <li>Permitir acesso às instalações para manutenção e leituras</li>
                  <li>Utilizar os serviços de forma adequada e legal</li>
                  <li>Notificar imediatamente sobre qualquer problema ou irregularidade</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Faturamento e Pagamento</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As faturas são emitidas mensalmente e devem ser pagas até a data de vencimento indicada. O não pagamento pode resultar na suspensão temporária dos serviços e na aplicação de juros de mora conforme a legislação angolana.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Manutenção e Interrupções</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Electro Kafadinha reserva-se o direito de realizar manutenções programadas ou emergenciais que possam resultar em interrupções temporárias dos serviços. Sempre que possível, os clientes serão notificados com antecedência.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Responsabilidade</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A empresa não se responsabiliza por danos causados por uso inadequado das instalações, eventos de força maior, ou problemas originados nas instalações internas do cliente após o ponto de entrega.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Rescisão de Contrato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  O cliente pode solicitar o cancelamento dos serviços mediante aviso prévio de 30 dias. A empresa pode rescindir o contrato em caso de inadimplência, uso irregular ou violação destes termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Modificações aos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Electro Kafadinha reserva-se o direito de modificar estes Termos de Serviço a qualquer momento. Os clientes serão notificados sobre alterações significativas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Lei Aplicável</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estes termos são regidos pelas leis da República de Angola. Quaisquer disputas serão resolvidas nos tribunais competentes de Luanda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para questões sobre estes Termos de Serviço, entre em contato conosco através dos canais disponíveis em nossa seção de contato.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Terms;
