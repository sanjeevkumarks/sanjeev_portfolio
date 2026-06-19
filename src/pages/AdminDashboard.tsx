import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ProjectManager } from '../components/admin/ProjectManager';
import { HeroManager } from '../components/admin/HeroManager';
import { AboutManager } from '../components/admin/AboutManager';
import { EducationManager } from '../components/admin/EducationManager';
import { SkillsManager } from '../components/admin/SkillsManager';
import { ExperienceManager } from '../components/admin/ExperienceManager';
import { AchievementsManager } from '../components/admin/AchievementsManager';
import { SettingsManager } from '../components/admin/SettingsManager';
import { LayoutDashboard, LogOut, Briefcase, User, GraduationCap, Code2, Award, Settings, UserCircle } from 'lucide-react';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6 text-gray-100 font-sans">
        <div className="bg-[#1e1e20] p-8 rounded-2xl border border-[#2e2e32] w-full max-w-sm shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (password === 'admin123') setIsAuthenticated(true);
              else alert('Incorrect password. Try admin123');
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Password</label>
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#ff6600] transition-colors"
                placeholder="Enter password..."
              />
            </div>
            <button 
              type="submit"
              className="bg-[#ff6600] text-white font-medium py-2.5 rounded-lg hover:bg-[#e05a00] transition-colors mt-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const NavLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-[#ff6600]/10 text-[#ff6600]' : 'text-gray-400 hover:bg-[#2e2e32] hover:text-white'}`}
      >
        <Icon size={18} />
        <span className="font-medium text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#2e2e32] bg-[#1a1a1c] p-6 flex flex-col hidden md:flex h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-tight">Admin<span className="text-[#ff6600]">Panel</span></h1>
        </div>
        
        <nav className="flex-1 flex flex-col gap-1.5 mb-8">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2 px-2">General</div>
          <NavLink to="/admin" icon={LayoutDashboard} label="Dashboard" />
          <NavLink to="/admin/hero" icon={UserCircle} label="Hero & Contact" />
          <NavLink to="/admin/settings" icon={Settings} label="Data Backup" />

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-2">Sections</div>
          <NavLink to="/admin/about" icon={User} label="About Cards" />
          <NavLink to="/admin/education" icon={GraduationCap} label="Education" />
          <NavLink to="/admin/skills" icon={Code2} label="Skills" />
          <NavLink to="/admin/experience" icon={Briefcase} label="Experience" />
          <NavLink to="/admin/projects" icon={Briefcase} label="Featured Projects" />
          <NavLink to="/admin/achievements" icon={Award} label="Achievements" />
        </nav>

        <div className="pt-6 border-t border-[#2e2e32]">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white transition-colors">
            <LogOut size={18} />
            <span className="font-medium text-sm">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="border-b border-[#2e2e32] bg-[#1a1a1c] p-6 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold">Admin</h1>
          <Link to="/" className="text-gray-400"><LogOut size={20}/></Link>
        </header>

        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-gray-400 mb-8">Manage your entire portfolio from here.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: 'Hero & Contact', desc: 'Update name, titles, and social links', to: '/admin/hero' },
                    { label: 'Featured Projects', desc: 'Add, edit, or remove your projects', to: '/admin/projects' },
                    { label: 'Experience', desc: 'Update your professional timeline', to: '/admin/experience' },
                    { label: 'Data Backup', desc: 'Export or Import your entire portfolio JSON', to: '/admin/settings' },
                  ].map(card => (
                    <div key={card.label} className="bg-[#1e1e20] border border-[#2e2e32] p-6 rounded-2xl hover:border-[#ff6600]/30 transition-colors">
                      <h3 className="text-lg font-semibold mb-2">{card.label}</h3>
                      <p className="text-gray-400 text-sm mb-4">{card.desc}</p>
                      <Link to={card.to} className="text-[#ff6600] text-sm font-medium hover:underline">Manage &rarr;</Link>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="achievements" element={<AchievementsManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
