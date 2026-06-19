import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Save } from 'lucide-react';

export function HeroManager() {
  const { data, updateData } = usePortfolio();
  const [hero, setHero] = useState(data.hero);
  const [contact, setContact] = useState(data.contact);

  const handleSave = () => {
    updateData('hero', hero);
    updateData('contact', contact);
    alert('Saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Hero & Contact</h2>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-[#e05a00] transition-colors"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#2e2e32]">
          <h3 className="text-lg font-semibold mb-6">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Name</label>
              <input 
                type="text" 
                value={hero.name} 
                onChange={e => setHero({...hero, name: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Title (Overline)</label>
              <input 
                type="text" 
                value={hero.title} 
                onChange={e => setHero({...hero, title: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Subtitle</label>
              <input 
                type="text" 
                value={hero.subtitle} 
                onChange={e => setHero({...hero, subtitle: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Location</label>
              <input 
                type="text" 
                value={hero.location} 
                onChange={e => setHero({...hero, location: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Introduction Paragraph</label>
              <textarea 
                value={hero.intro} 
                onChange={e => setHero({...hero, intro: e.target.value})}
                rows={4}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#2e2e32]">
          <h3 className="text-lg font-semibold mb-6">Links & Contact</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input 
                type="email" 
                value={contact.email} 
                onChange={e => {
                  setContact({...contact, email: e.target.value});
                  setHero({...hero, email: e.target.value}); // Sync hero email
                }}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">GitHub URL</label>
              <input 
                type="url" 
                value={contact.github} 
                onChange={e => {
                  setContact({...contact, github: e.target.value});
                  setHero({...hero, github: e.target.value}); // Sync hero github
                }}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">LinkedIn URL</label>
              <input 
                type="url" 
                value={contact.linkedin} 
                onChange={e => {
                  setContact({...contact, linkedin: e.target.value});
                  setHero({...hero, linkedin: e.target.value}); // Sync hero linkedin
                }}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Twitter URL</label>
              <input 
                type="url" 
                value={contact.twitter} 
                onChange={e => setContact({...contact, twitter: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Resume File URL (e.g., /resume.pdf)</label>
              <input 
                type="text" 
                value={hero.resumeUrl} 
                onChange={e => setHero({...hero, resumeUrl: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
