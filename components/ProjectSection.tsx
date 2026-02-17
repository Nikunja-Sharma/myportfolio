import React from 'react';
import { Project } from '../types';
import { MarketplaceDiagram, OMSDiagram, AuthDiagram, AiDiagram, CicdDiagram } from './diagrams/ArchitectureDiagrams';
import { Check, Code2, Terminal } from 'lucide-react';
import { MetricsChart } from './Visuals/MetricsChart';

interface ProjectSectionProps {
  project: Project;
  index: number;
}

const DiagramWrapper = ({ type }: { type: string }) => {
  switch (type) {
    case 'marketplace': return <MarketplaceDiagram />;
    case 'oms': return <OMSDiagram />;
    case 'auth': return <AuthDiagram />;
    case 'ai': return <AiDiagram />;
    case 'cicd': return <CicdDiagram />;
    default: return null;
  }
};

export const ProjectSection: React.FC<ProjectSectionProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border relative overflow-hidden group">
      <div className="absolute inset-0 bg-background opacity-90 z-0" />
      <div className="grid-bg absolute inset-0 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className={`flex flex-col ${!isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 sm:gap-12 lg:gap-16 items-start`}>
          
          {/* Content Side */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-primary font-mono text-xs sm:text-sm tracking-wider">
                <span className="text-secondary">0{index + 1}</span>
                <span className="hidden sm:inline">// SYSTEM_ARCHITECTURE</span>
                <span className="sm:hidden">// SYSTEM</span>
                <span className="text-xs bg-surface border border-border px-2 py-1 rounded uppercase">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs bg-primary/20 border border-primary px-2 py-1 rounded text-primary uppercase">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-textPrimary uppercase leading-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-textMuted leading-relaxed border-l-2 border-secondary pl-4 sm:pl-6">
                {project.description}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-mono text-textPrimary border-b border-border pb-2 inline-block">CORE COMPONENTS</h3>
              <ul className="grid grid-cols-1 gap-2 sm:gap-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3 text-textMuted text-xs sm:text-sm">
                    <Check className="text-primary mt-0.5 flex-shrink-0" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack Visualization */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-mono text-textPrimary border-b border-border pb-2 inline-block">TECH STACK</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-2 sm:px-3 py-1 bg-surface border border-border rounded text-xs font-mono text-primary hover:border-primary transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            {/* {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-surface border border-border rounded hover:border-primary transition-colors text-xs sm:text-sm font-mono text-textPrimary"
                  >
                    <Code2 size={14} />
                    View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-primary/10 border border-primary rounded hover:bg-primary/20 transition-colors text-xs sm:text-sm font-mono text-primary"
                  >
                    <Terminal size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            )} */}
          </div>

          {/* Visual Side */}
          <div className="flex-1 w-full space-y-4 sm:space-y-6">
            {/* Project Image or Diagram Card */}
            <div className="w-full aspect-[16/9] bg-surface border border-border rounded-lg relative overflow-hidden shadow-2xl group-hover:border-primary/50 transition-colors duration-500">
               <div className="absolute top-2 left-2 sm:left-4 text-[10px] font-mono text-textMuted flex gap-1 sm:gap-2 z-10">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
               </div>
               
               {/* Project Image with Fallback */}
               {project.imageUrl ? (
                 <div className="w-full h-full relative">
                   <img
                     src={project.imageUrl}
                     alt={`${project.title} screenshot`}
                     className="w-full h-full object-cover"
                     onError={(e) => {
                       // Fallback to diagram if image fails to load
                       const target = e.target as HTMLImageElement;
                       target.style.display = 'none';
                       const fallback = target.nextElementSibling as HTMLElement;
                       if (fallback) fallback.style.display = 'block';
                     }}
                   />
                   <div className="w-full h-full p-4 sm:p-6 lg:p-8 pt-8 sm:pt-12 hidden">
                     <DiagramWrapper type={project.diagramType} />
                   </div>
                 </div>
               ) : (
                 <div className="w-full h-full p-4 sm:p-6 lg:p-8 pt-8 sm:pt-12">
                   <DiagramWrapper type={project.diagramType} />
                 </div>
               )}
            </div>

            {/* Metrics or Code Snippet */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {project.metrics && (
                <div className="bg-surface/50 border border-border p-3 sm:p-4 rounded-lg">
                   <div className="text-xs font-mono text-textMuted mb-2 sm:mb-3">PERFORMANCE_METRICS</div>
                   <div className="flex justify-between items-end">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                          <div className="text-lg sm:text-2xl font-heading font-bold text-white">{m.value}</div>
                          <div className="text-[10px] font-mono text-primary">{m.unit} {m.name}</div>
                        </div>
                      ))}
                   </div>
                   {/* Mini Chart for first item only */}
                   {index === 0 && <MetricsChart />}
                </div>
              )}
              
              {project.codeSnippet && (
                <div className={`${project.metrics ? 'lg:col-span-1' : 'lg:col-span-2'} bg-[#0d1117] border border-border rounded-lg p-3 sm:p-4 font-mono text-xs overflow-hidden relative`}>
                  <div className="absolute top-0 right-0 p-2 text-textMuted">
                    <Code2 size={12} />
                  </div>
                  <div className="text-secondary mb-2 border-b border-border pb-1 w-fit text-xs">consumer.ts</div>
                  <pre className="text-gray-300 overflow-x-auto text-xs">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};