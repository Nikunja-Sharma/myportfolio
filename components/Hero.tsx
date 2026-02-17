import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { PORTFOLIO_OWNER, HEADLINE, SUBHEADLINE } from '../constants';

export const Hero = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background z-0">
        <div className="grid-bg w-full h-full absolute inset-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-6 z-10 relative max-w-5xl">
        <div className="flex flex-col gap-8">
          {/* Top Tag */}
          <div className="flex items-center gap-2 text-primary/80 font-mono text-sm animate-pulse-slow">
            <Terminal size={14} />
            <span>v2.4.0_PRODUCTION_READY</span>
          </div>

          {/* Headlines */}
          <div className="space-y-4">
             <h1 className="text-6xl md:text-8xl font-heading font-bold text-textPrimary leading-tight tracking-tight">
              {PORTFOLIO_OWNER}
              <span className="text-primary">.</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-textMuted max-w-3xl leading-snug">
              {HEADLINE}
            </h2>
            <p className="text-lg text-textMuted/80 font-sans max-w-2xl leading-relaxed border-l-4 border-secondary pl-6 py-1">
              {SUBHEADLINE}
            </p>
          </div>

          {/* Stack Line */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-primary/70 pt-4">
            <span>Next.js</span>
            <span>•</span>
            <span>NestJS</span>
            <span>•</span>
            <span>Kafka</span>
            <span>•</span>
            <span>Redis</span>
            <span>•</span>
            <span>BullMQ</span>
            <span>•</span>
            <span>AWS</span>
            <span>•</span>
            <span>OIDC</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button className="px-8 py-4 bg-primary text-background font-bold font-mono uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 group">
              View System Designs
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <div className="flex gap-4 items-center">
              <button className="p-4 border border-border rounded-full hover:border-primary hover:text-primary text-textMuted transition-all">
                <Github size={20} />
              </button>
              <button className="p-4 border border-border rounded-full hover:border-primary hover:text-primary text-textMuted transition-all">
                <Linkedin size={20} />
              </button>
              <button className="p-4 border border-border rounded-full hover:border-primary hover:text-primary text-textMuted transition-all">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-textMuted/30 animate-bounce hidden md:block">
        <ArrowDown size={24} />
      </div>
    </div>
  );
};
