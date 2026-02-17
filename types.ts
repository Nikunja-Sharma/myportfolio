export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  metrics?: { name: string; value: string | number; unit?: string }[];
  codeSnippet?: string;
  diagramType: 'marketplace' | 'oms' | 'auth' | 'ai' | 'cicd';
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
