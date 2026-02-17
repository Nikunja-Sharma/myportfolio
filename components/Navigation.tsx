import React, { useState, useEffect } from 'react';

interface NavSection {
  id: string;
  label: string;
  ref: React.RefObject<HTMLElement>;
}

interface NavigationProps {
  sections: NavSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  sections, 
  activeSection, 
  onSectionClick 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg sm:text-xl font-heading font-bold tracking-tighter">
          NS<span className="text-primary">.</span>DEV
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-mono text-textMuted">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`hover:text-primary transition-colors ${
                activeSection === section.id ? 'text-primary' : ''
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Contact Button - Hidden on small screens, shown on medium+ */}
        <button 
          onClick={() => handleSectionClick('contact')}
          className="hidden md:block px-3 py-2 lg:px-4 border border-primary/50 text-primary text-xs font-mono uppercase tracking-widest hover:bg-primary/10 transition-colors"
        >
          Contact
        </button>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 relative z-50"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span 
            className={`block w-5 h-0.5 bg-textPrimary transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span 
            className={`block w-5 h-0.5 bg-textPrimary transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block w-5 h-0.5 bg-textPrimary transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed top-0 left-0 w-full bg-black transition-all duration-300 z-40 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} 
        style={{ 
          height: '100vh', 
          minHeight: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full min-h-screen space-y-8 px-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`text-xl font-mono hover:text-primary transition-colors ${
                activeSection === section.id ? 'text-primary' : 'text-textMuted'
              }`}
            >
              {section.label}
            </button>
          ))}
          <button 
            onClick={() => handleSectionClick('contact')}
            className="mt-8 px-6 py-3 border border-primary/50 text-primary text-sm font-mono uppercase tracking-widest hover:bg-primary/10 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};