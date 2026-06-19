import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import type { ExperienceData } from '../../contexts/PortfolioContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export function ExperienceManager() {
  const { data, updateData } = usePortfolio();
  const experience = data.experience;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ExperienceData>>({});
  const [descText, setDescText] = useState('');

  const handleEdit = (item: ExperienceData) => {
    setEditingId(item.id);
    setFormData(item);
    setDescText(item.desc.join('\n'));
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({ role: '', company: '', period: '', location: '', type: '' });
    setDescText('');
  };

  const handleSave = () => {
    if (!formData.role || !formData.company) return alert('Role and company required');
    
    // Parse newline separated bullet points
    const parsedDesc = descText.split('\n').map(s => s.trim()).filter(s => s !== '');
    
    if (editingId === 'new') {
      const newItem = { ...formData, desc: parsedDesc, id: Date.now().toString() } as ExperienceData;
      updateData('experience', [...experience, newItem]);
    } else if (editingId) {
      updateData('experience', experience.map(e => e.id === editingId ? { ...e, ...formData, desc: parsedDesc } : e));
    }
    setEditingId(null);
  };

  const deleteItem = (id: string) => {
    updateData('experience', experience.filter(e => e.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Experience</h2>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-[#e05a00] transition-colors"
        >
          <Plus size={18} /> Add New Entry
        </button>
      </div>

      {editingId && (
        <div className="bg-[#1e1e20] p-6 rounded-2xl border border-[#ff6600]/30 mb-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{editingId === 'new' ? 'New Entry' : 'Edit Entry'}</h3>
            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Role (Job Title)</label>
              <input 
                type="text" 
                value={formData.role || ''} 
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Company Name</label>
              <input 
                type="text" 
                value={formData.company || ''} 
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Period (e.g. Jan 2023 - Present)</label>
              <input 
                type="text" 
                value={formData.period || ''} 
                onChange={e => setFormData({...formData, period: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Location (e.g. Remote)</label>
              <input 
                type="text" 
                value={formData.location || ''} 
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Type (e.g. Full-time, Internship)</label>
              <input 
                type="text" 
                value={formData.type || ''} 
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-1 block">Description (One bullet point per line)</label>
            <textarea 
              value={descText} 
              onChange={e => setDescText(e.target.value)}
              rows={5}
              className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none resize-y"
              placeholder="Developed new features...&#10;Led a team of...&#10;Improved performance by..."
            />
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#ff6600] text-white px-6 py-2.5 rounded-lg hover:bg-[#e05a00] transition-colors"
          >
            <Save size={18} /> Save Entry
          </button>
        </div>
      )}

      <div className="space-y-4">
        {experience.map(item => (
          <div key={item.id} className="bg-[#1e1e20] p-5 rounded-xl border border-[#2e2e32] flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 items-center mb-1">
                <span className="text-sm font-semibold text-gray-100">{item.role}</span>
                <span className="text-xs text-gray-500 border border-[#2e2e32] px-2 py-0.5 rounded-full">{item.type}</span>
              </div>
              <p className="text-sm text-[#ff6600] mb-2">{item.company} • {item.location} • {item.period}</p>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                {item.desc.map((d, i) => (
                  <li key={i} className="line-clamp-1">{d}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => handleEdit(item)}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#2e2e32] rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
