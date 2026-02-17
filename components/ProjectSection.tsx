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
    <section className="py-24 border-b border-border relative overflow-hidden group">
      <div className="absolute inset-0 bg-background opacity-90 z-0" />
      <div className="grid-bg absolute inset-0 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className={`flex flex-col lg:flex-row gap-16 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Content Side */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary font-mono text-sm tracking-wider">
                <span className="text-secondary">0{index + 1}</span>
                <span>// SYSTEM_ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-textPrimary uppercase leading-tight">
                {project.title}
              </h2>
              <p className="text-textMuted text-lg leading-relaxed border-l-2 border-secondary pl-6">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-mono text-textPrimary border-b border-border pb-2 inline-block">CORE COMPONENTS</h3>
              <ul className="grid grid-cols-1 gap-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-textMuted text-sm">
                    <Check className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-surface border border-border rounded text-xs font-mono text-primary hover:border-primary transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="flex-1 w-full space-y-6">
            {/* Diagram Card */}
            <div className="w-full aspect-[16/9] bg-surface border border-border rounded-lg relative overflow-hidden shadow-2xl group-hover:border-primary/50 transition-colors duration-500">
               <div className="absolute top-2 left-4 text-[10px] font-mono text-textMuted flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
               </div>
               <div className="w-full h-full p-8 pt-12">
                  <DiagramWrapper type={project.diagramType} />
               </div>
            </div>

            {/* Metrics or Code Snippet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.metrics && (
                <div className="bg-surface/50 border border-border p-4 rounded-lg">
                   <div className="text-xs font-mono text-textMuted mb-3">PERFORMANCE_METRICS</div>
                   <div className="flex justify-between items-end">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                          <div className="text-2xl font-heading font-bold text-white">{m.value}</div>
                          <div className="text-[10px] font-mono text-primary">{m.unit} {m.name}</div>
                        </div>
                      ))}
                   </div>
                   {/* Mini Chart for first item only */}
                   {index === 0 && <MetricsChart />}
                </div>
              )}
              
              {project.codeSnippet && (
                <div className={`${project.metrics ? 'md:col-span-1' : 'md:col-span-2'} bg-[#0d1117] border border-border rounded-lg p-4 font-mono text-xs overflow-hidden relative`}>
                  <div className="absolute top-0 right-0 p-2 text-textMuted">
                    <Code2 size={14} />
                  </div>
                  <div className="text-secondary mb-2 border-b border-border pb-1 w-fit">consumer.ts</div>
                  <pre className="text-gray-300 overflow-x-auto">
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
