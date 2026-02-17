import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, AlertCircle } from 'lucide-react';
import { SOCIAL_MEDIA_LINKS } from '../constants';

interface SocialMediaLinksProps {
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap = {
  Github,
  Linkedin,
  Mail
};

const sizeClasses = {
  sm: 'p-1.5 sm:p-2',
  md: 'p-2 sm:p-3 lg:p-4',
  lg: 'p-3 sm:p-4 lg:p-6'
};

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 22
};

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  className = '', 
  showLabels = false,
  size = 'md'
}) => {
  const [linkErrors, setLinkErrors] = useState<Set<string>>(new Set());

  const handleLinkClick = (platform: string, url: string, label: string) => {
    try {
      // Check if link is available
      const linkData = Object.values(SOCIAL_MEDIA_LINKS).find(link => link.platform === platform);
      if (!linkData?.available) {
        console.warn(`${label} is currently unavailable`);
        setLinkErrors(prev => new Set([...prev, platform]));
        return;
      }

      // For email links, use window.location.href to handle mailto
      if (url.startsWith('mailto:')) {
        window.location.href = url;
        return;
      }

      // For external links, open in new tab with security measures
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      // Handle popup blockers or other issues
      if (!newWindow) {
        console.warn(`Failed to open ${label}. Please check your popup blocker settings.`);
        setLinkErrors(prev => new Set([...prev, platform]));
        // Fallback: try to navigate in current tab
        window.location.href = url;
      }
    } catch (error) {
      console.error(`Error opening ${label}:`, error);
      setLinkErrors(prev => new Set([...prev, platform]));
    }
  };

  const renderSocialLink = (linkData: typeof SOCIAL_MEDIA_LINKS.github) => {
    const IconComponent = iconMap[linkData.icon as keyof typeof iconMap];
    const hasError = linkErrors.has(linkData.platform);
    const isUnavailable = !linkData.available;

    return (
      <div key={linkData.platform} className="relative group">
        <button
          onClick={() => handleLinkClick(linkData.platform, linkData.url, linkData.label)}
          disabled={isUnavailable}
          className={`
            ${sizeClasses[size]} 
            border border-border rounded-full 
            hover:border-primary hover:text-primary 
            text-textMuted transition-all
            flex items-center gap-1 sm:gap-2
            ${isUnavailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${hasError ? 'border-red-500 text-red-500' : ''}
            ${showLabels ? 'px-3 sm:px-4 py-1.5 sm:py-2' : ''}
          `}
          title={isUnavailable ? `${linkData.label} is currently unavailable` : linkData.label}
          aria-label={linkData.label}
        >
          {hasError ? (
            <AlertCircle size={iconSizes[size]} />
          ) : (
            <IconComponent size={iconSizes[size]} />
          )}
          
          {showLabels && (
            <>
              <span className="text-xs sm:text-sm font-medium">{linkData.label}</span>
              {!linkData.url.startsWith('mailto:') && (
                <ExternalLink size={10} className="opacity-60" />
              )}
            </>
          )}
        </button>

        {/* Error tooltip */}
        {hasError && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Link unavailable
          </div>
        )}

        {/* Unavailable tooltip */}
        {isUnavailable && !hasError && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Currently unavailable
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {Object.values(SOCIAL_MEDIA_LINKS).map(renderSocialLink)}
    </div>
  );
};