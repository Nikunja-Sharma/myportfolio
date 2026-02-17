import React from 'react';
import { ArrowDown, Terminal } from 'lucide-react';
import { PORTFOLIO_OWNER, HEADLINE, SUBHEADLINE } from '../constants';
import { SocialMediaLinks } from './SocialMediaLinks';

export interface HeroProps {
  onNavigateToArchitecture?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToArchitecture }) => {
  const handleViewSystemDesigns = () => {
    if (onNavigateToArchitecture) {
      onNavigateToArchitecture();
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background z-0">
        <div className="grid-bg w-full h-full absolute inset-0" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10 relative max-w-5xl">
        <div className="flex flex-col gap-6 sm:gap-8 text-center sm:text-left">
          {/* Top Tag */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-primary/80 font-mono text-xs sm:text-sm animate-pulse-slow">
            <Terminal size={14} />
            <span>v2.4.0_PRODUCTION_READY</span>
          </div>

          {/* Headlines */}
          <div className="space-y-3 sm:space-y-4">
             <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-textPrimary leading-tight tracking-tight">
              {PORTFOLIO_OWNER}
              <span className="text-primary">.</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-textMuted max-w-3xl leading-snug mx-auto sm:mx-0">
              {HEADLINE}
            </h2>
            <p className="text-base sm:text-lg text-textMuted/80 font-sans max-w-2xl leading-relaxed border-l-4 border-secondary pl-4 sm:pl-6 py-1 mx-auto sm:mx-0">
              {SUBHEADLINE}
            </p>
          </div>

          {/* Stack Line */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-primary/70 pt-2 sm:pt-4">
            <span>Next.js</span>
            <span className="hidden sm:inline">•</span>
            <span>NestJS</span>
            <span className="hidden sm:inline">•</span>
            <span>Kafka</span>
            <span className="hidden sm:inline">•</span>
            <span>Redis</span>
            <span className="hidden sm:inline">•</span>
            <span>BullMQ</span>
            <span className="hidden sm:inline">•</span>
            <span>AWS</span>
            <span className="hidden sm:inline">•</span>
            <span>OIDC</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8 items-center sm:items-start">
            <button
              onClick={handleViewSystemDesigns}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background font-bold font-mono uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              <span className="hidden sm:inline">View System Designs</span>
              <span className="sm:hidden">View Designs</span>
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <div className="flex justify-center sm:justify-start">
              <SocialMediaLinks size="md" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-textMuted/30 animate-bounce hidden md:block">
        <ArrowDown size={24} />
      </div>
    </div>
  );
};