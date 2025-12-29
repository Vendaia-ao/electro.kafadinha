import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { useData } from "@/contexts/DataContext";

const Blog = () => {
  const { blogPosts, resolveImage } = useData();
  
  // Get the first 6 published posts
  const posts = blogPosts
    .filter(p => p.status === 'published')
    .slice(0, 6);

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          badge="Blog & Notícias"
          title="Fique por dentro das novidades"
          description="Acompanhe as últimas notícias, dicas e atualizações do setor elétrico e hídrico."
          alignment="center"
        />

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={resolveImage(post.imageUrl)}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 gradient-energy text-primary-foreground text-xs font-semibold rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {post.author}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <Link to={`/blog/${post.slug}`}>
                  <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                    <span className="text-primary font-semibold">Saiba Mais</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="hero" size="lg">
              Ver Todas as Notícias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
