import React from 'react';
import { PERSONAL_INFO } from '../constants';

export const About: React.FC = () => {
  const { name, title, summary, currentRole, location } = PERSONAL_INFO;

  return (
    <div className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="font-mono text-textMuted text-xs sm:text-sm tracking-[0.2em]">ABOUT</span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main About Content */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Professional Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary mb-4">
                  Hello, I'm {name}
                </h2>
                <p className="text-lg text-textSecondary mb-6 leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Current Role Highlight */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-textPrimary mb-2">
                      Currently at {currentRole.company}
                    </h3>
                    <p className="text-textSecondary mb-3">
                      {currentRole.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-textMuted">
                      <span className="font-mono">{currentRole.position}</span>
                      <span>•</span>
                      <span>{currentRole.startDate} - Present</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Highlights */}
              <div>
                <h3 className="text-xl font-semibold text-textPrimary mb-4">
                  Career Highlights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-textSecondary">
                      Developed AI-powered applications including mobile apps like MULTI LLM management 
                      and web platforms for event management with payment integration
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-textSecondary">
                      Built scalable distributed systems and production-grade architecture solutions 
                      for international multivendor OMS projects
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-textSecondary">
                      Specialized in modern web technologies including Next.js, React.js, Node.js, 
                      and cloud platforms like AWS
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-textSecondary">
                      Completed IoT-based final year project for automated poultry monitoring systems, 
                      demonstrating expertise in hardware-software integration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Touch Sidebar */}
            <div className="space-y-6">
              {/* Location & Availability */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h4 className="font-semibold text-textPrimary mb-4">Based in</h4>
                <p className="text-textSecondary mb-4">{location}</p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-textMuted">Available for opportunities</span>
                </div>
              </div>

              {/* Personal Interests */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h4 className="font-semibold text-textPrimary mb-4">When I'm not coding</h4>
                <div className="space-y-3 text-sm text-textSecondary">
                  <div className="flex items-center gap-2">
                    <span>🎯</span>
                    <span>Exploring new technologies and frameworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌱</span>
                    <span>Contributing to open-source projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📚</span>
                    <span>Learning about distributed systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🤖</span>
                    <span>Experimenting with AI/ML applications</span>
                  </div>
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h4 className="font-semibold text-textPrimary mb-4">My Approach</h4>
                <blockquote className="text-sm text-textSecondary italic leading-relaxed">
                  "I believe in building software that not only solves problems but creates 
                  meaningful experiences. Every line of code should serve a purpose, and every 
                  feature should add genuine value to users' lives."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};