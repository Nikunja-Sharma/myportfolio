import { useState, useEffect, useRef, RefObject } from 'react';

interface NavSection {
  id: string;
  label: string;
  ref: RefObject<HTMLElement>;
}

interface UseNavigationReturn {
  activeSection: string;
  sections: NavSection[];
  handleSectionClick: (sectionId: string) => void;
  registerSection: (id: string, label: string, ref: RefObject<HTMLElement>) => void;
}

export const useNavigation = (): UseNavigationReturn => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [sections, setSections] = useState<NavSection[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Register a section for navigation
  const registerSection = (id: string, label: string, ref: RefObject<HTMLElement>) => {
    setSections(prev => {
      const existing = prev.find(section => section.id === id);
      if (existing) {
        return prev.map(section => 
          section.id === id ? { id, label, ref } : section
        );
      }
      return [...prev, { id, label, ref }];
    });
  };

  // Smooth scroll to section
  const handleSectionClick = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.ref.current) {
      setIsScrolling(true);
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Calculate scroll position with offset for fixed header
      const headerOffset = 80; // Account for fixed navigation height
      const elementPosition = section.ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Smooth scroll to target position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Set active section immediately for better UX
      setActiveSection(sectionId);

      // Reset scrolling state after animation completes
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  // Intersection Observer for active section detection
  useEffect(() => {
    if (sections.length === 0 || isScrolling) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return; // Don't update during programmatic scrolling

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && sections.some(s => s.id === sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all registered sections
    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, isScrolling]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeSection,
    sections,
    handleSectionClick,
    registerSection
  };
};