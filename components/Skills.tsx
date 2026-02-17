import React, { useState } from 'react';
import { SkillCategory, Skill, Certification } from '../types';

interface SkillsProps {
  skillCategories: SkillCategory[];
  certifications: Certification[];
}

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  return (
    <div className="group bg-surface border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-textPrimary group-hover:text-primary transition-colors text-lg">
          {certification.name}
        </h4>
        {certification.credentialUrl && (
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label={`View ${certification.name} credential`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-textMuted font-mono">Issued by:</span>
          <span className="text-sm text-textPrimary font-medium">{certification.issuer}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-textMuted font-mono">Date:</span>
          <span className="text-sm text-textPrimary">{certification.issueDate}</span>
        </div>
        
        {certification.expiryDate && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-textMuted font-mono">Expires:</span>
            <span className="text-sm text-textPrimary">{certification.expiryDate}</span>
          </div>
        )}
      </div>
      
      {certification.credentialUrl && (
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-mono"
          >
            View Credential
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const getProficiencyColor = (proficiency: Skill['proficiency']) => {
    switch (proficiency) {
      case 'expert':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'beginner':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getProficiencyWidth = (proficiency: Skill['proficiency']) => {
    switch (proficiency) {
      case 'expert':
        return 'w-full';
      case 'advanced':
        return 'w-4/5';
      case 'intermediate':
        return 'w-3/5';
      case 'beginner':
        return 'w-2/5';
      default:
        return 'w-1/5';
    }
  };

  return (
    <div className="group bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-textPrimary group-hover:text-primary transition-colors">
          {skill.name}
        </h4>
        <span className="text-xs text-textMuted capitalize font-mono">
          {skill.proficiency}
        </span>
      </div>
      
      {/* Proficiency Bar */}
      <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-full ${getProficiencyColor(skill.proficiency)} ${getProficiencyWidth(skill.proficiency)} transition-all duration-500 group-hover:brightness-110`}
        />
      </div>
      
      {skill.yearsOfExperience && (
        <div className="mt-2 text-xs text-textMuted font-mono">
          {skill.yearsOfExperience}+ years
        </div>
      )}
    </div>
  );
};

interface SkillCategoryProps {
  category: SkillCategory;
  isVisible: boolean;
}

const SkillCategorySection: React.FC<SkillCategoryProps> = ({ category, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] flex-1 bg-border" />
        <h3 className="font-mono text-textMuted text-sm tracking-[0.2em] uppercase">
          {category.name}
        </h3>
        <div className="h-[1px] flex-1 bg-border" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {category.skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skillCategories, certifications }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProficiency, setSelectedProficiency] = useState<string>('all');

  // Get all unique proficiency levels
  const proficiencyLevels = Array.from(
    new Set(
      skillCategories.flatMap(category => 
        category.skills.map(skill => skill.proficiency)
      )
    )
  ).sort((a, b) => {
    const order: Skill['proficiency'][] = ['beginner', 'intermediate', 'advanced', 'expert'];
    return order.indexOf(a as Skill['proficiency']) - order.indexOf(b as Skill['proficiency']);
  });

  // Filter categories based on selected filters
  const filteredCategories = skillCategories.map(category => ({
    ...category,
    skills: category.skills.filter(skill => {
      const matchesProficiency = selectedProficiency === 'all' || skill.proficiency === selectedProficiency;
      return matchesProficiency;
    })
  })).filter(category => category.skills.length > 0);

  const shouldShowCategory = (categoryName: string) => {
    return selectedCategory === 'all' || selectedCategory === categoryName.toLowerCase();
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="font-mono text-textMuted text-sm tracking-[0.2em]">TECH_STACK</span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        {/* Filter Controls */}
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-xs sm:text-sm font-mono text-textMuted mb-3 tracking-wider">FILTER BY CATEGORY</h3>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface border border-border text-textMuted hover:border-primary/50 hover:text-primary'
                }`}
              >
                All
              </button>
              {skillCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 ${
                    selectedCategory === category.name.toLowerCase()
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-surface border border-border text-textMuted hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Proficiency Filter */}
          <div>
            <h3 className="text-xs sm:text-sm font-mono text-textMuted mb-3 tracking-wider">FILTER BY PROFICIENCY</h3>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={() => setSelectedProficiency('all')}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 ${
                  selectedProficiency === 'all'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface border border-border text-textMuted hover:border-primary/50 hover:text-primary'
                }`}
              >
                <span className="hidden sm:inline">All Levels</span>
                <span className="sm:hidden">All</span>
              </button>
              {proficiencyLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedProficiency(level)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-mono capitalize transition-all duration-300 ${
                    selectedProficiency === level
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-surface border border-border text-textMuted hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <SkillCategorySection
              key={category.name}
              category={category}
              isVisible={shouldShowCategory(category.name)}
            />
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-6 bg-surface border border-border rounded-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                {skillCategories.reduce((total, category) => total + category.skills.length, 0)}
              </div>
              <div className="text-xs sm:text-sm text-textMuted font-mono">Total Skills</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                {skillCategories.length}
              </div>
              <div className="text-xs sm:text-sm text-textMuted font-mono">Categories</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                {skillCategories.reduce((total, category) => 
                  total + category.skills.filter(skill => skill.proficiency === 'advanced' || skill.proficiency === 'expert').length, 0
                )}
              </div>
              <div className="text-xs sm:text-sm text-textMuted font-mono">Advanced+</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                {skillCategories.reduce((total, category) => 
                  total + category.skills.filter(skill => skill.proficiency === 'expert').length, 0
                )}
              </div>
              <div className="text-xs sm:text-sm text-textMuted font-mono">Expert Level</div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-border" />
            <span className="font-mono text-textMuted text-sm tracking-[0.2em]">CERTIFICATIONS</span>
            <div className="h-[1px] flex-1 bg-border" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((certification) => (
              <CertificationCard key={certification.id} certification={certification} />
            ))}
          </div>
          
          {/* Certifications Summary */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-surface border border-border rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                  {certifications.length}
                </div>
                <div className="text-xs sm:text-sm text-textMuted font-mono">Total Certifications</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                  {Array.from(new Set(certifications.map(cert => cert.issuer))).length}
                </div>
                <div className="text-xs sm:text-sm text-textMuted font-mono">Unique Issuers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                  {certifications.filter(cert => cert.credentialUrl).length}
                </div>
                <div className="text-xs sm:text-sm text-textMuted font-mono">With Credentials</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};