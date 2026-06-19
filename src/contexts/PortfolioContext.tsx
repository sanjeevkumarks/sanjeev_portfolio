import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// --- Types ---
export interface Project {
  id: string;
  title: string;
  tech: string;
  desc: string;
  image: string;
  github?: string;
  demo?: string;
}

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  intro: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface AboutCardData {
  id: string;
  icon: string; // "User" | "GraduationCap" | "Target" | "Sparkles"
  title: string;
  desc: string;
}

export type TimelineType = 'education' | 'certification' | 'milestone';

export interface EducationData {
  id: string;
  type: TimelineType;
  period: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // "Code2" | "Server" | "Wrench"
  skills: string[];
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  desc: string[];
}

export interface AchievementData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  year: string;
  images: string[];
}

export interface ContactData {
  email: string;
  twitter: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  hero: HeroData;
  aboutCards: AboutCardData[];
  education: EducationData[];
  skills: SkillCategory[];
  experience: ExperienceData[];
  achievements: AchievementData[];
  projects: Project[];
  contact: ContactData;
}

// --- Default Data ---
const DEFAULT_DATA: PortfolioData = {
  hero: {
    name: 'Your Name',
    title: 'Software Engineer',
    subtitle: 'Integrated M.Tech Computer Science Student',
    intro: 'A passionate software engineering student dedicated to building scalable applications and exploring modern technologies. Focused on writing clean, elegant code and solving complex problems through thoughtful design.',
    location: 'City, Country',
    email: 'hello@example.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    resumeUrl: '/resume.pdf'
  },
  aboutCards: [
    { id: '1', icon: 'User', title: 'Personal Summary', desc: 'A detail-oriented software engineering student with a passion for crafting elegant digital experiences. Driven by curiosity and a commitment to continuous learning, always seeking opportunities to grow both technically and personally.' },
    { id: '2', icon: 'GraduationCap', title: 'Academic Background', desc: 'Currently pursuing an Integrated M.Tech in Computer Science, building a strong foundation in algorithms, systems design, and software architecture through rigorous coursework and hands-on projects.' },
    { id: '3', icon: 'Target', title: 'Career Goals', desc: 'Aspiring to contribute to impactful software products at scale. Interested in roles that blend engineering excellence with thoughtful product thinking, particularly in fast-paced environments that value innovation.' },
    { id: '4', icon: 'Sparkles', title: 'Areas of Interest', desc: 'Full-stack development, distributed systems, cloud-native architecture, developer tooling, and open-source contribution. Fascinated by the intersection of design and engineering.' },
  ],
  education: [
    { id: '1', type: 'education', period: '2022 — Present', title: 'Integrated M.Tech in Computer Science', subtitle: 'University Name', desc: 'Specializing in software engineering and distributed systems. Active member of the coding club and open-source community.' },
    { id: '2', type: 'certification', period: '2024', title: 'Cloud Computing Certification', subtitle: 'Issuing Organization', desc: 'Completed an industry-recognized certification covering cloud architecture, deployment, and scalability patterns.' },
    { id: '3', type: 'milestone', period: '2023', title: 'First Open-Source Contribution', subtitle: 'Project / Organization', desc: 'Contributed a significant feature to a widely-used open-source library, gaining experience with large-scale collaborative development.' },
    { id: '4', type: 'education', period: '2020 — 2022', title: 'Higher Secondary Education', subtitle: 'School Name', desc: 'Focused on Mathematics, Physics, and Computer Science. Graduated with distinction.' },
  ],
  skills: [
    { id: '1', title: 'Frontend Development', icon: 'Code2', skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js', 'HTML5 / CSS3'] },
    { id: '2', title: 'Backend & Systems', icon: 'Server', skills: ['Node.js & Express', 'Python / FastAPI', 'Go (Golang)', 'PostgreSQL', 'Redis', 'GraphQL'] },
    { id: '3', title: 'Tools & Infrastructure', icon: 'Wrench', skills: ['Git & GitHub', 'Docker', 'AWS Core Services', 'CI/CD Pipelines', 'Linux', 'Jest & Testing'] },
  ],
  experience: [
    { id: '1', role: 'Software Engineering Intern', company: 'Tech Innovation Labs', period: 'May 2024 — Present', location: 'City, Country', type: 'Internship', desc: ['Developed and shipped 3 new features for the core product, improving user engagement by 15%.', 'Migrated legacy components to React and TypeScript, reducing technical debt.', 'Collaborated with cross-functional teams using agile methodologies.'] },
    { id: '2', role: 'Freelance Developer', company: 'Self-Employed', period: 'Jan 2023 — Apr 2024', location: 'Remote', type: 'Freelance', desc: ['Built responsive websites and web applications for small businesses using React and modern CSS frameworks.', 'Set up CMS integrations and managed deployment pipelines.', 'Handled client communication and project requirements gathering.'] },
    { id: '3', role: 'Open Source Contributor', company: 'Various Projects', period: '2022 — Present', location: 'Global', type: 'Volunteer', desc: ['Submitted bug fixes and documentation improvements to popular repositories.', 'Participated in code reviews and community discussions.'] },
  ],
  achievements: [
    {
      id: '1',
      number: '01',
      title: 'Global Hackathon Winner',
      subtitle: 'AI-Powered Accessibility Tool',
      desc: 'First place out of 500+ teams worldwide. Built an AI-powered accessibility tool in 48 hours.',
      year: '2025',
      images: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop'
      ]
    },
    {
      id: '2',
      number: '02',
      title: 'Open Source Contributor',
      subtitle: 'Major React Libraries',
      desc: 'Core contributor to major React libraries with over 10k stars. Mentored 50+ junior developers.',
      year: '2024',
      images: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1618477247222-ac60c6218780?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop'
      ]
    },
    {
      id: '3',
      number: '03',
      title: 'Top Rated Freelancer',
      subtitle: 'Enterprise Projects',
      desc: 'Completed 100+ enterprise projects with a 5.0 average rating. Maintained 100% client retention.',
      year: '2023',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop'
      ]
    }
  ],
  projects: [
    { id: '1', title: 'Project Alpha', tech: 'React • TypeScript • Node.js', desc: 'A full-stack web application that streamlines project management with real-time collaboration features.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=450&fit=crop', github: 'https://github.com', demo: 'https://example.com' },
    { id: '2', title: 'Project Beta', tech: 'Python • FastAPI • PyTorch', desc: 'An AI-powered document analysis platform that extracts insights from unstructured text.', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1000&h=450&fit=crop', github: 'https://github.com', demo: 'https://example.com' },
    { id: '3', title: 'Project Gamma', tech: 'Go • Kubernetes • AWS', desc: 'A cloud-native microservices architecture for an e-commerce platform.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&h=450&fit=crop', github: 'https://github.com' },
    { id: '4', title: 'Project Delta', tech: 'Rust • WebAssembly • WebGL', desc: 'A high-performance in-browser 3D rendering engine built with Rust and compiled to WebAssembly.', image: 'https://images.unsplash.com/photo-1618477247222-ac60c6218780?w=1000&h=450&fit=crop', github: 'https://github.com', demo: 'https://example.com' }
  ],
  contact: {
    email: 'hello@example.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
};

// --- Context Definition ---
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (section: keyof PortfolioData, newData: any) => void;
  exportData: () => string;
  importData: (json: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const docRef = doc(db, 'portfolio', 'master');
    const unsubscribe = onSnapshot(docRef, (docSnap: any) => {
      if (docSnap.exists()) {
        setData({ ...DEFAULT_DATA, ...(docSnap.data() as PortfolioData) });
      } else {
        // If document doesn't exist, seed it with DEFAULT_DATA
        setDoc(docRef, DEFAULT_DATA);
      }
    }, (error: any) => {
      console.error('Error fetching data from Firestore:', error);
      // Fallback to localStorage if network fails
      const stored = localStorage.getItem('portfolio_master_data');
      if (stored) {
        setData({ ...DEFAULT_DATA, ...JSON.parse(stored) });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Keep local storage backup in case they go offline
    localStorage.setItem('portfolio_master_data', JSON.stringify(data));
  }, [data]);

  const updateData = async (section: keyof PortfolioData, newData: any) => {
    // Optimistic UI update
    setData(prev => ({ ...prev, [section]: newData }));
    
    // Sync to Firestore
    try {
      const docRef = doc(db, 'portfolio', 'master');
      await setDoc(docRef, { [section]: newData }, { merge: true });
    } catch (e) {
      console.error('Failed to save to Firestore:', e);
      alert('Failed to save changes online. You may need to check Firestore rules.');
    }
  };

  const exportData = () => {
    return JSON.stringify(data, null, 2);
  };

  const importData = async (json: string) => {
    try {
      const parsed = JSON.parse(json);
      const merged = { ...DEFAULT_DATA, ...parsed };
      
      // Optimistic update
      setData(merged);
      
      // Sync whole object to Firestore
      const docRef = doc(db, 'portfolio', 'master');
      await setDoc(docRef, merged);
      
      alert('Data imported successfully and synced globally!');
    } catch (e) {
      alert('Invalid JSON format or network error.');
      console.error(e);
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, exportData, importData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
