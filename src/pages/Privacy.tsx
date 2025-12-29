import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
              Política de Privacidade
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <p className="text-muted-foreground">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>

              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Electro Kafadinha, LDA ("nós", "nosso" ou "empresa") está comprometida com a proteção e privacidade dos dados pessoais de nossos clientes, parceiros e visitantes do nosso website. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Informações que Coletamos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Podemos coletar as seguintes informações:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Nome completo e informações de contato (endereço, telefone, email)</li>
                  <li>Informações sobre serviços contratados</li>
                  <li>Dados de faturamento e pagamento</li>
                  <li>Informações técnicas sobre instalações elétricas e hidráulicas</li>
                  <li>Correspondências e comunicações com nossa equipe</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Como Usamos Suas Informações</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Fornecer e gerenciar nossos serviços de eletricidade e água</li>
                  <li>Processar pagamentos e emitir faturas</li>
                  <li>Comunicar sobre serviços, manutenções e atualizações</li>
                  <li>Melhorar nossos serviços e atendimento ao cliente</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Compartilhamento de Informações</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços (por exemplo, com a EPAL-EP para serviços de água) ou quando exigido por lei.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Segurança de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Seus Direitos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Você tem o direito de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações incorretas ou incompletas</li>
                  <li>Solicitar a exclusão de seus dados (sujeito a obrigações legais)</li>
                  <li>Opor-se ao processamento de seus dados</li>
                  <li>Retirar seu consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para questões sobre esta Política de Privacidade ou para exercer seus direitos, entre em contato conosco através dos canais disponíveis em nossa seção de contato.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Alterações a Esta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas através de nosso website ou por email.
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

export default Privacy;
