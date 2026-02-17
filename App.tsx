import React from 'react';
import { Hero } from './components/Hero';
import { ProjectSection } from './components/ProjectSection';
import { ChatWidget } from './components/ChatWidget';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans antialiased selection:bg-primary/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50 h-16 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-heading font-bold tracking-tighter">
            NS<span className="text-primary">.</span>DEV
          </div>
          <div className="hidden md:flex gap-8 text-sm font-mono text-textMuted">
            <a href="#" className="hover:text-primary transition-colors">Architecture</a>
            <a href="#" className="hover:text-primary transition-colors">Stack</a>
            <a href="#" className="hover:text-primary transition-colors">Resume</a>
          </div>
          <button className="px-4 py-2 border border-primary/50 text-primary text-xs font-mono uppercase tracking-widest hover:bg-primary/10 transition-colors">
            Contact
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        
        <div className="relative">
          <div className="sticky top-0 h-1 w-full bg-gradient-to-r from-background via-primary to-background z-40 opacity-50" />
          
          <div className="container mx-auto px-6 py-20">
             <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="font-mono text-textMuted text-sm tracking-[0.2em]">SELECTED_WORKS</span>
                <div className="h-[1px] flex-1 bg-border" />
             </div>
          </div>

          {PROJECTS.map((project, index) => (
            <ProjectSection key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer */}
        <footer className="py-20 border-t border-border bg-surface text-center">
          <div className="container mx-auto px-6">
            <p className="text-textMuted text-sm font-mono">
              &copy; {new Date().getFullYear()} Nikunja Sarma. Built with React & Tailwind.
            </p>
            <p className="text-textMuted/50 text-xs mt-2">
              System Status: <span className="text-green-500">OPERATIONAL</span>
            </p>
          </div>
        </footer>
      </main>
      
      <ChatWidget />
    </div>
  );
};

export default App;
