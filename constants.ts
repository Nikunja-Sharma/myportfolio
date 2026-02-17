import { Project, PersonalInfo, WorkExperience, Education, Certification, SkillCategory, ProfessionalProfile, SocialMediaLinks } from './types';

// Personal Information (Requirements 2.1, 2.2, 2.3, 2.4, 2.5)
export const PERSONAL_INFO: PersonalInfo = {
  name: "Nikunja Sarma",
  title: "Full-stack developer since September 2024",
  location: "Nalbari, Assam, India",
  phone: "+91 60030-75083",
  email: "xnikunja@gmail.com",
  summary: "Full-stack developer with expertise in modern web technologies and cloud platforms. Currently working at Synthweb on international multivendor OMS project, focusing on scalable distributed systems and production-grade architecture.",
  currentRole: {
    position: "Full Stack Developer",
    company: "Synthweb",
    startDate: "2025",
    description: "Working on international multivendor OMS project with focus on scalable distributed systems"
  }
};

// Work Experience Data
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: "synthweb",
    position: "Full Stack Developer",
    company: "Synthweb",
    startDate: "2025",
    endDate: undefined,
    description: "Currently working on international multivendor OMS project",
    achievements: [
      "Developing scalable distributed systems for multivendor OMS project",
      "Implementing production-grade architecture solutions",
      "Working with international team on complex OMS platform"
    ],
    technologies: ["Node.js", "React.js", "TypeScript", "MongoDB", "AWS"]
  },
  {
    id: "appopen",
    position: "Full Stack Developer",
    company: "Appopen",
    startDate: "2024",
    endDate: "2025",
    description: "Worked for 8 months on AI-based website builder platform",
    achievements: [
      "Developed AI-powered website builder with automated design generation",
      "Implemented full-stack solutions using modern web technologies",
      "Collaborated on innovative AI integration for web development"
    ],
    technologies: ["Next.js", "React.js", "Node.js", "AI/ML APIs", "TypeScript"]
  },
  {
    id: "teachnook",
    position: "Web Developer Intern",
    company: "Teachnook",
    startDate: "June 2023",
    endDate: "July 2023",
    description: "Completed web development internship focusing on modern web technologies",
    achievements: [
      "Gained hands-on experience with full-stack web development",
      "Worked on real-world projects using React and Node.js",
      "Learned industry best practices and development workflows"
    ],
    technologies: ["React.js", "Node.js", "JavaScript", "HTML", "CSS"]
  }
];

// Education Data
export const EDUCATION: Education[] = [
  {
    id: "srm-mca",
    degree: "Masters of Computer Applications",
    institution: "SRM Institute",
    location: "India",
    startDate: "2024",
    endDate: undefined,
    specialization: "Computer Applications"
  },
  {
    id: "adu-bca",
    degree: "Bachelor of Computer Applications",
    institution: "Assam Downtown University",
    location: "Assam, India",
    startDate: "2021",
    endDate: "2024",
    specialization: "Cloud Technology & Information Security"
  }
];

// Certifications Data
export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-essentials",
    name: "AWS Essentials",
    issuer: "Coursera",
    issueDate: "2023"
  },
  {
    id: "web-dev-udemy",
    name: "Web Development",
    issuer: "Udemy",
    issueDate: "2023"
  },
  {
    id: "web-dev-teachnook",
    name: "Web Development",
    issuer: "Teachnook",
    issueDate: "2023"
  },
  {
    id: "aws-internship",
    name: "AWS Internship",
    issuer: "Verzeo",
    issueDate: "2023"
  }
];

// Skills Data
export const SKILLS: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "Next.js", proficiency: "advanced" },
      { name: "React.js", proficiency: "advanced" },
      { name: "TailwindCSS", proficiency: "advanced" },
      { name: "Shadcn", proficiency: "intermediate" }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", proficiency: "advanced" },
      { name: "NestJS", proficiency: "intermediate" },
      { name: "Express", proficiency: "advanced" },
      { name: "WebSockets", proficiency: "intermediate" },
      { name: "Prisma", proficiency: "intermediate" },
      { name: "TypeORM", proficiency: "intermediate" },
      { name: "Redis", proficiency: "intermediate" },
      { name: "GraphQL", proficiency: "intermediate" },
      { name: "gRPC", proficiency: "beginner" },
      { name: "BullMQ", proficiency: "intermediate" }
    ]
  },
  {
    name: "Databases",
    skills: [
      { name: "MongoDB", proficiency: "advanced" },
      { name: "SQL", proficiency: "intermediate" },
      { name: "PostgreSQL", proficiency: "intermediate" }
    ]
  },
  {
    name: "Cloud",
    skills: [
      { name: "AWS", proficiency: "intermediate" },
      { name: "Oracle", proficiency: "beginner" }
    ]
  },
  {
    name: "Languages",
    skills: [
      { name: "JavaScript", proficiency: "advanced" },
      { name: "TypeScript", proficiency: "advanced" },
      { name: "Python", proficiency: "intermediate" },
      { name: "C/C++", proficiency: "intermediate" }
    ]
  }
];

// Real Projects Data (Requirements 4.1, 4.2, 4.3, 4.6)
export const PROJECTS: Project[] = [
  {
    id: "aquariusly",
    title: "Aquariusly (APP)",
    description: "AI-powered mobile application for aquarium management and fish care guidance",
    techStack: ["Kotlin", "AI/ML", "Node.js", "MongoDB"],
    features: [
      "AI-powered fish identification and care recommendations",
      "Aquarium monitoring and maintenance scheduling",
      "Community features for aquarium enthusiasts",
      "Real-time water quality tracking"
    ],
    category: "mobile",
    featured: true,
    diagramType: 'ai',
    githubUrl: "https://github.com/nikunja-sarma/aquariusly-app",
    liveUrl: "https://aquariusly.app",
    imageUrl: "/images/projects/aquariusly.jpg"
  },
  {
    id: "event-management",
    title: "Event Management App",
    description: "Comprehensive event management platform with payment integration",
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    features: [
      "Event creation and management dashboard",
      "Stripe payment integration for ticket sales",
      "Real-time attendee tracking and check-in",
      "Email notifications and reminders"
    ],
    category: "web",
    featured: true,
    diagramType: 'marketplace',
    githubUrl: "https://github.com/nikunja-sarma/event-management-app",
    liveUrl: "https://events.nikunjasarma.dev",
    imageUrl: "/images/projects/event-management.jpg"
  },
  {
    id: "iot-poultry",
    title: "IoT-Based Poultry Monitoring System",
    description: "Final year project for automated poultry farm monitoring using IoT sensors",
    techStack: ["IoT Sensors", "Arduino", "Node.js", "React.js", "MongoDB"],
    features: [
      "Real-time temperature and humidity monitoring",
      "Automated feeding and watering systems",
      "Health monitoring and alert system",
      "Data analytics and reporting dashboard"
    ],
    category: "iot",
    featured: true,
    diagramType: 'oms',
    githubUrl: "https://github.com/nikunja-sarma/iot-poultry-monitoring",
    imageUrl: "/images/projects/iot-poultry.jpg"
  },
  {
    id: "langchain-scraper",
    title: "LangChain Web Scraper",
    description: "Intelligent web scraping tool using LangChain for data extraction and processing",
    techStack: ["Python", "LangChain", "BeautifulSoup", "OpenAI"],
    features: [
      "AI-powered content extraction and summarization",
      "Automated data cleaning and structuring",
      "Multi-site scraping with rate limiting",
      "Export to various formats (JSON, CSV, PDF)"
    ],
    category: "ai",
    featured: false,
    diagramType: 'ai',
    githubUrl: "https://github.com/nikunja-sarma/langchain-web-scraper",
    imageUrl: "/images/projects/langchain-scraper.jpg"
  },
  {
    id: "discord-bot",
    title: "Discord Bot",
    description: "Feature-rich Discord bot for server management and user engagement",
    techStack: ["Node.js", "Discord.js", "MongoDB", "Redis"],
    features: [
      "Server moderation and administration tools",
      "Custom commands and automated responses",
      "User engagement tracking and rewards",
      "Integration with external APIs"
    ],
    category: "web",
    featured: false,
    diagramType: 'oms',
    githubUrl: "https://github.com/nikunja-sarma/discord-bot",
    imageUrl: "/images/projects/discord-bot.jpg"
  },
  {
    id: "alivestack",
    title: "AliveStack",
    description: "Modern development stack and tooling for rapid application development",
    techStack: ["Node.js", "React.js", "TypeScript", "Docker"],
    features: [
      "Pre-configured development environment",
      "Automated deployment pipelines",
      "Built-in monitoring and logging",
      "Scalable microservices architecture"
    ],
    category: "web",
    featured: false,
    diagramType: 'cicd',
    githubUrl: "https://github.com/nikunja-sarma/alivestack",
    liveUrl: "https://alivestack.dev",
    imageUrl: "/images/projects/alivestack.jpg"
  },
  {
    id: "cli-react-library",
    title: "CLI React Library",
    description: "Command-line interface library for React component generation and management",
    techStack: ["Node.js", "TypeScript", "Commander.js", "React"],
    features: [
      "Automated React component scaffolding",
      "Template-based code generation",
      "Project structure management",
      "Integration with popular React frameworks"
    ],
    category: "cli",
    featured: false,
    diagramType: 'cicd',
    githubUrl: "https://github.com/nikunja-sarma/cli-react-library",
    imageUrl: "/images/projects/cli-react-library.jpg"
  }
];

// Complete Professional Profile
export const PROFESSIONAL_PROFILE: ProfessionalProfile = {
  personal: PERSONAL_INFO,
  experience: WORK_EXPERIENCE,
  education: EDUCATION,
  projects: PROJECTS,
  skills: SKILLS,
  certifications: CERTIFICATIONS
};

// Legacy constants for backward compatibility
export const PORTFOLIO_OWNER = PERSONAL_INFO.name;
export const POSITIONING = PERSONAL_INFO.title;
export const HEADLINE = "I Build Scalable Full-Stack Applications That Solve Real Problems.";
export const SUBHEADLINE = "Specializing in modern web technologies, AI integration, and cloud-native solutions.";
// Social Media Links (Requirements 8.1, 8.2, 8.3, 8.4, 8.5)
export const SOCIAL_MEDIA_LINKS = {
  github: {
    platform: 'github' as const,
    url: 'https://github.com/nikunja-sharma',
    label: 'GitHub Profile',
    icon: 'Github',
    available: true
  },
  linkedin: {
    platform: 'linkedin' as const,
    url: 'https://linkedin.com/in/nikunja-sarma',
    label: 'LinkedIn Profile',
    icon: 'Linkedin',
    available: true
  },
  email: {
    platform: 'email' as const,
    url: `mailto:${PERSONAL_INFO.email}`,
    label: 'Send Email',
    icon: 'Mail',
    available: true
  }
};
