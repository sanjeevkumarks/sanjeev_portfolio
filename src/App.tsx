import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { AdminDashboard } from './pages/AdminDashboard';

function PortfolioPage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a1c] text-gray-100 font-sans">
      <Preloader onComplete={() => setPreloaderDone(true)} />

      <a href="#hero" className="skip-link">
        Skip to main content
      </a>

      <div className={`transition-opacity duration-1000 ${preloaderDone ? 'opacity-100' : 'opacity-0'}`}>
        <Header />

        <main id="main-content">
          <Hero />
          <About />
          <Education />
          <Skills />
          <FeaturedProjects />
          <Experience />
          <Achievements />
          <Contact />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
