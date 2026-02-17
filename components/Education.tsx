import React, { useState } from 'react';
import { Education } from '../types';
import { EDUCATION } from '../constants';
import { ChevronDown, ChevronUp, Calendar, MapPin, GraduationCap, School } from 'lucide-react';

interface EducationProps {
  education?: Education[];
}

interface TimelineItemProps {
  education: Education;
  index: number;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ education, index, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDateRange = (startDate: string, endDate?: string) => {
    return `${startDate} - ${endDate || 'Present'}`;
  };

  return (
    <div className="relative flex gap-4 sm:gap-6 group">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-2 sm:border-4 border-background shadow-lg z-10 group-hover:scale-110 transition-transform" />
        {!isLast && (
          <div className="w-0.5 h-full bg-border group-hover:bg-primary/30 transition-colors mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 sm:pb-12">
        <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
          {/* Header */}
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-textPrimary">
                  {education.degree}
                </h3>
                <div className="flex items-center gap-2 text-primary font-mono text-xs sm:text-sm mt-1">
                  <School size={12} sm:size={14} />
                  <span>{education.institution}</span>
                </div>
              </div>
              <div className="text-left sm:text-right text-xs sm:text-sm text-textMuted">
                <div className="flex items-center gap-1 sm:justify-end">
                  <Calendar size={12} sm:size={14} />
                  <span className="font-mono">{formatDateRange(education.startDate, education.endDate)}</span>
                </div>
                <div className="flex items-center gap-1 sm:justify-end mt-1">
                  <MapPin size={12} sm:size={14} />
                  <span>{education.location}</span>
                </div>
              </div>
            </div>

            {education.specialization && (
              <p className="text-sm sm:text-base text-textMuted leading-relaxed border-l-2 border-secondary pl-3 sm:pl-4">
                Specialization: {education.specialization}
              </p>
            )}
          </div>

          {/* Expandable Details */}
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs sm:text-sm font-mono text-textMuted hover:text-primary transition-colors mb-2 sm:mb-3"
            >
              <span className="uppercase tracking-wider">Details</span>
              {isExpanded ? <ChevronUp size={12} sm:size={14} /> : <ChevronDown size={12} sm:size={14} />}
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-2 sm:space-y-3 text-textMuted text-xs sm:text-sm">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                  <span><strong>Institution:</strong> {education.institution}</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                  <span><strong>Location:</strong> {education.location}</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                  <span><strong>Duration:</strong> {formatDateRange(education.startDate, education.endDate)}</span>
                </div>
                {education.specialization && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span><strong>Specialization:</strong> {education.specialization}</span>
                  </div>
                )}
                {education.gpa && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span><strong>GPA:</strong> {education.gpa}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EducationTimeline: React.FC<EducationProps> = ({ 
  education = EDUCATION 
}) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background z-0">
        <div className="grid-bg w-full h-full absolute inset-0 opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-primary font-mono text-xs sm:text-sm tracking-wider mb-3 sm:mb-4">
            <span className="text-secondary">03</span>
            <span className="hidden sm:inline">// EDUCATION_TIMELINE</span>
            <span className="sm:hidden">// EDUCATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-textPrimary uppercase leading-tight mb-3 sm:mb-4">
            Education
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-textMuted leading-relaxed max-w-2xl mx-auto">
            Academic journey and formal education in computer applications
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {education.map((edu, index) => (
            <TimelineItem
              key={edu.id}
              education={edu}
              index={index}
              isLast={index === education.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};