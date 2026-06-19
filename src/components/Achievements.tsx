import { useEffect, useRef } from 'react';

/* ─── Scoped CSS (no global resets) ─────────────────────────────────── */
const SCOPED_CSS = `
#achievement-stack-container {
  position: relative;
  background-color: #121212;
  padding: 100px 24px 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

#achievement-stack-container .asc-section-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #ff6600;
  margin: 0 0 12px;
}

#achievement-stack-container .asc-section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #f0f0f0;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 64px;
}

/* ── Cards List: flex column with large gap ─────────────────────────── */
#achievement-stack-container .cards-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 40vh;
}

/* ── Individual Sticky Card ─────────────────────────────────────────── */
#achievement-stack-container .stack-card {
  position: sticky;
  top: 100px;
  transform-origin: top center;
  will-change: transform, filter;
  transition: transform 0.1s linear, filter 0.1s linear;
}

#achievement-stack-container .stack-card-inner {
  background: #1e1e20;
  border: 1px solid #333;
  border-radius: 24px;
  padding: 44px 48px 40px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}

/* ── Card Header Row ────────────────────────────────────────────────── */
#achievement-stack-container .card-header {
  display: flex;
  align-items: flex-start;
  gap: 36px;
  margin-bottom: 36px;
}

/* Massive Transparent Outline Number */
#achievement-stack-container .card-number {
  font-size: clamp(5rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 2px #3a3a3a;
  letter-spacing: -0.05em;
  flex-shrink: 0;
  user-select: none;
  min-width: 120px;
}

/* Text Content */
#achievement-stack-container .card-content {
  flex: 1;
  min-width: 0;
  padding-top: 8px;
}

#achievement-stack-container .card-title {
  font-size: clamp(1.2rem, 2.5vw, 1.65rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 0 0 6px;
}

#achievement-stack-container .card-subtitle {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ff6600;
  letter-spacing: 0.01em;
  margin: 0 0 12px;
}

#achievement-stack-container .card-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #888;
  margin: 0;
  max-width: 580px;
}

/* Year Badge */
#achievement-stack-container .card-badge {
  flex-shrink: 0;
  padding: 6px 18px;
  background: #2a2a2c;
  border: 1px solid #3a3a3e;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #d0d0d0;
  letter-spacing: 0.04em;
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 10px;
}

/* ── Image Gallery (CSS Grid, 3 images) ─────────────────────────────── */
#achievement-stack-container .card-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

#achievement-stack-container .card-gallery img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 12px;
  background: #2a2a2c;
  display: block;
  border: 1px solid #2e2e30;
}

/* ── Responsive ─────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  #achievement-stack-container .stack-card-inner {
    padding: 32px 28px 28px;
  }

  #achievement-stack-container .card-header {
    flex-wrap: wrap;
    gap: 16px;
  }

  #achievement-stack-container .card-number {
    font-size: 4rem;
    -webkit-text-stroke: 1.5px #3a3a3a;
    min-width: auto;
  }
}

@media (max-width: 600px) {
  #achievement-stack-container {
    padding: 64px 16px 0;
  }

  #achievement-stack-container .cards-list {
    gap: 2rem;
    padding-bottom: 30vh;
  }

  #achievement-stack-container .stack-card {
    top: 72px;
  }

  #achievement-stack-container .card-header {
    flex-direction: column;
    gap: 4px;
  }

  #achievement-stack-container .card-number {
    font-size: 3rem;
  }

  #achievement-stack-container .card-badge {
    align-self: flex-start;
    margin-top: 0;
  }

  #achievement-stack-container .card-gallery {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
`;

/* ─── Component ─────────────────────────────────────────────────────── */
import { usePortfolio } from '../contexts/PortfolioContext';

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = usePortfolio();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLDivElement>('.stack-card');
    if (cards.length === 0) return;

    function onScroll() {
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const stickyTop = parseFloat(getComputedStyle(card).top) || 100;

        const isStuck = rect.top <= stickyTop + 1;

        if (isStuck && i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const nextRect = nextCard.getBoundingClientRect();

          const cardBottom = rect.top + rect.height;
          const overlap = cardBottom - nextRect.top;
          const progress = Math.max(0, Math.min(1, overlap / rect.height));

          const scale = 1 - progress * 0.1;
          const brightness = 1 - progress * 0.5;

          card.style.transform = `scale(${scale})`;
          card.style.filter = `brightness(${brightness})`;
        } else {
          card.style.transform = 'scale(1)';
          card.style.filter = 'brightness(1)';
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); 

    return () => window.removeEventListener('scroll', onScroll);
  }, [data.achievements]); // Re-run effect when data changes

  return (
    <>
      <style>{SCOPED_CSS}</style>
      <div id="achievement-stack-container" ref={containerRef}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="asc-section-label">Recognition</p>
          <h2 className="asc-section-title">Achievements &amp; Certifications</h2>
        </div>

        <div className="cards-list">
          {data.achievements.map((card) => (
            <div key={card.id} className="stack-card">
              <div className="stack-card-inner">
                <div className="card-header">
                  <span className="card-number">{card.number}</span>
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-subtitle">{card.subtitle}</p>
                    <p className="card-desc">{card.desc}</p>
                  </div>
                  <span className="card-badge">{card.year}</span>
                </div>

                <div className="card-gallery">
                  {card.images.map((src, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={src}
                      alt={`${card.title} — image ${imgIdx + 1}`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
