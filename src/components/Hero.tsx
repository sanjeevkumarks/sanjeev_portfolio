import { motion } from 'framer-motion';
import { Mail, MapPin, Download, ArrowDown } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function Hero() {
  const { data } = usePortfolio();
  const hero = data.hero;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-svh flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.25em] text-[#ff6600] mb-6 font-medium"
        >
          {hero.title}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-100 mb-5 leading-[0.95]"
        >
          {hero.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl font-medium text-gray-400 mb-8 tracking-tight"
        >
          {hero.subtitle}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-gray-500 max-w-xl mb-10 leading-relaxed"
        >
          {hero.intro}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-3 mb-12 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{hero.location}</span>
          </div>
          <a
            href={`mailto:${hero.email}`}
            className="flex items-center gap-2 hover:text-[#ff6600] transition-colors"
          >
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{hero.email}</span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href={hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff6600] transition-colors"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff6600] transition-colors"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3 bg-[#ff6600] text-white text-sm font-medium rounded-md hover:bg-[#e05a00] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff6600]"
          >
            Contact Me
          </a>
          {hero.resumeUrl && (
            <a
              href={hero.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-[#3a3a3e] text-sm font-medium rounded-md hover:border-[#ff6600] hover:text-[#ff6600] transition-colors group"
            >
              <span>Resume</span>
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex flex-col items-center gap-2 text-gray-600"
        aria-hidden="true"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em] font-medium"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
