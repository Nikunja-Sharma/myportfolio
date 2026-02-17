import React from 'react';
import { Project } from '../types';

interface ProjectFilterProps {
  projects: Project[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  projects,
  selectedCategory,
  onCategoryChange
}) => {
  // Get unique categories from projects
  const uniqueCategories = projects.map(p => p.category);
  const categories = ['all', ...Array.from(new Set(uniqueCategories))];
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all': return 'All Projects';
      case 'web': return 'Web Apps';
      case 'mobile': return 'Mobile Apps';
      case 'iot': return 'IoT Systems';
      case 'ai': return 'AI/ML';
      case 'cli': return 'CLI Tools';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const getProjectCount = (category: string) => {
    if (category === 'all') return projects.length;
    return projects.filter(p => p.category === category).length;
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
      {categories.map((category: string) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-300 border ${
            selectedCategory === category
              ? 'bg-primary text-background border-primary shadow-lg'
              : 'bg-surface text-textMuted border-border hover:border-primary hover:text-primary'
          }`}
        >
          <span className="hidden sm:inline">{getCategoryLabel(category)}</span>
          <span className="sm:hidden">
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          <span className="ml-1 sm:ml-2 text-xs opacity-70">
            ({getProjectCount(category)})
          </span>
        </button>
      ))}
    </div>
  );
};