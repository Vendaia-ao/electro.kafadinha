import { useState } from "react";
import { Building2, Home, Factory } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import TabButton from "@/components/ui/tab-button";
import ProjectCard from "@/components/ui/project-card";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { useData } from "@/contexts/DataContext";

const Projects = () => {
  const { projects, resolveImage } = useData();
  const [activeTab, setActiveTab] = useState("todos");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const tabs = [
    { id: "todos", label: "Todos", icon: Building2 },
    { id: "comercial", label: "Comercial", icon: Building2 },
    { id: "residencial", label: "Residencial", icon: Home },
    { id: "industrial", label: "Industrial", icon: Factory },
  ];

  // Filter projects by category and status
  const filteredProjects = projects
    .filter(p => p.status === 'published' && (activeTab === 'todos' || p.category === activeTab))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Nossos Projetos"
          title="Projetos realizados com excelência"
          description="Veja alguns dos nossos projetos mais recentes e descubra como podemos ajudar a sua empresa ou residência."
          alignment="center"
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-auto"
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject({
                ...project,
                image: resolveImage(project.imageUrl)
              })}
            >
              <ProjectCard
                image={resolveImage(project.imageUrl)}
                title={project.title}
                description={project.description}
                badge={project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                secondaryBadge={project.year}
                buttonText="Ver Projeto"
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
