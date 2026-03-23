import { ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/lib/config";
import projectClothing from "@/assets/project-clothing.jpg";
import projectPet from "@/assets/project-pet.jpg";
import projectStudent from "@/assets/project-student.jpg";

// Map config data with actual images
const projectImages: { [key: number]: string } = {
  0: projectClothing,
  1: projectPet,
  2: projectStudent,
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <h2 className="font-display text-3xl font-bold mb-2 text-center">
          <span className="gradient-text">Dự án</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 font-display text-sm">Projects</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <div
              key={i}
              className="rounded-xl bg-card border border-border overflow-hidden card-hover group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={projectImages[i] || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.demo !== "#" && (
                    <a href={project.demo} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-80 transition-opacity">
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.github !== "#" && (
                    <a href={project.github} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-80 transition-opacity">
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-display text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
