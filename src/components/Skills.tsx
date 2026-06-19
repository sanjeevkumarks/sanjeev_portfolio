import { motion } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import { IconMap } from './About';
import { Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

function SkillBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 bg-[#242426] border border-[#2e2e32] transition-all duration-200 hover:border-[#ff6600]/60 hover:text-[#ff6600] hover:-translate-y-0.5 cursor-default select-none">
      {name}
    </span>
  );
}

export function Skills() {
  const { data } = usePortfolio();

  return (
    <section id="skills" aria-label="Technical skills" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ff6600]/5 via-transparent to-transparent opacity-50 pointer-events-none" aria-hidden="true" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#ff6600] mb-3 font-medium">
            Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100">
            Technical Arsenal
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.skills.map((category) => {
            const IconComponent = IconMap[category.icon] || Sparkles;

            return (
              <motion.div 
                key={category.id} 
                variants={itemVariants}
                className="group p-6 md:p-8 rounded-2xl bg-[#1e1e20] border border-[#2e2e32] transition-all duration-300 hover:border-[#ff6600]/30 hover:bg-[#222224]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#161618] rounded-xl text-[#ff6600] group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2" role="list">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge key={skillIndex} name={skill} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
