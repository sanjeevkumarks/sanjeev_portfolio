import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import type { EducationData, TimelineType } from '../../contexts/PortfolioContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export function EducationManager() {
  const { data, updateData } = usePortfolio();
  const education = data.education;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EducationData>>({});

  const handleEdit = (item: EducationData) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({ title: '', subtitle: '', period: '', desc: '', type: 'education' });
  };

  const handleSave = () => {
    if (!formData.title || !formData.desc) return alert('Title and description required');
    
    if (editingId === 'new') {
      const newItem = { ...formData, id: Date.now().toString() } as EducationData;
      updateData('education', [...education, newItem]);
    } else if (editingId) {
      updateData('education', education.map(e => e.id === editingId ? { ...e, ...formData } : e));
    }
    setEditingId(null);
  };

  const deleteItem = (id: string) => {
    updateData('education', education.filter(e => e.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Education & Milestones</h2>
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
              <label className="text-sm text-gray-400 mb-1 block">Title (e.g. Degree Name)</label>
              <input 
                type="text" 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Subtitle (e.g. University Name)</label>
              <input 
                type="text" 
                value={formData.subtitle || ''} 
                onChange={e => setFormData({...formData, subtitle: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Period (e.g. 2020 - 2024)</label>
              <input 
                type="text" 
                value={formData.period || ''} 
                onChange={e => setFormData({...formData, period: e.target.value})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Type</label>
              <select
                value={formData.type || 'education'}
                onChange={e => setFormData({...formData, type: e.target.value as TimelineType})}
                className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none appearance-none"
              >
                <option value="education">Education</option>
                <option value="certification">Certification</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-1 block">Description</label>
            <textarea 
              value={formData.desc || ''} 
              onChange={e => setFormData({...formData, desc: e.target.value})}
              rows={3}
              className="w-full bg-[#161618] border border-[#2e2e32] rounded-lg px-4 py-2 text-white focus:border-[#ff6600] outline-none resize-none"
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
        {education.map(item => (
          <div key={item.id} className="bg-[#1e1e20] p-5 rounded-xl border border-[#2e2e32] flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 items-center mb-1">
                <span className="text-xs font-semibold text-[#ff6600] uppercase tracking-wider">{item.type}</span>
                <span className="text-xs text-gray-500">{item.period}</span>
              </div>
              <h4 className="font-semibold text-gray-100">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.subtitle}</p>
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
