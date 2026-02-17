export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  metrics?: { name: string; value: string | number; unit?: string }[];
  codeSnippet?: string;
  diagramType: 'marketplace' | 'oms' | 'auth' | 'ai' | 'cicd';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: 'web' | 'mobile' | 'iot' | 'ai' | 'cli';
  featured: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

// Professional Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  currentRole: {
    position: string;
    company: string;
    startDate: string;
    description: string;
  };
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  specialization?: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface Skill {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface ProfessionalProfile {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

// Resume Handler Types
export interface ResumeHandlerProps {
  resumeUrl?: string;
  fileName?: string;
}

export interface DownloadState {
  status: 'idle' | 'downloading' | 'success' | 'error';
  message?: string;
}
// Social Media Types
export interface SocialMediaLink {
  platform: 'github' | 'linkedin' | 'email';
  url: string;
  label: string;
  icon: string;
  available: boolean;
}

export interface SocialMediaLinks {
  github: SocialMediaLink;
  linkedin: SocialMediaLink;
  email: SocialMediaLink;
}
