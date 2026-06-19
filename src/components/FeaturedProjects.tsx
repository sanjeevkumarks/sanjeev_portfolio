import { useEffect, useRef } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

/* ─── Scoped CSS (No Global Resets) ─────────────────────────────────── */
const SCOPED_CSS = `
#z-axis-projects-wrapper {
  position: relative;
  /* 400vh tall to capture plenty of scroll distance */
  height: 400vh; 
  background-color: #121212;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: clip; /* Prevent horizontal scrollbars from 3D scaling */
}

#z-axis-projects-wrapper *,
#z-axis-projects-wrapper *::before,
#z-axis-projects-wrapper *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#z-axis-projects-wrapper .z-axis-viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  /* Crucial for 3D depth */
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Header Text (Fixed on screen) */
#z-axis-projects-wrapper .z-overlay-header {
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
  pointer-events: none;
}

#z-axis-projects-wrapper .z-overlay-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #ff6600;
  margin-bottom: 12px;
}

#z-axis-projects-wrapper .z-overlay-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
}

/* Individual Project Card */
#z-axis-projects-wrapper .z-axis-card {
  position: absolute;
  width: 90%;
  max-width: 800px;
  /* Frosted Glass Look */
  background: rgba(30, 30, 32, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid #333;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.05);
  
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  /* Hardware acceleration and 3D positioning */
  transform-style: preserve-3d;
  will-change: transform, opacity;
  opacity: 0; /* JS will take over */
}

/* Internal Layout */
#z-axis-projects-wrapper .z-card-image {
  width: 100%;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #2e2e32;
  background: #1a1a1c;
}

#z-axis-projects-wrapper .z-card-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#z-axis-projects-wrapper .z-card-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

#z-axis-projects-wrapper .z-card-tech {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ff6600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

#z-axis-projects-wrapper .z-card-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #a0a0a0;
}

/* Links */
#z-axis-projects-wrapper .z-card-links {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 12px;
}

#z-axis-projects-wrapper .z-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;
}

#z-axis-projects-wrapper .z-link:hover {
  color: #ff6600;
}

/* Responsive */
@media (max-width: 600px) {
  #z-axis-projects-wrapper .z-axis-card {
    padding: 20px;
    gap: 16px;
  }
  #z-axis-projects-wrapper .z-card-image {
    aspect-ratio: 16 / 9;
  }
}
`;

/* ─── Project Data ──────────────────────────────────────────────────── */
const CARDS = [
  {
    title: 'Project Alpha',
    tech: 'React • TypeScript • Node.js',
    desc: 'A full-stack web application that streamlines project management with real-time collaboration features, role-based access control, and an intuitive Kanban board interface.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=450&fit=crop',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    title: 'Project Beta',
    tech: 'Python • FastAPI • PyTorch',
    desc: 'An AI-powered document analysis platform that extracts insights from unstructured text using natural language processing and presents findings through interactive visualizations.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1000&h=450&fit=crop',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    title: 'Project Gamma',
    tech: 'Go • Kubernetes • AWS',
    desc: 'A cloud-native microservices architecture for an e-commerce platform featuring event-driven communication, distributed caching, and automated CI/CD pipelines.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&h=450&fit=crop',
    github: 'https://github.com'
  },
  {
    title: 'Project Delta',
    tech: 'Rust • WebAssembly • WebGL',
    desc: 'A high-performance in-browser 3D rendering engine built with Rust and compiled to WebAssembly, capable of handling millions of polygons at 60fps.',
    image: 'https://images.unsplash.com/photo-1618477247222-ac60c6218780?w=1000&h=450&fit=crop',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    title: 'Project Epsilon',
    tech: 'Vue 3 • Firebase • Tailwind',
    desc: 'A real-time collaborative whiteboarding tool designed for remote teams, featuring vector drawing, voice chat integration, and infinite canvas support.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&h=450&fit=crop',
    github: 'https://github.com'
  }
];

/* ─── Component ─────────────────────────────────────────────────────── */
import { usePortfolio } from '../contexts/PortfolioContext';

export function FeaturedProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { data } = usePortfolio();
  const projects = data.projects;

  // We need to keep our refs array in sync with projects length
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, projects.length);
  }, [projects]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cards = cardsRef.current;
    const numCards = cards.length;
    if (numCards === 0) return;

    // ── 3D Physics Configuration ──
    const Z_SPACING = 2500; 
    const TOTAL_DEPTH = Z_SPACING * (numCards - 1); 
    const OVERSHOOT = 1500; 
    const TOTAL_TRAVEL = TOTAL_DEPTH + OVERSHOOT;

    function onScroll() {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const maxScroll = Math.max(1, rect.height - window.innerHeight);

      let progress = -rect.top / maxScroll;
      progress = Math.max(0, Math.min(1, progress));

      const addedZ = progress * TOTAL_TRAVEL;

      cards.forEach((card, i) => {
        if (!card) return;

        const baseZ = -i * Z_SPACING;
        const currentZ = baseZ + addedZ;

        let opacity = 0;

        if (currentZ < -4000) {
          opacity = 0;
        } else if (currentZ < -1500) {
          opacity = (currentZ + 4000) / 2500; 
        } else if (currentZ <= 50) {
          opacity = 1;
        } else if (currentZ > 50) {
          opacity = 1 - ((currentZ - 50) / 300);
        }

        opacity = Math.max(0, Math.min(1, opacity));

        card.style.transform = `translate3d(0, 0, ${currentZ}px)`;
        card.style.opacity = opacity.toString();
        card.style.pointerEvents = (opacity > 0.5 && currentZ < 100) ? 'auto' : 'none';
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); 

    return () => window.removeEventListener('scroll', onScroll);
  }, [projects]); // Re-run effect if projects array changes

  // Dynamic wrapper height based on number of projects (approx 100vh per project)
  const wrapperHeight = Math.max(100, projects.length * 80) + 'vh';

  return (
    <>
      <style>{SCOPED_CSS}</style>
      <section id="z-axis-projects-wrapper" ref={wrapperRef} aria-label="Featured projects" style={{ height: wrapperHeight }}>
        
        {/* Sticky 3D Viewport */}
        <div className="z-axis-viewport">
          
          {/* Overlay Title */}
          <div className="z-overlay-header">
            <p className="z-overlay-label">Portfolio</p>
            <h2 className="z-overlay-title">Featured Projects</h2>
          </div>

          {/* 3D Project Cards */}
          {projects.map((card, i) => (
            <div 
              key={card.id} 
              className="z-axis-card" 
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <img 
                src={card.image} 
                alt={card.title} 
                className="z-card-image"
                loading="lazy" 
              />
              
              <div className="z-card-info">
                <h3 className="z-card-title">{card.title}</h3>
                <span className="z-card-tech">{card.tech}</span>
                <p className="z-card-desc">{card.desc}</p>
                
                <div className="z-card-links">
                  {card.github && (
                    <a href={card.github} target="_blank" rel="noopener noreferrer" className="z-link">
                      <GithubIcon className="w-5 h-5" />
                      <span>Source</span>
                    </a>
                  )}
                  {card.demo && (
                    <a href={card.demo} target="_blank" rel="noopener noreferrer" className="z-link">
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}
