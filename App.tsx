import React, { useRef, useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectSection } from './components/ProjectSection';
import { ProjectFilter } from './components/ProjectFilter';
import { WorkExperienceTimeline } from './components/WorkExperience';
import { EducationTimeline } from './components/Education';
import { Skills } from './components/Skills';
import { ChatWidget } from './components/ChatWidget';
import { Navigation } from './components/Navigation';
import { Contact } from './components/Contact';
import { ResumeHandler } from './components/ResumeHandler';
import { SocialMediaLinks } from './components/SocialMediaLinks';
import { useNavigation } from './hooks/useNavigation';
import { PROJECTS, SKILLS, CERTIFICATIONS } from './constants';
import { ContactFormData } from './types';
import { initializeEmailService } from './services/emailService';

const App: React.FC = () => {
  const { activeSection, sections, handleSectionClick, registerSection } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Create refs for each section
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const architectureRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === selectedCategory);

  // Handle contact form submission (now handled by Contact component internally)
  const handleContactSubmit = async (data: ContactFormData) => {
    // This function is no longer used as Contact component handles email service directly
    // Kept for interface compatibility
    console.log('Contact form submitted via legacy handler:', data);
  };

  // Initialize email service and register sections with navigation
  useEffect(() => {
    // Initialize EmailJS service
    initializeEmailService();
    
    // Register navigation sections
    registerSection('hero', 'Home', heroRef);
    registerSection('about', 'About', aboutRef);
    registerSection('architecture', 'Architecture', architectureRef);
    registerSection('experience', 'Experience', experienceRef);
    registerSection('education', 'Education', educationRef);
    registerSection('stack', 'Stack', stackRef);
    registerSection('resume', 'Resume', resumeRef);
    registerSection('contact', 'Contact', contactRef);
  }, [registerSection]);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans antialiased selection:bg-primary/30 selection:text-white">
      {/* Enhanced Navigation */}
      <Navigation 
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <main>
        {/* Hero Section */}
        <section id="hero" ref={heroRef}>
          <Hero onNavigateToArchitecture={() => handleSectionClick('architecture')} />
        </section>
        
        {/* About Section */}
        <section id="about" ref={aboutRef}>
          <About />
        </section>
        
        <div className="relative">
          <div className="sticky top-0 h-1 w-full bg-gradient-to-r from-background via-primary to-background z-40 opacity-50" />
          
          {/* Architecture Section */}
          <section id="architecture" ref={architectureRef} className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
             <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="font-mono text-textMuted text-xs sm:text-sm tracking-[0.2em]">SELECTED_WORKS</span>
                <div className="h-[1px] flex-1 bg-border" />
             </div>
             
             {/* Project Category Filter */}
             <ProjectFilter 
               projects={PROJECTS}
               selectedCategory={selectedCategory}
               onCategoryChange={setSelectedCategory}
             />
          </section>

          {filteredProjects.map((project, index) => (
            <ProjectSection key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Experience Section */}
        <section id="experience" ref={experienceRef}>
          <WorkExperienceTimeline />
        </section>

        {/* Education Section */}
        <section id="education" ref={educationRef}>
          <EducationTimeline />
        </section>

        {/* Stack Section */}
        <section id="stack" ref={stackRef}>
          <Skills skillCategories={SKILLS} certifications={CERTIFICATIONS} />
        </section>

        {/* Resume Section */}
        <section id="resume" ref={resumeRef} className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div className="h-[1px] flex-1 bg-border" />
              <span className="font-mono text-textMuted text-xs sm:text-sm tracking-[0.2em]">RESUME</span>
              <div className="h-[1px] flex-1 bg-border" />
            </div>
            <div className="flex justify-center">
              <ResumeHandler />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef}>
          <Contact onSubmit={handleContactSubmit} />
        </section>

        {/* Footer */}
        <footer className="py-16 sm:py-20 border-t border-border bg-surface text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              {/* Social Media Links */}
              <SocialMediaLinks size="sm" className="justify-center" />
              
              {/* Copyright */}
              <p className="text-textMuted text-xs sm:text-sm font-mono">
                &copy; {new Date().getFullYear()} Nikunja Sarma. Built with React & Tailwind.
              </p>
              <p className="text-textMuted/50 text-xs mt-1 sm:mt-2">
                System Status: <span className="text-green-500">OPERATIONAL</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
      
      <ChatWidget />
    </div>
  );
};

export default App;
