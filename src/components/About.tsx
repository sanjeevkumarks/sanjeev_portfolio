import { motion } from 'framer-motion';
import { User, GraduationCap, Target, Sparkles, Code2, Server, Wrench, Briefcase, Award, Flag } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

// --- Icon Mapping Utility ---
// Exported so we can reuse it in other sections if needed
export const IconMap: Record<string, React.ElementType> = {
  User,
  GraduationCap,
  Target,
  Sparkles,
  Code2,
  Server,
  Wrench,
  Briefcase,
  Award,
  Flag
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

interface AboutCardProps {
  iconName: string;
  title: string;
  children: React.ReactNode;
}

function AboutCard({ iconName, title, children }: AboutCardProps) {
  const IconComponent = IconMap[iconName] || Sparkles;

  return (
    <motion.div
      variants={itemVariants}
      className="group rounded-lg border border-[#2e2e32] bg-[#1e1e20] p-6 md:p-7 transition-all duration-300 hover:border-[#ff6600]/50 hover:shadow-lg hover:shadow-[#ff6600]/5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-md bg-[#242426] text-gray-400 transition-colors duration-300 group-hover:bg-[#ff6600] group-hover:text-white"
          aria-hidden="true"
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <h3 className="text-base font-semibold text-gray-100 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="text-sm leading-relaxed text-gray-400">
        {children}
      </div>
    </motion.div>
  );
}

export function About() {
  const { data } = usePortfolio();
  
  return (
    <section id="about" aria-label="About Me" className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#ff6600] mb-3 font-medium">
            Introduction
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.aboutCards.map(card => (
            <AboutCard key={card.id} iconName={card.icon} title={card.title}>
              <p>{card.desc}</p>
            </AboutCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
