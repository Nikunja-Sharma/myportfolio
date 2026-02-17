import React, { useState } from 'react';
import { Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface ResumeHandlerProps {
  resumeUrl?: string;
  fileName?: string;
}

interface DownloadState {
  status: 'idle' | 'downloading' | 'success' | 'error';
  message?: string;
}

export const ResumeHandler: React.FC<ResumeHandlerProps> = ({
  resumeUrl = '/resume.pdf',
  fileName = 'Nikunja_Sarma_Resume.pdf'
}) => {
  const [downloadState, setDownloadState] = useState<DownloadState>({ status: 'idle' });

  const handleDownload = async () => {
    try {
      setDownloadState({ status: 'downloading' });
      
      // Track download analytics
      trackDownloadAnalytics();
      
      // Fetch the PDF file
      const response = await fetch(resumeUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
      }
      
      // Get the blob data
      const blob = await response.blob();
      
      // Validate that it's a PDF
      if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
        throw new Error('Invalid file type. Expected PDF format.');
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setDownloadState({ 
        status: 'success', 
        message: 'Resume downloaded successfully!' 
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setDownloadState({ status: 'idle' });
      }, 3000);
      
    } catch (error) {
      console.error('Resume download failed:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to download resume. Please try again or contact me directly.';
      
      setDownloadState({ 
        status: 'error', 
        message: errorMessage 
      });
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setDownloadState({ status: 'idle' });
      }, 5000);
    }
  };

  const trackDownloadAnalytics = () => {
    try {
      // Simple analytics tracking
      const timestamp = new Date().toISOString();
      const userAgent = navigator.userAgent;
      const referrer = document.referrer || 'direct';
      
      // Log to console for now (can be replaced with actual analytics service)
      console.log('Resume Download Analytics:', {
        timestamp,
        userAgent,
        referrer,
        fileName,
        resumeUrl
      });
      
      // Could integrate with Google Analytics, Mixpanel, etc.
      if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'resume_download', {
          event_category: 'engagement',
          event_label: fileName,
          value: 1
        });
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  };

  const getButtonContent = () => {
    switch (downloadState.status) {
      case 'downloading':
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span>Downloading...</span>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Downloaded!</span>
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-4 h-4" />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </>
        );
    }
  };

  const getButtonStyles = () => {
    const baseStyles = "inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm";
    
    switch (downloadState.status) {
      case 'success':
        return `${baseStyles} bg-green-600 hover:bg-green-700 text-white`;
      case 'error':
        return `${baseStyles} bg-red-600 hover:bg-red-700 text-white`;
      default:
        return `${baseStyles} bg-primary hover:bg-primary/90 text-background hover:shadow-lg hover:shadow-primary/25`;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
      {/* Resume Preview Card */}
      <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 max-w-md w-full">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-textPrimary text-sm sm:text-base">Resume</h3>
            <p className="text-xs sm:text-sm text-textMuted">PDF Format • Professional</p>
          </div>
        </div>
        
        <p className="text-textMuted text-xs sm:text-sm mb-3 sm:mb-4">
          Download my complete resume with detailed work experience, education, skills, and project information.
        </p>
        
        <button
          onClick={handleDownload}
          disabled={downloadState.status === 'downloading'}
          className={getButtonStyles()}
          aria-label="Download Nikunja Sarma's resume as PDF"
        >
          {getButtonContent()}
        </button>
      </div>
      
      {/* Status Message */}
      {downloadState.message && (
        <div className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm max-w-md w-full text-center ${
          downloadState.status === 'success' 
            ? 'bg-green-900/20 text-green-400 border border-green-800' 
            : 'bg-red-900/20 text-red-400 border border-red-800'
        }`}>
          {downloadState.message}
        </div>
      )}
      
      {/* Alternative Contact Info */}
      <div className="text-center text-textMuted text-xs sm:text-sm">
        <p>Having trouble downloading? Contact me directly:</p>
        <a 
          href="mailto:xnikunja@gmail.com" 
          className="text-primary hover:text-primary/80 transition-colors break-all"
        >
          xnikunja@gmail.com
        </a>
      </div>
    </div>
  );
};