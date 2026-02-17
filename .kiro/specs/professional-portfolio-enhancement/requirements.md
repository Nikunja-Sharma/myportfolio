# Requirements Document

## Introduction

This specification defines the enhancement of an existing React/TypeScript portfolio website to transform it into a comprehensive professional portfolio for Nikunja Sarma. The enhancement will replace generic content with real professional information, implement working navigation, and add essential professional sections including contact functionality, project showcase, and career timeline.

## Glossary

- **Portfolio_System**: The enhanced React/TypeScript portfolio website
- **Navigation_Component**: The main navigation system enabling section-to-section movement
- **Contact_Form**: Interactive form for professional inquiries with email integration
- **Project_Showcase**: Display system for real portfolio projects with links and descriptions
- **Professional_Timeline**: Chronological display of work experience and education
- **Skills_Display**: Categorized presentation of technical competencies
- **Resume_Handler**: System for displaying and downloading resume PDF

## Requirements

### Requirement 1: Working Navigation System

**User Story:** As a visitor, I want to navigate between different sections of the portfolio, so that I can easily access specific information about the professional.

#### Acceptance Criteria

1. WHEN a user clicks on a navigation link, THE Navigation_Component SHALL scroll smoothly to the corresponding section
2. WHEN a user scrolls through the page, THE Navigation_Component SHALL highlight the currently active section
3. THE Navigation_Component SHALL provide links to Architecture, Stack/Skills, Resume, and Contact sections
4. WHEN navigation occurs, THE Portfolio_System SHALL maintain smooth user experience without page reloads
5. WHEN a section is reached via navigation, THE Portfolio_System SHALL ensure the section header is properly positioned

### Requirement 2: Professional Information Integration

**User Story:** As a visitor, I want to see authentic professional information about Nikunja Sarma, so that I can understand their background and expertise.

#### Acceptance Criteria

1. THE Portfolio_System SHALL display "Nikunja Sarma" as the professional name in the Hero section
2. THE Portfolio_System SHALL show "Full-stack developer since September 2024" as the current role
3. THE Portfolio_System SHALL display contact information: "+91 60030-75083" and "xnikunja@gmail.com"
4. THE Portfolio_System SHALL show location as "Nalbari, Assam, India"
5. WHEN displaying professional summary, THE Portfolio_System SHALL include current role at Synthweb working on international multivendor OMS project

### Requirement 3: Contact Form Implementation

**User Story:** As a potential client or employer, I want to send messages through a contact form, so that I can communicate professionally with Nikunja Sarma.

#### Acceptance Criteria

1. WHEN a user submits a valid contact form, THE Contact_Form SHALL send the message via email integration
2. WHEN a user submits an incomplete form, THE Contact_Form SHALL display validation errors for required fields
3. THE Contact_Form SHALL include fields for name, email, subject, and message
4. WHEN form submission is successful, THE Contact_Form SHALL display a confirmation message
5. WHEN form submission fails, THE Contact_Form SHALL display an appropriate error message and maintain form data

### Requirement 4: Real Project Showcase

**User Story:** As a visitor, I want to see actual projects that Nikunja Sarma has worked on, so that I can evaluate their technical capabilities and experience.

#### Acceptance Criteria

1. THE Project_Showcase SHALL display Aquariusly (APP) as an AI-powered mobile application project
2. THE Project_Showcase SHALL include Event Management App with Next.js, TypeScript, and Stripe integration details
3. THE Project_Showcase SHALL show IoT-Based Poultry Monitoring System as the final year project
4. WHEN displaying projects, THE Project_Showcase SHALL include GitHub repository links where available
5. WHEN displaying projects, THE Project_Showcase SHALL show live demo links where applicable
6. THE Project_Showcase SHALL include LangChain Web Scraper, Discord Bot, AliveStack, and CLI React library projects
7. WHEN a project is displayed, THE Project_Showcase SHALL show the technology stack used

### Requirement 5: Professional Timeline Display

**User Story:** As a recruiter or potential employer, I want to see Nikunja Sarma's work experience and education timeline, so that I can understand their career progression.

#### Acceptance Criteria

1. THE Professional_Timeline SHALL display Web Developer Intern at Teachnook (Jun 2023 - July 2023)
2. THE Professional_Timeline SHALL show Full Stack Developer at Appopen (8 months, 2024-2025) with AI-based website builder description
3. THE Professional_Timeline SHALL include current position at Synthweb (2025-present) with project details
4. THE Professional_Timeline SHALL display Bachelor of Computer Applications from Assam Downtown University (2021-2024)
5. THE Professional_Timeline SHALL show Masters of Computer Applications at SRM Institute (2024-Present)
6. WHEN displaying timeline items, THE Professional_Timeline SHALL show dates, positions, and company/institution names

### Requirement 6: Skills and Certifications Display

**User Story:** As a technical recruiter, I want to see categorized technical skills and certifications, so that I can assess technical competency for specific roles.

#### Acceptance Criteria

1. THE Skills_Display SHALL categorize skills into Frontend, Backend, Databases, Cloud, and Languages sections
2. THE Skills_Display SHALL list Frontend skills: Next.js, React.js, TailwindCSS, Shadcn
3. THE Skills_Display SHALL list Backend skills: Node.js, NestJS, Express, WebSockets, Prisma, TypeORM, Redis, GraphQL, gRPC, BullMQ
4. THE Skills_Display SHALL show Database skills: MongoDB, SQL, PostgreSQL
5. THE Skills_Display SHALL display Cloud platforms: AWS, Oracle
6. THE Skills_Display SHALL list Programming languages: JavaScript, TypeScript, Python, C/C++
7. THE Skills_Display SHALL show certifications: AWS Essentials (Coursera), Web Development (Udemy, Teachnook), AWS Internship (Verzeo)

### Requirement 7: Resume Download Functionality

**User Story:** As a recruiter, I want to download Nikunja Sarma's resume as a PDF, so that I can review it offline and share it with my team.

#### Acceptance Criteria

1. WHEN a user clicks the resume download button, THE Resume_Handler SHALL initiate PDF download
2. THE Resume_Handler SHALL provide a clearly labeled download button in the Resume section
3. WHEN download is initiated, THE Resume_Handler SHALL serve a properly formatted PDF resume
4. THE Resume_Handler SHALL ensure the PDF contains all professional information in a standard resume format
5. WHEN download fails, THE Resume_Handler SHALL display an appropriate error message

### Requirement 8: Social Media Integration

**User Story:** As a visitor, I want to access Nikunja Sarma's professional social media profiles, so that I can connect and see additional professional content.

#### Acceptance Criteria

1. THE Portfolio_System SHALL provide clickable links to GitHub profile
2. THE Portfolio_System SHALL provide clickable links to LinkedIn profile
3. WHEN social media links are clicked, THE Portfolio_System SHALL open profiles in new browser tabs
4. THE Portfolio_System SHALL display social media icons in a prominent location
5. WHEN social media links are unavailable, THE Portfolio_System SHALL handle gracefully without broken links

### Requirement 9: Responsive Design Maintenance

**User Story:** As a mobile user, I want the enhanced portfolio to work seamlessly on my device, so that I can access all information regardless of screen size.

#### Acceptance Criteria

1. WHEN viewed on mobile devices, THE Portfolio_System SHALL maintain all functionality
2. WHEN screen size changes, THE Portfolio_System SHALL adapt layout appropriately using Tailwind CSS
3. THE Portfolio_System SHALL ensure navigation remains accessible on all device sizes
4. WHEN contact form is used on mobile, THE Portfolio_System SHALL provide appropriate input handling
5. THE Portfolio_System SHALL maintain readability and usability across desktop, tablet, and mobile viewports