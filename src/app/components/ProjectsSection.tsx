import { useRef } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, Code2, Globe, Terminal } from "lucide-react";

interface Project {
  title: string;
  description: string;
  stack: string[];
  type: "code" | "geo" | "terminal";
  github?: string;
  live?: string;
  year: string;
}

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: "CLM Plugin",
      description:
        "A powerful Claude Language Model integration plugin for seamless AI-powered development workflows. Enables developers to leverage Claude's capabilities directly in their development environment.",
      stack: ["Python", "Claude API", "PyPI", "REST"],
      type: "code",
      github: "https://github.com/ragularumugam",
      year: "2025",
    },
    {
      title: "OreWatcher",
      description:
        "Advanced geospatial monitoring system for tracking mineral deposits and geological formations. Uses real-time data processing and visualization for resource management.",
      stack: ["Python", "GeoPandas", "AWS S3", "Mapbox", "PostgreSQL"],
      type: "geo",
      github: "https://github.com/ragularumugam",
      live: "https://orewatcher.example.com",
      year: "2025",
    },
    {
      title: "Forge",
      description:
        "A comprehensive development toolkit and CLI framework for rapid prototyping and deployment. Streamlines the development workflow with automated build processes.",
      stack: ["Node.js", "TypeScript", "Commander.js", "Docker"],
      type: "terminal",
      github: "https://github.com/ragularumugam",
      year: "2024",
    },
    {
      title: "CMD Suite",
      description:
        "Terminal-based command management system with advanced scripting capabilities. Provides a unified interface for complex system operations and automation.",
      stack: ["Python", "Click", "Shell", "YAML"],
      type: "terminal",
      github: "https://github.com/ragularumugam",
      year: "2024",
    },
  ];

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code2 className="w-12 h-12" />;
      case "geo":
        return <Globe className="w-12 h-12" />;
      case "terminal":
        return <Terminal className="w-12 h-12" />;
      default:
        return <Code2 className="w-12 h-12" />;
    }
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-8 md:px-16 lg:px-24 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-[#4682B4]">[02]</span>
            <div className="h-[1px] flex-1 bg-[#121212]/20" />
          </div>
          <h2 className="text-5xl md:text-6xl font-[900] tracking-tight text-[#121212]">
            THE CASE STUDY<br />VAULT
          </h2>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-track-[#F5F5F5] scrollbar-thumb-[#121212]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#121212 #F5F5F5",
            }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex-shrink-0 w-[400px] snap-start group"
              >
                <div className="h-full border-2 border-[#121212] bg-[#F5F5F5] hover:shadow-[12px_12px_0px_0px_rgba(18,18,18,1)] transition-all duration-300">
                  {/* Project Card Header */}
                  <div
                    className={`p-6 border-b-2 border-[#121212] ${
                      project.type === "code"
                        ? "bg-white"
                        : project.type === "geo"
                        ? "bg-gradient-to-br from-[#4682B4]/10 to-[#2F4F4F]/10"
                        : "bg-[#121212] text-[#F5F5F5]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={project.type === "terminal" ? "text-[#4682B4]" : "text-[#121212]"}
                      >
                        {getProjectIcon(project.type)}
                      </div>
                      <span className="font-mono text-xs opacity-50">{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-[700] mb-2">{project.title}</h3>
                  </div>

                  {/* Project Card Body */}
                  <div className="p-6 space-y-6">
                    <p className="text-sm leading-relaxed text-[#121212]/70">{project.description}</p>

                    {/* Technical Specs Footer */}
                    <div>
                      <div className="font-mono text-xs text-[#4682B4] mb-3 tracking-wider">
                        TECHNICAL_SPECS
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 border border-[#121212] font-mono text-xs bg-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4 border-t border-[#121212]/20">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[#121212] hover:text-[#4682B4] transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span className="font-mono">Source</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[#121212] hover:text-[#4682B4] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-mono">Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center gap-4 justify-center"
          >
            <div className="h-[1px] w-12 bg-[#121212]/20" />
            <span className="font-mono text-xs text-[#121212]/50">SCROLL HORIZONTAL →</span>
            <div className="h-[1px] w-12 bg-[#121212]/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
