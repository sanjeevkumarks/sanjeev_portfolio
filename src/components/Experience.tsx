import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import type { ExperienceData } from '../contexts/PortfolioContext';

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

function ExperienceItem({ entry }: { entry: ExperienceData }) {
  return (
    <motion.div variants={itemVariants} className="relative pl-10 md:pl-12 pb-14 last:pb-0 group">
      <span
        aria-hidden="true"
        className="absolute left-[11px] md:left-[15px] top-[28px] bottom-0 w-px bg-[#2e2e32] group-last:hidden"
      />

      <span
        aria-hidden="true"
        className="absolute left-0 md:left-1 top-[6px] flex items-center justify-center w-[23px] h-[23px] rounded-full border-2 border-[#3a3a3e] bg-[#1a1a1c] transition-colors duration-300 group-hover:border-[#ff6600]"
      >
        <span className="text-gray-500 transition-colors duration-300 group-hover:text-[#ff6600]">
          <Briefcase className="w-3 h-3" />
        </span>
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            {entry.period}
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#2e2e32] text-gray-500">
            {entry.type}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-100 tracking-tight leading-snug">
          {entry.role}
        </h3>

        <p className="text-sm text-gray-500 mt-0.5 mb-4">
          {entry.company}
          <span className="mx-1.5 text-[#3a3a3e]" aria-hidden="true">·</span>
          {entry.location}
        </p>

        <ul className="space-y-2.5" role="list">
          {entry.desc.map((item, i) => (
            <li key={i} className="relative pl-4 text-sm leading-relaxed text-gray-400">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-[#ff6600]/40"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { data } = usePortfolio();
  
  return (
    <section id="experience" aria-label="Professional experience" className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#ff6600] mb-3 font-medium">
            Career
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100">
            Professional Experience
          </h2>
        </motion.div>

        <div role="list">
          {data.experience.map((entry) => (
            <ExperienceItem key={entry.id} entry={entry} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
