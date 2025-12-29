import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="sobre">
        <About />
      </div>
      <div id="servicos">
        <Services />
      </div>
      <div id="projetos">
        <Projects />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <Testimonials />
      <FAQ />
      <div id="contato">
        <Contact />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
