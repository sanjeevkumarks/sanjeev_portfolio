import { useEffect, useRef } from 'react';
import { Mail, Download, ArrowUpRight } from 'lucide-react';

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

import { usePortfolio } from '../contexts/PortfolioContext';

export function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = usePortfolio();
  const contact = data.contact;
  const hero = data.hero;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    let mouse = { x: null as number | null, y: null as number | null, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
        init();
      }
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);

    class Particle {
      x: number; y: number; baseX: number; baseY: number;
      size: number; color: string; vx: number; vy: number;
      opacity: number;

      constructor(x: number, y: number, color: string) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 1.2 + 0.5;
        this.color = color;
        this.opacity = Math.random() * 0.45 + 0.4;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
      }
      
      draw() {
        ctx!.globalAlpha = this.opacity;
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
      
      update() {
        let dx = mouse.x !== null ? mouse.x - this.x : 0;
        let dy = mouse.y !== null ? mouse.y - this.y : 0;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouse.x !== null && distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          
          let directionX = (forceDirectionX * -1);
          let directionY = (forceDirectionY * -1) - 0.3; // Anti-gravity drift
          
          this.vx += directionX * force * 3;
          this.vy += directionY * force * 3;
        }
        
        let baseDx = this.baseX - this.x;
        let baseDy = this.baseY - this.y;
        
        // Zero friction, microgravity pull back to origin
        let pullStrength = 0.002; 
        this.vx += baseDx * pullStrength;
        this.vy += baseDy * pullStrength;
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Extreme floatiness / dampening
        this.vx *= 0.94;
        this.vy *= 0.94;
      }
    }

    let particleArray: Particle[] = [];

    function init() {
      particleArray = [];
      ctx!.fillStyle = 'white';
      // Responsive font size
      const fontSize = Math.min(width / 8, 120);
      ctx!.font = `bold ${fontSize}px "Inter", sans-serif`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      
      ctx!.fillText("GET IN", width/2, height/2 - fontSize/1.8);
      ctx!.fillText("TOUCH", width/2, height/2 + fontSize/1.8);
      
      const textCoordinates = ctx!.getImageData(0, 0, width, height);
      ctx!.clearRect(0, 0, width, height);
      
      for (let y = 0, y2 = textCoordinates.height; y < y2; y += 4) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x += 4) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            let color = y < height/2 ? '#c8c8c8' : '#d45a00';
            particleArray.push(new Particle(x, y, color));
          }
        }
      }
    }

    let animationFrameId: number;
    function animate() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    const timeoutId = setTimeout(() => {
      handleResize();
      animate();
    }, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="contact" className="w-full bg-[#161618] pt-20 pb-12 overflow-hidden border-t border-[#2e2e32]">
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          aria-label="Interactive particle text reading GET IN TOUCH"
        />
      </div>

      <div className="mt-12 flex flex-col items-center justify-center px-6">
        <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
          Float your cursor through the text above to see it drift in zero-gravity. Feel free to reach out via the links below!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href={`mailto:${contact.email}`} className="group flex items-center gap-3 px-5 py-3 rounded-lg border border-[#2e2e32] bg-[#1e1e20] text-gray-300 transition-all hover:border-[#ff6600]/50 hover:-translate-y-0.5">
            <Mail className="w-4 h-4 text-gray-500 group-hover:text-[#ff6600] transition-colors" />
            <span className="text-sm font-medium">{contact.email}</span>
          </a>
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-5 py-3 rounded-lg border border-[#2e2e32] bg-[#1e1e20] text-gray-300 transition-all hover:border-[#ff6600]/50 hover:-translate-y-0.5">
              <LinkedinIcon className="w-4 h-4 text-gray-500 group-hover:text-[#ff6600] transition-colors" />
              <span className="text-sm font-medium">LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500" />
            </a>
          )}
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-5 py-3 rounded-lg border border-[#2e2e32] bg-[#1e1e20] text-gray-300 transition-all hover:border-[#ff6600]/50 hover:-translate-y-0.5">
              <GithubIcon className="w-4 h-4 text-gray-500 group-hover:text-[#ff6600] transition-colors" />
              <span className="text-sm font-medium">GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500" />
            </a>
          )}
          {hero.resumeUrl && (
            <a href={hero.resumeUrl} download className="group flex items-center gap-3 px-5 py-3 rounded-lg bg-[#ff6600] text-white transition-all hover:bg-[#e05a00] hover:-translate-y-0.5">
              <span className="text-sm font-medium">Resume</span>
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>

        <footer className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} {hero.name}. All rights reserved.
        </footer>
      </div>
    </section>
  );
}
