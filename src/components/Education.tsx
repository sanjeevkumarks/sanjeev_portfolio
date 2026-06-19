import { motion } from 'framer-motion';
import { GraduationCap, Award, Flag } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import type { TimelineType, EducationData } from '../contexts/PortfolioContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const iconMap: Record<TimelineType, React.ReactNode> = {
  education: <GraduationCap className="w-3 h-3" />,
  certification: <Award className="w-3 h-3" />,
  milestone: <Flag className="w-3 h-3" />,
};

const labelMap: Record<TimelineType, string> = {
  education: 'Education',
  certification: 'Certification',
  milestone: 'Milestone',
};

function TimelineItem({ entry }: { entry: EducationData }) {
  return (
    <motion.div variants={itemVariants} className="relative pl-10 md:pl-12 pb-12 last:pb-0 group">
      <span
        aria-hidden="true"
        className="absolute left-[11px] md:left-[15px] top-[28px] bottom-0 w-px bg-[#2e2e32] group-last:hidden"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 md:left-1 top-[6px] flex items-center justify-center w-[23px] h-[23px] rounded-full border-2 border-[#3a3a3e] bg-[#1a1a1c] transition-colors duration-300 group-hover:border-[#ff6600]"
      >
        <span className="text-gray-500 transition-colors duration-300 group-hover:text-[#ff6600]">
          {iconMap[entry.type]}
        </span>
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            {entry.period}
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#2e2e32] text-gray-500">
            {labelMap[entry.type]}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-100 tracking-tight leading-snug">
          {entry.title}
        </h3>

        <p className="text-sm text-gray-500 mt-0.5 mb-2">
          {entry.subtitle}
        </p>

        <p className="text-sm leading-relaxed text-gray-400 max-w-xl">
          {entry.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function Education() {
  const { data } = usePortfolio();
  
  return (
    <section id="education" aria-label="Education and milestones" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 section-alt">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#ff6600] mb-3 font-medium">
            Background
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100">
            Education &amp; Milestones
          </h2>
        </motion.div>

        <div role="list">
          {data.education.map(entry => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
